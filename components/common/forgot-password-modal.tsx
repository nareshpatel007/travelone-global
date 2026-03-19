"use client"

import type React from "react"
import { useState } from "react"
import { X, Mail, CheckCircle, Loader2 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import QuestionHeading from "../plan_your_trip/landing/questionHeading"

interface ForgotPasswordModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function ForgotPasswordModal({ open, onOpenChange }: ForgotPasswordModalProps) {
    // Define state
    const [isFormLoading, setIsFormLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const [errors, setErrors] = useState<string>("");

    // Handle reset
    const handleReset = () => {
        setErrors("");
        setEmail("");
        setIsSubmitted(false);
        setIsFormLoading(false);
    }

    // Handle submit
    const handleSubmit = async () => {
        // Update state
        setErrors("");
        setIsFormLoading(true);

        try {
            // Validate form
            if (!email) {
                setErrors("Email is required.");
                return;
            }

            // Fetch the data
            const response = await fetch("/api/auth/forgot_password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email })
            });

            // Parse the JSON response
            const data = await response.json();

            // Check response
            if (data.status) {
                // Update state
                setErrors("");
                setEmail("");
                setIsSubmitted(true);
            } else {
                // Update state
                setErrors(data?.message ?? "Something went wrong. Please try again.");
            }
        } catch (error: any) {
            if (error.name !== "AbortError") {
                console.error("Failed to fetch tours:", error);
            }
        } finally {
            // Update state
            setIsFormLoading(false);
        }
    }

    return (
        <>
            {open && <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 px-4">
                <div
                    className="relative w-full max-w-[380px] bg-[#d9eed8] shadow-xl overflow-visible"
                    style={{
                        borderTopLeftRadius: "180px",
                        borderTopRightRadius: "180px",
                        borderBottomLeftRadius: "0px",
                        borderBottomRightRadius: "0px",
                    }}
                >
                    <div className="absolute top-16 right-10 translate-x-1/2 -translate-y-1/2 z-50 cursor-pointer">
                        <svg
                            className="absolute inset-0 w-10 h-10"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 110 110"
                            fill="#a6c5a9"
                        >
                            <path d="M109.2,72.8c-1.9,5.2-11.5,6.4-14.7,10.6c-3.4,4.3-2,13.5-6.5,16.6c-4.6,3.1-13.1-1.3-18.4,0.3c-5.3,1.6-9.7,9.8-15.4,9.7c-5.5-0.1-9.6-8.4-15.1-10.2C33.6,98,25,102.1,20.6,99c-4.5-3.3-2.8-12.4-5.9-16.8c-3.2-4.4-12.8-5.9-14.4-11.1c-1.6-5.1,5.3-11.5,5.4-16.9C5.8,49-1.1,42.4,0.8,37.2s11.5-6.4,14.7-10.6c3.4-4.3,2-13.5,6.5-16.6c4.6-3.1,13.1,1.3,18.4-0.3c5.3-1.6,9.7-9.8,15.4-9.7c5.5,0.1,9.6,8.4,15.1,10.2C76.4,12,85,7.9,89.4,11c4.5,3.3,2.8,12.4,5.9,16.8c3.2,4.4,12.8,5.9,14.4,11.1c1.6,5.1-5.3,11.5-5.4,16.9C104.2,61,111.1,67.6,109.2,72.8z" />
                        </svg>

                        <button
                            aria-label="Close"
                            className="relative w-10 h-10 flex items-center justify-center text-white text-sm font-semibold cursor-pointer"
                            onClick={() => {
                                onOpenChange(false);
                                handleReset();
                            }}
                        >
                            ✕
                        </button>
                    </div>
                    <div className="p-6">
                        <QuestionHeading
                            title="Forgot password"
                            subtitle="Enter your email address and we'll send you a link to reset your password"
                        />

                        {errors && <div className="flex items-center justify-center">
                            <p className="text-sm md:text-base text-red-500">{errors}</p>
                        </div>}

                        {!isSubmitted ? (
                            <div className="space-y-5">
                                <div>
                                    <label className="block text-md text-black">Email address</label>
                                    <input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        className="w-full rounded-sm px-4 py-2 bg-white border border-gray-900"
                                    />
                                    <p className="mt-2 text-sm text-gray-700">We'll send a password reset link to this email address</p>
                                </div>

                                <button
                                    type="submit"
                                    onClick={handleSubmit}
                                    disabled={isFormLoading}
                                    className="w-full flex items-center justify-center bg-black text-white font-semibold mt-3 py-2.5 rounded-md hover:bg-[#333] transition-colors cursor-pointer"
                                >
                                    {isFormLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                                    Send reset link
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-4 text-center py-4">
                                <div className="flex justify-center">
                                    <div className="h-16 w-16 rounded-full bg-[#2F5D50]/10 flex items-center justify-center">
                                        <CheckCircle className="h-8 w-8 text-[#2F5D50]" />
                                    </div>
                                </div>
                                <div>
                                    <span className="text-xl font-semibold text-black block mb-2">Check your email</span>
                                    <span className="text-sm text-gray-700 block mb-1">We've sent a password reset link to</span>
                                    <span className="text-sm font-medium text-gray-900">{email}</span>
                                </div>
                                <div className="bg-gray-50 px-4 py-2 rounded-lg text-center">
                                    <span className="text-sm text-gray-700 leading-relaxed">
                                        Didn't receive the email?&nbsp;
                                        <button
                                            type="button"
                                            onClick={() => setIsSubmitted(false)}
                                            className="text-[#2F5D50] hover:underline font-medium"
                                        >
                                            Try again?
                                        </button>
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>}
        </>
    )
}
