"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useEffect, useCallback } from "react";
import { getBreadcrumbs } from "../../utils/breadcrumbs";
import Image from "next/image";
import CardListingCards from "@/app/components/card-listing-cards/card-listing-cards";
import ThemeButton from "../../components/theme-button/theme-button";
import CardListingBanner from "@/app/components/car-listing-banner/card-listing-banner";
import useVehicles from "../../../../networkRequests/hooks/useVehicles";
import { useImmer } from "use-immer";
import "../../../../networkRequests/types/type";
import axios from "axios";
import { searchVehicle } from "../../../../networkRequests/hooks/api";
import ModifySearch from "@/app/components/modify-search/modify-search";

const CarListing = () => {
  const pathname = usePathname();
  const breadcrumbs = getBreadcrumbs(pathname);

  const [currentPage, setCurrentPage] = useState(2);

  const totalPages = 5;

  const handleClick = (page: any) => {
    setCurrentPage(page);
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // const { vehicles, loading, error } = useVehicles();
  // console.log("vehicles", vehicles);

  const [carData, setCarData] = useState<any>();

  const getCarDetails = useCallback(async () => {
    const getSearchCarData = await searchVehicle();
    console.log(getSearchCarData, "mmmmmmmmmmm");
    setCarData(getSearchCarData?.data?.vehicles);
  }, []);
  useEffect(() => {
    getCarDetails();
  }, []);
  console.log(carData, "search api called");

  const [pickupLocation, setPickupLocation] = useState<any>();
  const [dropoffLocation, setDropoffLocation] = useState<any>();
  const [pickUpDate, setPickUpDate] = useState<any>();
  const [dropOffDate, setDropOffDate] = useState<any>();
  const [bookingOptions, setBookingOptions] = useState<any>();
  const [driverType, setDriverType] = useState<any>();

   console.log(dropoffLocation,pickupLocation,pickUpDate,dropOffDate,bookingOptions,driverType,"hurraayy"); 
  React.useEffect(() => {
    const pickupLocation = localStorage.getItem("pickupLocation");
    const dropoffLocation = localStorage.getItem("dropOffLocation");
    const pickUpDate = localStorage.getItem("pickupDate");
    const dropOffDate = localStorage.getItem("dropOffDate");
    const bookingOptions = localStorage.getItem("tabValue");
    const driverType = localStorage.getItem("radioToggle");
    setPickupLocation(pickupLocation);
    setDropoffLocation(dropoffLocation);
    setPickUpDate(pickUpDate);
    setDropOffDate(dropOffDate);
    setBookingOptions(bookingOptions);
    setDriverType(driverType);
  }, []);
  console.log(
    pickupLocation,
    dropoffLocation,
    pickUpDate,
    dropOffDate,
    bookingOptions,
    driverType,
    "state"
  );

  // useEffect(() => {
  //   if (vehicles) {
  //     setCarData(vehicles?.response as Vehicle[]);
  //   }
  // }, [vehicles, setCarData]);

  // console.log("carData", carData);
  // const [data , setData] = React.useState()

  // const fetchData = React.useCallback(async()=>{
  //   const res = await axios.get("https://cabmeapi.epicglobal.co.in/api/cabme/vehicles")
  //   console.log("data shown",{res})

  //   setData(res?.data.response)

  // },[])

  // React.useEffect(()=>{
  //   fetchData()
  // },[])

  // console.log("data",{data})

  // getting location information from localstorage

  //  console.log(object);

  //  console.log(pickupLocation,dropoffLocation,"locations");

  return (
    <div className="max-w-[1400px] m-auto">
      <div
        className="sm:hidden xs:flex p-4 justify-between items-center bg-[url('/png/red-bg.png')] relative"
        style={{ backgroundSize: "100% 100%" }}
      >
        <div>&larr;</div>
        <div>
          <div className="flex gap-4 xs:mb-0 mb-2">
            <strong>Delhi-NCR</strong>
            <ThemeButton
              text="Edit"
              className="!bg-transparent !text-primary !px-0 !py-0"
              editIcon={true}
            />
          </div>
          <div className="flex gap-4 text-sm">
            <div>
              <strong>23 May</strong>
              <span> 4:00 AM</span>
              <span> Thu</span>
            </div>
            <div>
              <strong>23 May</strong>
              <span> 4:00 AM</span>
              <span> Thu</span>
            </div>
          </div>
        </div>
        <div className="xs:static absolute right-2 top-6">
          <Image
            src={"/svg/arrow-black.svg"}
            alt="arrow"
            width={18}
            height={18}
            className="cursor-pointer"
          />
        </div>
      </div>
      <main className=" xs:py-8 px-4">
        {/* breadcrumbs */}
        <div className="sm:block hidden text-[#5F5D5D]">
          <nav aria-label="breadcrumb">
            <ol className="flex flex-row">
              {breadcrumbs.map((breadcrumb: any, index: number) => (
                <li key={index}>
                  {"/"}
                  <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
                </li>
              ))}
            </ol>
          </nav>
        </div>
        {/* breadcrumbs */}
        {/* heading  */}
        <div className="sm:block  m-auto mt-5 flex justify-center items-center text-center">
          <h1 className="sm:text-[48px] text-2xl font-bold text-[#FF0000]">Car <span className="text-black"> Listing</span></h1>
        </div>
        {/* heading  */}


        {/* modify search section */}
        <div className="sm:block hidden">
          <ModifySearch />
        </div>

        {/* filters */}
        <div className=" listing-filter sm:my-14 my-4 flex sm:flex-row flex-col flex-col-reverse items-center text-[#5F5D5D]  justify-between">
          <div className="flex justify-between w-full sm:w-auto mt-4">
            <div className="sm:text-[16px] text-xs">
              Showing 1-8 of 10 Results
            </div>
            <select
              name="filter"
              id="filter"
              className="sm:hidden block shadow"
            >
              <option value="Filters">Filters</option>
            </select>
          </div>
          {/*  */}
          <div className="xs:flex flex-row items-center gap-4">
            <div className="text-sm">Show:</div>
            <div className="flex gap-2">
              <div>
                <select
                  name=""
                  id=""
                  className="bg-[#fff] border-[#DDD9D9] border-[2px] rounded-md sm:p-3 p-[4px] sm:w-[78px] text-sm"
                >
                  <option value="5">5</option>
                </select>
              </div>
              <div>
                <select
                  name=""
                  id=""
                  className="bg-[#fff] border-[#DDD9D9] border-[2px] rounded-md sm:p-3 p-[4px] sm:w-[154px] text-sm"
                >
                  <option value="low-to-high">Low to High</option>
                </select>
              </div>
              <div>
                <select
                  name=""
                  id=""
                  className="bg-[#fff] border-[#DDD9D9] border-[2px] rounded-md sm:p-3 p-[4px] sm:w-[315px] text-sm"
                >
                  <option value="popular">Popular</option>
                </select>
              </div>
            </div>
          </div>
          {/*  */}
          <div className="sm:flex hidden flex-row items-center gap-2">
            <div className="cursor-pointer flex-none">
              <Image
                src="/carListing/filterIconRed.png"
                width={42}
                height={42}
                alt="Filter Icon"
              />
            </div>
            <div className="cursor-pointer flex-none">
              <Image
                src="/carListing/filterIconGrey.png"
                width={42}
                height={42}
                alt="Filter Icon"
              />
            </div>
          </div>
        </div>
        {/* filters */}

        <section className="sm:flex flex-row items-start justify-between gap-10">
          <aside className="basis-1 w-[300px] h-full shadow-filter-shadow p-8 sm:block hidden">
            <div>
              <h1 className="text-center font-bold">
                What Are You Looking For
              </h1>
            </div>
            <div className="relative flex flex-row items-center !justify-center w-[234px] mt-6">
              <input
                type="text"
                placeholder="Search"
                className="w-[234px] h-[45px] rounded-md pl-3  border-[#DDD9D9] border-2 outline-0"
              />
              <Image
                src="/carListing/search.png"
                width={20}
                height={20}
                alt="bluetooth"
                className="absolute right-2 top-3 cursor-pointer"
              />
            </div>
            <hr className="border-[1px] my-6" />

            <div>
              <div className="flex flex-row items-center justify-between">
                <span className="font-bold">Car Category</span>
                <Image
                  src="/carListing/blackArrow.svg"
                  width={20}
                  height={20}
                  alt="bluetooth"
                />
              </div>
              <div className="h-[208px] mt-4 overflow-auto scrollbar scroll-smooth	">
                {carCategory?.map((item, index) => {
                  return (
                    <div className="flex flex-row gap-2 mb-4" key={index}>
                      {index === 0 ? (
                        <input
                          type="checkbox"
                          className="accent-[#ff0000] p-2 size-5"
                          defaultChecked
                        />
                      ) : (
                        <input
                          type="checkbox"
                          className="accent-[#ff0000] p-2 size-5"
                        />
                      )}
                      <span className="text-sm text-[#555151]">
                        {item?.category}
                      </span>
                    </div>
                  );
                })}
              </div>
              <hr className="my-5" />
            </div>
            {/*  */}
            <div>
              <div className="flex flex-row items-center justify-between">
                <span className="font-bold">Car Type</span>
                <Image
                  src="/carListing/blackArrow.svg"
                  width={20}
                  height={20}
                  alt="bluetooth"
                />
              </div>
              <div className="h-[208px] overflow-auto scrollbar scroll-smooth mt-4">
                {carType?.map((item, index) => {
                  return (
                    <div className="flex flex-row gap-2 mb-4" key={index}>
                      {index === 0 ? (
                        <input
                          type="checkbox"
                          className="accent-[#ff0000] p-2 size-5"
                          defaultChecked
                        />
                      ) : (
                        <input
                          type="checkbox"
                          className="accent-[#ff0000] p-2 size-5"
                        />
                      )}
                      <span className="text-sm text-[#555151]">
                        {item?.type}
                      </span>
                    </div>
                  );
                })}
              </div>

              <hr className="my-5" />
            </div>
            {/*  */}
            <div>
              <div className="flex flex-row items-center justify-between">
                <span className="font-bold">Capacity</span>
                <Image
                  src="/carListing/blackArrow.svg"
                  width={20}
                  height={20}
                  alt="bluetooth"
                />
              </div>
              <div className="h-[208px] overflow-auto scrollbar scroll-smooth mt-4">
                {carCapacity?.map((item, index) => {
                  return (
                    <div className="flex flex-row gap-2 mb-4" key={index}>
                      {index === 0 ? (
                        <input
                          type="checkbox"
                          className="accent-[#ff0000] p-2 size-5"
                          defaultChecked
                        />
                      ) : (
                        <input
                          type="checkbox"
                          className="accent-[#ff0000] p-2 size-5"
                        />
                      )}
                      <span className="text-sm text-[#555151]">
                        {item?.capacity}
                      </span>
                    </div>
                  );
                })}
              </div>
              <hr className="my-5" />
            </div>
            {/*  */}
            <div>
              <div className="flex flex-row items-center justify-between">
                <span className="font-bold">Price Range</span>
                <Image
                  src="/carListing/blackArrow.svg"
                  width={20}
                  height={20}
                  alt="bluetooth"
                />
              </div>
              <div>
                <input
                  type="range"
                  name=""
                  min="10000"
                  max="50000"
                  className="w-full my-3 accent-[#ff0000]"
                  id=""
                />
                <div className="flex flex-row gap-4">
                  <div className="flex flex-col">
                    <span>MIN</span>
                    <select
                      name=""
                      id=""
                      className="bg-[#fff] border-[#DDD9D9]  p-1 w-[100px] h-[42px] border-b-2 outline-0"
                    >
                      <option value="10,000">₹ 10,000</option>
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <span>MAX</span>
                    <select
                      name=""
                      id=""
                      className="bg-[#fff] border-[#DDD9D9] p-1 w-[100px] h-[42px] border-b-2 outline-0"
                    >
                      <option value="50,000">₹ 50,000</option>
                    </select>
                  </div>
                </div>
              </div>
              <hr className="my-5" />
            </div>
            {/*  */}
            <div>
              <div className="flex flex-row items-center justify-between">
                <span className="font-bold">Transmission Type</span>
                <Image
                  src="/carListing/blackArrow.svg"
                  width={20}
                  height={20}
                  alt="bluetooth"
                />
              </div>
              <div className="h-[100px] overflow-auto scrollbar scroll-smooth	">
                <div className="flex flex-row gap-2 my-4">
                  <input
                    type="checkbox"
                    className="accent-[#ff0000] p-2 size-5"
                    defaultChecked
                  />
                  <span className="text-sm text-[#555151]">Automatic</span>
                </div>
                <div className="flex flex-row gap-2 my-4">
                  <input
                    type="checkbox"
                    className="accent-[#ff0000] p-2 size-5"
                  />
                  <span className="text-sm text-[#555151]">Manual</span>
                </div>
              </div>
              <hr className="my-5" />
            </div>
            {/*  */}
            <div>
              <div className="flex flex-row items-center justify-between">
                <span className="font-bold">Fuel Type</span>
                <Image
                  src="/carListing/blackArrow.svg"
                  width={20}
                  height={20}
                  alt="bluetooth"
                />
              </div>
              <div className="h-[188px] overflow-auto scrollbar scroll-smooth	">
                <div className="flex flex-row gap-2 my-4">
                  <input
                    type="checkbox"
                    className="accent-[#ff0000] p-2 size-5"
                    defaultChecked
                  />
                  <span className="text-sm text-[#555151]">Petrol</span>
                </div>
                <div className="flex flex-row gap-2 my-4">
                  <input
                    type="checkbox"
                    className="accent-[#ff0000] p-2 size-5"
                  />
                  <span className="text-sm text-[#555151]">CNG+Petrol</span>
                </div>
                <div className="flex flex-row gap-2 my-4">
                  <input
                    type="checkbox"
                    className="accent-[#ff0000] p-2 size-5"
                  />
                  <span className="text-sm text-[#555151]">Diesel</span>
                </div>
                <div className="flex flex-row gap-2 my-4">
                  <input
                    type="checkbox"
                    className="accent-[#ff0000] p-2 size-5"
                  />
                  <span className="text-sm text-[#555151]">Electric</span>
                </div>
              </div>
              <hr className="my-5" />
            </div>
            {/*  */}
            <div>
              <div className="flex flex-row items-center justify-between">
                <span className="font-bold">Conditions</span>
                <Image
                  src="/carListing/blackArrow.svg"
                  width={20}
                  height={20}
                  alt="bluetooth"
                />
              </div>
              <div className="h-[168px] overflow-auto scrollbar scroll-smooth	">
                <div className="flex flex-row gap-2 my-4">
                  <input
                    type="checkbox"
                    className="accent-[#ff0000] p-2 size-5"
                    defaultChecked
                  />
                  <span className="text-sm text-[#555151]">Used</span>
                </div>
                <div className="flex flex-row gap-2 my-4">
                  <input
                    type="checkbox"
                    className="accent-[#ff0000] p-2 size-5"
                  />
                  <span className="text-sm text-[#555151]">Driver</span>
                </div>
                <div className="flex flex-row gap-2 my-4">
                  <input
                    type="checkbox"
                    className="accent-[#ff0000] p-2 size-5"
                  />
                  <span className="text-sm text-[#555151]">Non-Driven</span>
                </div>
                <div className="flex flex-row gap-2 my-4">
                  <input
                    type="checkbox"
                    className="accent-[#ff0000] p-2 size-5"
                  />
                  <span className="text-sm text-[#555151]">Subscription</span>
                </div>
              </div>
              <hr className="my-5" />
            </div>
            {/*  */}
            <div>
              <div className="flex flex-row items-center justify-between">
                <span className="font-bold">Others</span>
                <Image
                  src="/carListing/blackArrow.svg"
                  width={20}
                  height={20}
                  alt="bluetooth"
                />
              </div>
              <div className="h-[158px] overflow-auto scrollbar scroll-smooth mt-4">
                {otherFeatures?.map((item, index) => {
                  return (
                    <div className="flex flex-row gap-2 mb-4" key={index}>
                      {index === 0 ? (
                        <input
                          type="checkbox"
                          className="accent-[#ff0000] p-2 size-5"
                          defaultChecked
                        />
                      ) : (
                        <input
                          type="checkbox"
                          className="accent-[#ff0000] p-2 size-5"
                        />
                      )}
                      <span className="text-sm text-[#555151]">
                        {item?.feature}
                      </span>
                    </div>
                  );
                })}
              </div>
              <hr className="my-5" />
            </div>
            {/*  */}

            <div>
              <ThemeButton
                text="Filter Results"
                className=" sm:px-6 !px-2 sm:text-sm text-xs h-[50px] flex flex-row justify-center !text-center !text-[14px] w-[227px]"
              />
            </div>
            <div>
              <ThemeButton
                text="Reset Filter"
                className="font-semibold sm:px-6 !px-2 sm:text-sm text-xs h-[50px] flex flex-row justify-center !text-center !text-[14px] w-[227px] !text-[#ff0000] !bg-[#fff]"
              />
            </div>
          </aside>
          <div className="basis-2/3">
            {carData?.map((item: Vehicle, index: number) => {
              var dateOnly = "";
              {
                const date = item?.bookingDate;
                const dateObject = new Date(date);
                //  dateOnly = dateObject.toISOString().split("T")[0];

                if (!isNaN(dateObject.getTime())) {
                  dateOnly = dateObject.toISOString().split("T")[0];
                  console.log(dateOnly, "date only");
                } else {
                  console.error("Invalid date object created:", dateObject);
                }
              }
              {
                dateOnly === pickUpDate
                  ? console.log("matched")
                  : console.log("doesnt matched");
              }
              return (
                <>
                  {item?.available === true && (
                    <>
                      {pickupLocation === item?.city && (
                            <CardListingCards key={index} data={item} />

                        // <>
                        //   {dateOnly === pickUpDate && (
                        //     <CardListingCards key={index} data={item} />
                        //   )}
                        // </>
                      )}
                    </>
                  )}
                </>
              );
            })}

            <CardListingBanner />
          </div>
        </section>
        <div className="">
          <div className="flex items-center justify-center space-x-2 mt-4">
            <button
              className={`px-4 py-2 border rounded-md whitespace-nowrap ${
                currentPage === 1 ? "text-gray-400" : "text-gray-700"
              }`}
              onClick={handlePrev}
              disabled={currentPage === 1}
            >
              &larr; Prev
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                className={`w-10 h-10 border rounded-md ${
                  currentPage === index + 1
                    ? "bg-primary-color text-white"
                    : "bg-white text-gray-700"
                }`}
                onClick={() => handleClick(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button
              className={`px-4 py-2 border rounded-md whitespace-nowrap ${
                currentPage === totalPages ? "text-gray-400" : "text-gray-700"
              }`}
              onClick={handleNext}
              disabled={currentPage === totalPages}
            >
              Next &rarr;
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CarListing;
const carCategory = [
  {
    category: "Tesla",
  },
  {
    category: "Ford",
  },
  {
    category: "Tata Motors",
  },
  {
    category: "Audi",
  },
  {
    category: "Kia",
  },
  {
    category: "Hyundai",
  },
];
const carType = [
  {
    type: "Sedan",
  },
  {
    type: "Wagon",
  },
  {
    type: "Pickup",
  },
  {
    type: "Convertible",
  },
  {
    type: "SUV",
  },
  {
    type: "Hyundai",
  },
];
const carCapacity = [
  {
    capacity: "1 - 4",
  },
  {
    capacity: "1 - 6",
  },
  {
    capacity: "4 - 6",
  },
  {
    capacity: "4 - 8",
  },
  {
    capacity: "8+",
  },
  {
    capacity: "20",
  },
];
const otherFeatures = [
  {
    feature: "Bluetooth",
  },
  {
    feature: "GPS Navigation",
  },
  {
    feature: "Boot Space",
  },
  {
    feature: "Air Conditioner",
  },
];
