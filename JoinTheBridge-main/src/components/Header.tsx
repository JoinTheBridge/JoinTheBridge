"use client";

import { useState } from "react";
import Link from "next/link";

const NAV_LINKS = [
    { label: "Home", href: "/" },
    { label: "Impact", href: "/#impact" },
    { label: "Our Team", href: "/staff" },
    { label: "Subjects", href: "/#subjects" },
    { label: "Get Involved", href: "/get-involved" },
];

export default function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 bg-brand-navy border-b border-gray-800">
            <div className="container-grid flex items-center justify-between h-16">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded bg-brand-forest flex items-center justify-center">
                        <span className="text-white font-extrabold text-sm">B</span>
                    </div>
                    <span className="text-white font-bold text-lg tracking-tight">
                        BRIDGE
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Desktop CTA */}
                <div className="hidden md:flex items-center gap-3">
                    <Link
                        href="/volunteer"
                        className="text-sm font-semibold text-brand-forest-light hover:text-green-400 transition-colors"
                    >
                        Volunteer
                    </Link>
                    <Link
                        href="/get-involved#donate"
                        className="px-4 py-2 rounded-lg bg-brand-forest text-white text-sm font-semibold hover:bg-green-800 transition-colors"
                    >
                        Donate
                    </Link>
                </div>

                {/* Mobile toggle */}
                <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="md:hidden text-gray-300 hover:text-white p-2"
                    aria-label="Toggle menu"
                >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        {mobileOpen ? (
                            <path d="M18 6L6 18M6 6l12 12" />
                        ) : (
                            <path d="M3 12h18M3 6h18M3 18h18" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile menu */}
            {mobileOpen && (
                <div className="md:hidden border-t border-gray-800 bg-brand-navy">
                    <div className="container-grid py-4 space-y-2">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileOpen(false)}
                                className="block py-2 text-sm font-medium text-gray-300 hover:text-white"
                            >
                                {link.label}
                            </Link>
                        ))}
                        <div className="pt-4 border-t border-gray-800 flex gap-3">
                            <Link
                                href="/volunteer"
                                onClick={() => setMobileOpen(false)}
                                className="btn-primary text-sm"
                            >
                                Volunteer
                            </Link>
                            <Link
                                href="/get-involved#donate"
                                onClick={() => setMobileOpen(false)}
                                className="btn-secondary !border-gray-600 !text-gray-300 hover:!bg-gray-800 text-sm"
                            >
                                Donate
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
