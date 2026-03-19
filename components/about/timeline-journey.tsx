// Define array
const milestones = [
    {
        year: "2010–2021 | The Foundation",
        description: "Founder Bhavin Vora leads digital transformation for global institutional giants, mastering large-scale data architecture and retail logistics.",
    },
    {
        year: "2022 | Intelligence Hub (Canada)",
        description: 'Establishment of TravelOne Technologies Inc. (Canada). Launch of the Toronto-based B2B Research & Development center focused exclusively on architecting proprietary data models and Persona-Led Intelligence.'
    },
    {
        year: "2023 | The Blueprint",
        description: 'Initial research into the "Complexity Crisis." Conceptualization of a unified B2B orchestration layer designed to replace fragmented legacy booking systems with data-driven AI.',
    },
    {
        year: "2024 | Global Intelligence Scaling",
        description: "Development and testing of the 30-Marker Persona Engine, delivering advanced B2B technology assets to the travel industry worldwide.",
    },
    {
        year: "2026 | Service Activation (USA)",
        description: "Establishment of TravelOne Global Travel Services LLC (USA). This entity acts as the exclusive Merchant of Record (MoR) for international markets, providing secure financial and operational infrastructure for modern travellers.",
    }
];

// const milestones = [
//     {
//         year: "2010–2021 | The Foundation",
//         description: "Founder Bhavin Vora leads digital transformation for global giants, mastering large-scale data and retail logistics.",
//     },
//     {
//         year: "2023 | The Blueprint",
//         description: 'Initial research into the "Complexity Crisis." Conceptualization of a unified orchestration layer to replace fragmented booking.'
//     },
//     {
//         year: "2024 | Intelligence Hub",
//         description: "Establishment of TravelOne Technologies Inc. (Canada). Launch of the Toronto R&D center focused on architecting Persona-Led Intelligence.",
//     },
//     {
//         year: "2025 | Market Launch",
//         description: "Establishment of TravelOne Global Travel Services LLC (USA). Secured licensure as Merchant of Record (MoR) to provide bank-grade security.",
//     },
//     {
//         year: "2026 | Global Scale",
//         description: "Activation of Global Intelligence Zones across 20+ countries and launch of the 30-Marker Persona Engine.",
//     }
// ];

export default function TravelOneJourney() {
    return (
        <div className="bg-[#FFF9EE]">
            <div className="max-w-7xl mx-auto px-5 md:px-0 py-10 md:py-16 space-y-10">
                <div className="text-black text-center">
                    <h2 className="text-3xl md:text-6xl leading-tight font-normal">
                        The TravelOne Evolution
                    </h2>
                </div>
                <div className="relative">
                    <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-black" />
                    <div className="space-y-8">
                        {milestones.map((milestone, index) => (
                            <div
                                key={milestone.year}
                                className={`flex items-center gap-6 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                            >
                                <div className={`flex-1 ${index % 2 === 0 ? "text-right" : "text-left"}`}>
                                    <h3 className="text-black font-bold text-md md:text-xl">{milestone.year}</h3>
                                    <span className="text-sm md:text-base text-black">{milestone.description}</span>
                                </div>
                                <div className="w-4 h-4 bg-black rounded-full border-4 border-white shadow z-10" />
                                <div className="flex-1" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
