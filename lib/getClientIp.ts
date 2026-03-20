"use server";

import { cookies } from "next/headers";

export async function getClientIp(): Promise<string | null> {
    const cookieStore = await cookies();
    const ip = cookieStore.get("user_ip")?.value;
    return ip || null;
}

export async function getUserIp(): Promise<string | null> {
    const cookieStore = await cookies();
    return cookieStore.get("user_ip")?.value ?? null;
}