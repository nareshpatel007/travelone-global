"use client";

export default function WhoWeAreSection() {
    return (
        <section className="bg-[#FFF9EE] py-12">
            <div className="max-w-7xl mx-auto px-5 md:px-0 space-y-12">
                {/* HEADING */}
                <div className="max-w-3xl mx-auto text-center space-y-4">
                    <div className="space-y-1">
                        <h2 className="text-3xl md:text-6xl leading-tight font-normal">
                            The Methodology:<br />The 30-Marker Persona
                        </h2>
                    </div>

                    <p className="text-black text-base sm:text-lg leading-relaxed">
                        At the heart of our platform is the 30-Marker Persona, a proprietary data framework that maps your travel DNA across three distinct dimensions:
                    </p>
                </div>

                {/* TWO-PART LAYOUT */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                    <div className="bg-white border border-black p-8 md:p-10 text-center md:text-left space-y-4">
                        <h3 className="text-black text-md md:text-xl font-medium">
                            Core Identity (The "Who")
                        </h3>

                        <p className="text-black text-base leading-relaxed">
                            <b>Values & Purpose:</b> Why do you travel? (Restoration, Adventure, Education, Status).
                        </p>
                        
                        <p className="text-black text-base leading-relaxed">
                            <b>Pace & Rhythm:</b> Are you an "Every Second Counts" explorer or a "Slow Living" wanderer?
                        </p>
                        
                        <p className="text-black text-base leading-relaxed">
                            <b>Social Architecture:</b> The specific needs of your travel circle, from solo privacy to multi-generational harmony.
                        </p>
                    </div>
                    
                    <div className="bg-white border border-black p-8 md:p-10 text-center md:text-left space-y-4">
                        <h3 className="text-black text-md md:text-xl font-medium">
                            Sensory & Aesthetic (The "Vibe")
                        </h3>

                        <p className="text-black text-base leading-relaxed">
                            <b>Environmental Preferences:</b> Architecture style, lighting, soundscapes, and proximity to nature.
                        </p>
                        
                        <p className="text-black text-base leading-relaxed">
                            <b>Culinary Narrative:</b> Beyond allergies—understanding your relationship with food as an experience.
                        </p>
                    </div>
                    
                    <div className="bg-white border border-black p-8 md:p-10 text-center md:text-left space-y-4">
                        <h3 className="text-black text-md md:text-xl font-medium">
                            Logistics & Security (The "How")
                        </h3>

                        <p className="text-black text-base leading-relaxed">
                            <b>The Non-Negotiables:</b> Your specific requirements for transit, connectivity, and physical accessibility.
                        </p>
                        
                        <p className="text-black text-base leading-relaxed">
                            <b>Risk Profile:</b> Your comfort level with off-the-beaten-path discovery versus structured safety.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
