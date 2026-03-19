import AboutPage from "@/components/pages/about-us";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About TravelOne | The World's First Personalization Architects",
    description: "Meet the team redefining global mobility. We move beyond the search bar to restore the soul of the journey through data-protected, persona-led orchestration.",
    alternates: {
        canonical: `${process.env.SITE_URL}/about`
    },
};

export default function Page() {
    return <AboutPage />;
}
