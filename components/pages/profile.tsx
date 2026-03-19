"use client";

import { useEffect, useState } from "react";
import CommonHeader from "@/components/header/common-header";
import CommonFooter from "@/components/footer/common-footer";
import { getLoginCookie, isLoggedIn } from "@/lib/auth";
import { User } from "lucide-react";
import ProfileSettings from "../account/profile";
import PageHeading from "../common/page-heading";

export default function UserProfilePage() {
    // Define state
    const [ready, setReady] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [profileData, setProfileData] = useState<any>({});

    useEffect(() => {
        requestAnimationFrame(() => {
            setReady(true);
        });
    }, []);

    // Init data
    useEffect(() => {
        const controller = new AbortController();
        const loadInitData = async () => {
            try {
                // Get login data
                const is_login_user = isLoggedIn();
                const user = getLoginCookie();

                // If non login and required cart ID
                if (!is_login_user) {
                    return;
                }

                // Fetch the data
                const response = await fetch("/api/auth/profile", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        user_id: user?.user_id
                    }),
                });

                // Parse the JSON response
                const data = await response.json();

                // Check response
                if (data?.status) {
                    setProfileData(data?.data ?? {});
                }
            } catch (error: any) {
                if (error.name !== "AbortError") {
                    console.error("Failed to fetch user data:", error);
                }
            } finally {
                setIsLoading(false);
            }
        };
        loadInitData();
        return () => controller.abort();
    }, []);

    return (
        <>
            {ready && <>
                <CommonHeader />

                <div className="max-w-7xl mx-auto px-5 md:px-0 py-6">
                    <PageHeading
                        main="Your Profile"
                        sub="Manage your account and update your profile information."
                    />

                    {/* Loader */}
                    {isLoading && (
                        <div className="grid grid-cols-1">
                            {Array.from({ length: 1 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="h-48 md:h-100 rounded-lg bg-gray-200 animate-pulse"
                                />
                            ))}
                        </div>
                    )}

                    {/* Data */}
                    {!isLoading && profileData && (
                        <ProfileSettings profileData={profileData} />
                    )}

                    {/* Empty state */}
                    {!isLoading && !profileData && (
                        <div className="mx-auto max-w-4xl py-20 text-center space-y-5">
                            <User
                                size={120}
                                className="mx-auto text-[#ef2853] opacity-15"
                            />
                            <h2 className="text-3xl font-medium text-black">
                                Your are not logged in
                            </h2>
                            <p className="text-base text-black max-w-2xl mx-auto">
                                Please log in to your account to view your profile.
                            </p>
                        </div>
                    )}
                </div>

                <CommonFooter />
            </>}
        </>
    );
}
