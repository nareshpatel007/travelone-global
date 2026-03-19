"use client";

import { formatDate, formatPrice } from "@/lib/utils";
import { CreditCard } from "lucide-react";
import Link from "next/link";

interface Props {
    orderData: any;
    paymentHistory: any[];
}

export default function PaymentsTab({ orderData, paymentHistory }: Props) {

    const totalAmount = paymentHistory?.reduce(
        (sum, p) => sum + Number(p.amount || 0),
        0
    );

    const paidAmount = paymentHistory?.reduce(
        (sum, p) => p.status === "paid" ? sum + Number(p.amount) : sum,
        0
    );

    const outstandingAmount = totalAmount - paidAmount;

    return (
        <div className="py-6 overflow-x-auto">
            <table className="w-full border border-[#d9cec1] text-sm md:text-base">
                <thead className="bg-white">
                    <tr>
                        <th className="border border-[#d9cec1] px-4 py-2 text-left">Due Date</th>
                        <th className="border border-[#d9cec1] px-4 py-2 text-center">Amount</th>
                        {orderData?.payment_type == 'part_payment' && <>
                            <th className="border border-[#d9cec1] px-4 py-2 text-center">Currency</th>
                            <th className="border border-[#d9cec1] px-4 py-2 text-center">Status</th>
                            <th className="border border-[#d9cec1] px-4 py-2 text-center">Action</th>
                        </>}
                    </tr>
                </thead>
                <tbody>
                    {paymentHistory.map((row, index) => (
                        <tr key={index} className="bg-white">
                            <td className="border border-[#d9cec1] px-4 py-2">
                                {formatDate(row.next_pay_date)}
                            </td>

                            <td className="border border-[#d9cec1] px-4 py-2 text-center">
                                ${formatPrice(row.amount)}
                            </td>

                            <td className="border border-[#d9cec1] px-4 py-2 text-center">
                                {row.currency || "USD"}
                            </td>

                            <td className="border border-[#d9cec1] px-4 py-2 text-center">
                                {row.status === "paid" && <span className="font-medium text-green-600">Paid</span>}
                                {row.status === "unpaid" && <span className="font-medium text-red-500">Unpaid</span>}
                                {row.status === "in_verification" && <span className="font-medium text-orange-500">In Verification</span>}
                            </td>

                            <td className="border border-[#d9cec1] px-4 py-2 text-center">
                                {/* {row.status === "paid" && (
                                    <button className="bg-black text-white border border-black px-5 py-0.5 rounded-sm hover:bg-white hover:text-black cursor-pointer">
                                        Payment Invoice
                                    </button>
                                )} */}
                                {row.status === "unpaid" && (
                                    <Link href={`/checkout/repayment/${orderData?.checkout_id}/${row?.id}`}>
                                        <button className="bg-black text-white border border-black px-5 py-0.5 rounded-sm hover:bg-white hover:text-black cursor-pointer">
                                            Make Payment
                                        </button>
                                    </Link>
                                )}
                            </td>
                        </tr>
                    ))}

                    {/* SUMMARY ROWS */}
                    <tr className="bg-white border border-[#d9cec1] font-medium text-sm md:text-base">
                        <td className="border border-[#d9cec1] px-4 py-2">Total To Be Paid</td>
                        <td className="border border-[#d9cec1] px-4 py-2 text-center text-green-600">
                            ${formatPrice(orderData?.payable_amount)}
                        </td>
                        {orderData?.payment_type == 'part_payment' && <>
                            <td className="border border-[#d9cec1] px-4 py-2 text-center"></td>
                            <td className="border border-[#d9cec1] px-4 py-2" />
                            <td className="border border-[#d9cec1] px-4 py-2" />
                        </>}
                    </tr>

                    <tr className="bg-white border border-[#d9cec1] font-medium text-sm md:text-base">
                        <td className="border border-[#d9cec1] px-4 py-2">Total Paid Till Date</td>
                        <td className="border border-[#d9cec1] px-4 py-2 text-center text-black">
                            ${orderData?.payment_type == 'full_payment' ? <>
                                {orderData?.status == 'COMPLETED' ? <>
                                    {formatPrice(orderData?.payable_amount)}
                                </> : <>
                                    {formatPrice(0)}
                                </>}
                            </> : <>
                                {formatPrice(orderData?.payable_amount - outstandingAmount)}
                            </>}
                        </td>
                        {orderData?.payment_type == 'part_payment' && <>
                            <td className="border border-[#d9cec1] px-4 py-2 text-center"></td>
                            <td className="border border-[#d9cec1] px-4 py-2" />
                            <td className="border border-[#d9cec1] px-4 py-2" />
                        </>}
                    </tr>

                    <tr className="bg-white border border-[#d9cec1] font-medium text-sm md:text-base">
                        <td className="border border-[#d9cec1] px-4 py-2">Total Outstanding</td>
                        <td className="border border-[#d9cec1] px-4 py-2 text-center text-red-600">
                            ${orderData?.payment_type == 'full_payment' ? <>
                                {orderData?.status == 'COMPLETED' ? <>
                                    {formatPrice(0)}
                                </> : <>
                                    {formatPrice(orderData?.payable_amount)}
                                </>}
                            </> : <>
                                {formatPrice(outstandingAmount)}
                            </>}
                        </td>
                        {orderData?.payment_type == 'part_payment' && <>
                            <td className="border border-[#d9cec1] px-4 py-2 text-center"></td>
                            <td className="border border-[#d9cec1] px-4 py-2" />
                            <td className="border border-[#d9cec1] px-4 py-2" />
                        </>}
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
