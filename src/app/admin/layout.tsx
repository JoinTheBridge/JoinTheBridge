import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard – BRIDGE",
  description: "Internal admin dashboard for reviewing BRIDGE applications.",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
