# 🌍 Civora / GlobalForge.ai

> **Evolution Notice**: This repository now contains TWO platforms:
> 1. **Civora** - Original Next.js 14 website (in `/app` directory) - **ACTIVE**
> 2. **GlobalForge.ai** - New AI-native backend + React frontend (in `/api` and `/frontend`) - **NEW**

---

## Table of Contents
- [Civora (Next.js Website)](#civora-nextjs-website)
- [GlobalForge.ai (AI Platform)](#globalforgeai-ai-platform)
- [Repository Structure](#repository-structure)

---

## Civora (Next.js Website)

### Overview
Civora is a research-based platform that compiles verified scholarships, visa pathways, and citizenship options for students from Nepal and other underrepresented countries.

**Built with Next.js 14** 🚀

### Technology Stack
- **Framework**: Next.js 14 (App Router)
- **Styling**: CSS (preserved from original site)
- **Deployment**: Vercel (civora.me) + GitHub Pages (backup)
- **AI Features**: Optional chat assistant (conditional rendering)

### Quick Start (Civora Website)
```bash
# Install dependencies
npm install

# Run development server
npm run dev
# Visit http://localhost:3000

# Build for production
npm run build
```

### Deployment
- **Primary**: https://civora.me (Vercel Production)
- **Backup**: https://subammmm.github.io/civora (GitHub Pages)

See existing [DEPLOYMENT-GUIDE.md](./DEPLOYMENT-GUIDE.md) for complete instructions.

---

## GlobalForge.ai (AI Platform)

### Overview
GlobalForge.ai is an AI-native platform for visa, scholarship, tax, citizenship, and wealth optimization featuring:
- 🤖 **ML-Powered Matching**: TF-IDF + cosine similarity for personalized recommendations
- 🤖 **RPA Automation**: Automated form filling with Playwright
- 📊 **Monte Carlo Simulations**: Tax savings, citizenship paths, wealth optimization
- 🔐 **Secure Authentication**: JWT-based auth with bcrypt
- 📈 **Real-time Analytics**: Track application status and success rates

### Architecture

```
GlobalForge.ai/
├── api/                      # FastAPI Backend
│   ├── main.py              # FastAPI app
│   ├── models.py            # SQLAlchemy + Pydantic models
│   ├── database.py          # PostgreSQL connection
│   ├── routers/             # API routes
│   │   ├── users.py         # Auth endpoints
│   │   ├── matching.py      # AI matching
│   │   ├── automation.py    # RPA endpoints
│   │   └── sims.py          # Simulations
│   ├── services/            # Business logic
│   │   ├── ml_service.py    # Machine learning
│   │   ├── rpa_service.py   # Browser automation
│   │   └── sim_service.py   # Monte Carlo sims
│   ├── tests/               # Backend tests
│   └── requirements.txt     # Python dependencies
│
├── frontend/                # React Frontend
│   ├── src/
│   │   ├── App.js           # Main app
│   │   ├── components/      # React components
│   │   ├── contexts/        # Auth context
│   │   └── services/        # API client
│   ├── package.json         # Node dependencies
│   └── tailwind.config.js   # Tailwind CSS
│
└── app/                     # Civora Next.js (PRESERVED)
```

### Technology Stack

**Backend:**
- FastAPI, PostgreSQL (Supabase), SQLAlchemy
- scikit-learn, spaCy (ML)
- Playwright (RPA)
- NumPy (simulations)
- JWT authentication

**Frontend:**
- React 18, React Router v6
- TailwindCSS
- Axios
- Chart.js
- react-i18next

**Infrastructure:**
- Backend: Railway/Render (free tier)
- Frontend: Vercel
- Database: Supabase PostgreSQL
- CI/CD: GitHub Actions

### Quick Start (GlobalForge.ai)

#### Backend Setup
```bash
# Navigate to API directory
cd api

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
python -m spacy download en_core_web_sm

# Setup environment
cp .env.example .env
# Edit .env with your configuration

# Initialize database
python -c "from database import init_db; init_db()"

# Seed database (50 visas, 200 scholarships)
python seed_db.py

# Start server
uvicorn main:app --reload
# Visit http://localhost:8000/docs for API docs
```

#### Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Edit .env with API URL

# Start development server
npm start
# Visit http://localhost:3000
```

#### Quick Setup (Automated)
```bash
# Backend
./deploy_scripts/setup_backend.sh

# Frontend
./deploy_scripts/setup_frontend.sh
```

### API Documentation

See [API_DOCS.md](./API_DOCS.md) for complete API reference.

**Key Endpoints:**
- `POST /api/users/register` - User registration
- `POST /api/users/login` - User login
- `GET /api/matching/visas` - Get visa recommendations
- `GET /api/matching/scholarships` - Get scholarship matches
- `POST /api/automation/fill-form` - Automate form filling
- `POST /api/sims/tax` - Run tax simulation
- `POST /api/sims/citizenship` - Run citizenship simulation

### Features

#### 1. AI-Powered Matching
- TF-IDF vectorization of user profiles
- Cosine similarity scoring
- Approval probability prediction
- Top-N recommendations

#### 2. RPA Automation
- Automated form filling
- Screenshot capture
- PDF generation
- Multi-field support

#### 3. Monte Carlo Simulations
- Tax savings projections (10-30 years)
- Citizenship path analysis
- Wealth optimization strategies
- Probability distributions

#### 4. User Management
- Secure JWT authentication
- Profile management
- Application tracking
- Simulation history

### Database Schema

```sql
-- Users
CREATE TABLE users (
    id UUID PRIMARY KEY,
    email VARCHAR(255) UNIQUE,
    password_hash VARCHAR(255),
    profile_json JSONB,
    created_at TIMESTAMP
);

-- Opportunities (Visas/Scholarships)
CREATE TABLE opportunities (
    id UUID PRIMARY KEY,
    type VARCHAR(20),
    name VARCHAR(255),
    country VARCHAR(100),
    requirements_json JSONB,
    cost INTEGER,
    approval_rate FLOAT,
    deadline DATE
);

-- Applications
CREATE TABLE applications (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    opp_id UUID REFERENCES opportunities(id),
    status VARCHAR(20),
    docs_json JSONB
);

-- Simulations
CREATE TABLE simulations (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    type VARCHAR(20),
    input_json JSONB,
    output_json JSONB,
    ran_at TIMESTAMP
);
```

### Testing

#### Backend Tests
```bash
cd api
pytest tests/ -v
```

#### Frontend Tests
```bash
cd frontend
npm test
```

### Deployment

#### Backend (Railway/Render)
```bash
# Using Railway CLI
railway login
railway up

# Or using Render
# Connect GitHub repo and configure env vars
```

#### Frontend (Vercel)
```bash
# Using Vercel CLI
vercel login
vercel --prod

# Or connect GitHub repo on Vercel dashboard
```

See GitHub Actions workflows in `.github/workflows/` for automated deployment.

### Environment Variables

#### Backend (.env)
```bash
DATABASE_URL=postgresql://user:pass@host:port/db
JWT_SECRET_KEY=your-secret-key
CORS_ORIGINS=http://localhost:3000,https://*.vercel.app
```

#### Frontend (.env)
```bash
REACT_APP_API_URL=http://localhost:8000/api
```

### Development Roadmap

See [ROADMAP.md](./ROADMAP.md) for detailed future plans:
- Phase 1 (MVP): ✅ Complete
- Phase 2 (Weeks 3-4): Enhanced features
- Phase 3 (Month 2): Advanced platform
- Phase 4 (Month 3): Scale & optimization
- Phase 5 (Month 4+): Expansion

---

## Repository Structure

```
civora/
├── api/                    # GlobalForge.ai Backend (NEW)
├── frontend/               # GlobalForge.ai Frontend (NEW)
├── app/                    # Civora Next.js Website (PRESERVED)
├── public/                 # Static assets (Civora)
├── deploy_scripts/         # Deployment automation
├── .github/workflows/      # CI/CD pipelines
├── API_DOCS.md            # API documentation
├── ROADMAP.md             # Development roadmap
└── README.md              # This file
```

## License
MIT License - see [LICENSE](./LICENSE) file

## Contributing
See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines

## Support
- **Civora Issues**: Report bugs for the Next.js website
- **GlobalForge.ai Issues**: Report bugs for the API/frontend platform
- **Contact**: Visit [civora.me/contact](https://civora.me/contact/)

---

**Maintained by**: [subammmm](https://github.com/subammmm)
