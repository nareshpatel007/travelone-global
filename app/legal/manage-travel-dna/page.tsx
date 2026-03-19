import ManageMyTravelDNAPage from "@/components/pages/manage-travel-dna";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Manage My Travel DNA",
    description: "TravelOne is committed to an inclusive digital experience. Read our accessibility statement regarding our travel intelligence platform and services.",
    alternates: {
        canonical: `${process.env.SITE_URL}/legal/manage-travel-dna`
    },
};

export default function Page() {
    return (
        <ManageMyTravelDNAPage />
    );
}
