"use client";
import FaqSection from "@/app/components/faq/faq";
import InputField from "@/app/components/input-field/input-field";
import OurBlogs from "@/app/components/our-blogs/our-blogs";
import ReviewCard from "@/app/components/review-card/review-card";
import ThemeButton from "@/app/components/theme-button/theme-button";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getAllCities } from "../../../../networkRequests/hooks/api";
import axios from "axios";

const AboutUs = () => {
  const [cities, setCities] = React.useState<[]>();
  const [cms, setCms] = useState<any>();

  const getRecords = React.useCallback(async () => {
    const citiesResponse = await getAllCities();
    const cities = citiesResponse?.data?.response;
    setCities(cities);
    console.log("citiesResponse", { cities });
  }, []);
  React.useEffect(() => {
    getRecords();
  }, []);

  useEffect(() => {
    const getAboutUsCMS = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_URI_BASE}/cabme/aboutus`);
        console.log(res, "AboutUsres");
        setCms(res?.data);
      } catch (error) {
        console.error("Error fetching CMS data:", error);
      }
    };

    getAboutUsCMS();
  }, []);
  return (
    <div className="py-6">
      <div className="sm:flex hidden px-16 text-[#5F5D5D]">
        <span className="cursor-pointer">Home</span>/
        <span className="cursor-pointer">About us</span>
      </div>
      <div>
        <div className="text-center sm:text-4xl text-xl sm:mb-12 mb-6 px-4">
          <p>
            {cms?.headingWithHeroBanner.heading}
          </p>
        </div>
        <Image
          src={cms?.headingWithHeroBanner.image?.url}
          alt={cms?.headingWithHeroBanner.image?.alt}
          width={850}
          height={650}
          className="h-auto w-[70%] m-auto"
        />
      </div>
      <div className="max-w-[1250px] m-auto sm:grid grid-cols-2 gap-12 items-center sm:my-16 my-8 sm:px-4 px-8">
        <div>
          <h2 className="text-primary font-semibold sm:text-3xl text-2xl">
            {cms?.aboutUs?.heading}
          </h2>
          <h3 className="sm:text-4xl text-2xl font-semibold leading-normal mt-2">
            {cms?.aboutUs?.subheading}
          </h3>
          <div className="text-[#7C7575] grid gap-4 mt-6">
            <p>
              {cms?.aboutUs?.content}
            </p>
            <div className="mt-6">
              <h4 className="text-primary font-bold sm:mb-0 mb-2">
                Talk to Us?
              </h4>
              <div className="flex gap-6 sm:mb-0 mb-4">
                <div className="flex gap-2">
                  <Image
                    src={"/svg/phone-red.svg"}
                    alt="phone"
                    width={18}
                    height={18}
                  />
                  <Link
                    className="font-semibold text-black sm:text-md text-sm"
                    href={"tel:18001216162"}
                  >
                    1800 121 6162{" "}
                  </Link>
                </div>
                <Link
                  href={"https://wa.link/l86m7r"}
                  className="flex gap-2 items-center"
                >
                  <Image
                    src={"/svg/whatsapp.svg"}
                    alt="whatsapp"
                    width={24}
                    height={24}
                  />
                  <span className="font-semibold text-black sm:text-md text-sm">
                    +91-7240004072
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Image
            src={"/png/image-car.png"}
            alt="image"
            width={650}
            height={450}
            className="w-full h-auto"
          />
        </div>
      </div>

      <div className="sm:px-0 px-8">
        <h2 className="text-center sm:text-4xl text-2xl font-semibold sm:mb-6 mb-2">
          Our <span className="text-primary"> Services</span>
        </h2>
        <p className="text-center">
          The ultra strong Unique Selling Proposition of Cabme has been its
          value system to delight the <br className="sm:block hidden" />{" "}
          customer with its professional approach, passion to excel.
        </p>
        <div className="sm:grid grid-cols-3 gap-8 sm:pr-8 sm:my-12 my-4 items-center">
          <div>
            <Image
              src={"/png/thar-left.png"}
              alt="car"
              width={450}
              height={350}
              className="sm:block hidden"
            />
            <Image
              src={"/png/thar-full.png"}
              alt="car"
              width={450}
              height={350}
              className="sm:hidden block w-full"
            />
          </div>
          <div className="grid gap-8 mr-8 sm:block hidden">
            {servicesCollection?.map((value, index) => {
              return (
                <div
                  key={index}
                  className="bg-[#FBFBFB] flex gap-4 items-center shadow-xl rounded-xl"
                >
                  <Image
                    src={value?.imageUrl}
                    alt="image"
                    width={137}
                    height={64}
                    className="mb-[-7px]"
                  />
                  <span className="font-semibold text-sm">
                    {value?.headline}
                  </span>
                </div>
              );
            })}
          </div>
          <div>
            <h3 className="sm:text-4xl text-2xl font-semibold mb-4">
              Provide Home Comfort For You.
            </h3>
            <div>
              <p>
                Cabme is the ONLY company that focuses on this innovative
                business model of allowing its customer to take the car on a
                Short Term & Long Term Lease, Weekend Gateways for SELF DRIVE.
              </p>
              <p>
                Cabme, is an e-commerce portal which allows the clients to book
                a car online & pay directly via the payment gateway. An unique
                E- Commerce website which helped over 50000 people, traveling
                across various cities with a online spot booking, Car
                Conformation & making Payments.
              </p>
            </div>
          </div>
          <div className="grid gap-8 sm:mr-8 sm:my-0 my-6 sm:hidden block">
            {servicesCollection?.map((value, index) => {
              return (
                <div
                  key={index}
                  className="bg-[#FBFBFB] flex gap-4 items-center shadow-xl rounded-xl"
                >
                  <Image
                    src={value?.imageUrl}
                    alt="image"
                    width={137}
                    height={64}
                    className="mb-[-7px]"
                  />
                  <span className="font-semibold text-sm">
                    {value?.headline}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="relative">
        <Image
          src={"/about/sky.png"}
          alt="sky"
          width={1650}
          height={950}
          className="w-full h-auto"
        />
        <div className="absolute sm:top-20 top-4 left-0 right-0">
          <p className="text-center text-[#736F6F]">
            We value the time and quality of travel <br />
            <span>for each of our clients</span>
          </p>
          <h3 className="sm:text-7xl text-2xl font-semibold text-center tracking-wide text-primary sm:mt-12 mt-4">
            Your Adventure <br />{" "}
            <span className="text-black">Starts Here</span>{" "}
          </h3>
        </div>
        <div className="absolute sm:bottom-[-200px] bottom-[-40px] left-0 right-0 z-[9]">
          <Image
            src={"/about/brezza.png"}
            alt="brezza"
            width={950}
            height={450}
            className="m-auto sm:w-[60%] w-[70%]"
          />
        </div>
      </div>
      <div className="relative mx-6 top-[-20px]">
        <div className="bg-black text-white sm:grid grid-cols-2 gap-6 px-8 pt-24 pb-12 rounded-xl">
          <div className="relative bottom-[-100px] sm:block hidden">
            <Image
              src={"/about/chairs.png"}
              alt="chair"
              width={580}
              height={780}
              className="w-full h-auto"
            />
          </div>
          <div className="relative sm:bottom-[-100px] sm:pt-10">
            <h3 className="font-semibold sm:text-4xl text-xl leading-normal">
              Make Every Journey Memorable. <br className="sm:block hidden" />{" "}
              Rent
              <span className="text-primary"> with Us</span>
            </h3>
            <div className="grid sm:grid-cols-3 grid-cols-2 gap-4 mt-16 h-[55%]">
              {svgCollection?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="sm:border-r border-[#BEBEBE] h-[80%] border-dashed grid content-center"
                  >
                    <div className="h-[60px] w-auto">
                      <Image
                        src={item?.imageUrl}
                        alt="image"
                        width={78}
                        height={78}
                        className="h-[60px] m-auto"
                      />
                    </div>
                    <div className="text-center mt-4">
                      <p className="sm:text-md text-sm">{item?.contentOne}</p>
                      <p className="sm:text-md text-sm">{item?.contentTwo}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="sm:grid grid-cols-2 sm:px-4 px-8 gap-12 mb-12 sm:mt-20 mt-6 items-center max-w-[1250px] m-auto">
        <div>
          <h3 className="sm:text-4xl text-2xl font-[500]">
            Use our <span className="text-primary"> quick booking from</span> to
            get a car{" "}
          </h3>
          {/* <p className="text-[#7D7373] my-4">
            Aliquam erat volutpat. Integer malesuada turpis id fringilla
            suscipit. Maecenas ultrices, orci vitae convallis mattis, quam nulla
            vehicula felis, eu cursus sem tellus.
          </p> */}
          <div className="mt-6">
            <h4 className="text-primary font-semibold mb-2">
              Call for book an order?
            </h4>
            <div className="flex gap-6">
              <div className="flex gap-2">
                <Image
                  src={"/svg/phone-red.svg"}
                  alt="phone"
                  width={18}
                  height={18}
                />
                <Link
                  className="font-semibold text-black sm:text-md text-sm"
                  href={"tel:18001216162"}
                >
                  1800 121 6162{" "}
                </Link>
              </div>
              <Link
                href={"https://wa.link/l86m7r"}

                className="flex gap-2">
                <Image
                  src={"/svg/whatsapp.svg"}
                  alt="whatsapp"
                  width={24}
                  height={24}
                />
                <span
                  className="font-semibold text-black sm:text-md text-sm"
                // href={"#"}
                >
                  {" "}
                  +91-7240004072{" "}
                </span>
              </Link>
            </div>
          </div>
          <p className="mt-8 font-[500] text-lg sm:block hidden">
            Download our Appllication to track your order
          </p>
          <div className="flex sm:justify-start justify-center sm:gap-12 gap-4 sm:mt-2 mt-6 sm:mb-0 mb-16">
            <button>
              <Image
                src={"/png/play-store.png"}
                alt="play-store"
                width={179}
                height={77}
                className="sm:w-[130px] w-[130px]"
              />
            </button>
            <button>
              <Image
                src={"/png/apple.png"}
                alt="apple"
                width={179}
                height={77}
                className="sm:w-[130px] w-[130px]"
              />
            </button>
          </div>
        </div>
        <div>
          <div className="relative max-w-[480px]  mb-16 m-auto border rounded-xl shadow-xl w-full px-4 py-8 my-6">
            <h2 className="text-2xl font-semibold text-center mb-8">
              Submit your details
            </h2>
            <div className="grid gap-4">
              <InputField placeholder="Full Name" className="h-[48px]" />
              <InputField placeholder="Phone number" className="h-[48px]" />
              <InputField placeholder="Email Id" className="h-[48px]" />
              <select name="city" id="city" className="outline-none w-full pl-4 rounded-lg outline-0 text-[#5C5555] border-[#D2CCCC] border bg-[#FCFBFB] h-[48px]">
                <option value="Select Your City">Select Your City</option>
                {cities?.map((city: any, index: number) => (
                  <option key={index} value={city?.name}>
                    {city?.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-8">
              <ThemeButton
                text="Submit"
                className="w-full sm:!py-3 !py-2 !font-bold text-lg tracking-wide"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-black py-8 px-4 relative my-24">
        <div className="max-w-[1250px] m-auto text-white sm:flex gap-8 items-center">
          <h3 className="text-6xl sm:text-left text-right sm:pr-0 pr-8">
           {cms?.stripBannerWithOffer.offer}<span className="sm:hidden block text-2xl">Off</span>{" "}
          </h3>
          <p className="text-xl sm:text-left text-center">
            {cms?.stripBannerWithOffer.heading}
          </p>
        </div>
        <Image
          src={cms?.stripBannerWithOffer.image?.url}
          alt="discount"
          width={400}
          height={265}
          className="absolute sm:top-[-45%] top-[-20%] sm:right-[10%] sm:w-[380px] w-[200px]"
        />
      </div>
      <div className="sm:mx-8 mx-2 sm:mt-64 sm:mb-24 bg-primary-color rounded-2xl sm:pt-12 pt-4 pb-8 sm:px-16 px-8">
        <div className="text-white sm:grid grid-cols-2 gap-8">
          <div>
            <h2 className="sm:text-5xl text-2xl font-semibold leading-normal">
              Have Any Questions <br /> About Us?
            </h2>
            <div className="flex gap-4 mt-8 mb-4 z-[99] relative bottom-0">
              <div className="bg-white py-2 sm:px-4 px-2 rounded-xl w-fit text-black">
                <Link
                  href={"tel:1800-121-6162 "}
                  className="flex items-center gap-2"
                >
                  {" "}
                  <Image
                    src={"/svg/phone-red.svg"}
                    alt="phone"
                    width={16}
                    height={16}
                  />{" "}
                  <span className="sm:text-md text-xs sm:font-normal font-semibold">
                    {" "}
                    1800-121-6162
                  </span>{" "}
                </Link>
              </div>
              <div className="bg-white p-[2px] w-fit rounded-xl">
                <div className="bg-green-400 py-2 px-4 rounded-xl w-fit text-white">
                  <Link href={"#"} className="flex items-center gap-2">
                    {" "}
                    <Image
                      src={"/png/whatsapp.png"}
                      alt="whatsapp"
                      width={16}
                      height={16}
                    />{" "}
                    <span> +91-7240004072</span>{" "}
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <Image
              src={"/png/dotts.png"}
              alt="dotts"
              width={76}
              height={98}
              className="absolute sm:bottom-0 bottom-[-20px] z-[9] sm:left-0 right-0"
            />
            <Image
              src={"/png/sports-car.png"}
              alt="car"
              width={511}
              height={510}
              className="absolute rounded-xl sm:top-[-60%] sm:left-20"
            />
          </div>
        </div>
      </div>
      <div className="sm:mt-48 mt-[80%] sm:px-8 px-4">
        <h2 className="text-4xl font-semibold text-center my-6">
          Customer <span className="text-primary"> reviews</span>
        </h2>
        <ReviewCard />
      </div>
      {/* <div className="px-4 ">
        <h2 className="sm:text-4xl text-2xl sm:text-left text-center font-bold">
          Any <span className="sm:text-black text-primary"> questions</span>{" "}
          <br />
          <span className="text-primary sm:block hidden"> WE GOT YOU</span>{" "}
        </h2>
        {faqCollection?.map((item, index) => {
          return <FaqSection key={index} ques={item?.ques} ans={item?.ans} />;
        })}
      </div> */}
      <div className="sm:my-24 my-12">
        <OurBlogs />
      </div>
    </div>
  );
};
export default AboutUs;
const servicesCollection = [
  {
    imageUrl: "/png/services01.png",
    headline: "Book Your Car Effortlessly",
  },
  {
    imageUrl: "/png/services02.png",
    headline: "Real Time Right Tracking",
  },
  {
    imageUrl: "/png/services03.png",
    headline: "Scheduled Right & Pre-Booking",
  },
  {
    imageUrl: "/png/services04.png",
    headline: "Transparent Billing & Invoicing",
  },
];
const svgCollection = [
  {
    imageUrl: "/about/svg/01.svg",
    contentOne: "Wide Section",
    contentTwo: "Varitey",
  },
  {
    imageUrl: "/about/svg/02.svg",
    contentOne: "24/7 Order",
    contentTwo: "Available",
  },
  {
    imageUrl: "/about/svg/03.svg",
    contentOne: "Fast Car Delivery",
    contentTwo: "Service",
  },
  {
    imageUrl: "/about/svg/04.svg",
    contentOne: "High Safety",
    contentTwo: "and Nurity",
  },
  {
    imageUrl: "/about/svg/05.svg",
    contentOne: "Fixed Price &",
    contentTwo: "Bonus System",
  },
  {
    imageUrl: "/about/svg/06.svg",
    contentOne: "Professional",
    contentTwo: "Car Driver",
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
