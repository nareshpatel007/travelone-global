import { NextRequest, NextResponse } from "next/server";

const ALLOWED_ORIGIN = process.env.SITE_URL || "https://traveloneglobal.com";
const API_TOKEN = "1sa2a5gfd1f2g12asd4asd1a2sf5sdf";

export async function handleApiProxy(
    req: NextRequest,
    endpoint: string,
    method: string = "POST"
) {
    try {
        // Validate origin
        const origin = req.headers.get("origin");
        const referer = req.headers.get("referer");

        const isValidOrigin =
            origin === ALLOWED_ORIGIN ||
            (referer && referer.startsWith(ALLOWED_ORIGIN));

        if (!isValidOrigin) {
            return NextResponse.json(
                { success: false, message: "Unauthorized token" },
                { status: 403 }
            );
        }

        // Parse body safely
        const body = await req.json().catch(() => ({}));

        // Call backend API
        const apiRes = await fetch(`${process.env.API_URL}${endpoint}`, {
            method,
            headers: {
                "Content-Type": "application/json",
                "Requested-Domain": ALLOWED_ORIGIN,
                "Authorization": `Bearer ${API_TOKEN}`
            },
            body: JSON.stringify(body),
        });

        const text = await apiRes.text();

        return new NextResponse(text, {
            status: apiRes.status,
            headers: {
                "Content-Type":
                    apiRes.headers.get("content-type") || "application/json",
            },
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Internal Server Error" },
            { status: 500 }
        );
    }
}