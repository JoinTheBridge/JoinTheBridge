-- Supabase SQL script for the volunteer application form
-- Run this in the Supabase SQL editor for your project.

CREATE TABLE IF NOT EXISTS public.applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  role_type TEXT NOT NULL CHECK (
    role_type IN (
      'Volunteer (Tutor)',
      'Head of Subject',
      'Curriculum Developer',
      'Operations Manager',
      'Secretary / Admin',
      'Finance Coordinator',
      'Outreach Coordinator',
      'Social Media / Marketing',
      'Video Editor',
      'Graphic Designer',
      'Web Developer'
    )
  ),
  target_subject TEXT NOT NULL CHECK (
    target_subject IN (
      'Mathematics',
      'Science',
      'Literacy',
      'Economics',
      'Not Applicable'
    )
  ),
  state TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Pending' CHECK (
    status IN ('Pending', 'Reviewed', 'Accepted', 'Rejected')
  ),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security for the applications table.
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to submit volunteer applications.
CREATE POLICY "Allow public inserts" ON public.applications
  FOR INSERT TO anon
  WITH CHECK (true);

-- Allow authenticated users to read application records.
CREATE POLICY "Allow authenticated reads" ON public.applications
  FOR SELECT TO authenticated
  USING (true);

-- Optional: for development, allow anon reads too. Remove this in production.
CREATE POLICY "Allow anon reads (dev)" ON public.applications
  FOR SELECT TO anon
  USING (true);
