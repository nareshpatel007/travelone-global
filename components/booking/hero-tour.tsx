"use client"

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Download, File, Loader2, MessageSquare, MoveRight } from "lucide-react";
import 'react-loading-skeleton/dist/skeleton.css';
import { formatDate, helperCovertJsonParse } from "@/lib/utils";
import Link from "next/link";
import { getLoginCookie } from "@/lib/auth";

// Define props
interface Props {
    orderData: any;
    tour: any;
    cartData: any;
}

export default function HeroTour({ orderData, tour, cartData }: Props) {
    // Define state
    const [loading, setLoading] = useState(false);
    const [downloadAction, setDownloadAction] = useState('itinerary');
    const [errors, setErrors] = useState<string>("");
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Get user data
    const loginUser = getLoginCookie();

    // Convert into json
    const tourImages = helperCovertJsonParse(tour?.media_gallery);

    // Total images
    const totalImages = tourImages?.sightseeing?.length || 0;

    // Next image
    const nextImage = () => {
        setCurrentImageIndex((prev) =>
            prev === totalImages - 1 ? 0 : prev + 1
        );
    };

    // Previous image
    const prevImage = () => {
        setCurrentImageIndex((prev) =>
            prev === 0 ? totalImages - 1 : prev - 1
        );
    };

    // Convert json parse
    const tourSummary = tour?.tour_sub_title ? JSON.parse(tour.tour_sub_title) : [];

    // Handle download itinerary
    const handleDownload = async (action: string) => {
        // Open new tab
        const newTab = window.open("", "_blank");

        try {
            // Set loading
            setLoading(true);

            // Call API
            const res = await fetch(`/api/bookings/download/${action}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    checkout_id: orderData?.checkout_id
                })
            });

            // Parse the JSON response
            const data = await res.json();

            // Check response
            if (data?.status && data?.data) {
                newTab!.location.href = data.data; // 👈 LOAD PDF
            } else {
                newTab?.close();
                setErrors(data?.message || "PDF not available");
            }
        } catch (error) {
            newTab?.close();
            setErrors("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="w-full bg-white">
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 items-stretch">
                    <div className="relative overflow-hidden w-full h-[220px] md:h-[500px]">
                        <div
                            className="flex h-full transition-transform duration-700 ease-in-out"
                            style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
                        >
                            {tourImages?.sightseeing && tourImages?.sightseeing?.map((img: string, index: number) => (
                                <div key={index} className="relative min-w-full h-full">
                                    <Image
                                        src={img || "/placeholder-500x500.svg"}
                                        alt={`Tour Image ${index + 1}`}
                                        fill
                                        priority={index === 0}
                                        sizes="(min-width: 1024px) 50vw, 100vw"
                                        className="object-cover object-center"
                                    />
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={prevImage}
                            className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 cursor-pointer rounded-full"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button
                            onClick={nextImage}
                            className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 cursor-pointer rounded-full"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>
                    <div className="flex flex-col h-full">
                        <div className="bg-[#FFF9EE] text-white p-5 md:p-6 border-b border-[#d9cec1]">
                            <div className="max-w-7xl mx-auto">
                                <div className="flex items-start justify-between">
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <span className="text-black text-xl md:text-2xl leading-tight font-medium">
                                                {tour?.tour_name}
                                            </span>
                                        </div>

                                        <p className="text-sm md:text-base text-black">
                                            {tourSummary && tourSummary?.join(" → ")}
                                        </p>

                                        <p className="flex items-center gap-2 text-sm md:text-base font-medium text-red-500">
                                            Booking Reference <MoveRight size={16} /> #{orderData?.booking_ref_no}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-[#FFF9EE]/50 p-5 md:p-6 flex-1 border-b border-[#d9cec1] space-y-8">
                            <div className="space-y-2 text-sm md:text-base">
                                <p className="font-medium text-black">
                                    Booking for {`${orderData?.customer_prefix.replace(".", "")}. ${orderData?.customer_fname} ${orderData?.customer_lname}`} X {cartData?.total_travelers} Traveller{`${cartData?.total_travelers > 1 ? "s" : ""}`}
                                </p>
                                <p className="text-black">
                                    Travel Date:
                                    <span className="text-red-500 font-semibold">
                                        {` ${formatDate(cartData?.booking_date)}`}
                                    </span>
                                </p>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full border border-[#d9cec1] border-collapse text-sm sm:text-base">
                                    <thead>
                                        <tr className="border-b border-[#d9cec1]">
                                            <th className="bg-white font-medium border border-[#d9cec1] px-3 py-2 text-left">Room</th>
                                            <th className="bg-white font-medium border border-[#d9cec1] px-3 py-2 text-left">Bedding</th>
                                            <th className="bg-white font-medium border border-[#d9cec1] px-3 py-2 text-left">Traveler Type / Count</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartData?.room_data && cartData?.room_data.map((room: any, roomIndex: number) => (
                                            <tr key={roomIndex} className="border border-[#d9cec1] text-sm sm:text-base">
                                                <td className="bg-white font-normal border border-[#d9cec1] px-3 py-2">
                                                    Room {roomIndex + 1}
                                                </td>
                                                <td className="bg-white font-normal border border-[#d9cec1] px-3 py-2">
                                                    {room?.bedding_preference == 'double' && "Double"}
                                                    {room?.bedding_preference == 'single' && "Single"}
                                                    {room?.bedding_preference == 'twin' && "Twin"}
                                                    {room?.bedding_preference == 'two_queen_bed' && "Two Queen Bed"}
                                                </td>
                                                <td className="bg-white font-normal border border-[#d9cec1] px-3 py-2 space-y-1">
                                                    {room?.adults > 0 && <span className="block">Adults: {room?.adults}</span>}
                                                    {room?.child_8_12 > 0 && <span className="block">Child (8-12): {room?.child_8_12}</span>}
                                                    {room?.child_3_7 > 0 && <span className="block">Child (3-7): {room?.child_3_7}</span>}
                                                    {room?.infant > 0 && <span className="block">Infant: {room?.infant}</span>}
                                                    {room?.extra_adult > 0 && <span className="block">Extra Adult: 1</span>}
                                                    {room?.extra_crib > 0 && <span className="block">Extra Adult: 1</span>}
                                                    {room?.single_supplement > 0 && <span className="block">Single Supplement: {room?.single_supplement}</span>}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="flex flex-wrap gap-4">
                                <button
                                    onClick={() => {
                                        setDownloadAction('itinerary');
                                        handleDownload('itinerary');
                                    }}
                                    disabled={loading && downloadAction === 'itinerary'}
                                    className="flex items-center gap-2 bg-[#ef2853] border-1 border-[#ef2853] hover:bg-white hover:text-[#ef2853] text-white px-4 py-2 rounded font-semibold text-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading && downloadAction === 'itinerary' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                                    Download Itinerary
                                </button>

                                <button
                                    onClick={() => {
                                        setDownloadAction('invoice');
                                        handleDownload('invoice');
                                    }}
                                    disabled={loading && downloadAction === 'invoice'}
                                    className="flex items-center gap-2 bg-white border-1 border-black text-black hover:bg-black hover:text-white hover:border-[#333] cursor-pointer px-4 py-2 rounded font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading && downloadAction === 'invoice' ? <Loader2 className="w-4 h-4 animate-spin" /> : <File className="w-4 h-4" />}
                                    Download Invoice
                                </button>

                                <Link href={`https://message.travelone.io/?token=${loginUser?.token}&booking=${orderData?.booking_ref_no}`} target="_blank">
                                    <button className="flex items-center gap-2 bg-white border-1 border-black text-black hover:bg-black hover:text-white hover:border-[#333] cursor-pointer px-4 py-2 rounded font-semibold text-sm">
                                        <MessageSquare className="w-4 h-4" />
                                        Chat
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
