"use client";

import CommonHeader from "@/components/header/common-header";
import CommonFooter from "@/components/footer/common-footer";
import { useEffect, useState } from "react";
import Heading from "@/components/common/heading";

export default function LoginPage() {
    // Define state
    const [ready, setReady] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        requestAnimationFrame(() => {
            setReady(true);
        });
    }, []);

    return (
        <>
            {ready && <>
                <CommonHeader />

                <div className="max-w-7xl mx-auto px-5 md:px-0 md:p-6">
                    <Heading
                        main="Log In"
                        sub="Log in to your account and start planning your next trip."
                    />
                    <main className="mx-auto max-w-7xl p-5 md:p-6">
                        
                    </main>
                </div>

                <CommonFooter />
            </>}
        </>
    );
}
