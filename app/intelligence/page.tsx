import IntelligencePage from "@/components/pages/intelligence";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "The Science of Travel | 30-Marker Persona Logic | TravelOne",
    description: "Explore the intelligence behind TravelOne. Our proprietary 30-marker framework decodes your traveler DNA to engineer high-precision, tailor-made journeys.",
    alternates: {
        canonical: `${process.env.SITE_URL}/intelligence`
    },
};

export default function Page() {
    return <IntelligencePage />;
}
