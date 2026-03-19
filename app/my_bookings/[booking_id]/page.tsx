"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import CommonHeader from "@/components/header/common-header";
import CommonFooter from "@/components/footer/common-footer"
import NotFoundError from "@/components/common/not-found-error";
import HeroTour from "@/components/booking/hero-tour";
import TabContent from "@/components/booking/tab-content";
import { isLoggedIn } from "@/lib/auth";

export default function Page() {
    // Get slug
    const params = useParams();
    const booking_id = params?.booking_id;
    const activeTab = getQuery("tab", "itinerary");

    // Define state
    const [ready, setReady] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [bookingData, setBookingData] = useState<any>({});

    useEffect(() => {
        requestAnimationFrame(() => { setReady(true); });
    }, []);
    
    // Init data
    useEffect(() => {
        const controller = new AbortController();
        const loadInitData = async () => {
            try {
                // Fetch the data
                const response = await fetch("/api/bookings/single", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        booking_id
                    }),
                });

                // Parse the JSON response
                const data = await response.json();

                // Check response
                if (data.status) {
                    setBookingData(data?.data ?? []);
                }
            } catch (error: any) {
                if (error.name !== "AbortError") {
                    console.error("Failed to fetch single order:", error);
                }
            } finally {
                setIsLoading(false);
            }
        };
        loadInitData();
        return () => controller.abort();
    }, []);

    return (
        <>
            {ready && <>
                <CommonHeader />

                {/* Single Booking Page */}
                {!isLoading && isLoggedIn() && booking_id && <div className="bg-white">
                    <HeroTour
                        orderData={bookingData?.order}
                        tour={bookingData?.tour_info}
                        cartData={bookingData?.cart_data}
                    />

                    <TabContent
                        activeTab={activeTab}
                        orderData={bookingData?.order}
                        cartData={bookingData?.cart_data}
                        itineraryData={bookingData?.tour_itinerary || []}
                        travellerData={bookingData?.travellers_data || []}
                        walletNotes={bookingData?.wallet_notes || []}
                        termsData={bookingData?.tour_terms || []}
                        paymentSchedule={bookingData?.payment_schedule || []}
                        paymentHistory={bookingData?.payment_history || []}
                        cancellationPolicy={bookingData?.cancellation_policy || []}
                    />
                </div>}

                {/* Loading */}
                {isLoading && isLoggedIn() && booking_id && <div className="max-w-7xl mx-auto px-5 md:px-0 py-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {Array.from({ length: 2 }).map((_, index) => (
                            <div key={index} className="animate-pulse bg-gray-200 rounded-lg h-48 md:h-120"></div>
                        ))}
                    </div>
                </div>}

                {/* For non login */}
                {!isLoggedIn() && <NotFoundError
                    needCode={false}
                    heading="You need to login to access this page."
                    subHeading="Please login to view and manage your bookings."
                    needButton={false}
                    showLogin={true}
                />}

                {/* Not Found Error Page */}
                {!booking_id && isLoggedIn() && <NotFoundError />}

                <CommonFooter />
            </>}
        </>
    );
}

// Get query
export const getQuery = (key: string, fallback = "") =>
    typeof window === "undefined"
        ? fallback
        : new URLSearchParams(window.location.search).get(key) ?? fallback;