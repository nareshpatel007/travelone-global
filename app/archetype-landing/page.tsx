"use client";

import ArchetypeLanding from "@/components/pages/archetype-landing";

export default function Page() {
    // Get query parms
    const type = getQuery("type", "");
    const country = getQuery("country", "");

    return (
        <ArchetypeLanding type={type} country={country} />
    );
}

// Get query
export const getQuery = (key: string, fallback = "") =>
    typeof window === "undefined"
        ? fallback
        : new URLSearchParams(window.location.search).get(key) ?? fallback;