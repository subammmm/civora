#!/bin/bash

# Setup script for GlobalForge.ai frontend

echo "==================================="
echo "GlobalForge.ai Frontend Setup"
echo "==================================="

# Check Node version
echo "Checking Node.js version..."
node --version

# Navigate to frontend directory
cd frontend || exit 1

# Check for .env file
if [ ! -f .env ]; then
    echo "Creating .env file from .env.example..."
    cp .env.example .env
    echo "⚠️  Please update .env file with your API URL!"
fi

# Install dependencies
echo "Installing dependencies..."
npm install

echo ""
echo "==================================="
echo "Setup complete!"
echo "==================================="
echo ""
echo "To start the development server:"
echo "  cd frontend"
echo "  npm start"
echo ""
echo "Frontend will be available at: http://localhost:3000"
echo ""
echo "To build for production:"
echo "  npm run build"
echo ""
