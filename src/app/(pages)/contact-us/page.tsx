"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import FleetSearch from "../../components/FleetsSearch/fleets-search"
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
import axios from "axios";

const ContactUs = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [cms, setCms] = useState<any>();

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

  useEffect(() => {
    const getContactUsCMS = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_URI_BASE}/cabme/contactus`);
        console.log(res, "contactusres");
        setCms(res?.data);
      } catch (error) {
        console.error("Error fetching CMS data:", error);
      }
    };

    getContactUsCMS();
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
          {cms?.addressCard?.map((item: any, index: number) => {
            return (
              <SwiperSlide key={index}>
                <div className="flex items-center h-[200px] py-2 shadow-xl rounded-xl">
                  <div className="w-[450px] h-auto flex items-center">
                    <Image
                      src={item?.image.url}
                      alt={item?.image.alt}
                      width={550}
                      height={400}
                      className="h-auto w-[200px]"
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="text-2xl font-semibold text-primary">
                      {item?.heading}
                    </h3>
                    <p className="mt-2">{item?.address}</p>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <div className="my-24 px-4">
      <FleetSearch/>
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
            If you got any questions that is not in FAQs, please go through the Terms and Conditions. Or reach us at 1800 121 6162 or mail us at enquiry.cabme@gmail.com
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
    ques: "Is there a speed limit?",
    ans: "Cabme allows up to 105 km/hr. However it is 80 km/hr in a few cities where some cars might be equipped with speed governors as per government directives. Cabme strictly advises to follow local speed limits.",
  },
  {
    ques: "Can I extend/ cancel/ modify?",
    ans: "Yes, extensions are possible subject to availability & charges. Cancellations & modifications will attract nominal charges as per our policy.",
  },
  {
    ques: "Can I Drop The Vehlcle In Multlple Citles?",
    ans: "Yes, you can pick the car in one city and drop it in another. You can select the option 'Drop in different city'. The charges for drop is different for each city.",
  },
  {
    ques: "Booking criteria & documents?",
    ans: "Min. 21 years old, have a valid original government ID (Aadhar or Passport) and an original hard copy or a DigiLocker of a driving license for “Light Motor Vehicles,” which is at least 6 months old at the time of starting the trip. We may ask for additional documents for verification in some cases, e.g., local ID or proof of travel.",
  },
  {
    ques: "Is the Fastag Available?",
    ans: "All vehicles is attached with the fastag. The customer have to recharge the fastag itself. The remaining fastag balance will be added with the security refund amount.",
  },
  {
    ques: "How long does it takes for security refund?",
    ans: "It generally takes upto 24- 48 hrs for the security refund. The time can be extend in case of bank holidays.",
  },
];