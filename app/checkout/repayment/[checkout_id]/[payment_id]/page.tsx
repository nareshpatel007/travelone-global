"use client";

import { useEffect, useState } from "react";
import CommonHeader from "@/components/header/common-header";
import CommonFooter from "@/components/footer/common-footer";
import FAQSection from "@/components/checkout/faq-section";
import PageHeading from "@/components/common/page-heading";
import { isLoggedIn } from "@/lib/auth";
import { CheckCheck, CreditCard } from "lucide-react";
import StripeProvider from "@/components/providers/StripeProvider";
import { useParams } from "next/navigation";
import { RepaymentCartItem } from "@/components/cart/repayment-item";
import RepaymentPaymentMethod from "@/components/checkout/repayment-payment-method";
import NotFoundError from "@/components/common/not-found-error";
import RepaymentOrderSummary from "@/components/checkout/repayment-order-summary";
import Link from "next/link";

export default function Page() {
    // Get slug
    const params = useParams();
    const checkout_id = params?.checkout_id;
    const payment_id = params?.payment_id;

    // Define state
    const [ready, setReady] = useState(false);
    const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isPaymentDone, setIsPaymentDone] = useState(false);
    const [paymentData, setPaymentData] = useState<any>({});
    const [stripeHandlingFee, setStripeHandlingFee] = useState<number>(0);

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

                // If non login and required cart ID
                if (!is_logged_in) {
                    return;
                }

                // Fetch the data
                const response = await fetch("/api/cart/repayment", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        checkout_id,
                        payment_id
                    }),
                });

                // Parse the JSON response
                const data = await response.json();

                // Check response
                if (data?.status) {
                    // If already paid
                    if (data?.data?.payment?.status === "paid") {
                        setIsPaymentDone(true);
                    } else {
                        // Update the state
                        setPaymentData(data?.data ?? {});

                        // Calc 4% handing fee on total price
                        const handlingFee = (data?.data?.payment?.amount * 4) / 100;
                        setStripeHandlingFee(handlingFee);
                    }
                }
            } catch (error: any) {
                if (error.name !== "AbortError") {
                    console.error("Failed to fetch repayment data:", error);
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

                {/* For login user */}
                {isLoggedIn() && <div className="max-w-7xl mx-auto px-5 md:px-0 py-6">
                    <PageHeading
                        main="Complete Your Part Payment"
                        sub="Fill the form below to complete your payment."
                    />

                    {/* Payment done */}
                    {!isLoading && isPaymentDone && <div className="max-w-4xl mx-auto px-4 md:px-8 py-20 text-center space-y-5">
                        <div className="flex items-center justify-center">
                            <CheckCheck
                                className="text-black opacity-15"
                                size={120}
                            />
                        </div>

                        {/* ${paymentData?.order?.booking_ref_no} */}

                        <div className="space-y-3">
                            <h2 className="text-3xl md:text-4xl font-medium text-black">
                                Payment Completed Successfully
                            </h2>

                            <p className="text-base md:text-lg text-black max-w-2xl mx-auto">
                                You have successfully completed the payment for <span className="font-semibold">{paymentData?.order?.booking_ref_no}</span>. Now our team will be processing your payment and notifying you.
                            </p>
                        </div>

                        <Link href={`/bookings/${checkout_id}`}>
                            <button
                                className="px-6 md:px-8 py-3 bg-black text-white text-sm md:text-base font-medium tracking-wide hover:bg-black/90 transition cursor-pointer"
                            >
                                Go Back to Booking
                            </button>
                        </Link>
                    </div>}

                    {/* Payment form */}
                    {!isLoading && !isPaymentDone && paymentData && paymentData.cart && <div className="grid gap-4 md:grid-cols-3">
                        <div className="lg:col-span-2 space-y-4">
                            <RepaymentCartItem
                                bookingRefNo={paymentData?.order?.booking_ref_no}
                                cartData={paymentData?.cart}
                            />

                            <StripeProvider>
                                <RepaymentPaymentMethod
                                    orderData={paymentData?.order}
                                    paymentData={paymentData?.payment}
                                    walletAmount={paymentData?.wallet_amount}
                                    finalAmount={paymentData?.final_amount}
                                    stripeHandlingFee={stripeHandlingFee}
                                    setIsPaymentDone={setIsPaymentDone}
                                />
                            </StripeProvider>
                        </div>
                        <div className="col-span-1 space-y-4">
                            <RepaymentOrderSummary
                                orderData={paymentData?.order}
                                paymentData={paymentData?.payment}
                                walletAmount={paymentData?.wallet_amount}
                                finalAmount={paymentData?.final_amount}
                                stripeHandlingFee={stripeHandlingFee}
                            />

                            <FAQSection expandedFAQ={expandedFAQ} setExpandedFAQ={setExpandedFAQ} />
                        </div>
                    </div>}

                    {isLoading && <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                        {Array.from({ length: 2 }).map((_, index) => (
                            <div key={index} className="animate-pulse bg-gray-200 rounded-lg h-48 md:h-64"></div>
                        ))}
                    </div>}

                    {!isLoading && !isPaymentDone && !paymentData.order && <div className="max-w-4xl mx-auto px-4 md:px-8 py-20 text-center space-y-5">
                        <div className="flex items-center justify-center">
                            <CreditCard
                                className="text-[#ef2853] opacity-15"
                                size={120}
                            />
                        </div>

                        <h2 className="text-3xl md:text-4xl font-medium text-black">
                            Requested payment not found
                        </h2>

                        <p className="text-base md:text-lg text-black max-w-2xl mx-auto">
                            The requested payment could not be found. Please check the URL and try again.
                        </p>
                    </div>}
                </div>}

                <CommonFooter />
            </>}
        </ >
    );
}
