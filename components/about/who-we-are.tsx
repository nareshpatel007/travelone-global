"use client";

export default function WhoWeAreSection() {
    return (
        <section className="bg-[#FFF9EE] py-12">
            <div className="max-w-7xl mx-auto px-5 md:px-0 space-y-12">
                <div className="max-w-3xl mx-auto text-center space-y-4">
                    <div className="space-y-1">
                        <h2 className="text-3xl md:text-6xl leading-tight font-normal">
                            Who We Are:<br />An American Powerhouse
                        </h2>
                    </div>
                    <p className="text-black text-base sm:text-lg leading-relaxed">
                        TravelOne operates as a sophisticated synergy between intelligence and execution.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-1 gap-8 md:gap-12">
                    {/* CANADA */}
                    <div className="bg-white border border-black p-8 md:p-10 text-center md:text-left space-y-4">
                        <h3 className="text-black text-md md:text-xl font-medium">
                            The Intelligence
                        </h3>

                        <p className="text-black text-base font-semibold">
                            TravelOne Technologies Inc. (Canada)
                        </p>

                        <p className="text-black text-base leading-relaxed">
                            Operating as our global B2B Technology Hub, our Toronto-based team architects the proprietary data models and orchestration logic that power the entire ecosystem. This specialized division functions exclusively as a technology provider; it does not engage in travel counseling, sales, or bookings for the public. It is the "Brain" of TravelOne, driving innovation for our international partners.
                        </p>
                    </div>
                    
                    {/* <div className="bg-white border border-black p-8 md:p-10 text-center md:text-left space-y-4">
                        <h3 className="text-black text-md md:text-xl font-medium">
                            The Intelligence
                        </h3>

                        <p className="text-black text-base font-semibold">TravelOne Technologies Inc. - Canada</p>

                        <p className="text-black text-base leading-relaxed">
                            Based in our R&D hub in Toronto, our technology team architects the proprietary data models and orchestration logic that power the entire ecosystem. This is the "Brain" of TravelOne.
                        </p>
                    </div> */}

                    {/* USA */}
                    <div className="bg-white border border-black p-8 md:p-10 text-center md:text-left space-y-4">
                        <h3 className="text-black text-md md:text-xl font-medium">
                            The Service
                        </h3>

                        <p className="text-black text-base font-semibold">
                            TravelOne Global Travel Services LLC (USA)
                        </p>

                        <p className="text-black text-base leading-relaxed">
                            Headquartered in the United States, our service arm acts as the exclusive Merchant of Record (MoR) for all travel transactions. We assume full financial and operational liability for your journey, providing the single point of accountability for U.S. and international travelers. Note: TravelOne Global Travel Services LLC (USA) does not market to or provide travel services to residents of Ontario, Canada.
                        </p>
                    </div>
                    
                    {/* <div className="bg-white border border-black p-8 md:p-10 text-center md:text-left space-y-4">
                        <h3 className="text-black text-md md:text-xl font-medium">
                            The Service
                        </h3>

                        <p className="text-black text-base font-semibold">
                            TravelOne Global Travel Services LLC. - USA
                        </p>

                        <p className="text-black text-base leading-relaxed">
                            Headquartered in the United States, our service arm acts as the Merchant of Record (MoR). We assume full financial and operational liability for your journey, providing the single point of accountability the modern traveler deserves.
                        </p>
                    </div> */}
                </div>
            </div>
        </section>
    );
}
