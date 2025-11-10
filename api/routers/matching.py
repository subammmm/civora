"""
AI matching routes for visas and scholarships
"""
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from typing import List, Optional
import uuid

from database import get_db
from models import User, Opportunity, OpportunityResponse
from routers.users import get_current_user
from services.ml_service import get_visa_matches, get_scholarship_matches
from utils import logger, error_response, success_response

router = APIRouter(prefix="/matching", tags=["matching"])

# ============================================================================
# Helper Functions
# ============================================================================

def opportunities_to_dict(opportunities: List[Opportunity]) -> List[dict]:
    """Convert SQLAlchemy Opportunity objects to dictionaries"""
    return [
        {
            "id": str(opp.id),
            "type": opp.type,
            "name": opp.name,
            "country": opp.country,
            "requirements": opp.requirements_json or {},
            "cost": opp.cost,
            "approval_rate": opp.approval_rate,
            "deadline": opp.deadline,
            "details": opp.details
        }
        for opp in opportunities
    ]

# ============================================================================
# Routes
# ============================================================================

@router.get("/visas", response_model=List[OpportunityResponse])
async def get_visa_recommendations(
    top_n: int = Query(default=10, ge=1, le=50),
    min_score: float = Query(default=0.3, ge=0.0, le=1.0),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Get personalized visa recommendations based on user profile
    
    Args:
        top_n: Number of top matches to return (1-50)
        min_score: Minimum match score threshold (0.0-1.0)
        current_user: Authenticated user
        db: Database session
        
    Returns:
        List of visa opportunities with match scores
    """
    try:
        # Get user profile
        profile = current_user.profile_json
        if not profile or not profile.get("target_countries"):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Please complete your profile before getting recommendations"
            )
        
        # Get all visa opportunities
        visa_opportunities = db.query(Opportunity).filter(
            Opportunity.type == "visa"
        ).all()
        
        if not visa_opportunities:
            return []
        
        # Convert to dictionaries
        visa_dicts = opportunities_to_dict(visa_opportunities)
        
        # Get matches using ML service
        matches = get_visa_matches(profile, visa_dicts, top_n=top_n)
        
        # Filter by minimum score
        matches = [m for m in matches if m.get("match_score", 0) >= min_score]
        
        # Convert to response models
        results = []
        for match in matches:
            results.append(OpportunityResponse(
                id=match["id"],
                type=match["type"],
                name=match["name"],
                country=match.get("country"),
                requirements=match.get("requirements", {}),
                cost=match.get("cost"),
                approval_rate=match.get("approval_rate"),
                deadline=match.get("deadline"),
                details=match.get("details"),
                match_score=match.get("match_score"),
            ))
        
        logger.info(f"Returned {len(results)} visa matches for user {current_user.email}")
        
        return results
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Visa matching error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to get visa recommendations"
        )

@router.get("/scholarships", response_model=List[OpportunityResponse])
async def get_scholarship_recommendations(
    top_n: int = Query(default=10, ge=1, le=50),
    min_score: float = Query(default=0.3, ge=0.0, le=1.0),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Get personalized scholarship recommendations based on user profile
    
    Args:
        top_n: Number of top matches to return (1-50)
        min_score: Minimum match score threshold (0.0-1.0)
        current_user: Authenticated user
        db: Database session
        
    Returns:
        List of scholarship opportunities with match scores
    """
    try:
        # Get user profile
        profile = current_user.profile_json
        if not profile or not profile.get("field_of_study"):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Please complete your profile before getting recommendations"
            )
        
        # Get all scholarship opportunities
        scholarship_opportunities = db.query(Opportunity).filter(
            Opportunity.type == "scholarship"
        ).all()
        
        if not scholarship_opportunities:
            return []
        
        # Convert to dictionaries
        scholarship_dicts = opportunities_to_dict(scholarship_opportunities)
        
        # Get matches using ML service
        matches = get_scholarship_matches(profile, scholarship_dicts, top_n=top_n)
        
        # Filter by minimum score
        matches = [m for m in matches if m.get("match_score", 0) >= min_score]
        
        # Convert to response models
        results = []
        for match in matches:
            results.append(OpportunityResponse(
                id=match["id"],
                type=match["type"],
                name=match["name"],
                country=match.get("country"),
                requirements=match.get("requirements", {}),
                cost=match.get("cost"),
                approval_rate=match.get("approval_rate"),
                deadline=match.get("deadline"),
                details=match.get("details"),
                match_score=match.get("match_score"),
            ))
        
        logger.info(f"Returned {len(results)} scholarship matches for user {current_user.email}")
        
        return results
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Scholarship matching error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to get scholarship recommendations"
        )

@router.get("/opportunities")
async def list_opportunities(
    type: Optional[str] = Query(None, regex="^(visa|scholarship)$"),
    country: Optional[str] = None,
    limit: int = Query(default=50, ge=1, le=200),
    offset: int = Query(default=0, ge=0),
    db: Session = Depends(get_db)
):
    """
    List all opportunities with optional filters (public endpoint)
    
    Args:
        type: Filter by opportunity type (visa or scholarship)
        country: Filter by country
        limit: Number of results to return
        offset: Number of results to skip
        db: Database session
        
    Returns:
        List of opportunities
    """
    try:
        query = db.query(Opportunity)
        
        # Apply filters
        if type:
            query = query.filter(Opportunity.type == type)
        
        if country:
            query = query.filter(Opportunity.country == country)
        
        # Apply pagination
        opportunities = query.offset(offset).limit(limit).all()
        
        # Convert to response
        results = [
            OpportunityResponse(
                id=str(opp.id),
                type=opp.type,
                name=opp.name,
                country=opp.country,
                requirements=opp.requirements_json or {},
                cost=opp.cost,
                approval_rate=opp.approval_rate,
                deadline=opp.deadline,
                details=opp.details
            )
            for opp in opportunities
        ]
        
        return results
    
    except Exception as e:
        logger.error(f"List opportunities error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve opportunities"
        )

@router.get("/opportunities/{opportunity_id}", response_model=OpportunityResponse)
async def get_opportunity(
    opportunity_id: str,
    db: Session = Depends(get_db)
):
    """
    Get details of a specific opportunity
    
    Args:
        opportunity_id: UUID of the opportunity
        db: Database session
        
    Returns:
        Opportunity details
    """
    try:
        opportunity = db.query(Opportunity).filter(
            Opportunity.id == uuid.UUID(opportunity_id)
        ).first()
        
        if not opportunity:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Opportunity not found"
            )
        
        return OpportunityResponse(
            id=str(opportunity.id),
            type=opportunity.type,
            name=opportunity.name,
            country=opportunity.country,
            requirements=opportunity.requirements_json or {},
            cost=opportunity.cost,
            approval_rate=opportunity.approval_rate,
            deadline=opportunity.deadline,
            details=opportunity.details
        )
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Get opportunity error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve opportunity"
        )
