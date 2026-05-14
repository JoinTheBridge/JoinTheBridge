import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getRoleBySlug, ROLE_GROUPS, getRolesByGroup, GROUP_COLORS } from "@/lib/roles";
import ApplicationForm from "@/components/ApplicationForm";

/* ─── Metadata ──────────────────────────────────────────────────────────── */

interface Props {
  params: Promise<{ "role-slug": string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { "role-slug": slug } = await params;
  const role = getRoleBySlug(slug);
  if (!role) return { title: "Role Not Found – BRIDGE" };
  return {
    title: `Apply: ${role.title} – BRIDGE`,
    description: `Apply for the ${role.title} position at BRIDGE. ${role.description}`,
  };
}

/* ─── Page ──────────────────────────────────────────────────────────────── */

export default async function ApplyPage({ params }: Props) {
  const { "role-slug": slug } = await params;
  const role = getRoleBySlug(slug);

  if (!role) notFound();

  const colors = GROUP_COLORS[role.group];
  const siblingRoles = getRolesByGroup(role.group).filter((r) => r.slug !== role.slug);

  return (
    <main>
      {/* ── Hero ── */}
      <section className="bg-brand-navy text-white">
        <div className="container-grid py-14">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
            <Link href="/volunteer" className="hover:text-white transition-colors">
              All Roles
            </Link>
            <span>/</span>
            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${colors.bg} ${colors.text} ${colors.border}`}
            >
              {role.group}
            </span>
            <span>/</span>
            <span className="text-white font-medium">{role.title}</span>
          </nav>

          <div className="flex items-start gap-5">
            <span className="text-5xl hidden sm:block">{role.icon}</span>
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">
                {role.title}
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl">{role.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Form Section ── */}
      <section>
        <div className="container-grid py-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left sidebar */}
            <aside className="lg:col-span-4 space-y-8">
              {/* Role info card */}
              <div className="card p-6">
                <h2 className="text-base font-bold text-brand-navy mb-4">
                  About This Role
                </h2>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 text-sm">
                    <span className="text-gray-400 w-20 shrink-0">Team</span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${colors.bg} ${colors.text} ${colors.border}`}
                    >
                      {role.group}
                    </span>
                  </div>
                  <div className="flex items-start gap-3 text-sm">
                    <span className="text-gray-400 w-20 shrink-0">Questions</span>
                    <span className="text-gray-700 font-medium">
                      {role.questions.length} role-specific
                    </span>
                  </div>
                  <div className="flex items-start gap-3 text-sm">
                    <span className="text-gray-400 w-20 shrink-0">Response</span>
                    <span className="text-gray-700 font-medium">Within 48 hours</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm">
                    <span className="text-gray-400 w-20 shrink-0">Type</span>
                    <span className="text-gray-700 font-medium">Volunteer (unpaid)</span>
                  </div>
                </div>
              </div>

              {/* Tips card */}
              <div className="card p-6">
                <h2 className="text-base font-bold text-brand-navy mb-3">
                  Application Tips
                </h2>
                <ul className="space-y-2 text-sm text-gray-500">
                  {[
                    "Be specific about your experience — details help reviewers.",
                    "Provide real URLs for portfolios or GitHub profiles.",
                    "Explain your motivation in the \"Why BRIDGE?\" question.",
                    "No experience required for many roles — enthusiasm counts!",
                  ].map((tip, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-brand-forest shrink-0">✓</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sibling roles */}
              {siblingRoles.length > 0 && (
                <div className="card p-6">
                  <h2 className="text-base font-bold text-brand-navy mb-3">
                    Other {role.group} Roles
                  </h2>
                  <ul className="space-y-2">
                    {siblingRoles.map((r) => (
                      <li key={r.slug}>
                        <Link
                          href={`/apply/${r.slug}`}
                          className="flex items-center gap-2 text-sm text-gray-600 hover:text-brand-forest transition-colors"
                        >
                          <span>{r.icon}</span>
                          <span>{r.title} →</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </aside>

            {/* Right: form */}
            <div className="lg:col-span-8">
              <ApplicationForm role={role} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
