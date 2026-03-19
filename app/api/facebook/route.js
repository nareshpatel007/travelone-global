import crypto from "crypto";

export async function POST(req) {
    try {
        // Parse the incoming request body
        const body = await req.json();

        // Validate environment variables
        const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
        const accessToken = process.env.META_ACCESS_TOKEN;

        // Fetch the Facebook Conversions API endpoint
        const response = await fetch(`https://graph.facebook.com/v23.0/${pixelId}/events?access_token=${accessToken}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    data: [
                        {
                            event_name: body.event_name,
                            event_time: Math.floor(Date.now() / 1000),
                            event_id: body.event_id,
                            action_source: "website",
                            user_data: {
                                client_user_agent: req.headers.get("user-agent"),
                                fbc: "fb.1.1554763741205.AbCdEfGhIjKlMnOpQrStUvWxYz1234567890",
                                fbp: "fb.1.1558571054389.1098115397"
                            },
                        },
                    ],
                }),
            }
        );

        // Check if the response is successful
        const result = await response.json();

        // Return the result
        return Response.json({ success: true, result });
    } catch (error) {
        // Return the result
        return Response.json({ success: false, error: error.message });
    }
}