import SingleDestination from "@/components/pages/single-destination";
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
        const res = await fetch(`${process.env.SITE_URL}/api/seo/destination`,
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
        const country = data?.data;

        // Return metadata
        return {
            title: country?.title || `${slug} Tours & Holiday Packages`,
            description: country?.description || "Explore best tour packages, itineraries and travel deals.",
            alternates: {
                canonical: `${process.env.SITE_URL}/country/${slug}`,
            },
            openGraph: {
                title: country?.title,
                description: country?.description,
                url: `${process.env.SITE_URL}/country/${slug}`,
                type: "website",
            },
        };
    } catch {
        // Return fallback
        return {
            title: `${slug} Tours & Holiday Packages`,
            description: "Explore best tour packages, itineraries and travel deals.",
        };
    }
}

export default async function Page({ params }: Props) {
    // unwrap params first
    const { slug } = await params;

    return (
        <SingleDestination slug={slug} />
    );
}
