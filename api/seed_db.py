"""
Database seeding script for GlobalForge.ai
Populates database with sample visas, scholarships, and users
"""
import os
import sys
import json
from datetime import datetime, timedelta
from dotenv import load_dotenv

# Add parent directory to path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

load_dotenv()

from database import SessionLocal, init_db
from models import User, Opportunity
from utils import hash_password
import uuid

# ============================================================================
# Sample Data
# ============================================================================

VISA_OPPORTUNITIES = [
    {
        "name": "H-1B Specialty Occupation Visa",
        "country": "United States",
        "type": "visa",
        "requirements": {
            "education": "Bachelor's degree or higher",
            "experience": "Relevant work experience in specialty field",
            "skills": ["Technical skills", "Professional degree"],
            "language": "English proficiency"
        },
        "cost": 2500,
        "approval_rate": 0.74,
        "deadline": datetime.now() + timedelta(days=180),
        "details": "H-1B visa for specialty occupations in fields like IT, engineering, medicine, etc."
    },
    {
        "name": "UK Skilled Worker Visa",
        "country": "United Kingdom",
        "type": "visa",
        "requirements": {
            "education": "Degree level qualification or equivalent",
            "experience": "Job offer from UK employer",
            "skills": ["English language", "Skill level RQF3 or above"],
            "salary_threshold": "£25,600 or occupation rate"
        },
        "cost": 1500,
        "approval_rate": 0.82,
        "deadline": None,
        "details": "Skilled Worker visa for those with a job offer from UK licensed sponsor"
    },
    {
        "name": "Australia Skilled Independent 189",
        "country": "Australia",
        "type": "visa",
        "requirements": {
            "age": "Under 45 years",
            "education": "Tertiary qualification",
            "experience": "Work experience in nominated occupation",
            "points": "Minimum 65 points",
            "language": "Competent English (IELTS 6)"
        },
        "cost": 4000,
        "approval_rate": 0.68,
        "deadline": None,
        "details": "Points-based permanent residence visa for skilled workers"
    },
    {
        "name": "Canada Express Entry",
        "country": "Canada",
        "type": "visa",
        "requirements": {
            "age": "18-45 preferred",
            "education": "Educational credential assessment",
            "experience": "1+ years skilled work",
            "language": "IELTS or TEF",
            "points": "Comprehensive Ranking System score"
        },
        "cost": 1200,
        "approval_rate": 0.75,
        "deadline": None,
        "details": "Federal Express Entry system for skilled worker permanent residence"
    },
    {
        "name": "Germany Blue Card (EU)",
        "country": "Germany",
        "type": "visa",
        "requirements": {
            "education": "University degree",
            "salary": "€56,800+ annually (€44,304 for shortage occupations)",
            "language": "Basic German (A1) recommended",
            "contract": "Employment contract"
        },
        "cost": 100,
        "approval_rate": 0.88,
        "deadline": None,
        "details": "EU Blue Card for highly qualified workers in Germany"
    },
    {
        "name": "Singapore Employment Pass",
        "country": "Singapore",
        "type": "visa",
        "requirements": {
            "education": "University degree or specialized skills",
            "salary": "SGD 5,000+ monthly",
            "experience": "Relevant work experience"
        },
        "cost": 225,
        "approval_rate": 0.79,
        "deadline": None,
        "details": "Employment Pass for foreign professionals in Singapore"
    },
    {
        "name": "New Zealand Skilled Migrant",
        "country": "New Zealand",
        "type": "visa",
        "requirements": {
            "age": "Under 55",
            "education": "Recognized qualification",
            "experience": "Skilled employment",
            "points": "160 points minimum",
            "language": "English proficiency"
        },
        "cost": 3000,
        "approval_rate": 0.71,
        "deadline": None,
        "details": "Resident visa for skilled workers with job offer or in-demand skills"
    },
    {
        "name": "Netherlands Highly Skilled Migrant",
        "country": "Netherlands",
        "type": "visa",
        "requirements": {
            "employer": "Recognized sponsor",
            "salary": "€5,008+ monthly (age 30+)",
            "education": "Higher education or specialized expertise"
        },
        "cost": 350,
        "approval_rate": 0.85,
        "deadline": None,
        "details": "Residence permit for highly skilled migrants with recognized sponsor"
    },
    {
        "name": "UAE Golden Visa",
        "country": "United Arab Emirates",
        "type": "visa",
        "requirements": {
            "category": "Investors, entrepreneurs, specialists, researchers",
            "investment": "AED 2 million+ or exceptional talent"
        },
        "cost": 5000,
        "approval_rate": 0.72,
        "deadline": None,
        "details": "Long-term residence visa (5-10 years) for investors and talented professionals"
    },
    {
        "name": "Portugal Tech Visa",
        "country": "Portugal",
        "type": "visa",
        "requirements": {
            "field": "Technology/IT sector",
            "company": "Certified startup or tech company",
            "role": "Highly qualified position"
        },
        "cost": 500,
        "approval_rate": 0.81,
        "deadline": None,
        "details": "Fast-track visa for tech professionals and entrepreneurs"
    }
]

# Add 40 more visas (truncated for brevity - would include more countries)
MORE_VISAS = [
    {"name": f"Country {i} Work Visa", "country": f"Country{i}", "type": "visa",
     "requirements": {"education": "Bachelor's", "experience": "2+ years"},
     "cost": 1000 + (i * 100), "approval_rate": 0.65 + (i * 0.01),
     "deadline": None, "details": f"Work visa for Country {i}"}
    for i in range(11, 51)
]

SCHOLARSHIP_OPPORTUNITIES = [
    {
        "name": "Fulbright Foreign Student Program",
        "country": "United States",
        "type": "scholarship",
        "requirements": {
            "level": "Graduate",
            "gpa": "3.5+",
            "field": "Any field",
            "language": "TOEFL 80+",
            "nationality": "Open to all countries"
        },
        "cost": 0,
        "approval_rate": 0.15,
        "deadline": datetime.now() + timedelta(days=120),
        "details": "Fully-funded graduate scholarships for international students in the US"
    },
    {
        "name": "Chevening Scholarships",
        "country": "United Kingdom",
        "type": "scholarship",
        "requirements": {
            "level": "Master's",
            "experience": "2+ years work experience",
            "leadership": "Leadership potential",
            "language": "IELTS 6.5+"
        },
        "cost": 0,
        "approval_rate": 0.03,
        "deadline": datetime.now() + timedelta(days=90),
        "details": "UK government's global scholarship program for future leaders"
    },
    {
        "name": "DAAD Scholarships",
        "country": "Germany",
        "type": "scholarship",
        "requirements": {
            "level": "Graduate/Postgraduate",
            "gpa": "Good academic record",
            "field": "Any field",
            "language": "German or English"
        },
        "cost": 0,
        "approval_rate": 0.20,
        "deadline": datetime.now() + timedelta(days=150),
        "details": "German Academic Exchange Service scholarships for international students"
    },
    {
        "name": "Australia Awards Scholarships",
        "country": "Australia",
        "type": "scholarship",
        "requirements": {
            "level": "Undergraduate/Graduate",
            "region": "Developing countries",
            "language": "IELTS 6.5+",
            "leadership": "Development focus"
        },
        "cost": 0,
        "approval_rate": 0.12,
        "deadline": datetime.now() + timedelta(days=180),
        "details": "Australian government scholarships for students from developing countries"
    },
    {
        "name": "Erasmus Mundus Joint Masters",
        "country": "European Union",
        "type": "scholarship",
        "requirements": {
            "level": "Master's",
            "mobility": "Study in 2+ EU countries",
            "field": "Specific programs",
            "language": "English proficiency"
        },
        "cost": 0,
        "approval_rate": 0.18,
        "deadline": datetime.now() + timedelta(days=200),
        "details": "Fully-funded scholarships for joint master's programs across European universities"
    }
]

# Generate 195 more sample scholarships
for i in range(6, 201):
    country_options = ["United States", "United Kingdom", "Canada", "Germany", "Australia", 
                      "France", "Netherlands", "Sweden", "Japan", "South Korea", "Singapore"]
    level_options = ["Undergraduate", "Graduate", "PhD"]
    field_options = ["Engineering", "Computer Science", "Medicine", "Business", "Arts", 
                    "Sciences", "Humanities", "Social Sciences"]
    
    SCHOLARSHIP_OPPORTUNITIES.append({
        "name": f"Scholarship Program {i}",
        "country": country_options[i % len(country_options)],
        "type": "scholarship",
        "requirements": {
            "level": level_options[i % len(level_options)],
            "gpa": "3.0+",
            "field": field_options[i % len(field_options)],
            "language": "English proficiency"
        },
        "cost": 0,
        "approval_rate": 0.10 + (i % 30) * 0.01,
        "deadline": datetime.now() + timedelta(days=30 + (i * 5) % 300),
        "details": f"Merit-based scholarship for {field_options[i % len(field_options)]} students"
    })

# ============================================================================
# Seed Functions
# ============================================================================

def seed_opportunities(db):
    """Seed visa and scholarship opportunities"""
    print("Seeding opportunities...")
    
    # Add visas
    all_visas = VISA_OPPORTUNITIES + MORE_VISAS
    for visa_data in all_visas:
        opportunity = Opportunity(
            id=uuid.uuid4(),
            type=visa_data["type"],
            name=visa_data["name"],
            country=visa_data["country"],
            requirements_json=visa_data["requirements"],
            cost=visa_data.get("cost"),
            approval_rate=visa_data.get("approval_rate"),
            deadline=visa_data.get("deadline"),
            details=visa_data.get("details")
        )
        db.add(opportunity)
    
    print(f"Added {len(all_visas)} visa opportunities")
    
    # Add scholarships
    for scholarship_data in SCHOLARSHIP_OPPORTUNITIES:
        opportunity = Opportunity(
            id=uuid.uuid4(),
            type=scholarship_data["type"],
            name=scholarship_data["name"],
            country=scholarship_data["country"],
            requirements_json=scholarship_data["requirements"],
            cost=scholarship_data.get("cost"),
            approval_rate=scholarship_data.get("approval_rate"),
            deadline=scholarship_data.get("deadline"),
            details=scholarship_data.get("details")
        )
        db.add(opportunity)
    
    print(f"Added {len(SCHOLARSHIP_OPPORTUNITIES)} scholarship opportunities")
    
    db.commit()

def seed_users(db):
    """Seed sample users"""
    print("Seeding sample users...")
    
    sample_users = [
        {
            "email": "john.doe@example.com",
            "password": "Password123!",
            "profile": {
                "age": 25,
                "nationality": "Nepal",
                "education_level": "Bachelor",
                "field_of_study": "Computer Science",
                "work_experience_years": 2,
                "skills": ["Python", "Machine Learning", "Web Development"],
                "languages": ["English", "Nepali"],
                "target_countries": ["United States", "Canada"],
                "budget": 50000,
                "goals": "Pursue master's degree in AI/ML"
            }
        },
        {
            "email": "jane.smith@example.com",
            "password": "SecurePass456!",
            "profile": {
                "age": 28,
                "nationality": "India",
                "education_level": "Master",
                "field_of_study": "Engineering",
                "work_experience_years": 5,
                "skills": ["Leadership", "Project Management", "Technical Design"],
                "languages": ["English", "Hindi"],
                "target_countries": ["Germany", "Netherlands"],
                "budget": 30000,
                "goals": "Career advancement in Europe"
            }
        }
    ]
    
    for user_data in sample_users:
        user = User(
            id=uuid.uuid4(),
            email=user_data["email"],
            password_hash=hash_password(user_data["password"]),
            profile_json=user_data["profile"]
        )
        db.add(user)
    
    print(f"Added {len(sample_users)} sample users")
    db.commit()

def main():
    """Main seeding function"""
    print("=" * 60)
    print("GlobalForge.ai Database Seeding")
    print("=" * 60)
    
    # Initialize database
    print("\nInitializing database...")
    init_db()
    
    # Create session
    db = SessionLocal()
    
    try:
        # Check if already seeded
        existing_count = db.query(Opportunity).count()
        if existing_count > 0:
            response = input(f"\nDatabase already has {existing_count} opportunities. Clear and reseed? (y/n): ")
            if response.lower() != 'y':
                print("Seeding cancelled.")
                return
            
            # Clear existing data
            print("Clearing existing data...")
            db.query(Opportunity).delete()
            db.query(User).delete()
            db.commit()
        
        # Seed data
        seed_opportunities(db)
        seed_users(db)
        
        print("\n" + "=" * 60)
        print("Database seeding completed successfully!")
        print("=" * 60)
        
        # Print summary
        visa_count = db.query(Opportunity).filter(Opportunity.type == "visa").count()
        scholarship_count = db.query(Opportunity).filter(Opportunity.type == "scholarship").count()
        user_count = db.query(User).count()
        
        print(f"\nSummary:")
        print(f"  Visas: {visa_count}")
        print(f"  Scholarships: {scholarship_count}")
        print(f"  Users: {user_count}")
        print(f"  Total: {visa_count + scholarship_count + user_count} records")
        
    except Exception as e:
        print(f"\nError during seeding: {str(e)}")
        db.rollback()
        raise
    
    finally:
        db.close()

if __name__ == "__main__":
    main()
