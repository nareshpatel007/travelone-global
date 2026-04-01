"use client";

import { useEffect, useState } from "react";
import CommonHeader from "@/components/header/common-header";
import CommonFooter from "@/components/footer/common-footer";
import { BookingConfirmation } from "@/components/booking/booking-confirmation";
import { useParams } from "next/navigation";
import NotFoundError from "@/components/common/not-found-error";
import { SearchAlert } from "lucide-react";

export default function BookingConfirmPage() {
    // Get slug
    const params = useParams();
    const checkout_id = params?.checkout_id;

    // Define state
    const [ready, setReady] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [orderData, setOrderData] = useState<any>({});

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
                const response = await fetch("/api/checkout/single_order", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        checkout_id
                    }),
                });

                // Parse the JSON response
                const data = await response.json();

                // Check response
                if (data.status) {
                    setOrderData(data?.data ?? {});
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

    // Render
    if (!ready) return null;

    return (
        <>
            <CommonHeader />

            {/* Not Found Error Page */}
            {!checkout_id && <NotFoundError />}

            {/* Thank You Page */}
            {checkout_id && <div className="max-w-7xl mx-auto px-5 md:px-0 py-12">
                {isLoading && <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                    {Array.from({ length: 2 }).map((_, index) => (
                        <div key={index} className="animate-pulse bg-gray-200 rounded-lg h-48 md:h-100"></div>
                    ))}
                </div>}

                {!isLoading && orderData && (
                    <BookingConfirmation orderData={orderData} />
                )}

                {!isLoading && !orderData && (
                    <div className="mx-auto max-w-4xl py-20 text-center space-y-5">
                        <SearchAlert
                            size={120}
                            className="mx-auto text-[#ef2853] opacity-15"
                        />
                        <h2 className="text-3xl font-medium text-black">
                            Booking not found
                        </h2>
                        <p className="text-base text-black max-w-2xl mx-auto">
                            Your booking was not found. Please check the URL and try again.
                        </p>
                    </div>
                )}
            </div>}

            <CommonFooter />
        </>
    );
}
