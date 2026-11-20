# 🚀 GlobalForge.ai Quick Start Guide

## Prerequisites

- Python 3.11+
- Node.js 18+
- PostgreSQL database (or Supabase account)

## Setup (5 minutes)

### 1. Backend Setup

```bash
cd api

# Create virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
python -m spacy download en_core_web_sm

# Configure environment
cp .env.example .env
# Edit .env with your DATABASE_URL and JWT_SECRET_KEY

# Initialize database
python -c "from database import init_db; init_db()"

# Seed sample data (optional but recommended)
python seed_db.py

# Start server
uvicorn main:app --reload
```

Backend will be available at: http://localhost:8000
API docs at: http://localhost:8000/docs

### 2. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with REACT_APP_API_URL=http://localhost:8000/api

# Start development server
npm start
```

Frontend will be available at: http://localhost:3000

## Quick Test

1. **Register**: Go to http://localhost:3000/register
2. **Login**: Create account and login
3. **Profile**: Fill out your profile
4. **Recommendations**: Check visa/scholarship matches
5. **Simulation**: Run a tax simulation

## Deployment

### Backend (Railway)
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway link
railway up
```

### Frontend (Vercel)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd frontend
vercel --prod
```

### Database (Supabase)
1. Create project at supabase.com
2. Copy connection string
3. Update DATABASE_URL in .env
4. Run migrations

## Troubleshooting

**Backend won't start:**
- Check Python version: `python3 --version` (need 3.11+)
- Check DATABASE_URL is valid
- Check all dependencies installed

**Frontend won't start:**
- Check Node version: `node --version` (need 18+)
- Clear node_modules: `rm -rf node_modules && npm install`
- Check API_URL in .env

**Database errors:**
- Verify PostgreSQL is running
- Check connection string format
- Run init_db again

## Documentation

- **API Reference**: See API_DOCS.md
- **Development Roadmap**: See ROADMAP.md
- **Full Implementation**: See IMPLEMENTATION_COMPLETE.md

## Support

Report issues at: https://github.com/subammmm/civora/issues
