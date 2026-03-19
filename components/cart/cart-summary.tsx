import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/utils";
import Link from "next/link";

interface Props {
    cartData: any;
}

export function CartSummary({ cartData }: Props) {
    // Define button staus
    const show_btn_flag = cartData?.part_payment != cartData?.full_payment ? 'part_payment' : 'full_payment';

    return (
        <div className="space-y-4">
            <div className="rounded-sm border border-border bg-card p-5 md:p-6 space-y-4">
                <span className="block text-xl font-semibold text-foreground">Order Summary</span>
                <div className="space-y-4">
                    <div className="space-y-2 border-b border-border pb-4">
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground text-base">Sub Total</span>
                            <span className="font-medium text-foreground text-base">
                                ${formatPrice(cartData?.sub_total, 0)}
                            </span>
                        </div>
                        {/* <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Tax (10%)</span>
                        <span className="font-medium text-foreground">
                            ${tax.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                        </span>
                    </div> */}
                    </div>
                    <div className="flex justify-between">
                        <span className="text-base font-semibold text-foreground">Total</span>
                        <span className="text-xl font-bold text-black">
                            ${formatPrice(cartData?.full_payment, 0)}
                        </span>
                    </div>
                    <p className="text-base">✓ All taxes and fees included</p>
                    <div className="flex flex-col space-y-2">
                        {show_btn_flag == "part_payment" && <Link href="/checkout?type=part_payment">
                            <button
                                type="button"
                                className="w-full bg-black text-white text-sm py-1.5 border border-black rounded-sm font-medium cursor-pointer"
                            >
                                Pay Now (${formatPrice(cartData?.part_payment, 0)}) & Reserve
                            </button>
                        </Link>}

                        <Link href="/checkout?type=full_payment">
                            <button
                                type="button"
                                className={`w-full ${show_btn_flag == "full_payment" ? "bg-black text-white hover:bg-black/90" : "bg-white text-black hover:bg-black/90 hover:text-white"}  text-sm py-1.5 border border-black rounded-sm font-medium cursor-pointer`}
                            >
                                Pay Full (${formatPrice(cartData?.full_payment, 0)})
                            </button>
                        </Link>

                        <Link href={`/tour/${cartData?.cart?.tour_info?.slug}`}>
                            <button
                                type="button"
                                className="w-full bg-black/10 text-black text-sm py-1.5 border border-black rounded-sm hover:bg-black/90 hover:text-white font-medium cursor-pointer"
                            >
                                Go Back
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            {cartData?.upcoming_payments && <div className="rounded-sm border border-border bg-card p-5 md:p-6 space-y-4">
                <span className="text-lg font-semibold block">Next Payment Schedule</span>

                <div className="space-y-2">
                    {cartData?.upcoming_payments.map((item: any, index: number) => (
                        <div key={index} className="rounded-sm bg-black/10 p-4 space-y-1">
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
            </div>}

            {/* <div className="rounded-sm border border-border bg-card p-6">
                <span className="block mb-4 text-lg font-semibold text-black">Have a coupon code?</span>
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        placeholder="Enter coupon code"
                        className="rounded-sm border m-0 border-border bg-background px-4 py-1.5 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-black/20"
                    />
                    <Button className="bg-black text-white hover:bg-black/90 cursor-pointer">Apply</Button>
                </div>
            </div> */}
        </div>
    )
}
