"use client";
import { useState } from "react";
import ProductSlider from "@/app/components/product-slider/product-slider";
import Specifications from "@/app/components/specifications/specifications";
import BookingDetailsCard from "@/app/components/booking-details-card/booking-details-card";
import Image from "next/image";
import CarFeatures from "@/app/components/car-features/car-features";
import ExtraCharges from "@/app/components/extra-charges/extra-charges";
import DescCar from "@/app/components/desc-car/desc-car";
import Video from "@/app/components/video/video";
import FleetsSlider from "@/app/components/slider/slider-components";

const Subscription = () => {
  const [selectedOption, setSelectedOption] = useState("Monthly");

  const handleOptionClick = (option: any) => {
    setSelectedOption(option);
  };
  return (
    <>
      <div className="py-6 px-4">
        <div className="sm:flex hidden px-16 text-[#5F5D5D]">
          <span className="cursor-pointer">Home</span>/
          <span className="cursor-pointer">Listing</span>/
          <span className="cursor-pointer">Subscription</span>
        </div>
        <div className="lg:max-w-[1250px] max-w-[600px] m-auto sm:my-12 lg:grid grid-cols-[60%_40%] gap-6">
          <div>
            <ProductSlider featuredImage={{
              image: "",
              alt: ""
            }} />

            <div className="lg:hidden block my-4">
              <BookingDetailsCard />
            </div>
            {/* booking summary */}
            <div className="lg:hidden block">
              <main className="max-w-[504px] flex flex-col items-center bg-[#FAFAFA] my-6 rounded-md m-auto p-4">
                <div className="max-w-[376px] w-full h-[50px] bg-black text-white font-bold text-[20px] flex justify-center items-center rounded-xl">
                  <span className="text-center tracking-wide">Booking Summary</span>
                </div>
                <div className="m-auto mt-4 mb-2">
                  <span className="font-semibold text-[24px]">
                    Maruti Swift 2024
                  </span>
                </div>
                <div className="m-auto mb-4">
                  <span className="font-normal">Daily Rental</span>
                </div>
                <div className="w-full">
                  <div className="">
                    <div className="flex justify-between w-full overflow-scroll pb-2 gap-2 mb-4">
                      {["Weekly", "Monthly", "Quarterly", "Yearly"].map(
                        (option) => (
                          <button
                            key={option}
                            className={`py-2 px-4 ${selectedOption === option
                              ? "bg-[#ff0000] text-white"
                              : "text-gray-600 bg-[#F2F7F6]"
                              } rounded`}
                            onClick={() => handleOptionClick(option)}
                          >
                            {option}
                          </button>
                        )
                      )}
                    </div>
                    {selectedOption === "Monthly" && (
                      <div className="text-center mb-6 bg-[#E7E7E7] px-4 py-2 rounded-full drop-shadow-lg">
                        <p className="text-xl font-semibold text-[#ff0000]">
                          ₹ 19,764/month
                        </p>
                        <p className="text-gray-500 text-sm">
                          (Inclusive of insurance and maintenance)
                        </p>
                      </div>
                    )}
                    {selectedOption === "Weekly" && (
                      <div className="text-center mb-6 bg-[#E7E7E7] px-4 py-2 rounded-full drop-shadow-lg">
                        <p className="text-xl font-semibold text-[#ff0000]">
                          ₹ 5,000/week
                        </p>
                        <p className="text-gray-500 text-sm">
                          (Inclusive of insurance and maintenance)
                        </p>
                      </div>
                    )}
                    {selectedOption === "Quarterly" && (
                      <div className="text-center mb-6 bg-[#E7E7E7] px-4 py-2 rounded-full drop-shadow-lg">
                        <p className="text-xl font-semibold text-[#ff0000]">
                          ₹ 50,000/quarter
                        </p>
                        <p className="text-gray-500 text-sm">
                          (Inclusive of insurance and maintenance)
                        </p>
                      </div>
                    )}
                    {selectedOption === "Yearly" && (
                      <div className="text-center mb-6 bg-[#E7E7E7] px-4 py-2 rounded-full drop-shadow-lg">
                        <p className="text-xl font-semibold text-[#ff0000]">
                          ₹ 2,00,000/year
                        </p>
                        <p className="text-gray-500 text-sm">
                          (Inclusive of insurance and maintenance)
                        </p>
                      </div>
                    )}
                    <div className="mb-4 px-2">
                      <div className="flex justify-between  items-center">
                        <span className="font-semibold text-md">
                          Expected date of delivery
                        </span>
                        <button className="text-[#ff0000] flex flex-row items-center text-[12px]">
                          Edit{" "}
                          <Image
                            src="/carDetails/pen.png"
                            width={10}
                            height={10}
                            alt="edit"
                          />
                        </button>
                      </div>
                      <p className="text-gray-700 text-sm">Between 26th - 26th May</p>
                    </div>
                    <div className="mb-6 px-2">
                      <div className="flex justify-between  items-center">
                        <span className="font-semibold text-md">
                          Place of delivery
                        </span>
                        <button className="text-[#ff0000] flex flex-row gap-1 items-center text-[12px]">
                          Edit{" "}
                          <Image
                            src="/carDetails/pen.png"
                            width={10}
                            height={10}
                            alt="edit"
                          />
                        </button>
                      </div>
                      <p className="text-gray-700 text-sm">At your doorstep</p>
                    </div>
                    <div className="bg-white drop-shadow-lg p-4 rounded-lg mb-6">
                      <div className="text-center mb-6">
                        <button className=" h-[40px] py-2 px-4 border-[1px] border-[#ff0000] text-[#ff0000] rounded shadow-inner font-semibold">
                          Proceed to Check Eligibility
                        </button>
                      </div>
                      <div className="mb-0">
                        <div className="flex flex-row items-center justify-between w-full text-sm text-[#000] font-semibold mb-2">
                          <p>Extend anytime at normal prices</p>
                          <button className="text-[#ff0000]">Details</button>
                        </div>

                        <div className="flex flex-row items-center justify-between w-full text-sm text-[#000] font-semibold">
                          <p>
                            Return anytime, Just pay fee difference
                          </p>{" "}
                          <button className="text-[#ff0000]">Details</button>
                        </div>
                      </div>
                    </div>
                    <div className="text-center">
                      <button className="h-[40px] rounded-full py-2 px-4 text-white bg-gradient-to-r from-[#F1301E] to-[#FA4F2F] font-bold">
                        Call us to know more
                      </button>
                    </div>
                  </div>
                </div>
              </main>
            </div>

            <div className="my-12">
              <Specifications />
            </div>
            <div className="my-12">
              <CarFeatures />
            </div>
          </div>
          {/*  */}
          <div>
            <div className="lg:block hidden">
              <BookingDetailsCard />
            </div>
            {/* booking summary */}
            <div className="lg:block hidden">
              <main className="w-[504px] flex flex-col items-center bg-[#FAFAFA] py-10 my-6 rounded-md">
                <div className="w-[376px] h-[50px] bg-black text-white font-bold text-[20px] flex justify-center items-center rounded-xl">
                  <span className="text-center">Booking Summary</span>
                </div>
                <div className="m-auto my-5">
                  <span className="font-bold text-[24px]">
                    Maruti Swift 2024
                  </span>
                </div>
                <div className="m-auto mb-5">
                  <span className="font-normal text-[20px]">Daily Rental</span>
                </div>
                <div>
                  <div className="px-6 py-4">
                    <div className="flex justify-around gap-2 mb-4">
                      {["Weekly", "Monthly", "Quarterly", "Yearly"].map(
                        (option) => (
                          <button
                            key={option}
                            className={`py-2 px-4 ${selectedOption === option
                              ? "bg-[#ff0000] text-white"
                              : "text-gray-600 bg-[#F2F7F6]"
                              } rounded`}
                            onClick={() => handleOptionClick(option)}
                          >
                            {option}
                          </button>
                        )
                      )}
                    </div>
                    {selectedOption === "Monthly" && (
                      <div className="text-center mb-6 bg-[#E7E7E7] px-4 py-2 rounded-full drop-shadow-lg">
                        <p className="text-3xl font-semibold text-[#ff0000]">
                          ₹ 19,764/month
                        </p>
                        <p className="text-gray-500">
                          (Inclusive of insurance and maintenance)
                        </p>
                      </div>
                    )}
                    {selectedOption === "Weekly" && (
                      <div className="text-center mb-6 bg-[#E7E7E7] px-4 py-2 rounded-full drop-shadow-lg">
                        <p className="text-3xl font-semibold text-[#ff0000]">
                          ₹ 5,000/week
                        </p>
                        <p className="text-gray-500">
                          (Inclusive of insurance and maintenance)
                        </p>
                      </div>
                    )}
                    {selectedOption === "Quarterly" && (
                      <div className="text-center mb-6 bg-[#E7E7E7] px-4 py-2 rounded-full drop-shadow-lg">
                        <p className="text-3xl font-semibold text-[#ff0000]">
                          ₹ 50,000/quarter
                        </p>
                        <p className="text-gray-500">
                          (Inclusive of insurance and maintenance)
                        </p>
                      </div>
                    )}
                    {selectedOption === "Yearly" && (
                      <div className="text-center mb-6 bg-[#E7E7E7] px-4 py-2 rounded-full drop-shadow-lg">
                        <p className="text-3xl font-semibold text-[#ff0000]">
                          ₹ 2,00,000/year
                        </p>
                        <p className="text-gray-500">
                          (Inclusive of insurance and maintenance)
                        </p>
                      </div>
                    )}
                    <div className="mb-4 px-2">
                      <div className="flex justify-between  items-center mb-2">
                        <span className="font-semibold text-[20px] ">
                          Expected date of delivery
                        </span>
                        <button className="text-[#ff0000] flex flex-row gap-1 items-center text-[12px]">
                          Edit{" "}
                          <Image
                            src="/carDetails/pen.png"
                            width={10}
                            height={10}
                            alt="edit"
                          />
                        </button>
                      </div>
                      <p className="text-gray-700">Between 26th - 26th May</p>
                    </div>
                    <div className="mb-6 px-2">
                      <div className="flex justify-between  items-center mb-2">
                        <span className="font-semibold text-[20px]">
                          Place of delivery
                        </span>
                        <button className="text-[#ff0000] flex flex-row gap-1 items-center text-[12px]">
                          Edit{" "}
                          <Image
                            src="/carDetails/pen.png"
                            width={10}
                            height={10}
                            alt="edit"
                          />
                        </button>
                      </div>
                      <p className="text-gray-700">At your doorstep</p>
                    </div>
                    <div className="bg-white drop-shadow-lg p-4 rounded-lg mb-6 w-[439px]">
                      <div className="text-center mb-6">
                        <button className="w-[406px] h-[60px] py-2 px-4 border-[1px] border-[#ff0000] text-[#ff0000] rounded shadow-inner font-semibold">
                          Proceed to Check Eligibility
                        </button>
                      </div>
                      <div className="mb-0">
                        <div className="flex flex-row items-center justify-between w-full text-[16px] text-[#000] font-semibold">
                          <p className="">Extend anytime at normal prices</p>
                          <button className="text-[#ff0000]">Details</button>
                        </div>

                        <div className="flex flex-row items-center justify-between w-full text-[16px] text-[#000] font-semibold">
                          <p className=" ">
                            Return anytime, Just pay fee difference
                          </p>{" "}
                          <button className="text-[#ff0000]">Details</button>
                        </div>
                      </div>
                    </div>
                    <div className="text-center">
                      <button className=" w-[421px] h-[50px] rounded-full py-2 px-4 text-white bg-gradient-to-r from-[#F1301E] to-[#FA4F2F] font-bold">
                        Call us to know more
                      </button>
                    </div>
                  </div>
                </div>
              </main>
            </div>

            {/* booking summary */}
          </div>
        </div>
        <div className="mb-10">
          <ExtraCharges />
        </div>
        <div className="mb-10">
          <DescCar />
        </div>
        <div>
          <Video />
        </div>
        <div className="sm:mx-10">
          {/* <InterestedSlider/> */}
          <FleetsSlider />
        </div>
      </div>
    </>
  );
};
export default Subscription;
