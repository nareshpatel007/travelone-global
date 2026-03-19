"use client"

import { formatPrice } from "@/lib/utils";

// Define props
interface Props {
    paymentType: string;
    cartData: any;
}

export default function OrderSummary({ paymentType, cartData }: Props) {
    return (
        <div className="rounded-sm border border-border bg-card p-6 space-y-4">
            <span className="block text-xl font-semibold text-foreground">Order Summary</span>
            <div className="space-y-4">
                <div className="space-y-2 border-b border-border pb-4">
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground text-base">Sub Total</span>
                        <span className="font-medium text-foreground text-base">
                            ${formatPrice(cartData?.sub_total, 0)}
                        </span>
                    </div>
                </div>
                <div className="flex justify-between">
                    <span className="text-base font-semibold text-foreground">Total</span>
                    <span className="text-xl font-bold text-black">
                        ${formatPrice(cartData?.full_payment, 0)}
                    </span>
                </div>

                <p className="text-base">✓ All taxes and fees included</p>

                <div className="bg-amber-50 border border-amber-300 rounded-lg py-3 text-center space-y-2">
                    <p className="text-base text-muted-foreground">
                        You have selected {paymentType === "part_payment" ? "Part Payment" : "Full Payment"}
                    </p>
                    <p className="text-2xl font-bold text-black">
                        ${paymentType === "part_payment" ? formatPrice(cartData?.part_payment, 0) : formatPrice(cartData?.full_payment, 0)}
                    </p>
                </div>
            </div>
        </div>
    )
}
