import Link from "next/link";
import SubjectCards from "@/components/SubjectCard";

/* ─── Stats Data ───────────────────────────────────────────────────────── */

const STATS = [
    { number: "4", label: "States Active" },
    { number: "4", label: "Subjects Taught" },
];

/* ─── Page ─────────────────────────────────────────────────────────────── */

export default function Home() {
    return (
        <main>
            {/* ── Hero ─── */}
            <section className="bg-brand-navy text-white">
                <div className="container-grid py-24 md:py-32">
                    <div className="max-w-3xl">
                        <p className="text-brand-forest-light font-semibold text-sm uppercase tracking-widest mb-4">
                            Nonprofit Education Platform
                        </p>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6 text-white">
                            Education is a strong path to success.{" "}
                            <span className="text-brand-forest-light">
                                BRIDGE fosters that.
                            </span>
                        </h1>
                        <p className="text-lg text-gray-300 leading-relaxed mb-8 max-w-2xl">
                            We mitigate poverty through multi-subject academic support and
                            economic literacy — delivered in accessible weekend programs at
                            schools and churches across the country.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link href="/volunteer" className="btn-primary">
                                Become a Volunteer
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </Link>
                            <Link href="/get-involved" className="px-6 py-3 rounded-lg border-2 border-gray-600 text-gray-300 font-semibold text-sm hover:bg-gray-800 transition-colors">
                                Get Involved
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Impact Stats ─── */}
            <section id="impact" className="border-b border-gray-200">
                <div className="container-grid py-16">
                    <div className="grid grid-cols-2 gap-8 max-w-sm mx-auto w-full">
                        {STATS.map((stat) => (
                            <div key={stat.label} className="stat-block">
                                <div className="stat-number">{stat.number}</div>
                                <div className="stat-label">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Mission ─── */}
            <section className="section-alt">
                <div className="container-grid py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-7">
                            <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
                                Mitigating poverty through{" "}
                                <span className="text-brand-forest">financial awareness</span>{" "}
                                and academic support
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                BRIDGE operates weekend programs in community buildings that
                                families already know and trust — schools and churches in
                                low-income neighborhoods. Our volunteer tutors deliver
                                curriculum in four core subjects, with a special emphasis on
                                economics and money management.
                            </p>
                            <p className="text-gray-600 leading-relaxed">
                                Our goal is cross-state expansion across the USA, making
                                high-quality academic support accessible to every community
                                that needs it — not just those who can afford it.
                            </p>
                        </div>
                        <div className="lg:col-span-5">
                            <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
                                <h3 className="font-bold text-brand-navy text-lg mb-4">Our Model</h3>
                                <ul className="space-y-3">
                                    {[
                                        "Weekend programs in schools & churches",
                                        "4 core subjects: Math, Science, Literacy, Economics",
                                        "Volunteer-led with professional curricula",
                                        "Free for all families — no barriers to entry",
                                        "Cross-state coordination by Heads of Subject",
                                    ].map((item) => (
                                        <li key={item} className="flex items-start gap-3 text-sm text-gray-700">
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="text-brand-forest mt-0.5 shrink-0">
                                                <path d="M20 6L9 17l-5-5" />
                                            </svg>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Subjects ─── */}
            <section id="subjects">
                <div className="container-grid py-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                            Four Core Subjects
                        </h2>
                        <p className="text-gray-500 max-w-xl mx-auto">
                            A comprehensive curriculum designed to build academic confidence
                            and practical life skills.
                        </p>
                    </div>
                    <SubjectCards />
                </div>
            </section>

            {/* ── CTA ─── */}
            <section className="bg-brand-navy text-white">
                <div className="container-grid py-20 text-center">
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-white">
                        Ready to make an impact?
                    </h2>
                    <p className="text-gray-400 max-w-lg mx-auto mb-8">
                        Whether you&apos;re a student, educator, finance professional, or
                        community leader — BRIDGE has a role for you.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/volunteer" className="btn-primary">
                            Volunteer Now
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
