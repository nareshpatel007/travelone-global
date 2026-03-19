import type { Metadata } from "next";
import ToursPage from "@/components/pages/tour-list";

export const metadata: Metadata = {
    title: "Signature Tours | Bespoke Luxury Itineraries",
    description: "Discover high-end signature tours orchestrated by TravelOne. Experience curated journeys that blend luxury, culture, and seamless global logistics.",
    alternates: {
        canonical: `${process.env.SITE_URL}/tour`
    },
};

export default function Page() {
    return <ToursPage />;
}