"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";

import "swiper/css";
import "swiper/css/navigation";

// Define images
const mobileImages = [
    "https://ik.imagekit.io/288weifiq/nextjs/japan/fuji-mountain-cherry-blossoms-spring-japan_335224-181.jpg",
    "https://ik.imagekit.io/288weifiq/nextjs/japan/golden-pavilion-kinkakuji-temple-autumn-kyoto-japan_335224-52.avif",
    "https://ik.imagekit.io/288weifiq/nextjs/japan/cherry-blossoms-fuji-mountain-spring-sunrise-shizuoka-japan_335224-110.jpg",
    "https://ik.imagekit.io/288weifiq/nextjs/indonesia/near-cultural-village-ubud-is-area-known-as-tegallalang-that-boasts-most-dramatic-terraced-rice-fields-all-bali_231208-1538.jpg",
    "https://ik.imagekit.io/288weifiq/nextjs/indonesia/young-woman-standing-temple-gates-lempuyang-luhur-temple-bali-indonesia-vintage-tone_335224-365.avif",
    "https://ik.imagekit.io/288weifiq/nextjs/indonesia/woman-standing-pond-with-colorful-fish-tirta-gangga-water-palace-bali-indonesia_335224-358.avif",
    "https://ik.imagekit.io/288weifiq/nextjs/vietnam/waterfall-clean-wet-outdoor-green-natural_1417-1361.avif",
    "https://ik.imagekit.io/288weifiq/nextjs/vietnam/city-water_1417-1902.avif",
    "https://ik.imagekit.io/288weifiq/nextjs/vietnam/beautiful-shot-kissing-rocks-ha-long-bay-vietnam_181624-22125.jpg",
    "https://ik.imagekit.io/288weifiq/nextjs/vietnam/sailboat-sea-evening-sunlight-beautiful-big-mountains-luxury-summer-adventure-active-vacation-mediterranean-sea-turkey_158595-6875.jpg",
    "https://ik.imagekit.io/288weifiq/nextjs/south-korea/gyeongbokgung-palace-night-seoul-korea_335224-351.jpg",
    "https://ik.imagekit.io/288weifiq/nextjs/south-korea/gyeongbokgung-palace-with-cherry-blossom-spring-seoul-korea_335224-389.jpg",
    "https://ik.imagekit.io/288weifiq/nextjs/south-korea/haedong-yonggungsa-temple-haeundae-sea-busan-buddhist-temple-busan-south-korea_335224-436.avif",
    "https://ik.imagekit.io/288weifiq/nextjs/south-korea/asian-woman-wearing-japanese-traditional-kimono-row-yellow-ginkgo-tree-autumn-autumn-park-tokyo-japan_335224-176.jpg",
];

export default function MobileSlider() {
    return (
        <div className="w-full overflow-hidden">
            <Swiper
                modules={[Autoplay]}
                loop
                freeMode
                speed={10000}
                autoplay={{
                    delay: 0,
                    disableOnInteraction: false,
                }}
                slidesPerView={1.3}
                spaceBetween={10}
                allowTouchMove={false}
                breakpoints={{
                    640: { slidesPerView: 2.3 }
                }}
                onSwiper={(swiper) => {
                    swiper.wrapperEl.style.transitionTimingFunction = "linear";
                }}
            >
                {mobileImages.map((item, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative h-[180px] overflow-hidden">
                            <Image
                                src={item}
                                alt="Image"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}