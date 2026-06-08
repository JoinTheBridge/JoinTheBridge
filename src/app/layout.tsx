import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://jointhebridge-test.vercel.app";

export const metadata: Metadata = {
    metadataBase: new URL(baseUrl),
    title: {
        default: "BRIDGE - Build Resilience in Development, Growth, and Education",
        template: "%s | BRIDGE Nonprofit"
    },
    description:
        "BRIDGE is a nonprofit mitigating poverty through multi-subject academic support and economic literacy in accessible weekend programs at schools and churches.",
    keywords: [
        "BRIDGE",
        "JoinTheBridge",
        "nonprofit education",
        "volunteer tutoring",
        "economic literacy",
        "weekend academic support",
        "low-income community education",
        "math tutoring",
        "literacy tutoring",
        "science tutoring",
        "economics education"
    ],
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    openGraph: {
        title: "BRIDGE - Build Resilience in Development, Growth, and Education",
        description:
            "Multi-subject tutoring and economic literacy for low-income communities through accessible weekend programs.",
        url: baseUrl,
        siteName: "BRIDGE Nonprofit",
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "BRIDGE - Nonprofit Education & Literacy",
        description: "Multi-subject tutoring and economic literacy for low-income communities through accessible weekend programs.",
    },
    verification: {
        google: "sMOJxqi5KUZ1Hlq2WBDn4koC6aKTiRLtvYX06eQIU_U",
    },
    alternates: {
        canonical: "/",
    },
};

export default function RootLayout({
    children,
}: {
    children: ReactNode;
}) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "EducationalOrganization",
        "name": "BRIDGE",
        "alternateName": "Build Resilience in Development, Growth, and Education",
        "url": baseUrl,
        "description": "BRIDGE is a nonprofit mitigating poverty through multi-subject academic support and economic literacy in accessible weekend programs at schools and churches.",
        "knowsAbout": ["Mathematics", "Science", "Literacy", "Economics", "Tutoring", "Poverty Mitigation"],
        "sameAs": [
            "https://github.com/JoinTheBridge/JoinTheBridge"
        ]
    };

    return (
        <html lang="en">
            <body>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                <Header />
                {children}
                <Footer />
            </body>
        </html>
    );
}
