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

const ProductSlider = ({
  imageGallery = [],
  featuredImage,
}: {
  imageGallery?: Array<{ image: string; alt: string }>;
  featuredImage: { image: string; alt: string };
}) => {
  const finalArray = Array.isArray(imageGallery)
    ? [featuredImage, ...imageGallery]
    : [featuredImage];
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
    <div className="p-4 pt-0 rounded-xl mt-[5px] hidden-slide shadow-product-shadow border border-[#f8f4f4] product-slider relative">
      <Swiper
        modules={[Navigation, Autoplay, Pagination, Scrollbar, A11y]}
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
        {finalArray.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="shadow-image-shadow rounded-[8px] overflow-hidden sm:my-0 sm:mx-0 my-[0px] mx-[5px]">
              <Image
                src={item?.image}
                alt={item?.alt || "image"}
                width={450}
                height={450}
                className="w-full sm:h-[450px] object-contain"
              />
            </div>
          </SwiperSlide>
        ))}
        {!isMobile  ? (
          <>
            <div className="sm:flex !hidden left mobile-hidden swiper-button-prev absolute top-1/2 left-2 transform  bg-white shadow-custom-shadow items-center justify-center sm:!w-8 sm:!h-8 !w-6 !h-6">
              <Image
                src="/png/left-arrow-red.png"
                alt="arrow"
                width={24}
                height={16}
                className="sm:w-[70%] w-[50%]"
              />
            </div>
            <div className="sm:flex !hidden right swiper-button-next absolute top-1/2 right-2 transform  bg-white shadow-xl items-center justify-center sm:!w-8 sm:!h-8 !w-6 !h-6">
              <Image
                src="/png/right-arrow-red.png"
                alt="arrow"
                width={24}
                height={16}
                className="sm:w-[70%] w-[50%]"
              />
            </div>
          </>
        ) : (
          <>
            <div className="sm:flex !hidden left mobile-hidden swiper-button-prev absolute top-1/2 ml-[-17px] transform items-center justify-center  sm:!w-8 sm:!h-8 !w-8 !h-8">
              <Image
                src="/png/left-red.png"
                alt="arrow"
                width={32}
                height={32}
                className="sm:w-[70%] w-[50%]"
              />
            </div>
            <div className="sm:flex !hidden right swiper-button-next absolute top-1/2 mr-[-17px] transform items-center justify-center sm:!w-8  sm:!h-8 !w-8 !h-8">
              <Image
                src="/png/right-red.png"
                alt="arrow"
                width={24}
                height={16}
                className="sm:w-[70%] w-[50%]"
              />
            </div>
          </>
        )}
      </Swiper>
      <div className="flex justify-between gap-2 sm:mt-4 mt-2">
        {finalArray.map((item, index) => (
          <div key={index} className="border rounded-md">
            <Image
              src={item?.image}
              alt={item?.alt || "image"}
              width={152}
              height={107}
              className="rounded-xl sm:h-[100px] h-[60px] w-auto object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSlider;

const productCollection = [
  {
    image: "/png/car011.png",
    alt: "Car 011",
  },
  {
    image: "/png/car011.png",
    alt: "Car 011",
  },
  {
    image: "/png/car011.png",
    alt: "Car 011",
  },
  {
    image: "/png/car011.png",
    alt: "Car 011",
  },
];

const interiorImage = [
  {
    image: "/png/interior01.png",
    alt: "Interior 01",
  },
  {
    image: "/png/interior02.png",
    alt: "Interior 02",
  },
  {
    image: "/png/interior03.png",
    alt: "Interior 03",
  },
  {
    image: "/png/interior04.png",
    alt: "Interior 04",
  },
];
