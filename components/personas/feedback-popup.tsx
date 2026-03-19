"use client";

import QuestionHeading from "@/components/plan_your_trip/common/questionHeading";
import { CheckCircle, Loader2, X } from "lucide-react";
import { useState } from "react";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    token: string;
    faqs: any[];
}

export function FeedbackPopup({ open, onOpenChange, token, faqs }: Props) {
    // If not open
    if (!open) return null;

    // Handle close
    const handleClose = () => {
        onOpenChange(false);
    };

    // Define state
    const [current, setCurrent] = useState(0);
    const [answers, setAnswers] = useState<Record<number, { question: string; answer: string }>>({});
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    // Define total questions
    const total = faqs.length;

    // Handle select
    const handleSelect = (answer: string) => {
        const question = faqs[current].question;

        setAnswers({
            ...answers,
            [current]: {
                question,
                answer
            }
        });
    };

    // Handle next
    const handleNext = () => {
        if (!answers[current]) return;

        if (current < total - 1) {
            setCurrent(current + 1);
        }
    };

    // Handle submit
    const handleSubmit = async () => {
        // Update state
        setLoading(true);

        try {
            // API call
            await fetch("/api/plan_your_trip/persona-result/feedback", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token,
                    ratings: answers
                }),
            });

            // Update state
            setSubmitted(true);
        } finally {
            // Update state
            setLoading(false);
        }
    };

    // Get current question
    const faq = faqs[current];

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
            <div className="absolute inset-0 bg-black/40" onClick={handleClose} />
            <div className="relative w-full h-full bg-[#FFF6E5] overflow-auto">
                <button
                    onClick={() => onOpenChange(false)}
                    className="absolute top-6 right-6 z-10 p-2 rounded-full bg-[#FFC765] hover:bg-black hover:text-white cursor-pointer transition"
                >
                    <X className="h-5 w-5" />
                </button>
                <div className="min-h-full flex flex-col items-center md:justify-center px-4 md:px-8 py-10 md:py-20 space-y-2 md:space-y-5">
                    <div className="w-full max-w-4xl space-y-1 md:space-y-5">
                        <QuestionHeading
                            title="Your Feedback Matters"
                        />

                        <div className="border border-[#2F5D50] rounded-sm p-8 space-y-7 bg-white/60">
                            {!submitted && <>
                                {/* Progress Dots */}
                                <div className="flex justify-center gap-3">
                                    {faqs.map((_: any, index: number) => (
                                        <div
                                            key={index}
                                            className={`h-3 w-3 rounded-full transition-all duration-300
                                ${index === current
                                                    ? "bg-black scale-125"
                                                    : "bg-gray-300"
                                                }`}
                                        />
                                    ))}
                                </div>

                                {/* Question */}
                                <div className="text-center text-lg md:text-2xl font-medium leading-snug">
                                    {faq.question}
                                </div>

                                {/* Answers */}
                                <div className="grid gap-4">
                                    {faq?.answers?.length > 0 ? <>
                                        {faq?.answers && faq?.answers.map((ans: string, index: number) => {
                                            const selected = answers[current]?.answer === ans;
                                            return (
                                                <button
                                                    key={index}
                                                    onClick={() => handleSelect(ans)}
                                                    className={`bg-white text-left px-5 py-4 rounded-lg text-base border transition-all duration-200 cursor-pointer ${selected ? "border-black shadow-md" : "border-gray-300 hover:border-black hover:bg-white"}`}
                                                >
                                                    {ans}
                                                </button>
                                            );
                                        })}
                                    </> : <textarea
                                        rows={5}
                                        onChange={(e) => handleSelect(e.target.value)}
                                        className="bg-white text-left px-5 py-4 rounded-lg text-base border border-gray-300 hover:border-black hover:bg-white"
                                        placeholder="Your Answer"
                                    />}
                                </div>

                                {/* Buttons */}
                                <div className="flex justify-center">
                                    {current < total - 1 && (
                                        <button
                                            onClick={handleNext}
                                            disabled={!answers[current]}
                                            className="px-8 py-2 rounded bg-black text-white disabled:opacity-40 hover:bg-black/80 cursor-pointer"
                                        >
                                            Next →
                                        </button>
                                    )}

                                    {current === total - 1 && (
                                        <button
                                            onClick={handleSubmit}
                                            disabled={!answers[current] || loading}
                                            className="flex items-center gap-2 px-8 py-2 rounded bg-black text-white disabled:opacity-40 hover:bg-black/80 cursor-pointer"
                                        >
                                            {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                                            {!loading && <CheckCircle className="w-5 h-5" />}
                                            Submit Feedback
                                        </button>
                                    )}
                                </div>
                            </>}

                            {submitted && <div className="flex items-center flex-col gap-2 space-y-4">
                                <div className="text-3xl md:text-4xl font-semibold">
                                    Thank you for your feedback 🙌
                                </div>
                                <p className="text-base text-black">
                                    Your response helps us improve the Traveler DNA experience.
                                </p>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
