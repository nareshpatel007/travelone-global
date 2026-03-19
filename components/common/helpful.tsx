"use client"

import { getLoginCookie, isLoggedIn } from "@/lib/auth";
import { getClientIp, getUserIp } from "@/lib/getClientIp";
import { get } from "http";
import { Loader2, ThumbsDown, ThumbsUp } from "lucide-react";
import { useState } from "react";

// Define props
interface Props {
    pageName?: string
    text?: string
}

export default function PageHelpful({ pageName = '', text = 'Was this page helpful?' }: Props) {
    // Define state
    const [helpful, setHelpful] = useState<boolean>(false);
    const [formLoading, setFormLoading] = useState<boolean>(false);
    const [feedbackText, setFeedbackText] = useState<string>("");
    const [chooseAction, setChooseAction] = useState<string>("");
    const [openFeedbackPopup, setOpenFeedbackPopup] = useState<boolean>(false);
    const [feedbackId, setFeedbackId] = useState<string>("");

    // Get login data
    const user = getLoginCookie();

    // Handle submit
    const handleSubmitReaction = async (type: string) => {
        try {
            // Get ip address
            const ipAddress = await getUserIp();

            // Call API
            const response = await fetch('/api/helpful', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_id: user?.user_id || "",
                    page_link: pageName,
                    vote: type,
                    ip_address: ipAddress
                })
            });

            // Convert to json
            const data = await response.json();

            // Check response
            if (data?.status) {
                setFeedbackId(data?.data?.feedback_id);
                setChooseAction(type);
            }

            // Update state
            setOpenFeedbackPopup(true);
        } catch (error) {
            console.error(error);
        }
    }

    // Handle submit
    const handleSubmitFeedback = async () => {
        // Validation
        if (feedbackText == "") {
            setHelpful(true);
            setFeedbackText("");
            setOpenFeedbackPopup(false);
            return;
        }

        try {
            // Update state
            setFormLoading(true);

            // Call API
            await fetch('/api/helpful/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    feedback_id: feedbackId,
                    feedback: feedbackText
                })
            });
        } finally {
            // Update state
            setHelpful(true);
            setFeedbackText("");
            setOpenFeedbackPopup(false);
        }
    }

    return (
        <>
            <div className="bg-[#d9eed8] p-5">
                <div className="max-w-7xl mx-auto">
                    <div className={`flex items-center justify-center text-center ${helpful ? ' gap-1' : 'gap-3'} md:gap-4`}>
                        <span className="text-black font-medium">{text}</span>
                        {helpful && <span className="text-green-600 font-medium">Thank you for your feedback!</span>}

                        {!helpful && <>
                            <div className="p-3 bg-white rounded-full cursor-pointer">
                                <ThumbsUp
                                    onClick={() => handleSubmitReaction('up')}
                                    className="h-5 w-5 text-black hover:text-green-500"
                                />
                            </div>
                            <div className="p-3 bg-white rounded-full cursor-pointer">
                                <ThumbsDown
                                    onClick={() => handleSubmitReaction('down')}
                                    className="h-5 w-5 text-black hover:text-red-500"
                                />
                            </div>
                        </>}
                    </div>
                </div>
            </div>

            {/* Feedback Popup */}
            {openFeedbackPopup && (
                <div className="fixed inset-0 z-500 flex items-center justify-center">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={() => setOpenFeedbackPopup(false)}
                    />

                    {/* Modal */}
                    <div className="relative bg-white w-[95%] sm:w-[500px] rounded-2xl shadow-2xl p-6 animate-in fade-in zoom-in-95 duration-200">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold flex items-center gap-2">
                                {chooseAction === "up" ? (
                                    <>
                                        👍 What did you like?
                                    </>
                                ) : (
                                    <>
                                        👎 Help us improve
                                    </>
                                )}
                            </h2>

                            <button
                                onClick={() => setOpenFeedbackPopup(false)}
                                className="text-gray-400 hover:text-black text-xl cursor-pointer"
                            >
                                ×
                            </button>
                        </div>

                        {/* Description */}
                        <p className="text-sm text-black mb-4">
                            {chooseAction === "up"
                                ? "We’re glad you found this helpful. Tell us what worked well."
                                : "Let us know what was missing or confusing so we can improve."}
                        </p>

                        {/* Textarea */}
                        <textarea
                            placeholder="Write your feedback here..."
                            value={feedbackText}
                            onChange={(e) => setFeedbackText(e.target.value)}
                            className="w-full border border-gray-300 rounded text-sm p-3 text-sm focus:outline-none focus:ring-1 focus:ring-black resize-none min-h-[120px]"
                        />

                        {/* Footer Buttons */}
                        <div className="flex justify-end gap-3 mt-5">
                            <button
                                onClick={() => {
                                    setOpenFeedbackPopup(false);
                                    setFeedbackText("");
                                    setFeedbackId("");
                                    setHelpful(true);
                                }}
                                disabled={formLoading}
                                className="px-4 py-2 cursor-pointer rounded border border-gray-300 hover:bg-gray-100 text-sm disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleSubmitFeedback}
                                disabled={formLoading}
                                className={`flex items-center gap-2 px-5 py-2 rounded text-white text-sm font-medium cursor-pointer transition-all disabled:cursor-not-allowed disabled:opacity-50 ${chooseAction === "up" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
                                    }`}
                            >
                                {formLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                                Submit Feedback
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
