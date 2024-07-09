"use client";
import Image from "next/image";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const ProductSlider = ({ imageGallery = [], featuredImage }: { imageGallery?: Array<{ image: string, alt: string }>, featuredImage: { image: string, alt: string } }) => {
  const finalArray = Array.isArray(imageGallery) ? [featuredImage, ...imageGallery] : [featuredImage];

  return (
    <div className="p-4 shadow-xl border border-[#f8f4f4] product-slider relative">
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
            <div>
              <Image
                src={item?.image}
                alt={item?.alt || "image"}
                width={450}
                height={450}

                className="w-full h-[450px] object-contain"
              />
            </div>
          </SwiperSlide>
        ))}
        <div className="swiper-button-prev absolute top-1/2 left-2 transform -translate-y-1/2 bg-white shadow-custom-shadow flex items-center justify-center w-8 h-8">
          <Image src="/png/left-arrow-red.png" alt="arrow" width={24} height={16} />
        </div>
        <div className="swiper-button-next absolute top-1/2 right-2 transform -translate-y-1/2 bg-white shadow-xl flex items-center justify-center w-8 h-8">
          <Image src="/png/right-arrow-red.png" alt="arrow" width={24} height={16} />
        </div>
      </Swiper>
      <div className="flex justify-between gap-2 mt-4">
        {finalArray.map((item, index) => (
          <div key={index}>
            <Image
              src={item?.image}
              alt={item?.alt || "image"}
              width={152}
              height={107}
              className="rounded-xl h-[100px] object-contain"
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
