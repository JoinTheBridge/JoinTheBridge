-- ─────────────────────────────────────────────────────────────────────────────
-- Migration: Create separate applications_staging table
-- Run this in the Supabase SQL Editor
-- This allows the staging branch to use a separate table from main
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS applications_staging (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  role_type TEXT NOT NULL,
  target_subject TEXT NOT NULL,
  state TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'Reviewed', 'Accepted', 'Rejected')),
  extra_answers JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE applications_staging ENABLE ROW LEVEL SECURITY;

-- Allow inserts from anonymous users (public form submissions)
CREATE POLICY "Allow public inserts" ON applications_staging
  FOR INSERT TO anon
  WITH CHECK (true);

-- Allow authenticated admin users to read all applications
CREATE POLICY "Allow authenticated reads" ON applications_staging
  FOR SELECT TO authenticated
  USING (true);

-- Allow authenticated admin users to update application status
CREATE POLICY "Allow authenticated updates" ON applications_staging
  FOR UPDATE TO authenticated
  USING (true)
  WITH CHECK (true);

-- For development, allow anon reads too (disabled for security):
-- CREATE POLICY "Allow anon reads (dev)" ON applications_staging
--   FOR SELECT TO anon
--   USING (true);

