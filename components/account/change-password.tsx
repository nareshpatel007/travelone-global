"use client";

import { Loader2 } from "lucide-react";
import { useState } from "react";

interface Props {
    userId: number;
}

export default function ChangePassword({ userId }: Props) {
    // If userId is not provided, return null
    if (!userId) return null;

    // Define state
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    // Handle form submission
    const handleSubmit = async () => {
        // Reset messages
        setError("");
        setSuccess("");

        // Validation
        if (!currentPassword || !newPassword || !confirmPassword) {
            return setError("All fields are required");
        } else if (newPassword.length < 8) {
            return setError("New password must be at least 8 characters");
        } else if (newPassword !== confirmPassword) {
            return setError("Passwords do not match");
        }

        try {
            // Update state
            setLoading(true);

            // API call to change password
            const res = await fetch("/api/auth/change_password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user_id: userId,
                    current_password: currentPassword,
                    new_password: newPassword,
                })
            });

            // Parse response
            const data = await res.json();

            // Check response
            if (data?.status) {
                setSuccess("Password updated successfully");
                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");
            } else {
                setError(data?.message || "Failed to update password");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md">
            <h1 className="text-lg font-semibold mb-4">Change Password</h1>
            <div className="space-y-4">
                {/* Current Password */}
                <div>
                    <label className="text-sm">Current Password</label>
                    <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full border rounded-md px-3 py-2 mt-1 text-sm"
                    />
                </div>

                {/* New Password */}
                <div>
                    <label className="text-sm">New Password</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full border rounded-md px-3 py-2 mt-1 text-sm"
                    />
                </div>

                {/* Confirm Password */}
                <div>
                    <label className="text-sm">Confirm Password</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full border rounded-md px-3 py-2 mt-1 text-sm"
                    />
                </div>

                {/* Error */}
                {error && (
                    <p className="text-red-500 text-sm">{error}</p>
                )}

                {/* Success */}
                {success && (
                    <p className="text-green-600 text-sm">{success}</p>
                )}

                {/* Button */}
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="flex items-center justify-center gap-2 bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-md text-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading && <Loader2 size={16} className="animate-spin" />}
                    {loading ? "Updating..." : "Update Password"}
                </button>
            </div>
        </div>
    );
}