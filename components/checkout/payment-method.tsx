"use client"

import { useState } from "react";
import { CheckCheck, Loader2, Lock } from "lucide-react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { formatPrice } from "@/lib/utils";
import { deleteCartData, getLoginCookie, isLoggedIn } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { sendFbEvent } from "@/lib/sendFbEvent";

// Define interface
interface Props {
    paymentType: string;
    cartData: any;
    stripeHandlingFee: number;
    formData: any;
}

export default function PaymentMethod({ paymentType, cartData, stripeHandlingFee, formData }: Props) {
    // Define route
    const router = useRouter();

    // Define hooks
    const stripe = useStripe();
    const elements = useElements();

    // Define state
    const [errors, setErrors] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isPaymentDone, setIsPaymentDone] = useState<boolean>(false);
    const [paymentMethod, setPaymentMethod] = useState<string>("credit-card");

    // Get login user
    const is_logged_in = isLoggedIn();
    const user = getLoginCookie();

    // Handle payment
    const handlePayment = async () => {
        // Check stripe load
        if (paymentMethod === 'credit-card' && (!stripe || !elements)) {
            setErrors("Payment failed. Stripe is not loaded. Please contact your admin.");
            return;
        }

        // Validation
        if (!formData.title || !formData.first_name || !formData.last_name || !formData.email || !formData.phone) {
            setErrors("Please fill in all the required fields");
            return;
        }

        // For Credit Card Payment
        if (paymentMethod === 'credit-card') {
            if (!stripe || !elements) return;

            // Update state
            setIsLoading(true);
            setErrors("");

            // Define order amount
            let order_amount: number = (paymentType == 'part_payment') ? cartData.part_payment : cartData.full_payment;
            order_amount += stripeHandlingFee;

            try {
                // Create PaymentIntent
                const res = await fetch("/api/stripe/create-payment-intent", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        amount: Math.round(order_amount * 100),
                        email: formData?.email,
                        order_id: cartData?.cart?.id,
                    }),
                });

                // Get client secret
                const { clientSecret } = await res.json();

                // Confirm card payment
                const result = await stripe.confirmCardPayment(clientSecret, {
                    payment_method: {
                        card: elements.getElement(CardElement)!,
                        billing_details: {
                            name: `${formData.first_name} ${formData.last_name}`,
                            email: formData.email,
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
                    const response = await fetch("/api/checkout/credit_card", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            payment_intent_id: paymentIntentId,
                            cart_id: cartData?.cart?.id,
                            user_id: is_logged_in ? user?.user_id : "",
                            payment_type: paymentType,
                            payable_amount: cartData?.full_payment,
                            sub_total_amount: cartData?.sub_total,
                            order_amount: order_amount,
                            title: formData?.title,
                            first_name: formData?.first_name,
                            last_name: formData?.last_name,
                            email: formData?.email,
                            phone: formData?.phone,
                            special_request: formData?.special_request,
                            stripe_handling_fee: stripeHandlingFee,
                            upcoming_payments: cartData?.upcoming_payments,
                            traveller_price: {
                                adults: cartData?.travelers?.adults?.per_price,
                                child_8_12: cartData?.travelers?.child_8_12?.per_price,
                                child_3_7: cartData?.travelers?.child_3_7?.per_price,
                                infant: cartData?.travelers?.infant?.per_price,
                                extra_adult: cartData?.travelers?.extra_adult?.per_price,
                                single_supplement: cartData?.travelers?.single_supplement?.per_price
                            }
                        })
                    });

                    // Parse the JSON response
                    const data = await response.json();

                    // Check response
                    if (data.status) {
                        // Send FB Event
                        sendFbEvent({
                            eventName: "Purchase",
                            email: formData?.email,
                            amount: order_amount,
                        });

                        // Delete cart data
                        deleteCartData();

                        // Redirect to thank you page
                        setIsPaymentDone(true);
                        router.push(`/checkout/${data?.data.order_id}`);
                    } else {
                        // Set error
                        setErrors(data.message || "Booking creation failed. Please try again.");
                        return;
                    }
                }
            } catch (err: any) {
                // Set error
                setErrors("Something went wrong. Please try again.");
            } finally {
                // Update state
                setIsLoading(false);
            }
        } else if (paymentMethod === 'bank-transfer') {
            // Update state
            setIsLoading(true);
            setErrors("");

            // Define order amount
            let order_amount: number = (paymentType == 'part_payment') ? cartData.part_payment : cartData.full_payment;

            try {
                // Fetch the data
                const response = await fetch("/api/checkout/bank_transfer", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        cart_id: cartData?.cart?.id,
                        user_id: is_logged_in ? user?.user_id : "",
                        payment_type: paymentType,
                        payable_amount: cartData?.full_payment,
                        sub_total_amount: cartData?.sub_total,
                        order_amount: order_amount,
                        title: formData?.title,
                        first_name: formData?.first_name,
                        last_name: formData?.last_name,
                        email: formData?.email,
                        phone: formData?.phone,
                        special_request: formData?.special_request,
                        upcoming_payments: cartData?.upcoming_payments,
                        traveller_price: {
                            adults: cartData?.travelers?.adults?.per_price,
                            child_8_12: cartData?.travelers?.child_8_12?.per_price,
                            child_3_7: cartData?.travelers?.child_3_7?.per_price,
                            infant: cartData?.travelers?.infant?.per_price,
                            extra_adult: cartData?.travelers?.extra_adult?.per_price,
                            single_supplement: cartData?.travelers?.single_supplement?.per_price
                        }
                    })
                });

                // Parse the JSON response
                const data = await response.json();

                // Check response
                if (data.status) {
                    // Delete cart data
                    deleteCartData();

                    // Redirect to thank you page
                    setIsPaymentDone(true);
                    router.push(`/checkout/${data?.data.order_id}`);
                } else {
                    // Set error
                    setErrors(data.message || "Booking creation failed. Please try again.");
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
        <div className="border border-border rounded-sm overflow-hidden bg-card mb-4">
            <div className="p-5 md:p-6 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                        onClick={() => setPaymentMethod("credit-card")}
                        className={`py-2 px-4 border rounded-sm font-medium text-base transition-all cursor-pointer border-black ${paymentMethod === "credit-card" ? "bg-black text-white" : "bg-white text-black"}`}
                    >
                        Credit Card
                    </button>
                    <button
                        onClick={() => setPaymentMethod("bank-transfer")}
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
                    disabled={isPaymentDone || isLoading}
                    className="w-full bg-black hover:bg-black/90 cursor-pointer text-white font-semibold text-base py-2.5 px-2 rounded-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isPaymentDone ? <>
                        <CheckCheck size={20} />
                        {paymentMethod === "credit-card" ? "Payment successful 🎉" : "Booking Confirmed 🎉"}
                    </> : <>
                        {isLoading && <Loader2 size={20} className="animate-spin" />}
                        {!isLoading && <Lock size={20} />}
                        {paymentMethod === "credit-card" ? "Pay with Credit Card" : "Pay with Bank Transfer"}
                    </>}
                </button>
            </div>
        </div>
    )
}
