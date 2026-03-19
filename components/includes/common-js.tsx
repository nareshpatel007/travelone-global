"use client";

import Script from "next/script";

export default function IncludeCommonJs() {
    return (
        <>
            {/* ================== CORE JS (ORDER MATTERS) ================== */}
            <Script src="/assets/js/jquery.min.js" strategy="beforeInteractive" />
            <Script src="/assets/js/jquery-migrate.min.js" strategy="beforeInteractive" />
            <Script src="/assets/js/jquery.blockUI.min.js" />
            <Script src="/assets/js/js.cookie.min.js" />
            <Script src="/assets/js/jquery.justifiedGallery.min.js" />

            <Script src="/assets/js/util.js" />
            <Script src="/assets/js/marker.js" />
            <Script src="/assets/js/common.js" />
            <Script src="/assets/js/main.js" />

            <Script src="/assets/js/wp-emoji-release.min.js" defer />

            {/* ================== THEME / PLUGINS ================== */}
            <Script src="/assets/js/hooks.min.js" />
            <Script src="/assets/js/i18n.min.js" />
            <Script src="/assets/js/main.min.js" />
            <Script src="/assets/js/perfect-scrollbar.jquery.min.js" />
            <Script src="/assets/js/hoverIntent.min.js" />
            <Script src="/assets/js/modernizr.js" />
            <Script src="/assets/js/gsap.min.js" />
            <Script src="/assets/js/ScrollTrigger.min.js" />
            <Script src="/assets/js/jquery.parallax-scroll.js" />

            <Script src="/assets/js/swiper.min.js" />
            <Script src="/assets/js/select2.full.min.js" />
            <Script src="/assets/js/fslightbox.min.js" />
            <Script src="/assets/js/isotope.pkgd.min.js" />
            <Script src="/assets/js/packery-mode.pkgd.min.js" />

            <Script src="/assets/js/elementor.min.js" />
            <Script src="/assets/js/frontend.min.js" />
            <Script src="/assets/js/main-home.js" />
            <Script src="/assets/js/wanderaway-core.min.js" />
        </>
    );
}
