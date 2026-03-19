"use client";

import { CheckCircle, X } from "lucide-react";
import { useState } from "react";

// Define props
type Props = {
    open: boolean;
    setOpenChange: (open: boolean) => void;
    handleChange: (key: string, value: any, autoUpdate?: boolean) => void;
    formData?: any;
};

export function LuggagePreference({ open, setOpenChange, handleChange, formData }: Props) {
    // If data empty, return null
    if (!open) return null;

    // Normalize data
    const normalized = normalizeMealData(formData);

    // Define state
    const [checkedBags, setCheckedBags] = useState(normalized?.checked_bags || 0);
    const [carryOnBags, setCarryOnBags] = useState(normalized?.carry_on_bags || 0);
    const [laptopBag, setLaptopBag] = useState(normalized?.laptop_bag || 0);

    // Handle close
    const handleClose = () => setOpenChange(false);

    // Handle submit
    const handleSubmit = () => {
        handleChange("luggage_json", {
            checked_bags: checkedBags,
            carry_on_bags: carryOnBags,
            laptop_bag: laptopBag,
        }, true);

        handleClose();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 md:p-8">
            <div className="absolute inset-0 bg-black/40" onClick={handleClose} />
            <div className="relative w-full max-w-xl bg-white rounded-md shadow-lg">
                <div className="flex items-center justify-between px-6 py-4 border-b">
                    <h3 className="text-md md:text-lg font-medium">Luggage Details</h3>
                    <button className="cursor-pointer" onClick={handleClose}>
                        <X />
                    </button>
                </div>
                <div className="px-5 py-5 space-y-4">
                    <Select
                        label="Checked Bags"
                        required
                        value={checkedBags}
                        onChange={setCheckedBags}
                        options={[0, 1, 2]}
                    />

                    <Select
                        label="Carry On Bags"
                        required
                        value={carryOnBags}
                        onChange={setCarryOnBags}
                        options={[0, 1, 2]}
                    />

                    <Select
                        label="Laptop Bag"
                        required
                        value={laptopBag}
                        onChange={setLaptopBag}
                        options={[0, 1, 2]}
                    />
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 px-6 py-4 border-t">
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

// Reusable Select
function Select({
    label,
    value,
    onChange,
    options,
    required = false,
}: {
    label: string;
    value: number;
    onChange: (value: number) => void;
    options: number[];
    required?: boolean;
}) {
    return (
        <div>
            <label className="block text-sm font-medium mb-1">
                {label} {required && <span className="text-red-500">*</span>}
            </label>

            <select
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="w-full border border-black rounded-sm px-3 py-1 md:py-1.5 text-sm md:text-base focus:outline-none focus:ring-1 focus:ring-black"
            >
                {options.map((opt) => (
                    <option key={opt} value={opt}>
                        {opt}
                    </option>
                ))}
            </select>
        </div>
    );
}

// Normalize data
const normalizeMealData = (data: any) => {
    if (!data) {
        return {
            checked_bags: 0,
            carry_on_bags: 0,
            laptop_bag: 0,
        };
    }

    if (typeof data === "string") {
        try {
            data = JSON.parse(data);
        } catch {
            return {
                checked_bags: 0,
                carry_on_bags: 0,
                laptop_bag: 0,
            };
        }
    }

    return {
        checked_bags: data.checked_bags || 0,
        carry_on_bags: data.carry_on_bags || 0,
        laptop_bag: data.laptop_bag || 0,
    };
};
