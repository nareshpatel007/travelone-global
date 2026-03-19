"use client";

import { formatDate, formatPrice } from "@/lib/utils";
import { Trash2, ArrowRight, CalendarCheck, Building } from "lucide-react";
import Image from "next/image";

interface Props {
    cartData: any;
}

// Define traveler labels
const travelerLabels: Record<string, string> = {
    adults: "Adults",
    child_8_12: "Child (Age 8–12)",
    child_3_7: "Child (Age 3–7)",
    infant: "Infant",
    extra_adult: "Extra Adult",
    extra_child: "Extra Child",
    single_supplement: "Single Supplement",
};

export function CartItem({ cartData }: Props) {
    // Parse tour summary
    const tourSummary = JSON.parse(
        cartData?.cart?.tour_info?.tour_sub_title || "[]"
    );

    return (
        <div className="rounded-md border border-black bg-white overflow-hidden">
            <div className="grid grid-cols-1 md:gap-5 p-0 md:p-6 sm:grid-cols-[180px_1fr] md:grid-cols-[220px_1fr]">
                <div className="relative h-48 md:h-full md:min-h-[160px] rounded-sm overflow-hidden bg-gray-200">
                    <Image
                        src={cartData?.cart?.tour_info?.featured_image || "/placeholder.svg"}
                        alt={cartData?.cart?.tour_info?.tour_name || "Image"}
                        fill
                        draggable={false}
                        className="object-cover"
                        priority
                    />
                </div>
                <div className="flex flex-col p-5 md:p-0 justify-between space-y-3">
                    <h2 className="text-lg sm:text-xl font-semibold text-black">
                        {cartData?.cart?.tour_info?.tour_name}
                    </h2>
                    <div className="space-y-2 text-sm text-black">
                        <p className="flex flex-wrap items-center gap-1">
                            {tourSummary.map((item: string, index: number) => (
                                <span key={index} className="flex items-center gap-1">
                                    {item.replace("Places", "Locations")}
                                    {index < tourSummary.length - 1 && (
                                        <ArrowRight className="h-4 w-4" />
                                    )}
                                </span>
                            ))}
                        </p>
                        <div className="flex items-center gap-2">
                            <span>
                                <CalendarCheck className="h-4 w-4" />
                            </span>
                            <span className="text-sm">Travel date: {formatDate(cartData?.cart?.booking_date)}</span>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full border border-black rounded-sm text-base text-black">
                            <thead>
                                <tr className="border border-black text-center md:font-medium">
                                    <th className="px-3 py-2 text-sm md:text-base border border-black"></th>
                                    <th className="px-3 py-2 text-sm md:text-base border border-black">Count</th>
                                    <th className="px-3 py-2 text-sm md:text-base border border-black">Per Person</th>
                                    <th className="px-3 py-2 text-sm md:text-base">Total ($)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartData?.travelers && Object.entries(cartData.travelers).filter(([_, value]: any) => value.count > 0).map(([key, value]: any) => (
                                    <tr
                                        key={key}
                                        className="text-center border border-black"
                                    >
                                        <td className="px-3 py-2 text-sm border border-black text-left font-medium">
                                            {travelerLabels[key] ?? key}
                                        </td>

                                        <td className="px-3 py-2 text-sm border border-black">
                                            {value.count}
                                        </td>

                                        <td className="px-3 py-2 text-sm border border-black">
                                            ${value.per_price.toLocaleString()}
                                        </td>

                                        <td className="px-3 py-2 text-sm font-semibold">
                                            ${value.total_price.toLocaleString()}
                                        </td>
                                    </tr>
                                ))}

                                <tr>
                                    <td
                                        colSpan={3}
                                        className="px-3 py-2 text-sm text-right font-medium border border-black"
                                    >
                                        Total Amount
                                    </td>
                                    <td className="px-3 py-2 text-sm text-red-600 font-semibold text-center">
                                        ${formatPrice(cartData?.sub_total, 0)}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}