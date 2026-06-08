import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://jointhebridge-test.vercel.app";
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: "/admin", // Do not index the administrative dashboard
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
