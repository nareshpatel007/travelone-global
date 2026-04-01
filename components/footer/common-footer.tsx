'use client'

import { useState, useEffect } from 'react';
import { ChevronUp, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import FooterCurveSection from '../home/footer-curve-section';
import NewsletterSubscribe from './newsletter';
import CookieConsent from './cookie-consent';

// Define props
type Props = {
    isStickyShow?: boolean
};

export default function CommonFooter({ isStickyShow = false }: Props) {
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
            <FooterCurveSection />

            {/* LOGOS */}
            <div className="flex flex-wrap items-center justify-center gap-10 bg-[#FFF9EE] py-10">
                <Link href="/partnership/ASTA.pdf" target="_blank">
                    <Image
                        src="/common/ASTA-Logo.png"
                        alt="ASTA"
                        width={160}
                        height={80}
                        draggable="false"
                        className="object-contain h-auto w-20 md:w-26"
                    />
                </Link>
            </div>

            <footer className="bg-[#FFF9EE] text-black">
                <div className={`max-w-7xl mx-auto px-6 space-y-12 ${isStickyShow ? 'pb-12' : 'pb-5'}`}>
                    {/* Newsletter */}
                    <NewsletterSubscribe />

                    {/* Footer Menus */}
                    <div className="grid grid-cols-2 md:grid-cols-4 mb-0 md:mb-12 space-y-12 md:space-y-0">
                        <div className='space-y-6'>
                            <h3 className="font-semibold text-lg">Company</h3>
                            <ul className="space-y-3 text-base">
                                <li>
                                    <Link target='_blank' href="/about" className="hover:underline underline-offset-4">
                                        About
                                    </Link>
                                </li>
                                <li>
                                    <Link target='_blank' href="/contact" className="hover:underline underline-offset-4">
                                        Contact
                                    </Link>
                                </li>
                                <li>
                                    <Link target='_blank' href="/trust-center" className="hover:underline underline-offset-4">
                                        Trust Center
                                    </Link>
                                </li>
                                <li>
                                    <Link target='_blank' href="/blog" className="hover:underline underline-offset-4">
                                        Blog
                                    </Link>
                                </li>
                                {/* <li>
                                    <Link target='_blank' href="/intelligence" className="hover:underline underline-offset-4">
                                        Science of Persona-Led Travel
                                    </Link>
                                </li> */}
                                <li>
                                    <Link target='_blank' href="/careers" className="hover:underline underline-offset-4">
                                        Careers
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        
                        <div className='space-y-6'>
                            <h3 className="font-semibold text-lg">Collections</h3>
                            <ul className="space-y-3 text-base">
                                <li>
                                    <Link target='_blank' href="/country/japan" className="hover:underline underline-offset-4">Japan</Link>
                                </li>
                                <li>
                                    <Link target='_blank' href="/country/south-korea" className="hover:underline underline-offset-4">South Korea</Link>
                                </li>
                                <li>
                                    <Link target='_blank' href="/country/indonesia" className="hover:underline underline-offset-4">Indonesia</Link>
                                </li>
                                <li>
                                    <Link target='_blank' href="/country/vietnam" className="hover:underline underline-offset-4">Vietnam</Link>
                                </li>
                                <li>
                                    <Link target='_blank' href="/country/thailand" className="hover:underline underline-offset-4">Thailand</Link>
                                </li>
                            </ul>
                        </div>

                        {/* <div className='space-y-6'>
                            <h3 className="font-semibold text-lg">The Ecosystem</h3>
                            <ul className="space-y-3 text-base">
                                <li>
                                    <Link target='_blank' href="/" className="hover:underline underline-offset-4">
                                        Traveler Portal
                                    </Link>
                                </li>
                                <li>
                                    <Link target='_blank' href="/coming-soon" className="hover:underline underline-offset-4">
                                        Tech Hub
                                    </Link>
                                </li>
                                <li>
                                    <Link target='_blank' href="/coming-soon" className="hover:underline underline-offset-4">
                                        Travel Agent
                                    </Link>
                                </li>
                                <li>
                                    <Link target='_blank' href="/coming-soon" className="hover:underline underline-offset-4">
                                        Partner Login
                                    </Link>
                                </li>
                            </ul>
                        </div> */}

                        <div className='space-y-6'>
                            <h3 className="font-semibold text-lg">Operations</h3>
                            <ul className="space-y-3 text-base">
                                <li>
                                    <Link target='_blank' href="/operational-disclosure" className="hover:underline underline-offset-4">
                                        Operational Disclosure
                                    </Link>
                                </li>
                                <li>
                                    <Link target='_blank' href="/faqs" className="hover:underline underline-offset-4">
                                        FAQs
                                    </Link>
                                </li>
                                <li>
                                    <Link target='_blank' href="/legal/mors-security" className="hover:underline underline-offset-4">
                                        Merchant of Record Security
                                    </Link>
                                </li>
                                <li>
                                    <Link target='_blank' href="/legal/manage-travel-dna" className="hover:underline underline-offset-4">
                                        Manage My Travel DNA
                                    </Link>
                                </li>
                                <li>
                                    <Link target='_blank' href="/legal/accessibility-statement" className="hover:underline underline-offset-4">
                                        Accessibility Statement
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div className='space-y-6'>
                            <h3 className="font-semibold text-lg">Legal & Compliance</h3>
                            <ul className="space-y-3 text-base">
                                <li>
                                    <Link target='_blank' href="/legal/terms-service" className="hover:underline underline-offset-4">
                                        Terms of Service
                                    </Link>
                                </li>
                                <li>
                                    <Link target='_blank' href="/legal/privacy-policy" className="hover:underline underline-offset-4">
                                        Privacy & Data Asset Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link target='_blank' href="/legal/refund-policy" className="hover:underline underline-offset-4">
                                        Refund & Cancellation Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link target='_blank' href="/legal/ai-transparency-disclosure" className="hover:underline underline-offset-4">
                                        Ethical AI Disclosure
                                    </Link>
                                </li>
                                <li>
                                    <Link target='_blank' href="/legal/impact-statement" className="hover:underline underline-offset-4">
                                        Modern Slavery Statement
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* SOCIAL MEDIA */}
                    <div className="flex justify-center text-center gap-3">
                        <Link href="https://www.youtube.com/@traveloneio" target="_blank" rel="nofollow">
                            <button type="button" className="flex items-center justify-center bg-[#ee2852] hover:bg-[#ee2852]/90 text-white p-2 rounded-full transition-colors cursor-pointer">
                                <Youtube className="h-4 w-4" />
                            </button>
                        </Link>

                        <Link href="https://www.facebook.com/travelone.global.travel.services/" target="_blank" rel="nofollow">
                            <button type="button" className="flex items-center justify-center bg-[#0165E1] hover:bg-[#0165E1]/90 text-white p-2 rounded-full transition-colors cursor-pointer">
                                <Facebook className="h-4 w-4" />
                            </button>
                        </Link>

                        <Link href="https://www.instagram.com/travelone.global" target="_blank" rel="nofollow">
                            <button type="button" className="flex items-center justify-center bg-[#f78da7] hover:bg-[#f78da7]/90 text-white p-2 rounded-full transition-colors cursor-pointer">
                                <Instagram className="h-4 w-4" />
                            </button>
                        </Link>

                        {/* <Link href="https://www.linkedin.com/company/traveloneio/" target="_blank" rel="nofollow">
                            <button type="button" className="flex items-center justify-center bg-[#007aff] hover:bg-[#007aff]/90 text-white p-2 rounded-full transition-colors cursor-pointer">
                                <Linkedin className="h-4 w-4" />
                            </button>
                        </Link> */}
                    </div>

                    {/* COPYRIGHT */}
                    <div className={`text-center text-gray-900 text-sm md:text-base space-y-4 ${isStickyShow ? 'mb-0 sm:mb-10' : ''}`}>
                        <div className='w-full md:max-w-[1000px] mx-auto space-y-2'>
                            <p className='text-xs md:text-sm'>
                                Regulatory & Corporate Structure
                            </p>
                            <p className='text-xs md:text-sm'>
                                © {new Date().getFullYear()} TravelOne Global Travel Services, LLC (USA) | All Rights Reserved.
                            </p>
                            <p className='text-xs md:text-sm'>
                                Hosted by Amazon Web Services, Inc. - Data Centre - USA (Northern Virginia).
                            </p>
                            <p className='text-xs md:text-sm'>
                                Technology Powered By TravelOne Technologies, Inc. (Canada)
                            </p>
                            <p className='text-xs md:text-sm'>
                                All travel consultations, services, products, and financial transactions are executed exclusively by TravelOne Global Travel Services, LLC (USA)
                            </p>
                            <p className='text-xs md:text-sm'>
                                Notice: TravelOne Global Travel Services, LLC does not offer travel counseling or travel services to residents of Ontario, Canada.
                            </p>
                        </div>
                    </div>
                </div>

                {/* SCROLL TO TOP */}
                {isVisible && (
                    <button
                        onClick={scrollToTop}
                        className={`fixed ${isStickyShow ? 'bottom-10 md:bottom-20' : 'bottom-5 md:bottom-8'} right-4 md:right-8 bg-black text-white rounded-full p-3 shadow-lg hover:bg-gray-900 transition z-50 cursor-pointer`}
                        aria-label="Scroll to top"
                    >
                        <ChevronUp size={24} />
                    </button>
                )}

                {/* Cookie Popup */}
                <CookieConsent isStickyShow={isStickyShow} />
            </footer>
        </>
    );
}