/* ─────────────────────────────────────────────────────────────────────────────
   roles.ts — Single source of truth for all positions and their specific
   application questions. Each role produces its own tailored form at
   /apply/[slug].
───────────────────────────────────────────────────────────────────────────── */

export type QuestionType = "text" | "textarea" | "select" | "url" | "number" | "email";

export interface RoleQuestion {
  id: string;
  label: string;
  type: QuestionType;
  required: boolean;
  placeholder?: string;
  options?: string[];
  hint?: string;
}

export type RoleGroup =
  | "Education"
  | "Operations & Admin"
  | "Marketing & Outreach"
  | "Tech & Creative";

export interface RoleConfig {
  /** URL-safe slug, used in /apply/[role-slug] */
  slug: string;
  /** Display name shown in UI */
  title: string;
  group: RoleGroup;
  /** Short description shown on the role selection card */
  description: string;
  /** Emoji or icon key for the card */
  icon: string;
  /** Role-specific questions shown in Step 2 of the form */
  questions: RoleQuestion[];
}

/* ─── Role Definitions ──────────────────────────────────────────────────── */

export const ROLES: RoleConfig[] = [
  /* ── Education ── */
  {
    slug: "volunteer-tutor",
    title: "Volunteer (Tutor)",
    group: "Education",
    description:
      "Deliver weekend tutoring sessions in one of our four core subjects at local schools and churches.",
    icon: "BookOpen",
    questions: [
      {
        id: "subjects_comfortable",
        label: "Which subjects are you comfortable teaching?",
        type: "select",
        required: true,
        options: ["Mathematics", "Science", "Literacy", "Economics", "Multiple subjects"],
      },
      {
        id: "grade_levels",
        label: "What grade levels have you worked with?",
        type: "select",
        required: true,
        options: [
          "Elementary (K–5)",
          "Middle School (6–8)",
          "High School (9–12)",
          "Multiple levels",
        ],
      },
      {
        id: "tutoring_experience_years",
        label: "Years of tutoring or teaching experience",
        type: "number",
        required: true,
        placeholder: "e.g. 2",
      },
      {
        id: "weekend_availability",
        label: "Are you available on weekends?",
        type: "select",
        required: true,
        options: ["Yes, both Saturday & Sunday", "Saturdays only", "Sundays only", "Flexible"],
      },
      {
        id: "teaching_approach",
        label: "Briefly describe your teaching or tutoring approach",
        type: "textarea",
        required: true,
        placeholder: "How do you engage students and make concepts accessible?",
      },
    ],
  },

  {
    slug: "head-of-subject",
    title: "Head of Subject",
    group: "Education",
    description:
      "Lead and coordinate volunteer tutors across states for a specific academic subject.",
    icon: "GraduationCap",
    questions: [
      {
        id: "subject_to_lead",
        label: "Which subject would you like to lead?",
        type: "select",
        required: true,
        options: ["Mathematics", "Science", "Literacy", "Economics"],
      },
      {
        id: "leadership_experience",
        label: "Describe your experience coordinating or managing a team",
        type: "textarea",
        required: true,
        placeholder: "Include team sizes, contexts (academic, professional, etc.)",
      },
      {
        id: "volunteers_managed",
        label: "How many volunteers/people have you managed at once?",
        type: "select",
        required: true,
        options: ["1–5", "6–10", "11–20", "20+", "None yet, but eager to start"],
      },
      {
        id: "curriculum_experience",
        label: "Do you have experience developing or reviewing curricula?",
        type: "select",
        required: true,
        options: ["Yes, extensively", "Some experience", "No, but willing to learn"],
      },
    ],
  },

  {
    slug: "curriculum-developer",
    title: "Curriculum Developer",
    group: "Education",
    description:
      "Design and refine lesson plans and materials used by our volunteer tutors nationwide.",
    icon: "PenTool",
    questions: [
      {
        id: "subject_area",
        label: "Which subject area would you develop curriculum for?",
        type: "select",
        required: true,
        options: ["Mathematics", "Science", "Literacy", "Economics", "Multiple / General"],
      },
      {
        id: "curriculum_experience_detail",
        label: "Describe your curriculum writing or instructional design experience",
        type: "textarea",
        required: true,
        placeholder: "Include any tools, standards (Common Core, etc.) or grade levels",
      },
      {
        id: "sample_work_url",
        label: "Link to sample curriculum work or portfolio (optional)",
        type: "url",
        required: false,
        placeholder: "https://drive.google.com/...",
      },
      {
        id: "tools_used",
        label: "What tools do you use to create educational content?",
        type: "text",
        required: false,
        placeholder: "e.g. Google Slides, Canva, Notion, Khan Academy Studio",
      },
    ],
  },

  /* ── Operations & Admin ── */
  {
    slug: "operations-manager",
    title: "Operations Manager",
    group: "Operations & Admin",
    description:
      "Oversee day-to-day logistics, coordinate across state chapters, and keep BRIDGE running smoothly.",
    icon: "Settings",
    questions: [
      {
        id: "ops_experience",
        label: "Describe your operations or project management experience",
        type: "textarea",
        required: true,
        placeholder: "Include industries, team sizes, and key responsibilities",
      },
      {
        id: "pm_tools",
        label: "Which project management tools do you use?",
        type: "text",
        required: true,
        placeholder: "e.g. Notion, Asana, Trello, Monday.com, spreadsheets",
      },
      {
        id: "cross_team_coordination",
        label: "Have you coordinated across multiple teams or locations?",
        type: "select",
        required: true,
        options: ["Yes, regularly", "Yes, occasionally", "Not yet"],
      },
      {
        id: "hours_per_week",
        label: "How many hours per week can you commit?",
        type: "select",
        required: true,
        options: ["1–3 hrs", "4–6 hrs", "7–10 hrs", "10+ hrs"],
      },
    ],
  },

  {
    slug: "secretary-admin",
    title: "Secretary / Admin",
    group: "Operations & Admin",
    description:
      "Handle communications, scheduling, record-keeping, and administrative support for BRIDGE.",
    icon: "ClipboardList",
    questions: [
      {
        id: "admin_experience",
        label: "Describe your administrative experience",
        type: "textarea",
        required: true,
        placeholder: "Include types of tasks, organizations, and duration",
      },
      {
        id: "software_proficiency",
        label: "Which software are you proficient in?",
        type: "text",
        required: true,
        placeholder: "e.g. Google Workspace, Microsoft Office, Zoom, Slack",
      },
      {
        id: "communication_strength",
        label: "How would you describe your written communication skills?",
        type: "select",
        required: true,
        options: ["Excellent", "Good", "Developing"],
      },
    ],
  },

  {
    slug: "finance-coordinator",
    title: "Finance Coordinator",
    group: "Operations & Admin",
    description:
      "Manage budgets, track expenses, and support the financial health of BRIDGE operations.",
    icon: "CircleDollarSign",
    questions: [
      {
        id: "finance_background",
        label: "Describe your finance or accounting background",
        type: "textarea",
        required: true,
        placeholder: "Include relevant education, roles, or projects",
      },
      {
        id: "certifications",
        label: "Do you hold any finance or accounting certifications?",
        type: "text",
        required: false,
        placeholder: "e.g. CPA, QuickBooks Certified, none",
      },
      {
        id: "nonprofit_experience",
        label: "Have you worked with nonprofit finances before?",
        type: "select",
        required: true,
        options: ["Yes", "No, but I have for-profit experience", "No experience yet"],
      },
      {
        id: "tools_finance",
        label: "Which financial tools do you use?",
        type: "text",
        required: false,
        placeholder: "e.g. QuickBooks, Excel, Google Sheets, Wave",
      },
    ],
  },

  /* ── Marketing & Outreach ── */
  {
    slug: "outreach-coordinator",
    title: "Outreach Coordinator",
    group: "Marketing & Outreach",
    description:
      "Build relationships with schools, churches, and community organizations to expand BRIDGE's reach.",
    icon: "Handshake",
    questions: [
      {
        id: "outreach_experience",
        label: "Describe your outreach or community engagement experience",
        type: "textarea",
        required: true,
        placeholder: "Include organizations, strategies, and outcomes",
      },
      {
        id: "communities_worked_with",
        label: "How many distinct communities or organizations have you partnered with?",
        type: "select",
        required: true,
        options: ["1–3", "4–10", "11–25", "25+"],
      },
      {
        id: "existing_connections",
        label:
          "Do you have existing connections with schools or churches in your area?",
        type: "select",
        required: true,
        options: ["Yes, strong network", "Some connections", "No, but willing to build them"],
      },
    ],
  },

  {
    slug: "social-media-marketing",
    title: "Social Media / Marketing",
    group: "Marketing & Outreach",
    description:
      "Grow BRIDGE's online presence, manage social channels, and create compelling content.",
    icon: "Megaphone",
    questions: [
      {
        id: "platforms_managed",
        label: "Which platforms have you managed professionally?",
        type: "text",
        required: true,
        placeholder: "e.g. Instagram, TikTok, Twitter/X, LinkedIn, Facebook",
      },
      {
        id: "follower_range",
        label: "Largest audience you've grown or managed",
        type: "select",
        required: true,
        options: [
          "Under 1,000 followers",
          "1,000–10,000",
          "10,000–50,000",
          "50,000–100,000",
          "100,000+",
        ],
      },
      {
        id: "portfolio_social",
        label: "Link to your portfolio, page handles, or work samples",
        type: "url",
        required: false,
        placeholder: "https://www.instagram.com/yourhandle",
      },
      {
        id: "content_creation_tools",
        label: "Which content creation tools do you use?",
        type: "text",
        required: false,
        placeholder: "e.g. Canva, CapCut, Adobe Premiere, Figma",
      },
    ],
  },

  /* ── Tech & Creative ── */
  {
    slug: "video-editor",
    title: "Video Editor",
    group: "Tech & Creative",
    description:
      "Produce and edit video content for BRIDGE's programs, social media, and outreach campaigns.",
    icon: "Clapperboard",
    questions: [
      {
        id: "editing_software",
        label: "Which video editing software do you use?",
        type: "text",
        required: true,
        placeholder: "e.g. Adobe Premiere, DaVinci Resolve, Final Cut Pro, CapCut",
      },
      {
        id: "portfolio_video",
        label: "Link to your portfolio or sample video work",
        type: "url",
        required: true,
        placeholder: "https://youtube.com/... or https://vimeo.com/...",
      },
      {
        id: "video_experience_years",
        label: "Years of video editing experience",
        type: "number",
        required: true,
        placeholder: "e.g. 3",
      },
      {
        id: "turnaround_availability",
        label: "Typical turnaround time you can commit to per video",
        type: "select",
        required: true,
        options: ["24–48 hours", "3–5 days", "1–2 weeks", "Varies by project"],
      },
    ],
  },

  {
    slug: "graphic-designer",
    title: "Graphic Designer",
    group: "Tech & Creative",
    description:
      "Create visuals, branding assets, and marketing materials that represent BRIDGE's mission.",
    icon: "Palette",
    questions: [
      {
        id: "design_software",
        label: "Which design software do you use?",
        type: "text",
        required: true,
        placeholder: "e.g. Figma, Adobe Illustrator, Photoshop, Canva",
      },
      {
        id: "portfolio_design",
        label: "Link to your design portfolio",
        type: "url",
        required: true,
        placeholder: "https://www.behance.net/... or https://dribbble.com/...",
      },
      {
        id: "design_experience_years",
        label: "Years of graphic design experience",
        type: "number",
        required: true,
        placeholder: "e.g. 4",
      },
      {
        id: "design_specialties",
        label: "Design specialties or strengths",
        type: "text",
        required: false,
        placeholder: "e.g. brand identity, social media graphics, print, motion",
      },
    ],
  },

  {
    slug: "web-developer",
    title: "Web Developer",
    group: "Tech & Creative",
    description:
      "Build and maintain BRIDGE's web presence, tools, and internal platforms.",
    icon: "Code",
    questions: [
      {
        id: "tech_stack",
        label: "Primary tech stack / languages",
        type: "text",
        required: true,
        placeholder: "e.g. React, Next.js, TypeScript, Python, Node.js",
      },
      {
        id: "github_profile",
        label: "GitHub profile URL",
        type: "url",
        required: true,
        placeholder: "https://github.com/yourusername",
      },
      {
        id: "dev_experience_years",
        label: "Years of web development experience",
        type: "number",
        required: true,
        placeholder: "e.g. 2",
      },
      {
        id: "portfolio_web",
        label: "Link to a live project or portfolio site (optional)",
        type: "url",
        required: false,
        placeholder: "https://yourportfolio.com",
      },
    ],
  },
];

/* ─── Helpers ───────────────────────────────────────────────────────────── */

/** Look up a role by its slug. Returns undefined if not found. */
export function getRoleBySlug(slug: string): RoleConfig | undefined {
  return ROLES.find((r) => r.slug === slug);
}

/** Get all roles belonging to a group. */
export function getRolesByGroup(group: RoleGroup): RoleConfig[] {
  return ROLES.filter((r) => r.group === group);
}

/** All distinct groups in display order. */
export const ROLE_GROUPS: RoleGroup[] = [
  "Education",
  "Operations & Admin",
  "Marketing & Outreach",
  "Tech & Creative",
];

/** Group color tokens (Tailwind classes) */
export const GROUP_COLORS: Record<RoleGroup, { bg: string; text: string; border: string }> = {
  "Education": {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
  },
  "Operations & Admin": {
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
  },
  "Marketing & Outreach": {
    bg: "bg-violet-50",
    text: "text-violet-700",
    border: "border-violet-200",
  },
  "Tech & Creative": {
    bg: "bg-orange-50",
    text: "text-orange-700",
    border: "border-orange-200",
  },
};
