import type { Metadata } from "next";
import MerchantofRecordSecurityPage from "@/components/pages/mors-security";

export const metadata: Metadata = {
    title: "Merchant of Record Security | Financial Integrity",
    description: "Your security is our priority. Learn how TravelOne’s Merchant of Record (MORS) system ensures high-level financial protection for your luxury travel.",
    alternates: {
        canonical: `${process.env.SITE_URL}/legal/mors-security`
    },
};

export default function Page() {
    return (
        <MerchantofRecordSecurityPage />
    );
}
