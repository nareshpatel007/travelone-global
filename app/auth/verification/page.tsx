"use client";

import CommonHeader from "@/components/header/common-header";
import CommonFooter from "@/components/footer/common-footer";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, Loader2, X } from "lucide-react";

export default function Page() {
    // Get query parms
    const router = useRouter();
    const token = getQuery("token", "");

    // Define state
    const [ready, setReady] = useState(false);
    const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
    const [message, setMessage] = useState("Verifying your account please wait ...");

    useEffect(() => {
        requestAnimationFrame(() => {
            setReady(true);
        });
    }, []);

    useEffect(() => {
        if (!token) {
            setStatus("error");
            setMessage("Invalid or missing verification token.");
            return;
        }
        verifyAccount(token);
    }, [token]);

    const verifyAccount = async (token: string) => {
        try {
            const res = await fetch(`/api/auth/verify-account`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token })
            });

            // Check response
            const data = await res.json();

            // Handle response
            if (!res.ok) {
                throw new Error(data.message || "Verification failed.");
            }

            // Update state
            setStatus("success");
            setMessage("Your account has been successfully verified.");

            // Optional redirect after success
            setTimeout(() => router.push("/"), 5000);
        } catch (error: any) {
            // Update state
            setStatus("error");
            setMessage(error.message || "Verification link expired.");
        }
    };

    return (
        <>
            {ready && <>
                <div className="min-h-screen bg-white">
                    <CommonHeader />
                    <div className="max-w-4xl mx-auto px-4 md:px-8 py-20 md:py-30 text-center space-y-6">
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            {status === "success" && <CheckCircle className="h-30 w-30 text-black opacity-10" />}
                            {status === "loading" && <Loader2 className="h-26 w-26 text-black opacity-10 animate-spin" />}
                            {status === "error" && <X className="h-26 w-26 text-black opacity-10" />}
                        </div>

                        <h2 className="text-3xl md:text-4xl font-semibold text-black">
                            {message}
                        </h2>

                        <p className="text-base md:text-lg text-black max-w-2xl mx-auto">
                            {status == "loading" && "We will notify you once your account is verified."}
                            {(status == "success" || status == "error") && "We will redirect you to the login page. Please wait..."}
                        </p>
                    </div>
                    <CommonFooter />
                </div>
            </>}
        </>
    );
}

export const getQuery = (key: string, fallback = "") =>
    typeof window === "undefined"
        ? fallback
        : new URLSearchParams(window.location.search).get(key) ?? fallback;