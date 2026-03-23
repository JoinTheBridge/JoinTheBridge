import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Our Team — BRIDGE",
    description:
        "Meet the 12 Heads of Subject who lead BRIDGE's cross-state curricula in Mathematics, Science, Literacy, and Economics.",
};

/* ─── Staff Data ───────────────────────────────────────────────────────── */

const LEADERSHIP = [
    { name: "Open Position", title: "Head of Mathematics — East Region", initials: "HM" },
    { name: "Open Position", title: "Head of Mathematics — West Region", initials: "HM" },
    { name: "Open Position", title: "Head of Mathematics — Central Region", initials: "HM" },
    { name: "Open Position", title: "Head of Science — East Region", initials: "HS" },
    { name: "Open Position", title: "Head of Science — West Region", initials: "HS" },
    { name: "Open Position", title: "Head of Science — Central Region", initials: "HS" },
    { name: "Open Position", title: "Head of Literacy — East Region", initials: "HL" },
    { name: "Open Position", title: "Head of Literacy — West Region", initials: "HL" },
    { name: "Open Position", title: "Head of Literacy — Central Region", initials: "HL" },
    { name: "Open Position", title: "Head of Economics — East Region", initials: "HE" },
    { name: "Open Position", title: "Head of Economics — West Region", initials: "HE" },
    { name: "Open Position", title: "Head of Economics — Central Region", initials: "HE" },
];

const SUBJECT_COLORS: Record<string, string> = {
    "Mathematics": "bg-blue-600",
    "Science": "bg-purple-600",
    "Literacy": "bg-amber-600",
    "Economics": "bg-brand-forest",
};

function getSubjectColor(title: string): string {
    for (const [subject, color] of Object.entries(SUBJECT_COLORS)) {
        if (title.includes(subject)) return color;
    }
    return "bg-gray-600";
}

/* ─── Page ─────────────────────────────────────────────────────────────── */

export default function StaffPage() {
    return (
        <main>
            {/* Hero */}
            <section className="bg-brand-navy text-white">
                <div className="container-grid py-20">
                    <p className="text-brand-forest-light font-semibold text-sm uppercase tracking-widest mb-3">
                        Leadership
                    </p>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
                        Our Team
                    </h1>
                    <p className="text-gray-400 max-w-2xl text-lg">
                        BRIDGE is led by 12 Heads of Subject — dedicated educators who
                        design curricula and coordinate volunteer tutors across regions.
                    </p>
                </div>
            </section>

            {/* Profile Grid */}
            <section>
                <div className="container-grid py-20">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {LEADERSHIP.map((person, i) => {
                            const color = getSubjectColor(person.title);
                            const isOpen = person.name === "Open Position";

                            return (
                                <div
                                    key={i}
                                    className={`card p-6 ${isOpen ? "border-dashed border-gray-300" : ""}`}
                                >
                                    {/* Avatar */}
                                    <div
                                        className={`w-14 h-14 rounded-full ${color} flex items-center justify-center mb-4`}
                                    >
                                        <span className="text-white font-bold text-sm">
                                            {person.initials}
                                        </span>
                                    </div>

                                    {/* Info */}
                                    <h3
                                        className={`font-bold mb-1 ${isOpen ? "text-gray-400 italic" : "text-brand-navy"
                                            }`}
                                    >
                                        {person.name}
                                    </h3>
                                    <p className="text-sm text-gray-500">{person.title}</p>

                                    {isOpen && (
                                        <a
                                            href="/get-involved#special-positions"
                                            className="inline-block mt-4 text-sm font-semibold text-brand-forest hover:underline"
                                        >
                                            Apply for this role →
                                        </a>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section-alt border-t border-gray-200">
                <div className="container-grid py-16 text-center">
                    <h2 className="text-2xl font-extrabold mb-3">
                        Interested in leading a subject area?
                    </h2>
                    <p className="text-gray-500 max-w-lg mx-auto mb-6">
                        We&apos;re looking for passionate educators to serve as Heads of
                        Subject and coordinate volunteer tutors across the country.
                    </p>
                    <a href="/get-involved#special-positions" className="btn-primary">
                        View Special Positions
                    </a>
                </div>
            </section>
        </main>
    );
}
