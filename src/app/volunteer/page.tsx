import type { Metadata } from "next";
import Link from "next/link";
import { ROLES, ROLE_GROUPS, getRolesByGroup, GROUP_COLORS } from "@/lib/roles";
import { RoleIcon } from "@/components/RoleIcon";

export const metadata: Metadata = {
  title: "Volunteer – Apply to BRIDGE",
  description:
    "Choose the role that fits your skills and apply to volunteer with BRIDGE. Positions available in Education, Operations, Marketing, and Tech.",
};

/* ─── Steps data ────────────────────────────────────────────────────────── */

const STEPS = [
  {
    step: "1",
    title: "Choose Your Role",
    desc: "Browse open positions below and pick the one that fits your skills.",
  },
  {
    step: "2",
    title: "Submit Application",
    desc: "Fill out a short, role-specific form — takes about 5 minutes.",
  },
  {
    step: "3",
    title: "Team Review",
    desc: "Our coordinators review and respond within 48 hours.",
  },
  {
    step: "4",
    title: "Onboarding",
    desc: "Short orientation, then you're ready to make an impact.",
  },
];

/* ─── Page ──────────────────────────────────────────────────────────────── */

export default function VolunteerPage() {
  return (
    <main>
      {/* ── Hero ── */}
      <section className="bg-brand-navy text-white">
        <div className="container-grid py-16 md:py-24">
          <div className="max-w-3xl">
            <p className="text-brand-forest-light font-semibold text-sm uppercase tracking-widest mb-3">
              Join Our Team
            </p>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
              Find your role at BRIDGE
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
              We welcome educators, finance professionals, creatives, and tech
              enthusiasts. Pick the position that matches your skills and submit
              a tailored application — no generic forms here.
            </p>

            {/* Quick stats */}
            <div className="flex flex-wrap gap-8 mt-8">
              <div>
                <p className="text-3xl font-extrabold text-white">{ROLES.length}</p>
                <p className="text-gray-400 text-sm">Open Roles</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-white">48h</p>
                <p className="text-gray-400 text-sm">Response Time</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-white">4</p>
                <p className="text-gray-400 text-sm">Teams</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="border-b border-gray-200 bg-gray-50">
        <div className="container-grid py-12">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-6">
            How It Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((item) => (
              <div key={item.step} className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-forest text-white flex items-center justify-center shrink-0 text-sm font-bold">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-semibold text-brand-navy text-sm mb-0.5">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Role Cards ── */}
      <section>
        <div className="container-grid py-16">
          <div className="space-y-14">
            {ROLE_GROUPS.map((group) => {
              const groupRoles = getRolesByGroup(group);
              const colors = GROUP_COLORS[group];
              return (
                <div key={group}>
                  {/* Group header */}
                  <div className="flex items-center gap-3 mb-6">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold border ${colors.bg} ${colors.text} ${colors.border}`}
                    >
                      {group}
                    </span>
                    <div className="flex-1 h-px bg-gray-200" />
                    <span className="text-xs text-gray-400">
                      {groupRoles.length} position{groupRoles.length !== 1 ? "s" : ""}
                    </span>
                  </div>

                  {/* Cards grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                    {groupRoles.map((role) => (
                      <div
                        key={role.slug}
                        className="card p-6 flex flex-col hover:shadow-md transition-shadow duration-200 group"
                      >
                        {/* Icon + badge */}
                        <div className="flex items-start justify-between mb-4">
                          <span className="text-3xl"><RoleIcon iconName={role.icon} className="w-8 h-8" /></span>
                          <span
                            className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${colors.bg} ${colors.text} ${colors.border}`}
                          >
                            {group}
                          </span>
                        </div>

                        {/* Title + description */}
                        <h3 className="text-lg font-bold text-brand-navy mb-2 group-hover:text-brand-forest transition-colors">
                          {role.title}
                        </h3>
                        <p className="text-sm text-gray-500 leading-relaxed flex-1 mb-5">
                          {role.description}
                        </p>

                        {/* Question count hint */}
                        <p className="text-xs text-gray-400 mb-4">
                          {role.questions.length} role-specific question
                          {role.questions.length !== 1 ? "s" : ""}
                        </p>

                        {/* CTA */}
                        <Link
                          href={`/apply/${role.slug}`}
                          className="btn-primary w-full justify-center text-sm"
                        >
                          Apply Now →
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="bg-brand-navy text-white">
        <div className="container-grid py-16 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3">
            Not sure which role fits?
          </h2>
          <p className="text-gray-400 max-w-md mx-auto mb-6">
            Reach out and we&apos;ll help you find the right position based on
            your background and interests.
          </p>
          <Link
            href="mailto:info@join-the-bridge.org"
            className="btn-primary inline-flex"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </main>
  );
}
