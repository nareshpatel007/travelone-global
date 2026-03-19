"use client";

import Link from "next/link";
import CommonHeader from "@/components/header/common-header";
import CommonFooter from "@/components/footer/common-footer";
import { useEffect, useState } from "react";

export default function Page() {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        requestAnimationFrame(() => {
            setReady(true);
        });
    }, []);

    if (!ready) return null;

    return (
        <div className="min-h-screen text-black">
            <CommonHeader />

            <main className="relative flex min-h-[calc(100vh-180px)] items-center justify-center overflow-hidden px-6 py-16">
                <section className="relative w-full max-w-2xl rounded-2xl border border-black/10 bg-white/80 p-8 text-center shadow-[0_12px_35px_rgba(0,0,0,0.08)] backdrop-blur-sm sm:p-12">
                    <h1 className="text-4xl font-normal leading-tight sm:text-5xl">
                        Coming Soon
                    </h1>

                    <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-black/75 sm:text-lg">
                        We are building something exciting for your journey. Stay tuned for a smarter and more personalized travel experience.
                    </p>

                    <Link
                        href="/"
                        className="mt-8 inline-flex h-12 items-center justify-center rounded-full border border-black bg-black px-8 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-transparent hover:text-black cursor-pointer"
                    >
                        Back to Home
                    </Link>
                </section>
            </main>

            <CommonFooter />
        </div>
    );
}
