// Define list
const checkList: any = [
    {
        title: "Memory",
        chatgpt: "Forgets you once the chat ends.",
        travelone: "Evolves with your Traveler DNA over time.",
    },
    {
        title: "The 'Vibe'",
        chatgpt: "Guesses based on generic popularity.",
        travelone: "Matches your specific Soul Mind.",
    },
    {
        title: "Integrity",
        chatgpt: "Often hides Promoted/Paid traps in results.",
        travelone: "No hidden agendas. Just DNA-matched gems.",
    },
    {
        title: "The Result",
        chatgpt: "Static, unverified text blocks based on the internet info.",
        travelone: "A Dynamic Portfolio vetted by our global system.",
    }
];

export default function TheRealityCheck() {
    return (
        <div className="bg-[#FFF9EE]">
            <div className="max-w-7xl mx-auto px-5 md:px-0 py-12 space-y-12">
                <div className="text-center space-y-2">
                    <h2 className="text-black text-3xl md:text-6xl leading-tight font-normal">
                        Prompting is fun. Precision is better.
                    </h2>
                    <span className="flex max-w-3xl mx-auto text-black text-md">
                        ChatGPT and Gemini are great for "Day 1, Day 2" text blocks. TravelOne is the architectural engine that actually understands why you travel.
                    </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {checkList.map((item: any, idx: number) => (
                        <div key={idx} className="bg-white rounded-md shadow-sm p-7 border border-gray-200">
                            <h3 className="text-xl font-semibold mb-5">
                                {item.title}
                            </h3>
                            <div className="space-y-4">
                                <div className="p-4 rounded-lg bg-red-50 border border-red-100">
                                    <p className="text-sm text-black italic mb-1">ChatGPT & Gemini</p>
                                    <p className="font-medium">
                                        {item.chatgpt}
                                    </p>
                                </div>
                                <div className="p-4 rounded-lg bg-green-50 border border-green-100">
                                    <p className="text-sm text-black italic mb-1">TravelOne DNA</p>
                                    <p className="font-medium">
                                        {item.travelone}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="text-center">
                    <span className="flex max-w-3xl mx-auto text-black text-base md:text-2xl">
                        The Takeaway: Stop settling for a "hallucinated" itinerary. Get a travel experience that mirrors your persona.
                    </span>
                </div>
            </div>
        </div>
    );
}
