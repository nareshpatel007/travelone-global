import PressPage from "@/components/pages/press";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "TravelOne in the News | Media Features & Press Releases",
    description: "See how TravelOne is closing the $165.9B personalization gap. Explore our features in The Financial Express, Economic Times, and global travel media.",
    alternates: {
        canonical: `${process.env.SITE_URL}/press`
    },
};

export default function Page() {
    return <PressPage />;
}