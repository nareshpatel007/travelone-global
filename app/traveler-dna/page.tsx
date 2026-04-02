import TravelerDNAPage from "@/components/pages/traveler-DNA";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Traveler DNA | The World's First Personalization Architects",
    description: "See how TravelOne is closing the $165.9B personalization gap. Explore our features in The Financial Express, Economic Times, and global travel media.",
    alternates: {
        canonical: `${process.env.SITE_URL}/traveler-dna`
    },
};

export default function Page() {
    return <TravelerDNAPage />;
}