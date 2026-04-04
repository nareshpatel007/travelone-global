"use client";

import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { InitializePersonaModal } from "../plan_your_trip/initialize-persona";

export default function DnaHeader() {
    // Define state
    const [openMobileMenu, setOpenMobileMenu] = useState(false);
    const [initializePersonaModalOpen, setInitializePersonaModalOpen] = useState(false);

    // Handle Scroll
    const scrollToSection = (id: string) => {
        const el = document.getElementById(id);
        const headerOffset = 60;
        setOpenMobileMenu(false);
        if (el) {
            const elementPosition = el.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            });
        }
    };

    return (
        <div className="bg-white sticky top-0 border-b border-[#e7d4bb]/20 z-50">
            <header className="max-w-[1200px] mx-auto">
                <div className="px-5 md:px-0 h-20 md:h-18 flex items-center justify-between">
                    {/* LOGO */}
                    <Image
                        src="/common/travelone-logo.png"
                        alt="Logo"
                        width={160}
                        height={100}
                        className="w-40 md:w-36"
                        draggable="false"
                    />

                    {/* DESKTOP NAV (UNCHANGED) */}
                    <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-gray-900 font-dna-landing">
                        <button onClick={() => scrollToSection("whyTravelBroken")} className="hover:underline underline-offset-5 text-[#78350f] cursor-pointer">
                            Why Travel Is Broken
                        </button>
                        <button onClick={() => scrollToSection("intelligenceLayer")} className="hover:underline underline-offset-5 text-[#78350f] cursor-pointer">
                            How It Works
                        </button>
                        <button onClick={() => scrollToSection("travelerDnaMapping")} className="hover:underline underline-offset-5 text-[#78350f] cursor-pointer">
                            Traveler DNA
                        </button>
                        <button onClick={() => scrollToSection("founder")} className="hover:underline underline-offset-5 text-[#78350f] cursor-pointer">
                            Contact
                        </button>
                    </nav>

                    {/* RIGHT ACTIONS */}
                    <div className="flex items-center gap-5 md:gap-6">
                        <button
                            className="hidden md:flex bg-[#78350f] text-white text-sm tracking-[0.08em] px-6 py-2 rounded-md font-semibold hover:opacity-90 transition-all cursor-pointer font-dna-landing"
                            onClick={() => setInitializePersonaModalOpen(true)}
                        >
                            Decode Your Travel DNA →
                        </button>

                        <button className="lg:hidden" onClick={() => setOpenMobileMenu(true)}>
                            <Menu />
                        </button>
                    </div>
                </div>
            </header>

            {openMobileMenu && (
                <div className="fixed inset-0 z-[999] bg-white">
                    <div className="h-16 flex justify-between items-center px-4 border-b">
                        <span className="text-xl font-bold">Menu</span>
                        <button onClick={() => setOpenMobileMenu(false)}>
                            <X />
                        </button>
                    </div>

                    <nav className="flex flex-col gap-6 p-6 text-lg font-medium">
                        <button onClick={() => scrollToSection("whyTravelBroken")}>
                            Why Travel Is Broken
                        </button>

                        <button onClick={() => scrollToSection("intelligenceLayer")}>
                            How It Works
                        </button>

                        <button onClick={() => scrollToSection("travelerDnaMapping")}>
                            Traveler DNA
                        </button>

                        <button onClick={() => scrollToSection("founder")}>
                            Contact
                        </button>
                    </nav>
                </div>
            )}

            {/* Modal Popup */}
            <InitializePersonaModal
                open={initializePersonaModalOpen}
                onOpenChange={setInitializePersonaModalOpen}
            />
        </div>
    );
}

// Get query data
export const getQuery = (key: string, fallback = "") =>
    typeof window === "undefined"
        ? fallback
        : new URLSearchParams(window.location.search).get(key) ?? fallback;