import Link from "next/link";

const QUICK_LINKS = [
    { label: "Home", href: "/" },
    { label: "Get Involved", href: "/get-involved" },
    { label: "Volunteer Portal", href: "/volunteer" },
];

const SUBJECT_LINKS = [
    { label: "Mathematics", href: "/#subjects" },
    { label: "Science", href: "/#subjects" },
    { label: "Literacy", href: "/#subjects" },
    { label: "Economics", href: "/#subjects" },
];

export default function Footer() {
    return (
        <footer className="bg-brand-navy text-gray-400">
            <div className="container-grid py-16">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                    {/* Mission */}
                    <div className="md:col-span-5">
                        <div className="flex items-center gap-2.5 mb-4">
                            <div className="w-8 h-8 rounded bg-brand-forest flex items-center justify-center">
                                <span className="text-white font-extrabold text-sm">B</span>
                            </div>
                            <span className="text-white font-bold text-lg">BRIDGE</span>
                        </div>
                        <p className="text-sm leading-relaxed max-w-sm">
                            Build Resilience in Development, Growth &amp; Education. We
                            mitigate poverty through multi-subject academic support and
                            economic literacy in accessible weekend programs.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="md:col-span-3">
                        <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">
                            Quick Links
                        </h4>
                        <ul className="space-y-2">
                            {QUICK_LINKS.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm hover:text-white transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Subjects */}
                    <div className="md:col-span-2">
                        <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">
                            Subjects
                        </h4>
                        <ul className="space-y-2">
                            {SUBJECT_LINKS.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-sm hover:text-white transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="md:col-span-2">
                        <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">
                            Contact
                        </h4>
                        <ul className="space-y-2 text-sm">
                            <li>info@jointhebridge.org</li>
                            <li>
                                <Link
                                    href="https://instagram.com"
                                    className="hover:text-white transition-colors"
                                >
                                    Instagram
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="https://linkedin.com"
                                    className="hover:text-white transition-colors"
                                >
                                    LinkedIn
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-gray-800">
                <div className="container-grid py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
                    <p>&copy; {new Date().getFullYear()} BRIDGE Nonprofit. All rights reserved.</p>
                    <p>Mitigating poverty through education.</p>
                </div>
            </div>
        </footer>
    );
}
