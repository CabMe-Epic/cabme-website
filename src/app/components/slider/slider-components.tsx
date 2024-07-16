"use client";
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
import ThemeButton from "../theme-button/theme-button";
import Image from "next/image";
import { useEffect, useState } from "react";
import useVehicles from "../../../../networkRequests/hooks/useVehicles";

interface sliderProp {
  showButton?: boolean;
  showRatingStar?: boolean;
}

const FleetsSlider = ({ showButton, showRatingStar }: sliderProp) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTab, setIsTab] = useState(false)


  const { vehicles, loading, error }: any = useVehicles();

  const vehicle = vehicles?.response;

  console.log(vehicle, "vehicle")

  useEffect(() => {
    const handleResize = () => {
      setIsTab(window.innerWidth < 1250);
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
    <>
      <Swiper
        modules={[Navigation, Autoplay, Pagination, Scrollbar, A11y]}
        spaceBetween={20}
        slidesPerView={isMobile ? 1 : isTab ? 2 : 3}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        onSwiper={(swiper) => console.log()}
      >
        <div className="grid grid-cols-3 gap-6 my-12">
          {vehicle?.map((item: any, index: number) => {
            return (
              <SwiperSlide key={index}>
                <div className="lg:m-auto bg-[#FAFAFA] shadow-custom-shadow w-full border p-4 rounded-xl max-w-[400px]">
                  <div className="flex justify-between">
                    <span className="bg-[#403D3D] text-white px-4 py-1 text-xs rounded-md">
                      {item?.brandName}
                    </span>
                    {showRatingStar === false ? (
                      ""
                    ) : (
                      <div className="flex gap-[3px]">
                        <Image
                          src={"/svg/rating-star.svg"}
                          alt="rating"
                          width={18}
                          height={18}
                        />
                        <Image
                          src={"/svg/rating-star.svg"}
                          alt="rating"
                          width={18}
                          height={18}
                        />
                        <Image
                          src={"/svg/rating-star.svg"}
                          alt="rating"
                          width={18}
                          height={18}
                        />
                        <Image
                          src={"/svg/rating-star.svg"}
                          alt="rating"
                          width={18}
                          height={18}
                        />
                      </div>
                    )}
                  </div>
                  <div className="sm:h-[185px]">
                    <Image
                      src={item?.featuredImage?.image}
                      alt={item?.featuredImage?.alt}
                      width={400}

                      height={185}
                    />
                  </div>
                  <h3 className="font-semibold text-2xl text-center border-b pb-2 mt-14">
                    {item?.carName}
                  </h3>
                  <div className="grid sm:grid-cols-3 grid-cols-2 gap-6 mt-4">
                    {fleetsArray[0]?.specification?.map((value: any, ind: number) => {
                      return (
                        <div key={ind} className="flex gap-4">
                          <Image
                            src={value?.iconUrl}
                            alt="icons"
                            width={18}
                            height={18}
                          />
                          <span className="text-sm whitespace-nowrap">
                            {ind === 0
                              ? item?.vehicleSpecifications['transmission']
                              : ind === 1
                                ? item?.vehicleSpecifications['engine']
                                : ind === 2
                                  ? item?.vehicleSpecifications['fuelType']
                                  : ind === 3 ? item?.vehicleSpecifications['fuelType']
                                    : ind === 4 ? item?.vehicleSpecifications['make']
                                      : ind === 5 ? item?.seatingCapacity
                                        : ""
                            }
                          </span>

                        </div>
                      );
                    })}
                  </div>
                  {/* <p className="text-xs my-4">{item?.desc}</p> */}
                  {showButton === false ? (
                    ""
                  ) : (
                    <ThemeButton className="w-full mt-2" text="Book Now" />
                  )}
                </div>
              </SwiperSlide>
            );
          })}
        </div>
      </Swiper>
    </>
  );
};
export default FleetsSlider;
const fleetsArray = [
  {
    badge: "Maruti",
    imageUrl: "/cars/swift.png",
    title: "Swift Dzire",
    specification: [
      {
        iconUrl: "/svg/manual.svg",
        speci: "transmission",
      },
      {
        iconUrl: "/svg/speed.svg",
        speci: "14Km",
      },
      {
        iconUrl: "/svg/diesel.svg",
        speci: "14Km",
      },
      {
        iconUrl: "/svg/basic.svg",
        speci: "Basic",
      },
      {
        iconUrl: "/svg/engine.svg",
        speci: "2022",
      },
      {
        iconUrl: "/svg/person.svg",
        speci: "5 Person",
      },
    ],
    desc: "",
  },


];
