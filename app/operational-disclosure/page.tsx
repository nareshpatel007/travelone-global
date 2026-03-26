import OperationalDisclosurePage from "@/components/pages/operational-disclosure-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Operational Disclosure",
    description: "Learn about TravelOne's commitment to security, privacy, and compliance in our Trust Center. Discover how we protect your data and ensure a safe travel experience.",
    alternates: {
        canonical: `${process.env.SITE_URL}/operational-disclosure`
    },
};

export default function Page() {
    return (
        <OperationalDisclosurePage />
    );
}
