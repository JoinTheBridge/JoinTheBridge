import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: "BRIDGE — Build Resilience in Development, Growth, and Education",
    description:
        "BRIDGE is a nonprofit mitigating poverty through multi-subject academic support and economic literacy in accessible weekend programs at schools and churches.",
    openGraph: {
        title: "BRIDGE — Build Resilience in Development, Growth, and Education",
        description:
            "Multi-subject tutoring and economic literacy for low-income communities through accessible weekend programs.",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <Header />
                {children}
                <Footer />
            </body>
        </html>
    );
}
