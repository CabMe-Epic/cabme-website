"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

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
const ProductSlider = ({imageGallery, featuredImage}: any) => {
  // console.log("slider", slider);
  return (
    
      <div className="p-4 shadow-xl border border-[#f8f4f4] product-slider relative">
        <Swiper
          modules={[Navigation, Autoplay, Pagination, Scrollbar, A11y]}
          //   spaceBetween={50}
          slidesPerView={1}
          navigation={{
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
          }}
          pagination={{ clickable: true }}
          loop={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          
        >
          {productCollection?.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <div>
                  <Image
                    src={featuredImage
                    }
                    alt="image"
                    width={450}
                    height={450}
                    className="w-full h-auto"
                  />
                </div>
              </SwiperSlide>
            );
          })}
          <div className="swiper-button-prev sm:!w-[40px] sm:!h-[40px] !w-[26px] !h-[26px] bg-white !items-center shadow-custom-shadow" style={{display:"flex !important"}}>
            <Image src={"/png/left-arrow-red.png"} alt="arrow" width={24} height={16} />
          </div>
          <div className="swiper-button-next sm:!w-[40px] sm:!h-[40px] !w-[26px] !h-[26px] bg-white !items-center shadow-xl" style={{display:"flex !important", justifyContent: "center", alignItems: "center" }}>
            <Image src={"/png/right-arrow-red.png"} alt="arrow" width={24} height={16} />
          </div>
        </Swiper>
        <div className="flex justify-between gap-2 mt-4">
          {imageGallery?.map((item: any, index:number) => {
            return (
              <div key={index}>
                <Image
                  src={item}
                  alt="image"
                  width={152}
                  height={107}
                  className="rounded-xl"
                />
              </div>
            );
          })}
        </div>
      </div>
  
  );
};
export default ProductSlider;
const productCollection = [
  {
    imageUrl: "/png/car011.png",
  },
  {
    imageUrl: "/png/car011.png",
  },
  {
    imageUrl: "/png/car011.png",
  },
  {
    imageUrl: "/png/car011.png",
  },
];
const interiorImage = [
  {
    imageUrl: "/png/interior01.png",
  },
  {
    imageUrl: "/png/interior02.png",
  },
  {
    imageUrl: "/png/interior03.png",
  },
  {
    imageUrl: "/png/interior04.png",
  },
];
