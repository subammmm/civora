"""
Issue #47 FIXED: Service Layer Pattern
Separates business logic from API routes
"""
from sqlalchemy.orm import Session
from typing import List, Optional, Dict
from models import Opportunity, User
from datetime import datetime

class OpportunityService:
    """Business logic for opportunity management"""
    
    def __init__(self, db: Session):
        self.db = db
    
    def get_opportunities(
        self,
        type_filter: Optional[str] = None,
        country: Optional[str] = None,
        level: Optional[str] = None,
        page: int = 1,
        limit: int = 20
    ) -> Dict:
        """Get filtered opportunities with pagination"""
        query = self.db.query(Opportunity)
        
        # Apply filters
        if type_filter and type_filter != 'all':
            query = query.filter(Opportunity.type == type_filter)
        if country:
            query = query.filter(Opportunity.country == country)
        if level:
            query = query.filter(Opportunity.level == level)
        
        # Get total count
        total = query.count()
        
        # Apply pagination
        offset = (page - 1) * limit
        items = query.offset(offset).limit(limit).all()
        
        return {
            "items": [self._opportunity_to_dict(opp) for opp in items],
            "total": total,
            "page": page,
            "limit": limit,
            "total_pages": (total + limit - 1) // limit
        }
    
    def get_opportunity_by_id(self, opportunity_id: int) -> Optional[Dict]:
        """Get single opportunity"""
        opp = self.db.query(Opportunity).filter(Opportunity.id == opportunity_id).first()
        return self._opportunity_to_dict(opp) if opp else None
    
    def create_opportunity(self, data: Dict) -> Dict:
        """Create new opportunity"""
        opportunity = Opportunity(**data)
        self.db.add(opportunity)
        self.db.commit()
        self.db.refresh(opportunity)
        return self._opportunity_to_dict(opportunity)
    
    def update_opportunity(self, opportunity_id: int, data: Dict) -> Optional[Dict]:
        """Update opportunity"""
        opp = self.db.query(Opportunity).filter(Opportunity.id == opportunity_id).first()
        if not opp:
            return None
        
        for key, value in data.items():
            if hasattr(opp, key):
                setattr(opp, key, value)
        
        self.db.commit()
        self.db.refresh(opp)
        return self._opportunity_to_dict(opp)
    
    def delete_opportunity(self, opportunity_id: int) -> bool:
        """Delete opportunity"""
        opp = self.db.query(Opportunity).filter(Opportunity.id == opportunity_id).first()
        if not opp:
            return False
        
        self.db.delete(opp)
        self.db.commit()
        return True
    
    @staticmethod
    def _opportunity_to_dict(opp: Opportunity) -> Dict:
        """Convert ORM model to dict (Issue #48: Response DTO)"""
        return {
            "id": opp.id,
            "type": opp.type,
            "name": opp.name,
            "country": opp.country,
            "level": opp.level,
            "deadline": opp.deadline.isoformat() if opp.deadline else None,
            "description": opp.description,
            "requirements": opp.requirements,
            "application_link": opp.application_link,
            "created_at": opp.created_at.isoformat() if opp.created_at else None,
        }


class UserService:
    """Business logic for user management"""
    
    def __init__(self, db: Session):
        self.db = db
    
    def create_user(self, email: str, password: str, full_name: str) -> Dict:
        """Create new user with hashed password"""
        from passlib.hash import bcrypt
        
        hashed_password = bcrypt.hash(password)
        user = User(
            email=email,
            hashed_password=hashed_password,
            full_name=full_name
        )
        
        self.db.add(user)
        self.db.commit()
        self.db.refresh(user)
        
        return self._user_to_dict(user)
    
    def get_user_by_email(self, email: str) -> Optional[Dict]:
        """Get user by email"""
        user = self.db.query(User).filter(User.email == email).first()
        return self._user_to_dict(user) if user else None
    
    @staticmethod
    def _user_to_dict(user: User) -> Dict:
        """Convert user to dict (excluding password)"""
        return {
            "id": user.id,
            "email": user.email,
            "full_name": user.full_name,
            "created_at": user.created_at.isoformat() if user.created_at else None,
            "is_active": user.is_active,
        }

# Usage in routers:
# from services.opportunity_service import OpportunityService
# 
# @router.get("/opportunities")
# def list_opportunities(
#     type_filter: Optional[str] = None,
#     db: Session = Depends(get_db)
# ):
#     service = OpportunityService(db)
#     return service.get_opportunities(type_filter=type_filter)
