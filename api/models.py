"""
SQLAlchemy and Pydantic models for database and API validation
"""
from datetime import datetime
from typing import Optional, Dict, Any, List
from sqlalchemy import Column, String, Integer, Float, DateTime, ForeignKey, Text, Date, JSON, CheckConstraint
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import relationship
from pydantic import BaseModel, EmailStr, Field, validator
import uuid

from database import Base

# ============================================================================
# SQLAlchemy Database Models
# ============================================================================

class User(Base):
    """User account with profile data"""
    __tablename__ = "users"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String(255), unique=True, nullable=False, index=True)
    password_hash = Column(String(255), nullable=False)
    profile_json = Column(JSONB, default={})
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    applications = relationship("Application", back_populates="user")
    simulations = relationship("Simulation", back_populates="user")


class Opportunity(Base):
    """Visa or scholarship opportunity"""
    __tablename__ = "opportunities"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    type = Column(String(20), nullable=False)
    name = Column(String(255), nullable=False)
    country = Column(String(100))
    requirements_json = Column(JSONB, default={})
    cost = Column(Integer)  # Cost in USD
    approval_rate = Column(Float)  # 0.0 to 1.0
    deadline = Column(Date)
    details = Column(Text)
    
    # Relationships
    applications = relationship("Application", back_populates="opportunity")
    
    __table_args__ = (
        CheckConstraint("type IN ('visa', 'scholarship')", name="valid_opportunity_type"),
    )


class Application(Base):
    """User application to an opportunity"""
    __tablename__ = "applications"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    opp_id = Column(UUID(as_uuid=True), ForeignKey("opportunities.id"), nullable=False)
    status = Column(String(20), default="draft")
    docs_json = Column(JSONB, default={})
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    user = relationship("User", back_populates="applications")
    opportunity = relationship("Opportunity", back_populates="applications")
    
    __table_args__ = (
        CheckConstraint("status IN ('draft', 'submitted', 'in_review', 'approved', 'rejected')", 
                       name="valid_application_status"),
    )


class Simulation(Base):
    """Monte Carlo simulation results"""
    __tablename__ = "simulations"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    type = Column(String(20), nullable=False)  # 'tax' or 'citizenship'
    input_json = Column(JSONB)
    output_json = Column(JSONB)
    ran_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    user = relationship("User", back_populates="simulations")
    
    __table_args__ = (
        CheckConstraint("type IN ('tax', 'citizenship', 'wealth')", 
                       name="valid_simulation_type"),
    )


# ============================================================================
# Pydantic Models for API Validation
# ============================================================================

class UserProfile(BaseModel):
    """User profile data structure"""
    age: Optional[int] = Field(None, ge=16, le=100)
    nationality: Optional[str] = None
    education_level: Optional[str] = None
    field_of_study: Optional[str] = None
    work_experience_years: Optional[int] = Field(None, ge=0, le=50)
    skills: Optional[List[str]] = []
    languages: Optional[List[str]] = []
    target_countries: Optional[List[str]] = []
    budget: Optional[int] = Field(None, ge=0)
    goals: Optional[str] = None
    
    class Config:
        json_schema_extra = {
            "example": {
                "age": 25,
                "nationality": "Nepal",
                "education_level": "Bachelor",
                "field_of_study": "Computer Science",
                "work_experience_years": 2,
                "skills": ["Python", "Machine Learning", "Data Analysis"],
                "languages": ["English", "Nepali", "Hindi"],
                "target_countries": ["United States", "Canada", "Germany"],
                "budget": 50000,
                "goals": "Pursue master's degree in AI/ML"
            }
        }


class UserRegister(BaseModel):
    """User registration request"""
    email: EmailStr
    password: str = Field(..., min_length=8)
    
    @validator('password')
    def password_strength(cls, v):
        if not any(c.isupper() for c in v):
            raise ValueError('Password must contain at least one uppercase letter')
        if not any(c.islower() for c in v):
            raise ValueError('Password must contain at least one lowercase letter')
        if not any(c.isdigit() for c in v):
            raise ValueError('Password must contain at least one digit')
        return v


class UserLogin(BaseModel):
    """User login request"""
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    """User data response"""
    id: str
    email: str
    profile: Dict[str, Any]
    created_at: datetime
    
    class Config:
        from_attributes = True


class TokenResponse(BaseModel):
    """JWT token response"""
    access_token: str
    token_type: str = "bearer"
    expires_in: int = 604800  # 7 days in seconds


class OpportunityResponse(BaseModel):
    """Opportunity data response"""
    id: str
    type: str
    name: str
    country: Optional[str]
    requirements: Dict[str, Any]
    cost: Optional[int]
    approval_rate: Optional[float]
    deadline: Optional[datetime]
    details: Optional[str]
    match_score: Optional[float] = None  # Added by ML service
    
    class Config:
        from_attributes = True


class ApplicationCreate(BaseModel):
    """Create new application request"""
    opportunity_id: str
    documents: Dict[str, Any] = {}


class ApplicationResponse(BaseModel):
    """Application data response"""
    id: str
    user_id: str
    opportunity_id: str
    status: str
    documents: Dict[str, Any]
    created_at: datetime
    
    class Config:
        from_attributes = True


class FormFillRequest(BaseModel):
    """RPA form filling request"""
    form_url: str
    form_data: Dict[str, Any]
    save_pdf: bool = True


class TaxSimulationRequest(BaseModel):
    """Tax simulation input"""
    current_country: str
    target_country: str
    annual_income: float = Field(..., gt=0)
    years_to_simulate: int = Field(default=10, ge=1, le=30)
    investment_rate: float = Field(default=0.05, ge=0, le=1)


class CitizenshipSimulationRequest(BaseModel):
    """Citizenship path simulation input"""
    current_country: str
    target_country: str
    education_level: str
    work_experience_years: int = Field(..., ge=0)
    language_proficiency: str
    investment_available: float = Field(default=0, ge=0)


class SimulationResponse(BaseModel):
    """Simulation result response"""
    id: str
    type: str
    expected_value: float
    std_deviation: float
    percentile_25: float
    percentile_50: float
    percentile_75: float
    success_probability: float
    visualization_data: List[Dict[str, Any]]
    ran_at: datetime
    
    class Config:
        from_attributes = True


class ErrorResponse(BaseModel):
    """Standard error response"""
    error: str
    detail: Optional[str] = None
    code: Optional[str] = None
