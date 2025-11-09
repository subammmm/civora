"""
Tests for matching endpoints
"""
import pytest
from fastapi.testclient import TestClient
import sys
import os

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from main import app
from database import SessionLocal, Base, engine
from models import User, Opportunity
from utils import hash_password
import uuid

client = TestClient(app)

@pytest.fixture(scope="function")
def test_db_with_data():
    """Create test database with sample data"""
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    
    # Create test user
    user = User(
        id=uuid.uuid4(),
        email="test@example.com",
        password_hash=hash_password("TestPassword123!"),
        profile_json={
            "age": 25,
            "nationality": "Nepal",
            "education_level": "Bachelor",
            "field_of_study": "Computer Science",
            "skills": ["Python", "Machine Learning"],
            "languages": ["English", "Nepali"],
            "target_countries": ["United States"],
            "budget": 50000
        }
    )
    db.add(user)
    
    # Create test visa opportunity
    visa = Opportunity(
        id=uuid.uuid4(),
        type="visa",
        name="H-1B Visa",
        country="United States",
        requirements_json={
            "education": "Bachelor's degree",
            "field": "Computer Science",
            "skills": ["Technical skills"]
        },
        cost=2500,
        approval_rate=0.74,
        details="H-1B specialty occupation visa"
    )
    db.add(visa)
    
    # Create test scholarship opportunity
    scholarship = Opportunity(
        id=uuid.uuid4(),
        type="scholarship",
        name="Test Scholarship",
        country="United States",
        requirements_json={
            "level": "Graduate",
            "field": "Computer Science",
            "gpa": "3.5+"
        },
        cost=0,
        approval_rate=0.15,
        details="Merit-based scholarship"
    )
    db.add(scholarship)
    
    db.commit()
    db.close()
    
    yield
    
    Base.metadata.drop_all(bind=engine)

def test_list_opportunities(test_db_with_data):
    """Test listing opportunities"""
    response = client.get("/api/matching/opportunities")
    assert response.status_code == 200
    assert len(response.json()) >= 2

def test_list_opportunities_filtered(test_db_with_data):
    """Test listing opportunities with filters"""
    response = client.get("/api/matching/opportunities?type=visa")
    assert response.status_code == 200
    assert all(opp["type"] == "visa" for opp in response.json())

def get_auth_token():
    """Helper to get auth token"""
    response = client.post(
        "/api/users/register",
        json={
            "email": "test@example.com",
            "password": "TestPassword123!"
        }
    )
    return response.json()["access_token"]

def test_get_visa_matches(test_db_with_data):
    """Test getting visa matches"""
    token = get_auth_token()
    
    response = client.get(
        "/api/matching/visas",
        headers={"Authorization": f"Bearer {token}"}
    )
    
    # Should return matches based on user profile
    assert response.status_code == 200

def test_get_scholarship_matches(test_db_with_data):
    """Test getting scholarship matches"""
    token = get_auth_token()
    
    response = client.get(
        "/api/matching/scholarships",
        headers={"Authorization": f"Bearer {token}"}
    )
    
    # Should return matches based on user profile
    assert response.status_code == 200
