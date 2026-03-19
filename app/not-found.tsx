"use client";

import Link from "next/link";
import { Search, Home, MapPin, Compass } from "lucide-react";
import CommonFooter from "@/components/footer/common-footer";
import CommonHeader from "@/components/header/common-header";
import { useEffect, useState } from "react";
import NotFoundError from "@/components/common/not-found-error";

export default function NotFound() {
    // Define state
    const [ready, setReady] = useState(false);

    useEffect(() => {
        requestAnimationFrame(() => {
            setReady(true);
        });
    }, []);

    return (
        <>
            {ready && <>
                <div className="min-h-screen bg-white">
                    <CommonHeader />
                    <NotFoundError />
                    <CommonFooter />
                </div>
            </>}
        </>
    )
}
