#!/bin/bash

# Setup script for GlobalForge.ai backend

echo "==================================="
echo "GlobalForge.ai Backend Setup"
echo "==================================="

# Check Python version
echo "Checking Python version..."
python3 --version

# Navigate to API directory
cd api || exit 1

# Create virtual environment
echo "Creating virtual environment..."
python3 -m venv venv

# Activate virtual environment
echo "Activating virtual environment..."
source venv/bin/activate

# Upgrade pip
echo "Upgrading pip..."
pip install --upgrade pip

# Install dependencies
echo "Installing dependencies..."
pip install -r requirements.txt

# Download spacy model
echo "Downloading spacy language model..."
python -m spacy download en_core_web_sm

# Check for .env file
if [ ! -f .env ]; then
    echo "Creating .env file from .env.example..."
    cp .env.example .env
    echo "⚠️  Please update .env file with your configuration!"
fi

# Initialize database
echo "Initializing database..."
python -c "from database import init_db; init_db()"

# Seed database
echo "Do you want to seed the database with sample data? (y/n)"
read -r response
if [ "$response" = "y" ]; then
    python seed_db.py
fi

echo ""
echo "==================================="
echo "Setup complete!"
echo "==================================="
echo ""
echo "To start the server:"
echo "  cd api"
echo "  source venv/bin/activate"
echo "  uvicorn main:app --reload"
echo ""
echo "API will be available at: http://localhost:8000"
echo "API docs at: http://localhost:8000/docs"
echo ""
