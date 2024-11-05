/* eslint-disable react-hooks/rules-of-hooks */
import Image from "next/image";
import React, { useState, useEffect } from "react";
import ThemeButton from "../../components/theme-button/theme-button";
import { useRouter } from "next/navigation";
import ExclusionComponent from "../exclusion/exclusion";
import FacilityComponent from "../facility/facility";
import TermsAndConditions from "../terms-and-condition-tabs/terms-and-condition";
import { extractDaysAndHours } from "@/app/utils/extractDaysAndHours";
import useReservationDateTime from "@../../../networkRequests/hooks/useReservationDateTime";
import { calculateTotalPrice} from "@/app/utils/getTotalPrice";
import { roundPrice } from "@/app/utils/roundPrice ";

import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedPackagePriceRedux,
  setSelectedPackageFreeKmsRedux,
} from "../../../../redux/slices/locationSlice";

const Tooltip = ({ children, tooltipText }: any) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className="tooltip-container"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {children}
      {showTooltip && <div className="tooltip-text">{tooltipText}</div>}
    </div>
  );
};

const CardListingCards = ({ data }: any) => {
  const Navigation = useRouter();
  const { duration } = useReservationDateTime();
  const dispatch = useDispatch();
  const { days, hours, minutes }: any = extractDaysAndHours(duration);
  const [showImg, setShowImg] = useState(false);
  const [dropLocation, setDropLocation] = useState<any>("");
  const [radioToggle, setRadioToggle] = useState<any>("");
  console.log("data", data);
  useEffect(() => {
    if (showImg) {
      setShowImg(true);
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    // Clean up the effect on unmount
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [showImg]);
  
  // const pickupDateRedux = useSelector((state) => state.location.pickupDate);
  // const dropOffDateRedux = useSelector((state) => state.location.dropOffDate);
  // const pickupTimeRedux = useSelector((state) => state.location.pickupTime);
  // const dropoffTimeRedux = useSelector((state) => state.location.dropoffTime);

  console.log(days, hours, minutes, "duration for self");

  // Convert the time into total hours
  let totalHours = days * 24 + hours + minutes / 60;

  // Check if total duration is less than 48 hours
  if (totalHours < 48) {
    console.log("Duration is less than 48 hours.");
  } else {
    console.log("Duration meets the requirement.");
  }

  // const [showOptions, setShowOptions] = useState(false);
  const [activeTab, setActiveTab] = useState("Inclusions");
  const [selectedPackagePrice, setPackagePrice] = useState<any>();
  const [selectedPackageFreeKms, setSelectedPackageFreeKms] = useState<any>(1);

  const setPrice = (price: number) => {
    setPackagePrice(price);
  };

  const setFreekms = (km: number) => {
    setSelectedPackageFreeKms(km);
  };

  //@ts-ignore
  // localStorage.setItem(
  //   "selectedPackagePrice",
  //   roundPrice(selectedPackagePrice)
  // );

  dispatch(setSelectedPackagePriceRedux(roundPrice(selectedPackagePrice)));

  // localStorage.setItem(
  //   "selectedPackageFreeKms",
  //   roundPrice(selectedPackageFreeKms)
  // );

  dispatch(setSelectedPackageFreeKmsRedux(roundPrice(selectedPackageFreeKms)));

  console.log({ selectedPackagePrice });

  const tabs = [
    { name: "Exclusion", content: "Exclusion Content" },
    { name: "Inclusions", content: "Inclusions Content" },
    { name: "Facilities", content: "Facilities Content" },
    { name: "T&C", content: "T&C Content" },
  ];

  const [bookingOptionsHome, setBookingOptionsHome] = useState<any>();
  const [driverType, setDriverType] = useState<any>();

  const dropOffLocationRedux = useSelector(
    (state) => state.location.dropOffLocation
  );
  const pickupDateRedux = useSelector((state) => state.location.pickupDate);
  const dropOffDateRedux = useSelector((state) => state.location.dropOffDate);
  const pickupTimeRedux = useSelector((state) => state.location.pickupTime);
  const dropoffTimeRedux = useSelector((state) => state.location.dropoffTime);
  const tabValueRedux = useSelector((state) => state.location.tabValue);
  const radioToggleRedux = useSelector((state) => state.location.radioToggle);

  React.useEffect(() => {
    // const bookingOptions = localStorage.getItem("tabValue");
    // const driverType = localStorage.getItem("radioToggle");
    // const radioVal = localStorage.getItem("radioToggle");
    // const dropLoc = localStorage.getItem("dropOffLocation");

    const bookingOptions = tabValueRedux;
    const driverType = radioToggleRedux;
    const radioVal = radioToggleRedux;
    const dropLoc = dropOffLocationRedux;

    setBookingOptionsHome(bookingOptions);
    setDriverType(driverType);
    setRadioToggle(radioVal);
    setDropLocation(dropLoc);
  }, [data]);

  const [clicked1, setClicked1] = useState(true);
  const [clicked2, setClicked2] = useState(false);
  const [clicked3, setClicked3] = useState(false);
  // const [freekms, setFreekms] = useState(0);
  const [showOptionsMobile, setShowOptionsMobile] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : data?.imageGallery?.length - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < data?.imageGallery?.length - 1 ? prevIndex + 1 : 0
    );
  };

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.key === "ArrowLeft") {
        handlePrev();
      } else if (event.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    // window.addEventListener('wheel', handleScroll);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      // window.removeEventListener('wheel', handleScroll);
    };
  }, [handleNext, handlePrev]);
  // const [currentImage, setCurrentImage] = useState<any>(data?.featuredImage?.image);

  //please don't touch this function, It is for the default package select when user does not select any package...!!

  const selectDefaultPackage = (data: any) => {
    console.log("pdata", data);
    if (selectedPackagePrice === undefined) {
      bookingOptionsHome === data?.bookingOptions?.selfDrive?.name
        ? setPackagePrice(
            calculateTotalPrice(pickupDateRedux,dropOffDateRedux,pickupTimeRedux,dropoffTimeRedux,
              data?.bookingOptions?.selfDrive?.packageType?.package1?.price
            )
          )
        : bookingOptionsHome === data?.bookingOptions?.subscription?.name
        ? setPackagePrice(
            data?.bookingOptions?.subscription?.packageType?.package1?.price
          )
        : driverType === data?.bookingOptions?.withDriver?.local?.name
        ? setPackagePrice(
            calculateTotalPrice(pickupDateRedux,dropOffDateRedux,pickupTimeRedux,dropoffTimeRedux,
              data?.bookingOptions?.withDriver?.local?.packageType?.package1
                ?.price
            )
          )
        : driverType === data?.bookingOptions?.withDriver?.outstation?.name
        ? setPackagePrice(
            data?.bookingOptions?.withDriver?.outstation?.packageType?.package1
              ?.ratePerKm
          )
        : driverType === data?.bookingOptions?.withDriver?.oneway?.name ||
          driverType == "One-way"
        ? setPackagePrice(
            data?.bookingOptions.withDriver.oneway.doorstepDelivery
              .filter((item: any) => item?.city === dropLocation)
              .map((item: any) => item?.price || 0)
          )
        : console.log("Something went wrong in package selection");
    }

    if (selectedPackageFreeKms === 1) {
      bookingOptionsHome === data?.bookingOptions?.selfDrive?.name
        ? setSelectedPackageFreeKms(
            Number(
              (
                data?.bookingOptions?.selfDrive?.packageType?.package1
                  ?.kmsLimit * (((days as number) + hours / 24) as number)
              ).toFixed(0)
            )
          )
        : bookingOptionsHome === data?.bookingOptions?.subscription?.name
        ? setSelectedPackageFreeKms(
            data?.bookingOptions?.subscription?.packageType?.package1?.kmsLimit
          )
        : driverType === data?.bookingOptions?.withDriver?.local?.name
        ? setSelectedPackageFreeKms(
            data?.bookingOptions?.withDriver?.local?.packageType?.package1
              ?.kmsLimit
          )
        : driverType === data?.bookingOptions?.withDriver?.outstation?.name
        ? setSelectedPackageFreeKms(
            data?.bookingOptions.withDriver.outstation.packageType.package1
              .ratePerKm || 0
          )
        : console.log("Something went wrong in package selection");
    } else {
      console.log("done");
    }
  };
  console.log(driverType, "driverType");
  console.log(selectedPackagePrice, "selected pack");

  console.log("hours", days, hours, minutes);

  console.log(selectedPackagePrice, "selectedPackagePrice");
  console.log(
    selectedPackageFreeKms,
    selectedPackagePrice,
    "setSelectedPackageFreeKms"
  );

  // console.log("days")
  return (
    <>
      {showImg ? (
        <div className="sm:w-screen h-screen fixed !top-0 !left-0 backdrop-blur-md z-[999999] flex justify-center w-screen sm:h-screen items-center overflow-hidden">
          <div
            onClick={() => setShowImg(!showImg)}
            className="absolute top-4 sm:right-4 right-0 transform -translate-x-1/2 cursor-pointer"
          >
            <ThemeButton text="Close" className="ml-auto mt-4" />
          </div>
          <div className="relative flex flex-col items-center">
            <div className="relative">
              <Image
                src={
                  data?.imageGallery?.[currentIndex]?.image ||
                  "/default-image.png"
                } // Fallback image if none exists
                key={data?.imageGallery?.[currentIndex]?.alt || "default-alt"}
                width={330}
                height={300}
                objectFit="contain"
                className="bg-white sm:m-4 shadow-xl cursor-pointer transition-all w-[320px] sm:w-[700px] sm:h-[400px] object-cover rounded-xl m-auto"
                alt={data?.imageGallery?.[currentIndex]?.alt || "Tag Icon"}
              />
              <button
                onClick={handlePrev}
                className="absolute sm:left-4 left-0 top-1/2 transform -translate-y-1/2 flex justify-center items-center z-10 sm:w-[40px] w-[32px] sm:h-[40px] h-[32px] bg-transparent rounded-full shadow-md p-2"
              >
                <Image
                  src="/png/left-arrow-red.png"
                  alt="Previous"
                  width={24}
                  height={16}
                  className="sm:w-[24px] sm:h-[16px] w-[20px] h-[12px]"
                />
              </button>
              <button
                onClick={handleNext}
                className="absolute sm:right-4 right-0 top-1/2 transform -translate-y-1/2 flex justify-center items-center z-10 sm:w-[40px] w-[32px] sm:h-[40px] h-[32px] bg-transparent rounded-full shadow-md p-2"
              >
                <Image
                  src="/png/right-arrow-red.png"
                  alt="Next"
                  width={24}
                  height={16}
                  className="sm:w-[24px] sm:h-[16px] w-[20px] h-[12px]"
                />
              </button>
            </div>
            <div className="flex sm:flex-row flex-row w-[100%] sm:w-[95%] overflow-x-auto h-[70%] sm:justify-center items-center sm:items-start gap-2 py-10">
              {data?.imageGallery?.map((item: any, index: number) => (
                <Image
                  src={item?.image}
                  key={item?.alt || index} // Use a unique key if possible
                  width={110}
                  height={110}
                  onClick={() => setCurrentIndex(index)}
                  className={`bg-white m-2 cursor-pointer transition-transform duration-300 rounded-md h-[73px] object-cover ${
                    index === currentIndex ? "scale-110 shadow-xl" : ""
                  }`}
                  alt={item?.alt || "Thumbnail Image"}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      <div className="relative mb-10">
        {/* -------------------------------- */}

        {/* --------------------------------- */}

        {/* {(data.vehicleStatus === "Sold Out" ||
          data.vehicleStatus === "Not Available") && (
          <div
            className={` absolute top-0 left-0 w-[100%] h-full z-10 rounded-lg`}
          >
            <div className="absolute top-0 left-0 w-full h-full  backdrop-blur-[3px] rounded-lg z-40">
              <div className="flex items-center h-full w-full text-[40px] justify-center font-bold text-[#ff0000]">
                {data.vehicleStatus === "Sold Out"
                  ? "Booked"
                  : data.vehicleStatus === "Not Available"
                  ? "Not Available"
                  : ""}
              </div>
            </div>
          </div>
        )} */}

        <div
          className={`bg-[url('/png/listing-bg.png')] sm:pt-0 pt-[40px] mb-[40px] `}
          style={{ backgroundSize: "100% 100%" }}
        >
          <main
            className={`sm:max-w-[1028px] pb-4 rounded-[12px] flex flex-row items-center justify-center bg-no-repeat `}
          >
            {/* ---------------------------------------- */}
            {bookingOptionsHome === data?.bookingOptions?.selfDrive?.name ? (
              <>
                {" "}
                <div
                  className={`absolute sm:block -left-2 sm:top-[20px] top-[15px] z-10 w-fit ${
                    (data.vehicleStatus === "Sold Out" ||
                      data.vehicleStatus === "Not Available") &&
                    ""
                  }`}
                >
                  <Image
                    src="/png/red-design.png"
                    width={133}
                    objectFit={"contain"}
                    height={46}
                    alt="Tag Icon"
                  />
                  <span className="text-white absolute z-[9] top-[5px] text-sm left-0 right-0 m-auto w-fit">
                    {data?.brandName}
                  </span>
                </div>
                <div className="sm:flex hidden flex-col items-center jusitfy-center lg:w-[486px] w-[260px] h-full ">
                  <div className="flex flex-row justify-center m-auto mt-16">
                    <h1 className="m-auto font-bold text-[24px]">
                      {data?.carName}
                    </h1>
                  </div>
                  <Image
                    onClick={() => setShowImg(!showImg)}
                    src={data?.featuredImage?.image}
                    width={386}
                    objectFit={"contain"}
                    height={212}
                    alt={data?.featuredImage?.alt}
                    className="sm:w-[95%] object-contain mb-2 cursor-pointer"
                  />
                  <div
                    onClick={() => setShowImg(!showImg)}
                    className="flex flex-row items-center gap-2 border-[1.2px] border-[#ff0000] px-1 rounded-md mb-4 cursor-pointer py-[3px]"
                  >
                    <Image
                      src="/carListing/view.png"
                      width={12}
                      objectFit={"contain"}
                      height={12}
                      alt="Car Icon"
                    />
                    <span className="text-[#ff0000] text-sm font-semibold">
                      View Real Car Images
                    </span>
                  </div>
                </div>
                <div className="w-full">
                  <div className="min-h-[500px] sm:min-h-[274px] sm:h-[274px]  max-w-[700px] relative">
                    <div className="mt-5 flex flex-row sm:flex-row justify-center items-center mx-auto mb-6 lg:gap-4 gap-2 sm:mr-5 pl-1 sm:pr-0 pr-1 self-center">
                      <div
                        onClick={() => {
                          if (
                            Number(
                              (
                                data?.bookingOptions?.selfDrive?.packageType
                                  ?.package1?.kmsLimit *
                                (((days as number) + hours / 24) as number)
                              ).toFixed(0)
                            ) == 0 &&
                            totalHours < 48
                          ) {
                            alert(
                              "To select the unlimited package, the minimum booking duration must be at least 2 days."
                            );
                            return;
                          }
                          setFreekms(
                            Number(
                              (
                                data?.bookingOptions?.selfDrive?.packageType
                                  ?.package1?.kmsLimit *
                                (((days as number) + hours / 24) as number)
                              ).toFixed(0)
                            )
                          );
                          const calculatedPrice = calculateTotalPrice(pickupDateRedux,dropOffDateRedux,pickupTimeRedux,dropoffTimeRedux,
                            data?.bookingOptions?.selfDrive?.packageType
                              ?.package1?.price
                          );
                          if (calculatedPrice) {
                            setPrice(Math.round(calculatedPrice));
                            setClicked1(true);
                            setClicked2(false);
                            setClicked3(false);
                          } else {
                            console.error(
                              "Failed to calculate the total price"
                            );
                          }
                        }}
                        className={` sm:flex flex-row hover:scale-[1.05] duration-300 items-center !justify-center bg-white gap-3 border-[1.5px] border-[#FF0000] px-2 sm:py-2 py-[12px] rounded-lg 
                            lg:w-[230px]  w-[115px] sm:h-[71px] cursor-pointer ${
                              clicked1
                                ? "border-black bg-gradient-to-r from-[#FFD7D7] transition-all  to-[#fff]"
                                : ""
                            }`}
                      >
                        <span className="font-bold lg:text-[18px] text-[16px] whitespace-nowrap block m-aut text-center leading-none sm:my-0 my-[3px]">
                          ₹{" "}
                          {(() => {
                            const price = calculateTotalPrice(pickupDateRedux,dropOffDateRedux,pickupTimeRedux,dropoffTimeRedux,
                              data?.bookingOptions?.selfDrive?.packageType?.package1?.price
                            )?.toFixed(0);
                            const priceNumber = Number(price);
                            return priceNumber.toString().length > 4
                              ? priceNumber.toLocaleString("en-IN")
                              : price;
                          })()}
                        </span>
                        <span className="flex flex-col gap-0">
                          <p className="text-[#565454] sm:block hidden font-[500] sm:text-[14px] xs:text-xs text-[13px] text-center">
                            {
                              data?.bookingOptions?.selfDrive?.packageType
                                ?.package1?.duration
                            }
                          </p>
                          <hr className="border-[#000000] border-[1.2px] sm:block hidden my-[3px]" />
                          <span className="relative flex flex-row  group text-[#FF0000]">
                            <p className="text-[#FF0000] text-center font-[500] lg:text-[13px] text-[12px] whitespace-nowrap w-full overflow-hidden m-auto">
                              {data?.bookingOptions?.selfDrive?.packageType
                                ?.package1?.kmsLimit == 0
                                ? "Unlimited"
                                : data?.bookingOptions?.selfDrive?.packageType
                                    ?.package1?.kmsLimit === null
                                ? "--"
                                : (
                                    data?.bookingOptions?.selfDrive?.packageType
                                      ?.package1?.kmsLimit *
                                    (((days as number) + hours / 24) as number)
                                  ).toFixed(0) + " Free kms"}{" "}
                            </p>
                            {/* <span className="sm:block hidden"> ...</span> */}
                            {/* <div className="absolute left-0 bottom-full mb-2 hidden sm:group-hover:block bg-[#ff0000] text-white text-xs rounded py-1 px-2">
                              {data?.bookingOptions?.selfDrive?.packageType
                                ?.package1?.kmsLimit
                                ? data?.bookingOptions?.selfDrive?.packageType
                                    ?.package1?.kmsLimit * (days as number)
                                : "0"}{" "}
                              Free kms
                            </div> */}
                          </span>
                        </span>
                      </div>
                      <div
                        onClick={() => {
                          if (
                            Number(
                              (
                                data?.bookingOptions?.selfDrive?.packageType
                                  ?.package2?.kmsLimit *
                                (((days as number) + hours / 24) as number)
                              ).toFixed(0)
                            ) == 0 &&
                            totalHours < 48
                          ) {
                            alert(
                              "To select the unlimited package, the minimum booking duration must be at least 2 days."
                            );
                            return;
                          }
                          setFreekms(
                            Number(
                              (
                                data?.bookingOptions?.selfDrive?.packageType
                                  ?.package2?.kmsLimit *
                                (((days as number) + hours / 24) as number)
                              ).toFixed(0)
                            )
                          );
                          const calculatedPrice = calculateTotalPrice(pickupDateRedux,dropOffDateRedux,pickupTimeRedux,dropoffTimeRedux,
                            data?.bookingOptions?.selfDrive?.packageType
                              ?.package2?.price
                          );
                          if (calculatedPrice) {
                            setPrice(Math.round(calculatedPrice));
                            setClicked1(false);
                            setClicked2(true);
                            setClicked3(false);
                          } else {
                            console.error(
                              "Failed to calculate the total price"
                            );
                          }
                        }}
                        className={`sm:flex flex-row items-center hover:scale-[1.05] duration-300 !justify-center bg-white gap-3 border-[1.5px] border-[#FF0000] px-2 sm:py-2 py-[12px] rounded-lg lg:w-[230px]  w-[115px] sm:h-[71px] cursor-pointer ${
                          clicked2
                            ? "border-black bg-gradient-to-r from-[#FFD7D7] transition-all  to-[#fff]"
                            : ""
                        }`}
                      >
                        <span className="font-bold lg:text-[18px] text-[16px] whitespace-nowrap block m-aut text-center leading-none sm:my-0 my-[3px]">
                          ₹{" "}
                          {(() => {
                            const price = calculateTotalPrice(pickupDateRedux,dropOffDateRedux,pickupTimeRedux,dropoffTimeRedux,
                              data?.bookingOptions?.selfDrive?.packageType
                                ?.package2?.price
                            )?.toFixed(0);
                            const priceNumber = Number(price);
                            return priceNumber.toString().length > 4
                              ? priceNumber.toLocaleString("en-IN")
                              : price;
                          })()}
                        </span>
                        <span className="relative flex flex-col gap-0 group">
                          <p className="text-[#565454] sm:block hidden font-[500] sm:text-[14px]  text-[10px] text-center whitespace-nowrap">
                            {
                              data?.bookingOptions?.selfDrive?.packageType
                                ?.package2?.duration
                            }
                          </p>
                          <hr className="border-[#000000] border-[1.2px] sm:block hidden my-[3px]" />
                          <div className="text-[#FF0000] flex flex-row">
                            <p className="text-[#FF0000] text-center font-[500] lg:text-[13px] text-[12px] whitespace-nowrap overflow-hidden min-w-[70px] w-full m-auto">
                              {data?.bookingOptions?.selfDrive?.packageType
                                ?.package2?.kmsLimit == 0
                                ? "Unlimited"
                                : data?.bookingOptions?.selfDrive?.packageType
                                    ?.package2?.kmsLimit === null
                                ? "--"
                                : (
                                    data?.bookingOptions?.selfDrive?.packageType
                                      ?.package2?.kmsLimit *
                                    (((days as number) + hours / 24) as number)
                                  ).toFixed(0) + " Free kms"}{" "}
                            </p>
                            {/* <span className="sm:block hidden">  ...</span> */}
                          </div>
                          {/* <div className="tooltip absolute left-0 top-full mt-1 hidden sm:group-hover:block bg-[#ff0000] text-white text-xs rounded py-1 px-2">
                            {data?.bookingOptions?.selfDrive?.packageType
                              ?.package2?.kmsLimit
                              ? data?.bookingOptions?.selfDrive?.packageType
                                  ?.package2?.kmsLimit * (days as number)
                              : "0"}{" "}
                            Free kms
                          </div> */}
                        </span>
                      </div>
                      <div
                        onClick={() => {
                          if (
                            Number(
                              (
                                data?.bookingOptions?.selfDrive?.packageType
                                  ?.package3?.kmsLimit *
                                (((days as number) + hours / 24) as number)
                              ).toFixed(0)
                            ) == 0 &&
                            totalHours < 48
                          ) {
                            alert(
                              "To select the unlimited package, the minimum booking duration must be at least 2 days."
                            );
                            return;
                          }
                          const calculatedPrice = calculateTotalPrice(pickupDateRedux,dropOffDateRedux,pickupTimeRedux,dropoffTimeRedux,
                            data?.bookingOptions?.selfDrive?.packageType
                              ?.package3?.price
                          );
                          setFreekms(
                            Number(
                              (
                                data?.bookingOptions?.selfDrive?.packageType
                                  ?.package3?.kmsLimit *
                                (((days as number) + hours / 24) as number)
                              ).toFixed(0)
                            )
                          );
                          if (calculatedPrice) {
                            setPrice(Math.round(calculatedPrice));
                            setClicked1(false);
                            setClicked2(false);
                            setClicked3(true);
                          } else {
                            console.error(
                              "Failed to calculate the total price"
                            );
                          }
                        }}
                        className={`sm:flex flex-row items-center hover:scale-[1.05] duration-300 !justify-center bg-white gap-3 border-[1.5px] border-[#FF0000] px-2 sm:py-2 py-[12px] rounded-lg lg:w-[230px]  w-[115px] sm:h-[71px] cursor-pointer ${
                          clicked3
                            ? "border-black bg-gradient-to-r from-[#FFD7D7] transition-all  to-[#fff]"
                            : ""
                        }`}
                      >
                        <span className="font-bold lg:text-[18px] text-[16px] whitespace-nowrap block m-auto text-center leading-none sm:my-0 my-[3px]">
                          ₹{" "}
                          {(() => {
                            const price = calculateTotalPrice(pickupDateRedux,dropOffDateRedux,pickupTimeRedux,dropoffTimeRedux,
                              data?.bookingOptions?.selfDrive?.packageType
                                ?.package3?.price
                            )?.toFixed(0);
                            const priceNumber = Number(price);
                            return priceNumber.toString().length > 4
                              ? priceNumber.toLocaleString("en-IN")
                              : price;
                          })()}
                        </span>
                        <span className="relative flex flex-col gap-0 group">
                          {/* for desktop duration part */}
                          <p className="text-[#565454] sm:block hidden font-[500] sm:text-[14px] xs:text-xs text-[13px] text-center whitespace-nowrap">
                            {
                              data?.bookingOptions?.selfDrive?.packageType
                                ?.package3?.duration
                            }
                          </p>
                          {/* desktop end */}
                          <hr className="border-[#000000] border-[1.2px] sm:block hidden my-[3px]" />
                          <div className="flex flex-row text-[#FF0000]">
                            <p className="text-[#FF0000] text-center font-[500] lg:text-[13px] text-[12px] whitespace-nowrap overflow-hidden w-full m-auto">
                              {data?.bookingOptions?.selfDrive?.packageType
                                ?.package3?.kmsLimit == 0
                                ? "Unlimited"
                                : data?.bookingOptions?.selfDrive?.packageType
                                    ?.package3?.kmsLimit === null
                                ? "--"
                                : (
                                    data?.bookingOptions?.selfDrive?.packageType
                                      ?.package3?.kmsLimit *
                                    (((days as number) + hours / 24) as number)
                                  ).toFixed(0) + " Free kms"}{" "}
                            </p>
                            {/* <span className="sm:block hidden">  ...</span> */}
                          </div>
                          {/* <div className="tooltip absolute left-0 top-full mt-1 hidden sm:group-hover:block bg-[#ff0000] text-white text-xs rounded py-1 px-2">
                            {data?.bookingOptions?.selfDrive?.packageType
                              ?.package3?.kmsLimit
                              ? data?.bookingOptions?.selfDrive?.packageType
                                  ?.package3?.kmsLimit * (days as number)
                              : "0"}{" "}
                            Free kms
                          </div> */}
                        </span>
                      </div>
                    </div>
                    {/*  */}
                    {/* for mobile view */}
                    <div className="flex sm:hidden flex-col items-center jusitfy-center">
                      <div className="flex flex-row justify-center m-auto my-0 sm:my-2">
                        <h1 className="mx-auto font-bold text-[24px]">
                          {data?.carName}
                        </h1>
                      </div>
                      <Image
                        onClick={() => setShowImg(!showImg)}
                        src={data?.featuredImage?.image}
                        width={386}
                        objectFit={"contain"}
                        height={212}
                        alt={data?.featuredImage?.alt}
                        className="w-[70%] mb-2 cursor-pointer"
                      />
                      <div
                        onClick={() => setShowImg(!showImg)}
                        className="flex flex-row items-center gap-2 border-[1.2px] border-[#ff0000] px-1 rounded-md cursor-pointer py-[3px]"
                      >
                        <Image
                          src="/carListing/view.png"
                          width={12}
                          objectFit={"contain"}
                          height={12}
                          alt="Car Icon"
                        />
                        <span className="text-[#ff0000] text-sm font-semibold">
                          View Real Car Images
                        </span>
                      </div>
                    </div>

                    {/*  */}

                    <div className="sm:flex flex-row justify-between items-center sm:mr-5 relative sm:my-0 my-6 mb-2">
                      <div className="grid grid-cols-3 gap-4 sm:mt-4 items-center w-full gap-y-6 gap-x-2 sm:ml-8 sm:mb-0 mb-4 sm:px-0 px-4">
                        {data?.carFeatures?.bluetooth === true && (
                          <div className="flex flex-row items-center gap-2">
                            <Image
                              src="/carListing/bluetooth.png"
                              width={18}
                              objectFit={"contain"}
                              height={20}
                              alt="bluetooth"
                            />
                            <span className="lg:text-[15px] text-[8px]">
                              Bluetooth
                            </span>
                          </div>
                        )}

                        <div className="flex flex-row items-center gap-2">
                          <Image
                            src="/carListing/manual.png"
                            width={18}
                            objectFit={"contain"}
                            height={20}
                            alt="bluetooth"
                          />
                          <span className="lg:text-[15px] text-[10px]">
                            {data?.vehicleSpecifications?.transmission}
                          </span>
                        </div>

                        {data?.carFeatures?.navigationSystem === true && (
                          <div className="flex flex-row items-center gap-2 cursor-pointer">
                            <Image
                              src="/carListing/gps.png"
                              width={18}
                              objectFit={"contain"}
                              height={20}
                              alt="bluetooth"
                            />
                            <span className="lg:text-[15px] text-[8px]">
                              GPS Navigation
                            </span>

                            {/* <Tooltip tooltipText="GPS Navigation">
                              <span className="lg:text-[15px] text-[8px]">
                                GPS Nav...
                              </span>
                            </Tooltip> */}
                          </div>
                        )}
                        <div className="flex flex-row items-center gap-2">
                          <Image
                            src="/carListing/seats.png"
                            width={18}
                            objectFit={"contain"}
                            height={20}
                            alt="bluetooth"
                          />
                          <span className="lg:text-[15px] text-[8px]">
                            {data?.seatingCapacity} Person
                          </span>
                        </div>
                        <div className="flex flex-row items-center gap-2">
                          <Image
                            src="/carListing/gas.png"
                            width={18}
                            objectFit={"contain"}
                            height={20}
                            alt="bluetooth"
                          />
                          <span className="lg:text-[15px] text-[8px]">
                            {data?.vehicleSpecifications?.fuelType}
                          </span>
                        </div>
                        <div className="flex flex-row items-center gap-2">
                          <Image
                            src="/carListing/bootspace.png"
                            width={18}
                            objectFit={"contain"}
                            height={20}
                            alt="bluetooth"
                          />
                          <span className="lg:text-[15px] text-[8px]">
                            Boot Space
                          </span>
                        </div>
                      </div>
                      <div className="m-0 flex flex-row items-center sm:px-0 px-4 mt-7 justify-between sm:justify-start">
                        <div className="flex flex-col sm:flex-row justify-end  sm:items-center sm:w-full sm:!pr-10 gap-2 cursor-pointer  sm:hidden ">
                          {selectedPackageFreeKms !== 0 ? (
                            <div className="sm:flex flex-row justify-end sm:mr-10  sm:my-5">
                              {data?.bookingOptions?.selfDrive?.packageType
                                ?.extraKmsCharge && (
                                <span className="text-xs sm:text-[15px]">
                                  Extra kms will be charged at{" "}
                                  <span className="text-[#FF0000]">
                                    ₹
                                    {
                                      data?.bookingOptions?.selfDrive
                                        ?.packageType?.extraKmsCharge
                                    }
                                  </span>
                                </span>
                              )}
                            </div>
                          ) : (
                            <div className="sm:flex hidden flex-row justify-end mr-10 my-5"></div>
                          )}
                          <span
                            className="text-[#ff0000] sm:text-[15px] text-sm flex items-center gap-2"
                            onClick={() =>
                              setShowOptionsMobile(!showOptionsMobile)
                            }
                          >
                            View Details{" "}
                            <Image
                              src="/carListing/arrow.png"
                              width={10}
                              objectFit={"contain"}
                              height={10}
                              className="object-contain"
                              alt="bluetooth"
                            />
                          </span>
                        </div>

                        {data.vehicleStatus === "Sold Out" ||
                        data.vehicleStatus === "Not Available" ? (
                          <ThemeButton
                            text={
                              data.vehicleStatus === "Sold Out"
                                ? "Booked"
                                : data.vehicleStatus === "Not Available"
                                ? "Sold Out"
                                : ""
                            }
                            className=" sm:px-6 !px-2 grad-button shadow-custom-shadow sm:text-md sm:w-[140px] sm:h-[50px] w-[120px] h-[42px] text-center flex flex-row justify-center sm:!font-bold !font-semibold sm:!text-[20px] !text-lg opacity-50 cursor-not-allowed"
                          />
                        ) : (
                          <ThemeButton
                            onClick={() => {
                              if (
                                Number(
                                  (
                                    data?.bookingOptions?.selfDrive?.packageType
                                      ?.package2?.kmsLimit *
                                    (((days as number) + hours / 24) as number)
                                  ).toFixed(0)
                                ) == 0 &&
                                totalHours < 48
                              ) {
                                alert(
                                  "To select the unlimited package, the minimum booking duration must be at least 2 days."
                                );
                                return;
                              }
                              Navigation.push(`/car-details/${data._id}`);
                              selectDefaultPackage(data);
                            }}
                            text="Book Now"
                            className=" sm:px-6 !px-2 grad-button shadow-custom-shadow sm:text-md sm:w-[140px] sm:h-[50px] w-[120px] h-[42px] text-center flex flex-row justify-center sm:!font-bold !font-semibold sm:!text-[20px] !text-lg"
                          />
                        )}
                      </div>
                    </div>
                    <div className=" flex-col sm:flex-row justify-end  sm:items-center sm:w-full sm:!pr-10 gap-2 cursor-pointer mt-2 left-4 top-44 h-[295px] sm:h-[90px] absolute sm:-bottom-10 bottom-[0px] hidden sm:flex">
                      {selectedPackageFreeKms !== 0 ? (
                        <div className="sm:flex flex-row justify-end sm:mr-10 mt-10  sm:my-5">
                          {data?.bookingOptions?.selfDrive?.packageType
                            ?.extraKmsCharge && (
                            <span className="text-xs sm:text-[15px]">
                              Extra kms will be charged at{" "}
                              <span className="text-[#FF0000]">
                                ₹
                                {
                                  data?.bookingOptions?.selfDrive?.packageType
                                    ?.extraKmsCharge
                                }
                              </span>
                            </span>
                          )}
                        </div>
                      ) : (
                        <div className="sm:flex hidden flex-row justify-end mr-10 my-5"></div>
                      )}
                      <span
                        className="text-[#ff0000] sm:text-[15px] text-sm flex items-center gap-2"
                        onClick={() => setShowOptionsMobile(!showOptionsMobile)}
                      >
                        View Details{" "}
                        <Image
                          src="/carListing/arrow.png"
                          width={10}
                          objectFit={"contain"}
                          height={10}
                          className="object-contain"
                          alt="bluetooth"
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </>
            ) : bookingOptionsHome ===
              data?.bookingOptions?.subscription?.name ? (
              <>
                {" "}
                <div className="absolute sm:block -left-2 sm:top-[20px] top-[15px] z-10 w-fit">
                  <Image
                    src="/png/red-design.png"
                    width={133}
                    objectFit={"contain"}
                    height={46}
                    alt="Tag Icon"
                  />
                  <span className="text-white absolute z-[9] top-[5px] text-sm left-0 right-0 m-auto w-fit">
                    {data?.brandName}
                  </span>
                </div>
                <div className="sm:flex hidden flex-col items-center jusitfy-center w-[486px] h-full ">
                  <div className="flex flex-row justify-center m-auto mt-16">
                    <h1 className="m-auto font-bold text-[24px]">
                      {data?.carName}
                    </h1>
                  </div>
                  <Image
                    src={data?.featuredImage?.image}
                    width={386}
                    objectFit={"contain"}
                    height={212}
                    alt={data?.featuredImage?.alt}
                    className="sm:w-[250px] sm:h-[180px] sm:object-contain mb-2"
                  />
                  <div
                    onClick={() => setShowImg(!showImg)}
                    className="flex flex-row items-center gap-2 border-[1.2px] border-[#ff0000] px-1 rounded-md mb-4 cursor-pointer py-[3px]"
                  >
                    <Image
                      src="/carListing/view.png"
                      width={12}
                      objectFit={"contain"}
                      height={12}
                      alt="Car Icon"
                    />
                    <span className="text-[#ff0000] text-sm font-semibold">
                      View Real Car Imagesd
                    </span>
                  </div>
                </div>
                <div className="sm:h-[274px] relative px-2 max-w-[700px] w-full">
                  <div className="mt-5 sm:flex grid grid-cols-3 flex-row items-center sm:gap-4 gap-2 sm:mr-5">
                    <div
                      onClick={() => {
                        // const calculatedPrice = calculateTotalPrice(pickupDateRedux,dropOffDateRedux,pickupTimeRedux,dropoffTimeRedux,
                        //   data?.bookingOptions?.subscription?.packageType
                        //     ?.package1?.price
                        // );
                        // if (calculatedPrice) {
                        //   setPrice(Math.round(calculatedPrice));

                        // } else {
                        //   console.error("Failed to calculate the total price");
                        // }

                        setPrice(
                          data?.bookingOptions?.subscription?.packageType
                            ?.package1?.price
                        );
                        setClicked1(true);
                        setClicked2(false);
                        setClicked3(false);
                      }}
                      className={`sm:flex flex-row items-center hover:scale-[1.05] duration-300 justify-between bg-white gap-3 border-[1.5px] border-[#FF0000] px-2 sm:py-2 py-[12px] rounded-lg sm:w-[240px] p-0 sm:h-[71px] cursor-pointer w-full ${
                        clicked1
                          ? "border-black bg-gradient-to-r from-[#FFD7D7] transition-all to-[#fff]"
                          : ""
                      }`}
                    >
                      <span className="font-bold sm:text-[18px] text-[18px] block w-full text-center leading-none whitespace-nowrap sm:my-0 my-[3px] sm:block">
                        ₹{" "}
                        {(() => {
                          const price =
                            data?.bookingOptions?.subscription?.packageType
                              ?.package1?.price;
                          const priceNumber = Number(price);
                          return priceNumber.toString().length > 4
                            ? priceNumber.toLocaleString("en-IN")
                            : price;
                        })()}
                      </span>
                      <span className="flex flex-col gap-0">
                        {/* for desktop */}
                        <p className="text-[#565454] sm:block font-[500] sm:text-[14px] text-[10px] text-center">
                          {
                            data?.bookingOptions?.subscription?.packageType
                              ?.package1?.duration
                          }
                        </p>
                        {/* desktop end */}
                        <hr className="border-[#000000] border-[1.2px] sm:block hidden my-[3px]" />
                        <span className="relative flex flex-row group text-[#FF0000]">
                          <p className="text-[#FF0000] font-[500] sm:text-[14px] text-center m-auto text-[10px] whitespace-nowrap w-full overflow-hidden">
                            {data?.bookingOptions?.subscription?.packageType
                              ?.package1?.kmsLimit == 0
                              ? "Unlimited"
                              : data?.bookingOptions?.subscription?.packageType
                                  ?.package1?.kmsLimit === null
                              ? "--"
                              : data?.bookingOptions?.subscription?.packageType
                                  ?.package1?.kmsLimit + " Free kms"}{" "}
                          </p>
                          {/* <span className="sm:block hidden">  ...</span> */}
                          {/* <div className="absolute left-0 bottom-full mb-2 hidden sm:group-hover:block bg-[#ff0000] text-white text-xs rounded py-1 px-2">
                            {data?.bookingOptions?.subscription?.packageType
                              ?.package1?.kmsLimit
                              ? data?.bookingOptions?.subscription?.packageType
                                  ?.package1?.kmsLimit 
                              : "0"}{" "}
                            Free kms
                          </div> */}
                        </span>
                      </span>
                    </div>
                    <div
                      onClick={() => {
                        // const calculatedPrice = calculateTotalPrice(pickupDateRedux,dropOffDateRedux,pickupTimeRedux,dropoffTimeRedux,
                        //   data?.bookingOptions?.subscription?.packageType
                        //     ?.package2?.price
                        // );
                        // if (calculatedPrice) {
                        //   setPrice(Math.round(calculatedPrice));

                        // } else {
                        //   console.error("Failed to calculate the total price");
                        // }
                        setPrice(
                          data?.bookingOptions?.subscription?.packageType
                            ?.package2?.price
                        );
                        setClicked1(false);
                        setClicked2(true);
                        setClicked3(false);
                      }}
                      className={`sm:flex flex-row hover:scale-[1.05] duration-300 cursor-pointer items-center justify-between bg-white gap-3 border-[1.5px] border-[#FF0000] px-2 sm:py-2 py-[12px] rounded-lg sm:w-[240px] sm:h-[71px] w-full ${
                        clicked2
                          ? "border-black bg-gradient-to-r from-[#FFD7D7] transition-all to-[#fff]"
                          : ""
                      }`}
                    >
                      <span className="font-bold sm:text-[18px] text-[18px] block w-full text-center leading-none whitespace-nowrap sm:my-0 my-[3px]">
                        ₹{" "}
                        {(() => {
                          const price =
                            data?.bookingOptions?.subscription?.packageType
                              ?.package2?.price;
                          const priceNumber = Number(price);
                          return priceNumber.toString().length > 4
                            ? priceNumber.toLocaleString("en-IN")
                            : price;
                        })()}
                      </span>
                      <span className="flex flex-col gap-0">
                        {/* for desktop */}
                        <p className="text-[#565454] sm:block font-[500] sm:text-[14px] text-[10px] text-center">
                          {
                            data?.bookingOptions?.subscription?.packageType
                              ?.package2?.duration
                          }
                        </p>
                        {/* desktop end */}
                        <hr className="border-[#000000] border-[1.2px] sm:block hidden my-[3px]" />
                        <span className="relative flex flex-row group text-[#FF0000] cursor-pointer">
                          <p className="text-[#FF0000] font-[500] sm:text-[14px] text-[10px] min-w-[70px] whitespace-nowrap w-full text-center m-auto overflow-hidden">
                            {data?.bookingOptions?.subscription?.packageType
                              ?.package2?.kmsLimit == 0
                              ? "Unlimited"
                              : data?.bookingOptions?.subscription?.packageType
                                  ?.package2?.kmsLimit === null
                              ? "--"
                              : data?.bookingOptions?.subscription?.packageType
                                  ?.package2?.kmsLimit + " Free kms"}{" "}
                          </p>
                          {/* <span className="sm:block hidden">  ...</span> */}
                          {/* <div className="absolute left-0 bottom-full mb-2 hidden sm:group-hover:block bg-[#ff0000] text-white text-xs rounded py-1 px-2">
                            {data?.bookingOptions?.subscription?.packageType
                              ?.package2?.kmsLimit
                              ? data?.bookingOptions?.subscription?.packageType
                                  ?.package2?.kmsLimit 
                              : "0"}{" "}
                            Free kms
                          </div> */}
                        </span>
                      </span>
                    </div>
                    <div
                      onClick={() => {
                        // const calculatedPrice = calculateTotalPrice(pickupDateRedux,dropOffDateRedux,pickupTimeRedux,dropoffTimeRedux,
                        //   data?.bookingOptions?.subscription?.packageType
                        //     ?.package3?.price
                        // );
                        // if (calculatedPrice) {
                        //   setPrice(Math.round(calculatedPrice));

                        // } else {
                        //   console.error("Failed to calculate the total price");
                        // }
                        setPrice(
                          data?.bookingOptions?.subscription?.packageType
                            ?.package3?.price
                        );
                        setClicked1(false);
                        setClicked2(false);
                        setClicked3(true);
                      }}
                      className={`sm:flex flex-row items-center hover:scale-[1.05] duration-300 justify-between bg-white gap-3 border-[1.5px] border-[#FF0000] px-2 sm:py-2 py-[12px] rounded-lg w-[100%] sm:w-[240px] sm:h-[71px] cursor-pointer ${
                        clicked3
                          ? "border-black bg-gradient-to-r from-[#FFD7D7] transition-all to-[#fff]"
                          : ""
                      }`}
                    >
                      <span className="font-bold sm:text-[18px] text-[16px] leading-none block w-full text-center whitespace-nowrap sm:my-0 my-[3px]">
                        ₹{" "}
                        {(() => {
                          const price =
                            data?.bookingOptions?.subscription?.packageType
                              ?.package3?.price;
                          const priceNumber = Number(price);
                          return priceNumber.toString().length > 4
                            ? priceNumber.toLocaleString("en-IN")
                            : price;
                        })()}
                      </span>
                      <span className="flex flex-col gap-0">
                        {/* for desktop */}
                        <p className="text-[#565454] sm:block font-[500] sm:text-[14px] text-[10px] text-center">
                          {
                            data?.bookingOptions?.subscription?.packageType
                              ?.package3?.duration
                          }
                        </p>
                        {/* desktop end */}
                        <hr className="border-[#000000] border-[1.2px] sm:block hidden my-[3px]" />
                        <span className="relative flex flex-row group text-[#FF0000] cursor-pointer">
                          <p className="text-[#FF0000] font-[500] sm:text-[14px] text-[10px] text-center m-auto whitespace-nowrap w-full overflow-hidden">
                            {data?.bookingOptions?.subscription?.packageType
                              ?.package3?.kmsLimit == 0
                              ? "Unlimited"
                              : data?.bookingOptions?.subscription?.packageType
                                  ?.package3?.kmsLimit === null
                              ? "--"
                              : data?.bookingOptions?.subscription?.packageType
                                  ?.package3?.kmsLimit + " Free kms"}{" "}
                          </p>
                          {/* <span className="sm:block hidden"> ...</span> */}
                          {/* <div className="absolute left-0 bottom-full mb-2 hidden sm:group-hover:block bg-[#ff0000] text-white text-xs rounded py-1 px-2">
                            {data?.bookingOptions?.subscription?.packageType
                              ?.package3?.kmsLimit
                              ? data?.bookingOptions?.subscription?.packageType
                                  ?.package3?.kmsLimit
                              : "0"}{" "}
                            Free kms
                          </div> */}
                        </span>
                      </span>
                    </div>
                  </div>

                  {/* for mobile view */}
                  <div className="flex sm:hidden flex-col items-center jusitfy-center sm:w-[486px] h-full ">
                    <div className="flex flex-row justify-center my-2">
                      <h1 className="m-auto font-bold text-[24px]">
                        {data?.carName}
                      </h1>
                    </div>
                    <Image
                      src={data?.featuredImage?.image}
                      width={386}
                      objectFit={"contain"}
                      height={212}
                      alt={data?.featuredImage?.alt}
                      className="w-[70%] mb-2"
                    />
                    <div
                      onClick={() => setShowImg(!showImg)}
                      className="flex flex-row items-center gap-2 border-[1.2px] border-[#ff0000] px-1 rounded-md mb-4 cursor-pointer py-[3px]"
                    >
                      <Image
                        src="/carListing/view.png"
                        width={12}
                        objectFit={"contain"}
                        height={12}
                        alt="Car Icon"
                      />
                      <span className="text-[#ff0000] sm:text-[15px] text-xs font-semibold">
                        View Real Car Images
                      </span>
                    </div>
                  </div>

                  {/*  */}
                  <div className="sm:flex hidden flex-row justify-end mr-5 my-5">
                    {data?.bookingOptions?.subscription?.packageType
                      ?.extraKmsCharge && (
                      <span>
                        Extra kms will be charged at{" "}
                        <span className="text-[#FF0000]">
                          ₹
                          {
                            data?.bookingOptions?.subscription?.packageType
                              ?.extraKmsCharge
                          }
                        </span>
                      </span>
                    )}
                  </div>

                  {/*  */}

                  <div className="sm:flex flex-row justify-between items-center sm:mr-5">
                    <div className="grid grid-cols-3 gap-4 sm:mt-4 items-center sm:w-full gap-y-6 sm:ml-4 gap-2 sm:text-[15px] text-[13px] sm:mb-0 mb-4">
                      {data?.carFeatures?.bluetooth === true && (
                        <div className="flex flex-row items-center gap-2">
                          <Image
                            src="/carListing/bluetooth.png"
                            width={20}
                            objectFit={"contain"}
                            height={20}
                            alt="bluetooth"
                          />
                          <span className="lg:text-[15px] text-[10px]">
                            Bluetooth
                          </span>
                        </div>
                      )}

                      <div className="flex flex-row items-center gap-2">
                        <Image
                          src="/carListing/manual.png"
                          width={20}
                          objectFit={"contain"}
                          height={20}
                          alt="bluetooth"
                        />
                        <span className="lg:text-[15px] text-[10px]">
                          Manual
                        </span>
                      </div>

                      <div className="flex flex-row items-center gap-2">
                        <Image
                          src="/carListing/seats.png"
                          width={20}
                          objectFit={"contain"}
                          height={20}
                          alt="bluetooth"
                        />
                        <span className="lg:text-[15px] text-[10px]">
                          {data?.seatingCapacity} Person
                        </span>
                      </div>
                      {data?.vehicleSpecifications?.fuelType && (
                        <div className="flex flex-row items-center gap-2">
                          <Image
                            src="/carListing/gas.png"
                            width={20}
                            objectFit={"contain"}
                            height={20}
                            alt="bluetooth"
                          />
                          <span className="lg:text-[15px] text-[10px]">
                            {data?.vehicleSpecifications?.fuelType}
                          </span>
                        </div>
                      )}
                      {data?.carFeatures?.navigationSystem === true && (
                        <div className="flex flex-row items-center gap-2">
                          <Image
                            src="/carListing/gps.png"
                            width={20}
                            objectFit={"contain"}
                            height={20}
                            alt="bluetooth"
                          />
                          <span className="whitespace-nowrap lg:text-[15px] text-[10px]">
                            GPS Navigation
                          </span>
                        </div>
                      )}

                      <div className="flex flex-row items-center gap-2">
                        <Image
                          src="/carListing/bootspace.png"
                          width={20}
                          objectFit={"contain"}
                          height={20}
                          alt="bluetooth"
                        />
                        <span className="lg:text-[15px] text-[10px]">
                          Boot Space
                        </span>
                      </div>
                    </div>
                    <div className="m-0 sm:block flex justify-end sm:mr-0">
                      {data.vehicleStatus === "Sold Out" ||
                      data.vehicleStatus === "Not Available" ? (
                        <ThemeButton
                          text={
                            data.vehicleStatus === "Sold Out"
                              ? "Booked"
                              : data.vehicleStatus === "Not Available"
                              ? "Sold Out"
                              : ""
                          }
                          className=" sm:px-6 !px-2 grad-button shadow-custom-shadow sm:text-md sm:w-[140px] sm:h-[50px] w-[120px] h-[42px] text-center flex flex-row justify-center sm:!font-bold !font-semibold sm:!text-[20px] !text-lg opacity-50 cursor-not-allowed"
                        />
                      ) : (
                        <ThemeButton
                          onClick={() => {
                            Navigation.push(`/car-details/${data._id}`),
                              selectDefaultPackage(data);
                          }}
                          text="Book Now"
                          className=" sm:px-6 !px-2 sm:text-md text-xs sm:w-[140px] sm:h-[50px] w-[120px] h-[42px] text-center shadow-lg flex flex-row justify-center sm:!font-bold !font-semibold sm:!text-[20px] !text-lg"
                        />
                      )}
                    </div>
                  </div>
                  <div className="flex flex-row justify-end items-center sm:w-full sm:ml-0 sm:ml-4 sm:text-[15px] text-sm !pr-10 gap-2 cursor-pointer mt-2 absolute sm:bottom-0 bottom-[10px] sm:right-[8px]">
                    <span
                      className="text-[#ff0000]"
                      onClick={() => setShowOptionsMobile(!showOptionsMobile)}
                    >
                      View Details{" "}
                    </span>
                    <Image
                      src="/carListing/arrow.png"
                      width={10}
                      objectFit={"contain"}
                      height={10}
                      alt="bluetooth"
                    />
                  </div>
                </div>
              </>
            ) : bookingOptionsHome ===
              data?.bookingOptions?.withDriver?.name ? (
              <>
                {radioToggle ==
                  data?.bookingOptions?.withDriver?.oneway?.name && (
                  <>
                    {" "}
                    <div className="absolute sm:block -left-2 sm:top-[20px] top-[15px] z-10 w-fit">
                      <Image
                        src="/png/red-design.png"
                        width={133}
                        objectFit={"contain"}
                        height={46}
                        alt="Tag Icon"
                      />
                      <span className="text-white absolute z-[9] top-[5px] text-sm left-0 right-0 m-auto w-fit">
                        {data?.brandName}
                      </span>
                    </div>
                    <div className="sm:flex hidden flex-col items-center jusitfy-center w-[486px] h-full ">
                      <div className="flex flex-row justify-center m-auto mt-16">
                        <h1 className="m-auto font-bold text-[24px]">
                          {data?.carName}
                        </h1>
                      </div>
                      <Image
                        src={data?.featuredImage?.image}
                        width={386}
                        objectFit={"contain"}
                        height={212}
                        alt={data?.featuredImage?.alt}
                        className="sm:w-[95%] mb-2"
                      />
                      <div
                        onClick={() => setShowImg(!showImg)}
                        className="flex flex-row items-center gap-2 border-[1.2px] border-[#ff0000] px-1 rounded-md mb-4 cursor-pointer py-[3px]"
                      >
                        <Image
                          src="/carListing/view.png"
                          width={12}
                          objectFit={"contain"}
                          height={12}
                          alt="Car Icon"
                        />
                        <span className="text-[#ff0000] text-sm font-semibold">
                          View Real Car Images
                        </span>
                      </div>
                    </div>
                    <div className="sm:h-[274px] relative max-w-[700px] w-full">
                      <div
                        className={`mt-5 sm:flex grid grid-cols-3 flex-row justify-start items-center sm:gap-4 gap-2 sm:mr-5 px-4 ${
                          bookingOptionsHome === "Driver" &&
                          driverType === "One-way" &&
                          "w-full grid-cols-1"
                        }`}
                      >
                        {data?.bookingOptions.withDriver.oneway.doorstepDelivery
                          .filter((item: any) => item.city === dropLocation)
                          .map((item: any, index: number) => {
                            return (
                              <div
                                key={index}
                                onClick={() => {
                                  const calculatedPrice = calculateTotalPrice(pickupDateRedux,dropOffDateRedux,pickupTimeRedux,dropoffTimeRedux,
                                    data?.bookingOptions?.withDriver?.local
                                      ?.packageType?.package1?.price
                                  );
                                  if (calculatedPrice) {
                                    setPrice(item.price.toFixed(0));
                                  } else {
                                    console.error(
                                      "Failed to calculate the total price"
                                    );
                                  }
                                  setClicked1(true);
                                  setClicked2(false);
                                  setClicked3(false);
                                }}
                                className={`sm:flex flex-row hover:scale-[1.05] duration-300 items-center justify-center bg-white gap-3 border-[1.5px] border-[#FF0000] px-2 sm:py-2 py-[12px] rounded-lg sm:w-[210px] sm:h-[71px] ${
                                  clicked1
                                    ? "border-black bg-gradient-to-r from-[#FFD7D7] transition-all  to-[#fff]"
                                    : ""
                                }  `}
                              >
                                <span className="flex flex-col  gap-0">
                                  {/* for desktop */}
                                  <p className="text-[#565454] sm:block hidden font-[500] sm:text-[14px] xs:text-xs text-[13px] text-center">
                                    {item.city}
                                  </p>
                                  {/* desktop end */}
                                  <hr className="border-[#000000] border-[1.2px] sm:block hidden my-[3px]" />
                                  <span className="relative flex flex-row group text-[#FF0000] cursor-pointer">
                                    <p className="text-[#FF0000] font-[500] sm:text-[20px] font-bold text-center xs:text-xs text-[13px] whitespace-nowrap w-full text-center overflow-hidden m-auto">
                                      ₹ {item.price}
                                    </p>
                                  </span>
                                </span>
                              </div>
                            );
                          })}
                      </div>
                      {/* mobile view */}
                      <div className="flex sm:hidden flex-col items-center jusitfy-center h-full ">
                        <div className="flex flex-row justify-center m-auto my-2">
                          <h1 className="m-auto font-bold text-[24px]">
                            {data?.carName}
                          </h1>
                        </div>
                        <Image
                          src={data?.featuredImage?.image}
                          width={386}
                          objectFit={"contain"}
                          height={212}
                          alt={data?.featuredImage?.alt}
                          className="w-[70%] mb-2"
                        />
                        <div
                          onClick={() => setShowImg(!showImg)}
                          className="flex flex-row items-center gap-2 border-[1.2px] border-[#ff0000] px-1 rounded-md mb-4 cursor-pointer py-[3px] sm:mt-0 mt-2"
                        >
                          <Image
                            src="/carListing/view.png"
                            width={12}
                            objectFit={"contain"}
                            height={12}
                            alt="Car Icon"
                          />
                          <span className="text-[#ff0000] sm:text-sm text-xs font-semibold">
                            View Real Car Images
                          </span>
                        </div>
                      </div>
                      {/*  */}
                      <div className="sm:flex hidden flex-row justify-end mr-10 my-5">
                        {/* {data?.bookingOptions?.withDriver?.local?.packageType
                            ?.extraKmsCharge && (
                              <span>
                                Extra kms will be charged at{" "}
                                <span className="text-[#FF0000]">
                                  ₹
                                  {(() => {
                                    const price =
                                      data?.bookingOptions?.withDriver?.local
                                        ?.packageType?.extraKmsCharge;
                                    const priceNumber = Number(price);
                                    return priceNumber.toString().length > 4
                                      ? priceNumber.toLocaleString("en-IN")
                                      : price;
                                  })()}
                                </span>
                              </span>
                            )} */}
                      </div>

                      {/*  */}

                      <div className="sm:flex flex-row justify-between items-center sm:mr-10">
                        <div className="grid grid-cols-3 gap-4 sm:mt-4 items-center sm:w-full gap-y-6 sm:ml-8 sm:px-0 px-4 sm:mb-0 mb-4 sm:text-[15px] xs:text-xs text-xs gap-4">
                          {data?.carFeatures?.bluetooth === true && (
                            <div className="flex flex-row items-center gap-2">
                              <Image
                                src="/carListing/bluetooth.png"
                                width={20}
                                objectFit={"contain"}
                                height={20}
                                alt="bluetooth"
                              />
                              <span>Bluetooth</span>
                            </div>
                          )}

                          <div className="flex flex-row items-center gap-2">
                            <Image
                              src="/carListing/manual.png"
                              width={20}
                              objectFit={"contain"}
                              height={20}
                              alt="bluetooth"
                            />
                            <span>Manual</span>
                          </div>
                          {data?.carFeatures?.navigationSystem === true && (
                            <div className="flex flex-row items-center gap-2">
                              <Image
                                src="/carListing/gps.png"
                                width={20}
                                objectFit={"contain"}
                                height={20}
                                alt="bluetooth"
                              />
                              <span>GPS Navigation</span>
                            </div>
                          )}
                          <div className="flex flex-row items-center gap-2">
                            <Image
                              src="/carListing/seats.png"
                              width={20}
                              objectFit={"contain"}
                              height={20}
                              alt="bluetooth"
                            />
                            <span>{data?.seatingCapacity} Person</span>
                          </div>
                          {data?.vehicleSpecifications?.fuelType && (
                            <div className="flex flex-row items-center gap-2">
                              <Image
                                src="/carListing/gas.png"
                                width={20}
                                objectFit={"contain"}
                                height={20}
                                alt="bluetooth"
                              />
                              <span>
                                {data?.vehicleSpecifications?.fuelType}
                              </span>
                            </div>
                          )}
                          <div className="flex flex-row items-center gap-2">
                            <Image
                              src="/carListing/bootspace.png"
                              width={20}
                              objectFit={"contain"}
                              height={20}
                              alt="bluetooth"
                            />
                            <span>Boot Space</span>
                          </div>
                        </div>
                        <div className="m-0 sm:block flex justify-end sm:pr-0 pr-4">
                          {data.vehicleStatus === "Sold Out" ||
                          data.vehicleStatus === "Not Available" ? (
                            <ThemeButton
                              text={
                                data.vehicleStatus === "Sold Out"
                                  ? "Booked"
                                  : data.vehicleStatus === "Not Available"
                                  ? "Sold Out"
                                  : ""
                              }
                              className=" sm:px-6 !px-2 grad-button shadow-custom-shadow sm:text-md sm:w-[140px] sm:h-[50px] w-[120px] h-[42px] text-center flex flex-row justify-center sm:!font-bold !font-semibold sm:!text-[20px] !text-lg opacity-50 cursor-not-allowed"
                            />
                          ) : (
                            <ThemeButton
                              onClick={() => {
                                Navigation.push(`/car-details/${data._id}`),
                                  selectDefaultPackage(data);
                              }}
                              text="Book Now"
                              className=" sm:px-6 !px-2 sm:text-md text-xs sm:w-[140px] w-[120px] sm:h-[50px] h-[42px] text-center shadow-lg flex flex-row justify-center !font-bold sm:!text-[20px] !text-lg"
                            />
                          )}
                        </div>
                      </div>
                      <div className="flex flex-row justify-end items-center sm:w-full sm:!pr-10 sm:ml-0 ml-4 gap-2 cursor-pointer mt-2 absolute sm:bottom-0 bottom-[10px]">
                        <span
                          className="text-[#ff0000] sm:text-[15px] text-sm"
                          onClick={() =>
                            setShowOptionsMobile(!showOptionsMobile)
                          }
                        >
                          View Details{" "}
                        </span>
                        <Image
                          src="/carListing/arrow.png"
                          width={10}
                          objectFit={"contain"}
                          height={10}
                          alt="bluetooth"
                        />
                      </div>
                    </div>
                  </>
                )}
                {driverType ===
                  data?.bookingOptions?.withDriver?.local?.name && (
                  <>
                    {" "}
                    <div className="absolute sm:block -left-2 sm:top-[20px] top-[15px] z-10 w-fit">
                      <Image
                        src="/png/red-design.png"
                        width={133}
                        objectFit={"contain"}
                        height={46}
                        alt="Tag Icon"
                      />
                      <span className="text-white absolute z-[9] top-[5px] text-sm left-0 right-0 m-auto w-fit">
                        {data?.brandName}
                      </span>
                    </div>
                    <div className="sm:flex hidden flex-col items-center jusitfy-center w-[486px] h-full ">
                      <div className="flex flex-row justify-center m-auto mt-16">
                        <h1 className="m-auto font-bold text-[24px]">
                          {data?.carName}
                        </h1>
                      </div>
                      <Image
                        src={data?.featuredImage?.image}
                        width={386}
                        objectFit={"contain"}
                        height={212}
                        alt={data?.featuredImage?.alt}
                        className="sm:w-[95%] mb-2"
                      />
                      <div
                        onClick={() => setShowImg(!showImg)}
                        className="flex flex-row items-center gap-2 border-[1.2px] border-[#ff0000] px-1 rounded-md mb-4 cursor-pointer py-[3px]"
                      >
                        <Image
                          src="/carListing/view.png"
                          width={12}
                          objectFit={"contain"}
                          height={12}
                          alt="Car Icon"
                        />
                        <span className="text-[#ff0000] text-sm font-semibold">
                          View Real Car Images
                        </span>
                      </div>
                    </div>
                    <div className="sm:h-[274px] relative max-w-[700px] w-full">
                      <div className="mt-5 sm:flex grid grid-cols-3 flex-row items-center sm:gap-4 gap-2 sm:mr-5 px-4">
                        <div
                          onClick={() => {
                            const calculatedPrice = calculateTotalPrice(pickupDateRedux,dropOffDateRedux,pickupTimeRedux,dropoffTimeRedux,
                              data?.bookingOptions?.withDriver?.local
                                ?.packageType?.package1?.price
                            );
                            if (calculatedPrice) {
                              setPrice(Math.round(calculatedPrice));
                            } else {
                              console.error(
                                "Failed to calculate the total price"
                              );
                            }
                            setFreekms(
                              Number(
                                (
                                  data?.bookingOptions?.withDriver?.local
                                    ?.packageType?.package1?.kmsLimit *
                                  (((days as number) + hours / 24) as number)
                                ).toFixed(0)
                              )
                            );
                            setClicked1(true);
                            setClicked2(false);
                            setClicked3(false);
                          }}
                          className={`sm:flex flex-row hover:scale-[1.05] duration-300 items-center justify-between bg-white gap-3 border-[1.5px] border-[#FF0000] px-2 sm:py-2 py-[12px] rounded-lg sm:w-[210px] sm:h-[71px] ${
                            clicked1
                              ? "border-black bg-gradient-to-r from-[#FFD7D7] transition-all  to-[#fff]"
                              : ""
                          }`}
                        >
                          <span className="font-bold sm:text-[18px] text-[18px] block w-full text-center leading-none whitespace-nowrap sm:my-0 my-[3px]">
                            ₹{" "}
                            {(() => {
                              const price = calculateTotalPrice(pickupDateRedux,dropOffDateRedux,pickupTimeRedux,dropoffTimeRedux,
                                data?.bookingOptions?.withDriver?.local
                                  ?.packageType?.package1?.price
                              )?.toFixed(0);
                              const priceNumber = Number(price);
                              return priceNumber.toString().length > 4
                                ? priceNumber.toLocaleString("en-IN")
                                : price;
                            })()}
                          </span>
                          <span className="flex flex-col gap-0">
                            {/* for desktop */}
                            <p className="text-[#565454] sm:block hidden font-[500] sm:text-[14px] xs:text-xs text-[13px] text-center">
                              {
                                data?.bookingOptions?.withDriver?.local
                                  ?.packageType?.package1?.duration
                              }
                            </p>
                            {/* desktop end */}
                            <hr className="border-[#000000] border-[1.2px] sm:block hidden my-[3px]" />
                            <span className="relative flex flex-row group text-[#FF0000] cursor-pointer">
                              <p className="text-[#FF0000] font-[500] sm:text-[13px] text-center xs:text-xs text-[13px] whitespace-nowrap w-full text-center overflow-hidden m-auto">
                                {data?.bookingOptions?.withDriver?.local
                                  ?.packageType?.package1?.kmsLimit == 0
                                  ? "Unlimited"
                                  : data?.bookingOptions?.withDriver?.local
                                      ?.packageType?.package1?.kmsLimit === null
                                  ? "--"
                                  : (
                                      data?.bookingOptions?.withDriver?.local
                                        ?.packageType?.package1?.kmsLimit *
                                      (((days as number) +
                                        hours / 24) as number)
                                    ).toFixed(0) + " Free kms"}{" "}
                              </p>
                              {/* <span className="sm:block hidden">  ...</span> */}
                              {/* <div className="absolute left-0 bottom-full mb-2 hidden sm:group-hover:block bg-[#ff0000] text-white text-xs rounded py-1 px-2">
                                {data?.bookingOptions?.withDriver?.local
                                  ?.packageType?.package1?.kmsLimit
                                  ? data?.bookingOptions?.withDriver?.local
                                      ?.packageType?.package1?.kmsLimit *
                                    (days as number)
                                  : "0"}{" "}
                                Free kms
                              </div> */}
                            </span>
                          </span>
                        </div>
                        <div
                          onClick={() => {
                            const calculatedPrice = calculateTotalPrice(pickupDateRedux,dropOffDateRedux,pickupTimeRedux,dropoffTimeRedux,
                              data?.bookingOptions?.withDriver?.local
                                ?.packageType?.package2?.price
                            );
                            if (calculatedPrice) {
                              setPrice(Math.round(calculatedPrice));
                            } else {
                              console.error(
                                "Failed to calculate the total price"
                              );
                            }
                            setFreekms(
                              Number(
                                (
                                  data?.bookingOptions?.withDriver?.local
                                    ?.packageType?.package2?.kmsLimit *
                                  (((days as number) + hours / 24) as number)
                                ).toFixed(0)
                              )
                            );
                            setClicked1(false);
                            setClicked2(true);
                            setClicked3(false);
                          }}
                          className={`sm:flex flex-row hover:scale-[1.05] cursor-pointer duration-300 items-center justify-between bg-white gap-3 border-[1.5px] border-[#FF0000] px-2 sm:py-2 py-[12px] rounded-lg sm:w-[210px] sm:h-[71px] ${
                            clicked2
                              ? " border-black bg-gradient-to-r from-[#FFD7D7] transition-all  to-[#fff]"
                              : ""
                          }`}
                        >
                          <span className="font-bold sm:text-[18px] text-[18px] block w-full text-center m-auto leading-none whitespace-nowrap sm:my-0 my-[3px]">
                            ₹{" "}
                            {(() => {
                              const price = calculateTotalPrice(pickupDateRedux,dropOffDateRedux,pickupTimeRedux,dropoffTimeRedux,
                                data?.bookingOptions?.withDriver?.local
                                  ?.packageType?.package2?.price
                              )?.toFixed(0);
                              const priceNumber = Number(price);
                              return priceNumber.toString().length > 4
                                ? priceNumber.toLocaleString("en-IN")
                                : price;
                            })()}
                          </span>
                          <span className="flex flex-col gap-0">
                            {/* for desktop */}
                            <p className="text-[#565454] sm:block hidden font-[500] sm:text-[14px] xs:text-xs text-[13px] text-center">
                              {
                                data?.bookingOptions?.withDriver?.local
                                  ?.packageType?.package2?.duration
                              }
                            </p>
                            {/* desktop end */}
                            <hr className="border-[#000000] border-[1.2px] sm:block hidden my-[3px]" />
                            <span className="relative flex flex-row group text-[#FF0000] cursor-pointer">
                              <p className="text-[#FF0000] font-[500] sm:text-[13px] text-center xs:text-xs text-[13px] min-w-[70px] whitespace-nowrap w-full overflow-hidden m-auto">
                                {data?.bookingOptions?.withDriver?.local
                                  ?.packageType?.package2?.kmsLimit == 0
                                  ? "Unlimited"
                                  : data?.bookingOptions?.withDriver?.local
                                      ?.packageType?.package2?.kmsLimit === null
                                  ? "--"
                                  : (
                                      data?.bookingOptions?.withDriver?.local
                                        ?.packageType?.package2?.kmsLimit *
                                      (((days as number) +
                                        hours / 24) as number)
                                    ).toFixed(0) + " Free kms"}{" "}
                              </p>
                              {/* <span className="sm:block hidden">  ...</span> */}
                              {/* <div className="absolute left-0 bottom-full mb-2 hidden sm:group-hover:block bg-[#ff0000] text-white text-xs rounded py-1 px-2">
                                {data?.bookingOptions?.withDriver?.local
                                  ?.packageType?.package2?.kmsLimit
                                  ? data?.bookingOptions?.withDriver?.local
                                      ?.packageType?.package2?.kmsLimit *
                                    (days as number)
                                  : "0"}{" "}
                                Free kms
                              </div> */}
                            </span>
                          </span>
                        </div>
                        <div
                          onClick={() => {
                            const calculatedPrice = calculateTotalPrice(pickupDateRedux,dropOffDateRedux,pickupTimeRedux,dropoffTimeRedux,
                              data?.bookingOptions?.withDriver?.local
                                ?.packageType?.package3?.price
                            );
                            if (calculatedPrice) {
                              setPrice(Math.round(calculatedPrice));
                            } else {
                              console.error(
                                "Failed to calculate the total price"
                              );
                            }
                            setFreekms(
                              Number(
                                (
                                  data?.bookingOptions?.withDriver?.local
                                    ?.packageType?.package3?.kmsLimit *
                                  (((days as number) + hours / 24) as number)
                                ).toFixed(0)
                              )
                            );
                            setClicked1(false);
                            setClicked2(false);
                            setClicked3(true);
                          }}
                          className={`sm:flex hover:scale-[1.05] duration-300 cursor-pointer flex-row items-center justify-between bg-white gap-3 border-[1.5px] border-[#FF0000] px-2 sm:py-2 py-[12px] rounded-lg sm:w-[210px] sm:h-[71px] ${
                            clicked3
                              ? "border-black bg-gradient-to-r from-[#FFD7D7] transition-all  to-[#fff]"
                              : ""
                          }`}
                        >
                          <span className="font-bold sm:text-[18px] text-[18px] block w-full text-center m-auto leading-none whitespace-nowrap sm:my-0 my-[3px]">
                            ₹{" "}
                            {(() => {
                              const price = calculateTotalPrice(pickupDateRedux,dropOffDateRedux,pickupTimeRedux,dropoffTimeRedux,
                                data?.bookingOptions?.withDriver?.local
                                  ?.packageType?.package3?.price
                              )?.toFixed(0);
                              const priceNumber = Number(price);
                              return priceNumber.toString().length > 4
                                ? priceNumber.toLocaleString("en-IN")
                                : price;
                            })()}
                          </span>
                          <span className="flex flex-col gap-0">
                            {/* for desktop */}
                            <p className="text-[#565454] sm:block hidden font-[500] sm:text-[14px] xs:text-xs text-[13px] text-center">
                              {
                                data?.bookingOptions?.withDriver?.local
                                  ?.packageType?.package3?.duration
                              }
                            </p>
                            {/* desktop end */}
                            <hr className="border-[#000000] border-[1.2px] sm:block hidden my-[3px]" />
                            <span className="relative flex flex-row group text-[#FF0000] cursor-pointer">
                              <p className="text-[#FF0000] font-[500] sm:text-[13px] text-center xs:text-xs text-[13px] whitespace-nowrap w-full overflow-hidden m-auto">
                                {data?.bookingOptions?.withDriver?.local
                                  ?.packageType?.package3?.kmsLimit == 0
                                  ? "Unlimited"
                                  : data?.bookingOptions?.withDriver?.local
                                      ?.packageType?.package3?.kmsLimit === null
                                  ? "--"
                                  : (
                                      data?.bookingOptions?.withDriver?.local
                                        ?.packageType?.package3?.kmsLimit *
                                      (((days as number) +
                                        hours / 24) as number)
                                    ).toFixed(0) + " Free kms"}{" "}
                              </p>
                              {/* <span className="sm:block hidden"> ...</span> */}
                              {/* <div className="absolute left-0 bottom-full mb-2 hidden sm:group-hover:block bg-[#ff0000] text-white text-xs rounded py-1 px-2">
                                {data?.bookingOptions?.withDriver?.local
                                  ?.packageType?.package3?.kmsLimit
                                  ? data?.bookingOptions?.withDriver?.local
                                      ?.packageType?.package3?.kmsLimit *
                                    (days as number)
                                  : "0"}{" "}
                                Free kms
                              </div> */}
                            </span>
                          </span>
                        </div>
                      </div>
                      {/* mobile view */}
                      <div className="flex sm:hidden flex-col items-center jusitfy-center h-full ">
                        <div className="flex flex-row justify-center m-auto my-2">
                          <h1 className="m-auto font-bold text-[24px]">
                            {data?.carName}
                          </h1>
                        </div>
                        <Image
                          src={data?.featuredImage?.image}
                          width={386}
                          objectFit={"contain"}
                          height={212}
                          alt={data?.featuredImage?.alt}
                          className="w-[70%] mb-2"
                        />
                        <div
                          onClick={() => setShowImg(!showImg)}
                          className="flex flex-row items-center gap-2 border-[1.2px] border-[#ff0000] px-1 rounded-md mb-4 cursor-pointer py-[3px] sm:mt-0 mt-2"
                        >
                          <Image
                            src="/carListing/view.png"
                            width={12}
                            objectFit={"contain"}
                            height={12}
                            alt="Car Icon"
                          />
                          <span className="text-[#ff0000] sm:text-sm text-xs font-semibold">
                            View Real Car Images
                          </span>
                        </div>
                      </div>
                      {/*  */}
                      <div className="sm:flex hidden flex-row justify-end mr-10 my-5">
                        {/* {data?.bookingOptions?.withDriver?.local?.packageType
                              ?.extraKmsCharge && (
                                <span>
                                  Extra kms will be charged at{" "}
                                  <span className="text-[#FF0000]">
                                    ₹
                                    {(() => {
                                      const price =
                                        data?.bookingOptions?.withDriver?.local
                                          ?.packageType?.extraKmsCharge;
                                      const priceNumber = Number(price);
                                      return priceNumber.toString().length > 4
                                        ? priceNumber.toLocaleString("en-IN")
                                        : price;
                                    })()}
                                  </span>
                                </span>
                              )} */}
                      </div>

                      {/*  */}

                      <div className="sm:flex flex-row justify-between items-center sm:mr-10">
                        <div className="grid grid-cols-3 gap-4 sm:mt-4 items-center sm:w-full gap-y-6 sm:ml-8 sm:px-0 px-4 sm:mb-0 mb-4 sm:text-[15px] xs:text-xs text-xs gap-4">
                          {data?.carFeatures?.bluetooth === true && (
                            <div className="flex flex-row items-center gap-2">
                              <Image
                                src="/carListing/bluetooth.png"
                                width={20}
                                objectFit={"contain"}
                                height={20}
                                alt="bluetooth"
                              />
                              <span>Bluetooth</span>
                            </div>
                          )}

                          <div className="flex flex-row items-center gap-2">
                            <Image
                              src="/carListing/manual.png"
                              width={20}
                              objectFit={"contain"}
                              height={20}
                              alt="bluetooth"
                            />
                            <span>Manual</span>
                          </div>
                          {data?.carFeatures?.navigationSystem === true && (
                            <div className="flex flex-row items-center gap-2">
                              <Image
                                src="/carListing/gps.png"
                                width={20}
                                objectFit={"contain"}
                                height={20}
                                alt="bluetooth"
                              />
                              <span>GPS Navigation</span>
                            </div>
                          )}
                          <div className="flex flex-row items-center gap-2">
                            <Image
                              src="/carListing/seats.png"
                              width={20}
                              objectFit={"contain"}
                              height={20}
                              alt="bluetooth"
                            />
                            <span>{data?.seatingCapacity} Person</span>
                          </div>
                          {data?.vehicleSpecifications?.fuelType && (
                            <div className="flex flex-row items-center gap-2">
                              <Image
                                src="/carListing/gas.png"
                                width={20}
                                objectFit={"contain"}
                                height={20}
                                alt="bluetooth"
                              />
                              <span>
                                {data?.vehicleSpecifications?.fuelType}
                              </span>
                            </div>
                          )}
                          <div className="flex flex-row items-center gap-2">
                            <Image
                              src="/carListing/bootspace.png"
                              width={20}
                              objectFit={"contain"}
                              height={20}
                              alt="bluetooth"
                            />
                            <span>Boot Space</span>
                          </div>
                        </div>
                        <div className="m-0 sm:block flex justify-end sm:pr-0 pr-4">
                          {data.vehicleStatus === "Sold Out" ||
                          data.vehicleStatus === "Not Available" ? (
                            <ThemeButton
                              text={
                                data.vehicleStatus === "Sold Out"
                                  ? "Booked"
                                  : data.vehicleStatus === "Not Available"
                                  ? "Sold Out"
                                  : ""
                              }
                              className=" sm:px-6 !px-2 grad-button shadow-custom-shadow sm:text-md sm:w-[140px] sm:h-[50px] w-[120px] h-[42px] text-center flex flex-row justify-center sm:!font-bold !font-semibold sm:!text-[20px] !text-lg opacity-50 cursor-not-allowed"
                            />
                          ) : (
                            <ThemeButton
                              onClick={() => {
                                Navigation.push(`/car-details/${data._id}`),
                                  selectDefaultPackage(data);
                              }}
                              text="Book Now"
                              className=" sm:px-6 !px-2 sm:text-md text-xs sm:w-[140px] w-[120px] sm:h-[50px] h-[42px] text-center shadow-lg flex flex-row justify-center !font-bold sm:!text-[20px] !text-lg"
                            />
                          )}
                        </div>
                      </div>
                      <div className="flex flex-row justify-end items-center sm:w-full sm:!pr-10 sm:ml-0 ml-4 gap-2 cursor-pointer mt-2 absolute sm:bottom-0 bottom-[10px]">
                        <span
                          className="text-[#ff0000] sm:text-[15px] text-sm"
                          onClick={() =>
                            setShowOptionsMobile(!showOptionsMobile)
                          }
                        >
                          View Details{" "}
                        </span>
                        <Image
                          src="/carListing/arrow.png"
                          width={10}
                          objectFit={"contain"}
                          height={10}
                          alt="bluetooth"
                        />
                      </div>
                    </div>
                  </>
                )}
                {driverType ===
                  data?.bookingOptions.withDriver.outstation.name && (
                  <>
                    <div className="absolute sm:block -left-2 sm:top-[20px] top-[15px] z-10 w-fit">
                      <Image
                        src="/png/red-design.png"
                        width={133}
                        objectFit={"contain"}
                        height={46}
                        alt="Tag Icon"
                      />
                      <span className="text-white absolute z-[9] top-[5px] text-sm left-0 right-0 m-auto w-fit">
                        {data?.brandName}
                      </span>
                    </div>
                    <div className="sm:flex hidden flex-col items-center jusitfy-center w-[486px] h-full ">
                      <div className="flex flex-row justify-center m-auto mt-16">
                        <h1 className="m-auto font-bold text-[24px]">
                          {data?.carName}
                        </h1>
                      </div>
                      <Image
                        src={data?.featuredImage?.image}
                        width={386}
                        objectFit={"contain"}
                        height={212}
                        alt={data?.featuredImage?.alt}
                        className="sm:w-[95%] mb-2"
                      />
                      <div
                        onClick={() => setShowImg(!showImg)}
                        className="flex flex-row items-center gap-2 border-[1.2px] border-[#ff0000] px-1 rounded-md mb-4 cursor-pointer py-[3px]"
                      >
                        <Image
                          src="/carListing/view.png"
                          width={12}
                          objectFit={"contain"}
                          height={12}
                          alt="Car Icon"
                        />
                        <span className="text-[#ff0000] text-sm font-semibold">
                          View Real Car Images
                        </span>
                      </div>
                    </div>
                    <div className="sm:h-[274px] relative max-w-[700px] w-full px-4">
                      <div className="mt-5 sm:flex grid grid-cols-[30%_70%] flex-row items-center w-full sm:gap-4 gap-2 sm:mr-5 sm:px-0 px-2">
                        <div
                          onClick={() => {
                            setPrice(
                              data?.bookingOptions?.withDriver?.outstation
                                ?.packageType?.package1?.ratePerKm
                            );
                            setClicked1(true);
                            setClicked2(false);
                            setClicked3(false);
                          }}
                          className={`bg-white border-[1.5px] hover:scale-[1.05] duration-300 cursor-pointer border-[#FF0000] px-2 py-[12px] rounded-lg sm:w-[210px] sm:h-[60px] h-full ${
                            clicked1
                              ? "border-black bg-gradient-to-r from-[#FFD7D7] transition-all  to-[#fff]"
                              : ""
                          }`}
                        >
                          <p className="font-bold sm:text-[18px] text-[15px] text-center h-full flex items-center justify-center flex flex-wrap">
                            {/* {data?.bookingOptions?.subscription?.package1?.price} */}
                            ₹
                            {
                              data?.bookingOptions?.withDriver?.outstation
                                ?.packageType?.package1?.ratePerKm
                            }
                            /<span className="text-primary">Km</span>
                          </p>
                        </div>
                        {/* <div
                            onClick={() => {
                              setPrice(
                                data?.bookingOptions?.withDriver?.outstation
                                  ?.packageType?.package2?.ratePerKm
                              );

                              setClicked1(false);
                              setClicked2(true);
                              setClicked3(false);
                            }}
                            className={`bg-white border-[1.5px] hover:scale-[1.05] duration-300 cursor-pointer border-[#FF0000] px-2 py-[12px] rounded-lg sm:w-[210px] sm:h-[60px] h-full ${clicked2
                              ? "border-black bg-gradient-to-r from-[#FFD7D7] transition-all  to-[#fff]"
                              : ""
                              }`}
                          >
                            <p className="font-bold sm:text-[18px] text-[15px] text-center h-full flex items-center justify-center flex flex-wrap">
                              ₹
                              {
                                data?.bookingOptions?.withDriver?.outstation
                                  ?.packageType?.package2?.ratePerKm
                              }
                              /<span className="text-primary">Km</span>
                            </p>
                          </div> */}
                        {/* <div
                            onClick={() => {
                              setPrice(
                                data?.bookingOptions?.withDriver?.outstation
                                  ?.packageType?.package3?.ratePerKm
                              );

                              setClicked1(false);
                              setClicked2(false);
                              setClicked3(true);
                            }}
                            className={`bg-white border-[1.5px] hover:scale-[1.05] duration-300 cursor-pointer border-[#FF0000] px-2 py-[12px] rounded-lg sm:w-[210px] sm:h-[60px] h-full ${clicked3
                              ? "border-black bg-gradient-to-r from-[#FFD7D7] transition-all  to-[#fff]"
                              : ""
                              }`}
                          >
                            <p className="font-bold sm:text-[18px] text-[15px] text-center h-full flex items-center justify-center flex flex-wrap">
                              ₹
                              {
                                data?.bookingOptions?.withDriver?.outstation
                                  ?.packageType?.package3?.ratePerKm
                              }
                              /<span className="text-primary">Km</span>
                            </p>
                          </div> */}
                        <div>
                          {
                            data?.bookingOptions.withDriver.outstation
                              ?.description
                          }
                        </div>
                      </div>

                      {/* mobile view */}
                      <div className="flex sm:hidden flex-col items-center jusitfy-center h-full ">
                        <div className="flex flex-row justify-center m-auto my-2">
                          <h1 className="m-auto font-bold text-[24px]">
                            {data?.carName}
                          </h1>
                        </div>
                        <Image
                          src={data?.featuredImage?.image}
                          width={386}
                          objectFit={"contain"}
                          height={212}
                          alt={data?.featuredImage?.alt}
                          className="w-[70%] mb-2"
                        />
                        <div
                          onClick={() => setShowImg(!showImg)}
                          className="flex flex-row items-center gap-2 border-[1.2px] border-[#ff0000] px-1 rounded-md mb-4 cursor-pointer py-[3px]"
                        >
                          <Image
                            src="/carListing/view.png"
                            width={12}
                            objectFit={"contain"}
                            height={12}
                            alt="Car Icon"
                          />
                          <span className="text-[#ff0000] sm:text-sm text-xs font-semibold">
                            View Real Car Images
                          </span>
                        </div>
                      </div>
                      {/*  */}

                      {/* <div className="flex flex-row justify-end mr-10 my-5 sm:block hidden">
                        <span>
                          ₹ Extra kms will be charged at{" "}
                          <span className="text-[#FF0000]">
                            {data?.bookingOptions?.withDriver?.outstation?.packageType?.package1?.ratePerKm}
                          </span>
                        </span>
                      </div> */}

                      {/*  */}

                      <div className="sm:flex flex-row justify-between items-center sm:mr-5 mr-4 sm:mt-12">
                        <div className="grid grid-cols-3 items-center w-full gap-4 gap-y-6 ml-4 sm:text-[15px] xs:text-xs text-[10px] sm:mb-0 mb-4">
                          {data?.carFeatures?.bluetooth === true && (
                            <div className="flex flex-row items-center gap-2">
                              <Image
                                src="/carListing/bluetooth.png"
                                width={20}
                                objectFit={"contain"}
                                height={20}
                                alt="bluetooth"
                              />
                              <span>Bluetooth</span>
                            </div>
                          )}

                          <div className="flex flex-row items-center gap-2">
                            <Image
                              src="/carListing/manual.png"
                              width={20}
                              objectFit={"contain"}
                              height={20}
                              alt="bluetooth"
                            />
                            <span>Manual</span>
                          </div>
                          {data?.carFeatures?.navigationSystem === true && (
                            <div className="flex flex-row items-center gap-2">
                              <Image
                                src="/carListing/gps.png"
                                width={20}
                                objectFit={"contain"}
                                height={20}
                                alt="bluetooth"
                              />
                              <span>GPS Navigation</span>
                            </div>
                          )}
                          {/* seating capacity */}
                          <div className="flex flex-row items-center gap-2">
                            <Image
                              src="/carListing/seats.png"
                              width={20}
                              objectFit={"contain"}
                              height={20}
                              alt="bluetooth"
                            />
                            <span>{data?.seatingCapacity} Person </span>
                          </div>
                          {data?.vehicleSpecifications?.fuelType && (
                            <div className="flex flex-row items-center gap-2">
                              <Image
                                src="/carListing/gas.png"
                                width={20}
                                objectFit={"contain"}
                                height={20}
                                alt="bluetooth"
                              />
                              <span>
                                {data?.vehicleSpecifications?.fuelType}
                              </span>
                            </div>
                          )}

                          <div className="flex flex-row items-center gap-2">
                            <Image
                              src="/carListing/bootspace.png"
                              width={20}
                              objectFit={"contain"}
                              height={20}
                              alt="bluetooth"
                            />
                            <span>Boot Space</span>
                          </div>
                        </div>
                        <div className="m-0 sm:block flex justify-end">
                          {data.vehicleStatus === "Sold Out" ||
                          data.vehicleStatus === "Not Available" ? (
                            <ThemeButton
                              text={
                                data.vehicleStatus === "Sold Out"
                                  ? "Booked"
                                  : data.vehicleStatus === "Not Available"
                                  ? "Sold Out"
                                  : ""
                              }
                              className=" sm:px-6 !px-2 grad-button shadow-custom-shadow sm:text-md sm:w-[140px] sm:h-[50px] w-[120px] h-[42px] text-center flex flex-row justify-center sm:!font-bold !font-semibold sm:!text-[20px] !text-lg opacity-50 cursor-not-allowed"
                            />
                          ) : (
                            <ThemeButton
                              onClick={() => {
                                Navigation.push(`/car-details/${data._id}`),
                                  selectDefaultPackage(data);
                              }}
                              text="Book Now"
                              className=" sm:px-6 !px-2 sm:text-md text-xs sm:w-[140px] w-[120px] sm:h-[50px] h-[42px] text-center shadow-lg flex flex-row justify-center !font-bold sm:!text-[20px] !text-lg"
                            />
                          )}
                        </div>
                      </div>
                      <div className="flex flex-row justify-end items-center sm:w-full !pr-10 gap-2 cursor-pointer mt-2 sm:right-0 absolute sm:bottom-0 bottom-[10px] sm:text-[15px] text-sm ml-4">
                        <span
                          className="text-[#ff0000]"
                          onClick={() =>
                            setShowOptionsMobile(!showOptionsMobile)
                          }
                        >
                          View Details{" "}
                        </span>
                        <Image
                          src="/carListing/arrow.png"
                          width={10}
                          objectFit={"contain"}
                          height={10}
                          alt="bluetooth"
                        />
                      </div>
                    </div>
                  </>
                )}
              </>
            ) : (
              ""
            )}
          </main>

          {showOptionsMobile && (
            <div className="flex flex-col w-full z-10 rounded-xl drop-shadow sm:mt-2">
              <div className="flex justify-between sm:px-4 items-center sm:gap-[30px] bg-white sm:rounded-lg rounded-xs overflow-hidden shadow-lg">
                {tabs.map((tab) => (
                  <button
                    key={tab.name}
                    className={`sm:py-2 sm:px-4 rounded-t-xl mt-2 w-full text-xs px-2 py-[7px] ${
                      activeTab === tab.name
                        ? "bg-white text-primary font-bold"
                        : "bg-black text-white"
                    }`}
                    onClick={() => setActiveTab(tab.name)}
                  >
                    {tab.name}
                  </button>
                ))}
              </div>
              <div className="mt-0 flex w-full justify-between">
                <div className="bg-white px-4 py-4 rounded-bl-xl rounded-br-xl flex justify-around items-center w-full">
                  {activeTab === "Inclusions" && (
                    <div className="grid sm:grid-cols-4 gap-4 w-full">
                      <div className="flex flex-row gap-2 items-center bg-white px-4 py-2 rounded-md h-[42px] border border-[#FF0000] shadow-tabs-shadow">
                        <Image
                          src="/carListingBanner/baseCar.svg"
                          width={25}
                          height={25}
                          objectFit="contain"
                          alt="car"
                        />
                        <span className="text-xs font-semibold">Base Fare</span>
                      </div>
                      <div className="flex flex-row gap-2 items-center bg-white px-4 py-2 rounded-md h-[42px] border border-[#FF0000] shadow-tabs-shadow">
                        <Image
                          src="/carListingBanner/trip.svg"
                          width={25}
                          height={25}
                          objectFit="contain"
                          alt="car"
                        />
                        <span className="text-xs font-semibold">
                          Trip Insurance
                        </span>
                      </div>
                      <div className="flex flex-row gap-2 items-center bg-white px-4 py-2 rounded-md h-[42px] border border-[#FF0000] shadow-tabs-shadow">
                        <Image
                          src="/carListingBanner/gst.svg"
                          width={25}
                          height={10}
                          objectFit="contain"
                          alt="car"
                        />
                        <span className="text-xs font-semibold">GST</span>
                      </div>
                      <div className="flex flex-row gap-2 items-center bg-white px-4 py-2 rounded-md h-[42px] border border-[#FF0000] shadow-tabs-shadow">
                        <Image
                          src="/carListingBanner/deposit.svg"
                          width={25}
                          height={25}
                          objectFit="contain"
                          alt="car"
                        />
                        <span className="font-semibold text-xs">
                          Refundable Security Deposit
                        </span>
                      </div>
                    </div>
                  )}
                  {activeTab === "Exclusion" && (
                    <div className="w-full">
                      <ExclusionComponent />
                    </div>
                  )}
                  {activeTab === "Facilities" && (
                    <div className="w-full">
                      <FacilityComponent />
                    </div>
                  )}
                  {activeTab === "T&C" && (
                    <div className="w-full">
                      <TermsAndConditions />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default CardListingCards;
