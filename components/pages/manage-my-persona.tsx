"use client";

import CommonHeader from "@/components/header/common-header";
import CommonFooter from "@/components/footer/common-footer";
import { useEffect, useState } from "react";
import PageHeading from "@/components/common/page-heading";

export default function ManageMyPersonaPage() {
    // Define state
    const [ready, setReady] = useState(false);

    useEffect(() => {
        requestAnimationFrame(() => {
            setReady(true);
        });
    }, []);

    return (
        <>
            {ready && <>
                <CommonHeader />

                <div className="max-w-4xl mx-auto px-5 md:px-0 md:p-6 py-5 md:py-6">
                    <PageHeading main="Manage My Persona" />
                    <div className="space-y-10 mb-10">
                        <section className="space-y-4">
                            <h2 className="text-lg md:text-xl font-medium text-black">
                                1. Your Data, Your Sovereignty
                            </h2>
                            <p className="text-base font-normal text-black">
                                At <b>TravelOne</b>, we don’t just "collect data"—we empower you to curate your <b>Traveler Persona</b>. This is your unique digital DNA, a synthesis of your travel values, logistical non-negotiables, and aesthetic preferences. Unlike traditional platforms, we give you full transparency and control over this asset. Your Persona exists to make your travel effortless, and you hold the "<b>Master Key</b>."
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-lg md:text-xl font-medium text-black">
                                2. What’s Inside Your Persona?
                            </h2>
                            <p className="text-base font-normal text-black">
                                Your Persona is composed of three distinct layers of intelligence that our <b>Agentic AI</b> uses to orchestrate your journeys:
                            </p>
                            <ul className="space-y-2 list-inside">
                                <li className="text-base font-normal text-black list-disc">
                                    <b>Logistical Foundations:</b> Your baseline requirements, such as preferred seating (aisle vs. window), dietary restrictions, mobility needs, and loyalty program integration.
                                </li>
                                <li className="text-base font-normal text-black list-disc">
                                    <b>Behavioral Nuance:</b> Patterns our AI has identified from your past interactions—for example, a preference for "Boutique Heritage" hotels over "High-Rise Luxury," or a tendency to favor morning departures to maximize daylight in new cities.
                                </li>
                                <li className="text-base font-normal text-black list-disc">
                                    <b>Aesthetic & Value Alignment:</b> Your "<b>Local Soul</b>" score. Do you prioritize sustainability? Do you seek out high-adrenaline frontier experiences or quiet, spiritual retreats?
                                </li>
                            </ul>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-lg md:text-xl font-medium text-black">
                                3. Persona Dashboard Features
                            </h2>
                            <p className="text-base font-normal text-black">
                                Through your secure dashboard, you can interact with your travel DNA in real-time:
                            </p>
                            <ul className="space-y-2 list-inside">
                                <li className="text-base font-normal text-black list-disc">
                                    <b>The Persona Edit:</b> Update your "Non-Negotiables" at any time. If your travel style shifts from "Backcountry Expedition" to "Urban Collector," your AI will instantly pivot its future orchestration logic.
                                </li>
                                <li className="text-base font-normal text-black list-disc">
                                    <b>Persona Portability:</b> Request a secure export of your Persona metadata. We believe you should be able to take your travel preferences with you, even if you leave our platform.
                                </li>
                                <li className="text-base font-normal text-black list-disc">
                                    <b>The "Reset" Switch:</b> If you wish to start fresh, you can clear your behavioral history with one click, allowing the AI to re-learn your preferences from a clean slate.
                                </li>
                            </ul>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-lg md:text-xl font-medium text-black">
                                4. Bank-Grade Security (The Vault)
                            </h2>
                            <p className="text-base font-normal text-black">
                                Your Persona is hosted in a <b>Siloed Data Environment</b> managed by <b>TravelOne Canada</b>.
                            </p>
                            <ul className="space-y-2 list-inside">
                                <li className="text-base font-normal text-black list-disc">
                                    <b>Zero-Knowledge Encryption:</b> We use <b>AES-256</b> encryption. Our engineers cannot "see" your raw personal identity; the AI only interacts with the encrypted metadata needed to fulfill your travel requests.
                                </li>
                                <li className="text-base font-normal text-black list-disc">
                                    <b>No Third-Party Access:</b> We do not sell, rent, or lease your Persona to advertising networks. Your data stays within the TravelOne ecosystem, shielded by the legal protections of our <b>Merchant of Record</b>framework.
                                </li>
                            </ul>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-lg md:text-xl font-medium text-black">
                                5. AI Training Opt-In
                            </h2>
                            <p className="text-base font-normal text-black">
                                Our <b>Agentic AI</b> learns from your feedback. Every time you "Like" a suggested itinerary or provide feedback on a local guide in Kenya or Japan, your Persona becomes more accurate. You can choose how much "weight" the AI gives to recent trips versus long-term historical patterns.
                            </p>
                        </section>
                    </div>
                </div>

                <CommonFooter />
            </>}
        </>
    );
}
