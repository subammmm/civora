-- ============================================================================
-- Civora Database Schema for Supabase
-- ============================================================================
-- Run this SQL in your Supabase SQL Editor to create the required tables
-- Dashboard: https://supabase.com/dashboard/project/YOUR_PROJECT/sql
-- ============================================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- SCHOLARSHIPS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS scholarships (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    country TEXT NOT NULL,
    country_code TEXT NOT NULL,
    level TEXT NOT NULL,
    level_code TEXT NOT NULL,
    field TEXT DEFAULT 'All',
    field_code TEXT DEFAULT 'all',
    deadline TEXT NOT NULL,
    deadline_code TEXT NOT NULL DEFAULT 'open',
    url TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for common queries
CREATE INDEX IF NOT EXISTS idx_scholarships_country ON scholarships(country_code);
CREATE INDEX IF NOT EXISTS idx_scholarships_level ON scholarships(level_code);
CREATE INDEX IF NOT EXISTS idx_scholarships_field ON scholarships(field_code);
CREATE INDEX IF NOT EXISTS idx_scholarships_deadline ON scholarships(deadline_code);

-- Enable Row Level Security (RLS)
ALTER TABLE scholarships ENABLE ROW LEVEL SECURITY;

-- Allow public read access to scholarships
CREATE POLICY "Allow public read access to scholarships" ON scholarships
    FOR SELECT
    TO public
    USING (true);

-- Allow authenticated users to insert scholarships (for admin)
CREATE POLICY "Allow authenticated insert" ON scholarships
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

-- Allow authenticated users to update scholarships (for admin)
CREATE POLICY "Allow authenticated update" ON scholarships
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Allow authenticated users to delete scholarships (for admin)
CREATE POLICY "Allow authenticated delete" ON scholarships
    FOR DELETE
    TO authenticated
    USING (true);

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_scholarships_updated_at
    BEFORE UPDATE ON scholarships
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- STUDENT STORIES TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS student_stories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    country TEXT NOT NULL,
    university TEXT NOT NULL,
    program TEXT NOT NULL,
    year INTEGER,
    image_url TEXT,
    story TEXT NOT NULL,
    advice TEXT,
    scholarships_received TEXT[],
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for student stories
ALTER TABLE student_stories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to student stories" ON student_stories
    FOR SELECT
    TO public
    USING (true);

CREATE POLICY "Allow authenticated insert student stories" ON student_stories
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

CREATE POLICY "Allow authenticated update student stories" ON student_stories
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Allow authenticated delete student stories" ON student_stories
    FOR DELETE
    TO authenticated
    USING (true);

CREATE TRIGGER update_student_stories_updated_at
    BEFORE UPDATE ON student_stories
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- CONTACT SUBMISSIONS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS contact_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'new',
    responded_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for contact submissions
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Only authenticated users (admins) can read contact submissions
CREATE POLICY "Allow authenticated read contact submissions" ON contact_submissions
    FOR SELECT
    TO authenticated
    USING (true);

-- Anyone can submit a contact form
CREATE POLICY "Allow public insert contact submissions" ON contact_submissions
    FOR INSERT
    TO public
    WITH CHECK (true);

-- ============================================================================
-- NEWSLETTER SUBSCRIBERS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    subscribed_at TIMESTAMPTZ DEFAULT NOW(),
    unsubscribed_at TIMESTAMPTZ,
    is_active BOOLEAN DEFAULT true
);

-- Enable RLS for newsletter subscribers
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Allow public to subscribe
CREATE POLICY "Allow public insert newsletter subscribers" ON newsletter_subscribers
    FOR INSERT
    TO public
    WITH CHECK (true);

-- Only authenticated users can read subscribers list
CREATE POLICY "Allow authenticated read newsletter subscribers" ON newsletter_subscribers
    FOR SELECT
    TO authenticated
    USING (true);

-- ============================================================================
-- USER ANALYTICS TABLE (Optional)
-- ============================================================================
CREATE TABLE IF NOT EXISTS page_analytics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    page_path TEXT NOT NULL,
    user_agent TEXT,
    referrer TEXT,
    country TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE page_analytics ENABLE ROW LEVEL SECURITY;

-- Allow public to insert analytics
CREATE POLICY "Allow public insert analytics" ON page_analytics
    FOR INSERT
    TO public
    WITH CHECK (true);

-- Only authenticated users can read analytics
CREATE POLICY "Allow authenticated read analytics" ON page_analytics
    FOR SELECT
    TO authenticated
    USING (true);

-- ============================================================================
-- VIEWS FOR COMMON QUERIES
-- ============================================================================

-- View for scholarships by country count
CREATE OR REPLACE VIEW scholarships_by_country AS
SELECT 
    country_code,
    country,
    COUNT(*) as count
FROM scholarships
GROUP BY country_code, country
ORDER BY count DESC;

-- View for upcoming deadlines
CREATE OR REPLACE VIEW upcoming_deadlines AS
SELECT *
FROM scholarships
WHERE deadline_code = 'open'
ORDER BY deadline ASC;

-- ============================================================================
-- SEED DATA (Optional - uncomment to populate initial data)
-- ============================================================================
-- You can also seed data via the API: GET /api/scholarships?seed=true
-- ============================================================================
