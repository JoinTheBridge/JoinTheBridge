import type { Metadata } from "next";
import RecruitmentForm from "@/components/RecruitmentForm";

export const metadata: Metadata = {
    title: "Volunteer Portal — BRIDGE",
    description:
        "Apply to volunteer with BRIDGE. Fill out our application form and join a team of educators working to mitigate poverty through accessible education.",
};

export default function VolunteerPage() {
    return (
        <main>
            {/* Hero */}
            <section className="bg-brand-navy text-white">
                <div className="container-grid py-16">
                    <p className="text-brand-forest-light font-semibold text-sm uppercase tracking-widest mb-3">
                        Volunteer Portal
                    </p>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
                        Apply to Volunteer
                    </h1>
                    <p className="text-gray-400 max-w-2xl text-lg">
                        Complete the application below and our team will be in touch within
                        48 hours. We welcome educators, finance professionals, students,
                        and anyone who believes in the power of education.
                    </p>
                </div>
            </section>

            {/* Form Section */}
            <section>
                <div className="container-grid py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Left: Context */}
                        <div className="lg:col-span-4">
                            <h2 className="text-2xl font-extrabold mb-4">
                                What to Expect
                            </h2>
                            <ul className="space-y-4">
                                {[
                                    {
                                        step: "1",
                                        title: "Submit Application",
                                        desc: "Fill out the form with your background and interests.",
                                    },
                                    {
                                        step: "2",
                                        title: "Team Review",
                                        desc: "Our coordinators review your application within 48 hours.",
                                    },
                                    {
                                        step: "3",
                                        title: "Onboarding",
                                        desc: "Short orientation covering our curriculum and weekend format.",
                                    },
                                    {
                                        step: "4",
                                        title: "Start Teaching",
                                        desc: "Join a weekend session at a school or church near you.",
                                    },
                                ].map((item) => (
                                    <li key={item.step} className="flex gap-4">
                                        <div className="w-8 h-8 rounded-full bg-brand-forest text-white flex items-center justify-center shrink-0 text-sm font-bold">
                                            {item.step}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-brand-navy text-sm">
                                                {item.title}
                                            </h3>
                                            <p className="text-sm text-gray-500">{item.desc}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Right: Recruitment Form */}
                        <div className="lg:col-span-8">
                            <RecruitmentForm />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
