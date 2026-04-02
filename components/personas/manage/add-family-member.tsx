"use client";

import { isValidEmail } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useState } from "react";

// Define props
interface Props {
    open: boolean,
    onOpenChange: (open: boolean) => void;
    setReloadContent: (open: boolean) => void;
    userId: string;
}

// Initial form data
const initialFormData = {
    name: "",
    relation: "",
    email: ""
};

export default function AddFamilyMemberModal({ open, onOpenChange, setReloadContent, userId }: Props) {
    // Validation
    if (!open) return null;

    // Define state
    const [form, setForm] = useState(initialFormData);
    const [error, setError] = useState("");
    const [formLoading, setFormLoading] = useState(false);

    // Handle submit
    const handleSubmit = async () => {
        // Validation
        if (userId === "" || !form.name || !form.relation || !form.email) {
            setError("Please fill all the fields.");
            return;
        } else if (!isValidEmail(form.email)) {
            setError("Enter a valid email address.");
            return;
        }

        // Update state
        setError("");
        setFormLoading(true);

        try {
            // API call
            const res = await fetch("/api/plan_your_trip/manage/add-member", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user_id: userId,
                    name: form.name,
                    relation: form.relation,
                    email: form.email
                }),
            });

            // Convert into JSON
            const data = await res.json();

            // Check response
            if (data?.status) {
                setReloadContent(true);
                onOpenChange(false);
            } else {
                setError(data?.message || "Error occurred while adding family member. Please try again.");
            }
        } catch (error) {
            setError("Error occurred while adding family member. Please try again.");
        } finally {
            setFormLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[999] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 md:p-8 relative space-y-6">
                <button
                    onClick={() => onOpenChange(false)}
                    disabled={formLoading}
                    className="absolute top-4 right-4 text-gray-400 hover:text-black text-lg cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                >
                    ✕
                </button>
                <div className="text-center space-y-2">
                    <h2 className="text-xl md:text-2xl font-semibold">
                        Add Family Member
                    </h2>
                    <p className="text-sm text-gray-500">
                        Include your family to build a shared travel DNA
                    </p>
                </div>
                <div className="space-y-3">
                    <div>
                        <label className="text-base text-black">
                            Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={form.name}
                            onChange={(e) =>
                                setForm({ ...form, name: e.target.value })
                            }
                            placeholder="Enter name"
                            className="w-full mt-1 px-4 py-2 text-base rounded-xl border border-black/10 focus:border-black outline-none"
                        />
                    </div>
                    <div>
                        <label className="text-base text-black">
                            Relation <span className="text-red-500">*</span>
                        </label>
                        <select
                            value={form.relation}
                            onChange={(e) =>
                                setForm({ ...form, relation: e.target.value })
                            }
                            className="w-full mt-1 px-4 py-2 text-base rounded-xl border border-black/10 focus:border-black outline-none"
                        >
                            <option value="">Choose Option</option>
                            <option value="Husband">Husband</option>
                            <option value="Wife">Wife</option>
                            <option value="Father">Father</option>
                            <option value="Mother">Mother</option>
                            <option value="Son">Son</option>
                            <option value="Daughter">Daughter</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-base text-black">
                            Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            value={form.email}
                            onChange={(e) =>
                                setForm({ ...form, email: e.target.value })
                            }
                            placeholder="Enter email"
                            className="w-full mt-1 px-4 py-2 text-base rounded-xl border border-black/10 focus:border-black outline-none"
                        />
                    </div>
                </div>

                <div className="space-y-3">
                    {error && <p className="text-base text-red-500">{error}</p>}
                    <button
                        onClick={handleSubmit}
                        disabled={formLoading}
                        className="flex items-center gap-2 items-center justify-center gap-2 w-full py-2 rounded-full text-base bg-black text-white hover:bg-yellow-400 hover:text-black transition font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {formLoading && <Loader2 className="animate-spin w-5 h-5" />}
                        Add Member
                    </button>
                </div>
            </div>
        </div>
    );
}