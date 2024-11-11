"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

// Interface for the component props
interface offerProp {
  dailyOffer?: boolean;
  monthlyOffer?: boolean;
  banners?: any;
  isDetails?: boolean;
}

const OfferCardsDetails = ({
  dailyOffer,
  monthlyOffer,
  banners,
  isDetails,
  getCode
}: offerProp) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTab, setIsTab] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsTab(window.innerWidth < 1250);
      setIsMobile(window.innerWidth < 800);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
    
  }, []);

  const copyToClipboard = (couponCode: string) => {
    if (couponCode) {
      navigator.clipboard
        .writeText(couponCode)
        .then(() => {
          // alert("Coupon code copied to clipboard!");
          getCode(couponCode);
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
        });
    }
  };

  // const getDescriptionValue = (description: string) => {
  //   const result: { minAmount?: number, maxAmount?: number, minDays?: number, maxDays?: number, duration?: string } = {};
  
  //   // Regex patterns for matching amounts and duration
  //   const amountRegex = /Rs\.(\d{1,3}(?:,\d{3})*)\s*(above|below|greater\s*than|less\s*than)?/g;
  //   const daysRegex = /(minimum|max|at\s*least|up\s*to)\s*(\d+)\s*(days?|duration?)/g;
  
  //   const extractAmount = (amount: string) => {
  //     const matches = [...amount.matchAll(amountRegex)];
  
  //     matches.forEach(match => {
  //       const value = parseInt(match[1].replace(/,/g, ''), 10);
  //       const condition = match[2]?.toLowerCase();
  
  //       if (condition && condition.includes('above')) {
  //         result.minAmount = value;
  //       } else if (condition && condition.includes('below')) {
  //         result.maxAmount = value;
  //       } else {
  //         // Default to "minAmount" if no condition is provided
  //         result.minAmount = value;
  //       }
  //     });
  //   };
  
  //   // Function to extract days or duration
  //   const extractDays = (daysDescription: string) => {
  //     const matches = [...daysDescription.matchAll(daysRegex)];
  
  //     matches.forEach(match => {
  //       const value = parseInt(match[2], 10);
  //       const condition = match[1]?.toLowerCase();
  
  //       if (condition.includes('minimum') || condition.includes('at least')) {
  //         result.minDays = value;
  //       } else if (condition.includes('max') || condition.includes('up to')) {
  //         result.maxDays = value;
  //       }
  //     });
  //   };
  
  //   // Extract amounts
  //   extractAmount(description);
  
  //   // Extract days/duration
  //   extractDays(description);
  
  //   // If no amount or days are found, use a fallback message
  //   // return result;
  //   // console.log(result,'result')
  //   return description + " | " + JSON.stringify(result);
  // };
  
  
  

  return (
    <div className="my-4">
      <div
        className={`grid grid-cols-2 justify-start flex-row gap-6 w-full h-full ${
          isDetails && "!w-full"
        } z-0`}
      >
        {Array.isArray(banners) &&
          (banners.length > 0 ? banners : offerCardsArray)
            .filter((item: any) => item.daily === true)
            .map((item: any, index: number) => {
              return (
                <div
                  key={index}
                  className={`sm:w-[320px] w-[340px]  sm:h-[200px] h-[220px] m-auto grid grid-cols-2 justify-between gap-0 border rounded-md p-0 bg-[#fff] ${
                    isDetails ? "!w-[320px] !gap-2" : ""
                  } ${
                    index === 3
                      ? "grayscale hover:bg-white select-none opacity-50 "
                      : ""
                  }`}
                >
                  <div className="flex flex-col h-full justify-between bg-white rounded-md">
                    <div className="sm:px-2 sm:py-2 px-2 py-[7px]">
                      <h3 className="font-bold sm:text-5xl text-3xl h-fit sm:mb-2 mb-0">
                        {item?.percent}{" "}
                        <span className="font-normal text-[22px]">
                          {item?.off}
                        </span>
                      </h3>
                      <div className="text-[12px] font-normal h-fit">
                        {item?.termsCondition}
                      </div>
                      <p className="text-[8px]">{item?.description}</p>
                    </div>
                    <div
                      onClick={() => copyToClipboard(item?.couponCode)}
                      className="bg-primary-color flex-row gap-2 cursor-pointer text-white h-[30px] sm:mt-1 text-center flex justify-center items-center rounded-bl-md"
                    >
                      {item?.couponCode}

                      {/* <Image
                        src="/copyPng.png"
                        alt="Copy Icon"
                        width={20}
                        height={20}
                      /> */}
                    </div>
                  </div>
                  <div className="w-full sm:h-full h-full flex justify-end">
                    <Image
                      src={item?.image?.url}
                      alt={item?.image?.alt}
                      width={140}
                      height={121}
                      className="w-[160px] h-full object-cover rounded-br-md rounded-tr-md"
                    />
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default OfferCardsDetails;

const offerCardsArray = [
  {
    percent: "15%",
    desc: "Applicable on booking with minimum duration 2 days. Promocode applicable every time.",
    imageURl: "/offer/01.png",
    couponCode: "CAB100",
  },
  {
    percent: "35%",
    desc: "Applicable on booking with minimum duration 6 days. Promocode applicable every time.",
    imageURl: "/offer/02.png",
    couponCode: "CAB102",
  },
  {
    percent: "10%",
    desc: "Applicable on booking with minimum duration 1 day. Promocode applicable every time.",
    imageURl: "/offer/03.png",
    couponCode: "CAB101",
  },
  {
    percent: "15%",
    desc: "Applicable on booking with minimum duration 2 days. Promocode applicable every time.",
    imageURl: "/offer/01.png",
    couponCode: "CAB100",
  },
  {
    percent: "35%",
    desc: "Applicable on booking with minimum duration 6 days. Promocode applicable every time.",
    imageURl: "/offer/02.png",
    couponCode: "CAB102",
  },
];

// Monthly offers (if applicable)
const monthlyOfferCard = [
  {
    percent: "Rs.3000",
    desc: "Flat Rs.3000 off on Car Subscription. Rental Amount till Rs.35,000.",
    imageURl: "/offer/01.png",
    couponCode: "CABSUB3",
  },
  {
    percent: "Rs.4000",
    desc: "Flat Rs.4000 off on Car Subscription. Rental amount above Rs 35,000.",
    imageURl: "/offer/02.png",
    couponCode: "CABSUB2",
  },
  {
    percent: "Rs.6000",
    desc: "Flat Rs.6000 off on Car Subscription. Rental amount above Rs. 50,000.",
    imageURl: "/offer/03.png",
    couponCode: "CABSUB1",
  },
  {
    percent: "Rs.3000",
    desc: "Flat Rs.3000 off on Car Subscription. Rental Amount till Rs.35,000.",
    imageURl: "/offer/01.png",
    couponCode: "CABSUB3",
  },
];
