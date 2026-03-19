import TermsServicePage from "@/components/pages/terms-service";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms of Service",
    description: "Learn about TravelOne's terms and conditions for using our services.",
    alternates: {
        canonical: `${process.env.SITE_URL}/legal/terms-service`
    },
};

export default function Page() {
    return (
        <TermsServicePage />
    );
}
