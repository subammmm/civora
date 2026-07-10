"""
Tests for authentication endpoints
"""
import pytest
from fastapi.testclient import TestClient
import sys
import os

# Add parent directory to path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from main import app
from database import SessionLocal, Base, engine

client = TestClient(app)

# Test database setup
@pytest.fixture(scope="function")
def test_db():
    """Create test database and clean up after test"""
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)

def test_register_user(test_db):
    """Test user registration"""
    response = client.post(
        "/api/users/register",
        json={
            "email": "test@example.com",
            "password": "TestPassword123!"
        }
    )
    assert response.status_code == 201
    assert "access_token" in response.json()

def test_register_duplicate_email(test_db):
    """Test registration with duplicate email"""
    # Register first user
    client.post(
        "/api/users/register",
        json={
            "email": "test@example.com",
            "password": "TestPassword123!"
        }
    )
    
    # Try to register again with same email
    response = client.post(
        "/api/users/register",
        json={
            "email": "test@example.com",
            "password": "AnotherPassword123!"
        }
    )
    assert response.status_code == 400
    assert "already registered" in response.json()["detail"]

def test_login_success(test_db):
    """Test successful login"""
    # Register user
    client.post(
        "/api/users/register",
        json={
            "email": "test@example.com",
            "password": "TestPassword123!"
        }
    )
    
    # Login
    response = client.post(
        "/api/users/login",
        json={
            "email": "test@example.com",
            "password": "TestPassword123!"
        }
    )
    assert response.status_code == 200
    assert "access_token" in response.json()

def test_login_wrong_password(test_db):
    """Test login with wrong password"""
    # Register user
    client.post(
        "/api/users/register",
        json={
            "email": "test@example.com",
            "password": "TestPassword123!"
        }
    )
    
    # Try to login with wrong password
    response = client.post(
        "/api/users/login",
        json={
            "email": "test@example.com",
            "password": "WrongPassword123!"
        }
    )
    assert response.status_code == 401

def test_get_profile_unauthorized():
    """Test accessing profile without token"""
    response = client.get("/api/users/profile")
    assert response.status_code == 403  # No Authorization header

def test_get_profile_authorized(test_db):
    """Test accessing profile with valid token"""
    # Register and get token
    reg_response = client.post(
        "/api/users/register",
        json={
            "email": "test@example.com",
            "password": "TestPassword123!"
        }
    )
    token = reg_response.json()["access_token"]
    
    # Get profile
    response = client.get(
        "/api/users/profile",
        headers={"Authorization": f"Bearer {token}"}
    )
    assert response.status_code == 200
    assert response.json()["email"] == "test@example.com"

def test_update_profile(test_db):
    """Test updating user profile"""
    # Register and get token
    reg_response = client.post(
        "/api/users/register",
        json={
            "email": "test@example.com",
            "password": "TestPassword123!"
        }
    )
    token = reg_response.json()["access_token"]
    
    # Update profile
    response = client.put(
        "/api/users/profile",
        headers={"Authorization": f"Bearer {token}"},
        json={
            "age": 25,
            "nationality": "Nepal",
            "education_level": "Bachelor",
            "field_of_study": "Computer Science"
        }
    )
    assert response.status_code == 200
    assert response.json()["data"]["profile"]["age"] == 25
