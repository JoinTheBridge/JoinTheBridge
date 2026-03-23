import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import type { Metadata } from "next";
import Link from "next/link";

/* ─── Types ────────────────────────────────────────────────────────────── */

interface StateProgram {
    name: string;
    location: string;
    schedule: string;
}

interface StatePartner {
    name: string;
    type: string; // "school" | "church"
    address: string;
}

interface StateFrontmatter {
    title: string;
    description: string;
    programs?: StateProgram[];
    partners?: StatePartner[];
}

/* ─── Helpers ──────────────────────────────────────────────────────────── */

const CONTENT_DIR = path.join(process.cwd(), "content", "states");

function getStateData(slug: string) {
    const filePath = path.join(CONTENT_DIR, `${slug}.md`);
    if (!fs.existsSync(filePath)) return null;
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);
    return { frontmatter: data as StateFrontmatter, content };
}

async function markdownToHtml(md: string) {
    const result = await remark().use(html).process(md);
    return result.toString();
}

/* ─── Static Params ────────────────────────────────────────────────────── */

export async function generateStaticParams() {
    if (!fs.existsSync(CONTENT_DIR)) return [];
    const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md"));
    return files.map((f) => ({ slug: f.replace(/\.md$/, "") }));
}

/* ─── Metadata ─────────────────────────────────────────────────────────── */

export async function generateMetadata({
    params,
}: {
    params: { slug: string };
}): Promise<Metadata> {
    const data = getStateData(params.slug);
    if (!data) return { title: "State Not Found — BRIDGE" };
    return {
        title: `BRIDGE in ${data.frontmatter.title}`,
        description: data.frontmatter.description,
    };
}

/* ─── Page ─────────────────────────────────────────────────────────────── */

export default async function StatePage({
    params,
}: {
    params: { slug: string };
}) {
    const data = getStateData(params.slug);

    if (!data) {
        return (
            <main className="min-h-[60vh] flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold text-brand-navy mb-4">
                        State Not Found
                    </h1>
                    <p className="text-gray-500 mb-6">
                        We don&apos;t have a page for this state yet.
                    </p>
                    <Link href="/" className="btn-primary">
                        Return Home
                    </Link>
                </div>
            </main>
        );
    }

    const { frontmatter, content } = data;
    const htmlContent = await markdownToHtml(content);

    return (
        <main>
            {/* Hero */}
            <section className="bg-brand-navy text-white">
                <div className="container-grid py-20">
                    <p className="text-brand-forest-light font-semibold text-sm uppercase tracking-widest mb-3">
                        BRIDGE Programs
                    </p>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
                        {frontmatter.title}
                    </h1>
                    <p className="text-gray-400 max-w-2xl text-lg">
                        {frontmatter.description}
                    </p>
                </div>
            </section>

            <div className="container-grid py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-8">
                        {/* Programs */}
                        {frontmatter.programs && frontmatter.programs.length > 0 && (
                            <div className="mb-12">
                                <h2 className="text-2xl font-extrabold mb-6">
                                    Active Programs
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {frontmatter.programs.map((program) => (
                                        <div key={program.name} className="card p-5">
                                            <h3 className="font-bold text-brand-navy mb-2">
                                                {program.name}
                                            </h3>
                                            <p className="text-sm text-gray-500 mb-1">
                                                📍 {program.location}
                                            </p>
                                            <p className="text-sm text-brand-forest font-medium">
                                                🕐 {program.schedule}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Markdown Content */}
                        <div
                            className="prose prose-gray max-w-none prose-headings:text-brand-navy prose-a:text-brand-forest prose-strong:text-brand-navy"
                            dangerouslySetInnerHTML={{ __html: htmlContent }}
                        />
                    </div>

                    {/* Sidebar: Partners */}
                    <div className="lg:col-span-4">
                        {frontmatter.partners && frontmatter.partners.length > 0 && (
                            <div className="card p-6 sticky top-24">
                                <h3 className="font-bold text-brand-navy text-lg mb-4">
                                    Partner Venues
                                </h3>
                                <ul className="space-y-4">
                                    {frontmatter.partners.map((partner) => (
                                        <li
                                            key={partner.name}
                                            className="border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                                        >
                                            <p className="font-semibold text-sm text-brand-navy">
                                                {partner.name}
                                            </p>
                                            <p className="text-xs text-gray-400 uppercase tracking-wide mt-0.5">
                                                {partner.type}
                                            </p>
                                            <p className="text-sm text-gray-500 mt-1">
                                                {partner.address}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <div className="card p-6 mt-6">
                            <h3 className="font-bold text-brand-navy mb-3">
                                Want BRIDGE in your area?
                            </h3>
                            <p className="text-sm text-gray-500 mb-4">
                                We&apos;re expanding. If you know a school or church that could
                                host weekend programs, let us know.
                            </p>
                            <Link href="/volunteer" className="btn-primary text-sm w-full justify-center">
                                Get in Touch
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
