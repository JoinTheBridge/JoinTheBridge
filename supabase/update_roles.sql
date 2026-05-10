-- Supabase SQL to update constraints for the applications table

-- 1. Drop existing constraints
ALTER TABLE applications DROP CONSTRAINT IF EXISTS applications_role_type_check;
ALTER TABLE applications DROP CONSTRAINT IF EXISTS applications_target_subject_check;

-- 2. Update existing 'Volunteer' applications to match the new role name
UPDATE applications SET role_type = 'Volunteer (Tutor)' WHERE role_type = 'Volunteer';

-- 2. Add new constraints
ALTER TABLE applications ADD CONSTRAINT applications_role_type_check CHECK (
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
);

ALTER TABLE applications ADD CONSTRAINT applications_target_subject_check CHECK (
  target_subject IN (
    'Mathematics', 
    'Science', 
    'Literacy', 
    'Economics', 
    'Not Applicable'
  )
);
