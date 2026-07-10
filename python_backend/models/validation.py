"""
Issue #23 FIXED: Pydantic Validation Models
Complete validation for all API endpoints
"""
from pydantic import BaseModel, EmailStr, Field, validator
from typing import Optional, List
from datetime import datetime


class UserCreate(BaseModel):
    """User creation validation"""
    email: EmailStr
    password: str = Field(..., min_length=8, max_length=100)
    full_name: str = Field(..., min_length=1, max_length=100)
    
    @validator('password')
    def password_strength(cls, v):
        if not any(c.isupper() for c in v):
            raise ValueError('Password must contain at least one uppercase letter')
        if not any(c.isdigit() for c in v):
            raise ValueError('Password must contain at least one number')
        if not any(c in '!@#$%^&*()' for c in v):
            raise ValueError('Password must contain at least one special character')
        return v


class UserLogin(BaseModel):
    """User login validation"""
    email: EmailStr
    password: str


class OpportunityFilter(BaseModel):
    """Opportunity filtering validation"""
    type: Optional[str] = Field(None, regex='^(visa|scholarship|citizenship|all)$')
    country: Optional[str] = Field(None, max_length=50)
    level: Optional[str] = Field(None, max_length=50)
    page: int = Field(1, ge=1)
    limit: int = Field(20, ge=1, le=100)


class OpportunityCreate(BaseModel):
    """Opportunity creation validation"""
    type: str = Field(..., regex='^(visa|scholarship|citizenship)$')
    name: str = Field(..., min_length=3, max_length=200)
    country: str = Field(..., min_length=2, max_length=50)
    level: Optional[str] = Field(None, max_length=50)
    deadline: Optional[datetime] = None
    description: Optional[str] = Field(None, max_length=5000)
    requirements: Optional[str] = Field(None, max_length=5000)
    application_link: Optional[str] = Field(None, regex=r'^https?://.*')
    
    @validator('deadline')
    def deadline_in_future(cls, v):
        if v and v < datetime.now():
            raise ValueError('Deadline must be in the future')
        return v


class OpportunityUpdate(BaseModel):
    """Opportunity update validation (all fields optional)"""
    name: Optional[str] = Field(None, min_length=3, max_length=200)
    country: Optional[str] = Field(None, min_length=2, max_length=50)
    level: Optional[str] = Field(None, max_length=50)
    deadline: Optional[datetime] = None
    description: Optional[str] = Field(None, max_length=5000)
    requirements: Optional[str] = Field(None, max_length=5000)
    application_link: Optional[str] = Field(None, regex=r'^https?://.*')


class OpportunityResponse(BaseModel):
    """Opportunity response model"""
    id: int
    type: str
    name: str
    country: str
    level: Optional[str]
    deadline: Optional[datetime]
    created_at: datetime
    
    class Config:
        orm_mode = True


class PaginatedOpportunitiesResponse(BaseModel):
    """Paginated response model"""
    items: List[OpportunityResponse]
    total: int
    page: int
    limit: int
    total_pages: int


class APIErrorResponse(BaseModel):
    """Standard error response"""
    error: dict = Field(..., example={
        "code": "VALIDATION_ERROR",
        "message": "Invalid request data",
        "timestamp": "2024-01-01T00:00:00Z"
    })


# Apply in routers:
# from models.validation import OpportunityFilter, OpportunityCreate
#
# @router.get("/opportunities", response_model=PaginatedOpportunitiesResponse)
# def list_opportunities(
#     filters: OpportunityFilter = Depends(),
#     db: Session = Depends(get_db)
# ):
#     service = OpportunityService(db)
#     return service.get_opportunities(**filters.dict(exclude_none=True))
#
# @router.post("/opportunities", response_model=OpportunityResponse, status_code=201)
# def create_opportunity(
#     data: OpportunityCreate,
#     db: Session = Depends(get_db)
# ):
#     service = OpportunityService(db)
#     return service.create_opportunity(data.dict())
