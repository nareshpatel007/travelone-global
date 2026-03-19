"use client";

import CommonHeader from "@/components/header/common-header";
import CommonFooter from "@/components/footer/common-footer";
import { useEffect, useState } from "react";
import PageHeading from "@/components/common/page-heading";
import { CheckCircle, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Page() {
    // Get query params
    const router = useRouter();
    const token = getQuery("token", "");

    // Define state
    const [ready, setReady] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [errors, setErrors] = useState<string>("");

    useEffect(() => {
        requestAnimationFrame(() => {
            setReady(true);
        });
    }, []);

    // Handle submit
    const handleSubmit = async () => {
        // Update state
        setErrors("");
        setIsLoading(true);

        // Validate
        if (!token) {
            setErrors("Invalid or missing your token.");
            setIsLoading(false);
            return;
        } else if (!newPassword || !confirmPassword) {
            setErrors("Please enter a password.");
            setIsLoading(false);
            return;
        } else if (newPassword.length < 8) {
            setErrors("Password must be at least 8 characters long.");
            setIsLoading(false);
            return;
        } else if (newPassword !== confirmPassword) {
            setErrors("Passwords do not match.");
            setIsLoading(false);
            return;
        }

        try {
            // Make API request
            const res = await fetch(`/api/auth/reset_password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    token,
                    password: newPassword
                })
            });

            // Check response
            const data = await res.json();

            // Handle response
            if (data.status) {
                // Update state
                setErrors("Your account has been successfully verified.");
                setIsLoading(false);

                // Redirect to page
                router.push("/");
            } else {
                // Set error
                setErrors(data.message || "Something went wrong. Please try again.");
            }
        } catch (error: any) {
            // Set error
            setErrors(error.message || "Something went wrong. Please try again.");
        }
    }

    return (
        <>
            {ready && <>
                <CommonHeader />

                <div className="max-w-2xl mx-auto px-5 md:px-0 py-6">
                    <PageHeading
                        main="Reset Password"
                        sub="Reset your password and start planning your next trip."
                    />
                    <div className="rounded-xl p-5 md:p-8 border border-gray-200 space-y-5">
                        <div>
                            <label className="block text-sm md:text-base font-medium text-gray-700 mb-2">New Password</label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full px-4 py-2 text-sm md:text-base border border-gray-300 rounded-sm outline-none transition-all resize-none focus:ring-1 focus:ring-[#333] focus:ring-opacity-50"
                                placeholder="New Password"
                            />
                        </div>

                        <div>
                            <label className="block text-sm md:text-base font-medium text-gray-700 mb-2">Confirm New Password</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full px-4 py-2 text-sm md:text-base border border-gray-300 rounded-sm outline-none transition-all resize-none focus:ring-1 focus:ring-[#333] focus:ring-opacity-50"
                                placeholder="Confirm New Password"
                            />
                        </div>

                        {errors && (
                            <div className="flex items-center justify-center">
                                <p className="text-sm md:text-base text-red-500">{errors}</p>
                            </div>
                        )}

                        <div className="flex items-center justify-center">
                            <button
                                type="button"
                                disabled={isLoading}
                                onClick={handleSubmit}
                                className="w-full md:w-auto px-8 py-2.5 bg-black text-white font-medium rounded-sm hover:bg-black/90 cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isLoading && <Loader2 className="h-5 w-5 animate-spin" />}
                                {!isLoading && <CheckCircle className="h-4 w-4" />}
                                Reset Password
                            </button>
                        </div>
                    </div>
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