"""
Issue #38 FIXED: Response Caching for FastAPI
"""
from functools import lru_cache
from typing import Dict, Any
import hashlib
import json

# Simple in-memory cache for GET requests
@lru_cache(maxsize=128)
def get_opportunities_cached(
    type_filter: str = None,
    country: str = None,
    level: str = None,
    page: int = 1
):
    """
    Cached version of opportunity queries
    Note: Parameters must be hashable (no dicts/lists)
    """
    from database import SessionLocal
    from models import Opportunity
    
    db = SessionLocal()
    try:
        query = db.query(Opportunity)
        
        if type_filter:
            query = query.filter(Opportunity.type == type_filter)
        if country:
            query = query.filter(Opportunity.country == country)
        if level:
            query = query.filter(Opportunity.level == level)
            
        # Pagination
        offset = (page - 1) * 20
        results = query.offset(offset).limit(20).all()
        
        return [
            {
                "id": opp.id,
                "name": opp.name,
                "type": opp.type,
                "country": opp.country,
                "level": opp.level,
                "deadline": opp.deadline.isoformat() if opp.deadline else None,
            }
            for opp in results
        ]
    finally:
        db.close()

# For POST requests with complex filters, use manual caching
_manual_cache: Dict[str, Any] = {}

def cache_key(data: dict) -> str:
    """Generate cache key from dict"""
    json_str = json.dumps(data, sort_keys=True)
    return hashlib.md5(json_str.encode()).hexdigest()

def get_cached_result(filters: dict, ttl_seconds: int = 300):
    """Get or compute cached result"""
    import time
    
    key = cache_key(filters)
    
    if key in _manual_cache:
        cached_data, timestamp = _manual_cache[key]
        if time.time() - timestamp < ttl_seconds:
            return cached_data
    
    # Cache miss - compute result
    result = query_opportunities(filters)  # Your actual query function
    _manual_cache[key] = (result, time.time())
    
    # Clean old entries
    if len(_manual_cache) > 200:
        _manual_cache.clear()
    
    return result

def query_opportunities(filters: dict):
    """Actual database query - not cached"""
    from database import SessionLocal
    from models import Opportunity
    
    db = SessionLocal()
    try:
        query = db.query(Opportunity)
        
        for key, value in filters.items():
            if value and hasattr(Opportunity, key):
                query = query.filter(getattr(Opportunity, key) == value)
        
        return [opp.to_dict() for opp in query.all()]
    finally:
        db.close()
