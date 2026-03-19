"use client";

import { useEffect, useState } from "react";
import { Loader2, CheckCircle } from "lucide-react";

// Define props
interface Props {
    personaResult: any;
}

export default function FeedbackTab({ personaResult }: Props) {
    // Define state
    const [answers, setAnswers] = useState<any[]>([]);
    const [current, setCurrent] = useState(0);
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    // Get data
    const faqs = personaResult?.data?.faqs || [];
    const existingFeedback = personaResult?.feedback || [];

    // Define total
    const total = faqs.length;
    const faq = faqs[current];

    // Prefill existing feedback
    useEffect(() => {
        if (!faqs.length) return;
        const mappedAnswers = faqs.map((faq: any) => {
            // Check if question exists
            const existing = existingFeedback?.find(
                (f: any) => f.question === faq.question
            );

            return {
                question: faq.question,
                answer: existing?.answer || "",
            };
        });
        setAnswers(mappedAnswers);
    }, [personaResult]);

    // Select Answer
    const handleSelect = (value: string) => {
        const updated = [...answers];

        updated[current] = {
            question: faq.question,
            answer: value,
        };

        setAnswers(updated);
    };

    // Next Question
    const handleNext = () => {
        if (current < total - 1) {
            setCurrent((prev) => prev + 1);
        }
    };

    // Submit Feedback
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
                    token: personaResult?.token,
                    ratings: answers,
                }),
            });

            // Update state
            setSubmitted(true);
        } finally {
            // Update state
            setLoading(false);
        }
    };

    // If no faqs
    if (!faqs.length) return null;

    return (
        <div className="max-w-5xl mx-auto flex py-8 flex-col gap-8">
            {!submitted && <>
                {/* Existing Feedback */}
                {existingFeedback?.length > 0 && (
                    <div className="text-base text-green-600 text-center">
                        ✓ Feedback already submitted. You can edit it anytime.
                    </div>
                )}

                {/* Progress Dots */}
                <div className="flex justify-center gap-3">
                    {faqs.map((_: any, index: number) => (
                        <div
                            key={index}
                            className={`h-3 w-3 rounded-full transition-all duration-300 ${index === current ? "bg-black scale-125" : "bg-gray-300"
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
                    {/* Multiple Choice */}
                    {faq?.answers?.length > 0 && (
                        <>
                            {faq.answers.map((ans: string, index: number) => {
                                const selected = answers[current]?.answer === ans;

                                return (
                                    <button
                                        key={index}
                                        onClick={() => handleSelect(ans)}
                                        className={`text-left px-5 py-4 rounded-lg border transition-all duration-200 cursor-pointer ${selected
                                            ? "border-black shadow-md bg-white"
                                            : "border-gray-300 hover:border-black bg-white"
                                            }`}
                                    >
                                        {ans}
                                    </button>
                                );
                            })}
                        </>
                    )}

                    {/* Textarea */}
                    {faq?.answers?.length === 0 && (
                        <textarea
                            rows={5}
                            value={answers[current]?.answer || ""}
                            onChange={(e) => handleSelect(e.target.value)}
                            className="bg-white text-left px-5 py-4 rounded-lg text-base border border-gray-300 hover:border-black"
                            placeholder="Your answer..."
                        />
                    )}

                </div>

                {/* Buttons */}
                <div className="flex justify-center">
                    {current < total - 1 && (
                        <button
                            onClick={handleNext}
                            disabled={!answers[current]?.answer}
                            className="px-8 py-2 rounded bg-black text-white disabled:opacity-40 hover:bg-black/80 cursor-pointer"
                        >
                            Next →
                        </button>
                    )}

                    {current === total - 1 && (
                        <button
                            onClick={handleSubmit}
                            disabled={!answers[current]?.answer || loading}
                            className="flex items-center gap-2 px-7 py-2 rounded text-base bg-black text-white disabled:opacity-40 hover:bg-black/80 cursor-pointer"
                        >
                            {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                            {!loading && <CheckCircle className="w-5 h-5" />}
                            Submit Feedback
                        </button>
                    )}
                </div>
            </>}

            {/* Submitted Feedback */}
            {submitted && <div className="flex items-center flex-col gap-2 space-y-4">
                <div className="text-2xl md:text-3xl font-semibold">
                    Thank you for your feedback 🙌
                </div>
                <p className="text-base text-black">
                    Your response helps us improve the Traveler DNA experience.
                </p>
            </div>}
        </div>
    );
}