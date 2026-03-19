"use client"

import { formatDate, formatPrice } from "@/lib/utils";
import { ArrowRight, Loader2 } from "lucide-react";
import Image from "next/image";

// Define props
type Props = {
    walletNotes: any;
}

export function WalletNotesTab({ walletNotes }: Props) {
    // If data empty, return null
    if (!walletNotes) return null;

    return (
        <div className="py-5 md:py-7">
            <div className="overflow-x-auto">
                <table className="w-full border border-[#d9cec1] text-base text-black">
                    <thead>
                        <tr className="bg-white border-b border-[#d9cec1]">
                            <th className="border border-[#d9cec1] px-4 py-3 font-semibold text-sm md:text-base">Type</th>
                            <th className="border border-[#d9cec1] px-4 py-3 font-semibold text-sm md:text-base">Amount (USD)</th>
                            <th className="border border-[#d9cec1] px-4 py-3 font-semibold text-sm md:text-base">Description</th>
                            <th className="border border-[#d9cec1] px-4 py-3 font-semibold text-sm md:text-base">Status</th>
                            <th className="border border-[#d9cec1] px-4 py-3 font-semibold text-sm md:text-base">Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {walletNotes.length > 0 ? <>
                            {walletNotes.map((note: any, index: number) => (
                                <tr key={index} className="bg-white text-center">
                                    <td className="border border-[#d9cec1] px-4 py-3 font-normal text-sm md:text-base">
                                        {note?.type == 'credit' && "Credit"}
                                        {note?.type == 'debit' && "Debit"}
                                    </td>
                                    <td className="border border-[#d9cec1] px-4 py-3 font-normal text-sm md:text-base">
                                        ${formatPrice(note.amount)}
                                    </td>
                                    <td className="border border-[#d9cec1] px-4 py-3 font-normal text-sm md:text-base">
                                        {note.description}
                                    </td>
                                    <td className="border border-[#d9cec1] px-4 py-3 font-normal text-sm md:text-base">
                                        {note.status === "unpaid" && <span className="text-red-500">Unsettled</span>}
                                        {note.status === "paid" && <span className="text-green-700">Settled</span>}
                                    </td>
                                    <td className="border border-[#d9cec1] px-4 py-3 font-normal text-sm md:text-base">
                                        {formatDate(note.created_at)}
                                    </td>
                                </tr>
                            ))}
                        </> : <>
                            <tr className="bg-white text-center">
                                <td className="border border-[#d9cec1] px-4 py-3 font-medium text-sm md:text-base text-red-500" colSpan={5}>
                                    No entries found.
                                </td>
                            </tr>
                        </>}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
