"use client";

import { CheckCircle, Loader2 } from "lucide-react";
import { useRef, useState } from "react";

interface Props {
    open: boolean;
    setOpenChange: (open: boolean) => void;
    setIsAccountDeleted: (open: boolean) => void;
    token: string;
    resultId: string;
}

export default function DeleteAccount({
    open,
    setOpenChange,
    token,
    resultId,
    setIsAccountDeleted
}: Props) {
    if (!open) return null;

    // Define state
    const [isDeleteProcess, setIsDeleteProcess] = useState(false);
    const [verificationOtp, setVerificationOtp] = useState("");
    const [sendEmail, setSendEmail] = useState("");
    const [enteredOtp, setEnteredOtp] = useState<string[]>(Array(6).fill(""));
    const [sentVerificationMail, setSentVerificationMail] = useState(false);
    const [error, setError] = useState("");

    // Define refs
    const inputsRef = useRef<HTMLInputElement[]>([]);

    // Handle send verification
    const handleSendVerificationMail = async () => {
        try {
            // Update state
            setIsDeleteProcess(true);
            setError("");

            // Generate otp
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            setVerificationOtp(otp);

            // Send verification mail
            const response = await fetch(`/api/plan_your_trip/manage/delete/send_verification`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    token,
                    otp
                })
            });

            // Update state
            const data = await response.json();

            // Check if success
            if (!data.status) {
                setSendEmail(data?.data?.send_to);
                return;
            }

            // Update state
            setSentVerificationMail(true);
        } catch {
            setError("Failed to send verification email");
        } finally {
            setIsDeleteProcess(false);
        }
    };

    // Handle otp change
    const handleOtpChange = (value: string, index: number) => {
        if (!/^[0-9]?$/.test(value)) return;

        const newOtp = [...enteredOtp];
        newOtp[index] = value;
        setEnteredOtp(newOtp);

        if (value && index < 5) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    // Handle key down
    const handleKeyDown = (e: any, index: number) => {
        if (e.key === "Backspace" && !enteredOtp[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    // Handle verify and delete
    const handleVerifyAndDelete = async () => {
        // Check if otp is correct
        if (enteredOtp.join("") !== verificationOtp) {
            setError("Invalid OTP. Please try again.");
            return;
        }

        try {
            // Update state
            setIsDeleteProcess(true);
            setError("");

            // Delete account
            const response = await fetch(`/api/plan_your_trip/manage/delete`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: resultId })
            });

            // Update state
            const data = await response.json();

            // Check if account is deleted
            if (data?.status) {
                setIsAccountDeleted(true);
                setOpenChange(false);
            } else {
                setError("Failed to delete account");
            }
        } finally {
            setIsDeleteProcess(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md">
            <div className="bg-white w-[92%] max-w-md rounded-2xl shadow-2xl p-7 space-y-6 transition-all duration-300 scale-100">
                {/* ICON + TITLE */}
                <div className="text-center space-y-3">
                    <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-rose-100">
                        <CheckCircle className="w-6 h-6 text-rose-600" />
                    </div>

                    <h2 className="text-xl font-semibold">
                        {!sentVerificationMail
                            ? "Delete your Traveller DNA account?"
                            : "Verify your identity"}
                    </h2>

                    <p className="text-base text-gray-700 leading-relaxed">
                        {!sentVerificationMail
                            ? "This action will permanently delete your account and all associated data."
                            : `"Enter the 6-digit verification code sent to your ${sendEmail} email."`}
                    </p>
                </div>

                {/* STEP 1 */}
                {!sentVerificationMail && (
                    <>
                        {error && (
                            <p className="text-sm text-red-500 text-center">{error}</p>
                        )}

                        <div className="flex gap-3 pt-2">
                            <button
                                onClick={() => setOpenChange(false)}
                                disabled={isDeleteProcess}
                                className="flex-1 py-2 rounded-md bg-gray-200 hover:bg-gray-300 transition cursor-pointer"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleSendVerificationMail}
                                disabled={isDeleteProcess}
                                className="flex-1 flex items-center justify-center gap-2 py-2 rounded-md bg-rose-600 text-white hover:bg-rose-700 transition cursor-pointer"
                            >
                                {isDeleteProcess ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <CheckCircle className="w-4 h-4" />
                                )}
                                Continue
                            </button>
                        </div>
                    </>
                )}

                {/* STEP 2 - PREMIUM OTP */}
                {sentVerificationMail && (
                    <>
                        <div className="flex justify-center gap-3">
                            {enteredOtp.map((digit, i) => (
                                <input
                                    key={i}
                                    ref={(el) => {
                                        inputsRef.current[i] = el!;
                                    }}
                                    value={digit}
                                    onChange={(e) => handleOtpChange(e.target.value, i)}
                                    onKeyDown={(e) => handleKeyDown(e, i)}
                                    maxLength={1}
                                    className="w-11 h-12 text-center text-lg border rounded-lg shadow-sm focus:ring-1 focus:ring-black focus:scale-105 transition-all outline-none"
                                />
                            ))}
                        </div>

                        {error && (
                            <p className="text-sm text-red-500 text-center">{error}</p>
                        )}

                        <div className="flex justify-between items-center text-sm">
                            <button
                                onClick={handleSendVerificationMail}
                                className="text-gray-600 hover:underline cursor-pointer"
                            >
                                Resend code
                            </button>

                            <span className="text-gray-400">6-digit code</span>
                        </div>

                        <div className="flex gap-3 pt-2">
                            <button
                                onClick={() => setOpenChange(false)}
                                className="flex-1 py-2 rounded-md bg-gray-200 hover:bg-gray-300 transition cursor-pointer"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleVerifyAndDelete}
                                disabled={isDeleteProcess}
                                className="flex-1 flex items-center justify-center gap-2 py-2 rounded-md bg-rose-600 text-white hover:bg-rose-700 transition cursor-pointer"
                            >
                                {isDeleteProcess ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <CheckCircle className="w-4 h-4" />
                                )}
                                Delete Account
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}