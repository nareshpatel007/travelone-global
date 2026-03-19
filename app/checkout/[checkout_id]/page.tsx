import BookingConfirmPage from "@/components/pages/booking-confirm";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Booking Confirmed",
    description: "Your tour booking has been confirmed. View and manage your bookings here."
};

export default function Page() {
    return <BookingConfirmPage />;
}
