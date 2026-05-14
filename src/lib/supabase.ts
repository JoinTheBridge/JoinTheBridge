import { createClient } from "@supabase/supabase-js";

/*
 * ─── Supabase Client ──────────────────────────────────────────────────
 *
 * Setup instructions:
 *
 * 1. Create a Supabase project at https://supabase.com/dashboard
 *
 * 2. Create the `applications` table by running this SQL in the
 *    Supabase SQL Editor:
 *
 *    CREATE TABLE applications (
 *      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
 *      full_name TEXT NOT NULL,
 *      email TEXT NOT NULL,
 *      role_type TEXT NOT NULL CHECK (role_type IN ('Volunteer (Tutor)', 'Head of Subject', 'Curriculum Developer', 'Operations Manager', 'Secretary / Admin', 'Finance Coordinator', 'Outreach Coordinator', 'Social Media / Marketing', 'Video Editor', 'Graphic Designer', 'Web Developer')),
 *      target_subject TEXT NOT NULL CHECK (target_subject IN ('Mathematics', 'Science', 'Literacy', 'Economics', 'Not Applicable')),
 *      state TEXT NOT NULL,
 *      status TEXT NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'Reviewed', 'Accepted', 'Rejected')),
 *      created_at TIMESTAMPTZ DEFAULT NOW()
 *    );
 *
 *    -- Enable Row Level Security
 *    ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
 *
 *    -- Allow inserts from anonymous users (public form submissions)
 *    CREATE POLICY "Allow public inserts" ON applications
 *      FOR INSERT TO anon
 *      WITH CHECK (true);
 *
 *    -- Allow reads only from authenticated users (staff dashboard)
 *    CREATE POLICY "Allow authenticated reads" ON applications
 *      FOR SELECT TO authenticated
 *      USING (true);
 *
 *    -- For development, allow anon reads too (remove in production):
 *    CREATE POLICY "Allow anon reads (dev)" ON applications
 *      FOR SELECT TO anon
 *      USING (true);
 *
 * 3. Create a `.env.local` file in the project root:
 *
 *    NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
 *    NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
 *
 *    Find these values in: Supabase Dashboard → Settings → API
 *
 * ────────────────────────────────────────────────────────────────────── */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "❌ FATAL: Missing Supabase environment variables.\n" +
    "Add to .env.local:\n" +
    "  NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co\n" +
    "  NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY\n" +
    "See src/lib/supabase.ts for setup instructions."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/* ─── Types ────────────────────────────────────────────────────────────── */

export interface Application {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  /** The role title string — validated against roles.ts at the app layer */
  role_type: string;
  target_subject: "Mathematics" | "Science" | "Literacy" | "Economics" | "Not Applicable";
  state: string;
  status: "Pending" | "Reviewed" | "Accepted" | "Rejected";
  /** JSONB object of role-specific Q&A answers keyed by question id */
  extra_answers?: Record<string, string>;
  created_at: string;
}

export type ApplicationInsert = Omit<Application, "id" | "status" | "created_at">;
