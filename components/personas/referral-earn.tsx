"use client";

import { useState } from "react";
import InvitePartnersModal from "./invitation-popup";

interface Props {
    token: string;
}

export default function ReferralEarn({ token }: Props) {
    // Define state
    const [openInviteModal, setOpenInviteModal] = useState(false);

    return (
        <>
            <div className="bg-[#FFF9EE] py-12 md:py-18 px-5 md:px-0">
                <div className="max-w-7xl mx-auto space-y-12">
                    <div className="relative px-6 md:px-10 flex items-center justify-center text-center">
                        <div className="max-w-5xl mx-auto space-y-5">
                            <h2 className="text-4xl md:text-6xl font-normal leading-tight tracking-tight text-black">
                                Don’t Travel Alone. <br className="hidden md:block" />
                                Architect Your Group Resonance.
                            </h2>

                            <p className="max-w-4xl md:max-w-3xl mx-auto text-base md:text-lg text-black leading-relaxed">
                                Most travel friction happens when individual DNAs clash. Now that you’ve discovered your profile, ensure your journey is in total harmony.
                                Invite your partner, family, or travel circle to discover their Traveler DNA.
                            </p>

                            <p className="text-sm md:text-base text-black leading-relaxed">
                                🎁 They receive an <span className="text-black font-semibold">$25 Synthesis Credit</span>
                                <br />
                                💰 You earn an additional <span className="text-black font-semibold">$25 Travel Credit</span> for every successful profile
                            </p>

                            <p className="text-black text-sm md:text-base max-w-2xl mx-auto">
                                Synchronize your group today and discover the one global “Hub” where everyone wins.
                            </p>

                            <div>
                                <button
                                    onClick={() => setOpenInviteModal(true)}
                                    className="px-8 py-2 rounded-full text-base font-medium bg-yellow-400 text-black hover:bg-black hover:text-white transition-all duration-300 shadow-lg hover:shadow-2xl cursor-pointer"
                                >
                                    Invite Your Travel Partners
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <InvitePartnersModal
                token={token}
                open={openInviteModal}
                openChange={setOpenInviteModal}
            />
        </>
    );
}