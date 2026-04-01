'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

// Define Props
interface Props {
    isStickyShow?: boolean
}

// Define constants
const COOKIE_KEY = 'travelone_cookie';
const ONE_YEAR = 365 * 24 * 60 * 60 * 1000;

export default function CookieConsent({ isStickyShow = false }: Props) {
    // Define state
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem(COOKIE_KEY);

        if (!stored) {
            setVisible(true);
            return;
        }

        const parsed = JSON.parse(stored);
        const now = new Date().getTime();

        if (now > parsed.expiry) {
            setVisible(true);
        }
    }, []);

    // Handle cookie consent
    const handleAccept = () => {
        // Set cookie
        const expiryDate = new Date().getTime() + ONE_YEAR;

        // Save to local storage
        localStorage.setItem(
            COOKIE_KEY,
            JSON.stringify({
                accepted: true,
                expiry: expiryDate,
            })
        );

        // Close consent
        setVisible(false);
    };

    // Handle cookie consent
    const handleReject = () => {
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <div className={`fixed z-50 p-2 md:p-0 ${isStickyShow ? 'bottom-2 md:bottom-20' : 'bottom-0 md:bottom-6'} left-0 w-full md:right-6 md:left-auto md:w-[420px] animate-slideUp`}>
            <div className="bg-white shadow-2xl rounded md:rounded-xl p-5 md:p-6 border border-black">
                <div className="flex justify-between items-start">
                    <h2 className="text-base md:text-lg font-semibold text-gray-800">
                        We use cookies 🍪
                    </h2>
                </div>

                <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                    We use cookies to improve your experience, analyze traffic, and personalize content. By clicking “Accept”, you agree to our use of cookies. Read our <Link target='_blank' href="/legal/cookie-policy" className="underline text-gray-800">Cookie Policy</Link> for more information.
                </p>

                <div className="flex gap-3 mt-5 justify-end">
                    <button
                        onClick={handleReject}
                        className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-100 transition cursor-pointer"
                    >
                        Reject
                    </button>

                    <button
                        onClick={handleAccept}
                        className="px-6 py-2 text-sm bg-black text-white rounded hover:bg-gray-900 transition cursor-pointer"
                    >
                        Accept All
                    </button>
                </div>
            </div>
        </div>
    );
}