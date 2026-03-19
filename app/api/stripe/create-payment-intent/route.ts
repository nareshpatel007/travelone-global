import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-12-15.clover"
});

export async function POST(req: Request) {
    // Get body data
    const body = await req.json();

    try {
        // Create payment intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: body.amount,
            currency: "usd",
            automatic_payment_methods: {
                enabled: true
            },
            metadata: {
                cart_id: body.cart_id,
                user_email: body.email
            },
        });

        return NextResponse.json({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (err: any) {
        return NextResponse.json(
            { error: err.message },
            { status: 500 }
        );
    }
}
