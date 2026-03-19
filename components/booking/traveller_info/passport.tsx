"use client";

import { CheckCircle, Download, Loader2, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type Props = {
    open: boolean;
    setOpenChange: (open: boolean) => void;
    handleChange: (key: string, value: any, autoUpdate?: boolean) => void;
    formData: any;
};

export function PassportPreference({ open, setOpenChange, handleChange, formData }: Props) {
    // If data empty, return null
    if (!open) return null;

    // Normalize data
    const normalized = normalizeMealData(formData);

    // Define state
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Handle close
    const handleClose = () => setOpenChange(false);

    // Handle submit
    const handleSubmit = async () => {
        if (!file) {
            setError("Passport file is required");
            return;
        }

        // Check file size
        if (file.size > 4 * 1024 * 1024) {
            setError("Max file size is 4 MB");
            return;
        }

        // Check file type
        setLoading(true);
        setError(null);

        try {
            // Prepare form data
            const formData = new FormData();
            formData.append("folder", "passport");
            formData.append("file", file);

            // Upload file
            const res = await fetch("/api/imagekit/upload", {
                method: "POST",
                body: formData,
            });

            // Parse the JSON response
            const data = await res.json();

            // Check response
            if (!res.ok) throw new Error(data.error);

            // Save only URL
            handleChange("passport_json", {
                file: data.url
            }, true);

            // Close modal
            handleClose();
        } catch (err: any) {
            setError(err.message || "Upload failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 md:p-8">
            <div className="absolute inset-0 bg-black/40" onClick={handleClose} />
            <div className="relative w-full max-w-xl bg-white rounded-md shadow-lg">
                <div className="flex justify-between items-center px-6 py-4 border-b">
                    <h3 className="text-md md:text-lg font-medium">Passport Details</h3>
                    <button className="cursor-pointer" onClick={handleClose}>
                        <X />
                    </button>
                </div>
                <div className="px-5 py-5 space-y-4">
                    {normalized?.file && (
                        <div>
                            <label className="block text-sm font-medium mb-1">Your uploaded passport file is here</label>
                            <Link href={normalized?.file} target="_blank">
                                <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-sm text-sm hover:underline cursor-pointer">
                                    <Download size={16} />
                                    Download File
                                </button>
                            </Link>
                        </div>
                    )}

                    <div className="space-y-3">
                        <label className="block text-sm font-medium mb-1">
                            Upload Passport <span className="text-red-500">*</span>
                        </label>

                        <input
                            type="file"
                            accept="image/*,.pdf"
                            onChange={(e) => setFile(e.target.files?.[0] || null)}
                            className="block w-full border px-3 py-2 text-sm md:text-base rounded-sm"
                        />

                        <p className="text-xs text-gray-500 mt-1">
                            Max file size: 4 MB | Supported: .png, .jpg, .jpeg, .pdf
                        </p>
                    </div>

                    {error && <p className="text-red-600 text-sm">{error}</p>}
                </div>
                <div className="flex justify-end gap-3 px-6 py-4 border-t">
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="px-5 py-1.5 bg-black text-sm md:text-base text-white border border-black rounded-sm flex items-center gap-2 cursor-pointer hover:bg-black/90 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? <Loader2 className="animate-spin" size={16} /> : <CheckCircle size={16} />}
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
            file: "",
        };
    }

    if (typeof data === "string") {
        try {
            data = JSON.parse(data);
        } catch {
            return {
                file: "",
            };
        }
    }

    return {
        file: data?.file || "",
    };
};
