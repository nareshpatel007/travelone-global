import AccessibilityStatementPage from "@/components/pages/accessibility-statement";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Accessibility Statement | Inclusive Digital Travel",
    description: "TravelOne is committed to an inclusive digital experience. Read our accessibility statement regarding our travel intelligence platform and services.",
    alternates: {
        canonical: `${process.env.SITE_URL}/legal/accessibility-statement`
    },
};

export default function Page() {
    return (
        <AccessibilityStatementPage />
    );
}
