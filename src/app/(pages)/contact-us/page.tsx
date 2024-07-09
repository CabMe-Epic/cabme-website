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
import ThemeButton from "@/app/components/theme-button/theme-button";
import PickupDropOff from "@/app/components/pickup-dropoff/pickup-dropoff";
import FaqSection from "@/app/components/faq/faq";

const ContactUs = () => {
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
    <div className="py-6">
      <div className="sm:flex hidden px-16 text-[#5F5D5D]">
        <span className="cursor-pointer">Home</span>/
        <span className="cursor-pointer">Contact us</span>
      </div>
      <div className="sm:text-4xl text-2xl text-center">
        <h2 className="font-semibold text-primary mb-2">Contact Us</h2>
        <p>Anytime</p>
      </div>
      <div className="grid sm:grid-cols-4 grid-cols-2 px-4 sm:gap-10 gap-4 max-w-[1250px] m-auto w-full text-center sm:my-12 my-8">
        {contactCollection?.map((item, index) => {
          return (
            <div key={index} className="border rounded-xl sm:px-4 px-2 sm:py-6 py-4 shadow-xl">
              <div>
                <Image
                  src={item?.imageUrl}
                  alt="image"
                  width={76}
                  height={76}
                  className="m-auto"
                />
              </div>
              <h3 className="sm:text-xl text-sm font-semibold mt-4 sm:mb-2">
                {item?.headline}
              </h3>
              <p className="text-[#969494] text-sm">{item?.value}</p>
            </div>
          );
        })}
      </div>

      <div className="max-w-[1350px] mx-4 sm:mx-auto border border-[#FF0000] rounded-xl sm:px-12 px-4 sm:pt-8 sm:pb-8 pt-12 pb-4 relative mt-32">
        <h3 className="font-semibold sm:text-3xl text-xl sm:text-left text-center sm:mt-0 mt-4">
          If you&apos;re experiencing an issue, <br /> please{" "}
          <span className="text-primary"> email</span> us.
        </h3>
        <p className="mt-2 sm:text-left text-center flex justify-center gap-4">
          <span>
          Please email at : &nbsp;
          </span>
          <Link
            className="text-primary font-semibold"
            href={"mailto:support@cabme.in"}
          >
            support@cabme.in
          </Link>{" "}
        </p>
        <div className="absolute sm:right-12 sm:top-[-70%] top-[-30%]">
          <Image
            src={"/png/notification.png"}
            alt="notification"
            width={343}
            height={353}
            className="sm:w-full sm:h-auto w-[30%] sm:m-0 m-auto"
          />
        </div>
      </div>

      {/* slider part */}
      <div className="max-w-[1250px] m-auto my-12 px-4">
        <Swiper
          modules={[Navigation, Autoplay, Pagination, Scrollbar, A11y]}
          spaceBetween={50}
          slidesPerView={isMobile ? 1 : 2}
          navigation
          pagination={{ clickable: true }}
          loop={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
        >
          {placeCollection?.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <div className="flex items-center h-[200px] py-2 shadow-xl rounded-xl">
                  <div className="w-[450px] h-auto flex items-center">
                    <Image
                      src={item?.imageUrl}
                      alt="places"
                      width={550}
                      height={400}
                      className="h-auto"
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="text-2xl font-semibold text-primary">
                      {item?.place}
                    </h3>
                    <p className="mt-2">{item?.desc}</p>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <div className="my-24 px-4">
      <PickupDropOff />
      <div className="relative sm:hidden block max-w-[480px]  mb-16 m-auto border rounded-xl shadow-xl w-full px-4 pt-16 pb-12 my-6">
            <div className="absolute top-[-25px] left-0 right-0">
              <div className="max-w-[350px] m-auto bg-primary-color rounded-xl grid grid-cols-2 font-semibold p-2">
                <div className="bg-white rounded-xl px-4 py-[8px] text-center">
                  Rentals
                </div>
                <div className="rounded-xl px-4 py-[8px] text-center text-white">
                  Subscriptions
                </div>
              </div>
            </div>
            <div className="max-w-[280px] m-auto grid grid-cols-2 border rounded-full">
              <div className="bg-black text-white p-2 rounded-l-full text-center px-4">
                <input
                  type="radio"
                  name="select"
                  id="self"
                  className="accent-red-500"
                />
                <label className="ml-2" htmlFor="self">
                  Self Driven
                </label>
              </div>
              <div className="p-2 rounded-full text-center px-4">
                <input
                  type="radio"
                  name="select"
                  id="driver"
                  className="accent-red-500"
                />
                <label className="ml-2" htmlFor="driver">
                  Driver
                </label>
              </div>
            </div>
            <div className="mt-6 border rounded-xl p-2 flex gap-2">
              <Image
                src={"/svg/location-gray.svg"}
                alt="location"
                width={16}
                height={18}
              />
              <input
                type="text"
                placeholder="Select Your City"
                className="w-full border-none outline-none"
              />
            </div>
            <div className="mt-6 border rounded-xl p-2 flex gap-2">
              <Image
                src={"/svg/location-gray.svg"}
                alt="location"
                width={16}
                height={18}
              />
              <input
                type="text"
                placeholder="Shimla,Himachal Pardesh"
                className="w-full border-none outline-none"
              />
            </div>
            <div className="flex jusitfy-between gap-4">
              <div className="mt-6 border rounded-xl p-2 flex gap-2 w-full">
                <input type="date" name="" id="" className="w-full" />
              </div>
              <div className="mt-6 border rounded-xl p-2 flex gap-2 w-full">
                <input type="time" name="" id="" className="w-full" />
              </div>
            </div>
            <div className="mt-8 mb-4">
              <p className="w-fit p-4 bg-[#F2F7F6] rounded-xl m-auto">
                {" "}
                <span className="font-semibold"> Duration:</span>{" "}
                2days,12hours,12minutes
              </p>
            </div>
            <div className="absolute bottom-[-20px] left-0 right-0 m-auto w-fit">
              <ThemeButton
                className="font-semibold text-sm rounded-xl !py-2 shadow-xl gap-2"
                text="Start Your Journey"
                image={"/svg/race.svg"}
              />
            </div>
          </div>
      </div>
      <div className="grid sm:grid-cols-[1.5fr_2fr] gap-8 p-8 sm:my-12">
        <div>
          <div className="grid gap-4 max-w-[410px] m-auto">
            <h2 className="sm:text-4xl text-2xl sm:text-left text-center font-bold">
              Any <span className="sm:text-black text-primary"> questions</span>{" "}
              <br />
              <span className="text-primary sm:block hidden mt-2">
                {" "}
                WE GOT YOU
              </span>{" "}
            </h2>
            <p className="mb-6 sm:block hidden">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea{" "}
            </p>
          </div>
          <Image
            src={"/png/car-red.png"}
            alt="car"
            width={628}
            height={340}
            className="sm:block hidden"
          />
        </div>
        <div>
          {faqCollection?.map((item, index) => {
            return <FaqSection key={index} ques={item?.ques} ans={item?.ans} />;
          })}
        </div>
      </div>
    </div>
  );
};
export default ContactUs;
const contactCollection = [
  {
    imageUrl: "/contact/whatsapp.png",
    headline: "WhatsApp Number",
    value: "+91 7240004072",
  },
  {
    imageUrl: "/contact/mail.png",
    headline: "Email Address",
    value: "support@cabme.in",
  },
  {
    imageUrl: "/contact/phone.png",
    headline: "Toll-Free Number",
    value: "1800 121 6162",
  },
  {
    imageUrl: "/contact/support.png",
    headline: "Customer Support",
    value: "24 Hours × 7 Days",
  },
];
const placeCollection = [
  {
    imageUrl: "/png/agra.png",
    place: "Agra",
    desc: "1/3 Army Welfare Housing Organization Pocket-B Sector-2, Vidyadhar Nagar, Jaipur-302039",
  },
  {
    imageUrl: "/png/jaipur.png",
    place: "Jaipur",
    desc: "1/3 Army Welfare Housing Organization Pocket-B Sector-2, Vidyadhar Nagar, Jaipur-302039",
  },
  {
    imageUrl: "/png/agra.png",
    place: "Agra",
    desc: "1/3 Army Welfare Housing Organization Pocket-B Sector-2, Vidyadhar Nagar, Jaipur-302039",
  },
];
const tabsArray = [
  {
    tabs: "Driver",
  },
  {
    tabs: "Self-Driving",
  },
  {
    tabs: "Subscription",
  },
];
const pickUpDropArray = [
  {
    imageUrl: "/svg/location.svg",
    heading: "Pick-up City",
    shortDesc: "Enter pick-up city",
  },
  {
    imageUrl: "/svg/calendar-check.svg",
    heading: "Pick Up Date",
    shortDesc: "Enter pickup date",
  },
  {
    imageUrl: "/svg/location.svg",
    heading: "Drop-off City",
    shortDesc: "Enter drop-off city",
  },
  {
    imageUrl: "/svg/calendar-check.svg",
    heading: "Drop-off Date",
    shortDesc: "Enter drop-off date",
  },
];
const faqCollection = [
  {
    ques: "What are my liabilities in case of damage / accident ?",
    ans: "Your car will be covered by comprehensive insurance, to take care of damage cases. On every case of damage, your liability would be limited to the difference between the costs incurred to repair the damage and the proceeds from insurance claim with maximum liability limited.",
  },
  {
    ques: "Can I end my subscription early, or choose to keep the car longer?",
    ans: "Will update you soon.",
  },
  {
    ques: "Are there any restrictions on what can I use the car for?",
    ans: "Will update you soon.",
  },
  {
    ques: "What are the benefits of Subscriptions?",
    ans: "Will update you soon.",
  },
  {
    ques: "What will be the car registration type and whose name will it be registered in?",
    ans: "Will update you soon.",
  },
];