import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Get Involved — BRIDGE",
    description:
        "Join BRIDGE as a volunteer tutor, subject lead, or state coordinator. Multiple pathways to make a difference in your community.",
};

/* ─── Pathways ─────────────────────────────────────────────────────────── */

const GENERAL_ROLES = [
    {
        title: "Weekend Tutor",
        description:
            "Lead small-group sessions in Math, Science, Literacy, or Economics at local schools and churches every weekend.",
        commitment: "4–6 hours/week",
        icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8z",
    },
    {
        title: "Program Assistant",
        description:
            "Help with logistics, setup, and coordination for weekend sessions. No teaching experience required.",
        commitment: "3–4 hours/week",
        icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
    },
    {
        title: "Community Outreach",
        description:
            "Connect BRIDGE with local schools, churches, and families. Build partnerships that bring programs to new neighborhoods.",
        commitment: "2–3 hours/week",
        icon: "M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z",
    },
];

const SPECIAL_POSITIONS = [
    {
        title: "Head of Subject",
        description:
            "Design and oversee curriculum for one of our four core subjects across a regional division (East, West, or Central).",
        qualifications: "Teaching experience, subject matter expertise",
        subjects: ["Mathematics", "Science", "Literacy", "Economics"],
    },
    {
        title: "State Coordinator",
        description:
            "Manage all BRIDGE operations within a state — recruiting volunteers, securing venues, and coordinating with national leadership.",
        qualifications: "Organizational leadership, community connections",
        subjects: [],
    },
    {
        title: "Curriculum Developer",
        description:
            "Create lesson plans, worksheets, and assessment materials aligned with BRIDGE's mission of practical, accessible education.",
        qualifications: "Education background, content creation experience",
        subjects: [],
    },
];

/* ─── Page ─────────────────────────────────────────────────────────────── */

export default function GetInvolvedPage() {
    return (
        <main>
            {/* Hero */}
            <section className="bg-brand-navy text-white">
                <div className="container-grid py-20">
                    <p className="text-brand-forest-light font-semibold text-sm uppercase tracking-widest mb-3">
                        Join Our Mission
                    </p>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
                        Get Involved
                    </h1>
                    <p className="text-gray-400 max-w-2xl text-lg">
                        BRIDGE runs entirely on the dedication of volunteers. Whether you
                        have one hour a week or want to lead an entire subject — we have a
                        role that fits you.
                    </p>
                </div>
            </section>

            {/* General Volunteer Roles */}
            <section>
                <div className="container-grid py-20">
                    <h2 className="text-3xl font-extrabold mb-2">Volunteer Roles</h2>
                    <p className="text-gray-500 mb-10 max-w-2xl">
                        No special qualifications needed — just a willingness to help
                        families build stronger futures.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {GENERAL_ROLES.map((role) => (
                            <div key={role.title} className="card-hover p-6">
                                <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center mb-4">
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={1.5}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="text-brand-navy"
                                    >
                                        <path d={role.icon} />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-bold text-brand-navy mb-2">
                                    {role.title}
                                </h3>
                                <p className="text-sm text-gray-600 leading-relaxed mb-3">
                                    {role.description}
                                </p>
                                <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                                    {role.commitment}
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-10 text-center">
                        <Link href="/volunteer" className="btn-primary">
                            Apply as a Volunteer
                        </Link>
                    </div>
                </div>
            </section>

            {/* Special Positions */}
            <section id="special-positions" className="section-alt border-t border-gray-200">
                <div className="container-grid py-20">
                    <h2 className="text-3xl font-extrabold mb-2">Special Positions</h2>
                    <p className="text-gray-500 mb-10 max-w-2xl">
                        Leadership roles for experienced professionals who want to shape
                        BRIDGE&apos;s direction and impact at scale.
                    </p>
                    <div className="space-y-6">
                        {SPECIAL_POSITIONS.map((position) => (
                            <div key={position.title} className="card p-6 md:p-8">
                                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-brand-navy mb-2">
                                            {position.title}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed mb-3">
                                            {position.description}
                                        </p>
                                        <p className="text-sm text-gray-400">
                                            <span className="font-semibold text-gray-500">
                                                Qualifications:
                                            </span>{" "}
                                            {position.qualifications}
                                        </p>
                                        {position.subjects.length > 0 && (
                                            <div className="mt-3 flex flex-wrap gap-2">
                                                {position.subjects.map((s) => (
                                                    <span
                                                        key={s}
                                                        className="px-3 py-1 text-xs font-medium rounded-full bg-green-50 text-brand-forest border border-green-200"
                                                    >
                                                        {s}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <Link
                                        href="/volunteer"
                                        className="btn-secondary shrink-0 self-start"
                                    >
                                        Apply
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Donate CTA */}
            <section id="donate" className="bg-brand-navy text-white">
                <div className="container-grid py-20 text-center">
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-white">
                        Support BRIDGE financially
                    </h2>
                    <p className="text-gray-400 max-w-lg mx-auto mb-8">
                        Your donation directly funds weekend programs, teaching materials,
                        and the expansion of BRIDGE to new states and communities.
                    </p>
                    <a
                        href="mailto:info@jointhebridge.org?subject=Donation%20Inquiry"
                        className="btn-primary text-base px-8 py-4"
                    >
                        Donate Now
                    </a>
                </div>
            </section>
        </main>
    );
}
