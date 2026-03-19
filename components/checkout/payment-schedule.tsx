"use client"

import { formatPrice } from "@/lib/utils";

// Define props
interface Props {
    cartData: any;
}

export default function PaymentSchedule({ cartData }: Props) {
    // If cart data is not available, return null
    if (!cartData?.upcoming_payments) return null;

    return (
        <div className="rounded-sm border border-border bg-card p-6 space-y-4">
            <span className="text-lg font-semibold block">Next Payment Schedule</span>

            <div className="space-y-2">
                {cartData?.upcoming_payments.map((item: any, index: number) => (
                    <div key={index} className="rounded-lg bg-black/10 p-4 space-y-1">
                        <p className="text-sm text-muted-foreground">
                            {index == 0 && "Next Payment"}
                            {index > 0 && `Payment ${index + 1}`}
                        </p>
                        <div className="flex justify-between items-baseline">
                            <span className="text-lg font-semibold text-foreground">
                                {item?.format_pay_date}
                            </span>
                            <span className="text-xl font-bold text-primary">
                                ${formatPrice(item?.amount, 0)}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                Your payment will be processed securely. We accept all major credit and debit cards. Your transaction is
                protected with industry-standard encryption.
            </p>
        </div>
    )
}
