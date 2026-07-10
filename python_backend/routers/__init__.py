"""Routers package"""

from .users import router as users_router
from .matching import router as matching_router
from .automation import router as automation_router
from .sims import router as sims_router

__all__ = [
    "users_router",
    "matching_router",
    "automation_router",
    "sims_router"
]
