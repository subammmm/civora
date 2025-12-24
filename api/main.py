```
"""
GlobalForge.ai Backend API
FastAPI application for visa, scholarship, tax, citizenship, and wealth optimization
"""
import os
from fastapi import FastAPI, Request, status, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from sqlalchemy import text
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from contextlib import asynccontextmanager
from dotenv import load_dotenv

from database import init_db, engine, Base, get_db
from routers import users_router, matching_router, automation_router, sims_router
from utils import logger, error_response

# Load environment variables
load_dotenv()

# ============================================================================
# Application Lifespan
# ============================================================================

@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Application lifespan events
    Runs on startup and shutdown
    """
    # Startup
    logger.info("Starting GlobalForge.ai API...")
    
    # Initialize database tables
    try:
        Base.metadata.create_all(bind=engine)
        logger.info("Database tables initialized")
    except Exception as e:
        logger.error(f"Database initialization failed: {str(e)}")
    
    # Verify environment variables
    # Issue #22 FIXED: Strict JWT validation
    required_vars = ["DATABASE_URL", "JWT_SECRET_KEY"]
    missing_vars = [var for var in required_vars if not os.getenv(var)]
    if missing_vars:
        raise RuntimeError(
            f"Missing required environment variables: {missing_vars}. "
            f"Please set these in your .env file before starting the server."
        )
    
    # Validate JWT_SECRET_KEY strength
    jwt_secret = os.getenv("JWT_SECRET_KEY", "")
    if len(jwt_secret) < 32:
        raise RuntimeError(
            "JWT_SECRET_KEY must be at least 32 characters long. "
            "Generate one with: python -c 'import secrets; print(secrets.token_urlsafe(32))'"
        )
    
    logger.info("API startup complete")
    
    yield
    
    # Shutdown
    logger.info("Shutting down GlobalForge.ai API...")

# ============================================================================
# Initialize FastAPI App
# ============================================================================

app = FastAPI(
    title="GlobalForge.ai API",
    description="AI-native platform for visa, scholarship, tax, citizenship, and wealth optimization",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan
)

# ============================================================================
# CORS Configuration
# ============================================================================

# Get allowed origins from environment or use defaults
ALLOWED_ORIGINS = os.getenv(
    "CORS_ORIGINS",
    "http://localhost:3000,http://localhost:3001,https://subammmm.github.io,https://*.vercel.app"
).split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"]
)

# ============================================================================
# Rate Limiting
# ============================================================================

limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# ============================================================================
# Exception Handlers
# ============================================================================

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    """
    Global exception handler for unhandled errors
    """
    logger.error(f"Unhandled exception: {str(exc)}", exc_info=True)
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content=error_response(
            error="Internal server error",
            detail="An unexpected error occurred",
            code="INTERNAL_ERROR"
        )
    )

@app.exception_handler(RateLimitExceeded)
async def rate_limit_handler(request: Request, exc: RateLimitExceeded):
    """
    Rate limit exceeded handler
    """
    return JSONResponse(
        status_code=status.HTTP_429_TOO_MANY_REQUESTS,
        content=error_response(
            error="Rate limit exceeded",
            detail="Too many requests. Please try again later.",
            code="RATE_LIMIT_EXCEEDED"
        )
    )

# ============================================================================
# Include Routers
# ============================================================================

# Issue #45 FIXED: API Versioning
API_V1_PREFIX = "/api/v1"

# Include routers with versioning
try:
    from routers import users_router, matching_router, automation_router, sims_router
    
    app.include_router(users_router, prefix=API_V1_PREFIX, tags=["users"])
    app.include_router(matching_router, prefix=API_V1_PREFIX, tags=["matching"])
    app.include_router(automation_router, prefix=API_V1_PREFIX, tags=["automation"])
    app.include_router(sims_router, prefix=API_V1_PREFIX, tags=["sims"])
    
    logger.info(f"API routers loaded with prefix: {API_V1_PREFIX}")
except ImportError as e:
    logger.warning(f"Some routers not available: {str(e)}")
except Exception as e:
    logger.error(f"Error loading routers: {str(e)}")

# ============================================================================
# Health Check Endpoints
# ============================================================================

@app.get("/")
@limiter.limit("100/minute")
async def root(request: Request):
    """
    Root endpoint - API info
    """
    return {
        "name": "GlobalForge.ai API",
        "version": "1.0.0",
        "status": "operational",
        "docs": "/docs",
        "endpoints": {
            "users": "/api/users",
            "matching": "/api/matching",
            "automation": "/api/automation",
            "simulations": "/api/sims"
        }
    }

@app.get("/health")
async def health_check(db: Session = Depends(get_db)):
    """
    Health check endpoint
    Returns API status and database connectivity
    """
    try:
        # Check database connection
        db.execute(text("SELECT 1"))
        db_status = "connected"
    except Exception as e:
        logger.error(f"Database health check failed: {str(e)}")
        db_status = "disconnected"
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="Database unavailable")
    
    return {
        "status": "healthy",
        "database": db_status,
        "api": "healthy"
    }

# ============================================================================
# Application Entry Point
# ============================================================================

if __name__ == "__main__":
    import uvicorn
    
    port = int(os.getenv("PORT", 8000))
    host = os.getenv("HOST", "0.0.0.0")
    
    uvicorn.run(
        "main:app",
        host=host,
        port=port,
        reload=os.getenv("ENV", "production") == "development",
        log_level="info"
    )
