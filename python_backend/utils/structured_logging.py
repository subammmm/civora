"""
Issue #50 FIXED: Structured Logging Setup
JSON-formatted logs with context
"""
import logging
import json
import sys
from datetime import datetime
from typing import Any, Dict


class JSONFormatter(logging.Formatter):
    """Format logs as JSON for structured logging"""
    
    def format(self, record: logging.LogRecord) -> str:
        log_data: Dict[str, Any] = {
            "timestamp": datetime.utcnow().isoformat(),
            "level": record.levelname,
            "message": record.getMessage(),
            "module": record.module,
            "function": record.funcName,
            "line": record.lineno,
        }
        
        # Add custom fields from extra
        if hasattr(record, 'user_id'):
            log_data['user_id'] = record.user_id
        if hasattr(record, 'request_id'):
            log_data['request_id'] = record.request_id
        if hasattr(record, 'ip_address'):
            log_data['ip_address'] = record.ip_address
        
        # Add exception info if present
        if record.exc_info:
            log_data['exception'] = self.formatException(record.exc_info)
        
        return json.dumps(log_data)


def setup_logging(level: str = "INFO") -> logging.Logger:
    """Configure structured logging"""
    logger = logging.getLogger("civora")
    logger.setLevel(getattr(logging, level.upper()))
    
    # Console handler with JSON formatting
    console_handler = logging.StreamHandler(sys.stdout)
    console_handler.setFormatter(JSONFormatter())
    logger.addHandler(console_handler)
    
    # File handler (optional, for production)
    # file_handler = logging.FileHandler("logs/civora.log")
    # file_handler.setFormatter(JSONFormatter())
    # logger.addHandler(file_handler)
    
    return logger


# Global logger instance
logger = setup_logging()


# Usage examples:
# from utils.logging import logger
#
# # Simple log
# logger.info("User logged in", extra={"user_id": 123, "ip_address": "192.168.1.1"})
#
# # With context
# logger.error("Database query failed", extra={
#     "user_id": 123,
#     "query": "SELECT * FROM users",
#     "error_code": "DB_TIMEOUT"
# })
#
# # Exception logging
# try:
#     result = 10 / 0
# except Exception as e:
#     logger.exception("Division error", extra={"user_id": 123})
