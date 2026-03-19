import TravelAdvisoryPage from "@/components/pages/travel-advisory";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Travel Advisory | Global Intelligence & Safety",
    description: "Stay informed with real-time travel intelligence. Access the latest safety, health, and entry requirements for all TravelOne global destinations.",
    alternates: {
        canonical: `${process.env.SITE_URL}/legal/travel-advisory`
    },
};

export default function Page() {
    return (
        <TravelAdvisoryPage />
    );
}
