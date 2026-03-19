import CareersPage from "@/components/pages/careers";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Careers",
    description: "Join our team and make your travel dreams come true.",
    alternates: {
        canonical: `${process.env.SITE_URL}/careers`
    },
};

export default function Page() {
    return <CareersPage />;
}
