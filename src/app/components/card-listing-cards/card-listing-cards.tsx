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
import { calculateTotalPrice } from "@/app/utils/getTotalPrice";
import { roundPrice } from "@/app/utils/roundPrice ";


const Tooltip = ({ children, tooltipText }: any) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className="tooltip-container"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {children}
      {showTooltip && (
        <div className="tooltip-text">
          {tooltipText}
        </div>
      )}
    </div>
  );
};

const CardListingCards = ({ data }: any) => {
  const Navigation = useRouter();
  const { duration } = useReservationDateTime();
  const { days, hours } = extractDaysAndHours(duration);
  const [showImg, setShowImg] = useState(false);

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

  const [showOptions, setShowOptions] = useState(false);
  const [activeTab, setActiveTab] = useState("Inclusions");
  const [selectedPackagePrice, setPackagePrice] = useState<any>();

  const setPrice = (price: number) => {
    setPackagePrice(price);
  };
  //@ts-ignore
  localStorage.setItem("selectedPackagePrice", roundPrice(selectedPackagePrice));
  console.log({ selectedPackagePrice });

  const tabs = [
    { name: "Exclusion", content: "Exclusion Content" },
    { name: "Inclusions", content: "Inclusions Content" },
    { name: "Facilities", content: "Facilities Content" },
    { name: "T&C", content: "T&C Content" },
  ];

  const [bookingOptionsHome, setBookingOptionsHome] = useState<any>();
  const [driverType, setDriverType] = useState<any>();

  React.useEffect(() => {
    const bookingOptions = localStorage.getItem("tabValue");
    const driverType = localStorage.getItem("radioToggle");

    setBookingOptionsHome(bookingOptions);
    setDriverType(driverType);
  }, []);

  const [clicked1, setClicked1] = useState(true);
  const [clicked2, setClicked2] = useState(false);
  const [clicked3, setClicked3] = useState(false);
  const [showOptionsMobile, setShowOptionsMobile] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : data?.imageGallery?.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex < data?.imageGallery?.length - 1 ? prevIndex + 1 : 0));
  };

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.key === 'ArrowLeft') {
        handlePrev();
      } else if (event.key === 'ArrowRight') {
        handleNext();
      }
    };



    // const handleScroll = (event: any) => {
    //   const scrollDirection = event.deltaY > 0 ? 'down' : 'up';
    //   if (scrollDirection === 'down') {
    //     handleNext();
    //   } else {
    //     handlePrev();
    //   }
    // };

    window.addEventListener('keydown', handleKeyDown);
    // window.addEventListener('wheel', handleScroll);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      // window.removeEventListener('wheel', handleScroll);
    };
  }, []);
  // const [currentImage, setCurrentImage] = useState<any>(data?.featuredImage?.image);

  //please don't touch this function, It is for the default package select when user does not select any package...!!

  const selectDefaultPackage = (data: any) => {
    if (selectedPackagePrice === undefined) {
      bookingOptionsHome === (data?.bookingOptions?.selfDrive?.name) ? setPackagePrice(calculateTotalPrice(data?.bookingOptions?.selfDrive?.packageType?.package1?.price))
        : bookingOptionsHome === (data?.bookingOptions?.subscription?.name) ? setPackagePrice(calculateTotalPrice(data?.bookingOptions?.subscription?.packageType?.package1?.price))
          : driverType === (data?.bookingOptions?.withDriver?.local?.name) ? setPackagePrice(calculateTotalPrice(data?.bookingOptions?.withDriver?.local?.packageType?.package1?.price))
            : driverType === (data?.bookingOptions?.withDriver?.outstation?.name) ? setPackagePrice(calculateTotalPrice(data?.bookingOptions?.withDriver?.outstation?.packageType?.package1?.price)) :
              console.log("Something went wrong in package selection");
    }
    else {
      console.log("done");
    }
  }

  return (
    <>
      {showImg ? (
        <div className="sm:w-screen h-screen fixed !top-0 !left-0 backdrop-blur-md z-[999] flex justify-center w-screen sm:h-screen items-center overflow-hidden">
          <div
            onClick={() => setShowImg(!showImg)}
            className="absolute top-4 right-4 transform -translate-x-1/2 cursor-pointer"
          >
            <ThemeButton text="Close" className="ml-auto mt-4" />
          </div>
          <div className="relative flex flex-col items-center">
            <div className="relative">
              <Image
                src={data?.imageGallery?.[currentIndex]?.image || '/default-image.png'} // Fallback image if none exists
                key={data?.imageGallery?.[currentIndex]?.alt || 'default-alt'}
                width={330}
                height={300}
                objectFit="contain"
                className="bg-white sm:m-4 shadow-xl cursor-pointer transition-all w-[320px] sm:w-[700px] sm:h-[400px] object-cover rounded-xl m-auto"
                alt={data?.imageGallery?.[currentIndex]?.alt || "Tag Icon"}
              />
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 flex justify-center items-center z-10 w-[40px] h-[40px] bg-white rounded-full shadow-md p-2"
              >
                <Image
                  src="/png/left-arrow-red.png"
                  alt="Previous"
                  width={24}
                  height={16}
                  className="w-[24px] h-[16px]"
                />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 flex justify-center items-center z-10 w-[40px] h-[40px] bg-white rounded-full shadow-md p-2"
              >
                <Image
                  src="/png/right-arrow-red.png"
                  alt="Next"
                  width={24}
                  height={16}
                  className="w-[24px] h-[16px]"
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
                  className={`bg-white m-2 cursor-pointer transition-transform duration-300 rounded-md h-[73px] object-cover ${index === currentIndex ? 'scale-110 shadow-xl' : ''}`}
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

        <div className="absolute sm:block hidden -left-2 top-[20px] z-10 w-fit">
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
        <div
          className="bg-[url('/png/listing-bg.png')]"
          style={{ backgroundSize: "100% 100%" }}
        >
          <main className=" sm:max-w-[928px] pb-4 items-baseline rounded-[12px] hidden sm:flex flex-row items-center justify-center bg-no-repeat">
            {/* ---------------------------------------- */}
            {bookingOptionsHome === data?.bookingOptions?.selfDrive?.name ? (
              <>
                <div className="flex flex-col items-center jusitfy-center lg:w-[486px] w-[260px] h-full ">
                  <div className="flex flex-row justify-center m-auto pr-10 pt-14">
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
                    className="sm:w-[95%] mb-2 cursor-pointer"
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
                <div>
                  <div className="h-[274px] max-w-[600px] relative">
                    <div className="mt-5 flex flex-row items-center lg:gap-4 gap-2 mr-4 justify-end">
                      <div
                        onClick={() => {
                          const calculatedPrice = calculateTotalPrice(data?.bookingOptions?.selfDrive?.packageType?.package1?.price);
                          if (calculatedPrice) {
                            setPrice(Math.round(calculatedPrice));
                            setClicked1(true);
                            setClicked2(false);
                            setClicked3(false);
                          } else {
                            console.error("Failed to calculate the total price");
                          }
                        }}
                        className={` sm:flex flex-row hover:scale-110 duration-300 items-center justify-between bg-white gap-3 border-[1.5px] border-[#FF0000] px-2 py-2 rounded-lg lg:w-[210px] sm:h-[71px] cursor-pointer ${clicked1
                          ? "border-black bg-gradient-to-r from-[#FFD7D7] transition-all  to-[#fff]"
                          : ""
                          }`}
                      >
                        <span className="font-bold lg:text-[20px] text-[15px] whitespace-nowrap">
                          ₹ {calculateTotalPrice(data?.bookingOptions?.selfDrive?.packageType
                            ?.package1?.price)?.toFixed(0)}
                        </span>
                        <span className="flex flex-col gap-0">
                          <p className="text-[#565454] font-[500] text-[14px] text-center">
                            {
                              data?.bookingOptions?.selfDrive?.packageType
                                ?.package1?.duration
                            }
                          </p>
                          <hr className="border-[#000000] border-[1.2px]" />
                          <span className="relative flex flex-row  group text-[#FF0000]">
                            <p className="text-[#FF0000] font-[500] lg:text-[14px] text-[11px] whitespace-nowrap w-[80px] overflow-hidden">
                              {data?.bookingOptions?.selfDrive?.packageType?.package1?.kmsLimit ? data?.bookingOptions?.selfDrive?.packageType?.package1?.kmsLimit * (days as number) : "0"} Free kms
                            </p>...
                            <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block bg-[#ff0000] text-white text-xs rounded py-1 px-2">
                              {data?.bookingOptions?.selfDrive?.packageType?.package1?.kmsLimit ? data?.bookingOptions?.selfDrive?.packageType?.package1?.kmsLimit * (days as number) : "0"} Free kms
                            </div>
                          </span>


                        </span>
                      </div>
                      <div
                        onClick={() => {
                          const calculatedPrice = calculateTotalPrice(data?.bookingOptions?.selfDrive?.packageType?.package2?.price);
                          if (calculatedPrice) {
                            setPrice(Math.round(calculatedPrice));
                            setClicked1(false);
                            setClicked2(true);
                            setClicked3(false);
                          } else {
                            console.error("Failed to calculate the total price");
                          }
                        }}
                        className={`sm:flex flex-row items-center hover:scale-110 duration-300 justify-between bg-white gap-3 border-[1.5px] border-[#FF0000] px-2 py-2 rounded-lg lg:w-[210px] sm:h-[71px] cursor-pointer ${clicked2
                          ? "border-black bg-gradient-to-r from-[#FFD7D7] transition-all  to-[#fff]"
                          : ""
                          }`}
                      >
                        <span className="font-bold lg:text-[20px] text-[15px] whitespace-nowrap">
                          ₹{" "}
                          {calculateTotalPrice(
                            data?.bookingOptions?.selfDrive?.packageType
                              ?.package2?.price)?.toFixed(0)}
                        </span>
                        <span className="relative flex flex-col gap-0 group">
                          <p className="text-[#565454] font-[500] text-[14px] text-center whitespace-nowrap">
                            {data?.bookingOptions?.selfDrive?.packageType?.package2?.duration}
                          </p>
                          <hr className="border-[#000000] border-[1.2px]" />
                          <span className="text-[#FF0000] flex flex-row">
                            <p className="text-[#FF0000] font-[500] lg:text-[14px] text-[11px] whitespace-nowrap overflow-hidden w-[80px]">
                              {data?.bookingOptions?.selfDrive?.packageType?.package2?.kmsLimit
                                ? data?.bookingOptions?.selfDrive?.packageType?.package2?.kmsLimit * (days as number)
                                : "0"} Free kms
                            </p>...
                          </span>
                          <div className="tooltip absolute left-0 top-full mt-1 hidden group-hover:block bg-[#ff0000] text-white text-xs rounded py-1 px-2">
                            {data?.bookingOptions?.selfDrive?.packageType?.package2?.kmsLimit
                              ? data?.bookingOptions?.selfDrive?.packageType?.package2?.kmsLimit * (days as number)
                              : "0"} Free kms
                          </div>
                        </span>

                      </div>
                      <div
                        onClick={() => {
                          const calculatedPrice = calculateTotalPrice(data?.bookingOptions?.selfDrive?.packageType?.package3?.price);
                          if (calculatedPrice) {
                            setPrice(Math.round(calculatedPrice));
                            setClicked1(false);
                            setClicked2(false);
                            setClicked3(true);
                          } else {
                            console.error("Failed to calculate the total price");
                          }
                        }}
                        className={`sm:flex flex-row items-center hover:scale-110 duration-300 justify-between bg-white gap-3 border-[1.5px] border-[#FF0000] px-2 py-2 rounded-lg lg:w-[210px] sm:h-[71px] cursor-pointer ${clicked3
                          ? "border-black bg-gradient-to-r from-[#FFD7D7] transition-all  to-[#fff]"
                          : ""
                          }`}
                      >
                        <span className="font-bold lg:text-[20px] text-[15px] whitespace-nowrap">
                          ₹{" "}
                          {
                            calculateTotalPrice(
                              data?.bookingOptions?.selfDrive?.packageType
                                ?.package3?.price)?.toFixed(0)
                          }
                        </span>
                        <span className="relative flex flex-col gap-0 group">
                          <p className="text-[#565454] font-[500] text-[14px] text-center whitespace-nowrap">
                            {data?.bookingOptions?.selfDrive?.packageType?.package3?.duration}
                          </p>
                          <hr className="border-[#000000] border-[1.2px]" />
                          <span className="flex flex-row text-[#FF0000]">
                            <p className="text-[#FF0000] font-[500] lg:text-[14px] text-[11px] whitespace-nowrap overflow-hidden w-[80px]">
                              {data?.bookingOptions?.selfDrive?.packageType?.package3?.kmsLimit
                                ? data?.bookingOptions?.selfDrive?.packageType?.package3?.kmsLimit * (days as number)
                                : "0"} Free kms
                            </p>...
                          </span>
                          <div className="tooltip absolute left-0 top-full mt-1 hidden group-hover:block bg-[#ff0000] text-white text-xs rounded py-1 px-2">
                            {data?.bookingOptions?.selfDrive?.packageType?.package3?.kmsLimit
                              ? data?.bookingOptions?.selfDrive?.packageType?.package3?.kmsLimit * (days as number)
                              : "0"} Free kms
                          </div>
                        </span>

                      </div>

                      {/* <div className="sm:flex flex-row items-center justify-between bg-white gap-3 border-[1.5px] border-[#000000] px-2 py-2 rounded-lg sm:w-[210px] sm:h-[71px]">
              <span className="font-bold text-[18px] ">₹ 21,635</span>
              <span className="flex flex-col gap-0">
                <p className="text-[#565454] font-[500] text-[14px]">
                  120kms/day
                </p>
                <hr className="border-[#000000] border-[1.2px]" />
                <p className="text-[#FF0000] font-[500] text-[14px]">
                  360 Free kms
                </p>
              </span>
            </div>
          
            <div className="sm:flex flex-row items-center justify-between bg-white gap-3 border-[1.5px] border-[#FF0000] px-2 py-2 rounded-lg sm:w-[210px] sm:h-[71px]">
              <span className="font-bold text-[18px] ">₹ 21,635</span>
              <span className="flex flex-col gap-0">
                <p className="text-[#565454] font-[500] text-[14px]">
                  120kms/day
                </p>
                <hr className="border-[#000000] border-[1.2px]" />
                <p className="text-[#FF0000] font-[500] text-[14px]">
                  360 Free kms
                </p>
              </span>
            </div> */}
                    </div>
                    {/*  */}
                    <div className="flex flex-row justify-end mr-10 my-5">
                      {data?.bookingOptions?.selfDrive?.packageType
                        ?.extraKmsCharge && (
                          <span>
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

                    {/*  */}

                    <div className="flex flex-row justify-between items-center mr-10 relative">
                      <div className="grid grid-cols-3 items-center w-full gap-y-6 ml-4">
                        {data?.carFeatures?.bluetooth === true && (
                          <div className="flex flex-row items-center gap-2">
                            <Image
                              src="/carListing/bluetooth.png"
                              width={20}
                              objectFit={"contain"}
                              height={20}
                              alt="bluetooth"
                            />
                            <span className="lg:text-[15px] text-[11px]">
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
                          <span className="lg:text-[15px] text-[11px]">
                            Manual
                          </span>
                        </div>
                        {data?.carFeatures?.navigationSystem === true && (
                          <div className="flex flex-row items-center gap-2 cursor-pointer">
                            <Image
                              src="/carListing/gps.png"
                              width={20}
                              objectFit={"contain"}
                              height={20}
                              alt="bluetooth"
                            />
                            {/* <span className="lg:text-[15px] text-[11px]">
                              GPS
                            </span> */}

                            <Tooltip tooltipText="GPS Navigation">
                              <span className="lg:text-[15px] text-[11px]">GPS Nav...</span>
                            </Tooltip>
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
                          <span className="lg:text-[15px] text-[11px]">
                            {data?.seatingCapacity} Person
                          </span>
                        </div>
                        <div className="flex flex-row items-center gap-2">
                          <Image
                            src="/carListing/gas.png"
                            width={20}
                            objectFit={"contain"}
                            height={20}
                            alt="bluetooth"
                          />
                          <span className="lg:text-[15px] text-[11px]">
                            {data?.vehicleSpecifications?.fuelType}
                          </span>
                        </div>
                        <div className="flex flex-row items-center gap-2">
                          <Image
                            src="/carListing/bootspace.png"
                            width={20}
                            objectFit={"contain"}
                            height={20}
                            alt="bluetooth"
                          />
                          <span className="lg:text-[15px] text-[11px]">
                            Boot Space
                          </span>
                        </div>
                      </div>
                      <div className="m-0">
                        <ThemeButton
                          onClick={() => {
                            Navigation.push(`/car-details/${data._id}`);
                            selectDefaultPackage(data);

                          }}
                          text="Book Now"
                          className=" sm:px-6 !px-2 grad-button shadow-custom-shadow sm:text-md text-xs w-[140px] h-[50px] text-center flex flex-row justify-center !font-bold !text-[20px]"
                        />
                      </div>
                    </div>
                    <div className="flex flex-row justify-end items-center w-full !pr-10 gap-2 cursor-pointer mt-2 absolute bottom-0">
                      <span
                        className="text-[#ff0000]"
                        onClick={() => setShowOptions(!showOptions)}
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
                </div>
              </>
            ) : bookingOptionsHome ===
              data?.bookingOptions?.subscription?.name ? (
              <>
                <div className="flex flex-col items-center jusitfy-center w-[486px] h-full ">
                  <div className="flex flex-row justify-center m-auto pr-10 pt-14">
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
                <div className="h-[274px] relative">
                  <div className="mt-5 flex flex-row items-center gap-4 mr-10">
                    <div
                      onClick={() => {
                        const calculatedPrice = calculateTotalPrice(data?.bookingOptions?.subscription?.packageType?.package1?.price);
                        if (calculatedPrice) {
                          setPrice(Math.round(calculatedPrice));
                          setClicked1(true);
                          setClicked2(false);
                          setClicked3(false);
                        } else {
                          console.error("Failed to calculate the total price");
                        }
                      }}

                      className={`sm:flex flex-row items-center justify-between bg-white gap-3 border-[1.5px] border-[#FF0000] px-2 py-2 rounded-lg sm:w-[210px] sm:h-[71px] cursor-pointer ${clicked1
                        ? "border-black bg-gradient-to-r from-[#FFD7D7] transition-all to-[#fff]"
                        : ""
                        }`}
                    >
                      <span className="font-bold text-[18px] ">
                        ₹{" "}
                        {
                          calculateTotalPrice(data?.bookingOptions?.subscription?.packageType
                            ?.package1?.price)?.toFixed(0)

                        }
                      </span>
                      <span className="flex flex-col gap-0">
                        <p className="text-[#565454] font-[500] text-[14px] text-center">
                          {
                            data?.bookingOptions?.subscription?.packageType
                              ?.package1?.duration
                          }
                        </p>
                        <hr className="border-[#000000] border-[1.2px]" />
                        <span className="relative flex flex-row group text-[#FF0000]">
                          <p className="text-[#FF0000] font-[500] text-[14px] whitespace-nowrap w-[80px] overflow-hidden">
                            {data?.bookingOptions?.subscription?.packageType?.package1?.kmsLimit ? data?.bookingOptions?.subscription?.packageType?.package1?.kmsLimit * (days as number) : "0"} Free kms
                          </p>...
                          <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block bg-[#ff0000] text-white text-xs rounded py-1 px-2">
                            {data?.bookingOptions?.subscription?.packageType?.package1?.kmsLimit ? data?.bookingOptions?.subscription?.packageType?.package1?.kmsLimit * (days as number) : "0"} Free kms
                          </div>
                        </span>
                      </span>
                    </div>
                    <div
                      onClick={() => {
                        const calculatedPrice = calculateTotalPrice(data?.bookingOptions?.subscription?.packageType?.package2?.price);
                        if (calculatedPrice) {
                          setPrice(Math.round(calculatedPrice));
                          setClicked1(true);
                          setClicked2(false);
                          setClicked3(false);
                        } else {
                          console.error("Failed to calculate the total price");
                        }
                      }}
                      className={`sm:flex flex-row items-center justify-between bg-white gap-3 border-[1.5px] border-[#FF0000] px-2 py-2 rounded-lg sm:w-[210px] sm:h-[71px] ${clicked2
                        ? "border-black bg-gradient-to-r from-[#FFD7D7] transition-all to-[#fff]"
                        : ""
                        }`}
                    >
                      <span className="font-bold text-[18px] ">
                        ₹{" "}
                        {
                          calculateTotalPrice(data?.bookingOptions?.subscription?.packageType
                            ?.package2?.price)?.toFixed(0)
                        }
                      </span>
                      <span className="flex flex-col gap-0">
                        <p className="text-[#565454] font-[500] text-[14px] text-center">
                          {
                            data?.bookingOptions?.subscription?.packageType
                              ?.package2?.duration
                          }
                        </p>
                        <hr className="border-[#000000] border-[1.2px]" />
                        <span className="relative flex flex-row group text-[#FF0000] cursor-pointer">
                          <p className="text-[#FF0000] font-[500] text-[14px] whitespace-nowrap w-[80px] overflow-hidden">
                            {data?.bookingOptions?.subscription?.packageType?.package2?.kmsLimit ? data?.bookingOptions?.subscription?.packageType?.package2?.kmsLimit * (days as number) : "0"} Free kms
                          </p>...
                          <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block bg-[#ff0000] text-white text-xs rounded py-1 px-2">
                            {data?.bookingOptions?.subscription?.packageType?.package2?.kmsLimit ? data?.bookingOptions?.subscription?.packageType?.package2?.kmsLimit * (days as number) : "0"} Free kms
                          </div>
                        </span>

                      </span>
                    </div>
                    <div
                      onClick={() => {
                        const calculatedPrice = calculateTotalPrice(data?.bookingOptions?.subscription?.packageType?.package3?.price);
                        if (calculatedPrice) {
                          setPrice(Math.round(calculatedPrice));
                          setClicked1(true);
                          setClicked2(false);
                          setClicked3(false);
                        } else {
                          console.error("Failed to calculate the total price");
                        }
                      }}
                      className={`sm:flex flex-row items-center justify-between bg-white gap-3 border-[1.5px] border-[#FF0000] px-2 py-2 rounded-lg sm:w-[210px] sm:h-[71px] cursor-pointer ${clicked3
                        ? "border-black bg-gradient-to-r from-[#FFD7D7] transition-all to-[#fff]"
                        : ""
                        }`}
                    >
                      <span className="font-bold text-[18px] ">
                        ₹{" "}
                        {
                          calculateTotalPrice(
                            data?.bookingOptions?.subscription?.packageType
                              ?.package3?.price)?.toFixed(0)
                        }
                      </span>
                      <span className="flex flex-col gap-0">
                        <p className="text-[#565454] font-[500] text-[14px] text-center">
                          {
                            data?.bookingOptions?.subscription?.packageType
                              ?.package3?.duration
                          }
                        </p>
                        <hr className="border-[#000000] border-[1.2px]" />
                        <span className="relative flex flex-row group text-[#FF0000] cursor-pointer">
                          <p className="text-[#FF0000] font-[500] text-[14px] whitespace-nowrap w-[80px] overflow-hidden">
                            {data?.bookingOptions?.subscription?.packageType?.package3?.kmsLimit ? data?.bookingOptions?.subscription?.packageType?.package3?.kmsLimit * (days as number) : "0"} Free kms
                          </p>...
                          <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block bg-[#ff0000] text-white text-xs rounded py-1 px-2">
                            {data?.bookingOptions?.subscription?.packageType?.package3?.kmsLimit ? data?.bookingOptions?.subscription?.packageType?.package3?.kmsLimit * (days as number) : "0"} Free kms
                          </div>
                        </span>

                      </span>
                    </div>

                    {/* <div className="sm:flex flex-row items-center justify-between bg-white gap-3 border-[1.5px] border-[#000000] px-2 py-2 rounded-lg sm:w-[210px] sm:h-[71px]">
            <span className="font-bold text-[18px] ">₹ 21,635</span>
            <span className="flex flex-col gap-0">
              <p className="text-[#565454] font-[500] text-[14px]">
                120kms/day
              </p>
              <hr className="border-[#000000] border-[1.2px]" />
              <p className="text-[#FF0000] font-[500] text-[14px]">
                360 Free kms
              </p>
            </span>
          </div>
        
          <div className="sm:flex flex-row items-center justify-between bg-white gap-3 border-[1.5px] border-[#FF0000] px-2 py-2 rounded-lg sm:w-[210px] sm:h-[71px]">
            <span className="font-bold text-[18px] ">₹ 21,635</span>
            <span className="flex flex-col gap-0">
              <p className="text-[#565454] font-[500] text-[14px]">
                120kms/day
              </p>
              <hr className="border-[#000000] border-[1.2px]" />
              <p className="text-[#FF0000] font-[500] text-[14px]">
                360 Free kms
              </p>
            </span>
          </div> */}
                  </div>
                  {/*  */}
                  <div className="flex flex-row justify-end mr-10 my-5">
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

                  <div className="flex flex-row justify-between items-center mr-10">
                    <div className="grid grid-cols-3 items-center w-full gap-y-6 ml-4">
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
                      <div className="flex flex-row items-center gap-2">
                        <Image
                          src="/carListing/gas.png"
                          width={20}
                          objectFit={"contain"}
                          height={20}
                          alt="bluetooth"
                        />
                        <span>{data?.vehicleSpecifications?.fuelType}</span>
                      </div>
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
                    <div className="m-0">
                      <ThemeButton
                        onClick={() => {
                          Navigation.push(`/car-details/${data._id}`),
                            selectDefaultPackage(data);
                        }
                        }
                        text="Book Now"
                        className=" sm:px-6 !px-2 sm:text-md text-xs w-[140px] h-[50px] text-center shadow-lg flex flex-row justify-center !font-bold !text-[20px]"
                      />
                    </div>
                  </div>
                  <div className="flex flex-row justify-end items-center w-full !pr-10 gap-2 cursor-pointer mt-2 absolute bottom-0">
                    <span
                      className="text-[#ff0000]"
                      onClick={() => setShowOptions(!showOptions)}
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
                {driverType ===
                  data?.bookingOptions?.withDriver?.local?.name && (
                    <>
                      <div className="flex flex-col items-center jusitfy-center w-[486px] h-full ">
                        <div className="flex flex-row justify-center m-auto pr-10 pt-14">
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
                      <div className="h-[274px] relative">
                        <div className="mt-5 flex flex-row items-center gap-4 mr-10">
                          <div
                            onClick={() => {
                              const calculatedPrice = calculateTotalPrice(data?.bookingOptions?.withDriver?.local?.packageType?.package1?.price);
                              if (calculatedPrice) {
                                setPrice(Math.round(calculatedPrice));
                              } else {
                                console.error("Failed to calculate the total price");
                              }
                            }}
                            className=" sm:flex flex-row items-center justify-between bg-white gap-3 border-[1.5px] border-[#FF0000] px-2 py-2 rounded-lg sm:w-[210px] sm:h-[71px]"
                          >
                            <span className="font-bold text-[18px] ">
                              {/* {data?.bookingOptions?.subscription?.package1?.price} */}
                              ₹{" "}
                              {
                                calculateTotalPrice(
                                  data?.bookingOptions?.withDriver?.local
                                    ?.packageType?.package1?.price)?.toFixed(0)
                              }
                            </span>
                            <span className="flex flex-col gap-0">
                              <p className="text-[#565454] font-[500] text-[14px] text-center">
                                {
                                  data?.bookingOptions?.withDriver?.local
                                    ?.packageType?.package1?.duration
                                }
                              </p>
                              <hr className="border-[#000000] border-[1.2px]" />
                              <span className="relative flex flex-row group text-[#FF0000] cursor-pointer">
                                <p className="text-[#FF0000] font-[500] text-[14px] whitespace-nowrap w-[80px] overflow-hidden">
                                  {data?.bookingOptions?.withDriver?.local?.packageType?.package1?.kmsLimit ? data?.bookingOptions?.withDriver?.local?.packageType?.package1?.kmsLimit * (days as number) : "0"} Free kms
                                </p>...
                                <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block bg-[#ff0000] text-white text-xs rounded py-1 px-2">
                                  {data?.bookingOptions?.withDriver?.local?.packageType?.package1?.kmsLimit ? data?.bookingOptions?.withDriver?.local?.packageType?.package1?.kmsLimit * (days as number) : "0"} Free kms
                                </div>
                              </span>

                            </span>
                          </div>
                          <div
                            onClick={() => {
                              const calculatedPrice = calculateTotalPrice(data?.bookingOptions?.withDriver?.local?.packageType?.package2?.price);
                              if (calculatedPrice) {
                                setPrice(Math.round(calculatedPrice));
                              } else {
                                console.error("Failed to calculate the total price");
                              }
                            }}
                            className="sm:flex flex-row items-center justify-between bg-white gap-3 border-[1.5px] border-[#FF0000] px-2 py-2 rounded-lg sm:w-[210px] sm:h-[71px]"
                          >
                            <span className="font-bold text-[18px] ">
                              ₹{" "}
                              {
                                calculateTotalPrice(
                                  data?.bookingOptions?.withDriver?.local
                                    ?.packageType?.package2?.price
                                )?.toFixed(0)
                              }
                            </span>
                            <span className="flex flex-col gap-0">
                              <p className="text-[#565454] font-[500] text-[14px] text-center">
                                {
                                  data?.bookingOptions?.withDriver?.local
                                    ?.packageType?.package2?.duration
                                }
                              </p>
                              <hr className="border-[#000000] border-[1.2px]" />
                              <span className="relative flex flex-row group text-[#FF0000] cursor-pointer">
                                <p className="text-[#FF0000] font-[500] text-[14px] whitespace-nowrap w-[80px] overflow-hidden">
                                  {data?.bookingOptions?.withDriver?.local?.packageType?.package2?.kmsLimit ? data?.bookingOptions?.withDriver?.local?.packageType?.package2?.kmsLimit * (days as number) : "0"} Free kms
                                </p>...
                                <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block bg-[#ff0000] text-white text-xs rounded py-1 px-2">
                                  {data?.bookingOptions?.withDriver?.local?.packageType?.package2?.kmsLimit ? data?.bookingOptions?.withDriver?.local?.packageType?.package2?.kmsLimit * (days as number) : "0"} Free kms
                                </div>
                              </span>

                            </span>
                          </div>
                          <div
                            onClick={() => {
                              const calculatedPrice = calculateTotalPrice(data?.bookingOptions?.withDriver?.local?.packageType?.package3?.price);
                              if (calculatedPrice) {
                                setPrice(Math.round(calculatedPrice));
                              } else {
                                console.error("Failed to calculate the total price");
                              }
                            }}
                            className="sm:flex flex-row items-center justify-between bg-white gap-3 border-[1.5px] border-[#FF0000] px-2 py-2 rounded-lg sm:w-[210px] sm:h-[71px]"
                          >
                            <span className="font-bold text-[18px] ">
                              ₹{" "}
                              {
                                calculateTotalPrice(
                                  data?.bookingOptions?.withDriver?.local
                                    ?.packageType?.package3?.price)?.toFixed(0)
                              }
                            </span>
                            <span className="flex flex-col gap-0">
                              <p className="text-[#565454] font-[500] text-[14px] text-center">
                                {
                                  data?.bookingOptions?.withDriver?.local
                                    ?.packageType?.package3?.duration
                                }
                              </p>
                              <hr className="border-[#000000] border-[1.2px]" />
                              <span className="relative flex flex-row group text-[#FF0000] cursor-pointer">
                                <p className="text-[#FF0000] font-[500] text-[14px] whitespace-nowrap w-[80px] overflow-hidden">
                                  {data?.bookingOptions?.withDriver?.local?.packageType?.package3?.kmsLimit ? data?.bookingOptions?.withDriver?.local?.packageType?.package3?.kmsLimit * (days as number) : "0"} Free kms
                                </p>...
                                <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block bg-[#ff0000] text-white text-xs rounded py-1 px-2">
                                  {data?.bookingOptions?.withDriver?.local?.packageType?.package3?.kmsLimit ? data?.bookingOptions?.withDriver?.local?.packageType?.package3?.kmsLimit * (days as number) : "0"} Free kms
                                </div>
                              </span>

                            </span>
                          </div>

                          {/* <div className="sm:flex flex-row items-center justify-between bg-white gap-3 border-[1.5px] border-[#000000] px-2 py-2 rounded-lg sm:w-[210px] sm:h-[71px]">
<span className="font-bold text-[18px] ">₹ 21,635</span>
<span className="flex flex-col gap-0">
<p className="text-[#565454] font-[500] text-[14px]">
120kms/day
</p>
<hr className="border-[#000000] border-[1.2px]" />
<p className="text-[#FF0000] font-[500] text-[14px]">
360 Free kms
</p>
</span>
</div>

<div className="sm:flex flex-row items-center justify-between bg-white gap-3 border-[1.5px] border-[#FF0000] px-2 py-2 rounded-lg sm:w-[210px] sm:h-[71px]">
<span className="font-bold text-[18px] ">₹ 21,635</span>
<span className="flex flex-col gap-0">
<p className="text-[#565454] font-[500] text-[14px]">
120kms/day
</p>
<hr className="border-[#000000] border-[1.2px]" />
<p className="text-[#FF0000] font-[500] text-[14px]">
360 Free kms
</p>
</span>
</div> */}
                        </div>
                        {/*  */}
                        <div className="flex flex-row justify-end mr-10 my-5">
                          {data?.bookingOptions?.withDriver?.local?.packageType
                            ?.extraKmsCharge && (
                              <span>
                                Extra kms will be charged at{" "}
                                <span className="text-[#FF0000]">
                                  ₹
                                  {
                                    data?.bookingOptions?.withDriver?.local
                                      ?.packageType?.extraKmsCharge
                                  }
                                </span>
                              </span>
                            )}
                        </div>

                        {/*  */}

                        <div className="flex flex-row justify-between items-center mr-10">
                          <div className="grid grid-cols-3 items-center w-full gap-y-6 ml-4">
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
                            <div className="flex flex-row items-center gap-2">
                              <Image
                                src="/carListing/gas.png"
                                width={20}
                                objectFit={"contain"}
                                height={20}
                                alt="bluetooth"
                              />
                              <span>{data?.vehicleSpecifications?.fuelType}</span>
                            </div>
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
                          <div className="m-0">
                            <ThemeButton
                              onClick={() => {
                                Navigation.push(`/car-details/${data._id}`),
                                  selectDefaultPackage(data);

                              }
                              }
                              text="Book Now"
                              className=" sm:px-6 !px-2 sm:text-md text-xs w-[140px] h-[50px] text-center shadow-lg flex flex-row justify-center !font-bold !text-[20px]"
                            />
                          </div>
                        </div>
                        <div className="flex flex-row justify-end items-center w-full !pr-10 gap-2 cursor-pointer mt-2 absolute bottom-0">
                          <span
                            className="text-[#ff0000]"
                            onClick={() => setShowOptions(!showOptions)}
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
                          {showOptions ? (
                            <div className="flex flex-col w-[750px] z-10 absolute right-0 top-8 bg-red-50 p-4 rounded-xl drop-shadow">
                              <div className="flex justify-between px-4 items-center gap-[30px] bg-white rounded-lg overflow-hidden shadow-lg">
                                {tabs.map((tab) => (
                                  <button
                                    key={tab.name}
                                    className={`py-2 px-4 rounded-t-xl mt-2 ${activeTab === tab.name
                                      ? "bg-red-200 text-red-600"
                                      : "bg-red-600 text-white"
                                      }`}
                                    onClick={() => setActiveTab(tab.name)}
                                  >
                                    {tab.name}
                                  </button>
                                ))}
                              </div>
                              <div className="mt-0 flex justify-center">
                                <div className="bg-red-200 px-4 py-2 rounded-lg flex justify-around items-center w-full max-w-4xl">
                                  {activeTab === "Inclusions" && (
                                    <>
                                      <div className="flex flex-row gap-2 items-center bg-white px-4 py-2 rounded-md h-[42px]">
                                        <Image
                                          src="/carListingBanner/baseCar.png"
                                          width={25}
                                          height={25}
                                          objectFit="contain"
                                          alt="car"
                                        />
                                        <span className="text-sm">Base Fare</span>
                                      </div>
                                      <div className="flex flex-row gap-2 items-center bg-white px-4 py-2 rounded-md h-[42px]">
                                        <Image
                                          src="/carListingBanner/trip.png"
                                          width={25}
                                          height={25}
                                          objectFit="contain"
                                          alt="car"
                                        />
                                        <span className="text-sm">
                                          Trip Insurance
                                        </span>
                                      </div>
                                      <div className="flex flex-row gap-2 items-center bg-white px-4 py-2 rounded-md h-[42px]">
                                        <Image
                                          src="/carListingBanner/gst.png"
                                          width={25}
                                          height={10}
                                          objectFit="contain"
                                          alt="car"
                                        />
                                        <span className="text-sm">GST</span>
                                      </div>
                                      <div className="flex flex-row gap-2 items-center bg-white px-4 py-2 rounded-md h-[42px]">
                                        <Image
                                          src="/carListingBanner/deposit.png"
                                          width={25}
                                          height={25}
                                          objectFit="contain"
                                          alt="car"
                                        />
                                        <span className="text-sm">
                                          Refundable Security Deposit
                                        </span>
                                      </div>
                                    </>
                                  )}
                                  {activeTab === "Exclusion" && (
                                    <div>Exclusion Content</div>
                                  )}
                                  {activeTab === "Facilities" && (
                                    <div>Facilities Content</div>
                                  )}
                                  {activeTab === "T&C" && <div>T&C Content</div>}
                                </div>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </>
                  )}
                {driverType ===
                  data?.bookingOptions?.withDriver?.outstation?.name && (
                    <>
                      <div className="flex flex-col items-center jusitfy-center w-[486px] h-full ">
                        <div className="flex flex-row justify-center m-auto pr-10 pt-14">
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
                      <div className="h-[274px] relative">
                        <div className="mt-5 flex flex-row items-center gap-4 mr-10">
                          <div className="sm:flex flex-row items-center justify-between bg-white gap-3 border-[1.5px] border-[#FF0000] px-2 py-2 rounded-lg sm:w-[210px] sm:h-[71px]">
                            <span className="font-bold text-[18px] ">
                              {/* {data?.bookingOptions?.subscription?.package1?.price} */}
                              {/* {data?.bookingOptions?.withDriver?.outstation?.packageType?.package2?.price} */}
                              --
                            </span>
                            <span className="flex flex-col gap-0">
                              <p className="text-[#565454] font-[500] text-[14px] text-center">
                                {/* {
                            data?.bookingOptions?.withDriver?.packageType
                              ?.package1?.duration
                          } */}
                                --
                              </p>
                              <hr className="border-[#000000] border-[1.2px]" />
                              <p className="text-[#FF0000] font-[500] text-[14px]">
                                360 Free kms
                              </p>
                            </span>
                          </div>
                          <div className="sm:flex flex-row items-center justify-between bg-white gap-3 border-[1.5px] border-[#FF0000] px-2 py-2 rounded-lg sm:w-[210px] sm:h-[71px]">
                            <span className="font-bold text-[18px] ">
                              {/* {data?.bookingOptions?.subscription?.package2?.price} */}
                              --
                            </span>
                            <span className="flex flex-col gap-0">
                              <p className="text-[#565454] font-[500] text-[14px] text-center">
                                {/* {
                            data?.bookingOptions?.subscription?.package2
                              ?.duration
                          } */}
                                --
                              </p>
                              <hr className="border-[#000000] border-[1.2px]" />
                              <p className="text-[#FF0000] font-[500] text-[14px]">
                                360 Free kms
                              </p>
                            </span>
                          </div>
                          <div className="sm:flex flex-row items-center justify-between bg-white gap-3 border-[1.5px] border-[#FF0000] px-2 py-2 rounded-lg sm:w-[210px] sm:h-[71px]">
                            <span className="font-bold text-[18px] ">
                              {/* {data?.bookingOptions?.subscription?.package3?.price} */}
                              --
                            </span>
                            <span className="flex flex-col gap-0">
                              <p className="text-[#565454] font-[500] text-[14px] text-center">
                                {/* {
                            data?.bookingOptions?.subscription?.package3
                              ?.duration
                          } */}
                                --
                              </p>
                              <hr className="border-[#000000] border-[1.2px]" />
                              <p className="text-[#FF0000] font-[500] lg:text-[14px] text-[11px]">
                                360 Free kms
                              </p>
                            </span>
                          </div>

                          {/* <div className="sm:flex flex-row items-center justify-between bg-white gap-3 border-[1.5px] border-[#000000] px-2 py-2 rounded-lg sm:w-[210px] sm:h-[71px]">
<span className="font-bold text-[18px] ">₹ 21,635</span>
<span className="flex flex-col gap-0">
<p className="text-[#565454] font-[500] text-[14px]">
120kms/day
</p>
<hr className="border-[#000000] border-[1.2px]" />
<p className="text-[#FF0000] font-[500] text-[14px]">
360 Free kms
</p>
</span>
</div>

<div className="sm:flex flex-row items-center justify-between bg-white gap-3 border-[1.5px] border-[#FF0000] px-2 py-2 rounded-lg sm:w-[210px] sm:h-[71px]">
<span className="font-bold text-[18px] ">₹ 21,635</span>
<span className="flex flex-col gap-0">
<p className="text-[#565454] font-[500] text-[14px]">
120kms/day
</p>
<hr className="border-[#000000] border-[1.2px]" />
<p className="text-[#FF0000] font-[500] text-[14px]">
360 Free kms
</p>
</span>
</div> */}
                        </div>
                        {/*  */}

                        <div className="flex flex-row justify-end mr-10 my-5">
                          <span>
                            ₹ Extra kms will be charged at{" "}
                            <span className="text-[#FF0000]">
                              {/* {data?.bookingOptions?.withDriver?.outstation?.packageType?.package1?.ratePerKm} */}
                            </span>
                          </span>
                        </div>

                        {/*  */}

                        <div className="flex flex-row justify-between items-center mr-10">
                          <div className="grid grid-cols-3 items-center w-full gap-y-6 ml-4">
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
                              <span>{data?.seatingCapacity} Person </span>
                            </div>
                            <div className="flex flex-row items-center gap-2">
                              <Image
                                src="/carListing/gas.png"
                                width={20}
                                objectFit={"contain"}
                                height={20}
                                alt="bluetooth"
                              />
                              <span>{data?.vehicleSpecifications?.fuelType}</span>
                            </div>
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
                          <div className="m-0">
                            <ThemeButton
                              onClick={() => {
                                Navigation.push(`/car-details/${data._id}`),
                                  selectDefaultPackage(data)
                              }
                              }
                              text="Book Now"
                              className=" sm:px-6 !px-2 sm:text-md text-xs w-[140px] h-[50px] text-center shadow-lg flex flex-row justify-center !font-bold !text-[20px]"
                            />
                          </div>
                        </div>
                        <div className="flex flex-row justify-end items-center w-full !pr-10 gap-2 cursor-pointer mt-2 absolute bottom-0">
                          <span
                            className="text-[#ff0000]"
                            onClick={() => setShowOptions(!showOptions)}
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
                          {showOptions ? (
                            <div className="flex flex-col w-[750px] z-10 absolute right-0 top-8 bg-red-50 p-4 rounded-xl drop-shadow">
                              <div className="flex justify-between px-4 items-center gap-[30px] bg-white rounded-lg overflow-hidden shadow-lg">
                                {tabs.map((tab) => (
                                  <button
                                    key={tab.name}
                                    className={`py-2 px-4 rounded-t-xl mt-2 ${activeTab === tab.name
                                      ? "bg-red-200 text-red-600"
                                      : "bg-red-600 text-white"
                                      }`}
                                    onClick={() => setActiveTab(tab.name)}
                                  >
                                    {tab.name}
                                  </button>
                                ))}
                              </div>
                              <div className="mt-0 flex justify-center">
                                <div className="bg-red-200 px-4 py-2 rounded-lg flex justify-around items-center w-full max-w-4xl">
                                  {activeTab === "Inclusions" && (
                                    <>
                                      <div className="flex flex-row gap-2 items-center bg-white px-4 py-2 rounded-md h-[42px]">
                                        <Image
                                          src="/carListingBanner/baseCar.png"
                                          width={25}
                                          height={25}
                                          objectFit="contain"
                                          alt="car"
                                        />
                                        <span className="text-sm">Base Fare</span>
                                      </div>
                                      <div className="flex flex-row gap-2 items-center bg-white px-4 py-2 rounded-md h-[42px]">
                                        <Image
                                          src="/carListingBanner/trip.png"
                                          width={25}
                                          height={25}
                                          objectFit="contain"
                                          alt="car"
                                        />
                                        <span className="text-sm">
                                          Trip Insurance
                                        </span>
                                      </div>
                                      <div className="flex flex-row gap-2 items-center bg-white px-4 py-2 rounded-md h-[42px]">
                                        <Image
                                          src="/carListingBanner/gst.png"
                                          width={25}
                                          height={10}
                                          objectFit="contain"
                                          alt="car"
                                        />
                                        <span className="text-sm">GST</span>
                                      </div>
                                      <div className="flex flex-row gap-2 items-center bg-white px-4 py-2 rounded-md h-[42px]">
                                        <Image
                                          src="/carListingBanner/deposit.png"
                                          width={25}
                                          height={25}
                                          objectFit="contain"
                                          alt="car"
                                        />
                                        <span className="text-sm">
                                          Refundable Security Deposit
                                        </span>
                                      </div>
                                    </>
                                  )}
                                  {activeTab === "Exclusion" && <div>test</div>}
                                  {activeTab === "Facilities" && (
                                    <div>Facilities Content</div>
                                  )}
                                  {activeTab === "T&C" && <div>T&C Content</div>}
                                </div>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </>
                  )}
              </>
            ) : (
              ""
            )}
          </main>
          {showOptions && (
            <div className="flex flex-col w-full z-10 bg-red-50 p-4 rounded-xl drop-shadow p-4">
              <div className="flex justify-between px-4 items-center gap-[30px] bg-white rounded-lg overflow-hidden shadow-lg">
                {tabs.map((tab) => (
                  <button
                    key={tab.name}
                    className={`py-2 px-4 rounded-t-xl mt-2 w-full ${activeTab === tab.name
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
                    <div className="grid grid-cols-4 gap-4">
                      <div className="flex flex-row gap-2 items-center bg-white px-4 py-2 rounded-md h-[42px] border border-[#FF0000] shadow-tabs-shadow">
                        <Image
                          src="/carListingBanner/baseCar.svg"
                          width={25}
                          height={25}
                          objectFit="contain"
                          alt="car"
                        />
                        <span className="text-sm font-semibold">Base Fare</span>
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
        {/* mobile view for car listing */}
        <section>
          {bookingOptionsHome === data?.bookingOptions?.selfDrive?.name ? (
            <>
              <div
                className="sm:hidden block p-4 pb-0  relative pb-6 bg-[url('/carListing/listing-card-bg.png')]"
                style={{ backgroundSize: "100% 100%" }}
              >
                <div className="grid grid-cols-3 gap-2 mt-10">
                  <div
                    onClick={() => {
                      setPrice(
                        data?.bookingOptions?.selfDrive?.packageType
                          ?.package1?.price
                      );
                      setClicked1(true);
                      setClicked2(false);
                      setClicked3(false);
                    }}
                    className={`${clicked1
                      ? " border border-black bg-gradient-to-r from-[#FFD7D7] transition-all text-center to-[#fff] py-[3px] px-2 rounded-md"
                      : "border-[#FF0000] border text-center py-[3px] px-2 rounded-md"
                      }`}
                  >
                    <p
                      className={` ${data?.bookingOptions?.selfDrive?.packageType
                        ?.package1?.duration === "Unlimited"
                        ? "text-[#939393]"
                        : "text-[#565454]"
                        } sm:text-sm text-[10px]`}
                    >
                      {
                        data?.bookingOptions?.selfDrive?.packageType?.package1
                          ?.duration
                      }
                    </p>
                    <strong className="block text-sm">
                      ₹{" "}
                      {

                        calculateTotalPrice(data?.bookingOptions?.selfDrive?.packageType?.package1
                          ?.price)?.toFixed(0)
                      }
                    </strong>
                    <p className="text-primary sm:text-xs text-[8px]">
                      {data?.bookingOptions?.selfDrive?.packageType?.package1
                        ?.kmsLimit ? data?.bookingOptions?.selfDrive?.packageType?.package1
                          ?.kmsLimit * (days as number) : "0"} Free kms
                    </p>
                  </div>
                  <div
                    onClick={() => {
                      setPrice(
                        data?.bookingOptions?.selfDrive?.packageType
                          ?.package2?.price
                      );
                      setClicked1(false);
                      setClicked2(true);
                      setClicked3(false);
                    }}
                    className={`${clicked2
                      ? " border border-black bg-gradient-to-r from-[#FFD7D7] transition-all text-center to-[#fff] py-[3px] px-2 rounded-md"
                      : "border border-[#FF0000] text-center py-[3px] px-2 rounded-md bg-white"
                      }`}
                  >
                    <p
                      className={` ${data?.bookingOptions?.subscription?.packageType
                        ?.package2?.duration === "Unlimited"
                        ? "text-[#939393]"
                        : "text-[#565454]"
                        } sm:text-sm text-[10px]`}
                    >
                      {
                        data?.bookingOptions?.selfDrive?.packageType?.package2
                          ?.duration
                      }
                    </p>
                    <strong className="block text-sm">
                      ₹{" "}
                      {


                        calculateTotalPrice(data?.bookingOptions?.selfDrive?.packageType?.package2
                          ?.price)?.toFixed(0)
                      }
                    </strong>
                    <p className="text-primary sm:text-xs text-[8px]">
                      {data?.bookingOptions?.selfDrive?.packageType?.package2
                        ?.kmsLimit ? data?.bookingOptions?.selfDrive?.packageType?.package2
                          ?.kmsLimit * (days as number) : "0"} Free kms
                    </p>
                  </div>
                  <div
                    onClick={() => {
                      setPrice(
                        data?.bookingOptions?.selfDrive?.packageType
                          ?.package3?.price
                      );
                      setClicked1(false);
                      setClicked2(false);
                      setClicked3(true);
                    }}
                    className={`${clicked3
                      ? "border border-black bg-gradient-to-r from-[#FFD7D7] transition-all text-center to-[#fff] py-[3px] px-2 rounded-md"
                      : "border border-[#FF0000] text-center py-[3px] px-2 rounded-md bg-white"
                      }`}
                  >
                    <p
                      className={` ${data?.bookingOptions?.subscription?.packageType
                        ?.package3?.duration === "Unlimited"
                        ? "text-[#939393]"
                        : "text-[#565454]"
                        } sm:text-sm text-[10px]`}
                    >
                      {
                        data?.bookingOptions?.selfDrive?.packageType?.package3
                          ?.duration
                      }
                    </p>
                    <strong className="block text-sm">
                      ₹{" "}
                      {

                        calculateTotalPrice(data?.bookingOptions?.selfDrive?.packageType?.package3
                          ?.price)?.toFixed(0)
                      }
                    </strong>
                    <p className="text-primary sm:text-xs text-[8px]">
                      {data?.bookingOptions?.selfDrive?.packageType?.package3
                        ?.kmsLimit ? data?.bookingOptions?.selfDrive?.packageType?.package3
                          ?.kmsLimit * (days as number) : "0"} Free kms
                    </p>
                  </div>
                </div>
                <div className="absolute top-4 left-[-8px]">
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
                <div className="xs:grid xs:grid-cols-[1fr_1.7fr] gap-2 mt-4">
                  <div>
                    <p className="font-semibold text-xl">{data?.carName}</p>

                    <span>
                      <Image
                        src={data?.featuredImage?.image}
                        alt={data?.featuredImage?.alt}
                        width={350}
                        height={350}
                        className="xs:w-full w-[60%] h-auto xs:m-0 m-auto"
                      />
                    </span>
                  </div>
                  <div className="relative">
                    <div className="gap-2 xs:mt-0 mt-2">
                      <div
                        onClick={() => setShowImg(!showImg)}
                        className="flex gap-2 cursor-pointer px-2 py-[3px] rounded-md border border-[#FF0000] w-fit m-auto"
                      >
                        <div className="flex-none ">
                          <Image
                            src="/svg/view.svg"
                            width={14}
                            objectFit={"contain"}
                            height={14}
                            alt="Car Icon"
                          />
                        </div>
                        <span className="font-semibold text-xs whitespace-nowrap">
                          View Real <span className="text-[#FF0000]"> Car</span> Images
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 items-center w-full gap-y-6 ml-4 mt-6">
                      {data?.carFeatures?.bluetooth === true && (
                        <div className="flex flex-row items-center gap-2">
                          <Image
                            src="/carListing/bluetooth.png"
                            width={15}
                            objectFit={"contain"}
                            height={15}
                            alt="bluetooth"
                          />
                          <span className="text-[10px]">Bluetooth</span>
                        </div>
                      )}

                      <div className="flex flex-row items-center gap-2">
                        <Image
                          src="/carListing/manual.png"
                          width={15}
                          objectFit={"contain"}
                          height={15}
                          alt="bluetooth"
                        />
                        <span className="text-[10px]">Manual</span>
                      </div>
                      {data?.carFeatures?.navigationSystem === true && (
                        <div className="flex flex-row items-center gap-2">
                          <Image
                            src="/carListing/gps.png"
                            width={15}
                            objectFit={"contain"}
                            height={15}
                            alt="bluetooth"
                          />
                          <span className="text-[10px]">GPS Navigation</span>
                        </div>
                      )}
                      <div className="flex flex-row items-center gap-2">
                        <Image
                          src="/carListing/seats.png"
                          width={15}
                          objectFit={"contain"}
                          height={15}
                          alt="bluetooth"
                        />
                        <span className="text-[10px]">
                          {data?.seatingCapacity} Person
                        </span>
                      </div>
                      {data?.vehicleSpecifications?.fuelType && (
                        <div className="flex flex-row items-center gap-2">
                          <Image
                            src="/carListing/gas.png"
                            width={15}
                            objectFit={"contain"}
                            height={15}
                            alt="bluetooth"
                          />
                          <span className="text-[10px]">
                            {data?.vehicleSpecifications?.fuelType}
                          </span>
                        </div>
                      )}

                      <div className="flex flex-row items-center gap-2">
                        <Image
                          src="/carListing/bootspace.png"
                          width={15}
                          objectFit={"contain"}
                          height={15}
                          alt="bluetooth"
                        />
                        <span className="text-[10px]">Boot Space</span>
                      </div>
                    </div>
                    <ThemeButton
                      onClick={() => {


                        Navigation.push(`/car-details/${data._id}`),
                          selectDefaultPackage(data);

                      }
                      }
                      text="Book Now"
                      className="ml-auto mt-4 shadow-custom-shadow grad-button !px-4 !font-semibold z-[9]"
                    />
                    <div className="flex flex-row items-center sm:w-full xs:!pr-10 absolute bottom-2 left-4 gap-2 cursor-pointer mt-2 w-fit">
                      <span
                        className="text-[#ff0000] text-xs"
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
                        className={showOptions ? "" : "rotate-180"}
                      />
                    </div>
                  </div>
                </div>
                {showOptionsMobile && (
                  <div className="flex flex-col w-full z-10 rounded-xl drop-shadow mt-2">
                    <div className="flex justify-between sm:px-4 items-center sm:gap-[30px] bg-white sm:rounded-lg rounded-xs overflow-hidden shadow-lg">
                      {tabs.map((tab) => (
                        <button
                          key={tab.name}
                          className={`sm:py-2 sm:px-4 rounded-t-xl mt-2 w-full text-xs px-2 py-[7px] ${activeTab === tab.name
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
                              <span className="text-xs font-semibold">
                                Base Fare
                              </span>
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
            </>
          ) : bookingOptionsHome ===
            data?.bookingOptions?.subscription?.name ? (
            <>
              <div
                className="sm:hidden block p-4 pb-0  relative pb-6 bg-[url('/carListing/listing-card-bg.png')]"
                style={{ backgroundSize: "100% 100%" }}
              >
                <div className="grid grid-cols-3 gap-2 mt-10">
                  <div
                    // className={`border text-center py-[3px] px-2 rounded-md`}
                    onClick={() => {
                      setPrice(
                        data?.bookingOptions?.subscription?.packageType
                          ?.package1?.price
                      );
                      setClicked1(true);
                      setClicked2(false);
                      setClicked3(false);
                    }}
                    className={`${clicked1
                      ? " border border-black bg-gradient-to-r from-[#FFD7D7] transition-all text-center to-[#fff] py-[3px] px-2 rounded-md"
                      : "border-[#FF0000] border text-center py-[3px] px-2 rounded-md"
                      }`}

                  >
                    <p
                      className={` ${data?.bookingOptions?.subscription?.packageType
                        ?.package1?.duration === "Unlimited"
                        ? "text-[#939393]"
                        : "text-[#565454]"
                        } sm:text-sm text-[10px]`}
                    >
                      {
                        data?.bookingOptions?.subscription?.packageType?.package1
                          ?.duration
                      }
                    </p>
                    <strong className="block text-sm">
                      {
                        calculateTotalPrice(
                          data?.bookingOptions?.subscription?.packageType?.package1
                            ?.price)?.toFixed(0)
                      }
                    </strong>
                    <p className="text-primary sm:text-xs text-[8px]">
                      {data?.bookingOptions?.subscription?.packageType?.package1
                        ?.kmsLimit ? data?.bookingOptions?.subscription?.packageType?.package1
                          ?.kmsLimit * (days as number) : "0"} Free kms
                    </p>
                  </div>
                  <div
                    // className={`border text-center py-[3px] px-2 rounded-md`}
                    onClick={() => {
                      setPrice(
                        data?.bookingOptions?.subscription?.packageType
                          ?.package2?.price
                      );
                      setClicked1(false);
                      setClicked2(true);
                      setClicked3(false);
                    }}
                    className={`${clicked2
                      ? " border border-black bg-gradient-to-r from-[#FFD7D7] transition-all text-center to-[#fff] py-[3px] px-2 rounded-md"
                      : "border-[#FF0000] border text-center py-[3px] px-2 rounded-md"
                      }`}
                  >
                    <p
                      className={` ${data?.bookingOptions?.subscription?.packageType
                        ?.package2?.duration === "Unlimited"
                        ? "text-[#939393]"
                        : "text-[#565454]"
                        } sm:text-sm text-[10px]`}
                    >
                      {
                        data?.bookingOptions?.subscription?.packageType?.package2
                          ?.duration
                      }
                    </p>
                    <strong className="block text-sm">
                      {
                        calculateTotalPrice(
                          data?.bookingOptions?.subscription?.packageType?.package2
                            ?.price)?.toFixed(0)
                      }
                    </strong>
                    <p className="text-primary sm:text-xs text-[8px]">
                      {data?.bookingOptions?.subscription?.packageType?.package2
                        ?.kmsLimit ? data?.bookingOptions?.subscription?.packageType?.package2
                          ?.kmsLimit * (days as number) : "0"} Free kms
                    </p>
                  </div>
                  <div
                    // className={`border text-center py-[3px] px-2 rounded-md`}
                    onClick={() => {
                      setPrice(
                        data?.bookingOptions?.subscription?.packageType
                          ?.package3?.price
                      );
                      setClicked1(false);
                      setClicked2(false);
                      setClicked3(true);
                    }}
                    className={`${clicked3
                      ? " border border-black bg-gradient-to-r from-[#FFD7D7] transition-all text-center to-[#fff] py-[3px] px-2 rounded-md"
                      : "border-[#FF0000] border text-center py-[3px] px-2 rounded-md"
                      }`}
                  >
                    <p
                      className={` ${data?.bookingOptions?.subscription?.packageType
                        ?.package3?.duration === "Unlimited"
                        ? "text-[#939393]"
                        : "text-[#565454]"
                        } sm:text-sm text-[10px]`}
                    >
                      {
                        data?.bookingOptions?.subscription?.packageType?.package3
                          ?.duration
                      }
                    </p>
                    <strong className="block text-sm">
                      {
                        calculateTotalPrice(
                          data?.bookingOptions?.subscription?.packageType?.package3
                            ?.price)?.toFixed(0)
                      }
                    </strong>
                    <p className="text-primary sm:text-xs text-[8px]">
                      {data?.bookingOptions?.subscription?.packageType?.package3
                        ?.kmsLimit ? data?.bookingOptions?.subscription?.packageType?.package3
                          ?.kmsLimit * (days as number) : "0"} Free kms
                    </p>
                  </div>
                </div>
                <div className="absolute top-4 left-[-8px]">
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
                <div className="xs:grid xs:grid-cols-[1fr_1.7fr] gap-2 mt-4">
                  <div>
                    <p className="font-semibold text-xl">{data?.carName}</p>

                    <span>
                      <Image
                        src={data?.featuredImage.image}
                        alt={data?.featuredImage.alt}
                        width={350}
                        height={350}
                        className="xs:w-full w-[60%] h-auto xs:m-0 m-auto"
                      />
                    </span>
                  </div>
                  <div className="relative">
                    <div className="gap-2 xs:mt-0 mt-2">
                      <div
                        onClick={() => setShowImg(!showImg)}
                        className="flex gap-2 cursor-pointer px-2 py-[3px] rounded-md border border-red-500 w-fit m-auto"
                      >
                        <div className="flex-none ">
                          <Image
                            src="/carListing/view.png"
                            width={14}
                            objectFit={"contain"}
                            height={14}
                            alt="Car Icon"
                          />
                        </div>
                        <span className="text-[#ff0000] text-xs whitespace-nowrap">
                          View Real Car Images
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 items-center w-full gap-y-6 ml-4 mt-6">
                      {data?.carFeatures?.bluetooth === true && (
                        <div className="flex flex-row items-center gap-2">
                          <Image
                            src="/carListing/bluetooth.png"
                            width={15}
                            objectFit={"contain"}
                            height={15}
                            alt="bluetooth"
                          />
                          <span className="text-[10px]">Bluetooth</span>
                        </div>
                      )}

                      <div className="flex flex-row items-center gap-2">
                        <Image
                          src="/carListing/manual.png"
                          width={15}
                          objectFit={"contain"}
                          height={15}
                          alt="bluetooth"
                        />
                        <span className="text-[10px]">Manual</span>
                      </div>
                      {data?.carFeatures?.navigationSystem === true && (
                        <div className="flex flex-row items-center gap-2">
                          <Image
                            src="/carListing/gps.png"
                            width={15}
                            objectFit={"contain"}
                            height={15}
                            alt="bluetooth"
                          />
                          <span className="text-[10px]">GPS Navigation</span>
                        </div>
                      )}
                      <div className="flex flex-row items-center gap-2">
                        <Image
                          src="/carListing/seats.png"
                          width={15}
                          objectFit={"contain"}
                          height={15}
                          alt="bluetooth"
                        />
                        <span className="text-[10px]">{data?.seatingCapacity} Person</span>
                      </div>
                      <div className="flex flex-row items-center gap-2">
                        <Image
                          src="/carListing/gas.png"
                          width={15}
                          objectFit={"contain"}
                          height={15}
                          alt="bluetooth"
                        />
                        <span className="text-[10px]">
                          {data?.vehicleSpecifications?.fuelType}
                        </span>
                      </div>
                      <div className="flex flex-row items-center gap-2">
                        <Image
                          src="/carListing/bootspace.png"
                          width={15}
                          objectFit={"contain"}
                          height={15}
                          alt="bluetooth"
                        />
                        <span className="text-[10px]">Boot Space</span>
                      </div>
                    </div>
                    <ThemeButton onClick={() => {
                      Navigation.push(`/car-details/${data?._id}`)
                      selectDefaultPackage(data);
                    }
                    } text="Book Now" className="ml-auto mt-4" />
                    <div className="flex flex-row items-center w-full xs:!pr-10 absolute bottom-2 left-4 gap-2 cursor-pointer mt-2">
                      <span
                        className="text-[#ff0000] text-xs"
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
                        className={showOptions ? "" : "rotate-180"}
                      />
                    </div>
                  </div>
                </div>
                {showOptionsMobile && (
                  <div className="flex flex-col w-full z-10 rounded-xl drop-shadow mt-2">
                    <div className="flex justify-between sm:px-4 items-center sm:gap-[30px] bg-white sm:rounded-lg rounded-xs overflow-hidden shadow-lg">
                      {tabs.map((tab) => (
                        <button
                          key={tab.name}
                          className={`sm:py-2 sm:px-4 rounded-t-xl mt-2 w-full text-xs px-2 py-[7px] ${activeTab === tab.name
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
                                src="/carListingBanner/baseCar.png"
                                width={25}
                                height={25}
                                objectFit="contain"
                                alt="car"
                              />
                              <span className="text-xs font-semibold">
                                Base Fare
                              </span>
                            </div>
                            <div className="flex flex-row gap-2 items-center bg-white px-4 py-2 rounded-md h-[42px] border border-[#FF0000] shadow-tabs-shadow">
                              <Image
                                src="/carListingBanner/trip.png"
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
                                src="/carListingBanner/gst.png"
                                width={25}
                                height={10}
                                objectFit="contain"
                                alt="car"
                              />
                              <span className="text-xs font-semibold">GST</span>
                            </div>
                            <div className="flex flex-row gap-2 items-center bg-white px-4 py-2 rounded-md h-[42px] border border-[#FF0000] shadow-tabs-shadow">
                              <Image
                                src="/carListingBanner/deposit.png"
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
            </>
          ) : bookingOptionsHome === data?.bookingOptions?.withDriver?.name ? (
            <>
              {driverType ===
                data?.bookingOptions?.withDriver?.local?.name && (<div
                  className="sm:hidden block p-4 pb-0  relative pb-6 bg-[url('/carListing/listing-card-bg.png')]"
                  style={{ backgroundSize: "100% 100%" }}
                >
                  <div className="grid grid-cols-3 gap-2 mt-10">
                    <div
                      // className={`border text-center py-[3px] px-2 rounded-md`}
                      onClick={() => {
                        setPrice(
                          data?.bookingOptions?.withDriver?.local?.packageType?.package1
                            ?.price
                        );
                        setClicked1(true);
                        setClicked2(false);
                        setClicked3(false);
                      }}
                      className={`${clicked1
                        ? " border border-black bg-gradient-to-r from-[#FFD7D7] transition-all text-center to-[#fff] py-[3px] px-2 rounded-md"
                        : "border-[#FF0000] border text-center py-[3px] px-2 rounded-md"
                        }`}
                    >
                      <p
                        className={` ${data?.bookingOptions?.withDriver?.local?.packageType
                          ?.package1?.duration === "Unlimited"
                          ? "text-[#939393]"
                          : "text-[#565454]"
                          } sm:text-sm text-[10px]`}
                      >
                        {
                          data?.bookingOptions?.withDriver?.local?.packageType?.package1
                            ?.duration
                        }
                      </p>
                      <strong className="block text-sm">
                        {
                          calculateTotalPrice(
                            data?.bookingOptions?.withDriver?.local?.packageType?.package1
                              ?.price)?.toFixed(0)
                        }
                      </strong>
                      <p className="text-primary sm:text-xs text-[8px]">
                        {data?.bookingOptions?.withDriver?.local?.packageType?.package1
                          ?.kmsLimit ? data?.bookingOptions?.withDriver?.local?.packageType?.package1
                            ?.kmsLimit * (days as number) : "0"} Free kms
                      </p>
                    </div>
                    <div
                      // className={`border text-center py-[3px] px-2 rounded-md`}
                      onClick={() => {
                        setPrice(
                          data?.bookingOptions?.withDriver?.local?.packageType?.package2
                            ?.price
                        );
                        setClicked1(false);
                        setClicked2(true);
                        setClicked3(false);
                      }}
                      className={`${clicked2
                        ? " border border-black bg-gradient-to-r from-[#FFD7D7] transition-all text-center to-[#fff] py-[3px] px-2 rounded-md"
                        : "border-[#FF0000] border text-center py-[3px] px-2 rounded-md"
                        }`}
                    >
                      <p
                        className={` ${data?.bookingOptions?.withDriver?.local?.packageType
                          ?.package2?.duration === "Unlimited"
                          ? "text-[#939393]"
                          : "text-[#565454]"
                          } sm:text-sm text-[10px]`}
                      >
                        {
                          data?.bookingOptions?.withDriver?.local?.packageType?.package2
                            ?.duration
                        }
                      </p>
                      <strong className="block text-sm">
                        {
                          calculateTotalPrice(
                            data?.bookingOptions?.withDriver?.local?.packageType?.package2
                              ?.price)?.toFixed(0)
                        }
                      </strong>
                      <p className="text-primary sm:text-xs text-[8px]">
                        {data?.bookingOptions?.withDriver?.local?.packageType?.package2
                          ?.kmsLimit ? data?.bookingOptions?.withDriver?.local?.packageType?.package2
                            ?.kmsLimit * (days as number) : "0"} Free kms
                      </p>
                    </div>
                    <div
                      // className={`border text-center py-[3px] px-2 rounded-md`}
                      onClick={() => {
                        setPrice(
                          data?.bookingOptions?.withDriver?.local?.packageType?.package3
                            ?.price
                        );
                        setClicked1(false);
                        setClicked2(false);
                        setClicked3(true);
                      }}
                      className={`${clicked3
                        ? " border border-black bg-gradient-to-r from-[#FFD7D7] transition-all text-center to-[#fff] py-[3px] px-2 rounded-md"
                        : "border-[#FF0000] border text-center py-[3px] px-2 rounded-md"
                        }`}
                    >
                      <p
                        className={` ${data?.bookingOptions?.withDriver?.local?.packageType
                          ?.package3?.duration === "Unlimited"
                          ? "text-[#939393]"
                          : "text-[#565454]"
                          } sm:text-sm text-[10px]`}
                      >
                        {
                          data?.bookingOptions?.withDriver?.local?.packageType?.package3
                            ?.duration
                        }
                      </p>
                      <strong className="block text-sm">
                        {
                          calculateTotalPrice(
                            data?.bookingOptions?.withDriver?.local?.packageType?.package3
                              ?.price)?.toFixed(0)
                        }
                      </strong>
                      <p className="text-primary sm:text-xs text-[8px]">
                        {data?.bookingOptions?.withDriver?.local?.packageType?.package3
                          ?.kmsLimit ? data?.bookingOptions?.withDriver?.local?.packageType?.package3
                            ?.kmsLimit * (days as number) : "0"} Free kms
                      </p>
                    </div>
                  </div>
                  <div className="absolute top-4 left-[-8px]">
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
                  <div className="xs:grid xs:grid-cols-[1fr_1.7fr] gap-2 mt-4">
                    <div>
                      <p className="font-semibold text-xl">{data?.carName}</p>

                      <span>
                        <Image
                          src={data?.featuredImage.image}
                          alt={data?.featuredImage.alt}
                          width={350}
                          height={350}
                          className="xs:w-full w-[60%] h-auto xs:m-0 m-auto"
                        />
                      </span>
                    </div>
                    <div className="relative">
                      <div className="gap-2 xs:mt-0 mt-2">
                        <div
                          onClick={() => setShowImg(!showImg)}
                          className="flex gap-2 cursor-pointer px-2 py-[3px] rounded-md border border-red-500 w-fit m-auto"
                        >
                          <div className="flex-none ">
                            <Image
                              src="/carListing/view.png"
                              width={14}
                              objectFit={"contain"}
                              height={14}
                              alt="Car Icon"
                            />
                          </div>
                          <span className="text-[#ff0000] text-xs whitespace-nowrap">
                            View Real Car Images
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 items-center w-full gap-y-6 ml-4 mt-6">
                        {data?.carFeatures?.bluetooth === true && (
                          <div className="flex flex-row items-center gap-2">
                            <Image
                              src="/carListing/bluetooth.png"
                              width={15}
                              objectFit={"contain"}
                              height={15}
                              alt="bluetooth"
                            />
                            <span className="text-[10px]">Bluetooth</span>
                          </div>
                        )}

                        <div className="flex flex-row items-center gap-2">
                          <Image
                            src="/carListing/manual.png"
                            width={15}
                            objectFit={"contain"}
                            height={15}
                            alt="bluetooth"
                          />
                          <span className="text-[10px]">Manual</span>
                        </div>
                        {data?.carFeatures?.navigationSystem === true && (
                          <div className="flex flex-row items-center gap-2">
                            <Image
                              src="/carListing/gps.png"
                              width={15}
                              objectFit={"contain"}
                              height={15}
                              alt="bluetooth"
                            />
                            <span className="text-[10px]">GPS Navigation</span>
                          </div>
                        )}
                        <div className="flex flex-row items-center gap-2">
                          <Image
                            src="/carListing/seats.png"
                            width={15}
                            objectFit={"contain"}
                            height={15}
                            alt="bluetooth"
                          />
                          <span className="text-[10px]">{data?.seatingCapacity} Person</span>
                        </div>
                        <div className="flex flex-row items-center gap-2">
                          <Image
                            src="/carListing/gas.png"
                            width={15}
                            objectFit={"contain"}
                            height={15}
                            alt="bluetooth"
                          />
                          <span className="text-[10px]">
                            {data?.vehicleSpecifications?.fuelType}
                          </span>
                        </div>
                        <div className="flex flex-row items-center gap-2">
                          <Image
                            src="/carListing/bootspace.png"
                            width={15}
                            objectFit={"contain"}
                            height={15}
                            alt="bluetooth"
                          />
                          <span className="text-[10px]">Boot Space</span>
                        </div>
                      </div>
                      <ThemeButton onClick={() => {
                        Navigation.push(`/car-details/${data._id}`)
                        selectDefaultPackage(data);
                      }
                      } text="Book Now" className="ml-auto mt-4" />
                      <div className="flex flex-row items-center w-full xs:!pr-10 absolute bottom-2 left-4 gap-2 cursor-pointer mt-2">
                        <span
                          className="text-[#ff0000] text-xs"
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
                          className={showOptions ? "" : "rotate-180"}
                        />
                      </div>
                    </div>
                  </div>
                  {showOptionsMobile && (
                    <div className="flex flex-col w-full z-10 rounded-xl drop-shadow mt-2">
                      <div className="flex justify-between sm:px-4 items-center sm:gap-[30px] bg-white sm:rounded-lg rounded-xs overflow-hidden shadow-lg">
                        {tabs.map((tab) => (
                          <button
                            key={tab.name}
                            className={`sm:py-2 sm:px-4 rounded-t-xl mt-2 w-full text-xs px-2 py-[7px] ${activeTab === tab.name
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
                                  src="/carListingBanner/baseCar.png"
                                  width={25}
                                  height={25}
                                  objectFit="contain"
                                  alt="car"
                                />
                                <span className="text-xs font-semibold">
                                  Base Fare
                                </span>
                              </div>
                              <div className="flex flex-row gap-2 items-center bg-white px-4 py-2 rounded-md h-[42px] border border-[#FF0000] shadow-tabs-shadow">
                                <Image
                                  src="/carListingBanner/trip.png"
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
                                  src="/carListingBanner/gst.png"
                                  width={25}
                                  height={10}
                                  objectFit="contain"
                                  alt="car"
                                />
                                <span className="text-xs font-semibold">GST</span>
                              </div>
                              <div className="flex flex-row gap-2 items-center bg-white px-4 py-2 rounded-md h-[42px] border border-[#FF0000] shadow-tabs-shadow">
                                <Image
                                  src="/carListingBanner/deposit.png"
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
                </div>)}
              {driverType ===
                data?.bookingOptions?.withDriver?.outstation?.name && (
                  <div
                className="sm:hidden block p-4 pb-0  relative pb-6 bg-[url('/carListing/listing-card-bg.png')]"
                style={{ backgroundSize: "100% 100%" }}
              >
                <div className="grid grid-cols-3 gap-2 mt-10">
                  <div
                    // className={`border text-center py-[3px] px-2 rounded-md`}
                    onClick={() => {
                      setPrice(
                        data?.bookingOptions?.withDriver?.outstation?.packageType?.package1
                          ?.price
                      );
                      setClicked1(true);
                      setClicked2(false);
                      setClicked3(false);
                    }}
                    className={`${clicked1
                      ? " border border-black bg-gradient-to-r from-[#FFD7D7] transition-all text-center to-[#fff] py-[3px] px-2 rounded-md"
                      : "border-[#FF0000] border text-center py-[3px] px-2 rounded-md"
                      }`}
                  >
                    {/* <p
                      className={` ${data?.bookingOptions?.withDriver?.outstation?.packageType
                        ?.package1?.duration === "Unlimited"
                        ? "text-[#939393]"
                        : "text-[#565454]"
                        } sm:text-sm text-[10px]`}
                    >
                      {
                        data?.bookingOptions?.withDriver?.outstation?.packageType?.package1
                          ?.duration
                      }
                    </p> */}
                    <strong className="block text-sm">
                      {
                        calculateTotalPrice(
                          data?.bookingOptions.withDriver.outstation.packageType.package1.ratePerKm)?.toFixed(0)
                      }
                    </strong>
                    <p className="text-primary sm:text-xs text-[8px]">
                      {data?.bookingOptions?.withDriver?.outstation?.packageType?.package1
                        ?.kmsLimit ? data?.bookingOptions?.withDriver?.outstation?.packageType?.package1
                          ?.kmsLimit * (days as number) : "0"} Free kms
                    </p>
                  </div>
                  <div
                    // className={`border text-center py-[3px] px-2 rounded-md`}
                    onClick={() => {
                      setPrice(
                        data?.bookingOptions?.withDriver?.outstation?.packageType?.package2
                          ?.price
                      );
                      setClicked1(false);
                      setClicked2(true);
                      setClicked3(false);
                    }}
                    className={`${clicked2
                      ? " border border-black bg-gradient-to-r from-[#FFD7D7] transition-all text-center to-[#fff] py-[3px] px-2 rounded-md"
                      : "border-[#FF0000] border text-center py-[3px] px-2 rounded-md"
                      }`}
                  >
                    {/* <p
                      className={` ${data?.bookingOptions?.withDriver?.outstation?.packageType
                        ?.package2?.duration === "Unlimited"
                        ? "text-[#939393]"
                        : "text-[#565454]"
                        } sm:text-sm text-[10px]`}
                    >
                      {
                        data?.bookingOptions?.withDriver?.outstation?.packageType?.package2
                          ?.duration
                      }
                    </p> */}
                    <strong className="block text-sm">
                      {
                        calculateTotalPrice(
                          data?.bookingOptions.withDriver.outstation.packageType.package2.ratePerKm)?.toFixed(0)
                      }
                    </strong>
                    <p className="text-primary sm:text-xs text-[8px]">
                      {data?.bookingOptions?.withDriver?.outstation?.packageType?.package2
                        ?.kmsLimit ? data?.bookingOptions?.withDriver?.outstation?.packageType?.package2
                          ?.kmsLimit * (days as number) : "0"} Free kms
                    </p>
                  </div>
                  <div
                    // className={`border text-center py-[3px] px-2 rounded-md`}
                    onClick={() => {
                      setPrice(
                        data?.bookingOptions?.withDriver?.outstation?.packageType?.package3
                          ?.price
                      );
                      setClicked1(false);
                      setClicked2(false);
                      setClicked3(true);
                    }}
                    className={`${clicked3
                      ? " border border-black bg-gradient-to-r from-[#FFD7D7] transition-all text-center to-[#fff] py-[3px] px-2 rounded-md"
                      : "border-[#FF0000] border text-center py-[3px] px-2 rounded-md"
                      }`}
                  >
                    {/* <p
                      className={` ${data?.bookingOptions?.withDriver?.outstation?.packageType
                        ?.package3?.duration === "Unlimited"
                        ? "text-[#939393]"
                        : "text-[#565454]"
                        } sm:text-sm text-[10px]`}
                    >
                      {
                        data?.bookingOptions?.withDriver?.outstation?.packageType?.package3
                          ?.duration
                      }
                    </p> */}
                    <strong className="block text-sm">
                      {
                        calculateTotalPrice(
                          data?.bookingOptions.withDriver.outstation.packageType.package3.ratePerKm)?.toFixed(0)
                      }
                    </strong>
                    <p className="text-primary sm:text-xs text-[8px]">
                      {data?.bookingOptions?.withDriver?.outstation?.packageType?.package3
                        ?.kmsLimit ? data?.bookingOptions?.withDriver?.outstation?.packageType?.package3
                          ?.kmsLimit * (days as number) : "0"} Free kms
                    </p>
                  </div>
                </div>
                <div className="absolute top-4 left-[-8px]">
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
                <div className="xs:grid xs:grid-cols-[1fr_1.7fr] gap-2 mt-4">
                  <div>
                    <p className="font-semibold text-xl">{data?.carName}</p>

                    <span>
                      <Image
                        src={data?.featuredImage.image}
                        alt={data?.featuredImage.alt}
                        width={350}
                        height={350}
                        className="xs:w-full w-[60%] h-auto xs:m-0 m-auto"
                      />
                    </span>
                  </div>
                  <div className="relative">
                    <div className="gap-2 xs:mt-0 mt-2">
                      <div
                        onClick={() => setShowImg(!showImg)}
                        className="flex gap-2 cursor-pointer px-2 py-[3px] rounded-md border border-red-500 w-fit m-auto"
                      >
                        <div className="flex-none ">
                          <Image
                            src="/carListing/view.png"
                            width={14}
                            objectFit={"contain"}
                            height={14}
                            alt="Car Icon"
                          />
                        </div>
                        <span className="text-[#ff0000] text-xs whitespace-nowrap">
                          View Real Car Images
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 items-center w-full gap-y-6 ml-4 mt-6">
                      {data?.carFeatures?.bluetooth === true && (
                        <div className="flex flex-row items-center gap-2">
                          <Image
                            src="/carListing/bluetooth.png"
                            width={15}
                            objectFit={"contain"}
                            height={15}
                            alt="bluetooth"
                          />
                          <span className="text-[10px]">Bluetooth</span>
                        </div>
                      )}

                      <div className="flex flex-row items-center gap-2">
                        <Image
                          src="/carListing/manual.png"
                          width={15}
                          objectFit={"contain"}
                          height={15}
                          alt="bluetooth"
                        />
                        <span className="text-[10px]">Manual</span>
                      </div>
                      {data?.carFeatures?.navigationSystem === true && (
                        <div className="flex flex-row items-center gap-2">
                          <Image
                            src="/carListing/gps.png"
                            width={15}
                            objectFit={"contain"}
                            height={15}
                            alt="bluetooth"
                          />
                          <span className="text-[10px]">GPS Navigation</span>
                        </div>
                      )}
                      <div className="flex flex-row items-center gap-2">
                        <Image
                          src="/carListing/seats.png"
                          width={15}
                          objectFit={"contain"}
                          height={15}
                          alt="bluetooth"
                        />
                        <span className="text-[10px]">{data?.seatingCapacity} Person</span>
                      </div>
                      <div className="flex flex-row items-center gap-2">
                        <Image
                          src="/carListing/gas.png"
                          width={15}
                          objectFit={"contain"}
                          height={15}
                          alt="bluetooth"
                        />
                        <span className="text-[10px]">
                          {data?.vehicleSpecifications?.fuelType}
                        </span>
                      </div>
                      <div className="flex flex-row items-center gap-2">
                        <Image
                          src="/carListing/bootspace.png"
                          width={15}
                          objectFit={"contain"}
                          height={15}
                          alt="bluetooth"
                        />
                        <span className="text-[10px]">Boot Space</span>
                      </div>
                    </div>
                    <ThemeButton onClick={() => {
                      Navigation.push(`/car-details/${data._id}`)
                      selectDefaultPackage(data);
                    }
                    } text="Book Now" className="ml-auto mt-4" />
                    <div className="flex flex-row items-center w-full xs:!pr-10 absolute bottom-2 left-4 gap-2 cursor-pointer mt-2">
                      <span
                        className="text-[#ff0000] text-xs"
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
                        className={showOptions ? "" : "rotate-180"}
                      />
                    </div>
                  </div>
                </div>
                {showOptionsMobile && (
                  <div className="flex flex-col w-full z-10 rounded-xl drop-shadow mt-2">
                    <div className="flex justify-between sm:px-4 items-center sm:gap-[30px] bg-white sm:rounded-lg rounded-xs overflow-hidden shadow-lg">
                      {tabs.map((tab) => (
                        <button
                          key={tab.name}
                          className={`sm:py-2 sm:px-4 rounded-t-xl mt-2 w-full text-xs px-2 py-[7px] ${activeTab === tab.name
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
                                src="/carListingBanner/baseCar.png"
                                width={25}
                                height={25}
                                objectFit="contain"
                                alt="car"
                              />
                              <span className="text-xs font-semibold">
                                Base Fare
                              </span>
                            </div>
                            <div className="flex flex-row gap-2 items-center bg-white px-4 py-2 rounded-md h-[42px] border border-[#FF0000] shadow-tabs-shadow">
                              <Image
                                src="/carListingBanner/trip.png"
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
                                src="/carListingBanner/gst.png"
                                width={25}
                                height={10}
                                objectFit="contain"
                                alt="car"
                              />
                              <span className="text-xs font-semibold">GST</span>
                            </div>
                            <div className="flex flex-row gap-2 items-center bg-white px-4 py-2 rounded-md h-[42px] border border-[#FF0000] shadow-tabs-shadow">
                              <Image
                                src="/carListingBanner/deposit.png"
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
                )}


            </>
          ) : (
            ""
          )}
        </section>
      </div>
    </>
  );
};
export default CardListingCards;

const priceArray = [
  {
    chargePerDay: "120kms/day",
    price: "₹ 21,635",
    kilometers: "360 Free kms",
  },
  {
    chargePerDay: "300kms/day",
    price: "₹ 25,229",
    kilometers: "900 Free kms",
  },
  {
    chargePerDay: "Unlimited",
    price: "₹ 38,675",
    kilometers: "Unlimited kms",
  },
];
const featuresArray = [
  {
    imageUrl: "/carListing/bluetooth.png",
    feature: "Bluetooth",
  },
  {
    imageUrl: "/carListing/gps.png",
    feature: "GPS Navigation",
  },
  {
    imageUrl: "/carListing/bootspace.png",
    feature: "Boot Space",
  },
  {
    imageUrl: "/carListing/gas.png",
    feature: "Diesel",
  },
];
