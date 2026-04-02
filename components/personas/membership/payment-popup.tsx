"use client";

import { getLoginCookie } from "@/lib/auth";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Loader2 } from "lucide-react";
import { useState } from "react";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    token?: string;
    plan: string;
    amount: string;
}

export default function MakePaymentModal({ open, onOpenChange, token, plan, amount }: Props) {
    // Validation
    if (!open) return null;

    // Define state
    const [errors, setErrors] = useState<string>("");
    const [promoCode, setPromoCode] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Define hooks
    const stripe = useStripe();
    const elements = useElements();

    // Handle payment
    const handlePayment = async () => {
        // Check stripe load
        if (!stripe || !elements) {
            setErrors("Payment failed. Stripe is not loaded. Please contact your admin.");
            return;
        }

        // Get login data
        const authData = getLoginCookie();

        // Update state
        setIsLoading(true);
        setErrors("");

        try {
            // If promo code is TRAVELONE, apply 100% discount
            if (promoCode === "TravelDNA2026" || promoCode === "TRAVELDNA2026") {
                // Fetch the data
                const response = await fetch("/api/plan_your_trip/membership/payment", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        user_id: authData?.user_id,
                        plan,
                        amount,
                        is_promo_code: true
                    })
                });

                // Parse the JSON response
                const data = await response.json();

                // Check response
                if (data?.status) {
                    if (data?.data?.token) {
                        window.location.href = `/persona-result/?token=${data?.data?.token}`;
                    } else {
                        window.location.href = `/manage-traveller-dna/`;
                    }
                } else {
                    // Set error
                    setErrors(data.message || "Payment failed. Please try again.");
                    return;
                }
            } else {
                // Create PaymentIntent
                const res = await fetch("/api/stripe/create-payment-intent", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        amount: Math.round(Number(amount) * 100),
                        email: authData?.email,
                    }),
                });

                // Get client secret
                const { clientSecret } = await res.json();

                // Confirm card payment
                const result = await stripe.confirmCardPayment(clientSecret, {
                    payment_method: {
                        card: elements.getElement(CardElement)!,
                        billing_details: {
                            name: `${authData?.first_name} ${authData?.last_name}`,
                            email: authData?.email,
                        },
                    },
                });

                // Handle result
                if (result.error) {
                    // Set error
                    setErrors(result.error.message || "You payment was not successful. If money was debited from your account, it will be refunded within 5-7 business days. Please try again later.");
                } else if (result.paymentIntent?.status === "succeeded") {
                    // Get payment intent ID
                    const paymentIntentId = result?.paymentIntent?.id;

                    // Fetch the data
                    const response = await fetch("/api/plan_your_trip/membership/payment", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            user_id: authData?.user_id,
                            plan,
                            amount,
                            payment_intent_id: paymentIntentId,
                            response: result
                        })
                    });

                    // Parse the JSON response
                    const data = await response.json();

                    // Check response
                    if (data?.status) {
                        if (data?.data?.token) {
                            window.location.href = `/persona-result/?token=${data?.data?.token}`;
                        } else {
                            window.location.href = `/manage-traveller-dna/`;
                        }
                    } else {
                        // Set error
                        setErrors(data.message || "Payment failed. Please try again.");
                        return;
                    }
                }
            }
        } catch (error: any) {
            setErrors(error.message || "Payment failed. Please try again.");
            setIsLoading(false);
            return;
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[999] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden relative">
                <button
                    onClick={() => onOpenChange(false)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white text-lg cursor-pointer transition"
                >
                    ✕
                </button>
                <div className="bg-gradient-to-r from-black to-gray-800 text-white p-4 text-center">
                    <h2 className="text-xl font-semibold">
                        Complete Your Payment
                    </h2>
                </div>
                <div className="p-6 space-y-6">
                    <div className="border rounded-xl p-4 flex justify-between items-center">
                        <div>
                            <p className="text-sm text-gray-500">Selected Plan</p>
                            <p className="text-lg font-semibold capitalize">
                                {plan === "family" ? "Family" : "Solo"}
                            </p>
                        </div>

                        <p className="text-2xl font-bold">USD ${amount}</p>
                    </div>

                    <div className="space-y-2 text-sm text-gray-600">
                        <p>✔ Instant access to your full Travel DNA report</p>
                        <p>✔ 100% redeemable as travel credit</p>
                        <p>✔ Lifetime profile storage and management</p>
                    </div>

                    <div className="w-full">
                        <label htmlFor="promo" className="block text-sm font-medium text-gray-700 mb-1">
                            Promo Code
                        </label>
                        <input
                            type="text"
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black transition"
                            placeholder="Enter promo code"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                        />
                    </div>

                    <div className="border rounded px-4 py-3 bg-white text-sm text-gray-700 space-y-2">
                        <CardElement
                            options={{
                                style: {
                                    base: {
                                        fontSize: "16px",
                                        color: "#000",
                                        "::placeholder": { color: "#999" },
                                    },
                                },
                            }}
                        />
                    </div>

                    {errors && (
                        <div className="text-red-500 text-sm">
                            {errors}
                        </div>
                    )}

                    <button
                        onClick={handlePayment}
                        disabled={!stripe || !elements || isLoading}
                        className="w-full flex items-center justify-center gap-2 py-2 rounded-full bg-black text-base text-white hover:bg-yellow-400 hover:text-black transition font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading && <Loader2 className="animate-spin" size={16} />}
                        Pay ${amount} Securely
                    </button>

                    <div className="text-center text-sm text-gray-700">
                        🔒 Secure Payment • No Hidden Fees
                    </div>
                </div>
            </div>
        </div>
    );
}