"use client";

import { useState } from "react";

interface Props {
    token: string;
    open: boolean;
    openChange: (open: boolean) => void;
}

export default function InvitePartnersModal({ token, open, openChange }: Props) {
    // Define state
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    // If not open, don't render
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[999] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="relative w-full max-w-md rounded-3xl overflow-hidden shadow-2xl">
                <div className="p-[1px] bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500 rounded-3xl">
                    <div className="bg-white rounded-3xl p-6 md:p-8 space-y-6 relative">
                        <button
                            onClick={() => openChange(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-black text-lg cursor-pointer transition"
                        >
                            ✕
                        </button>
                        <div className="text-center space-y-2">
                            <h2 className="text-2xl md:text-3xl font-semibold text-black">
                                Invite Your Travel Partner
                            </h2>

                            <p className="text-sm text-black">
                                Send them their Traveler DNA access + earn your $25 reward
                            </p>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="text-base text-black">Full Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter partner name"
                                    className="w-full mt-1 px-4 py-2 text-base rounded-xl border focus:ring-1 focus:ring-black outline-none"
                                />
                            </div>
                            <div>
                                <label className="text-base text-black">Email Address</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter partner email"
                                    className="w-full mt-1 px-4 py-2 text-base rounded-xl border focus:ring-1 focus:ring-black outline-none"
                                />
                            </div>
                        </div>
                        <button
                            className="w-full px-3 py-2 text-base rounded-full bg-black text-white hover:bg-yellow-400 hover:text-black transition font-medium cursor-pointer"
                        >
                            Send Invitation
                        </button>

                        <p className="text-sm text-black text-center">
                            They’ll receive $25 credit. You earn $25 when they complete their profile.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}