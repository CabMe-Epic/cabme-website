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

const BannerSlider = ({banner}: any) => {
 

  return (
    <div className="banner-slider w-[100%]">
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
        {banner?.map((item: any, index: number) => {
          return (
            <SwiperSlide key={index}>
              <div className="w-full">
                <Image
                  src={item?.url}
                  alt={item?.alt}
                  width={1650}
                  height={850}
                  
                  className="w-full h-auto rounded-xl"
                  priority
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
    imageUrl: "/png/banner/banner01.png",
  },
  {
    imageUrl: "/png/banner/banner02.png",
  },
  {
    imageUrl: "/png/banner/banner03.png",
  },
  {
    imageUrl: "/png/banner/banner04.png",
  },
  {
    imageUrl: "/png/banner/banner05.png",
  },
  
];
