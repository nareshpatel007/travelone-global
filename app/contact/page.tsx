import ContactPage from "@/components/pages/contact-us";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact TravelOne | Start Your Persona-Led Journey",
    description: "Ready to move beyond the search bar? Contact the Personalization Architects at TravelOne to begin decoding your traveler DNA and engineering your next trip.",
    alternates: {
        canonical: `${process.env.SITE_URL}/contact`
    },
};

export default function Page() {
    return <ContactPage />;
}
