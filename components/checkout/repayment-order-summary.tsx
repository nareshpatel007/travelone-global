"use client"

import { formatDate, formatPrice } from "@/lib/utils";

// Define props
interface Props {
    orderData: any;
    paymentData: any;
    walletAmount: any;
    stripeHandlingFee: number;
    finalAmount: number;
}

export default function RepaymentOrderSummary({ orderData, paymentData, walletAmount, stripeHandlingFee, finalAmount }: Props) {
    return (
        <div className="rounded-sm border border-border bg-card p-4 md:p-6 space-y-4">
            <span className="block text-xl font-semibold text-foreground">Order Summary</span>
            <div className="space-y-4">
                <div className="space-y-2 border-b border-border pb-4">
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground text-base">Payment No.</span>
                        <span className="font-medium text-foreground text-base">
                            {paymentData?.payment_no == 1 && "1st Payment"}
                            {paymentData?.payment_no == 2 && "2nd Payment"}
                            {paymentData?.payment_no == 3 && "3rd Payment"}
                            {paymentData?.payment_no > 3 && `${paymentData?.payment_no}th Payment`}
                        </span>
                    </div>
                </div>

                <div className="flex justify-between">
                    <span className="text-base font-semibold text-foreground">Due Date</span>
                    <span className="text-xl font-bold text-black">
                        {formatDate(paymentData?.next_pay_date)}
                    </span>
                </div>
                
                <div className="flex justify-between">
                    <span className="text-base font-semibold text-foreground">Due Amount</span>
                    <span className="text-xl font-bold text-black">
                        ${formatPrice(paymentData?.amount, 0)}
                    </span>
                </div>

                {walletAmount != "" && <div className="flex justify-between">
                    <span className="text-base font-semibold text-foreground">Wallet Amount</span>
                    <span className="text-xl font-bold text-black">
                        ${formatPrice(walletAmount, 0)}
                    </span>
                </div>}

                <div className="bg-amber-50 border border-amber-300 rounded-lg py-3 text-center space-y-2">
                    <p className="text-sm md:text-base text-muted-foreground">
                        Your Final Payment
                    </p>
                    <p className="text-2xl font-bold text-black">
                        ${formatPrice(finalAmount, 0)}
                    </p>
                </div>
            </div>
        </div>
    )
}
