"use client"

import { useState } from "react";
import { Loader2, Lock } from "lucide-react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { formatPrice } from "@/lib/utils";

// Define interface
interface Props {
    orderData: any;
    paymentData: any;
    walletAmount: any;
    finalAmount: number;
    stripeHandlingFee: number;
    setIsPaymentDone: (value: boolean) => void;
}

export default function RepaymentPaymentMethod({ orderData, paymentData, walletAmount, finalAmount, stripeHandlingFee, setIsPaymentDone }: Props) {
    // Define hooks
    const stripe = useStripe();
    const elements = useElements();

    // Define state
    const [errors, setErrors] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [paymentMethod, setPaymentMethod] = useState<string>("credit-card");

    // Handle payment
    const handlePayment = async () => {
        // For Credit Card Payment
        if (paymentMethod === 'credit-card') {
            if (!stripe || !elements) {
                setErrors("Payment method not found. Please contact your admin.");
                return;
            }

            try {
                // Update state
                setIsLoading(true);
                setErrors("");

                // Define order amount
                const orderAmount: any = Number(finalAmount) + Number(stripeHandlingFee);

                // Create PaymentIntent
                const res = await fetch("/api/stripe/create-payment-intent", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        amount: Math.round(orderAmount * 100),
                        email: orderData?.customer_email,
                        checkout_id: orderData?.checkout_id,
                        payment_id: paymentData?.id
                    }),
                });

                // Get client secret
                const { clientSecret } = await res.json();

                // Confirm card payment
                const result = await stripe.confirmCardPayment(clientSecret, {
                    payment_method: {
                        card: elements.getElement(CardElement)!,
                        billing_details: {
                            name: `${orderData?.customer_fname} ${orderData?.customer_lname}`,
                            email: orderData?.customer_email
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
                    const response = await fetch("/api/checkout/repayment/credit_card", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            payment_intent_id: paymentIntentId,
                            booking_ref_no: orderData?.booking_ref_no,
                            payment_id: paymentData?.id,
                            payable_amount: finalAmount,
                            stripe_handling_fee: stripeHandlingFee,
                            is_wallet_entry: walletAmount != "" ? true : false,
                        })
                    });

                    // Parse the JSON response
                    const data = await response.json();

                    // Check response
                    if (data.status) {
                        setIsPaymentDone(true);
                    } else {
                        // Set error
                        setErrors(data.message || "Payment failed. If money was debited from your account, it will be refunded within 5-7 business days.");
                        return;
                    }
                }
            } catch (err: any) {
                // Set error
                setErrors("Something went wrong. If money was debited from your account, it will be refunded within 5-7 business days.");
            } finally {
                // Update state
                setIsLoading(false);
            }
        } else if (paymentMethod === 'bank-transfer') {
            try {
                // Update state
                setIsLoading(true);
                setErrors("");

                // Fetch the data
                const response = await fetch("/api/checkout/repayment/bank_transfer", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        booking_ref_no: orderData?.booking_ref_no,
                        payment_id: paymentData?.id,
                        payable_amount: finalAmount,
                        is_wallet_entry: walletAmount != "" ? true : false,
                    })
                });

                // Parse the JSON response
                const data = await response.json();

                // Check response
                if (data.status) {
                    // Update state
                    setIsPaymentDone(true);
                } else {
                    // Set error
                    setErrors(data.message || "Something went wrong. Please try again.");
                    return;
                }
            } catch (err: any) {
                // Set error
                setErrors("Something went wrong. Please try again.");
            } finally {
                // Update state
                setIsLoading(false);
            }
        }
    }

    return (
        <div className="border border-border rounded-sm overflow-hidden bg-card">
            <div className="p-4 md:p-6 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                        onClick={() => {
                            setPaymentMethod("credit-card");
                            setErrors("");
                        }}
                        className={`py-2 px-4 border rounded-sm font-medium text-base transition-all cursor-pointer border-black ${paymentMethod === "credit-card" ? "bg-black text-white" : "bg-white text-black"}`}
                    >
                        Credit Card
                    </button>
                    <button
                        onClick={() => {
                            setPaymentMethod("bank-transfer");
                            setErrors("");
                        }}
                        className={`py-2 px-4 border rounded-sm font-medium text-base transition-all cursor-pointer border-black ${paymentMethod === "bank-transfer" ? "bg-black text-white" : "bg-white text-black"}`}
                    >
                        Bank Transfer
                    </button>
                </div>

                {/* Credit Card Notice */}
                {paymentMethod === "credit-card" ? (
                    <>
                        <div className="bg-amber-50 border border-amber-300 rounded-sm p-4 space-y-3">
                            <span className="block font-semibold text-black">Credit Card Payment Notice</span>
                            <div className="space-y-3 text-sm text-black">
                                <p>
                                    Please note that a 4% credit card processing fee will be applied to all payments made by credit or
                                    debit card. This fee is charged by the payment processor and is non-refundable.
                                </p>
                                <p>To avoid this fee, you may choose to pay via bank transfer, which incurs no additional charges.</p>
                                <p className="font-semibold">USD {formatPrice(stripeHandlingFee, 0)} will be charged extra for this transaction.</p>
                            </div>
                        </div>
                        <div className="border p-3 rounded-sm">
                            <CardElement
                                options={{
                                    style: {
                                        base: {
                                            fontSize: "16px",
                                            color: "#000",
                                            "::placeholder": { color: "#888" },
                                        },
                                    },
                                }}
                            />
                        </div>
                    </>
                ) : (
                    <div className="bg-amber-50 border border-amber-300 rounded-sm p-4 space-y-3">
                        <span className="block font-semibold text-black">Bank Transfer Payment</span>
                        <div className="space-y-3 text-sm text-black">
                            <p>
                                We accept payments through bank transfer. After you place your booking, we’ll send you the bank details. Once the payment is completed, you’ll receive a confirmation email from us.
                            </p>
                        </div>
                    </div>
                )}

                {errors && (
                    <div className="relative space-x-2 text-red-500" role="alert">
                        <strong className="font-bold">Error!</strong>
                        <span className="block sm:inline">{errors}</span>
                    </div>
                )}

                <button
                    onClick={handlePayment}
                    disabled={isLoading || (paymentMethod === "credit-card" && !stripe)}
                    className="w-full bg-black hover:bg-black/90 cursor-pointer text-white font-semibold text-base py-2.5 px-2 rounded-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading && <Loader2 size={20} className="animate-spin" />}
                    {!isLoading && <Lock size={20} />}
                    {paymentMethod === "credit-card" ? "Pay with Credit Card" : "Pay with Bank Transfer"}
                </button>
            </div>
        </div>
    )
}
