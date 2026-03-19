"use client";

import { Loader2 } from "lucide-react";
import { useState } from "react";

export default function NewsletterSubscribe() {
    const [email, setEmail] = useState("");
    const [isCompleted, setIsCompleted] = useState(false);
    const [isFormLoading, setIsFormLoading] = useState(false);

    const handleSubmit = async () => {
        if (!email) return;

        setIsFormLoading(true);

        try {
            await fetch("/api/newsletter", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            setEmail("");
            setIsCompleted(true);
        } catch (err) {
            console.error(err);
        } finally {
            setIsFormLoading(false);
        }
    };

    return (
        <section className="w-full bg-[#FFF4E3] border border-[#d9cec1]/50 rounded-tr-4xl rounded-bl-4xl px-5 py-6 md:px-12 md:py-8">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10">

                {/* LEFT CONTENT */}
                <div className="w-full md:w-auto text-center md:text-left">
                    <h3 className="text-black text-lg md:text-xl font-semibold">
                        Subscribe to a Newsletter
                    </h3>
                    <p className="mt-1 text-black text-sm md:text-base">
                        Subscribe for trending deals and latest updates.
                    </p>
                </div>

                {/* RIGHT FORM */}
                <div className="w-full md:w-[450px]">
                    <div className="flex items-stretch gap-2">
                        {/* INPUT */}
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="
                                flex-1
                                px-4 py-3
                                text-sm md:text-base
                                border border-gray-300
                                bg-white text-black
                                focus:outline-none focus:ring-1 focus:ring-black
                            "
                        />

                        {/* BUTTON */}
                        <button
                            onClick={handleSubmit}
                            disabled={isFormLoading || isCompleted}
                            className="
                                flex-shrink-0
                                px-4 sm:px-6 md:px-8
                                py-3
                                bg-black text-white
                                text-xs sm:text-sm md:text-base
                                font-semibold uppercase
                                hover:bg-black/90 transition
                                disabled:opacity-60
                                flex items-center justify-center gap-2
                                whitespace-nowrap
                                cursor-pointer
                            "
                        >
                            {isFormLoading && (
                                <Loader2 className="h-4 w-4 md:h-5 md:w-5 animate-spin" />
                            )}
                            {isCompleted ? "Subscribed" : "Subscribe"}
                        </button>
                    </div>

                    {isCompleted && (
                        <p className="mt-2 text-xs sm:text-sm text-green-600">
                            You have been subscribed.
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
}
