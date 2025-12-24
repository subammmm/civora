"""
Issue #20: Improved API Error Handling
Apply to api/routers/*.py
"""

from fastapi import HTTPException, status
from utils import logger
from typing import Any, Dict

class APIError(Exception):
    """Base API error"""
    def __init__(self, status_code: int, detail: str, error_code: str = None):
        self.status_code = status_code
        self.detail = detail
        self.error_code = error_code

class ValidationError(APIError):
    """Validation failed"""
    def __init__(self, detail: str):
        super().__init__(status.HTTP_422_UNPROCESSABLE_ENTITY, detail, "VALIDATION_ERROR")

class NotFoundError(APIError):
    """Resource not found"""
    def __init__(self, resource: str):
        super().__init__(status.HTTP_404_NOT_FOUND, f"{resource} not found", "NOT_FOUND")

# Exception handler in main.py:
@app.exception_handler(APIError)
def api_error_handler(request, exc: APIError):
    logger.error(f"API Error: {exc.detail}", extra={
        "status_code": exc.status_code,
        "error_code": exc.error_code,
        "path": request.url.path
    })
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "error": {
                "code": exc.error_code,
                "message": exc.detail,
                "timestamp": datetime.utcnow().isoformat()
            }
        }
    )

# Usage in routers:
# from exceptions import NotFoundError
# 
# @router.get("/opportunity/{id}")
# def get_opportunity(id: int, db: Session = Depends(get_db)):
#     opportunity = db.query(Opportunity).filter_by(id=id).first()
#     if not opportunity:
#         raise NotFoundError("Opportunity")
#     return opportunity
