"use client";
import Image from "next/image";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { useEffect, useState } from "react";
const BannerSlider = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTab, setIsTab] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsTab(window.innerWidth < 1250);
      setIsMobile(window.innerWidth < 800);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="banner-slider">
      <Swiper
        modules={[Navigation, Autoplay, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        // pagination={{ clickable: true }}
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        // onSwiper={(swiper) => console.log(swiper)}
        // onSlideChange={() => console.log("slide change")}
      >
        {bannerCollection?.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <div className="w-full">
                <Image
                  src={item?.imageUrl}
                  alt="banner"
                  width={1650}
                  height={850}
                  className="w-full h-auto"
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};
export default BannerSlider;
const bannerCollection = [
  {
    imageUrl: "/svg/home-banner-01.svg",
  },
  {
    imageUrl: "/svg/home-banner-02.svg",
  },
  {
    imageUrl: "/svg/home-banner-03.svg",
  },
];