"""
RPA automation routes for form filling
"""
from fastapi import APIRouter, Depends, HTTPException, status, BackgroundTasks
from sqlalchemy.orm import Session
from typing import Dict, Any

from database import get_db
from models import User, FormFillRequest
from routers.users import get_current_user
from services.rpa_service import rpa_service, fill_visa_form, fill_scholarship_form
from utils import logger, error_response, success_response

router = APIRouter(prefix="/automation", tags=["automation"])

# ============================================================================
# Routes
# ============================================================================

@router.post("/fill-form")
async def automated_form_fill(
    request: FormFillRequest,
    background_tasks: BackgroundTasks,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Automatically fill out a web form using RPA
    
    Args:
        request: Form filling request with URL and data
        background_tasks: FastAPI background tasks
        current_user: Authenticated user
        db: Database session
        
    Returns:
        Task ID and status
    """
    try:
        # Validate request
        if not request.form_url:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Form URL is required"
            )
        
        if not request.form_data:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Form data is required"
            )
        
        # Log the request
        logger.info(f"Form fill request for user {current_user.email}: {request.form_url}")
        
        # Execute form filling asynchronously
        result = await rpa_service.fill_form(
            url=request.form_url,
            form_data=request.form_data,
            save_pdf=request.save_pdf,
            take_screenshot=True
        )
        
        if result["success"]:
            return success_response(
                data={
                    "url": result["url"],
                    "screenshot_path": result["screenshot_path"],
                    "pdf_path": result["pdf_path"],
                    "message": "Form filled successfully"
                },
                message="Form automation completed"
            )
        else:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Form filling failed: {', '.join(result['errors'])}"
            )
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Form automation error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Form automation failed: {str(e)}"
        )

@router.post("/fill-visa-form")
async def fill_visa_application(
    form_url: str,
    background_tasks: BackgroundTasks,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Fill a visa application form using user profile data
    
    Args:
        form_url: URL of the visa application form
        background_tasks: FastAPI background tasks
        current_user: Authenticated user
        db: Database session
        
    Returns:
        Result with PDF and screenshot paths
    """
    try:
        # Get user profile
        profile = current_user.profile_json
        if not profile:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Please complete your profile before filling forms"
            )
        
        # Prepare applicant data from profile
        applicant_data = {
            "first_name": profile.get("first_name", ""),
            "last_name": profile.get("last_name", ""),
            "email": current_user.email,
            "date_of_birth": profile.get("date_of_birth", ""),
            "nationality": profile.get("nationality", ""),
            "passport_number": profile.get("passport_number", ""),
            "occupation": profile.get("occupation", ""),
            "address": profile.get("address", "")
        }
        
        # Log the request
        logger.info(f"Visa form fill for user {current_user.email}: {form_url}")
        
        # Execute form filling
        result = await fill_visa_form(form_url, applicant_data)
        
        if result["success"]:
            return success_response(
                data={
                    "url": result["url"],
                    "screenshot_path": result["screenshot_path"],
                    "pdf_path": result["pdf_path"]
                },
                message="Visa form filled successfully"
            )
        else:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Visa form filling failed: {', '.join(result['errors'])}"
            )
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Visa form automation error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Visa form automation failed: {str(e)}"
        )

@router.post("/fill-scholarship-form")
async def fill_scholarship_application(
    form_url: str,
    essay: str = "",
    background_tasks: BackgroundTasks = None,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Fill a scholarship application form using user profile data
    
    Args:
        form_url: URL of the scholarship application form
        essay: Essay or personal statement text
        background_tasks: FastAPI background tasks
        current_user: Authenticated user
        db: Database session
        
    Returns:
        Result with PDF and screenshot paths
    """
    try:
        # Get user profile
        profile = current_user.profile_json
        if not profile:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Please complete your profile before filling forms"
            )
        
        # Prepare applicant data from profile
        applicant_data = {
            "full_name": f"{profile.get('first_name', '')} {profile.get('last_name', '')}",
            "email": current_user.email,
            "date_of_birth": profile.get("date_of_birth", ""),
            "nationality": profile.get("nationality", ""),
            "education_level": profile.get("education_level", ""),
            "field_of_study": profile.get("field_of_study", ""),
            "gpa": profile.get("gpa", ""),
            "essay": essay
        }
        
        # Log the request
        logger.info(f"Scholarship form fill for user {current_user.email}: {form_url}")
        
        # Execute form filling
        result = await fill_scholarship_form(form_url, applicant_data)
        
        if result["success"]:
            return success_response(
                data={
                    "url": result["url"],
                    "screenshot_path": result["screenshot_path"],
                    "pdf_path": result["pdf_path"]
                },
                message="Scholarship form filled successfully"
            )
        else:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Scholarship form filling failed: {', '.join(result['errors'])}"
            )
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Scholarship form automation error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Scholarship form automation failed: {str(e)}"
        )

@router.post("/scrape")
async def scrape_webpage(
    url: str,
    selectors: Dict[str, str],
    current_user: User = Depends(get_current_user)
):
    """
    Scrape data from a webpage (for research purposes)
    
    Args:
        url: URL to scrape
        selectors: Dictionary mapping keys to CSS selectors
        current_user: Authenticated user
        
    Returns:
        Scraped data
    """
    try:
        logger.info(f"Scrape request for user {current_user.email}: {url}")
        
        result = await rpa_service.scrape_data(url, selectors)
        
        if result["success"]:
            return success_response(
                data=result["data"],
                message="Data scraped successfully"
            )
        else:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Scraping failed: {', '.join(result['errors'])}"
            )
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Scraping error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Scraping failed: {str(e)}"
        )
