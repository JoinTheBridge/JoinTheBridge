import type { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    // Static pages
    const staticPages = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "weekly" as const,
            priority: 1.0,
        },
        {
            url: `${baseUrl}/get-involved`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/state-leadership`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/volunteer`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.8,
        },
    ];

    // Dynamic state pages
    let statePages: MetadataRoute.Sitemap = [];
    const contentDir = path.join(process.cwd(), "content", "states");
    if (fs.existsSync(contentDir)) {
        const files = fs.readdirSync(contentDir).filter((f) => f.endsWith(".md"));
        statePages = files.map((file) => {
            const slug = file.replace(/\.md$/, "");
            const filePath = path.join(contentDir, file);
            const stats = fs.statSync(filePath);
            return {
                url: `${baseUrl}/states/${slug}`,
                lastModified: stats.mtime,
                changeFrequency: "monthly" as const,
                priority: 0.7,
            };
        });
    }

    return [...staticPages, ...statePages];
}
