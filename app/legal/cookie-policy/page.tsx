import type { Metadata } from "next";
import CookiePolicyPage from "@/components/pages/cookie-policy";

export const metadata: Metadata = {
    title: "Cookie Policy",
    description: "Learn about TravelOne's Cookie Policy, detailing how we use cookies to enhance your browsing experience while respecting your privacy. Find out what types of cookies we use and how you can manage them.",
    alternates: {
        canonical: `${process.env.SITE_URL}/legal/cookie-policy`
    },
};

export default function Page() {
    return (
        <CookiePolicyPage />
    );
}
