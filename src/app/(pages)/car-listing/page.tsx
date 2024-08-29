"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useEffect, useCallback } from "react";
import { getBreadcrumbs } from "../../utils/breadcrumbs";
import Image from "next/image";
import CardListingCards from "@/app/components/card-listing-cards/card-listing-cards";
import ThemeButton from "../../components/theme-button/theme-button";
import CardListingBanner from "@/app/components/car-listing-banner/card-listing-banner";
import "../../../../networkRequests/types/type";
import { searchVehicle, searchVehicleNew } from "../../../../networkRequests/hooks/api";
import ModifySearch from "@/app/components/modify-search/modify-search";
import BlinkerLoader from "@/app/components/blinker-loader/blinkerLoader";
import moment from "moment";

interface VehicleSearchPayload {
  city: string | null;
  dropOffDateTime: string | null;
  pickUpDateTime: string | null;
  bookingType: string | null;
  toCity: string | null;
}



const ITEMS_PER_PAGE = 8;
const CarListing = () => {
  const pathname = usePathname();
  const breadcrumbs = getBreadcrumbs(pathname);
  // const [carData, setCarData] = useState<any>();
  const [showFilter, setShowFilter] = useState(false);
  // const [loader, setLoader] = useState(false);


  const [locationData, setLocationData] = useState<VehicleSearchPayload>({
    city: null,
    pickUpDateTime: null,
    dropOffDateTime: null,
    bookingType: null,
    toCity: "",
  });
  const [carData, setCarData] = useState<any>(null); // Replace with appropriate type
  const [loader, setLoader] = useState<boolean>(false);

  const isValidDate = (dateString: string) => {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  };

  useEffect(() => {
    const location = localStorage.getItem("pickupLocation");
    const pickupDate = localStorage.getItem("nonFormatedPickupDate");
    const dropLocation = localStorage.getItem("dropOffLocation");
    const tabValue = localStorage.getItem("tabValue");
    const dropDate = localStorage.getItem("nonFormatedDropoffDate");

    console.log("Location:", location);
    console.log("Pickup Date:", pickupDate);
    console.log("Dropoff Date:", dropDate);

    setLocationData({
      city: location,
      pickUpDateTime: pickupDate,
      dropOffDateTime: dropDate,
      toCity: dropLocation,
      bookingType: tabValue == "Self-Driving" ? "Self Drive" : "" ,
    });
  }, []);



  const getCarDetails = useCallback(async () => {
    if (locationData.pickUpDateTime && locationData.dropOffDateTime) {
      console.log("Payload being sent:", locationData);
      setLoader(true);
      const getSearchCarData = await searchVehicleNew(locationData);
      console.log(getSearchCarData, "Car search API response");
      setCarData(getSearchCarData?.data?.availableVehicles);
      setLoader(false);
    } else {
      console.error("Invalid dates provided in payload", locationData);
    }
  }, [locationData]);

  useEffect(() => {
    if (locationData.city && locationData.pickUpDateTime && locationData.dropOffDateTime) {
      getCarDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationData]);


  const [pickupLocation, setPickupLocation] = useState<any>();
  const [dropoffLocation, setDropoffLocation] = useState<any>();
  const [pickUpDate, setPickUpDate] = useState<any>();
  const [dropOffDate, setDropOffDate] = useState<any>();
  const [bookingOptions, setBookingOptions] = useState<any>();
  const [driverType, setDriverType] = useState<any>();

  console.log(
    dropoffLocation,
    pickupLocation,
    pickUpDate,
    dropOffDate,
    bookingOptions,
    driverType,
    "hurraayy"
  );
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

  const [showCarCategory, setShowCarCategory] = useState(false);
  const [showCarType, setShowCarType] = useState(false);
  const [showCapacity, setShowCapacity] = useState(false);
  const [showPriceRange, setShowPriceRange] = useState(false);
  const [showTransmission, setShowTransmission] = useState(false);
  const [showFuelType, setShowFuelType] = useState(false);
  const [showOthers, setShowOther] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<any[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<any>([]);
  const [selectedCapacity, setSelectedCapacity] = useState<any>([]);
  const [selectedTransmission, setSelectTransmission] = useState<any>([]);
  const [selectedFuelType, setSelectedFuelType] = useState<any>([]);
  const [selectedOthers, setSelectedOthers] = useState<any>([]);
  const [priceRange, setPriceRange] = useState<any>(50000);

  const handleCategoryCheckboxChange = (category: any) => {
    setSelectedCategories((prevSelected) => {
      if (prevSelected.includes(category)) {
        return prevSelected.filter((item) => item !== category);
      } else {
        return [...prevSelected, category];
      }
    });
  };

  const handleTypeCheckboxChange = (type: any) => {
    setSelectedTypes((prevSelected: any) => {
      if (prevSelected.includes(type)) {
        return prevSelected.filter((item: any) => item !== type);
      } else {
        return [...prevSelected, type];
      }
    });
  };

  const handleCapacityCheckboxChange = (capacity: any) => {
    setSelectedCapacity((prevSelected: any) => {
      if (prevSelected.includes(capacity)) {
        return prevSelected.filter((item: any) => item !== capacity);
      } else {
        return [...prevSelected, capacity];
      }
    });
  };

  const handleTransmissionCheckboxChange = (transmission: any) => {
    setSelectTransmission((prevSelected: any) => {
      if (prevSelected.includes(transmission)) {
        return prevSelected.filter((item: any) => item !== transmission);
      } else {
        return [...prevSelected, transmission];
      }
    });
  };

  const handleFuelTypeCheckboxChange = (type: any) => {
    setSelectedFuelType((prevState: any) => {
      if (prevState.includes(type)) {
        return prevState.filter((item: any) => item !== type);
      } else {
        return [...prevState, type];
      }
    });
  };

  const handleOthersCheckboxChange = (type: any) => {
    console.log(type, "selectedTypes");
    setSelectedOthers((prevState: any) => {
      if (prevState.includes(type)) {
        return prevState.filter((item: any) => item !== type);
      } else {
        return [...prevState, type];
      }
    });
  };

  const handleSearchChange = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const filteredItems = carData?.filter((item: any) =>
    item?.carName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log(selectedOthers, "selectedTypes");

  const handleFilterReset = (e: any) => {
    e.preventDefault();
    setSelectedCategories([]);
    setSelectedTypes([]);
    setSelectedCapacity([]);
    setSelectTransmission([]);
    setSelectedFuelType([]);
    setSelectedOthers([]);
    setShowCarCategory(false);
    setShowCarType(false);
    setShowCapacity(false);
    setShowPriceRange(false);
    setShowTransmission(false);
    setShowFuelType(false);
    setShowOther(false);
  };

  const [currentPage, setCurrentPage] = useState(1);

  // Filter items based on isMatchingCriteria
  const matchingItems = filteredItems?.filter((item: { bookingDate: string | number | Date; available: any; city: any; brandName: any; vehicleSpecifications: { body: any; transmission: any; fuelType: any; }; seatingCapacity: any; carFeatures: { [x: string]: boolean; }; }) => {
    const dateObject = item.bookingDate ? new Date(item.bookingDate) : null;
    if (dateObject && isNaN(dateObject.getTime())) {
      console.error('Invalid date object created:', dateObject);
      return false;
    }

    const isMatchingCriteria =
      item?.available &&
      pickupLocation === item?.city &&
      (selectedCategories.length === 0 ||
        selectedCategories.some((category) => item?.brandName === category)) &&
      (selectedTypes.length === 0 ||
        selectedTypes.some((type: any) => item?.vehicleSpecifications?.body === type)) &&
      (selectedCapacity.length === 0 ||
        selectedCapacity.some((capacity: any) => item?.seatingCapacity === capacity)) &&
      (selectedTransmission.length === 0 ||
        selectedTransmission.some((trans: any) => item?.vehicleSpecifications.transmission === trans)) &&
      (selectedFuelType.length === 0 ||
        selectedFuelType.some((type: any) => item?.vehicleSpecifications.fuelType === type)) &&
      (selectedOthers.length === 0 ||
        selectedOthers.every((feature: string | number) => item?.carFeatures[feature] === true));

    return isMatchingCriteria;
  });

  // Calculate total pages based on matching items
  const totalPages = Math.ceil(matchingItems?.length / ITEMS_PER_PAGE);

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedItems = matchingItems?.slice(startIndex, endIndex);

  let cardCount = 0;

  return (
    <div className="max-w-[1450px] m-auto">
      {
        loader && <BlinkerLoader />
      }
      {/* <div
        className="sm:hidden xs:flex p-4 justify-between items-center bg-[url('/png/red-bg.png')] relative"
        style={{ backgroundSize: "100% 100%" }}
      >
        <div>&larr;</div>
        <div>
          <div className="flex gap-4 xs:mb-0 mb-2">
            <strong>Delhi-NCR</strong>
            <ThemeButton
              text="Edit"
              className="!bg-transparent text-primary text-sm !px-0 !py-0"
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
      </div> */}
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
          <h1 className="sm:text-[48px] text-2xl font-bold text-[#FF0000]">
            Car <span className="text-black"> Listing</span>
          </h1>
        </div>
        {/* heading  */}

        {/* modify search section */}
        <div className="sm:block">
          <ModifySearch />
        </div>

        {/* filters */}
        <div className=" listing-filter hidden sm:my-14 my-4 lg:flex sm:flex-row flex-col flex-col-reverse items-center text-[#5F5D5D]  justify-between">
          {/* <div className="sm:flex hidden  w-full sm:w-auto mt-4 lg:mb-0 mb-4 lg:justify-start justify-center">
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
          </div> */}
          {/*  */}
          <div className="flex justify-between gap-2">
            {/* <div className="xs:flex flex-row items-center gap-4">
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
            </div> */}
            {/*  */}
            {/* <div className="sm:flex hidden flex-row items-center gap-2">
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
            </div> */}
          </div>
          {/* for mobile  */}
          {/* <div className="sm:hidden flex  w-full sm:w-auto mt-4 lg:mb-0 mb-4 justify-between px-4">
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
          </div> */}
        </div>
        {/* filters */}


        <section className="flex  sm:flex-col  sm:m-auto xl:flex-row flex-col items-start xl:justify-between justify-center gap-10">
          <div className="md:mx-[5%] lg:mx-0 !sticky top-16 z-20 xl:hidden ">
            <div className=" cursor-pointer border rounded-lg flex gap-2 w-fit p-2 bg-white " onClick={() => setShowFilter(!showFilter)}>
              <Image className="mb-[-6px]" src="/svg/filter.svg" alt="filter" width={16} height={12} />
              <span className="text-xs">Filters</span>
            </div>
            {
              showFilter ?
                <aside className="basis-1 w-[300px] h-full shadow-filter-shadow p-8  sticky left-0 top-24 bg-white z-20 xl:hidden ">
                  <div>
                    <h1 className="text-center font-bold">
                      What Are You Looking For
                    </h1>
                  </div>
                  <div className="relative flex flex-row items-center !justify-center w-[234px] mt-6 bg-white">
                    <input
                      type="text"
                      placeholder="Search"
                      value={searchTerm}
                      onChange={handleSearchChange}
                      className="w-[234px] h-[45px] rounded-md pl-3 border-[#DDD9D9] border-2 outline-0"
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
                    <div
                      onClick={() => {
                        setShowCarCategory(!showCarCategory);
                      }}
                      className="flex flex-row items-center justify-between cursor-pointer"
                    >
                      <span className="font-bold">Car Brand</span>
                      <Image
                        src="/carListing/blackArrow.svg"
                        width={20}
                        height={20}
                        alt="bluetooth"
                      />
                    </div>
                    {showCarCategory ? (
                      <div className="h-auto mt-4 overflow-auto scrollbar scroll-smooth	">
                        {carCategory?.map((item: any, index: number) => {
                          const isChecked = selectedCategories.includes(
                            item?.category
                          );
                          return (
                            <div className="flex flex-row gap-2 mb-4" key={index}>
                              <input
                                type="checkbox"
                                className="accent-[#ff0000] p-2 size-5 cursor-pointer cursor-pointer"
                                checked={isChecked}
                                onChange={() =>
                                  handleCategoryCheckboxChange(item?.category)
                                }
                              />
                              <span className="text-sm text-[#555151]">
                                {item?.category}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      ""
                    )}

                    <hr className="my-5" />
                  </div>
                  {/*  */}
                  <div>
                    <div
                      onClick={() => setShowCarType(!showCarType)}
                      className="flex flex-row items-center justify-between cursor-pointer"
                    >
                      <span className="font-bold">Car Type</span>
                      <Image
                        src="/carListing/blackArrow.svg"
                        width={20}
                        height={20}
                        alt="bluetooth"
                      />
                    </div>
                    {showCarType ? (
                      <div className="h-auto overflow-auto scrollbar scroll-smooth mt-4">
                        {carType.map((item, index) => {
                          const isChecked = selectedTypes.includes(item.type);
                          return (
                            <div className="flex flex-row gap-2 mb-4" key={index}>
                              <input
                                type="checkbox"
                                className="accent-[#ff0000] p-2 size-5 cursor-pointer"
                                checked={isChecked}
                                onChange={() => handleTypeCheckboxChange(item.type)}
                              />
                              <span className="text-sm text-[#555151]">
                                {item.type}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      ""
                    )}

                    <hr className="my-5" />
                  </div>
                  {/*  */}
                  <div>
                    <div
                      onClick={() => setShowCapacity(!showCapacity)}
                      className="flex flex-row items-center justify-between cursor-pointer"
                    >
                      <span className="font-bold">Passenger Capacity</span>
                      <Image
                        src="/carListing/blackArrow.svg"
                        width={20}
                        height={20}
                        alt="bluetooth"
                      />
                    </div>
                    {showCapacity ? (
                      <div className="h-auto overflow-auto scrollbar scroll-smooth mt-4">
                        {carCapacity?.map((item, index) => {
                          const isChecked = selectedCapacity.includes(item.capacity);
                          return (
                            <div className="flex flex-row gap-2 mb-4" key={index}>
                              <input
                                type="checkbox"
                                className="accent-[#ff0000] p-2 size-5 cursor-pointer"
                                checked={isChecked}
                                onChange={() =>
                                  handleCapacityCheckboxChange(item?.capacity)
                                }
                              />
                              <span className="text-sm text-[#555151]">
                                {item?.capacity}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      ""
                    )}

                    <hr className="my-5" />
                  </div>
                  {/*  */}
                  <div>
                    <div
                      onClick={() => setShowPriceRange(!showPriceRange)}
                      className="flex flex-row items-center justify-between cursor-pointer"
                    >
                      <span className="font-bold">Price Range</span>
                      <Image
                        src="/carListing/blackArrow.svg"
                        width={20}
                        height={20}
                        alt="bluetooth"
                      />
                    </div>
                    {showPriceRange ? (
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
                      </div>)

                      :
                      ""
                    }

                    <hr className="my-5" />
                  </div>
                  {/*  */}
                  <div>
                    <div
                      onClick={() => setShowTransmission(!showTransmission)}
                      className="flex flex-row items-center justify-between cursor-pointer"
                    >
                      <span className="font-bold">Transmission Type</span>
                      <Image
                        src="/carListing/blackArrow.svg"
                        width={20}
                        height={20}
                        alt="bluetooth"
                      />
                    </div>
                    {showTransmission ? (
                      <div className="h-[100px] overflow-auto scrollbar scroll-smooth	">
                        {Transmissions.map((item: any, index: any) => {
                          const isChecked = selectedTransmission.includes(item.trans);
                          return (
                            <div className="flex flex-row gap-2 my-4" key={index}>
                              <input
                                type="checkbox"
                                className="accent-[#ff0000] p-2 size-5 cursor-pointer"
                                checked={isChecked}
                                onChange={() =>
                                  handleTransmissionCheckboxChange(item?.trans)
                                }
                              />
                              <span className="text-sm text-[#555151]">
                                {item?.trans}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      ""
                    )}

                    <hr className="my-5" />
                  </div>
                  {/*  */}
                  <div>
                    <div
                      onClick={() => setShowFuelType(!showFuelType)}
                      className="flex flex-row items-center justify-between cursor-pointer"
                    >
                      <span className="font-bold">Fuel Type</span>
                      <Image
                        src="/carListing/blackArrow.svg"
                        width={20}
                        height={20}
                        alt="bluetooth"
                      />
                    </div>
                    {showFuelType ? (
                      <div className="h-[188px] overflow-auto scrollbar scroll-smooth	">
                        {FuelType.map((item, index) => {
                          const isChecked = selectedFuelType.includes(item.type);
                          return (
                            <div className="flex flex-row gap-2 my-4" key={index}>
                              <input
                                type="checkbox"
                                className="accent-[#ff0000] p-2 size-5 cursor-pointer"
                                checked={isChecked}
                                onChange={() =>
                                  handleFuelTypeCheckboxChange(item?.type)
                                }
                              />
                              <span className="text-sm text-[#555151]">
                                {item.type}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      ""
                    )}

                    <hr className="my-5" />
                  </div>
                  {/*  */}
                  {/* <div>
            <div className="flex flex-row items-center justify-between cursor-pointer">
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
                  className="accent-[#ff0000] p-2 size-5 cursor-pointer"
                  defaultChecked
                />
                <span className="text-sm text-[#555151]">Used</span>
              </div>
              <div className="flex flex-row gap-2 my-4">
                <input
                  type="checkbox"
                  className="accent-[#ff0000] p-2 size-5 cursor-pointer"
                />
                <span className="text-sm text-[#555151]">Driver</span>
              </div>
              <div className="flex flex-row gap-2 my-4">
                <input
                  type="checkbox"
                  className="accent-[#ff0000] p-2 size-5 cursor-pointer"
                />
                <span className="text-sm text-[#555151]">Non-Driven</span>
              </div>
              <div className="flex flex-row gap-2 my-4">
                <input
                  type="checkbox"
                  className="accent-[#ff0000] p-2 size-5 cursor-pointer"
                />
                <span className="text-sm text-[#555151]">Subscription</span>
              </div>
            </div>
            <hr className="my-5" />
          </div> */}
                  {/*  */}
                  {/* <div>
            <div
              onClick={() => setShowOther(!showOthers)}
              className="flex flex-row items-center justify-between cursor-pointer"
            >
              <span className="font-bold">Others</span>
              <Image
                src="/carListing/blackArrow.svg"
                width={20}
                height={20}
                alt="bluetooth"
              />
            </div>
            {showOthers ? (
              <div className="h-[158px] overflow-auto scrollbar scroll-smooth mt-4">
                {otherFeatures?.map((item, index) => {
                  const isChecked = selectedOthers.includes(item.feature);
                  return (
                    <div className="flex flex-row gap-2 mb-4" key={index}>
                      <input
                        type="checkbox"
                        className="accent-[#ff0000] p-2 size-5 cursor-pointer"
                        checked={isChecked}
                        onChange={() =>
                          handleOthersCheckboxChange(item?.feature)
                        }
                      />

                      <span className="text-sm text-[#555151]">
                        {item?.feature}
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              ""
            )}

            <hr className="my-5" />
          </div> */}
                  {/*  */}

                  <div>
                    <ThemeButton
                      text="Filter Results"
                      className=" sm:px-6 !px-2 sm:text-sm text-xs h-[50px] flex flex-row justify-center !text-center !text-[14px] w-[227px]"
                    />
                  </div>
                  <div>
                    <ThemeButton
                      onClick={handleFilterReset}
                      text="Reset Filter"
                      className="font-semibold sm:px-6 !px-2 sm:text-sm text-xs h-[50px] flex flex-row justify-center !text-center !text-[14px] w-[227px] !text-[#ff0000] !bg-[#fff]"
                    />
                  </div>
                </aside>
                : ""
            }
          </div>

          <aside className="basis-1 hidden xl:block w-[300px] h-full shadow-filter-shadow p-8  left-0 top-20 bg-white sm:hidden ">
            <div>
              <h1 className="text-center font-bold">
                What Are You Looking For
              </h1>
            </div>
            <div className="relative flex flex-row items-center !justify-center w-[234px] mt-6 bg-white">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-[234px] h-[45px] rounded-md pl-3 border-[#DDD9D9] border-2 outline-0"
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
              <div
                onClick={() => {
                  setShowCarCategory(!showCarCategory);
                }}
                className="flex flex-row items-center justify-between cursor-pointer"
              >
                <span className="font-bold">Car Brand</span>
                <Image
                  src="/carListing/blackArrow.svg"
                  width={20}
                  height={20}
                  alt="bluetooth"
                />
              </div>
              {showCarCategory ? (
                <div className="h-auto mt-4 overflow-auto scrollbar scroll-smooth	">
                  {carCategory?.map((item: any, index: number) => {
                    const isChecked = selectedCategories.includes(
                      item?.category
                    );
                    return (
                      <div className="flex flex-row gap-2 mb-4" key={index}>
                        <input
                          type="checkbox"
                          className="accent-[#ff0000] p-2 size-5 cursor-pointer cursor-pointer"
                          checked={isChecked}
                          onChange={() =>
                            handleCategoryCheckboxChange(item?.category)
                          }
                        />
                        <span className="text-sm text-[#555151]">
                          {item?.category}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                ""
              )}

              <hr className="my-5" />
            </div>
            {/*  */}
            <div>
              <div
                onClick={() => setShowCarType(!showCarType)}
                className="flex flex-row items-center justify-between cursor-pointer"
              >
                <span className="font-bold">Car Type</span>
                <Image
                  src="/carListing/blackArrow.svg"
                  width={20}
                  height={20}
                  alt="bluetooth"
                />
              </div>
              {showCarType ? (
                <div className="h-auto overflow-auto scrollbar scroll-smooth mt-4">
                  {carType.map((item, index) => {
                    const isChecked = selectedTypes.includes(item.type);
                    return (
                      <div className="flex flex-row gap-2 mb-4" key={index}>
                        <input
                          type="checkbox"
                          className="accent-[#ff0000] p-2 size-5 cursor-pointer"
                          checked={isChecked}
                          onChange={() => handleTypeCheckboxChange(item.type)}
                        />
                        <span className="text-sm text-[#555151]">
                          {item.type}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                ""
              )}

              <hr className="my-5" />
            </div>
            {/*  */}
            <div>
              <div
                onClick={() => setShowCapacity(!showCapacity)}
                className="flex flex-row items-center justify-between cursor-pointer"
              >
                <span className="font-bold">Passenger Capacity</span>
                <Image
                  src="/carListing/blackArrow.svg"
                  width={20}
                  height={20}
                  alt="bluetooth"
                />
              </div>
              {showCapacity ? (
                <div className="h-auto overflow-auto scrollbar scroll-smooth mt-4">
                  {carCapacity?.map((item, index) => {
                    const isChecked = selectedCapacity.includes(item.capacity);
                    return (
                      <div className="flex flex-row gap-2 mb-4" key={index}>
                        <input
                          type="checkbox"
                          className="accent-[#ff0000] p-2 size-5 cursor-pointer"
                          checked={isChecked}
                          onChange={() =>
                            handleCapacityCheckboxChange(item?.capacity)
                          }
                        />
                        <span className="text-sm text-[#555151]">
                          {item?.capacity}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                ""
              )}

              <hr className="my-5" />
            </div>
            {/*  */}
            <div>
              <div
                onClick={() => setShowPriceRange(!showPriceRange)}
                className="flex flex-row items-center justify-between cursor-pointer"
              >
                <span className="font-bold">Price Range</span>
                <Image
                  src="/carListing/blackArrow.svg"
                  width={20}
                  height={20}
                  alt="bluetooth"
                />
              </div>
              {showPriceRange ? (
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
                </div>)

                :
                ""
              }

              <hr className="my-5" />
            </div>
            {/*  */}
            <div>
              <div
                onClick={() => setShowTransmission(!showTransmission)}
                className="flex flex-row items-center justify-between cursor-pointer"
              >
                <span className="font-bold">Transmission Type</span>
                <Image
                  src="/carListing/blackArrow.svg"
                  width={20}
                  height={20}
                  alt="bluetooth"
                />
              </div>
              {showTransmission ? (
                <div className="h-[100px] overflow-auto scrollbar scroll-smooth	">
                  {Transmissions.map((item: any, index: any) => {
                    const isChecked = selectedTransmission.includes(item.trans);
                    return (
                      <div className="flex flex-row gap-2 my-4" key={index}>
                        <input
                          type="checkbox"
                          className="accent-[#ff0000] p-2 size-5 cursor-pointer"
                          checked={isChecked}
                          onChange={() =>
                            handleTransmissionCheckboxChange(item?.trans)
                          }
                        />
                        <span className="text-sm text-[#555151]">
                          {item?.trans}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                ""
              )}

              <hr className="my-5" />
            </div>
            {/*  */}
            <div>
              <div
                onClick={() => setShowFuelType(!showFuelType)}
                className="flex flex-row items-center justify-between cursor-pointer"
              >
                <span className="font-bold">Fuel Type</span>
                <Image
                  src="/carListing/blackArrow.svg"
                  width={20}
                  height={20}
                  alt="bluetooth"
                />
              </div>
              {showFuelType ? (
                <div className="h-[188px] overflow-auto scrollbar scroll-smooth	">
                  {FuelType.map((item, index) => {
                    const isChecked = selectedFuelType.includes(item.type);
                    return (
                      <div className="flex flex-row gap-2 my-4" key={index}>
                        <input
                          type="checkbox"
                          className="accent-[#ff0000] p-2 size-5 cursor-pointer"
                          checked={isChecked}
                          onChange={() =>
                            handleFuelTypeCheckboxChange(item?.type)
                          }
                        />
                        <span className="text-sm text-[#555151]">
                          {item.type}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                ""
              )}

              <hr className="my-5" />
            </div>
            {/*  */}
            {/* <div>
            <div className="flex flex-row items-center justify-between cursor-pointer">
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
                  className="accent-[#ff0000] p-2 size-5 cursor-pointer"
                  defaultChecked
                />
                <span className="text-sm text-[#555151]">Used</span>
              </div>
              <div className="flex flex-row gap-2 my-4">
                <input
                  type="checkbox"
                  className="accent-[#ff0000] p-2 size-5 cursor-pointer"
                />
                <span className="text-sm text-[#555151]">Driver</span>
              </div>
              <div className="flex flex-row gap-2 my-4">
                <input
                  type="checkbox"
                  className="accent-[#ff0000] p-2 size-5 cursor-pointer"
                />
                <span className="text-sm text-[#555151]">Non-Driven</span>
              </div>
              <div className="flex flex-row gap-2 my-4">
                <input
                  type="checkbox"
                  className="accent-[#ff0000] p-2 size-5 cursor-pointer"
                />
                <span className="text-sm text-[#555151]">Subscription</span>
              </div>
            </div>
            <hr className="my-5" />
          </div> */}
            {/*  */}
            {/* <div>
            <div
              onClick={() => setShowOther(!showOthers)}
              className="flex flex-row items-center justify-between cursor-pointer"
            >
              <span className="font-bold">Others</span>
              <Image
                src="/carListing/blackArrow.svg"
                width={20}
                height={20}
                alt="bluetooth"
              />
            </div>
            {showOthers ? (
              <div className="h-[158px] overflow-auto scrollbar scroll-smooth mt-4">
                {otherFeatures?.map((item, index) => {
                  const isChecked = selectedOthers.includes(item.feature);
                  return (
                    <div className="flex flex-row gap-2 mb-4" key={index}>
                      <input
                        type="checkbox"
                        className="accent-[#ff0000] p-2 size-5 cursor-pointer"
                        checked={isChecked}
                        onChange={() =>
                          handleOthersCheckboxChange(item?.feature)
                        }
                      />

                      <span className="text-sm text-[#555151]">
                        {item?.feature}
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              ""
            )}

            <hr className="my-5" />
          </div> */}
            {/*  */}

            <div>
              <ThemeButton
                text="Filter Results"
                className=" sm:px-6 !px-2 sm:text-sm text-xs h-[50px] flex flex-row justify-center !text-center !text-[14px] w-[227px]"
              />
            </div>
            <div>
              <ThemeButton
                onClick={handleFilterReset}
                text="Reset Filter"
                className="font-semibold sm:px-6 !px-2 sm:text-sm text-xs h-[50px] flex flex-row justify-center !text-center !text-[14px] w-[227px] !text-[#ff0000] !bg-[#fff]"
              />
            </div>
          </aside>
          <div className="m-auto lg:w-[73%] w-full">
            {paginatedItems?.map((item: { bookingDate: string | number | Date; id: any; }, index: any) => {
              const dateObject = item.bookingDate ? new Date(item.bookingDate) : null;
              let dateOnly = '';
              if (dateObject && !isNaN(dateObject.getTime())) {
                dateOnly = dateObject.toISOString().split('T')[0];
              }

              cardCount++;
              return (
                <div key={`fragment-${item.id}`}>
                  <CardListingCards key={`card-${item.id}`} data={item} />
                  {dateOnly === pickUpDate && (
                    <CardListingCards key={`card-date-${item.id}`} data={item} />
                  )}
                  {cardCount % 2 === 0 && <CardListingBanner count={cardCount} />}
                </div>
              );
            })}

            <div className="pagination flex items-center justify-center space-x-2 mt-4">
              <button
                className={`px-4 py-2 border rounded-md whitespace-nowrap ${currentPage === 1 ? 'text-gray-400' : 'text-gray-700'}`}
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                &larr; Prev
              </button>
              {totalPages > 0 && [...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  className={`w-10 h-10 border rounded-md ${currentPage === index + 1 ? 'bg-primary-color text-white' : 'bg-white text-gray-700'}`}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
              <button
                className={`px-4 py-2 border rounded-md whitespace-nowrap ${currentPage === totalPages ? 'text-gray-400' : 'text-gray-700'}`}
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next &rarr;
              </button>
            </div>
          </div>


        </section>
      </main>
    </div>
  );
};

export default CarListing;
const carCategory = [
  {
    category: "Maruti Suzuki",
  },
  {
    category: "Tata",
  },
  {
    category: "Hyundai",
  },
  {
    category: "Mahindra",
  },
];
const carType = [
  {
    type: "Sedan",
  },
  {
    type: "Hatchback",
  },
  {
    type: "Wagon",
  },
  {
    type: "SUV",
  },
];
const carCapacity = [
  {
    capacity: "4",
  },
  {
    capacity: "5",
  },
  {
    capacity: "6",
  },
  {
    capacity: "7",
  },
  {
    capacity: "8",
  },
];

const Transmissions = [
  {
    trans: "Automatic",
  },
  {
    trans: "Manual",
  },
];

const FuelType = [
  {
    type: "Petrol",
  },
  {
    type: "Diesel",
  },
  {
    type: "Electric",
  },
  {
    type: "CNG+Petrol",
  },
];

const otherFeatures = [
  {
    feature: "bluetooth",
  },
  {
    feature: "navigationSystem",
  },
  {
    feature: "multiZoneAC",
  },
  {
    feature: "premiumSoundSystem",
  },
];
