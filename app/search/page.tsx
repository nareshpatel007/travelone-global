import SearchPage from "@/components/pages/search-tour";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Your Search Results",
    description: "View and book your search results here.",
    alternates: {
        canonical: `${process.env.SITE_URL}/search`
    },
};

export default function Page() {
    return <SearchPage />;
}