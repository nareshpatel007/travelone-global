import { NextRequest, NextResponse } from "next/server";

const ALLOWED_ORIGIN = "https://travelone.io";

export async function POST(req: NextRequest) {
    try {
        // Get origin or referer
        const origin = req.headers.get("origin");
        const referer = req.headers.get("referer");

        // Check if origin or referer is allowed
        const isValidOrigin = origin === ALLOWED_ORIGIN || (referer && referer.startsWith(ALLOWED_ORIGIN));

        // Block unauthorized domain
        if (!isValidOrigin) {
            return NextResponse.json(
                { success: false, message: "Unauthorized domain" },
                { status: 403 }
            );
        }

        // Parse body safely
        const body = await req.json().catch(() => ({}));

        // API call
        const apiRes = await fetch(`${process.env.API_URL}auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Requested-Domain": ALLOWED_ORIGIN,
            },
            body: JSON.stringify(body),
        });

        // Handle response safely
        const text = await apiRes.text();

        // Return response
        return new NextResponse(text, {
            status: apiRes.status,
            headers: {
                "Content-Type":
                    apiRes.headers.get("content-type") || "application/json",
            },
        });
    } catch (error) {
        // Handle error
        return NextResponse.json(
            { success: false, message: "Internal Server Error" },
            { status: 500 }
        );
    }
}