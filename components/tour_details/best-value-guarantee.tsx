"use client"

// Define benefits
const BENEFITS = [
    { icon: "✓", title: "Free Cancellation", desc: "Cancel up to 60 days before" },
    { icon: "✓", title: "Reserve with a deposit", desc: "Book your tour with a deposit" },
    { icon: "✓", title: "Lowest price guarantee", desc: "We guarantee the lowest price" },
    { icon: "✓", title: "Expert Guides", desc: "Experienced professionals with years of experience" },
];

export default function BestValueGuarantee() {
    return (
        <div className="bg-[#FFF9EE] py-12 px-5 md:px-0">
            <div className="max-w-7xl mx-auto space-y-12">
                <div className="text-center space-y-1">
                    <h3 className="text-black text-3xl md:text-6xl leading-tight font-normal">
                        Best Value Guarantee
                    </h3>
                    <span className="text-sm md:text-lg text-black">
                        Your satisfaction is our priority
                    </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-6">
                    {BENEFITS.map((item, idx) => (
                        <div key={idx} className="bg-white rounded-2xl p-4 md:p-8 border-2 border-dashed border-black hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center">
                            <div className="hidden md:block text-md md:text-lg lg:text-xl mb-3 text-teal-700">{item.icon}</div>
                            <span className="font-semibold block mb-2">{item.title}</span>
                            <p className="text-sm md:text-base text-gray-600">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
