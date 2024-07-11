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

const ReviewCard = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTab, setIsTab] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsTab(window.innerWidth<1250);
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
    <div className="review-slider m-2">
      <Swiper
        modules={[Navigation, Autoplay, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={isMobile ? 1 : isTab ? 1 : 3}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        onSwiper={(swiper) => console.log(swiper)}
        // onSlideChange={() => console.log("slide change")}
      >
        {reviewArray?.map((item,index)=>{
          return(
            <SwiperSlide key={index}>
            <div className="max-w-[550px] border sm:p-12 p-8 pb-8 m-auto rounded-xl bg-white">
              <div>
                <p className="relative text-center text-[#607D8B] sm:text-md text-xs">
                 {item?.content}
                  <Image
                    src="/svg/left-quote.svg"
                    alt="quote"
                    width={32}
                    height={32}
                    className="absolute top-[-30px] left-[-30px]"
                  />
                  <Image
                    src="/svg/right-quote.svg"
                    alt="quote"
                    width={32}
                    height={32}
                    className="absolute bottom-[-30px] right-[-30px]"
                  />
                </p>
                <div className="flex w-fit m-auto mt-4">
                  <Image
                    src={"/svg/rating-star.svg"}
                    alt="rating"
                    width={20}
                    height={20}
                  />
                  <Image
                    src={"/svg/rating-star.svg"}
                    alt="rating"
                    width={20}
                    height={20}
                  />
                  <Image
                    src={"/svg/rating-star.svg"}
                    alt="rating"
                    width={20}
                    height={20}
                  />
                  <Image
                    src={"/svg/rating-star.svg"}
                    alt="rating"
                    width={20}
                    height={20}
                  />
                  <Image
                    src={"/svg/rating-star.svg"}
                    alt="rating"
                    width={20}
                    height={20}
                  />
                </div>
                <p className="text-center mt-4 font-semibold text-sm">{item?.name}</p>
                <p className="text-center text-sm">Customer</p>
              </div>
            </div>
          </SwiperSlide>
          )
        })}
       
      </Swiper>
    </div>
  );
};
export default ReviewCard;
const reviewArray = [
  {
    content:"As a satisfied customer of [SaaS Provider], I want to share my positive experience with others. Their software as a service platform has greatly improved the efficiency and productivity of our business operations. The cloud-based solution is user-friendly and regularly updated to stay ahead of the technology curve.",
    name:"Savannah Nguyen"
  },
  {
    content:"As a satisfied customer of [SaaS Provider], I want to share my positive experience with others. Their software as a service platform has greatly improved the efficiency and productivity of our business operations. The cloud-based solution is user-friendly and regularly updated to stay ahead of the technology curve.",
    name:"Savannah Nguyen"
    
  },
  {
    content:"As a satisfied customer of [SaaS Provider], I want to share my positive experience with others. Their software as a service platform has greatly improved the efficiency and productivity of our business operations. The cloud-based solution is user-friendly and regularly updated to stay ahead of the technology curve.",
    name:"Savannah Nguyen"
    
  },
  {
    content:"As a satisfied customer of [SaaS Provider], I want to share my positive experience with others. Their software as a service platform has greatly improved the efficiency and productivity of our business operations. The cloud-based solution is user-friendly and regularly updated to stay ahead of the technology curve.",
    name:"Savannah Nguyen"
    
  },

]