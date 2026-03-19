"use client";

import CommonHeader from "@/components/header/common-header";
import CommonFooter from "@/components/footer/common-footer";
import { useEffect, useState } from "react";
import PageHeading from "@/components/common/page-heading";
import Link from "next/link";

export default function RefundPolicyPage() {
    // Define state
    const [ready, setReady] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [pageContent, setPageContent] = useState<any>("");

    useEffect(() => {
        requestAnimationFrame(() => { setReady(true); });
    }, []);

    // Init data
    useEffect(() => {
        const controller = new AbortController();
        const fetchInitData = async () => {
            try {
                // Set loading
                setIsLoading(true);

                // Fetch the data
                const response = await fetch("/api/page", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        page_id: 3,
                    }),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                // Parse the JSON response
                const data = await response.json();

                // Check response
                if (data?.status) {
                    setPageContent(data?.data?.html_content);
                }
            } finally {
                setIsLoading(false);
            }
        };
        fetchInitData();
        return () => controller.abort();
    }, []);

    // If not ready, return null
    if (!ready) return null;

    return (
        <>
            <CommonHeader />
            <div className="max-w-4xl mx-auto px-5 md:px-0 md:p-6 py-5 md:py-6">
                <PageHeading main="Refund & Cancellation Policy" />
                <div className="space-y-10 mb-10">
                    {/* Loading */}
                    {isLoading && (
                        <div className="max-w-7xl mx-auto px-5 md:px-0 py-10 grid gap-4 grid-cols-1">
                            <div className="animate-pulse bg-gray-200 rounded-lg h-10 md:h-30" />
                            <div className="animate-pulse bg-gray-200 rounded-lg h-20 md:h-40" />
                            <div className="animate-pulse bg-gray-200 rounded-lg h-20 md:h-40" />
                        </div>
                    )}

                    {/* Page Content */}
                    {!isLoading && pageContent && <div
                        className="single_page_content text-sm md:text-base"
                        dangerouslySetInnerHTML={{ __html: pageContent.replace("```html", "").replace("```", "") }}
                    />}
                </div>
            </div>
            <CommonFooter />
        </>
    );
}