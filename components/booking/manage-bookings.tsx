"use client"

import { useState } from "react";
import { Calendar, MapPin, Search, Printer, X, AlertCircle, ArrowRight, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { formatDate, formatPrice } from "@/lib/utils";

// Define booking status
type BookingStatus = "upcoming" | "on_hold" | "completed" | "cancelled";

// Define interface
interface Props {
    bookingData: any;
}

export function ManageBookings({ bookingData }: Props) {
    // Define state
    const [activeTab, setActiveTab] = useState<"all" | BookingStatus>("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    // Filter bookings
    const filteredBookings = bookingData.filter((booking: any) => {
        const matchesTab = activeTab === "all" || booking.status === activeTab;
        const matchesSearch = booking.booking_ref_no.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTab && matchesSearch;
    })

    // Tabs
    const tabs = [
        { id: "all" as const, label: "All Bookings", count: bookingData.length },
        { id: "upcoming" as const, label: "Upcoming", count: bookingData.filter((b: any) => b.status === "PROCESSING").length },
        { id: "on_hold" as const, label: "On Hold", count: bookingData.filter((b: any) => b.status === "ON_HOLD").length },
        { id: "completed" as const, label: "Completed", count: bookingData.filter((b: any) => b.status === "COMPLETED").length },
        { id: "cancelled" as const, label: "Cancelled", count: bookingData.filter((b: any) => b.status === "CANCELLED").length },
    ]

    return (
        <div className="space-y-6">
            {/* Search */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search booking reference number..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-sm text-sm md:text-base"
                    />
                </div>
            </div>

            {/* Tabs */}
            {/* <div className="flex gap-2 overflow-x-auto">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-4 py-2 rounded-sm text-sm font-medium whitespace-nowrap border border-black transition-colors cursor-pointer ${activeTab === tab.id
                            ? "bg-black text-white"
                            : "bg-white text-black border-black/50 hover:bg-black hover:text-white"
                            }`}
                    >
                        {tab.label} ({tab.count})
                    </button>
                ))}
            </div> */}

            {/* Bookings List */}
            {filteredBookings.length > 0 ? (
                <div className="space-y-5">
                    {filteredBookings.map((booking: any, index: number) => {
                        const status = booking.status;
                        const StatusIcon = status.icon;

                        // Json parse
                        const tourInfo = JSON.parse(booking.tour_info || "[]");
                        const tourSummary = JSON.parse(tourInfo?.tour_sub_title || "[]");

                        return (
                            <div
                                key={index}
                                className={`bg-white border border-gray-200 hover:bg-gray-50 rounded-sm overflow-hidden ${booking.status === "CANCELLED" ? "opacity-75" : ""}`}
                            >
                                <div className="p-0 md:p-5">
                                    <div className="flex flex-col md:flex-row gap-0 md:gap-4">
                                        <div className="flex-shrink-0 relative w-full h-[160px] md:w-[150px] md:h-auto">
                                            <Link href={`my_bookings/${booking.checkout_id}`}>
                                                <Image
                                                    src={tourInfo?.featured_image || "/placeholder.svg"}
                                                    alt={tourInfo?.tour_name || "Placeholder"}
                                                    fill
                                                    draggable={false}
                                                    className="object-cover rounded-sm"
                                                    sizes="(max-width: 640px) 96px, (max-width: 768px) 120px, (max-width: 1024px) 150px, 200px"
                                                />
                                            </Link>
                                        </div>
                                        <div className="flex-1 min-w-0 p-4 md:p-0 space-y-2 md:space-y-4">
                                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 mb-3">
                                                <div className="space-y-2">
                                                    <Link href={`my_bookings/${booking.checkout_id}`}>
                                                        <span className="font-semibold text-black text-md md:text-lg block hover:underline">
                                                            {tourInfo?.tour_name}
                                                        </span>
                                                    </Link>
                                                </div>
                                                <div className="hidden md:block text-right">
                                                    <span className="font-semibold text-gray-900 text-sm md:text-base">
                                                        Booking Amount: ${formatPrice(booking?.payable_amount, 0)}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="block md:hidden">
                                                <span className="font-semibold text-gray-900 text-sm md:text-base">
                                                    Booking Amount: ${formatPrice(booking?.payable_amount, 0)}
                                                </span>
                                            </div>
                                            <div className="grid grid-cols-1 text-sm text-black space-y-3">
                                                <div className="flex items-center gap-2 text-sm md:text-base">
                                                    {tourSummary.map((item: string, index: number) => (
                                                        <span key={index} className="flex items-center gap-1">
                                                            {item.replace("Places", "Locations")}
                                                            {index < tourSummary.length - 1 && (
                                                                <ArrowRight className="h-4 w-4" />
                                                            )}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-1 text-sm text-black space-y-3">
                                                <div className="flex items-center gap-2 text-sm md:text-base">
                                                    <Calendar className="w-4 h-4 text-black" />
                                                    Travel Date: <span>{formatDate(booking.travel_date)}</span>
                                                </div>
                                                <div className="text-black text-sm md:text-base">
                                                    Booking Number: <span className="font-medium">#{booking.booking_ref_no}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            ) : (
                <div className="bg-white border border-gray-200 rounded-sm p-12 text-center space-y-5">
                    <div className="space-y-2">
                        <AlertCircle className="w-12 h-12 text-gray-300 mx-auto" />
                        <h3 className="text-lg font-medium text-black">
                            {searchQuery ? "No results found" : "No bookings found"}
                        </h3>
                        <p className="text-gray-500">
                            {searchQuery ? "Try adjusting your search terms." : "You don't have any bookings in this category yet."}
                        </p>
                    </div>
                    <Link
                        href="/country"
                        className="inline-flex items-center px-6 py-2 bg-black text-white border border-black rounded-sm font-medium hover:bg-white hover:text-black cursor-pointer transition-colors"
                    >
                        Explore Destinations
                    </Link>
                </div>
            )}

            {/* Need help */}
            {filteredBookings.length !== 0 && (
                <div className="bg-[#FFF9EE] border border-amber-300 rounded-sm p-5">
                    <div className="flex gap-4">
                        <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0" />
                        <div className="space-y-1">
                            <span className="font-semibold text-black block">Need help with a booking?</span>
                            <span className="!text-sm text-black">
                                If you have any questions or need assistance with your bookings, visit our{" "}
                                <Link href="/contact" className="text-black underline font-medium">
                                    help center
                                </Link>{" "}
                                or contact our customer support team.
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
