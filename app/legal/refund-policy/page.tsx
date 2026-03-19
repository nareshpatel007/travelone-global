import RefundPolicyPage from "@/components/pages/refund-policy";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Refund & Cancellation Policy",
    description: "Learn about TravelOne's refund and cancellation policies for your luxury travel experience.",
    alternates: {
        canonical: `${process.env.SITE_URL}/legal/refund-policy`
    },
};

export default function Page() {
    return (
        <RefundPolicyPage />
    );
}