"use client";

import { useState } from "react";
import { Download, Loader2, Trash } from "lucide-react";

interface Props {
    userId: string;
}

export default function DeleteUserAccount({ userId }: Props) {
    // If not userId, return null
    if (!userId) return null;

    // Define state
    const [open, setOpen] = useState(false);
    const [confirmText, setConfirmText] = useState("");
    const [loading, setLoading] = useState(false);
    const [downloading, setDownloading] = useState(false);

    // Handle download data
    const handleDownload = async () => {
        try {
            // Update state
            setDownloading(true);

            // API call to download data
            const response = await fetch(`/api/auth/download_data`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user_id: userId
                }),
            });

            // Parse the JSON response
            const data = await response.json();

            // Check response
            if (data?.status && data?.data?.download_url) {
                window.open(data?.data?.download_url, "_blank");
            }
        } finally {
            setDownloading(false);
        }
    };

    // Handle delete account
    const handleDelete = async () => {
        // Confirm user input
        if (confirmText !== "DELETE") return;

        // Update state
        setLoading(true);

        try {
            // API call to delete account
            await fetch(`/api/auth/delete_account`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user_id: userId
                }),
            });

            // Redirect homepage
            window.location.href = "/";
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="border border-black bg-white rounded p-6">
                <h1 className="text-lg font-semibold text-black mb-2">
                    Download My Account Data
                </h1>

                <p className="text-sm text-gray-700 mb-4">
                    Before deleting your account, you can download a copy of your data including profile information, bookings, and history. This will allow you to keep a record of your interactions with our service.
                </p>

                <button
                    onClick={handleDownload}
                    disabled={downloading}
                    className="flex items-center gap-2 bg-black text-white px-5 py-2 rounded-md text-sm disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                >
                    {downloading && <Loader2 className="animate-spin w-4 h-4" />}
                    {!downloading && <Download className="w-4 h-4" />}
                    {downloading ? "Downloading..." : "Download My Data"}
                </button>
            </div>

            <div className="border border-red-200 bg-red-50 rounded p-6">
                <h1 className="text-lg font-semibold text-red-600 mb-2">
                    Delete Account
                </h1>

                <p className="text-sm text-gray-700 mb-4">
                    Deleting your account will permanently remove all your data including profile information, bookings, and history. This action cannot be undone.
                </p>

                <button
                    onClick={() => setOpen(true)}
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-md text-sm cursor-pointer"
                >
                    <Trash className="w-4 h-4" />
                    Delete Account
                </button>
            </div>

            {/* Modal */}
            {open && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
                        <h2 className="text-lg font-semibold text-red-600 mb-2">
                            Confirm Account Deletion
                        </h2>

                        <p className="text-sm text-gray-600 mb-4">
                            This action is permanent and cannot be undone. All your data will
                            be deleted immediately.
                        </p>

                        {/* Confirmation Input */}
                        <div className="mb-4">
                            <label className="text-xs text-gray-500">
                                Type <b>DELETE</b> to confirm
                            </label>
                            <input
                                type="text"
                                value={confirmText}
                                disabled={loading}
                                onChange={(e) => setConfirmText(e.target.value)}
                                className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
                                placeholder="DELETE"
                            />
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setOpen(false)}
                                disabled={loading}
                                className="px-4 py-2 text-sm border rounded-md cursor-pointer"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleDelete}
                                disabled={confirmText !== "DELETE" || loading}
                                className="flex items-center gap-2 px-4 py-2 text-sm bg-red-600 text-white rounded-md disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                            >

                                {loading && <Loader2 className="animate-spin w-4 h-4" />}
                                {loading ? "Deleting..." : "Delete Permanently"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}