# GlobalForge.ai API Documentation

## Base URL
```
Development: http://localhost:8000/api
Production: https://your-api-domain.com/api
```

## Authentication

All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

### Register User
```http
POST /users/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}

Response: 201 Created
{
  "access_token": "eyJ0eXAi...",
  "token_type": "bearer",
  "expires_in": 604800
}
```

### Login
```http
POST /users/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}

Response: 200 OK
{
  "access_token": "eyJ0eXAi...",
  "token_type": "bearer"
}
```

### Get Profile
```http
GET /users/profile
Authorization: Bearer <token>

Response: 200 OK
{
  "id": "uuid",
  "email": "user@example.com",
  "profile": {
    "age": 25,
    "nationality": "Nepal",
    ...
  },
  "created_at": "2024-01-01T00:00:00"
}
```

### Update Profile
```http
PUT /users/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "age": 25,
  "nationality": "Nepal",
  "education_level": "Bachelor",
  "field_of_study": "Computer Science",
  "work_experience_years": 2,
  "skills": ["Python", "ML"],
  "languages": ["English", "Nepali"],
  "target_countries": ["United States"],
  "budget": 50000,
  "goals": "Pursue master's in AI"
}
```

## Matching Endpoints

### Get Visa Matches
```http
GET /matching/visas?top_n=10&min_score=0.3
Authorization: Bearer <token>

Response: 200 OK
[
  {
    "id": "uuid",
    "type": "visa",
    "name": "H-1B Visa",
    "country": "United States",
    "requirements": {...},
    "cost": 2500,
    "approval_rate": 0.74,
    "match_score": 0.85,
    "details": "..."
  }
]
```

### Get Scholarship Matches
```http
GET /matching/scholarships?top_n=10&min_score=0.3
Authorization: Bearer <token>

Response: Similar to visa matches
```

### List All Opportunities
```http
GET /matching/opportunities?type=visa&country=United%20States&limit=50

Response: 200 OK
[...]
```

## Automation Endpoints

### Fill Form (RPA)
```http
POST /automation/fill-form
Authorization: Bearer <token>
Content-Type: application/json

{
  "form_url": "https://example.com/application",
  "form_data": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com"
  },
  "save_pdf": true
}

Response: 200 OK
{
  "success": true,
  "data": {
    "screenshot_path": "/path/to/screenshot.png",
    "pdf_path": "/path/to/form.pdf"
  }
}
```

## Simulation Endpoints

### Tax Simulation
```http
POST /sims/tax
Authorization: Bearer <token>
Content-Type: application/json

{
  "current_country": "United States",
  "target_country": "Germany",
  "annual_income": 100000,
  "years_to_simulate": 10,
  "investment_rate": 0.05
}

Response: 200 OK
{
  "id": "uuid",
  "type": "tax",
  "expected_value": 125000.50,
  "std_deviation": 15000.25,
  "percentile_25": 110000,
  "percentile_50": 125000,
  "percentile_75": 140000,
  "success_probability": 0.95,
  "visualization_data": [...],
  "ran_at": "2024-01-01T00:00:00"
}
```

### Citizenship Simulation
```http
POST /sims/citizenship
Authorization: Bearer <token>
Content-Type: application/json

{
  "current_country": "Nepal",
  "target_country": "Canada",
  "education_level": "Bachelor",
  "work_experience_years": 5,
  "language_proficiency": "Advanced",
  "investment_available": 0
}

Response: Similar structure with timeline predictions
```

## Error Responses

All endpoints return errors in this format:
```json
{
  "error": "Error message",
  "detail": "Detailed explanation",
  "code": "ERROR_CODE"
}
```

### Common Error Codes
- `400 Bad Request` - Invalid input
- `401 Unauthorized` - Missing or invalid token
- `404 Not Found` - Resource not found
- `429 Too Many Requests` - Rate limit exceeded
- `500 Internal Server Error` - Server error

## Rate Limiting
- **Rate**: 100 requests per minute per IP
- **Response**: 429 status code when exceeded
- **Headers**: `X-RateLimit-Limit`, `X-RateLimit-Remaining`

## CORS
API accepts requests from:
- `http://localhost:3000` (development)
- `https://subammmm.github.io`
- `https://*.vercel.app`
- Configure additional origins via `CORS_ORIGINS` env variable
