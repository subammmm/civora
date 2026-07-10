"""Services package for GlobalForge.ai backend"""

from .ml_service import matching_service, get_visa_matches, get_scholarship_matches
from .rpa_service import rpa_service, fill_visa_form, fill_scholarship_form
from .sim_service import simulate_tax_savings, simulate_citizenship_path, simulate_wealth_optimization

__all__ = [
    "matching_service",
    "get_visa_matches",
    "get_scholarship_matches",
    "rpa_service",
    "fill_visa_form",
    "fill_scholarship_form",
    "simulate_tax_savings",
    "simulate_citizenship_path",
    "simulate_wealth_optimization"
]
