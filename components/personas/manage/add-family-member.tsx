"use client";

import { isValidEmail } from "@/lib/utils";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Loader2 } from "lucide-react";
import { useState } from "react";

// Define props
interface Props {
    open: boolean,
    onOpenChange: (open: boolean) => void;
    setReloadContent: (open: boolean) => void;
    needPaymentForAddMember?: boolean;
    userId: string;
}

// Initial form data
const initialFormData = {
    name: "",
    relation: "",
    email: ""
};

export default function AddFamilyMemberModal({ open, onOpenChange, setReloadContent, needPaymentForAddMember, userId }: Props) {
    // Validation
    if (!open) return null;

    // Define hooks
    const stripe = useStripe();
    const elements = useElements();

    // Define state
    const [form, setForm] = useState(initialFormData);
    const [error, setError] = useState("");
    const [formLoading, setFormLoading] = useState(false);

    // Handle submit
    const handleSubmit = async () => {
        // Validation
        if (!stripe || !elements) {
            setError("Process failed. Payment method is not loaded. Please contact your admin.");
            return;
        } else if (userId === "" || !form.name || !form.relation || !form.email) {
            setError("Please fill all the fields.");
            return;
        } else if (!isValidEmail(form.email)) {
            setError("Enter a valid email address.");
            return;
        }

        // Update state
        setError("");
        setFormLoading(true);

        try {
            if (needPaymentForAddMember) {
                // Create PaymentIntent
                const res = await fetch("/api/stripe/create-payment-intent", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        amount: Math.round(25 * 100),
                        email: form?.email,
                    }),
                });

                // Get client secret
                const { clientSecret } = await res.json();

                // Confirm card payment
                const result = await stripe.confirmCardPayment(clientSecret, {
                    payment_method: {
                        card: elements.getElement(CardElement)!,
                        billing_details: {
                            name: form?.name,
                            email: form?.email
                        },
                    },
                });

                // Handle result
                if (result.error) {
                    // Set error
                    setError(result.error.message || "You payment was not successful. If money was debited from your account, it will be refunded within 5-7 business days. Please try again later.");
                } else if (result.paymentIntent?.status === "succeeded") {
                    // Get payment intent ID
                    const paymentIntentId = result?.paymentIntent?.id;

                    // API call
                    const res = await fetch("/api/plan_your_trip/manage/add-member", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            user_id: userId,
                            name: form.name,
                            relation: form.relation,
                            email: form.email,
                            payment_intent_id: paymentIntentId,
                            amount: 25,
                            response: result
                        }),
                    });

                    // Convert into JSON
                    const data = await res.json();

                    // Check response
                    if (data?.status) {
                        setReloadContent(true);
                        onOpenChange(false);
                    } else {
                        setError(data?.message || "Error occurred while adding family member. If money was debited from your account, it will be refunded within 5-7 business days. Please try again.");
                    }
                }
            } else {
                // API call
                const res = await fetch("/api/plan_your_trip/manage/add-member", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        user_id: userId,
                        name: form.name,
                        relation: form.relation,
                        email: form.email
                    }),
                });

                // Convert into JSON
                const data = await res.json();

                // Check response
                if (data?.status) {
                    setReloadContent(true);
                    onOpenChange(false);
                } else {
                    setError(data?.message || "Error occurred while adding family member. Please try again.");
                }
            }
        } catch (error) {
            setError("Error occurred while adding family member. Please try again.");
        } finally {
            setFormLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[999] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 md:p-8 relative space-y-5">
                <button
                    onClick={() => onOpenChange(false)}
                    disabled={formLoading}
                    className="absolute top-4 right-4 text-gray-400 hover:text-black text-lg cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                >
                    ✕
                </button>
                <div className="text-center space-y-2">
                    <h2 className="text-xl md:text-2xl font-semibold">
                        Invite Member
                    </h2>
                    <p className="text-sm text-gray-500">
                        Include your family to build a shared travel DNA
                    </p>
                </div>

                {needPaymentForAddMember && (
                    <div className="flex items-center justify-center gap-2 text-center bg-amber-100 border border-yellow-400 text-black text-sm px-4 py-2.5 rounded relative">
                        Additional $25 credit required to add per family member
                    </div>
                )}

                <div className="space-y-3">
                    <div>
                        <label className="text-base text-black">
                            Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={form.name}
                            onChange={(e) =>
                                setForm({ ...form, name: e.target.value })
                            }
                            placeholder="Enter name"
                            className="w-full mt-1 px-4 py-2 text-base rounded-xl border border-black/10 focus:border-black outline-none"
                        />
                    </div>
                    <div>
                        <label className="text-base text-black">
                            Relation <span className="text-red-500">*</span>
                        </label>
                        <select
                            value={form.relation}
                            onChange={(e) =>
                                setForm({ ...form, relation: e.target.value })
                            }
                            className="w-full mt-1 px-4 py-2 text-base rounded-xl border border-black/10 focus:border-black outline-none"
                        >
                            <option value="">Choose Option</option>
                            <option value="Husband">Husband</option>
                            <option value="Wife">Wife</option>
                            <option value="Father">Father</option>
                            <option value="Mother">Mother</option>
                            <option value="Son">Son</option>
                            <option value="Daughter">Daughter</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-base text-black">
                            Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            value={form.email}
                            onChange={(e) =>
                                setForm({ ...form, email: e.target.value })
                            }
                            placeholder="Enter email"
                            className="w-full mt-1 px-4 py-2 text-base rounded-xl border border-black/10 focus:border-black outline-none"
                        />
                    </div>
                </div>

                {needPaymentForAddMember && (
                    <div className="space-y-4">
                        <hr className="border-t border-gray-200" />
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
                    </div>
                )}

                {error && (
                    <div className="text-red-500 text-base">{error}</div>
                )}

                <div className="space-y-3">
                    <button
                        onClick={handleSubmit}
                        disabled={formLoading}
                        className="flex items-center gap-2 items-center justify-center gap-2 w-full py-2 rounded-full text-base bg-black text-white hover:bg-yellow-400 hover:text-black transition font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {formLoading && <Loader2 className="animate-spin w-5 h-5" />}
                        {needPaymentForAddMember ? `Complete Payment & Invite` : `Invite Member`}
                    </button>
                </div>
            </div>
        </div>
    );
}