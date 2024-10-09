"use client";
import Image from "next/image";
import ThemeButton from "./components/theme-button/theme-button";
import OfferCards from "./components/offer-cards/offer-cards";
import ReviewCard from "./components/review-card/review-card";
import FaqSection from "./components/faq/faq";
import FleetsSlider from "./components/slider/slider-components";
import OurBlogs from "./components/our-blogs/our-blogs";
import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "./Datepicker.css";
import BannerSlider from "./components/banner-slider/banner-slider";

import FleetsSearch from "@/app/components/FleetsSearch/fleets-search";
import axios from "axios";

export default function Home() {
  const [offer, setOffer] = useState("Daily Offers");
  const [cms, setCms] = useState<any>();

  // const router = useRouter();

  const topFleetForm = React.useRef<HTMLDivElement>(null);

  const scrollToFleet = () => {
    topFleetForm?.current?.scrollIntoView({ behavior: "smooth" });
  };

  // const txnId = "txn" + new Date().getTime();

  // const test_url = "https://test.payu.in/_payment"

  // const key = "EhQKWX";
  // const MERCHANT_SALT = "erM1zJcYcfTykYGSb0GAVK7VFz4sFS1S";

  // const [payment, setPayment] = useState<any>({
  //   amount: "1.00",
  //   productinfo: "Ta-123",
  //   firstName: "sahil",
  //   email: "test@gmail.com",
  //   key: key,
  //   txnid: txnId,
  //   phone: "9999999999",
  //   surl: "https://beta.cabme.in/success",
  //   furl: "http://localhost:3000/failure",
  //   txn_s2s_flow: 4,
  //   MERCHANT_SALT: MERCHANT_SALT,
  // });

  // const handleSubmit = async (e: React.FormEvent) => {
  //   // e.preventDefault();
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:9003/payment",
  //       payment
  //     );
  //     // console.log("Payment response", { response });
  //     const { data } = response;
  //     console.log("data", { data });

  //     const resData: any = {
  //       key: data.key,
  //       txnid: data.txnid,
  //       amount: data.amount,
  //       productinfo: data.productinfo,
  //       firstname: data.firstName,
  //       email: data.email,
  //       phone: data.phone,
  //       surl: data.surl,
  //       furl: data.furl,
  //       hash: data.hashValue,
  //     };

  //     console.log("resData", { resData });
  //    const form = document.createElement('form');
  //     form.method = 'POST';
  //     form.action = 'https://test.payu.in/_payment';

  //     Object.keys(resData).forEach((key) => {
  //         const hiddenField = document.createElement('input');
  //         hiddenField.type = 'hidden';
  //         hiddenField.name = key;
  //         hiddenField.value = resData[key];
  //         form.appendChild(hiddenField);
  //     });

  //     document.body.appendChild(form);
  //     form.submit();
  //   } catch (error) {
  //     console.error("Error processing payment", error);
  //   }
  // }

  useEffect(() => {
    const getHomePageCMS = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_URI_BASE}/cabme/homepage`);
        console.log(res, "homepageres");
        setCms(res?.data);
      } catch (error) {
        console.error("Error fetching CMS data:", error);
      }
    };

    getHomePageCMS();
  }, []);


  console.log(cms, "cmsData");


  return (
    <>
      <div
        className="z-[-9] relative sm:py-0 sm:mx-0 sm:mt-4 mt-2 mx-2 rounded-xl overflow-hidden max-w-[1400px]"
        ref={topFleetForm}
      >
        <BannerSlider banner={cms?.heroBanner} />
      </div>

      {/* Only mobile section subsription */}
      <FleetsSearch />
      {/* <button 
      onClick={handleSubmit}
      >
        Continue
      </button> */}

      <div className="max-w-[1250px] w-full m-auto">
        <h2 className="sm:text-4xl text-2xl sm:mt-0 mt-0 font-semibold text-center">
          Trending <span className="text-primary"> offers</span>
        </h2>
        <div className="w-fit flex justify-center m-auto text-md font-semibold sm:mt-6 sm:mb-6 mt-6 mb-0">
          <div
            className={`sm:py-4 py-2 sm:px-8 px-4 sm:text-md text-xs ${offer === "Daily Offers" ? "bg-primary-color" : "bg-black"
              } text-white rounded-l-full cursor-pointer`}
            onClick={() => setOffer("Daily Offers")}
          >
            Daily Offers
          </div>
          <div
            className={`sm:py-4 py-2 sm:px-8 px-4 sm:text-md text-xs ${offer === "Daily Offers" ? "bg-black" : "bg-primary-color"
              } text-white rounded-r-full cursor-pointer`}
            onClick={() => setOffer("Monthly Offers")}
          >
            Monthly Offers
          </div>
        </div>

        {offer === "Daily Offers" && (
          <div className="mx-4 sm:mt-0 mt-4  offerCards">
            {" "}
            <OfferCards banners={cms?.trendingOffer} dailyOffer />{" "}
          </div>
        )}
        {offer === "Monthly Offers" && (
          <div className="mx-4 sm:mt-0 mt-4 offerCards">
            <OfferCards banners={cms?.trendingOffer} monthlyOffer />
          </div>
        )}
      </div>
      <div className="max-w-[1250px] m-auto sm:my-20 sm:mt-6 sm:mb-6 mt-10">
        <h2 className="text-center sm:text-4xl text-2xl font-semibold">
          <span className="text-primary"> Why</span> choose us
        </h2>
        <div className="grid sm:grid-cols-4 grid-cols-2 gap-4 sm:mt-10 mt-0 sm:px-4 sm:py-4 py-0 px-4">
          {chooseArray?.map((value, ind) => {
            return (
              <>
                <div
                  key={ind}
                  className="text-center cursor-pointer content-center grid sm:gap-4 gap-2 h-[250px]"
                >
                  <div className="flex sm:h-auto h-[100px]">
                    <Image
                      src={value?.imageUrl}
                      alt="image"
                      width={500}
                      height={500}
                      className="m-auto h-[93px] sm:w-auto w-[132px] object-contain"
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                  <div className="sm:px-4">
                    <h3 className="font-semibold line-clamp-1">
                      {value?.title}
                    </h3>
                    <p className="text-xs mt-1">{value?.desc}</p>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
      <div className="max-w-[1250px] m-auto s:mt-0 mt-4">
        <h2 className="text-center font-semibold sm:text-4xl text-xl sm:py-4 sm:px-4 my-0 px-4 sm:mb-8">
          Fleets <span className="text-primary">high</span> on demand{" "}
        </h2>

        <div className="sm:my-4 sm:mx-4 my-0 mx-4 fleets">
          <FleetsSlider scrollToFleet={scrollToFleet} />
        </div>
      </div>
      <div className="lg:max-w-[1250px] max-w-[750px] m-auto sm:my-16 my-10 mx-auto">
        <h2 className="sm:text-4xl text-xl font-semibold text-center">
          Make <span className="text-primary"> 4 steps</span> to rent a car
        </h2>
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-8 sm:mt-12 mt-6">
          {rentCollection?.map((item, index) => {
            return (
              <div
                key={index}
                className={`sm:p-6 p-2 relative sm:w-[261px] w-[200px] sm:h-[261px] h-[200px] lg:m-0 m-auto ${index % 2 === 0 ? "shadow-bottom-shadow" : "shadow-top-shadow"
                  } m-auto rounded-full sm:pb-0 pb-8 sm:px-0 px-8`}
              >
                <span className="text-white mb-6 font-semibold bg-primary-color w-8 h-8 flex justify-center items-center rounded-full sm:ml-[15px]">
                  {item?.steps}
                </span>
                <div className="sm:mt-[-17px] mt-[-35px]">
                  <Image
                    src={item?.imageUrl}
                    alt="image"
                    width={62}
                    height={62}
                    className={`${item?.imageUrl === "/svg/car-vector.svg"
                      ? "w-[130px]"
                      : "w-auto"
                      } sm:h-[62px] h-[40px] m-auto mb-4`}
                  />
                  <div className="text-center">
                    <h3 className="font-semibold text-xl sm:leading-[26px] leading-none">
                      {item?.title}
                    </h3>
                    <p className="text-xs mt-2 sm:!w-[180px] !w-[130px] m-auto">
                      {item?.desc}
                    </p>
                  </div>
                </div>
                {index < 3 ? (
                  <Image
                    src={"/svg/arrow.svg"}
                    alt="arrow"
                    width={140}
                    height={30}
                    className="absolute top-[35%] right-[-30%] lg:block hidden"
                  />
                ) : (
                  ""
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex justify-between bg-[#F9F9F9] overflow-hidden">
        <div className="grid grid-cols-2 justify-center w-full p-2">
          <div className="w-[450px] m-auto">
            <h3 className="font-bold lg:text-[62px] sm:text-[44px] text-[26px]">
              {cms?.discountWithBanner.off} <span className="font-normal">OFF</span>
            </h3>
            <div className="border-b border-black lg:text-xl sm:text-lg text-[12px] sm:my-2 sm:pb-4 text-[#909090]">
              <span>{cms?.discountWithBanner.heading}</span>
            </div>
            <h4 className="font-semibold text-sm sm:text-[28px]">
              DISCOUNT CODE : <span className="text-primary">{cms?.discountWithBanner?.couponCode}</span>
            </h4>
          </div>
          <div className="flex justify-end">
            <Image
              src={cms?.discountWithBanner.image?.url}
              alt="thar"
              width={543}
              height={280}
            />
          </div>
        </div>
        <div className="bg-primary-color sm:w-[120px] w-[80px] text-white sm:p-4 p-2 flex items-center font-semibold sm:text-2xl text-md text-center">
          <div className="cursor-pointer" onClick={scrollToFleet}>
            <div className="mb-2">
              <span>GET IT </span> <br />
              <span>NOW</span>
            </div>
            <Image
              src={"/svg/arrow-white.svg"}
              alt="arrow"
              width={50}
              height={20}
              className="m-auto sm:w-full w-[40%]"
            />
          </div>
        </div>
      </div>
      {/* app section */}
      <div
        className="grid sm:grid-cols-2 gap-4 sm:px-10 px-4 sm:py-8 pt-8 pb-4 rounded-xl sm:bg-[url('/svg/taj.svg')] bg-[url('/png/taj-mobile.png')] bg-no-repeat bg-cover m-4 sm:my-16 my-10"
        style={{ backgroundSize: "100% 100%" }}
      >
        <div className="max-w-[550px] m-auto">
          <h3 className="font-semibold lg:text-3xl text-2xl">
            Best App for{" "}
            <span className="text-primary font-bold">CAR RENTAL</span>
          </h3>
          <p className="lg:my-8 sm:my-4 sm:text-[14px] text-xs">
            The application is available on both apple store and play store.
            Download Now.
          </p>
          <div className="flex sm:justify-start justify-center sm:gap-12 gap-4 sm:mt-0 mt-2">
            <button>
              <Image
                onClick={() =>
                  window.open(
                    "https://play.google.com/store/apps/details?id=com.cabme.in&hl=en_IN",
                    "_blank"
                  )
                }
                src={"/png/play-store.png"}
                alt="play-store"
                width={179}
                height={77}
                className="lg:w-[179px] sm:w-full w-[110px]"
              />
            </button>
            <button>
              <Image
                onClick={() =>
                  window.open(
                    "https://apps.apple.com/in/app/cabme-self-drive-car-rentals/id1670293597",
                    "_blank"
                  )
                }
                src={"/png/apple.png"}
                alt="apple"
                width={179}
                height={77}
                className="lg:w-[179px] sm:w-full w-[110px]"
              />
            </button>
          </div>
        </div>
        <div className="sm:block hidden">
          <Image
            src={"/png/mobile.png"}
            alt="app"
            width={700}
            height={550}
            className="w-full auto"
          />
        </div>
      </div>
      {/*review section  */}
      <div className="sm:my-20 my-8 px-8">
        <h2 className="sm:text-4xl text-2xl font-semibold text-center sm:mb-12 mb-6">
          Customer <span className="text-primary">reviews</span>
        </h2>
        <ReviewCard />
      </div>
      {/* subscription section */}
      <div className="max-w-[1250px] m-auto sm:grid flex flex-col-reverse grid-cols-[1fr_2fr]">
        <div className="bg-[#e4e4e4] sm:px-6 sm:py-6 py-2 px-4 bg-[url('/png/round.png')] bg-no-repeat">
          <h3 className="lg:text-4xl sm:text-2xl text-xl font-semibold">
            Save big with our
          </h3>
          <p className="lg:text-5xl sm:text-3xl text-2xl font-bold sm:my-2">
            CAR
          </p>
          <p className="lg:text-5xl sm:text-3xl text-3xl font-bold text-primary">
            RENTAL
          </p>
          <ThemeButton
            text="FIND A CAR"
            className="sm:mt-6 mt-2 sm:px-6 px-2 sm:text-md text-xs"
          />
        </div>
        <div className="bg-[#626262] sm:py-6 sm:px-6 py-6 px-4 grid relative">
          <h3 className="sm:text-4xl text-md text-white">
            MONTHLY SUBSCRIPTION
          </h3>
          <div className="red-marker">

            <ul className="list-disc grid gap-2 mt-4 ml-4 sm:text-md text-xs">
              {
                cms?.monthlySubscription.map((item: any, index: number) => {
                  return <li key={index} className="text-white">
                    {item.text}
                    <span className="text-primary"></span>
                  </li>

                })
              }


            </ul>
          </div>
          <Image
            src={"/png/right-car.png"}
            alt="car"
            width={358}
            height={172}
            className="absolute sm:w-[358px] w-[50%] right-0 bottom-0"
          />
          <ThemeButton
            text="BOOK A CAR"
            className="w-fit mt-4 sm:px-6 px-2 sm:text-md text-xs"
            onClick={scrollToFleet}
          />
        </div>
      </div>
      {/* faq section */}
      <div className="grid sm:grid-cols-[1.5fr_2fr] gap-8 p-8 sm:my-12">
        <div>
          <div className="grid gap-4 max-w-[410px] m-auto">
            <h2 className="sm:text-4xl text-2xl sm:text-left text-center font-bold">
              Any <span className="sm:text-black text-primary"> questions</span>{" "}
              <br />
              <span className="text-primary sm:block hidden">
                {" "}
                WE GOT YOU
              </span>{" "}
            </h2>
            <p className="mb-6 sm:block hidden">
              If you got any questions that is not in FAQs, please go through
              the Terms and Conditions. Or reach us at 1800 121 6162 or mail us
              at enquiry.cabme@gmail.com
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
          {cms?.faq?.map((item: any, index: number) => {
            return <FaqSection key={index} ques={item?.question} ans={item?.answer} />;
          })}
        </div>
      </div>
      {/* blogs section desktop */}
      <OurBlogs />
      {/* blogs section mobile */}

      {/* facts */}
      <div className="my-12 bg-black sm:py-10 sm:px-10 py-6 px-2">
        <h2 className="text-center font-bold sm:text-4xl text-2xl text-white">
          Facts By The <span className="text-primary"> Numbers</span>
        </h2>
        {/* <p className="text-[#E5DADA] text-center my-2 sm:text-md text-xs">
          Lorem Ipsum has been the industry&apos;s standard <br /> dummy text
          ever since the 1500s,
        </p> */}
        <div className="grid lg:grid-cols-4 grid-cols-2 sm:gap-10 gap-2 sm:p-8 p-2">
          {factsArray?.map((item, index) => {
            return (
              <div
                key={index}
                className="flex sm:gap-6 gap-2 items-center bg-[url('/png/count-bg.png')] bg-no-repeat sm:p-8 p-2 rounded-xl w-auto overflow-hidden "
              >
                <div className="sm:w-[80px] w-[50px] flex-none">
                  <Image
                    src={item?.imageUrl}
                    alt="image"
                    width={174}
                    height={174}
                    className="sm:w-[80px] w-[60px]"
                  />
                </div>
                <div className="font-bold sm:text-2xl text-xs">
                  <h3>{item?.count}</h3>
                  <p className="lg:text-[14px] text-sm">{item?.headline}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

// const driverRadioButton = [
//   {
//     content: "Local",
//     id: "local",
//     name: "driver",
//   },
//   {
//     content: "Out-station",
//     id: "outstation",
//     name: "driver",
//   },
// ];
// const outstation = [
//   {
//     id: "location",
//     imageUrl: "/svg/location.svg",
//     heading: "Select your city",
//     desc: "Enter pick-up city",
//     cities: [
//       {
//         city: "Noida",
//       },
//       {
//         city: "Meerut",
//       },
//       {
//         city: "Ghaziabad",
//       },
//       {
//         city: "Agra",
//       },
//       {
//         city: "Kanpur",
//       },
//     ],
//   },
//   {
//     id: "date",
//     imageUrl: "/svg/calender.svg",
//     heading: "Pick Up Date",
//     desc: "Enter pickup date",
//   },
//   {
//     id: "date",
//     imageUrl: "/svg/calender.svg",
//     heading: "Drop-off Date",
//     desc: "Enter drop-off date",
//   },
// ];
// const localDriverArray = [
//   {
//     id: "location",
//     imageUrl: "/svg/location.svg",
//     heading: "Select your city",
//     desc: "Enter pick-up Location",
//     cities: [
//       {
//         city: "Noida",
//       },
//       {
//         city: "Meerut",
//       },
//       {
//         city: "Ghaziabad",
//       },
//       {
//         city: "Agra",
//       },
//       {
//         city: "Kanpur",
//       },
//     ],
//   },
//   {
//     id: "date",
//     imageUrl: "/svg/calender.svg",
//     heading: "Pick Up Date",
//     desc: "Enter pickup date",
//     cities: [
//       {
//         city: "Noida",
//       },
//       {
//         city: "Meerut",
//       },
//       {
//         city: "Ghaziabad",
//       },
//       {
//         city: "Agra",
//       },
//       {
//         city: "Kanpur",
//       },
//     ],
//   },

//   {
//     id: "date",
//     imageUrl: "/svg/calender.svg",
//     heading: "Drop-off Date",
//     desc: "Enter drop-off date",
//     cities: [
//       {
//         city: "Noida",
//       },
//       {
//         city: "Meerut",
//       },
//       {
//         city: "Ghaziabad",
//       },
//       {
//         city: "Agra",
//       },
//       {
//         city: "Kanpur",
//       },
//     ],
//   },
// ];
// const tabsArray = [
//   {
//     tabsValue: "Driver",
//   },
//   {
//     tabsValue: "Self-Driving",
//   },
//   {
//     tabsValue: "Subscription",
//   },
// ];
const chooseArray = [
  {
    imageUrl: "/png/car01new.png",
    width: 132,
    height: 93,
    title: "Safe and Sanitized Car",
    desc: "Your safety is our priority, with a car that's sanitized for purity.",
  },
  {
    imageUrl: "/png/car02new.png",
    width: 132,
    height: 93,
    title: "No Hidden Charges",
    desc: "What you see is what you get, no hidden charges to fret.",
  },
  {
    imageUrl: "/png/car03new.png",
    width: 132,
    height: 93,
    title: "Doorstep Delivery",
    desc: "Your new ride, right to your door, with service you'll adore.",
  },
  {
    imageUrl: "/png/car04new.png",
    width: 132,
    height: 93,
    title: "Insurance included",
    desc: "Drive hassle free with our completely insured vehicles.",
  },
  {
    imageUrl: "/png/car05new.png",
    width: 132,
    height: 93,
    title: "Brand New Fleets",
    desc: "Drive our latest car models with wide variety to choose from.",
  },
  {
    imageUrl: "/png/car06new.png",
    width: 132,
    height: 93,
    title: "Road Side Assistance",
    desc: "Support at time of vehicle breaks down or has a mechanical failure.",
  },
  {
    imageUrl: "/png/car07new.png",
    width: 32,
    height: 93,
    title: "Flexible Kms",
    desc: "Freedom to choose from Kms as per your travel plan.",
  },
  {
    imageUrl: "/png/car08new.png",
    width: 132,
    height: 93,
    title: "Vehicle Health Check",
    desc: "Complete checkup and quick service of the vehicle for hassle free drive.",
  },
];
const rentCollection = [
  {
    steps: 1,
    imageUrl: "/svg/calendar.svg",
    title: "Date & Location",
    desc: "Pick the location and the needed rent date.",
  },
  {
    steps: 2,

    imageUrl: "/svg/car-vector.svg",
    title: "Choose A Car",
    desc: "Select the vehicle using our catalogues.",
  },
  {
    steps: 3,

    imageUrl: "/svg/search.svg",
    title: "Make A Booking",
    desc: "Enter your name and booking details.",
  },
  {
    steps: 4,

    imageUrl: "/svg/ride.svg",
    title: "Enjoy Your Ride!",
    desc: "Enjoy your trip and our good services!",
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
    ans: "Yes, you can pick the car in one city and drop it in another. You can select the option  'Drop in different city'. The charges for drop is different for each city.",
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
const factsArray = [
  {
    imageUrl: "/png/heart.png",
    count: "100k+",
    headline: "Happy Customer",
  },
  {
    imageUrl: "/png/carr.png",
    count: "15k+",
    headline: "Counts of Cars",
  },
  {
    imageUrl: "/png/refresh.png",
    count: "5,0000k+",
    headline: "Total Kms",
  },
  {
    imageUrl: "/png/headphone.png",
    count: "100k+",
    headline: "Questions Solved",
  },
];
