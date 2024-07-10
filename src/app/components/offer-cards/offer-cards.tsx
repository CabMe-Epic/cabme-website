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

interface offerProp {
  dailyOffer?: boolean;
  monthlyOffer?: boolean;
}

const OfferCards = ({ dailyOffer, monthlyOffer }: offerProp) => {
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
      // autoplay={{
      //   delay: 2000,
      //   disableOnInteraction: false,
      // }}
    >
      {dailyOffer===true ? (
        <div className="grid grid-cols-3 gap-6">
          {offerCardsArray?.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <div className="sm:w-[400px] w-[340px] m-auto grid grid-cols-2 shadow-xl border rounded-xl p-4 bg-[#FAFAFA]">
                  <div className="flex flex-col content-between bg-white">
                    <div className="sm:px-2 sm:py-2 px-2 py-[7px]">
                      <h3 className="font-bold sm:text-5xl text-3xl h-fit sm:mb-2 mb-0">
                        {item?.percent}{" "}
                        <span className="font-normal text-[22px]">OFF</span>
                      </h3>
                      <strong className="text-[12px] font-normal h-fit">
                        TERMS & CONDITIONS*
                      </strong>
                      <p className="text-[8px] line-clamp-2">{item?.desc}</p>
                    </div>
                    <div className="bg-primary-color text-white h-full sm:mt-1 text-center flex justify-center items-center">
                      {item?.couponCode}
                    </div>
                  </div>
                  <div className="w-full sm:h-[160px] h-[125px]">
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
            );
          })}
        </div>
      )
    :
        monthlyOffer===true ?
        <div className="grid grid-cols-3 gap-6">
          {monthlyOfferCard?.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <div className="w-[400px] m-auto grid grid-cols-2 shadow-xl border rounded-xl p-4 bg-[#FAFAFA]">
                  <div className="flex flex-col content-between bg-white relative">
                    <div className="p-2">
                      <h3 className="font-bold text-2xl h-fit mb-2">
                        {item?.percent}{" "}
                        <span className="font-normal text-[22px]">OFF</span>
                      </h3>
                      <strong className="text-[12px] font-normal h-fit">
                        TERMS & CONDITIONS*
                      </strong>
                      <p className="text-[8px]">{item?.desc}</p>
                    </div>
                    <div className="bg-primary-color text-white h-fit mt-1 text-center w-full absolute bottom-0">
                      {item?.couponCode}
                    </div>
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
            );
          })}
        </div>
        :"No offer right now..!!"
    }
      
    </Swiper>
  );
};
export default OfferCards;
const offerCardsArray = [
  {
    percent: "15%",
    desc: "Applicable on booking with minimum duration 2 days Promocode applicable every time",
    imageURl: "/offer/01.png",
    couponCode:"CAB100"
  },
  {
    percent: "35%",
    desc: "Applicable on booking with minimum duration 6 days Promocode applicable every time",
    imageURl: "/offer/02.png",
    couponCode:"CAB102"

  },
  {
    percent: "10%",
    desc: "Applicable on booking with minimum duration 1 days Promocode applicable every time",
    imageURl: "/offer/03.png",
    couponCode:"CAB101"

  },
  {
    percent: "15%",
    desc: "Applicable on booking with minimum duration 2 days Promocode applicable every time",
    imageURl: "/offer/01.png",
    couponCode:"CAB100"
  },
  {
    percent: "35%",
    desc: "Applicable on booking with minimum duration 6 days Promocode applicable every time",
    imageURl: "/offer/02.png",
    couponCode:"CAB102"

  },
  
];
const monthlyOfferCard = [
  {
    percent: "Rs.3000",
    desc: "Flat Rs.3000 off on Car Subscription. Rental Amount till Rs.35,000.",
    imageURl: "/offer/01.png",
    couponCode:"CABSUB3"

  },
  {
    percent: "Rs.4000",
    desc: "Flat Rs.4000 off on Car Subscription. Rental amount above Rs 35,000.",
    imageURl: "/offer/02.png",
    couponCode:"CABSUB2"

  },
  {
    percent: "Rs.6000",
    desc: "Flat Rs.6000 off on Car Subscription. Rental amount above Rs. 50,000.",
    imageURl: "/offer/03.png",
    couponCode:"CABSUB1"

  },
  {
    percent: "Rs.3000",
    desc: "Flat Rs.3000 off on Car Subscription. Rental Amount till Rs.35,000.",
    imageURl: "/offer/01.png",
    couponCode:"CABSUB3"

  },
];
