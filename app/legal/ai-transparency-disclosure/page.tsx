import type { Metadata } from "next";
import EthicalAIDisclosurePage from "@/components/pages/ai-transparency-disclosure";

export const metadata: Metadata = {
    title: "Ethical AI Disclosure | Transparent Intelligence",
    description: "Discover how we use AI ethically to curate your journeys. Learn about TravelOne’s commitment to transparency and data integrity in travel planning.",
    alternates: {
        canonical: `${process.env.SITE_URL}/legal/ai-transparency-disclosure`
    },
};

export default function Page() {
    return (
        <EthicalAIDisclosurePage />
    );
}
