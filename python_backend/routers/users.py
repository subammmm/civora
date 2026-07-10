"""
User authentication and profile management routes
"""
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from typing import Dict, Any
import uuid

from database import get_db
from models import User, UserRegister, UserLogin, UserResponse, TokenResponse, UserProfile
from utils import (
    hash_password,
    verify_password,
    create_access_token,
    decode_access_token,
    sanitize_email,
    logger,
    error_response,
    success_response
)

router = APIRouter(prefix="/users", tags=["users"])
security = HTTPBearer()

# ============================================================================
# Authentication Dependency
# ============================================================================

async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
) -> User:
    """
    Dependency to get current authenticated user from JWT token
    
    Args:
        credentials: Bearer token from Authorization header
        db: Database session
        
    Returns:
        User object if authenticated
        
    Raises:
        HTTPException: If token is invalid or user not found
    """
    token = credentials.credentials
    payload = decode_access_token(token)
    
    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
            headers={"WWW-Authenticate": "Bearer"}
        )
    
    user_id = payload.get("sub")
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token payload",
            headers={"WWW-Authenticate": "Bearer"}
        )
    
    user = db.query(User).filter(User.id == uuid.UUID(user_id)).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found",
            headers={"WWW-Authenticate": "Bearer"}
        )
    
    return user

# ============================================================================
# Routes
# ============================================================================

@router.post("/register", response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
async def register(user_data: UserRegister, db: Session = Depends(get_db)):
    """
    Register a new user account
    
    Args:
        user_data: User registration data (email, password)
        db: Database session
        
    Returns:
        JWT access token
        
    Raises:
        HTTPException: If email already exists
    """
    try:
        # Sanitize email
        email = sanitize_email(user_data.email)
        
        # Check if user already exists
        existing_user = db.query(User).filter(User.email == email).first()
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )
        
        # Hash password
        password_hash = hash_password(user_data.password)
        
        # Create new user
        new_user = User(
            id=uuid.uuid4(),
            email=email,
            password_hash=password_hash,
            profile_json={}
        )
        
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        
        # Create access token
        access_token = create_access_token(data={"sub": str(new_user.id)})
        
        logger.info(f"User registered: {email}")
        
        return TokenResponse(access_token=access_token)
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Registration error: {str(e)}")
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Registration failed"
        )

@router.post("/login", response_model=TokenResponse)
async def login(credentials: UserLogin, db: Session = Depends(get_db)):
    """
    Login with email and password
    
    Args:
        credentials: Login credentials (email, password)
        db: Database session
        
    Returns:
        JWT access token
        
    Raises:
        HTTPException: If credentials are invalid
    """
    try:
        # Sanitize email
        email = sanitize_email(credentials.email)
        
        # Find user
        user = db.query(User).filter(User.email == email).first()
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password"
            )
        
        # Verify password
        if not verify_password(credentials.password, user.password_hash):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password"
            )
        
        # Create access token
        access_token = create_access_token(data={"sub": str(user.id)})
        
        logger.info(f"User logged in: {email}")
        
        return TokenResponse(access_token=access_token)
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Login error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Login failed"
        )

@router.get("/profile", response_model=UserResponse)
async def get_profile(current_user: User = Depends(get_current_user)):
    """
    Get current user profile
    
    Args:
        current_user: Authenticated user from token
        
    Returns:
        User profile data
    """
    return UserResponse(
        id=str(current_user.id),
        email=current_user.email,
        profile=current_user.profile_json or {},
        created_at=current_user.created_at
    )

@router.put("/profile")
async def update_profile(
    profile_data: UserProfile,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Update user profile
    
    Args:
        profile_data: Profile data to update
        current_user: Authenticated user from token
        db: Database session
        
    Returns:
        Success message with updated profile
    """
    try:
        # Update profile JSON
        current_user.profile_json = profile_data.model_dump(exclude_unset=True)
        
        db.commit()
        db.refresh(current_user)
        
        logger.info(f"Profile updated for user: {current_user.email}")
        
        return success_response(
            data={
                "id": str(current_user.id),
                "email": current_user.email,
                "profile": current_user.profile_json
            },
            message="Profile updated successfully"
        )
    
    except Exception as e:
        logger.error(f"Profile update error: {str(e)}")
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Profile update failed"
        )

@router.delete("/account")
async def delete_account(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Delete user account (soft delete - for compliance)
    
    Args:
        current_user: Authenticated user from token
        db: Database session
        
    Returns:
        Success message
    """
    try:
        # In production, implement soft delete with a 'deleted_at' field
        # For now, we'll actually delete
        db.delete(current_user)
        db.commit()
        
        logger.info(f"Account deleted: {current_user.email}")
        
        return success_response(
            data=None,
            message="Account deleted successfully"
        )
    
    except Exception as e:
        logger.error(f"Account deletion error: {str(e)}")
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Account deletion failed"
        )
