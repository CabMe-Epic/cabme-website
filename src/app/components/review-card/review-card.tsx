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
import axios from "axios";

const ReviewCard = () => {
  const [reviews, setReviews] = useState<any>();
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

  useEffect(() => {
    const getReviews = async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_URI_BASE}/cabme/review`
      );

      console.log(res, "resress");
      if (res?.data.success) {
        setReviews(res?.data.reviews);
      }
    };
    getReviews();
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
        {reviews &&
          reviews?.map((item: any, index: number) => {
            return (
              <SwiperSlide key={index}>
                <div className="max-w-[550px] border sm:p-12 p-8 pb-8 m-auto rounded-xl bg-white">
                  <div>
                    <p className="relative text-center text-[#607D8B] sm:text-md text-xs line-clamp-5 h-[80px]">
                      {item?.description}
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
                      {[...Array(5)].map((_, i) => (
                        <Image
                          key={i}
                          src={
                            i < item.star
                              ? "/svg/rating-star.svg"
                              : "/svg/empty-star.svg"
                          }
                          alt="rating"
                          width={20}
                          height={20}
                        />
                      ))}
                    </div>

                    <p className="text-center mt-4 font-semibold text-sm">
                      {item?.name}
                    </p>
                    <p className="text-center text-sm">{item.city}</p>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </div>
  );
};
export default ReviewCard;
const reviewArray = [
  {
    content:
      "Very good service. I could not expect that I can get a car at 4.30 in the morning. Even they have paid for fuel which I filled more. Very transparent",
    name: "Ramesh Singh Shekhwat",
  },
  {
    content:
      "Nice service with on time pickup and delivery. Good customer support with friendly and very helpful staff. The car was also very smooth and the packages are pocket friendly. Overall an amazing experience. Would highly recommend",
    name: "Roshan Singh",
  },
  {
    content:
      "Booked for 4 days for a family trip. Car was water washed and sanitized when I recieved it. Trip and the process were very comfortable and hassle-free. Best self-drive car service provider. I strongly recommend Cabme. Looking forward to using Cabme car",
    name: "Lokesh Singh",
  },
  {
    content:
      "Sanitized car was provided. The delivery and pickup boy was very polite and helpful. This company is honest with their customers.",
    name: "Nikhil Sharma",
  },
  {
    content:
      "Very good service. I could not expect that I can get a car at 4.30 in the morning. Even they have paid for fuel which I filled more. Very transparent",
    name: "Ramesh Singh Shekhwat",
  },
  {
    content:
      "Nice service with on time pickup and delivery. Good customer support with friendly and very helpful staff. The car was also very smooth and the packages are pocket friendly. Overall an amazing experience. Would highly recommend",
    name: "Roshan Singh",
  },
  {
    content:
      "Booked for 4 days for a family trip. Car was water washed and sanitized when I recieved it. Trip and the process were very comfortable and hassle-free. Best self-drive car service provider. I strongly recommend Cabme. Looking forward to using Cabme car",
    name: "Lokesh Singh",
  },
  {
    content:
      "Sanitized car was provided. The delivery and pickup boy was very polite and helpful. This company is honest with their customers.",
    name: "Nikhil Sharma",
  },
];
