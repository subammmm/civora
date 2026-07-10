"""
RPA (Robotic Process Automation) service for automated form filling

Uses Playwright for browser automation
"""
import os
import asyncio
from typing import Dict, Any, Optional
from playwright.async_api import async_playwright, TimeoutError as PlaywrightTimeout
from datetime import datetime

from utils import logger, ensure_directory

# Configuration
SCREENSHOTS_DIR = os.path.join(os.path.dirname(__file__), "..", "data", "screenshots")
PDF_DIR = os.path.join(os.path.dirname(__file__), "..", "data", "pdfs")

ensure_directory(SCREENSHOTS_DIR)
ensure_directory(PDF_DIR)

# ============================================================================
# RPA Service Class
# ============================================================================

class RPAService:
    """Service for automated form filling and web scraping"""
    
    def __init__(self):
        self.browser = None
        self.context = None
        self.page = None
        self.playwright = None
    
    async def start(self):
        """Initialize Playwright browser"""
        if self.browser:
            return  # Already started
        
        self.playwright = await async_playwright().start()
        self.browser = await self.playwright.chromium.launch(
            headless=True,
            args=['--no-sandbox', '--disable-setuid-sandbox']
        )
        self.context = await self.browser.new_context(
            viewport={'width': 1920, 'height': 1080},
            user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        )
        logger.info("Playwright browser started")
    
    async def stop(self):
        """Close Playwright browser"""
        if self.page:
            await self.page.close()
        if self.context:
            await self.context.close()
        if self.browser:
            await self.browser.close()
        if self.playwright:
            await self.playwright.stop()
        
        self.browser = None
        self.context = None
        self.page = None
        self.playwright = None
        logger.info("Playwright browser stopped")
    
    async def fill_form(
        self,
        url: str,
        form_data: Dict[str, Any],
        save_pdf: bool = True,
        take_screenshot: bool = True
    ) -> Dict[str, Any]:
        """
        Automatically fill out a web form
        
        Args:
            url: URL of the form
            form_data: Dictionary mapping field names/selectors to values
            save_pdf: Whether to save PDF of filled form
            take_screenshot: Whether to take screenshot
            
        Returns:
            Dictionary with status and file paths
        """
        await self.start()
        
        result = {
            "success": False,
            "url": url,
            "screenshot_path": None,
            "pdf_path": None,
            "errors": []
        }
        
        try:
            # Create new page
            self.page = await self.context.new_page()
            
            # Navigate to form
            logger.info(f"Navigating to {url}")
            await self.page.goto(url, wait_until='networkidle', timeout=30000)
            
            # Wait for page to load
            await self.page.wait_for_load_state('domcontentloaded')
            
            # Fill form fields
            for field_selector, value in form_data.items():
                try:
                    await self._fill_field(field_selector, value)
                except Exception as e:
                    error_msg = f"Error filling field {field_selector}: {str(e)}"
                    logger.error(error_msg)
                    result["errors"].append(error_msg)
            
            # Take screenshot if requested
            if take_screenshot:
                timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
                screenshot_path = os.path.join(SCREENSHOTS_DIR, f"form_{timestamp}.png")
                await self.page.screenshot(path=screenshot_path, full_page=True)
                result["screenshot_path"] = screenshot_path
                logger.info(f"Screenshot saved to {screenshot_path}")
            
            # Save PDF if requested
            if save_pdf:
                timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
                pdf_path = os.path.join(PDF_DIR, f"form_{timestamp}.pdf")
                await self.page.pdf(path=pdf_path, format='A4')
                result["pdf_path"] = pdf_path
                logger.info(f"PDF saved to {pdf_path}")
            
            result["success"] = len(result["errors"]) == 0
            
        except PlaywrightTimeout:
            error_msg = f"Timeout loading {url}"
            logger.error(error_msg)
            result["errors"].append(error_msg)
        
        except Exception as e:
            error_msg = f"Unexpected error: {str(e)}"
            logger.error(error_msg)
            result["errors"].append(error_msg)
        
        finally:
            if self.page:
                await self.page.close()
                self.page = None
        
        return result
    
    async def _fill_field(self, selector: str, value: Any):
        """
        Fill a single form field
        
        Args:
            selector: CSS selector or field name
            value: Value to fill
        """
        # Try multiple strategies to find the field
        element = None
        
        # Strategy 1: By name attribute
        try:
            element = await self.page.wait_for_selector(
                f'input[name="{selector}"], textarea[name="{selector}"], select[name="{selector}"]',
                timeout=5000
            )
        except:
            pass
        
        # Strategy 2: By ID
        if not element:
            try:
                element = await self.page.wait_for_selector(
                    f'#{selector}',
                    timeout=5000
                )
            except:
                pass
        
        # Strategy 3: By CSS selector
        if not element:
            try:
                element = await self.page.wait_for_selector(selector, timeout=5000)
            except:
                pass
        
        # Strategy 4: By label text
        if not element:
            try:
                element = await self.page.wait_for_selector(
                    f'xpath=//label[contains(text(), "{selector}")]/following::input[1]',
                    timeout=5000
                )
            except:
                pass
        
        if not element:
            raise Exception(f"Could not find field: {selector}")
        
        # Get element type
        tag_name = await element.evaluate('el => el.tagName.toLowerCase()')
        element_type = await element.get_attribute('type')
        
        # Fill based on element type
        if tag_name == 'select':
            await element.select_option(str(value))
        elif element_type == 'checkbox':
            is_checked = await element.is_checked()
            if (value and not is_checked) or (not value and is_checked):
                await element.click()
        elif element_type == 'radio':
            if value:
                await element.click()
        elif element_type == 'file':
            await element.set_input_files(str(value))
        else:
            # Text input, textarea, etc.
            await element.fill(str(value))
        
        logger.info(f"Filled field {selector} with value {value}")
    
    async def scrape_data(
        self,
        url: str,
        selectors: Dict[str, str]
    ) -> Dict[str, Any]:
        """
        Scrape data from a webpage
        
        Args:
            url: URL to scrape
            selectors: Dictionary mapping keys to CSS selectors
            
        Returns:
            Dictionary with scraped data
        """
        await self.start()
        
        result = {
            "success": False,
            "url": url,
            "data": {},
            "errors": []
        }
        
        try:
            self.page = await self.context.new_page()
            await self.page.goto(url, wait_until='networkidle', timeout=30000)
            
            for key, selector in selectors.items():
                try:
                    element = await self.page.wait_for_selector(selector, timeout=5000)
                    text = await element.text_content()
                    result["data"][key] = text.strip()
                except Exception as e:
                    error_msg = f"Error scraping {key}: {str(e)}"
                    logger.error(error_msg)
                    result["errors"].append(error_msg)
            
            result["success"] = len(result["errors"]) == 0
            
        except Exception as e:
            error_msg = f"Scraping error: {str(e)}"
            logger.error(error_msg)
            result["errors"].append(error_msg)
        
        finally:
            if self.page:
                await self.page.close()
                self.page = None
        
        return result

# Global service instance
rpa_service = RPAService()

# ============================================================================
# Convenience Functions
# ============================================================================

async def fill_visa_form(
    form_url: str,
    applicant_data: Dict[str, Any]
) -> Dict[str, Any]:
    """
    Fill a visa application form
    
    Args:
        form_url: URL of the visa form
        applicant_data: Applicant information
        
    Returns:
        Result dictionary
    """
    # Map common fields to form selectors
    form_data = {
        "firstName": applicant_data.get("first_name", ""),
        "lastName": applicant_data.get("last_name", ""),
        "email": applicant_data.get("email", ""),
        "dateOfBirth": applicant_data.get("date_of_birth", ""),
        "nationality": applicant_data.get("nationality", ""),
        "passportNumber": applicant_data.get("passport_number", ""),
        "occupation": applicant_data.get("occupation", ""),
        "address": applicant_data.get("address", "")
    }
    
    return await rpa_service.fill_form(form_url, form_data, save_pdf=True)

async def fill_scholarship_form(
    form_url: str,
    applicant_data: Dict[str, Any]
) -> Dict[str, Any]:
    """
    Fill a scholarship application form
    
    Args:
        form_url: URL of the scholarship form
        applicant_data: Applicant information
        
    Returns:
        Result dictionary
    """
    # Map common fields to form selectors
    form_data = {
        "fullName": applicant_data.get("full_name", ""),
        "email": applicant_data.get("email", ""),
        "dateOfBirth": applicant_data.get("date_of_birth", ""),
        "nationality": applicant_data.get("nationality", ""),
        "education": applicant_data.get("education_level", ""),
        "fieldOfStudy": applicant_data.get("field_of_study", ""),
        "gpa": applicant_data.get("gpa", ""),
        "essay": applicant_data.get("essay", "")
    }
    
    return await rpa_service.fill_form(form_url, form_data, save_pdf=True)

# ============================================================================
# Cleanup on module exit
# ============================================================================

import atexit

def cleanup():
    """Cleanup function to close browser on exit"""
    if rpa_service.browser:
        asyncio.run(rpa_service.stop())

atexit.register(cleanup)
