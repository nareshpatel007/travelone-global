import type { Metadata } from "next";
import DestinationPage from "@/components/pages/destination-list";

export const metadata: Metadata = {
    title: "Global Destinations | Curated Luxury Portfolio",
    description: "Explore the TravelOne portfolio of global destinations. Discover curated travel experiences and regional intelligence designed for the discerning traveler.",
    alternates: {
        canonical: `${process.env.SITE_URL}/country`
    },
};

export default function Page() {
    return <DestinationPage />;
}