import CheckoutPage from "@/components/pages/checkout";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Checkout",
    description: "Checkout your tour booking here.",
    alternates: {
        canonical: `${process.env.SITE_URL}/checkout`
    },
};

export default function Page() {
    return <CheckoutPage />;
}