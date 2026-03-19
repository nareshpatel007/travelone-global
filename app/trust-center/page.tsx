import AccessibilityStatementPage from "@/components/pages/accessibility-statement";
import TrustCenterPage from "@/components/pages/trust-center";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Trust Center",
    description: "Learn about TravelOne's commitment to security, privacy, and compliance in our Trust Center. Discover how we protect your data and ensure a safe travel experience.",
    alternates: {
        canonical: `${process.env.SITE_URL}/trust-center`
    },
};

export default function Page() {
    return (
        <TrustCenterPage />
    );
}
