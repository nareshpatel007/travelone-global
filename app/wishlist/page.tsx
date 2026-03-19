import WishlistPage from "@/components/pages/wishlist";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Wishlist",
    description: "View and manage your wishlist here.",
    alternates: {
        canonical: `${process.env.SITE_URL}/wishlist`
    },
};

export default function Page() {
    return <WishlistPage />;
}