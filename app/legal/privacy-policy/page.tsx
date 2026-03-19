import type { Metadata } from "next";
import PrivacyPolicyPage from "@/components/pages/privacy-policy";

export const metadata: Metadata = {
    title: "Privacy & Data Asset Policy",
    description: "Learn about TravelOne's privacy practices and how we protect your personal information.",
    alternates: {
        canonical: `${process.env.SITE_URL}/legal/privacy-policy`
    },
};

export default function Page() {
    return (
        <PrivacyPolicyPage />
    );
}
