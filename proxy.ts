import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
    // Get real client IP from forwarded headers
    const forwardedFor = request.headers.get("x-forwarded-for");
    const realIp = request.headers.get("x-real-ip");

    // Get latest IP
    let ip = forwardedFor?.split(",")[0].trim() || realIp || "0.0.0.0";

    // Normalize IPv6 mapped IPv4
    if (ip.startsWith("::ffff:")) {
        ip = ip.replace("::ffff:", "");
    }

    // Create response
    const response = NextResponse.next();

    // Always update cookie with latest IP
    response.cookies.set("user_ip", ip, {
        path: "/",
        maxAge: 60 * 60 * 24 * 1, // 1 day
        httpOnly: true,
        secure: true,
        sameSite: "lax",
    });

    // Always update header with latest IP
    return response;
}