"use client";

import CommonHeader from "@/components/header/common-header";
import CommonFooter from "@/components/footer/common-footer";
import { useEffect, useState } from "react";
import { ManageBookings } from "@/components/booking/manage-bookings";
import PageHeading from "@/components/common/page-heading";
import { getLoginCookie, isLoggedIn } from "@/lib/auth";
import NotFoundError from "@/components/common/not-found-error";

export default function MyBookingsPage() {
    // Define state
    const [ready, setReady] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [bookingData, setBookingData] = useState<any>({});

    useEffect(() => {
        requestAnimationFrame(() => {
            setReady(true);
        });
    }, []);

    // Init data
    useEffect(() => {
        const controller = new AbortController();
        const loadInitData = async () => {
            try {
                // Fetch the data
                const response = await fetch("/api/bookings/list", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        user_id: getLoginCookie()?.user_id
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
                    console.error("Failed to fetch bookings:", error);
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

                {/* For non login */}
                {!isLoggedIn() && <NotFoundError
                    heading="You are not logged in"
                    subHeading="Please login to view and manage your bookings."
                    needButton={false}
                />}

                {/* For login */}
                {isLoggedIn() && <div className="max-w-7xl mx-auto px-5 md:px-0 py-6">
                    <PageHeading
                        main="My Bookings"
                        sub="View and manage all your travel bookings in one place."
                    />

                    {isLoading && <div className="grid gap-4 grid-cols-1">
                        {Array.from({ length: 3 }).map((_, index) => (
                            <div key={index} className="animate-pulse bg-gray-200 rounded-lg h-48 md:h-50"></div>
                        ))}
                    </div>}

                    {!isLoading && <ManageBookings bookingData={bookingData} />}
                </div>}

                <CommonFooter />
            </>}
        </>
    );
}