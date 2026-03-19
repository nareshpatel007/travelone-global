"use client";

import nationalityList from "@/lib/nationality";
import { CheckCheck, CheckCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { PassportPreference } from "./traveller_info/passport";
import { FlightPreference } from "./traveller_info/flight";
import { MealPreference } from "./traveller_info/meal";
import { VisaPreference } from "./traveller_info/visa";
import { LuggagePreference } from "./traveller_info/luggage";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

// Define props
interface Props {
    headerBox?: boolean;
    orderData: any;
    totalRooms: number;
    item: any;
}

export default function TravellerForm({ headerBox = true, orderData, totalRooms, item }: Props) {
    // Define nationalities
    const nationality: any = nationalityList();

    // Define state
    const [openPassportModal, setOpenPassportModal] = useState<boolean>(false);
    const [openFlightModal, setOpenFlightModal] = useState<boolean>(false);
    const [openLuggageModal, setOpenLuggageModal] = useState<boolean>(false);
    const [openMealModal, setOpenMealModal] = useState<boolean>(false);
    const [openVisaModal, setOpenVisaModal] = useState<boolean>(false);
    const [isFormLoading, setIsFormLoading] = useState<boolean>(false);
    const [isUpdated, setIsUpdated] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [travellers, setTravellers] = useState<any>({
        booking_ref_no: orderData?.booking_ref_no,
        traveller_type: item?.traveller_type,
        count_no: item?.count_no,
        bedding: item?.bedding,
        fname: item?.fullinfo?.traveller_fname || "",
        mname: item?.fullinfo?.traveller_mname || "",
        lname: item?.fullinfo?.traveller_lname || "",
        email: item?.fullinfo?.traveller_email || "",
        phone: item?.fullinfo?.traveller_phone || "",
        dob: item?.fullinfo?.traveller_dob || "",
        mailing_address: item?.fullinfo?.traveller_mailing_address || "",
        global_entry_no: item?.fullinfo?.traveller_global_entry_no || "",
        passport_no: item?.fullinfo?.traveller_passport_no || "",
        passport_expiry: item?.fullinfo?.traveller_passport_expiry || "",
        nationality: item?.fullinfo?.traveller_nationality || "",
        passport_json: item?.fullinfo?.passport_json || "",
        flight_json: item?.fullinfo?.flight_json || "",
        luggage_json: item?.fullinfo?.luggage_json || "",
        meal_json: item?.fullinfo?.meal_json || "",
        visa_json: item?.fullinfo?.visa_json || "",
        room_allocate: item?.fullinfo?.room_allocate || "",
    });

    // Handle update value
    const handleChange = (key: string, value: any, autoUpdate: boolean = false) => {
        // Validation
        if (key == "" || value == "") {
            return;
        }

        // Update value
        const updatedData = { ...travellers, [key]: value };
        setTravellers(updatedData);

        // Auto update
        if(autoUpdate) {
            handleSubmitTraveller(updatedData);
        }
    };

    // Handle submit traveller
    const handleSubmitTraveller = async (updatedData: any = travellers) => {
        // Check validation
        if (updatedData.fname == "" || updatedData.lname == "" || updatedData.email == "" || updatedData.phone == "" || updatedData.dob == "" || updatedData.mailing_address == "" || updatedData.global_entry_no == "" || updatedData.passport_no == "" || updatedData.passport_expiry == "" || updatedData.nationality == "") {
            setError("All fields are required.");
            return;
        }

        // If more then 1 room and if not selected room allocate
        if (totalRooms > 1 && !updatedData.room_allocate) {
            setError("Please allocate room for this traveller");
            return;
        }

        // If only 1 room, set room allocate to 1
        if (totalRooms == 1) {
            updatedData.room_allocate = 1;
        }

        // Update state
        setIsFormLoading(true);
        setIsUpdated(false);
        setError(null);

        try {
            // Call API request
            const response = await fetch("/api/bookings/traveller/update", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedData),
            });

            // Get data
            const data = await response.json();

            // Check response
            if (data.status) {
                // Update state
                setIsUpdated(true);
            } else {
                // Set error
                setError(data?.message || "Something went wrong. Please try again.");
            }
        } catch (error) {
            // Set error
            console.log(error);
            setError("Update request failed. Please try again.");
        } finally {
            // Update state
            setIsFormLoading(false);
        }

        // Update state
        setIsFormLoading(false);
    }

    return (
        <>
            <div className="space-y-4">
                {headerBox && <div className="bg-[#FFF9EE] border border-[#d9cec1] px-4 py-3 rounded-sm">
                    <h3 className="font-medium text-sm md:text-lg">
                        {item.title}
                    </h3>
                    <p className="text-xs md:text-sm text-black">
                        {item.subtitle}
                    </p>
                </div>}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* First Name */}
                    <div className="flex flex-col space-y-1">
                        <label className="text-sm">First Name</label>
                        <input
                            type="text"
                            defaultValue={travellers.fname}
                            onChange={(e) => handleChange("fname", e.target.value)}
                            className="bg-white border border-black px-3 py-2 rounded-sm text-sm md:text-base focus:ring-1 focus:ring-black"
                        />
                    </div>

                    {/* Middle Name */}
                    <div className="flex flex-col space-y-1">
                        <label className="text-sm">Middle Name (Optional)</label>
                        <input
                            type="text"
                            defaultValue={travellers.mname}
                            onChange={(e) => handleChange("mname", e.target.value)}
                            className="bg-white border border-black px-3 py-2 rounded-sm text-sm md:text-base focus:ring-1 focus:ring-black"
                        />
                    </div>

                    {/* Last Name */}
                    <div className="flex flex-col space-y-1">
                        <label className="text-sm">Last Name</label>
                        <input
                            type="text"
                            defaultValue={travellers.lname}
                            onChange={(e) => handleChange("lname", e.target.value)}
                            className="bg-white border border-black px-3 py-2 rounded-sm text-sm md:text-base focus:ring-1 focus:ring-black"
                        />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col space-y-1">
                        <label className="text-sm">Email</label>
                        <input
                            type="text"
                            defaultValue={travellers.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                            className="bg-white border border-black px-3 py-2 rounded-sm text-sm md:text-base focus:ring-1 focus:ring-black"
                        />
                    </div>

                    {/* Phone Number */}
                    <div className="flex flex-col space-y-1">
                        <label className="text-sm">Phone Number</label>
                        <PhoneInput
                            defaultCountry="us"
                            value={travellers.phone}
                            onChange={(e) => handleChange("phone", e)}
                            placeholder="Enter your phone number"
                            className="w-full rounded-sm py-0.5 px-3 text-sm md:text-md text-black font-normal md:font-medium bg-white border border-black"
                            inputClassName="w-full !border-0 text-sm md:text-md !border-white"
                        />
                    </div>

                    {/* Date of Birth */}
                    <div className="flex flex-col space-y-1">
                        <label className="text-sm">Date of Birth</label>
                        <input
                            type="date"
                            defaultValue={travellers.dob}
                            onChange={(e) => handleChange("dob", e.target.value)}
                            max={new Date().toISOString().split("T")[0]}
                            className="bg-white border border-black px-3 py-2 rounded-sm text-sm md:text-base focus:ring-1 focus:ring-black"
                        />
                    </div>

                    {/* Mailing Address */}
                    <div className="flex flex-col space-y-1">
                        <label className="text-sm">Mailing Address</label>
                        <input
                            type="text"
                            defaultValue={travellers.mailing_address}
                            onChange={(e) => handleChange("mailing_address", e.target.value)}
                            className="bg-white border border-black px-3 py-2 rounded-sm text-sm md:text-base focus:ring-1 focus:ring-black"
                        />
                    </div>

                    {/* Global Entry Number */}
                    <div className="flex flex-col space-y-1">
                        <label className="text-sm">Global Entry Number</label>
                        <input
                            type="text"
                            defaultValue={travellers.global_entry_no}
                            onChange={(e) => handleChange("global_entry_no", e.target.value)}
                            className="bg-white border border-black px-3 py-2 rounded-sm text-sm md:text-base focus:ring-1 focus:ring-black"
                        />
                    </div>

                    {/* Passport Number */}
                    <div className="flex flex-col space-y-1">
                        <label className="text-sm">Passport Number</label>
                        <input
                            type="text"
                            defaultValue={travellers.passport_no}
                            onChange={(e) => handleChange("passport_no", e.target.value)}
                            className="bg-white border border-black px-3 py-2 rounded-sm text-sm md:text-base focus:ring-1 focus:ring-black"
                        />
                    </div>

                    {/* Passport Expiry */}
                    <div className="flex flex-col space-y-1">
                        <label className="text-sm">Passport Expiry</label>
                        <input
                            type="date"
                            defaultValue={travellers.passport_expiry}
                            onChange={(e) => handleChange("passport_expiry", e.target.value)}
                            min={new Date().toISOString().split("T")[0]}
                            className="bg-white border border-black px-3 py-2 rounded-sm text-sm md:text-base focus:ring-1 focus:ring-black"
                        />
                    </div>

                    {/* Nationality */}
                    <div className="flex flex-col">
                        <label className="text-sm mb-1">Nationality</label>
                        <select
                            defaultValue={travellers.nationality}
                            onChange={(e) => handleChange("nationality", e.target.value)}
                            className="bg-white border border-black px-3 py-2 rounded-sm text-sm md:text-base"
                        >
                            <option value="">Select Nationality</option>
                            {nationality.length > 0 && nationality.map((item: string, index: number) => (
                                <option key={index}>{item}</option>
                            ))}
                        </select>
                    </div>

                    {/* Room Allocate */}
                    {totalRooms > 1 && <div className="flex flex-col">
                        <label className="text-sm mb-1">Allocate Room</label>
                        <select
                            defaultValue={travellers.room_allocate}
                            onChange={(e) => handleChange("room_allocate", e.target.value)}
                            className="bg-white border border-black px-3 py-2 rounded-sm text-sm md:text-base"
                        >
                            {Array.from({ length: totalRooms }, (_, index) => index + 1).map((room) => (
                                <option key={room}>Room {room}</option>
                            ))}
                        </select>
                    </div>}
                </div>

                {/* Preferences */}
                <div className="space-y-2">
                    <p className="text-sm md:text-base font-medium">Your Preferences</p>
                    <div className="flex flex-wrap gap-2">
                        <button
                            disabled={travellers.fname == "" || travellers.lname == "" || travellers.email == "" || travellers.phone == "" || travellers.dob == "" || travellers.mailing_address == "" || travellers.global_entry_no == "" || travellers.passport_no == "" || travellers.passport_expiry == "" || travellers.nationality == ""}
                            onClick={() => setOpenPassportModal(true)}
                            className="px-4 py-1 text-sm md:text-base bg-[#d9eed8] text-black border border-black rounded-sm hover:bg-black hover:text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Passport
                        </button>

                        <button
                            disabled={travellers.fname == "" || travellers.lname == "" || travellers.email == "" || travellers.phone == "" || travellers.dob == "" || travellers.mailing_address == "" || travellers.global_entry_no == "" || travellers.passport_no == "" || travellers.passport_expiry == "" || travellers.nationality == ""}
                            onClick={() => setOpenFlightModal(true)}
                            className="px-4 py-1 text-sm md:text-base bg-[#d9eed8] text-black border border-black rounded-sm hover:bg-black hover:text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Flight
                        </button>

                        <button
                            disabled={travellers.fname == "" || travellers.lname == "" || travellers.email == "" || travellers.phone == "" || travellers.dob == "" || travellers.mailing_address == "" || travellers.global_entry_no == "" || travellers.passport_no == "" || travellers.passport_expiry == "" || travellers.nationality == ""}
                            onClick={() => setOpenLuggageModal(true)}
                            className="px-4 py-1 text-sm md:text-base bg-[#d9eed8] text-black border border-black rounded-sm hover:bg-black hover:text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Luggage
                        </button>

                        <button
                            disabled={travellers.fname == "" || travellers.lname == "" || travellers.email == "" || travellers.phone == "" || travellers.dob == "" || travellers.mailing_address == "" || travellers.global_entry_no == "" || travellers.passport_no == "" || travellers.passport_expiry == "" || travellers.nationality == ""}
                            onClick={() => setOpenMealModal(true)}
                            className="px-4 py-1 text-sm md:text-base bg-[#d9eed8] text-black border border-black rounded-sm hover:bg-black hover:text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Meal
                        </button>

                        <button
                            disabled={travellers.fname == "" || travellers.lname == "" || travellers.email == "" || travellers.phone == "" || travellers.dob == "" || travellers.mailing_address == "" || travellers.global_entry_no == "" || travellers.passport_no == "" || travellers.passport_expiry == "" || travellers.nationality == ""}
                            onClick={() => setOpenVisaModal(true)}
                            className="px-4 py-1 text-sm md:text-base bg-[#d9eed8] text-black border border-black rounded-sm hover:bg-black hover:text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Visa
                        </button>
                    </div>
                </div>

                {/* Error */}
                {error && <p className="text-sm md:text-base text-red-600">{error}</p>}

                {/* Success */}
                {isUpdated && <p className="flex items-center gap-2 text-sm md:text-base text-green-600">
                    <CheckCheck size={16} />
                    {isUpdated} Updated Successfully!
                </p>}

                {/* Save Button */}
                <button
                    onClick={() => handleSubmitTraveller()}
                    disabled={isFormLoading}
                    className="w-full md:w-auto flex items-center justify-center gap-2 bg-black text-white hover:bg-black/90 text-white py-2 px-6 rounded-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isFormLoading && <Loader2 size={16} className="animate-spin" />}
                    {!isFormLoading && <CheckCircle size={16} />}
                    Save Changes
                </button>
            </div>

            {/* Preference Modal */}
            {openPassportModal && <PassportPreference
                open={openPassportModal}
                setOpenChange={setOpenPassportModal}
                formData={travellers.passport_json || {}}
                handleChange={handleChange}
            />}

            {openFlightModal && <FlightPreference
                open={openFlightModal}
                setOpenChange={setOpenFlightModal}
                formData={travellers.flight_json || {}}
                handleChange={handleChange}
            />}

            {openLuggageModal && <LuggagePreference
                open={openLuggageModal}
                setOpenChange={setOpenLuggageModal}
                formData={travellers.luggage_json || {}}
                handleChange={handleChange}
            />}

            {openMealModal && <MealPreference
                open={openMealModal}
                setOpenChange={setOpenMealModal}
                formData={travellers.meal_json || {}}
                handleChange={handleChange}
            />}

            {openVisaModal && <VisaPreference
                open={openVisaModal}
                setOpenChange={setOpenVisaModal}
                formData={travellers.visa_json || {}}
                handleChange={handleChange}
            />}
        </>
    );
}