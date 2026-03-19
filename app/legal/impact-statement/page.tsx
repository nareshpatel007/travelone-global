import type { Metadata } from "next";
import ModernSlaveryStatementPage from "@/components/pages/impact-statement";

export const metadata: Metadata = {
    title: "Modern Slavery & Local Impact Statement",
    description: "Read TravelOne’s commitment to human rights and ethical operations. Our Modern Slavery Statement outlines our standards for responsible global travel.",
    alternates: {
        canonical: `${process.env.SITE_URL}/legal/impact-statement`
    },
};

export default function Page() {
    return (
        <ModernSlaveryStatementPage />
    );
}
