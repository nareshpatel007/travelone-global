"use client";

import CommonHeader from "@/components/header/common-header";
import CommonFooter from "@/components/footer/common-footer";
import { useEffect, useState } from "react";
import { CartItem } from "@/components/cart/cart-item";
import { CartSummary } from "@/components/cart/cart-summary";
import PageHeading from "@/components/common/page-heading";
import { ChevronDown, ShoppingBasket } from "lucide-react";
import { getCartData, getLoginCookie, isLoggedIn } from "@/lib/auth";

// Define benefits
const BENEFITS = [
    { icon: "⭐", text: "Based on 5M+ traveler reviews" },
    { icon: "💰", text: "Lowest price guarantee" },
    { icon: "🌍", text: "24/7 global support" },
];

// Define FAQs
const FAQs = [
    {
        question: "What is your cancellation policy?",
        answer: "We offer a 100% refund for cancellations made within 24 hours of booking. However, cancellations made more than 24 hours before the tour date will not be eligible for a refund.",
    },
    {
        question: "How long does shipping take?",
        answer: "Shipping times vary depending on your location and the shipping method you choose. We typically process orders within 3-5 business days.",
    },
    {
        question: "Can I modify my booking?",
        answer: "Yes, you can modify your booking by contacting our customer support team. Please note that modifications may be subject to additional charges.",
    },
    {
        question: "What payment methods do you accept?",
        answer: "We accept a wide range of payment methods, including credit/debit cards, PayPal, and bank transfers.",
    },
    {
        question: "Is my payment information secure?",
        answer: "Yes, we use industry-standard encryption to protect your payment information. We also comply with strict data privacy regulations to ensure the protection of customer information.",
    }
];

export default function CartPage() {
    // Define state
    const [ready, setReady] = useState(false);
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [cartData, setCartData] = useState<any>({});

    useEffect(() => {
        requestAnimationFrame(() => {
            setReady(true);
        });
    }, []);

    // Init data
    useEffect(() => {
        const controller = new AbortController();
        const loadInitData = async () => {
            try {
                // Get login data
                const is_logged_in = isLoggedIn();
                const user = getLoginCookie();

                // Get cart ID
                const cart_id = getCartData();

                // If non login and required cart ID
                if (!is_logged_in && !cart_id) {
                    return;
                }

                // Fetch the data
                const response = await fetch("/api/cart/view", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        user_id: is_logged_in ? user?.user_id : null,
                        cart_id
                    }),
                });

                // Parse the JSON response
                const data = await response.json();

                // Check response
                if (data?.status) {
                    // Update the state
                    setCartData(data?.data ?? {});
                }
            } catch (error: any) {
                if (error.name !== "AbortError") {
                    console.error("Failed to fetch cart data:", error);
                }
            } finally {
                setIsLoading(false);
            }
        };
        loadInitData();
        return () => controller.abort();
    }, []);

    return (
        <>
            {ready && <>
                <CommonHeader />

                <div className="max-w-7xl mx-auto px-5 md:px-0 py-6">
                    <PageHeading
                        main="Your Cart"
                        sub="Checkout your cart and start planning your trip."
                    />

                    {!isLoading && cartData && cartData.cart && <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
                        <div className="md:col-span-2 space-y-4">
                            {/* Cart item */}
                            <CartItem cartData={cartData} />

                            {/* For Mobile - Cart summary */}
                            <div className="block md:hidden">
                                <CartSummary cartData={cartData} />
                            </div>

                            {/* Benefits */}
                            <div className="grid grid-cols-3 gap-3">
                                {BENEFITS.map((item, idx) => (
                                    <div key={idx} className="bg-[#FFF9EE] rounded-md p-8 border-1 border-dashed border-black hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center space-y-3">
                                        <div className="text-md md:text-lg lg:text-xl text-teal-700">{item.icon}</div>
                                        <span className="font-semibold text-sm md:text-base block">{item.text}</span>
                                    </div>
                                ))}
                            </div>

                            {/* FAQs */}
                            <div className="rounded-md border border-black bg-card p-5 md:p-6 space-y-5">
                                <span className="text-lg font-semibold block">Frequently Asked Questions</span>
                                <div className="space-y-3">
                                    {FAQs.map((item, index) => (
                                        <div key={index}>
                                            <button
                                                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                                                className="w-full p-4 flex items-center justify-between border border-gray-200 transition-colors duration-200 text-left group hover:bg-gray-100 cursor-pointer"
                                            >
                                                <span className="text-sm md:text-base font-medium text-black pr-4 flex-1 group-hover:text-[#1E1E1E] block">
                                                    {item?.question}
                                                </span>
                                                <ChevronDown
                                                    size={24}
                                                    className={`text-black flex-shrink-0 transition-transform duration-300 ${expandedIndex === index ? "rotate-180" : ""
                                                        }`}
                                                />
                                            </button>
                                            {expandedIndex === index && (
                                                <div className="p-4 border border-gray-200 animate-in fade-in slide-in-from-top-2 duration-300">
                                                    <p className="text-black leading-relaxed text-sm md:text-base">{item?.answer}</p>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="hidden md:block md:col-span-1">
                            <CartSummary cartData={cartData} />
                        </div>
                    </div>}

                    {isLoading && <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                        {Array.from({ length: 2 }).map((_, index) => (
                            <div key={index} className="animate-pulse bg-gray-200 rounded-lg h-48 md:h-64"></div>
                        ))}
                    </div>}

                    {!isLoading && !cartData.cart && <div className="max-w-4xl mx-auto px-4 md:px-8 py-20 text-center space-y-5">
                        <div className="flex items-center justify-center">
                            <ShoppingBasket
                                className="text-[#ef2853] opacity-15"
                                size={120}
                            />
                        </div>

                        <h2 className="text-3xl md:text-4xl font-medium text-black">
                            Your cart is empty
                        </h2>

                        <p className="text-base md:text-lg text-black max-w-2xl mx-auto">
                            Add tour to your cart to start planning your perfect trip.
                        </p>
                    </div>}
                </div>

                <CommonFooter />
            </>}
        </>
    );
}
