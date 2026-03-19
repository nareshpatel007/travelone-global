"use client";

import { useState } from "react";
import Image from "next/image";
import { CheckCircle, UploadCloudIcon } from "lucide-react";

// Define types
type TabKey = "profile" | "cover" | "social" | "password";

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
                        />
                        <SidebarItem
                            label="Change Password"
                            active={activeTab === "password"}
                            onClick={() => setActiveTab("password")}
                        /> */}
                    </nav>
                </aside>

                {/* RIGHT CONTENT */}
                <main className="p-6 md:p-6">
                    {activeTab === "profile" && <ProfileSection profileData={profileData} />}
                    {activeTab === "cover" && <CoverSection />}
                    {activeTab === "social" && <SocialSection />}
                    {activeTab === "password" && <PasswordSection />}
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

/* ---------------- Sections ---------------- */

function ProfileSection({ profileData }: Props) {
    // Define state
    const [firstName, setFirstName] = useState(profileData?.first_name || "");
    const [lastName, setLastName] = useState(profileData?.last_name || "");
    const [phone, setPhone] = useState(profileData?.phone || "");
    const [error, setError] = useState<string>("");

    // Handle submit
    const handleSubmit = async () => {
        // Validation
        if (!firstName || !lastName || !phone) {
            setError("Please fill in all the required fields.");
            return;
        }
    };

    return (
        <div>
            <h1 className="text-lg font-semibold mb-6">Update Profile</h1>
            <div className="flex items-center gap-6 mb-8">
                <div className="w-24 h-24 rounded-full overflow-hidden border">
                    <Image
                        src="https://ik.imagekit.io/288weifiq/nextjs/avatar.png"
                        alt="Profile"
                        width={96}
                        height={96}
                        className="object-cover"
                    />
                </div>
                <button className="flex items-center gap-2 text-sm px-4 py-2 border border-black bg-black text-white rounded-sm cursor-pointer hover:bg-black/90">
                    <UploadCloudIcon className="w-4 h-4" /> Change Avatar
                </button>
            </div>
            <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">First Name</label>
                        <input
                            type="text"
                            value={firstName || profileData?.first_name}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="First Name"
                            className="w-full border rounded-sm px-4 py-2 text-sm focus:ring focus:ring-black/10"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Last Name</label>
                        <input
                            type="text"
                            value={lastName || profileData?.last_name}
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
                        defaultValue={profileData?.email || ""}
                        placeholder="Your Email Address"
                        disabled
                        className="w-full border rounded-sm bg-gray-100 cursor-not-allowed px-4 py-2 text-sm focus:ring focus:ring-black/10"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Phone Number</label>
                    <input
                        type="text"
                        value={(phone || profileData?.phone) ?? ""}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Your Phone Number"
                        className="w-full border rounded-sm px-4 py-2 text-sm focus:ring focus:ring-black/10"
                    />
                </div>

                {error && <p className="text-red-500 text-sm md:text-base">{error}</p>}

                <button
                    onClick={handleSubmit}
                    className="flex items-center justify-center gap-2 bg-black text-white px-6 py-2 rounded-sm text-sm cursor-pointer hover:bg-black/90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <CheckCircle className="w-4 h-4" /> Save Changes
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

function PasswordSection() {
    return (
        <div>
            <h1 className="text-lg font-semibold mb-4">Change Password</h1>
            <div className="space-y-4 max-w-sm">
                <Input label="Current Password" type="password" />
                <Input label="New Password" type="password" />
                <Input label="Confirm Password" type="password" />
                <button className="bg-black text-white px-6 py-2 rounded-md text-sm">
                    Update Password
                </button>
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
