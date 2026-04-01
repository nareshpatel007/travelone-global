"use client";

import { use, useState } from "react";
import Image from "next/image";
import { CheckCircle, Loader2, Trash, UploadCloudIcon } from "lucide-react";
import DeleteUserAccount from "./delete-account";
import ChangePassword from "./change-password";

// Define types
type TabKey = "profile" | "cover" | "social" | "password" | "delete_account";

// Define props
interface Props {
    profileData: any;
}

export default function ProfileSettings({ profileData }: Props) {
    // Define state
    const [activeTab, setActiveTab] = useState<TabKey>("profile");

    return (
        <div className="bg-white rounded-sm shadow-sm border overflow-hidden">
            <div className="grid md:grid-cols-[260px_1fr]">
                <aside className="border-r bg-gray-50 p-5 space-y-5">
                    <h2 className="text-sm md:text-base font-semibold">Settings</h2>
                    <nav className="space-y-2">
                        <SidebarItem
                            label="Update Profile"
                            active={activeTab === "profile"}
                            onClick={() => setActiveTab("profile")}
                        />
                        {/* <SidebarItem
                            label="Cover Image"
                            active={activeTab === "cover"}
                            onClick={() => setActiveTab("cover")}
                        />
                        <SidebarItem
                            label="Social Media"
                            active={activeTab === "social"}
                            onClick={() => setActiveTab("social")}
                        /> */}
                        <SidebarItem
                            label="Change Password"
                            active={activeTab === "password"}
                            onClick={() => setActiveTab("password")}
                        />
                        <SidebarItem
                            label="Delete Account"
                            active={activeTab === "delete_account"}
                            onClick={() => setActiveTab("delete_account")}
                        />
                    </nav>
                </aside>

                {/* RIGHT CONTENT */}
                <main className="p-6 md:p-6">
                    {activeTab === "profile" && <ProfileSection profileData={profileData} />}
                    {activeTab === "cover" && <CoverSection />}
                    {activeTab === "social" && <SocialSection />}
                    {activeTab === "password" && <ChangePassword userId={profileData?.id} />}
                    {activeTab === "delete_account" && <DeleteUserAccount userId={profileData?.id} />}
                </main>
            </div>
        </div>
    );
}

/* ---------------- Sidebar Item ---------------- */

function SidebarItem({
    label,
    active,
    onClick,
}: {
    label: string;
    active: boolean;
    onClick: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className={`w-full text-left px-3 py-2 rounded-sm text-sm cursor-pointer transition
                ${active
                    ? "bg-black text-white"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-700"}
            `}
        >
            {label}
        </button>
    );
}

// Profile Section
function ProfileSection({ profileData }: Props) {
    // Define state
    const [firstName, setFirstName] = useState(profileData?.first_name);
    const [lastName, setLastName] = useState(profileData?.last_name);
    const [phone, setPhone] = useState(profileData?.phone_number);
    const [avatar, setAvatar] = useState(profileData?.avatar);
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const [uploading, setUploading] = useState<boolean>(false);
    const [formLoading, setFormLoading] = useState<boolean>(false);

    // Handle avatar change
    const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setUploading(true);

        // Get file
        const file = e.target.files?.[0];
        if (!file) {
            setError("Please select a file.");
            return;
        }

        // Define form data
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", "profile");

        try {
            // API call
            const res = await fetch("/api/imagekit/upload", {
                method: "POST",
                body: formData,
            });

            // Parse the JSON response
            const data = await res.json();

            // Check response
            if (data?.url) {
                setAvatar(data?.url);
            }
        } finally {
            setUploading(false);
        }
    };

    // Handle submit
    const handleSubmit = async () => {
        // Define payload data
        const payloadData = {
            user_id: profileData?.id,
            first_name: firstName || profileData?.first_name,
            last_name: lastName || profileData?.last_name,
            phone: phone || profileData?.phone_number,
            avatar: avatar || profileData?.avatar
        };

        // Validation
        if (!payloadData.first_name || !payloadData.last_name || !payloadData.phone) {
            setError("* All fields are required.");
            return;
        }

        // Update state
        setFormLoading(true);

        try {
            // API call
            const res = await fetch("/api/auth/profile/update", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payloadData)
            });

            // Parse the JSON response
            const data = await res.json();

            // Check response
            if (data?.status) {
                setSuccess("Profile updated successfully");
            } else {
                setError(data.message || "Something went wrong");
            }
        } catch (error) {
            setError("Error occurred while updating profile. Please try again.");
        } finally {
            setFormLoading(false);
        }

        // Hide message after 5 seconds
        setTimeout(() => {
            setError("");
            setSuccess("");
        }, 5000);
    };

    return (
        <div>
            <h1 className="text-lg font-semibold mb-6">Update Profile</h1>
            <div className="flex items-center gap-6 mb-8">
                <div className="w-24 h-24 rounded-full overflow-hidden border">
                    <Image
                        src={avatar || profileData?.avatar || "https://ik.imagekit.io/288weifiq/nextjs/avatar.png"}
                        alt="Profile"
                        width={96}
                        height={96}
                        className="object-cover"
                    />
                </div>
                <input
                    type="file"
                    accept="image/*"
                    id="avatarInput"
                    className="hidden"
                    onChange={handleAvatarChange}
                />
                <button
                    type="button"
                    disabled={uploading}
                    onClick={() => document.getElementById("avatarInput")?.click()}
                    className="flex items-center gap-2 text-sm px-4 py-2 border border-black bg-black text-white rounded-sm cursor-pointer hover:bg-black/90 disabled:cursor-not-allowed disabled:bg-black/50"
                >
                    {uploading && <Loader2 className="w-4 h-4 animate-spin" />}
                    {!uploading && <UploadCloudIcon className="w-4 h-4" />}
                    Change Avatar
                </button>
            </div>
            <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">First Name</label>
                        <input
                            type="text"
                            defaultValue={firstName || profileData?.first_name}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="First Name"
                            className="w-full border rounded-sm px-4 py-2 text-sm focus:ring focus:ring-black/10"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Last Name</label>
                        <input
                            type="text"
                            defaultValue={lastName || profileData?.last_name}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Last Name"
                            className="w-full border rounded-sm px-4 py-2 text-sm focus:ring focus:ring-black/10"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Email Address (Can't be changed)</label>
                    <input
                        type="email"
                        defaultValue={profileData?.email}
                        placeholder="Your Email Address"
                        disabled
                        className="w-full border rounded-sm bg-gray-100 cursor-not-allowed px-4 py-2 text-sm focus:ring focus:ring-black/10"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Phone Number</label>
                    <input
                        type="text"
                        defaultValue={phone || profileData?.phone_number}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Your Phone Number"
                        className="w-full border rounded-sm px-4 py-2 text-sm focus:ring focus:ring-black/10"
                    />
                </div>

                {success && <p className="text-green-500 text-sm md:text-base">{success}</p>}

                {error && <p className="text-red-500 text-sm md:text-base">{error}</p>}

                <button
                    onClick={handleSubmit}
                    disabled={uploading || formLoading}
                    className="flex items-center justify-center gap-2 bg-black text-white px-6 py-2 rounded-sm text-sm cursor-pointer hover:bg-black/90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {formLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                    {!formLoading && <CheckCircle className="w-4 h-4" />}
                    Save Changes
                </button>
            </div>
        </div>
    );
}

function CoverSection() {
    return (
        <div>
            <h1 className="text-lg font-semibold mb-4">Cover Image</h1>
            <p className="text-sm text-gray-600 mb-4">
                Upload a cover image for your public profile.
            </p>
            <input type="file" className="border rounded-md p-2 text-sm" />
        </div>
    );
}

function SocialSection() {
    return (
        <div>
            <h1 className="text-lg font-semibold mb-4">Social Media</h1>
            <div className="space-y-4">
                <Input label="Facebook URL" />
                <Input label="Instagram URL" />
                <Input label="LinkedIn URL" />
            </div>
        </div>
    );
}

/* ---------------- Input Component ---------------- */

function Input({
    label,
    value = "",
    type = "text",
}: {
    label: string;
    value?: string;
    type?: string;
}) {
    return (
        <div>
            <label className="block text-sm font-medium mb-1">
                {label}
            </label>
            <input
                type={type}
                defaultValue={value}
                className="w-full border rounded-md px-4 py-2 text-sm focus:ring focus:ring-black/10"
            />
        </div>
    );
}
