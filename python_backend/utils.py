"""
Utility functions for encryption, logging, and common operations
"""
import os
import logging
import json
from datetime import datetime, timedelta
from typing import Optional, Dict, Any
from cryptography.fernet import Fernet
from passlib.context import CryptContext
from jose import JWTError, jwt
from dotenv import load_dotenv

load_dotenv()

# ============================================================================
# Encryption Setup
# ============================================================================

# Get or generate encryption key
ENCRYPTION_KEY = os.getenv("ENCRYPTION_KEY", Fernet.generate_key().decode())
cipher_suite = Fernet(ENCRYPTION_KEY.encode())

def encrypt_data(data: str) -> str:
    """Encrypt sensitive data using Fernet"""
    return cipher_suite.encrypt(data.encode()).decode()

def decrypt_data(encrypted_data: str) -> str:
    """Decrypt sensitive data using Fernet"""
    return cipher_suite.decrypt(encrypted_data.encode()).decode()

# ============================================================================
# Password Hashing
# ============================================================================

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    """Hash a password using bcrypt"""
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a password against its hash"""
    return pwd_context.verify(plain_password, hashed_password)

# ============================================================================
# JWT Token Management
# ============================================================================

SECRET_KEY = os.getenv("JWT_SECRET_KEY", "dev-secret-key-change-in-production")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_DAYS = 7

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    """
    Create a JWT access token
    
    Args:
        data: Dictionary to encode in token (must contain 'sub' for subject/user_id)
        expires_delta: Optional custom expiration time
        
    Returns:
        Encoded JWT token string
    """
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(days=ACCESS_TOKEN_EXPIRE_DAYS)
    
    to_encode.update({"exp": expire, "iat": datetime.utcnow()})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def decode_access_token(token: str) -> Optional[Dict[str, Any]]:
    """
    Decode and validate a JWT token
    
    Args:
        token: JWT token string
        
    Returns:
        Decoded payload dict or None if invalid
    """
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError as e:
        logger.error(f"JWT decode error: {str(e)}")
        return None

# ============================================================================
# Logging Configuration
# ============================================================================

def setup_logger(name: str, level: str = None) -> logging.Logger:
    """
    Set up a logger with JSON formatting
    
    Args:
        name: Logger name
        level: Log level (INFO, ERROR, DEBUG, etc.)
        
    Returns:
        Configured logger instance
    """
    if level is None:
        level = os.getenv("LOG_LEVEL", "INFO")
    
    logger = logging.getLogger(name)
    logger.setLevel(getattr(logging, level.upper()))
    
    # Console handler
    handler = logging.StreamHandler()
    handler.setLevel(getattr(logging, level.upper()))
    
    # JSON formatter for structured logging
    formatter = logging.Formatter(
        '{"timestamp": "%(asctime)s", "level": "%(levelname)s", '
        '"logger": "%(name)s", "message": "%(message)s"}'
    )
    handler.setFormatter(formatter)
    
    logger.addHandler(handler)
    return logger

# Global logger instance
logger = setup_logger("globalforge")

# ============================================================================
# Data Validation Helpers
# ============================================================================

def sanitize_email(email: str) -> str:
    """Sanitize and normalize email address"""
    return email.lower().strip()

def validate_country_code(country: str) -> bool:
    """Validate if country code exists (simplified)"""
    # In production, use a proper country code library
    common_countries = [
        "United States", "Canada", "United Kingdom", "Germany", "Australia",
        "New Zealand", "France", "Netherlands", "Sweden", "Norway", "Denmark",
        "Switzerland", "Singapore", "Japan", "South Korea", "Nepal", "India"
    ]
    return country in common_countries

def calculate_age_from_dob(date_of_birth: datetime) -> int:
    """Calculate age from date of birth"""
    today = datetime.now()
    age = today.year - date_of_birth.year
    if today.month < date_of_birth.month or \
       (today.month == date_of_birth.month and today.day < date_of_birth.day):
        age -= 1
    return age

# ============================================================================
# Cache Helper (Simple in-memory cache)
# ============================================================================

class SimpleCache:
    """Simple in-memory cache with TTL"""
    
    def __init__(self):
        self._cache: Dict[str, tuple] = {}
        self._default_ttl = 3600  # 1 hour
    
    def set(self, key: str, value: Any, ttl: int = None):
        """Set cache value with TTL"""
        if ttl is None:
            ttl = self._default_ttl
        expiry = datetime.now() + timedelta(seconds=ttl)
        self._cache[key] = (value, expiry)
    
    def get(self, key: str) -> Optional[Any]:
        """Get cache value if not expired"""
        if key not in self._cache:
            return None
        
        value, expiry = self._cache[key]
        if datetime.now() > expiry:
            del self._cache[key]
            return None
        
        return value
    
    def clear(self, key: str = None):
        """Clear cache entry or all entries"""
        if key:
            self._cache.pop(key, None)
        else:
            self._cache.clear()

# Global cache instance
cache = SimpleCache()

# ============================================================================
# Response Helpers
# ============================================================================

def success_response(data: Any, message: str = "Success") -> Dict[str, Any]:
    """Standard success response format"""
    return {
        "success": True,
        "message": message,
        "data": data
    }

def error_response(error: str, detail: str = None, code: str = None) -> Dict[str, Any]:
    """Standard error response format"""
    response = {
        "success": False,
        "error": error
    }
    if detail:
        response["detail"] = detail
    if code:
        response["code"] = code
    return response

# ============================================================================
# File Operations
# ============================================================================

def ensure_directory(directory: str):
    """Ensure directory exists, create if not"""
    os.makedirs(directory, exist_ok=True)

def save_json(data: Any, filepath: str):
    """Save data as JSON file"""
    ensure_directory(os.path.dirname(filepath))
    with open(filepath, 'w') as f:
        json.dump(data, f, indent=2, default=str)

def load_json(filepath: str) -> Any:
    """Load data from JSON file"""
    with open(filepath, 'r') as f:
        return json.load(f)
