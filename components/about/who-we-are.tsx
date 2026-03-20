export default function WhoWeAreSection() {
    return (
        <section className="bg-[#FFF9EE] py-12">
            <div className="max-w-7xl mx-auto px-5 md:px-0 space-y-12">
                <div className="max-w-3xl mx-auto text-center space-y-4">
                    <div className="space-y-1">
                        <h2 className="text-3xl md:text-6xl leading-tight font-normal">
                            Who We Are:<br />A Global Partnership of Intelligence and Service
                        </h2>
                    </div>
                    <p className="text-black text-base sm:text-lg leading-relaxed">
                        TravelOne represents a strategic collaboration between world-class data architecture and premier travel fulfillment.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    {/* CANADA */}
                    <div className="bg-white border border-black p-8 md:p-10 text-center md:text-left space-y-4">
                        <h3 className="text-black text-md md:text-xl font-medium">
                            The Intelligence - Technology & Architecture
                        </h3>

                        <p className="text-black text-base font-semibold">
                            TravelOne Technologies Inc. (Canada)
                        </p>

                        <p className="text-black text-base leading-relaxed">
                            This Toronto-based B2B Innovation Hub architects the proprietary data models and orchestration logic for the global platform. As a dedicated technology provider, this entity does not engage in travel sales, counseling, or consumer bookings. It serves as the analytical foundation for the TravelOne brand worldwide.
                        </p>
                    </div>
                    
                    {/* USA */}
                    <div className="bg-white border border-black p-8 md:p-10 text-center md:text-left space-y-4">
                        <h3 className="text-black text-md md:text-xl font-medium">
                            The Service - Fulfilment & Operations
                        </h3>

                        <p className="text-black text-base font-semibold">
                            TravelOne Global Travel Services LLC (USA)
                        </p>

                        <p className="text-black text-base leading-relaxed">
                            Operating as the exclusive Merchant of Record (MoR), this U.S. entity manages all travel fulfillment, financial transactions, and operational liability. It is the single point of accountability for travelers in the U.S. and international markets.
                        </p>
                        
                        <p className="text-black text-base leading-relaxed">
                            (Note: TravelOne Global Travel Services LLC (USA) does not market to or provide travel services to residents of Ontario, Canada.)
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
