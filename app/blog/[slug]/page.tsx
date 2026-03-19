import SingleBlogPage from "@/components/pages/single-blog";
import { Metadata } from "next";

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata(
    { params }: Props
): Promise<Metadata> {
    // unwrap params first
    const { slug } = await params;

    try {
        // Fetch metadata
        const res = await fetch(`${process.env.SITE_URL}/api/seo/blog`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ slug }),
                next: { revalidate: 60 },
            }
        );

        if (!res.ok) throw new Error("Failed");

        // Parse response
        const data = await res.json();
        const blog = data?.data;

        // Return metadata
        return {
            title: blog?.title || `TravelOne Blog`,
            description: blog?.description || "Explore best tour blog, itineraries and travel deals.",
            alternates: {
                canonical: `${process.env.SITE_URL}/blog/${slug}`,
            },
            openGraph: {
                title: blog?.title,
                description: blog?.description,
                url: `${process.env.SITE_URL}/blog/${slug}`,
                type: "website",
            },
        };
    } catch {
        // Return fallback
        return {
            title: `TravelOne Blog`,
            description: "Explore best tour blog, itineraries and travel deals.",
        };
    }
}

export default async function Page({ params }: Props) {
    // unwrap params first
    const { slug } = await params;

    return (
        <SingleBlogPage slug={slug} />
    );
}
