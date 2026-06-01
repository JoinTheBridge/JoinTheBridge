import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Get Involved - BRIDGE",
    description:
        "Understand BRIDGE's regional governance system, our professional work ethic, and our core branches built to deliver high-quality weekend tutoring.",
};

/* ─── Core Branches Data ────────────────────────────────────────────────── */

const CORE_BRANCHES = [
    {
        title: "Education & Curriculum",
        description:
            "The academic engine of BRIDGE. Responsible for design, state-level tutoring networks, and direct weekend instruction.",
        details: [
            "Weekend academic tutoring",
            "State-aligned curriculum creation",
            "Teacher training & assessments",
        ],
        color: "border-emerald-500/20 hover:border-emerald-500 bg-emerald-50/5",
        iconColor: "text-emerald-500 bg-emerald-500/10",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
                <path d="M6 6h10M6 10h10" />
            </svg>
        ),
    },
    {
        title: "Operations & Logistics",
        description:
            "The organizational core. We secure community venues, organize scheduling, manage finances, and run local setups.",
        details: [
            "Venue host partnerships",
            "Logistics & safety oversight",
            "Regional scheduling & administration",
        ],
        color: "border-sky-500/20 hover:border-sky-500 bg-sky-50/5",
        iconColor: "text-sky-500 bg-sky-500/10",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                <path d="M12 6v6l4 2" />
            </svg>
        ),
    },
    {
        title: "Outreach & Communications",
        description:
            "The voice of BRIDGE. We lead partner outreach, engage local communities, run events, and direct social campaigns.",
        details: [
            "School & community relationships",
            "Social media & public relations",
            "Volunteer recruiting initiatives",
        ],
        color: "border-indigo-500/20 hover:border-indigo-500 bg-indigo-50/5",
        iconColor: "text-indigo-500 bg-indigo-500/10",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
        ),
    },
    {
        title: "Technology & Creative Systems",
        description:
            "The engineering backbone. We build software tools, support databases, design materials, and produce educational media.",
        details: [
            "Web architecture & dev",
            "Media editing & graphic design",
            "Data models & analytical systems",
        ],
        color: "border-amber-500/20 hover:border-amber-500 bg-amber-50/5",
        iconColor: "text-amber-500 bg-amber-500/10",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 16V8a2 2 0 0 0-2-2h-2m-8 0H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
                <rect x="9" y="14" width="6" height="6" rx="1" />
                <path d="M9 17v-5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v5" />
            </svg>
        ),
    },
];

/* ─── Work Ethics Data ──────────────────────────────────────────────────── */

const WORK_ETHICS = [
    {
        title: "Extreme Ownership",
        description:
            "We believe that a completely volunteer-run organization can achieve professional-grade results. We take full responsibility for our outcomes, showing up prepared and on-time for our students—consistency is our promise to families.",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="text-brand-forest">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
        ),
    },
    {
        title: "Radical Transparency",
        description:
            "With operations spanning multiple regional hubs and states, open and direct communication is our oxygen. From local classroom updates to state-level partnerships and national board decisions, collaboration flows cleanly and transparently.",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="text-brand-forest">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
        ),
    },
    {
        title: "Impact-Driven Design",
        description:
            "We don't tutor just to pass time; we measure results. Our branches focus on yielding tangible improvements in mathematical reasoning, scientific curiosity, critical literacy, and practical economic understanding for every student.",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="text-brand-forest">
                <path d="M21.21 15.89A10 10 0 1 1 8 2.83M22 12A10 10 0 0 0 12 2v10z" />
            </svg>
        ),
    },
];

/* ─── Page ─────────────────────────────────────────────────────────────── */

export default function GetInvolvedPage() {
    return (
        <main className="bg-gray-50/50">
            {/* Hero Section */}
            <section className="bg-brand-navy text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-forest/20 via-transparent to-transparent opacity-60" />
                <div className="container-grid py-24 relative z-10">
                    <p className="text-brand-forest-light font-semibold text-sm uppercase tracking-widest mb-3">
                        Organizational Philosophy & Structure
                    </p>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight leading-none">
                        How We Operate
                    </h1>
                    <p className="text-gray-300 max-w-3xl text-lg md:text-xl leading-relaxed">
                        BRIDGE runs on a professional, decentralized governance model. Learn how our regional and state branches execute high-impact local programs under the unified direction of our central leadership.
                    </p>
                </div>
            </section>

            {/* Governance System & Structure */}
            <section className="border-b border-gray-200">
                <div className="container-grid py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-5">
                            <span className="text-brand-forest font-semibold text-sm uppercase tracking-wider mb-2.5 block">
                                Governance Model
                            </span>
                            <h2 className="text-3xl font-extrabold text-brand-navy mb-5 leading-tight">
                                Unified Vision, Decentralized Power
                            </h2>
                            <p className="text-gray-600 mb-4 leading-relaxed">
                                Our organization employs a structured coordinate branch system to ensure educational quality while facilitating fast, locally-responsive growth.
                            </p>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                **National Central Branch (HQ)** coordinates curriculum development, software architecture, global brand standards, and strict safety guidelines.
                            </p>
                            <p className="text-gray-600 leading-relaxed">
                                **Regional & State Branches** operate directly underneath, led by dedicated State Directors. They have full autonomy to form local school partnerships, manage regional tutor pools, and tailor host arrangements (such as local churches and schools) to their community&apos;s unique needs.
                            </p>
                        </div>

                        {/* Interactive Governance Diagram */}
                        <div className="lg:col-span-7">
                            <div className="card p-8 bg-white border border-gray-100 shadow-sm relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-forest/5 rounded-full blur-3xl" />
                                <h3 className="text-brand-navy font-bold text-center text-lg mb-8">
                                    BRIDGE Governance Hierarchy
                                </h3>

                                <div className="flex flex-col items-center gap-8 relative">
                                    {/* National Level */}
                                    <div className="z-10 w-full max-w-xs text-center p-4 bg-brand-navy text-white rounded-xl shadow-md border border-brand-navy/10">
                                        <p className="text-brand-forest-light text-xs font-bold uppercase tracking-widest mb-1">
                                            Central Governing Body
                                        </p>
                                        <h4 className="font-extrabold text-sm md:text-base">
                                            National Central Branch (HQ)
                                        </h4>
                                        <p className="text-[10px] text-gray-400 mt-1">
                                            Systems • Curriculum • Global Operations
                                        </p>
                                    </div>

                                    {/* Connectors Row 1 */}
                                    <div className="w-0.5 h-8 bg-gray-200 -my-8" />

                                    {/* Division / Coordinator Level */}
                                    <div className="grid grid-cols-3 gap-3 w-full relative">
                                        {/* Connector line behind */}
                                        <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-gray-200 -translate-y-1/2 -z-0" />
                                        
                                        {[
                                            { name: "East Division", desc: "MD, VA, PA, NC" },
                                            { name: "Central Division", desc: "IL, IN, OH, TX" },
                                            { name: "West Division", desc: "CA, WA, OR, AZ" },
                                        ].map((div) => (
                                            <div key={div.name} className="z-10 p-3 bg-brand-forest text-white rounded-xl text-center shadow-sm border border-brand-forest/10">
                                                <h5 className="font-bold text-xs">{div.name}</h5>
                                                <p className="text-[9px] text-brand-forest-light mt-0.5">{div.desc}</p>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Connectors Row 2 */}
                                    <div className="grid grid-cols-3 w-full -mt-8 justify-items-center">
                                        <div className="w-0.5 h-8 bg-gray-200" />
                                        <div className="w-0.5 h-8 bg-gray-200" />
                                        <div className="w-0.5 h-8 bg-gray-200" />
                                    </div>

                                    {/* State Branch Level */}
                                    <div className="grid grid-cols-3 gap-3 w-full">
                                        {[
                                            { name: "State Directors", desc: "Recruits & Partners" },
                                            { name: "State Directors", desc: "Recruits & Partners" },
                                            { name: "State Directors", desc: "Recruits & Partners" },
                                        ].map((state, i) => (
                                            <div key={i} className="p-3 bg-gray-50 text-brand-navy rounded-xl text-center border border-gray-200/60 shadow-sm">
                                                <h5 className="font-extrabold text-xs">{state.name}</h5>
                                                <p className="text-[9px] text-gray-500 mt-0.5">{state.desc}</p>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Local Venues */}
                                    <div className="w-full flex justify-center gap-1.5 flex-wrap pt-2 border-t border-dashed border-gray-200">
                                        <span className="px-2 py-0.5 bg-gray-100 rounded text-[9px] font-semibold text-gray-500 border border-gray-200/50">Local School Hosts</span>
                                        <span className="px-2 py-0.5 bg-gray-100 rounded text-[9px] font-semibold text-gray-500 border border-gray-200/50">Local Church Hosts</span>
                                        <span className="px-2 py-0.5 bg-gray-100 rounded text-[9px] font-semibold text-gray-500 border border-gray-200/50">Tutor Cohorts</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Branches (Functional Divisions) */}
            <section className="bg-white">
                <div className="container-grid py-20">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-brand-forest font-semibold text-sm uppercase tracking-wider mb-2.5 block">
                            Our Core Org Branches
                        </span>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-brand-navy mb-4">
                            Operational Verticals
                        </h2>
                        <p className="text-gray-500 text-base md:text-lg">
                            Every team member operates inside one of our four functional branches, ensuring focused execution across the entire organization.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {CORE_BRANCHES.map((branch) => (
                            <div
                                key={branch.title}
                                className={`card border p-6 flex flex-col transition-all duration-300 ${branch.color}`}
                            >
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${branch.iconColor}`}>
                                    {branch.icon}
                                </div>
                                <h3 className="text-lg font-bold text-brand-navy mb-3">
                                    {branch.title}
                                </h3>
                                <p className="text-sm text-gray-600 leading-relaxed mb-6 flex-grow">
                                    {branch.description}
                                </p>
                                <div className="border-t border-gray-100 pt-4 mt-auto">
                                    <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2.5">
                                        Core Responsibilities
                                    </h4>
                                    <ul className="space-y-1.5">
                                        {branch.details.map((detail, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-xs text-gray-500">
                                                <span className="text-brand-forest select-none mt-0.5">•</span>
                                                <span>{detail}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Work Ethics & Values */}
            <section className="border-t border-gray-200">
                <div className="container-grid py-20">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-brand-forest font-semibold text-sm uppercase tracking-wider mb-2.5 block">
                            Cultural Code
                        </span>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-brand-navy mb-4">
                            The BRIDGE Work Ethic
                        </h2>
                        <p className="text-gray-500">
                            Our team relies on mutual dedication, high professional standards, and cultural cohesion.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {WORK_ETHICS.map((ethics) => (
                            <div key={ethics.title} className="card p-8 bg-white border border-gray-100 shadow-sm flex flex-col items-center text-center">
                                <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center mb-5">
                                    {ethics.icon}
                                </div>
                                <h3 className="text-lg font-bold text-brand-navy mb-3">
                                    {ethics.title}
                                </h3>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {ethics.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Actions (CTAs) */}
            <section className="bg-brand-navy text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-brand-forest/15 via-transparent to-transparent opacity-60" />
                <div className="container-grid py-20 text-center relative z-10">
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-white tracking-tight">
                        Ready to make a difference?
                    </h2>
                    <p className="text-gray-300 max-w-2xl mx-auto mb-8 text-base md:text-lg">
                        Explore our customized, role-specific opportunities on our Volunteer portal, or partner with us to bring BRIDGE weekend tutoring to your state.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link href="/volunteer" className="btn-primary text-base px-8 py-4 w-full sm:w-auto">
                            Go to Volunteer Portal
                        </Link>
                        <a
                            href="mailto:info@jointhebridge.org?subject=State%20Branch%20Inquiry"
                            className="btn-secondary border-white text-white hover:bg-white hover:text-brand-navy text-base px-8 py-4 w-full sm:w-auto"
                        >
                            Contact Central HQ
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}
