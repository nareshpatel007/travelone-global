"use client"

import { useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle, Loader2, Plus, X } from "lucide-react";
import { formatDate } from "@/lib/utils";
import QuestionHeading from "@/components/plan_your_trip/common/questionHeading";
import { addCartData, getLoginCookie, isLoggedIn } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { getClientIp } from "@/lib/getClientIp";
import nationalityList from "@/lib/nationality";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

interface Props {
    tour: any;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

// Define room type
type Room = {
    id: number;
    bedding_preference: string | null;
    adults: number;
    child_8_12: number;
    child_3_7: number;
    infant: number;
    extra_adult: boolean;
    extra_child: boolean;
    extra_crib: boolean;
    single_supplement: number;
};

// Define bedding preferences
const BEDDING_PREFERENCES = [
    { label: "Double", value: "double" },
    { label: "Twin", value: "twin" },
    { label: "Single", value: "single" },
    { label: "Two Queen Bed", value: "two_queen_bed" }
];

// Define traveller type
const TRAVELLER_TYPES = [
    { label: "Adults", field: "adults", age: "Ages 12 or above" },
    { label: "Child", field: "child_8_12", age: "Ages 8-12" },
    { label: "Child", field: "child_3_7", age: "Ages 3-7" },
    { label: "Infant", field: "infant", age: "Ages 0-2" },
];

// Define room limits
const ROOM_LIMITS: any = {
    adults: 3,
    child_8_12: 1,
    child_3_7: 1,
    infant: 1,
};

export function QuoteBrochure({ tour, open, onOpenChange }: Props) {
    // Define route
    const router = useRouter();

    // Define nationality
    const nationality = nationalityList();

    // Define state
    const [currentStep, setCurrentStep] = useState(1);
    const [errors, setErrors] = useState<string>("");
    const [isFormLoading, setIsFormLoading] = useState<boolean>(false);
    const [userName, setUserName] = useState<string>("");
    const [userEmail, setUserEmail] = useState<string>("");
    const [userPhone, setUserPhone] = useState<string>("");
    const [selectedNationality, setSelectedNationality] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<string>("");
    const [availableSeats, setAvailableSeats] = useState<number>(0);
    const [activeRoomIndex, setActiveRoomIndex] = useState(0);
    const [rooms, setRooms] = useState<Room[]>([
        {
            id: 1,
            bedding_preference: "double",
            adults: 0,
            child_8_12: 0,
            child_3_7: 0,
            infant: 0,
            extra_adult: false,
            extra_child: false,
            extra_crib: false,
            single_supplement: 0,
        },
    ]);

    // Get login data
    const is_logged_in = isLoggedIn();
    const login_user = getLoginCookie();

    // Handle close
    const handleClose = () => {
        onOpenChange(false);
        setCurrentStep(1);
        setSelectedNationality(null);
        setSelectedDate("");
        setAvailableSeats(0);
    }

    // Check if date is in the future
    const isFutureDate = (dateString: string) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const date = new Date(dateString);
        return date > today;
    };

    // Handle choose date
    const handleChooseDate = (date: string) => {
        const index = tour?.group_dates.findIndex((d: any) => d.group_date === date);
        const dateObject = tour?.group_dates[index] || null;
        if (!dateObject) return;
        setSelectedDate(date);
        setAvailableSeats(dateObject?.available_seat || 0);
    }

    const getTotalTravellers = (rooms: Room[]) => {
        return rooms.reduce(
            (sum, room) =>
                sum +
                room.adults +
                room.child_8_12 +
                room.child_3_7 +
                room.infant,
            0
        );
    };

    const addRoom = () => {
        // If group tour then do not allow adding more than available seats
        if (tour?.tour_type === "Group Tour" && rooms.length >= availableSeats) return;

        // Add new room
        setRooms((prev) => [
            ...prev,
            {
                id: prev.length + 1,
                bedding_preference: "double",
                adults: 0,
                child_8_12: 0,
                child_3_7: 0,
                infant: 0,
                extra_adult: false,
                extra_child: false,
                extra_crib: false,
                single_supplement: 0,
            },
        ]);

        // Adjust active tab
        setActiveRoomIndex(rooms.length);
    };

    const removeRoom = (index: number) => {
        if (index === 0) return; // Do not allow removing Room 1

        setRooms((prev) => {
            const updated = prev.filter((_, i) => i !== index);
            return updated.map((room, i) => ({ ...room, id: i + 1 }));
        });

        // Adjust active tab safely
        setActiveRoomIndex((prev) =>
            prev >= index ? Math.max(0, prev - 1) : prev
        );
    };

    const updateRoom = (index: number, field: keyof Room, value: any) => {
        setRooms((prev) =>
            prev.map((room, i) =>
                i === index ? { ...room, [field]: value } : room
            )
        );
    };

    // Increment pax count
    const incrementCount = (field: keyof Room) => {
        // Get current room and its field value
        const room = rooms[activeRoomIndex];
        const roomFieldValue = room[field] as number;
        const roomLimit = ROOM_LIMITS[field] as number;

        // Per-room limit
        if (roomFieldValue >= roomLimit) return;

        // Total seats limit
        const totalTravellers = getTotalTravellers(rooms);

        // If group tour then do not allow adding more than available seats
        if (tour?.tour_type === "Group Tour" && totalTravellers >= availableSeats) return;

        // Update room
        updateRoom(
            activeRoomIndex,
            field,
            roomFieldValue + 1
        );
    }

    // Decrement pax count
    const decrementCount = (field: keyof Room) => {
        const room = rooms[activeRoomIndex];
        const roomFieldValue = room[field] as number;

        // Prevent going below zero
        if (roomFieldValue <= 0) return;

        // Update room
        updateRoom(
            activeRoomIndex,
            field,
            roomFieldValue - 1
        );
    }

    // Handle next step
    const handleNextStep = () => {
        setErrors("");
        setCurrentStep(currentStep + 1);
    }

    // Handle previous step
    const handlePreviousStep = () => {
        setErrors("");
        setCurrentStep(currentStep - 1);
    }

    // Handle submit
    const handleSubmit = async () => {
        // Update state
        setErrors("");

        // Count total travellers
        const totalTravellers = getTotalTravellers(rooms);

        // Match travellers with seats
        if (totalTravellers === 0) {
            setErrors("Please add at least one traveller to proceed.");
            return;
        }

        // Update state
        setIsFormLoading(true);

        try {
            // Fetch the data
            const response = await fetch("/api/cart/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    tour_id: tour?.id,
                    user_id: is_logged_in ? login_user?.user_id : null,
                    user_name: userName,
                    user_email: userEmail,
                    user_phone: userPhone,
                    booking_date: selectedDate,
                    nationality_id: selectedNationality,
                    total_rooms: rooms.length,
                    room_data: rooms,
                    ip_address: getClientIp()
                }),
            });

            // Parse the JSON response
            const data = await response.json();

            // Check response
            if (data.status) {
                // Set cookie value
                addCartData(data?.data?.cart_id);

                // Redirect to cart
                router.push("/cart");
            } else {
                // Set errors
                setErrors(data?.message ?? "Something went wrong. Please try again.");
            }
        } catch (error: any) {
            if (error.name !== "AbortError") {
                console.error("Failed to add to cart", error);
            }
        } finally {
            // Update state
            setIsFormLoading(false);
        }
    }

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center">
            <div className="absolute inset-0 bg-black/40" onClick={handleClose} />
            <div className="relative w-full h-full bg-[#fef4e4] overflow-auto">
                <button
                    onClick={handleClose}
                    className="absolute top-6 right-6 z-10 p-2 rounded-full bg-[#FFC765] hover:bg-black hover:text-white cursor-pointer transition"
                >
                    <X className="h-5 w-5" />
                </button>
                <div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
                    {[1, 2, 3].map((step) => (
                        <div
                            key={step}
                            className={`w-3 h-3 rounded-full transition-colors ${step === currentStep ? "bg-black" : step < currentStep ? "bg-black" : "bg-gray-300"}`}
                        />
                    ))}
                </div>
                <div className="min-h-full flex flex-col items-center justify-center px-4 md:px-8 py-20 space-y-5">
                    <div className="w-full max-w-4xl space-y-5">
                        <QuestionHeading title="Quote to Customer for Tour" />

                        {/* Step 1 */}
                        {currentStep === 1 && (
                            <div className="w-full max-w-4xl mx-auto space-y-6">
                                <div className="border border-black/50 rounded-sm p-5 space-y-4 bg-white/60">
                                    <div className="flex items-center justify-between">
                                        <p className="font-semibold">Rooms</p>
                                        <button
                                            onClick={addRoom}
                                            className="flex items-center gap-1 px-4 py-1.5 font-medium rounded border border-black/50 text-sm cursor-pointer hover:bg-[#FFC765]"
                                        >
                                            <Plus className="h-3 w-3" /> Add Room
                                        </button>
                                    </div>
                                    <div className="border border-dashed border-gray-300 rounded-sm p-5 space-y-4">
                                        <div className="flex gap-4 items-center border-b border-dashed border-gray-300 pb-2 overflow-x-auto whitespace-nowrap scrollbar-hide">
                                            {rooms.map((room, index) => (
                                                <div
                                                    key={room.id}
                                                    className="inline-flex items-center gap-1 pr-3 border-r border-dashed border-gray-300 flex-shrink-0"
                                                >
                                                    <button
                                                        onClick={() => setActiveRoomIndex(index)}
                                                        className={`font-medium cursor-pointer transition-colors ${activeRoomIndex === index ? "text-red-500" : "text-[#0F172A]"}`}
                                                    >
                                                        Room {index + 1}
                                                    </button>
                                                    {index > 0 && (
                                                        <button
                                                            onClick={() => removeRoom(index)}
                                                            className="text-red-500 text-xs font-semibold pl-1 hover:text-red-700 cursor-pointer"
                                                            title="Remove Room"
                                                        >
                                                            ✕
                                                        </button>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                        <div>
                                            <p className="text-center font-medium mb-4">Bedding Preference</p>
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                {BEDDING_PREFERENCES.map((bed, index) => (
                                                    <button
                                                        key={index}
                                                        onClick={() =>
                                                            updateRoom(activeRoomIndex, "bedding_preference", bed.value)
                                                        }
                                                        className={`px-2 py-2 rounded-md border font-medium text-sm cursor-pointer ${rooms[activeRoomIndex].bedding_preference === bed.value
                                                            ? "bg-[#ffc765] text-[#333] shadow-md"
                                                            : "border-black/50"
                                                            }`}
                                                    >
                                                        {bed.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex justify-end gap-6 text-sm">
                                            <label className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    checked={rooms[activeRoomIndex].extra_adult}
                                                    onChange={(e) =>
                                                        updateRoom(activeRoomIndex, "extra_adult", e.target.checked)
                                                    }
                                                />
                                                Add Extra Bed
                                            </label>
                                            <label className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    checked={rooms[activeRoomIndex].extra_crib}
                                                    onChange={(e) =>
                                                        updateRoom(activeRoomIndex, "extra_crib", e.target.checked)
                                                    }
                                                />
                                                Add Crib
                                            </label>
                                        </div>
                                        {TRAVELLER_TYPES.map((item, index) => (
                                            <div key={index} className="flex justify-between items-center">
                                                <div>
                                                    <p className="font-medium">{item.label}</p>
                                                    <p className="text-sm text-gray-600">{item.age}</p>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <button onClick={() => decrementCount(item.field as keyof Room)} className="w-7 h-7 cursor-pointer rounded-full border border-black hover:bg-black hover:text-white">−</button>

                                                    <span>{rooms[activeRoomIndex][item.field as keyof Room]}</span>

                                                    <button onClick={() => incrementCount(item.field as keyof Room)} className="w-7 h-7 cursor-pointer rounded-full border border-black hover:bg-black hover:text-white">+</button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 2 */}
                        {currentStep === 2 && (
                            <div className="border border-black/50 rounded-sm p-5 space-y-4 bg-white/60">
                                1111
                            </div>
                        )}

                        {/* Step 3 */}
                        {currentStep === 3 && (
                            <div className="border border-black/50 rounded-sm p-5 space-y-4 bg-white/60">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                    <div>
                                        <label className="block text-md font-medium text-[#333] mb-1">
                                            Full Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            value={userName}
                                            onChange={(e) => setUserName(e.target.value)}
                                            placeholder="Enter your name"
                                            className="w-full px-4 py-2 text-base rounded-sm border border-black/50 bg-white outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-md font-medium text-[#333] mb-1">
                                            Email <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            value={userEmail}
                                            onChange={(e) => setUserEmail(e.target.value)}
                                            placeholder="Enter your email"
                                            className="w-full px-4 py-2 text-base rounded-sm border border-black/50 bg-white outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-md font-medium text-[#333] mb-1">
                                            Cellphone <span className="text-red-500">*</span>
                                        </label>
                                        <PhoneInput
                                            defaultCountry="us"
                                            placeholder="Enter your phone number"
                                            value={userPhone}
                                            onChange={(e) => setUserPhone(e)}
                                            className="w-full px-4 py-1 text-base rounded-sm border border-black/50 bg-white outline-none"
                                            inputClassName="w-full !border-0 text-sm md:text-md !border-white"
                                        />
                                    </div>
                                </div>

                                <div className="grid border-t border-dashed border-gray-300 mt-6 pt-4 grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                    <div>
                                        <label className="block text-md font-medium text-[#333] mb-1">
                                            Travel Date <span className="text-red-500">*</span>
                                        </label>
                                        {tour?.tour_type === "Group Tour" ? (
                                            <select
                                                value={selectedDate ?? ""}
                                                onChange={(e) => handleChooseDate(e.target.value)}
                                                className="w-full text-base px-4 py-2 rounded-sm border border-black/50 bg-white outline-none"
                                            >
                                                <option value="">Choose travel date</option>
                                                {tour?.group_dates?.filter((d: any) => isFutureDate(d.group_date)).map((date: any, index: number) => (
                                                    <option key={index} value={date.group_date}>
                                                        {`${formatDate(date.group_date)} (${date.available_seat} seats)`}
                                                    </option>
                                                ))}
                                            </select>
                                        ) : (
                                            <input
                                                type="date"
                                                value={selectedDate}
                                                onChange={(e) => setSelectedDate(e.target.value)}
                                                min={new Date().toISOString().split("T")[0]}
                                                className="block w-full min-w-0 max-w-full appearance-none text-base px-4 py-2 border border-black/50 rounded-sm bg-white outline-none"
                                            />
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-md font-medium text-[#333] mb-1">
                                            Your Nationality <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            value={selectedNationality ?? ""}
                                            onChange={(e) => setSelectedNationality(e.target.value)}
                                            className="w-full px-4 py-2 text-base rounded-sm border border-black/50 bg-white outline-none"
                                        >
                                            <option value="">Select nationality</option>
                                            {nationality.map((item: string, index: number) => (
                                                <option key={index} value={item}>{item}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {errors && (
                        <span className="text-red-500">{errors}</span>
                    )}

                    <div className="flex items-center gap-3">
                        {currentStep > 1 && <button
                            onClick={handlePreviousStep}
                            className="flex items-center gap-2 px-8 py-2.5 bg-white text-black rounded-md font-medium border border-black/50 hover:bg-black hover:text-white transition-colors cursor-pointer"
                        >
                            <ArrowLeft className="h-5 w-5" /> Previous
                        </button>}

                        {currentStep < 3 && (
                            <button
                                onClick={handleNextStep}
                                className="flex items-center gap-2 px-8 py-2.5 rounded-md font-medium transition-colors border border-black/50 cursor-pointer bg-black text-white hover:text-black hover:bg-white"
                            >
                                Next <ArrowRight className="h-5 w-5" />
                            </button>
                        )}

                        {currentStep == 3 && <button
                            onClick={handleSubmit}
                            disabled={isFormLoading}
                            className="flex items-center gap-2 px-8 py-2.5 rounded-md font-medium transition-colors border cursor-pointer bg-black text-white hover:text-black hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isFormLoading && <Loader2 className="animate-spin h-5 w-5" />}
                            {!isFormLoading && <CheckCircle className="h-5 w-5" />}
                            Submit
                        </button>}
                    </div>
                </div>
            </div>
        </div>
    )
}
