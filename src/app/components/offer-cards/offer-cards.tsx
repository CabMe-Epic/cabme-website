"use client"
import Image from "next/image";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';


import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useEffect, useState } from "react";

const OfferCards = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 576);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <Swiper
    modules={[Navigation, Autoplay, Pagination, Scrollbar, A11y]}
    spaceBetween={50}
    slidesPerView={isMobile ? 1 : 3}
   
    navigation
    pagination={{ clickable: true }}
    loop={true}
    autoplay={{
        delay: 2000,
        disableOnInteraction: false
    }}
  
  >
    <div className="grid grid-cols-3 gap-6">
    {offerCardsArray?.map((item,index)=>{
        return(
          <SwiperSlide 
          key={index}
          >
            <div className="w-[400px] m-auto grid grid-cols-2 shadow-xl border rounded-xl p-4 bg-[#FAFAFA]">
            <div className="flex flex-col content-between bg-white">
              <div className="p-2">
                <h3 className="font-bold text-5xl h-fit mb-2">
                  {item?.percent} <span className="font-normal text-[22px]">OFF</span>
                </h3> 
                <strong className="text-[12px] font-normal h-fit">
                  TERMS & CONDITIONS*
                </strong>
                <p className="text-[8px]">
                 {item?.desc}
                </p>
              </div>
              <div className="bg-red-500 text-white h-full mt-1 text-center">NEW10</div>
            </div>
            <div className="w-full h-[160px]">
              <Image
                src={item?.imageURl}
                alt="offer"
                width={160}
                height={121}
                className="w-full h-full"
              />
            </div>
          </div>
          </SwiperSlide>
        )
    })}
    </div>
   </Swiper>
  );
};
export default OfferCards;
const offerCardsArray = [
    {
        percent:"10%",
        desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore",
        imageURl:"/offer/01.png"
    },
    {
        percent:"10%",
        desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore",
        imageURl:"/offer/02.png"
    },
    {
        percent:"10%",
        desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore",
        imageURl:"/offer/03.png"
    },
    {
        percent:"10%",
        desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore",
        imageURl:"/offer/03.png"
    },
    {
        percent:"10%",
        desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore",
        imageURl:"/offer/03.png"
    },

]