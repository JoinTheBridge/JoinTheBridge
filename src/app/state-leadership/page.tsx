"use client";

import { useState } from "react";
import Link from "next/link";
import { MoveRight } from "lucide-react";

type StateName = "Maryland" | "Mississippi" | "New York" | "Philadelphia";

type Member = {
    name: string;
    role: string;
};

const LEADERSHIP_DATA: Record<StateName, Member[]> = {
    "Maryland": [
        { name: "Sarayu", role: "Cofounder" },
        { name: "Rishan", role: "Cofounder" },
        { name: "Moukthika", role: "Admin/Head of Marketing" },
        { name: "Rohan", role: "Head of Tech" },
        { name: "Tirth", role: "Head of Tech" },
        { name: "Mohana", role: "Head of Econ" },
        { name: "Sriya", role: "Head of Education" },
        { name: "Sandy", role: "Head of Math" },
        { name: "Svanik", role: "Head of Finance" },
    ],
    "Mississippi": [
        { name: "Koeyi", role: "Cofounder" },
        { name: "Libby", role: "Head of Math" },
        { name: "CJ", role: "Head of English" },
        { name: "Avery", role: "Head of History" },
    ],
    "New York": [
        { name: "Lucas", role: "Cofounder" },
        { name: "Isaac", role: "Secretary" },
        { name: "Matthew", role: "Operations Manager" },
        { name: "Owen", role: "Outreach Coordinator" },
        { name: "Jun", role: "Outreach Coordinator" },
        { name: "Alan", role: "Literature" },
        { name: "Oscar", role: "Video Editor" },
        { name: "Lucas L", role: "Video Editor" },
        { name: "Zhengjun", role: "History" },
        { name: "Chase", role: "History" },
        
    ],
    "Philadelphia": [
        { name: "Jacky", role: "Cofounder" },
    ]
};

const STATES: StateName[] = ["Maryland", "Mississippi", "New York","Philadelphia"];

export default function StateLeadershipPage() {
    const [activeState, setActiveState] = useState<StateName>("Maryland");

    return (
        <main className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header Section */}
            <section className="bg-brand-navy pt-24 pb-20 px-4">
                <div className="max-w-5xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
                        State Leadership
                    </h1>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                        Meet the dedicated students leading our branches across the country, driving academic excellence and fulfilling BRIDGE&apos;s mission locally.
                    </p>
                </div>
            </section>

            {/* State Switcher & Profiles */}
            <section className="flex-1 py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    {/* Tabs */}
                    <div className="flex flex-wrap justify-center gap-2 mb-12">
                        {STATES.map((state) => (
                            <button
                                key={state}
                                onClick={() => setActiveState(state)}
                                className={`px-6 py-3 rounded-full text-sm font-bold transition-all ${
                                    activeState === state
                                        ? "bg-brand-forest text-white shadow-md scale-105"
                                        : "bg-white text-gray-600 border border-gray-200 hover:border-brand-forest hover:text-brand-forest"
                                }`}
                            >
                                {state}
                            </button>
                        ))}
                    </div>

                    {/* Members Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {LEADERSHIP_DATA[activeState].map((member, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow group flex flex-col items-center text-center"
                            >
                                <div className="w-16 h-16 rounded-full bg-brand-navy/5 flex items-center justify-center mb-4 text-brand-navy font-bold text-xl group-hover:scale-110 transition-transform">
                                    {member.name.charAt(0)}
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-1">
                                    {member.name}
                                </h3>
                                <p className="text-sm font-medium text-brand-forest">
                                    {member.role}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-white border-t border-gray-200 py-16 px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Want to start a branch in your state&apos;s BRIDGE chapter?</h2>
                    <p className="text-gray-600 mb-8">
                        We are actively looking for motivated leaders to help us expand BRIDGE&apos;s impact across the country.
                    </p>
                    <Link href="/volunteer" className="inline-flex items-center gap-2 bg-brand-navy text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-800 transition-colors">
                        Apply to start a branch <MoveRight size={18} />
                    </Link>
                </div>
            </section>
        </main>
    );
}
