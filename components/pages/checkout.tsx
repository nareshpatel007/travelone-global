"use client";

import { useEffect, useState } from "react";
import CommonHeader from "@/components/header/common-header";
import CommonFooter from "@/components/footer/common-footer";
import PassengerForm from "@/components/checkout/passenger-form";
import PaymentMethod from "@/components/checkout/payment-method";
import OrderSummary from "@/components/checkout/order-summary";
import FAQSection from "@/components/checkout/faq-section";
import PageHeading from "@/components/common/page-heading";
import { getCartData, getLoginCookie, isLoggedIn } from "@/lib/auth";
import PaymentSchedule from "@/components/checkout/payment-schedule";
import { ShoppingBasket } from "lucide-react";
import StripeProvider from "@/components/providers/StripeProvider";

export default function CheckoutPage() {
    // Get query params
    const paymentType = getQuery("type", "full_payment");

    // Define state
    const [ready, setReady] = useState(false);
    const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [cartData, setCartData] = useState<any>({});
    const [stripeHandlingFee, setStripeHandlingFee] = useState<number>(0);
    const [formData, setFormData] = useState<any>({
        title: "Mr.",
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        special_request: ""
    });

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
                // Get login data
                const is_logged_in = isLoggedIn();
                const user = getLoginCookie();

                // Get cart ID
                const cart_id = getCartData();

                // If non login and required cart ID
                if (!is_logged_in && !cart_id) {
                    return;
                }

                // Fetch the data
                const response = await fetch("/api/cart/view", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        user_id: is_logged_in ? user?.user_id : null,
                        cart_id
                    }),
                });

                // Parse the JSON response
                const data = await response.json();

                // Check response
                if (data?.status) {
                    // Update the state
                    setCartData(data?.data ?? {});

                    // Calc 4% handing fee on total price
                    const handlingFee = ((paymentType == 'part_payment' ? data?.data?.part_payment : data?.data?.full_payment) * 4) / 100;
                    setStripeHandlingFee(handlingFee);
                }
            } catch (error: any) {
                if (error.name !== "AbortError") {
                    console.error("Failed to fetch cart data:", error);
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

                <div className="max-w-7xl mx-auto px-5 md:px-0 py-6">
                    <PageHeading
                        main="Complete Your Booking"
                        sub="Fill out the form below to complete your booking and start planning your next trip."
                    />

                    {!isLoading && cartData && cartData.cart && <div className="grid gap-4 md:grid-cols-3">
                        <div className="lg:col-span-2 space-y-4">
                            <PassengerForm
                                formData={formData}
                                setFormData={setFormData}
                            />

                            <StripeProvider>
                                <PaymentMethod
                                    paymentType={paymentType}
                                    cartData={cartData}
                                    formData={formData}
                                    stripeHandlingFee={stripeHandlingFee}
                                />
                            </StripeProvider>
                        </div>
                        <div className="col-span-1 space-y-4">
                            <OrderSummary paymentType={paymentType} cartData={cartData} />

                            {paymentType == 'part_payment' && <PaymentSchedule cartData={cartData} />}

                            <FAQSection expandedFAQ={expandedFAQ} setExpandedFAQ={setExpandedFAQ} />
                        </div>
                    </div>}

                    {isLoading && <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                        {Array.from({ length: 2 }).map((_, index) => (
                            <div key={index} className="animate-pulse bg-gray-200 rounded-lg h-48 md:h-64"></div>
                        ))}
                    </div>}

                    {!isLoading && !cartData.cart && <div className="max-w-4xl mx-auto px-4 md:px-8 py-20 text-center space-y-5">
                        <div className="flex items-center justify-center">
                            <ShoppingBasket
                                className="text-[#ef2853] opacity-15"
                                size={120}
                            />
                        </div>

                        <h2 className="text-3xl md:text-4xl font-medium text-black">
                            Your cart is empty
                        </h2>

                        <p className="text-base md:text-lg text-black max-w-2xl mx-auto">
                            Add tour to your cart to start planning your perfect trip.
                        </p>
                    </div>}
                </div>

                <CommonFooter />
            </>}
        </>
    );
}

export const getQuery = (key: string, fallback = "") =>
    typeof window === "undefined"
        ? fallback
        : new URLSearchParams(window.location.search).get(key) ?? fallback;