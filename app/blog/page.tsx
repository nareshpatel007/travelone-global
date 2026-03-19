import BlogPage from "@/components/pages/blog";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "TravelOne Blog",
    description: "TravelOne Blog - Stay up-to-date with the latest travel news, tips, and recommendations.",
    alternates: {
        canonical: `${process.env.SITE_URL}/blog`
    },
};

export default function Page() {
    return <BlogPage />;
}
