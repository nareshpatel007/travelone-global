"use client"

import { ChevronDown, ChevronUp } from "lucide-react"

interface FAQSectionProps {
    expandedFAQ: string | null
    setExpandedFAQ: (id: string | null) => void
}

const faqs = [
    {
        id: "payment-methods",
        question: "What payment methods are accepted on TravelOne?",
        answer:
            "We accept credit cards (Visa, Mastercard, American Express), debit cards, and bank transfers. All payments are securely processed.",
    },
    {
        id: "payment-secure",
        question: "Is my payment information secure?",
        answer:
            "Yes, all payment information is encrypted and processed through secure payment gateways complying with PCI DSS standards.",
    },
    {
        id: "refund-policy",
        question: "Can I get a refund if I need to cancel my booking?",
        answer:
            "Refund eligibility depends on your package terms. Most packages offer cancellation up to 30 days before travel with a refund.",
    },
    {
        id: "payment-error",
        question: "What if there is an error with my payment?",
        answer:
            "If you experience payment errors, our support team will investigate. Contact us within 24 hours to report issues.",
    },
    {
        id: "additional-fees",
        question: "Are there any additional fees or charges associated with my booking?",
        answer:
            "All fees are included in your quoted price. There are no hidden charges. Processing fees vary by payment method.",
    },
    {
        id: "payment-confirmation",
        question: "How can I confirm that my payment has been processed successfully?",
        answer:
            "You will receive a confirmation email with a booking reference number immediately after successful payment.",
    },
]

export default function FAQSection({ expandedFAQ, setExpandedFAQ }: FAQSectionProps) {
    return (
        <div className="border border-border rounded-sm overflow-hidden bg-card">
            <div className="px-6 py-4 border-b border-black bg-amber-50">
                <span className="text-xl font-semibold text-foreground">Frequently Asked Questions</span>
            </div>
            <div className="divide-y divide-border">
                {faqs.map((faq) => (
                    <button
                        key={faq.id}
                        onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                        className="w-full text-left px-6 py-4 hover:bg-secondary/20 transition-colors cursor-pointer"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <span className="font-medium text-foreground text-black flex-1 text-sm sm:text-base">
                                {faq.question}
                            </span>
                            <div className="flex-shrink-0 mt-1">
                                {expandedFAQ === faq.id ? (
                                    <ChevronUp size={18} className="text-muted-foreground" />
                                ) : (
                                    <ChevronDown size={18} className="text-muted-foreground" />
                                )}
                            </div>
                        </div>

                        {/* Answer */}
                        {expandedFAQ === faq.id && (
                            <p className="mt-3 text-base text-muted-foreground leading-relaxed">{faq.answer}</p>
                        )}
                    </button>
                ))}
            </div>
        </div>
    )
}
