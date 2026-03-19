import { Globe, Headphones, Heart, Shield } from "lucide-react";

// Define array
const values = [
    {
        icon: Globe,
        title: "Global Reach",
        description: "We connect travelers with local experiences in destinations around the world.",
    },
    {
        icon: Shield,
        title: "Trust & Safety",
        description: "Every experience is vetted for quality and safety to ensure peace of mind.",
    },
    {
        icon: Heart,
        title: "Passion for Travel",
        description: "We believe travel has the power to transform lives and create lasting memories.",
    },
    {
        icon: Headphones,
        title: "24/7 Support",
        description: "Our dedicated team is always available to help you before, during, and after your trip.",
    },
]

export default function OurValues() {
    return (
        <div className="bg-gray-100 py-12 md:py-16 px-8">
            <div className="max-w-7xl mx-auto text-center">
                <span className="text-2xl md:text-3xl font-bold !text-gray-900 !block !mb-8 text-center">Our Values</span>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {values.map((value) => (
                        <div key={value.title} className="!bg-white !rounded-xl !p-6 !text-center">
                            <div className="w-14 h-14 !bg-[#ffc765]/10 !rounded-full !flex !items-center !justify-center !mx-auto !mb-4">
                                <value.icon className="h-7 w-7 text-[#ffa200]" />
                            </div>
                            <span className="font-semibold text-gray-900 !block !mb-2">{value.title}</span>
                            <span className="text-sm text-gray-600">{value.description}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
