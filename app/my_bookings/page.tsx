import MyBookingsPage from "@/components/pages/my-bookings";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "My Bookings",
    description: "View and manage your bookings here.",
    alternates: {
        canonical: `${process.env.SITE_URL}/my_bookings`
    },
};

export default function Page() {
    return <MyBookingsPage />;
}