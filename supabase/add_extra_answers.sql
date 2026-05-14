-- ─────────────────────────────────────────────────────────────────────────────
-- Migration: Add phone, extra_answers columns + admin update policy
-- Run this in the Supabase SQL Editor
-- ─────────────────────────────────────────────────────────────────────────────

-- 1. Add phone and JSONB extra_answers columns
ALTER TABLE applications
  ADD COLUMN IF NOT EXISTS phone TEXT,
  ADD COLUMN IF NOT EXISTS extra_answers JSONB DEFAULT '{}'::jsonb;

-- 2. Drop the old rigid role_type CHECK constraint so any role string is accepted
--    (validation is now handled in the app layer via roles.ts)
ALTER TABLE applications DROP CONSTRAINT IF EXISTS applications_role_type_check;

-- 3. Allow authenticated admin users to update application status
CREATE POLICY "Allow authenticated updates" ON applications
  FOR UPDATE TO authenticated
  USING (true)
  WITH CHECK (true);

-- 4. Allow authenticated admin users to read all applications
--    (removes the need for the dev-only anon read policy)
CREATE POLICY "Allow authenticated reads" ON applications
  FOR SELECT TO authenticated
  USING (true);
