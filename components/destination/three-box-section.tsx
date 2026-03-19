"use client";

// Define inferface
interface Props {
    pageData: any;
}

export default function ThreeBoxSection({ pageData }: Props) {
    // Validation
    if (!pageData?.single?.extra_data) return null;

    return (
        <section className="max-w-7xl mx-auto px-5 md:px-0 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl overflow-hidden shadow-lg p-6 space-y-4">
                    <h3 className="text-black text-2xl font-semibold">
                        When to visit
                    </h3>
                    <p className="text-black text-base leading-relaxed">
                        {pageData?.single?.extra_data?.when_to_visit}
                    </p>
                </div>
                <div className="bg-white rounded-xl overflow-hidden shadow-lg p-6 space-y-4">
                    <h3 className="text-black text-2xl font-semibold">
                        Getting around
                    </h3>
                    <p className="text-black text-base leading-relaxed">
                        {pageData?.single?.extra_data?.getting_around}
                    </p>
                </div>
                <div className="bg-white rounded-xl overflow-hidden shadow-lg p-6 space-y-4">
                    <h3 className="text-black text-2xl font-semibold">
                        Traveler tips
                    </h3>
                    <p className="text-black text-base leading-relaxed">
                        {pageData?.single?.extra_data?.traveler_tips}
                    </p>
                </div>
            </div>
        </section>
    );
}