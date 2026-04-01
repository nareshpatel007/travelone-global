import { handleApiProxy } from "@/lib/apiProxy";
import { NextRequest } from "next/server"

export async function POST(req: NextRequest) {
    return handleApiProxy(req, "plan_your_trip/persona-result/rating");
}