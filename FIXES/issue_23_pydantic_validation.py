"""
Issue #23 Fix: Add Pydantic Validation Models
Example implementation for api/models.py
"""

from pydantic import BaseModel, EmailStr, constr, Field, validator
from typing import Optional
from datetime import datetime

class UserCreate(BaseModel):
    """Validation for user creation"""
    email: EmailStr
    password: constr(min_length=8, max_length=100)
    full_name: constr(min_length=1, max_length=100)
    
    @validator('password')
    def password_strength(cls, v):
        if not any(c.isupper() for c in v):
            raise ValueError('Password must contain uppercase letter')
        if not any(c.isdigit() for c in v):
            raise ValueError('Password must contain a number')
        return v

class OpportunityFilter(BaseModel):
    """Validation for opportunity filtering"""
    type: Optional[str] = Field(None, regex='^(visa|scholarship|all)$')
    country: Optional[str] = Field(None, max_length=50)
    level: Optional[str] = None
    page: int = Field(1, ge=1)
    limit: int = Field(20, ge=1, le=100)

class OpportunityResponse(BaseModel):
    """Response model for opportunities"""
    id: int
    type: str
    name: str
    country: str
    created_at: datetime
    
    class Config:
        orm_mode = True  # Allow ORM objects

# Apply in routers:
# @router.post("/opportunities")
# def filter_opportunities(filters: OpportunityFilter, db: Session = Depends(get_db)):
#     # filters is automatically validated
#     opportunities = db.query(Opportunity).filter_by(**filters.dict(exclude_none=True))
#     return opportunities
