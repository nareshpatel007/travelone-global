'use client'

import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import Image from 'next/image';
import FooterCurveSection from '../home/footer-curve-section';

export default function AdsLandingFooter() {
    // Define state
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            setIsVisible(window.scrollY > 300);
        };
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            {/* TOP FOOTER */}
            <FooterCurveSection isAdsLanding={true} />

            {/* LOGOS */}
            <div className="flex flex-wrap items-center justify-center gap-10 bg-[#FFF9EE] py-10">
                <Image
                    src="/common/ASTA-Logo.png"
                    alt="ASTA"
                    width={160}
                    height={80}
                    draggable="false"
                    className="object-contain h-auto w-20 md:w-26"
                />
            </div>
            <footer className="bg-[#FFF9EE] text-black">
                <div className="max-w-7xl mx-auto px-6 space-y-12 pb-23">
                    <div className="text-center text-gray-900 text-sm md:text-base space-y-4">
                        <div className='w-full md:max-w-[1000px] mx-auto space-y-2'>
                            <p className='text-xs md:text-sm'>
                                Regulatory & Corporate Structure
                            </p>
                            {/* <p className='text-xs md:text-sm'>
                                TravelOne is a global orchestration platform. Technology and IP development are managed by TravelOne Technologies Inc. (Canada).
                            </p>
                            <p className='text-xs md:text-sm'>
                                All travel services and financial transactions are executed by TravelOne Global Travel Services LLC (USA).
                            </p> */}
                            <p className='text-xs md:text-sm'>
                                © {new Date().getFullYear()} Technology and IP owned by TravelOne Technologies, Inc. (Canada). | All Rights Reserved.
                            </p>
                            <p className='text-xs md:text-sm'>
                                Travel consultation, services, products and financial transactions executed by TravelOne Global Travel Services, LLC (USA).
                            </p>
                            <p className='text-xs md:text-sm'>
                                Hosted by Amazon Web Services, Inc. - Data Centre - USA - Northern Virginia
                            </p>
                        </div>
                    </div>
                </div>

                {/* SCROLL TO TOP */}
                {isVisible && (
                    <button
                        onClick={scrollToTop}
                        className="fixed bottom-22 right-4 md:right-8 bg-black text-white rounded-full p-3 shadow-lg hover:bg-gray-900 transition z-50 cursor-pointer"
                        aria-label="Scroll to top"
                    >
                        <ChevronUp size={24} />
                    </button>
                )}
            </footer>
        </>
    );
}