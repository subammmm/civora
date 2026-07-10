# 🗄️ Supabase Backend Setup Guide

This guide walks you through setting up Supabase as the backend database for Civora.

## Overview

Civora uses Supabase for:
- **Scholarships Database** - CRUD operations with filtering
- **Student Stories** - User success stories
- **Contact Form Submissions** - Store contact messages
- **Newsletter Subscribers** - Email list management
- **Analytics** - Page view tracking (optional)

> **Note:** The app gracefully falls back to static data if Supabase is not configured.

---

## Quick Setup (5 minutes)

### 1. Create a Supabase Project

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Click **"New Project"**
3. Choose your organization (or create one)
4. Enter project details:
   - **Name:** `civora` (or your preferred name)
   - **Database Password:** Generate a strong password (save it!)
   - **Region:** Choose closest to your users
5. Click **"Create new project"** and wait ~2 minutes

### 2. Get Your API Credentials

1. In your project dashboard, go to **Settings** → **API**
2. Copy these values:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY` (keep secret!)

### 3. Configure Environment Variables

Create/update your `.env` file:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

### 4. Create Database Tables

1. In Supabase Dashboard, go to **SQL Editor**
2. Click **"New Query"**
3. Copy the contents of `supabase/schema.sql`
4. Click **"Run"**

### 5. Seed Initial Data

After the tables are created, seed the scholarships data:

```bash
# Start the dev server
npm run dev

# In another terminal, seed the database
curl "http://localhost:3000/api/scholarships?seed=true"
```

Or visit: `http://localhost:3000/api/scholarships?seed=true` in your browser.

---

## Deployment Configuration

### Vercel

Add environment variables in Vercel Dashboard:
1. Go to your project → **Settings** → **Environment Variables**
2. Add all three Supabase variables
3. Redeploy

### Other Platforms

Set the environment variables according to your platform's documentation.

---

## API Reference

### Scholarships API

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/scholarships` | GET | List all scholarships |
| `/api/scholarships?country=usa` | GET | Filter by country |
| `/api/scholarships?level=graduate` | GET | Filter by level |
| `/api/scholarships?seed=true` | GET | Seed database with static data |
| `/api/scholarships` | POST | Create new scholarship |
| `/api/scholarships/[id]` | GET | Get single scholarship |
| `/api/scholarships/[id]` | PUT | Update scholarship |
| `/api/scholarships/[id]` | DELETE | Delete scholarship |

#### Example: Create Scholarship

```bash
curl -X POST http://localhost:3000/api/scholarships \
  -H "Content-Type: application/json" \
  -d '{
    "id": "my-scholarship",
    "name": "My Scholarship",
    "description": "Full funding for students",
    "country": "USA",
    "countryCode": "usa",
    "level": "Graduate",
    "levelCode": "graduate",
    "field": "All",
    "fieldCode": "all",
    "deadline": "Dec 31 2026",
    "deadlineCode": "open",
    "url": "https://example.com/apply"
  }'
```

---

## Database Schema

### Tables

| Table | Purpose |
|-------|---------|
| `scholarships` | Scholarship listings with filters |
| `student_stories` | Success stories from students |
| `contact_submissions` | Contact form messages |
| `newsletter_subscribers` | Email subscribers |
| `page_analytics` | Page view tracking |

### Row Level Security (RLS)

All tables have RLS enabled with these policies:
- **Public Read**: Anyone can read scholarships and student stories
- **Public Insert**: Anyone can submit contact forms and subscribe to newsletter
- **Authenticated CRUD**: Only authenticated users can create/update/delete

---

## Troubleshooting

### "Supabase not configured" Warning

This is normal if you haven't set up Supabase. The app uses static data as fallback.

### "Failed to fetch scholarships"

1. Check your environment variables are correct
2. Verify the Supabase project is active
3. Ensure tables exist (run schema.sql)

### RLS Policy Errors

If you get permission errors:
1. Go to **Authentication** → **Policies** in Supabase Dashboard
2. Verify policies match `schema.sql`
3. For development, you can temporarily disable RLS:
   ```sql
   ALTER TABLE scholarships DISABLE ROW LEVEL SECURITY;
   ```

---

## Development Workflow

### Adding New Scholarship

1. **Via API:**
   ```bash
   curl -X POST http://localhost:3000/api/scholarships -d '...'
   ```

2. **Via Supabase Dashboard:**
   - Go to **Table Editor** → **scholarships**
   - Click **"Insert Row"**

3. **Via Static Data (development):**
   - Edit `app/scholarships/scholarships-data.js`
   - Re-seed: `curl "http://localhost:3000/api/scholarships?seed=true"`

### Modifying Schema

1. Update `supabase/schema.sql`
2. Run new SQL in Supabase SQL Editor
3. Update corresponding files in `lib/database/`

---

## Security Best Practices

1. **Never expose `SUPABASE_SERVICE_ROLE_KEY`** in client-side code
2. **Always use RLS** in production
3. **Validate input** in API routes
4. **Use prepared statements** (Supabase client handles this)

---

## Next Steps

- [ ] Set up Supabase Auth for admin panel
- [ ] Add image storage with Supabase Storage
- [ ] Implement real-time updates with Supabase Realtime
- [ ] Add database backups schedule

---

*Need help? Check [Supabase Docs](https://supabase.com/docs) or open an issue.*
