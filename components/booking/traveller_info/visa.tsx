"use client";

import { CheckCircle, X } from "lucide-react";
import { useState } from "react";

// Define props
type Props = {
    open: boolean;
    setOpenChange: (open: boolean) => void;
    handleChange: (key: string, value: any, autoUpdate?: boolean) => void;
    formData: any;
};

// Define options
const VISA_OPTIONS = [
    "I need to get visa",
    "I already have visa",
    "I have visa free entry",
];

export function VisaPreference({ open, setOpenChange, handleChange, formData }: Props) {
    // If not open, return null
    if (!open) return null;

    // Normalize data
    const normalized = normalizeMealData(formData);

    // Define state
    const [visaStatus, setVisaStatus] = useState(normalized?.visa_status || "");
    const [error, setError] = useState<string | null>(null);

    // Handle close
    const handleClose = () => setOpenChange(false);

    // Handle submit
    const handleSubmit = () => {
        if (!visaStatus) {
            setError("Please select visa option");
            return;
        }

        handleChange("visa_json", {
            visa_status: visaStatus,
        }, true);

        handleClose();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 md:p-8">
            <div className="absolute inset-0 bg-black/40" onClick={handleClose} />

            <div className="relative w-full max-w-lg bg-white rounded-md shadow-lg">
                <div className="flex items-center justify-between px-6 py-4 border-b">
                    <h3 className="text-md md:text-lg font-medium">Visa Details</h3>
                    <button className="cursor-pointer" onClick={handleClose}>
                        <X />
                    </button>
                </div>
                <div className="px-5 py-5 space-y-4">
                    <div className="space-y-1">
                        <label className="block text-sm font-medium">
                            Select Visa <span className="text-red-500">*</span>
                        </label>

                        <select
                            value={visaStatus}
                            onChange={(e) => setVisaStatus(e.target.value)}
                            className="w-full border border-black rounded-sm text-sm md:text-base px-3 py-1 md:py-1.5 focus:outline-none focus:ring-1 focus:ring-black"
                        >
                            <option value="">Select Option</option>
                            {VISA_OPTIONS.map((item, index) => (
                                <option key={index} value={item}>{item}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-3 px-6 py-4 border-t">
                    {error && (
                        <p className="text-red-600 text-sm">{error}</p>
                    )}

                    <button
                        onClick={handleSubmit}
                        className="px-5 py-1.5 bg-black text-sm md:text-base text-white border border-black rounded-sm flex items-center gap-2 cursor-pointer hover:bg-black/90"
                    >
                        <CheckCircle size={16} />
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}

// Normalize data
const normalizeMealData = (data: any) => {
    if (!data) {
        return {
            visa_status: "",
        };
    }

    if (typeof data === "string") {
        try {
            data = JSON.parse(data);
        } catch {
            return {
                visa_status: "",
            };
        }
    }

    return {
        visa_status: data?.visa_status || "",
    };
};
