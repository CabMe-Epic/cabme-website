"use client";
import Image from "next/image";
import ThemeButton from "@/app/components/theme-button/theme-button";
import OfferCards from "@/app/components/offer-cards/offer-cards";
import ReviewCard from "@/app/components/review-card/review-card";
import FaqSection from "@/app/components/faq/faq";
import FleetsSlider from "@/app/components/slider/slider-components";
import OurBlogs from "@/app/components/our-blogs/our-blogs";
import React, { useEffect, useState } from "react";
import RadioButton from "@/app/components/radio-component/radio-component";
// import { getAllCities } from "@/app/networkRequests/hooks/api";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "@/app/Datepicker.css";
import moment from "moment";
import BannerSlider from "@/app/components/banner-slider/banner-slider";
import SelectOption from "@/app/components/new-drop-down/new-drop-down";
import City from "@/app/components/city-selection/city-selection";
import { getAllCities } from "../../../../networkRequests/hooks/api";
import BlinkerLoader from "../blinker-loader/blinkerLoader";

export default function Home() {
  // const [startDate, setStartDate] = useState(
  //   setHours(setMinutes(new Date(), 0), 9),
  // );
  const [startDate, setStartDate] = useState<any>();
  const [loader, setLoader] = useState(false);

  console.log("startDate pick", { startDate });
  const [dropDate, setDropDate] = useState<any>();
  console.log(startDate, "sun");

  const filterPassedTime = (time: any) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

  const router = useRouter();

  const topFleetForm = React.useRef<HTMLDivElement>(null);

  const scrollToFleet = () => {
    topFleetForm?.current?.scrollIntoView({ behavior: "smooth" });
  };

  const [tabValue, setTabsValue] = useState("Self-Driving");
  const [mobileTabValue, setMobileTabValue] = useState("Rentals");
  const [mobilePickuptime, setMobilepickuptime] = useState("");
  const [mobileDroplocation, setMobiledropCities] = useState("");
  const [mobilDropdate, setMobiledropdate] = useState("");
  // const [switchRadio, setSwitchRadio] = useState("Self Driven");
  const [radioToggle, setRadioToggle] = useState("Out-station");
  console.log(radioToggle, "radio");

  const [pickupLocation, setPickupLocation] = useState<any>();
  const [dropOffLocation, setDropoffLocation] = useState<any>();
  const [pickupDate, setPickupDate] = useState<any>();
  const [dropOffDate, setDropoffDate] = useState<any>();
  const [pickupTime, setPickupTime] = useState<any>();
  const [dropoffTime, setDropoffTime] = useState<any>();

  const [mobilestartCity, setMobilestartCity] = useState("select");
  const [mobileStartDate, setMobileStartDate] = useState<any>(null);
  const [mobileStartTime, setMobileStartTime] = useState<any>(null);
  const [mobileEndCity, setMobileEndCity] = useState("select");
  const [mobileEndDate, setMobileEndDate] = useState<any>(null);
  const [mobileEndTime, setMobileEndTime] = useState<any>(null);

  const handlePickupLocation = (event: any) => {
    setPickupLocation(event);
    console.log(pickupLocation, "joo");
  };

  const handleDropOffLocation = (event: any) => {
    setDropoffLocation(event);
  };

  console.log(pickupLocation, "213 pickup location");
  console.log(dropOffLocation, "213 dropOff location");
  console.log(pickupDate, "213pickup date");
  console.log(dropOffDate, "213dropOff date");

  const saveLocationData = () => {
   if(tabValue!=="Subscription"){
        if (!pickupTime) {
            alert("Please select the Pickup Time");
            return;
          }
      
          if (!dropoffTime) {
            alert("Please select the Drop Off Time");
            return;
          }
      
          if (!pickupDate) {
            alert("Please select the Pickup Date");
            return;
          }
      
          if (!dropOffDate) {
            alert("Please select the Drop Off Date");
            return;
          }
        }
          const pickupDateTime = new Date(`${pickupDate}T${pickupTime}`);
          const dropoffDateTime = new Date(`${dropOffDate}T${dropoffTime}`);
      
          if (pickupDateTime >= dropoffDateTime) {
            alert("Drop-off date and time should be later than Pickup date and time");
            return;
          }
          if (tabValue === "Driver") {
            localStorage.setItem("radioToggle", radioToggle);
          }
      
          localStorage.setItem("dropOffLocation", dropOffLocation || mobileEndCity);
          localStorage.setItem("dropOffDate", dropOffDate || mobileEndDate);
          localStorage.setItem("dropoffTime", dropoffTime || mobileEndTime);
      
    
    
   
  

    localStorage.setItem("pickupLocation", pickupLocation || mobilestartCity);
    localStorage.setItem("pickupDate", pickupDate || mobileStartDate);
    localStorage.setItem("tabValue", tabValue);
    localStorage.setItem("pickupTime", pickupTime || mobileStartTime);
    // console.log(pickupDate, pickupTime, "ddd");

    router.push("/car-listing");
   
  };

  const pickupDateTime = new Date(`${pickupDate}T${pickupTime}`);

  const saveLocationDataMobile = () => {
    if (!startDate) {
      alert("Please select the Pickup Time");
      return;
    }
if(tabValue!=="Subscription"){

    if (!dropDate) {
      alert("Please select the Drop Off Time");
      return;
    }
}

    const pickupDateTime = new Date(`${mobileStartDate}T${mobileStartTime}`);
    const dropoffDateTime = new Date(`${mobileEndDate}T${mobileEndTime}`);

    if (pickupDateTime >= dropoffDateTime) {
      alert("Drop-off date and time should be later than Pickup date and time");
      return;
    }

    localStorage.setItem("pickupLocation", pickupLocation || mobilestartCity);
    localStorage.setItem("dropOffLocation", dropOffLocation || mobileEndCity);
    localStorage.setItem("pickupDate", pickupDate || mobileStartDate);
    localStorage.setItem("dropOffDate", dropOffDate || mobileEndDate);
    localStorage.setItem("tabValue", tabValue);
    localStorage.setItem("pickupTime", pickupTime || mobileStartTime);
    localStorage.setItem("dropoffTime", dropoffTime || mobileEndTime);

    console.log(pickupDate, pickupTime, "ddd");

    if (tabValue === "Driver") {
      localStorage.setItem("radioToggle", radioToggle);
    }

    router.push("/car-listing");
  };

  console.log(pickupTime, dropoffTime, "pickupTime");

  // location section work end

  const [cities, setCities] = useState<[]>();

  const getRecords = React.useCallback(async () => {
    setLoader(true);
    const citiesResponse = await getAllCities();
    const cities = citiesResponse?.data?.response;
    setCities(cities);
    setLoader(false);
    console.log("citiesResponse", { cities });
  }, []);

  useEffect(() => {
    getRecords();
  }, []);

  //for pickup and dropoff location

  //set date and time in local storage from date picker
  function convert(str: any) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);

    return [date.getFullYear(), mnth, day].join("-");
  }
  function convertTime(str: any) {
    var date = new Date(str);

    const hours = ("0" + date.getHours()).slice(-2);
    const minutes = ("0" + date.getMinutes()).slice(-2);
    return [hours, minutes].join(":");
  }
  const CustomInput = ({ value, onClick, onChange, ref }: any) => (
    <input
      className="cursor-pointer border-0 datepickerinput sm:text-md !text-sm"
      placeholder="Pickup date"
      value={value}
      onClick={onClick}
      onChange={onChange}
      readOnly
      ref={ref}
    />
  );
  const hanldepickupTime = (event: any) => {
    console.log(event, "pickup date");
    setStartDate(event);
    const result = convert(event);
    setPickupDate(result);
    const getpickupTime = convertTime(event);
    setPickupTime(getpickupTime);
    console.log(getpickupTime, "pkk");
    console.log(result, "resss");
  };

  const hanldedropoffTime = async (event: any) => {
    console.log(event, "joo");
    const result = convert(event);
    const getDropoffTime = convertTime(event);
    if (pickupDate === undefined || pickupTime === undefined) {
      alert("Please Select the Pickup Date & Time");
      return;
    } else {
      setDropDate(event);
      setDropoffDate(result);
      setDropoffTime(getDropoffTime);
      console.log(getDropoffTime, "drrrr");
    }
    console.log({ dropDate });
  };
  React.useEffect(() => {
    console.log("random date", { dropDate });
    console.log(dropDate - startDate, "diff");
    if (dropoffTime !== undefined && dropoffTime !== "00:00") {
      // console.log("true");
      if (dropDate - startDate < 86400000) {
        alert("must be greater then start date");
        setDropDate(undefined);
        // return;
      }
    }
  }, [dropoffTime]);

  // const hanldedropoffTime = React.useEffect((data:any)=>{
  // if(dateFormat <= fropFormat){
  //     alert("chl ja")
  //   }else{
  //     alert("nhi chlega")
  //   }

  // },[dateFormat , fropFormat ])

  if (typeof window !== "undefined") {
    localStorage.setItem("pickupTime", pickupTime);
    localStorage.setItem("dropoffTime", dropoffTime);
  }

  const [offer, setOffer] = useState("Daily Offers");
  // console.log(switchRadio, "tabValue");
  console.log(tabValue, "tabValue");
  console.log(dropDate, "dropDate sahil");

  const durationFormat = React.useMemo(() => {
    if (startDate && dropDate) {
      const diffInMs = Math.abs(dropDate - startDate);
      const diffInSeconds = Math.floor(diffInMs / 1000);
      const days = Math.floor(diffInSeconds / (3600 * 24));
      const hours = Math.floor((diffInSeconds % (3600 * 24)) / 3600);
      return `${days} days and ${hours} hours`;
    }
  }, [startDate, dropDate]);

  console.log("durationFormat", { durationFormat });

  const [selectedCity, setSelectedCity] = useState("");
  const [selectedMobileCity, setSelectedMobileCity] = useState("");
  const [dropSelectedCity, setDropSelectedCity] = useState("");
  const [dropSelectedMobileCity, setDropSelectedMobileCity] = useState("");

  const handleCityClick = (cityName: any) => {
    setSelectedCity(cityName);
    // setPickupLocation(cityName);
    handlePickupLocation(cityName);
    setShowLocationPopup(false);
  };
  const handleMobileCityClick = (cityName: any) => {
    setSelectedMobileCity(cityName);
    // setPickupLocation(cityName);
    handlePickupLocation(cityName);
    setShowMobileLocationPopup(false);
  };

  const handleDropOffCity = (cityName: any) => {
    setDropSelectedCity(cityName);
    // setDropoffLocation(cityName);
    handleDropOffLocation(cityName);
    setShowDropLocationPopup(false);
  };

  const handleDropOffMobileCity = (cityName: any) => {
    setDropSelectedMobileCity(cityName);
    // setDropoffLocation(cityName);
    handleDropOffLocation(cityName);
    setShowDropLocationPopup(false);
  };

  console.log(selectedCity, "selectedCity");

  const [showLocationPopup, setShowLocationPopup] = useState(false);
  const [showMobileLocationPopup, setShowMobileLocationPopup] = useState(false);
  const [showDropLocationPopup, setShowDropLocationPopup] = useState(false);

  const handleSelectPopupLocation = (e: any) => {
    e.preventDefault();
    setShowLocationPopup(!showLocationPopup);
  };

  const handleSelectMobilePopupLocation = (e: any) => {
    e.preventDefault();
    setShowMobileLocationPopup(!showLocationPopup);
  };

  const handleDropSelectPopupLocation = (e: any) => {
    e.preventDefault();
    setShowDropLocationPopup(!showLocationPopup);
  };

  console.log(pickupDate, "pickupLocation");

  const handeFoucous = (e: any) => {
    e.target.blur();
  };

  return (
    <>
      {loader && (
        <div>
          <BlinkerLoader />
        </div>
      )}

      <div
        className={`max-w-[1250px]  sm:grid w-full hidden m-auto mb-20 shadow-location-shadow rounded-xl px-6 py-12 relative mt-[10px] ${
          tabValue === "Driver" ? "h-[320px]" : tabValue==="Subscription" ? "h-[210px]" : "h-[260px]"
        }`}
      >
        <div className="max-w-[632px] z-[0] flex m-auto justify-between border shadow-custom-shadow rounded-2xl overflow-hidden absolute left-0 right-0 top-[-30px] w-full">
          {tabsArray?.map((value, ind) => {
            return (
              <div
                className={`cursor-pointer w-full text-center py-[28px] text-lg ${
                  value?.tabsValue === tabValue
                    ? "bg-primary-color text-white font-bold"
                    : "bg-[#EFF1FB]"
                }`}
                key={ind}
                onClick={() => setTabsValue(value?.tabsValue)}
              >
                {value?.tabsValue}
              </div>
            );
          })}
        </div>
        {tabValue === "Driver" && (
          <>
            <div className="grid">
              <div className="flex gap-6 w-fit m-auto mt-6 w-fit h-fit">
                {driverRadioButton?.map((driver, ind) => {
                  return (
                    <div className="w-fit" key={ind}>
                      <RadioButton
                        onClick={() => setRadioToggle(driver.content)}
                        content={driver?.content}
                        name={driver?.name}
                        id={driver?.id}
                      />
                    </div>
                  );
                })}
              </div>
              {radioToggle === "Out-station" && (
                <div className="flex items-center mt-6">
                  {outstation?.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className={`flex w-full gap-4 ${
                          index < 3 ? "border-r-2 mr-6 border-black" : ""
                        }`}
                      >
                        <div className="mt-2 flex-none">
                          <Image
                            src={item?.imageUrl}
                            alt="icon"
                            width={16}
                            height={16}
                          />
                        </div>
                        <div className="leading-none w-full">
                          <h3 className="text-lg font-semibold">
                            {item?.heading}
                          </h3>

                          {item?.id === "location" && showLocationPopup && (
                            <>
                              <input
                                className="bg-[#FCFBFB] mt-2 px-2 rounded-md border-0 outline-none py-1 cursor-pointer"
                                type="text"
                                placeholder="All City"
                                onClick={(e) => handleSelectPopupLocation(e)}
                                value={selectedCity}
                                readOnly // Prevent editing directly
                              />

                              <div className="flex flex-col justify-center items-center fixed inset-0 z-[999] bg-[#0000003c] bg-opacity-50">
                                <div className="flex flex-col justify-start items-center bg-white py-3 px-10 rounded-3xl shadow-md relative">
                                  <Image
                                    src={"/svg/close-red.svg"}
                                    alt="nav"
                                    width={26}
                                    height={26}
                                    className="absolute top-2 right-2 border rounded-full p-.5 cursor-pointer"
                                    onClick={() => setShowLocationPopup(false)}
                                  />
                                  <div className="city-list max-w-[1095px] flex-col justify-start items-start m-auto  grid grid-cols-4">
                                    {cities?.map((city: any, index: number) => (
                                      <div key={index}>
                                        <City
                                          city={city}
                                          isSelected={
                                            selectedCity === city.name
                                          }
                                          onClick={() =>
                                            handleCityClick(city.name)
                                          }
                                        />
                                      </div>
                                    ))}
                                  </div>
                                  {/* <ThemeButton
                                                                        onClick={() => setShowLocationPopup(false)}
                                                                        className="!rounded-full sm:!py-4 !py-2 sm:!w-[200px] !w-[120px] !font-semibold"
                                                                        text="Select"
                                                                    /> */}
                                </div>
                              </div>
                            </>
                          )}

                          {item?.id === "location" && !showLocationPopup && (
                            <div className="w-full relative">
                              <input
                                className="bg-[#FCFBFB] mt-2 p-2 rounded-md border-0 outline-none cursor-pointer w-[95%]"
                                type="text"
                                placeholder="All City"
                                onClick={(e) => handleSelectPopupLocation(e)}
                                value={selectedCity}
                                readOnly // Prevent editing directly
                              />
                              <Image
                                src="/svg/arrow-down.svg"
                                alt="arrowDown"
                                width={12}
                                height={12}
                                className="absolute right-8 top-6"
                              />
                            </div>
                          )}

                          {item?.id === "date" && (
                            <div className="flex gap-2 p-2 px-4 w-[95%] bg-[#FCFBFB] react-datepicker1 mt-2">
                              {/* <input
                              type="date"
                              name="date"
                              id="date"
                              className="outline-red-500 w-fit h-8"
                            // onChange={
                            //   item?.heading === "Pick Up Date"
                            //     ? (e) => handlePickupDate(e)
                            //     : (ev) => handleDropOffDate(ev)
                            // }
                            />
                            <input
                              type="time"
                              name="pickup"
                              id=""
                              onChange={
                                item?.heading === "Pick Up Date"
                                  ? (event) => hanldepickupTime(event)
                                  : (event) => hanldedropoffTime(event)
                              }
                            /> */}
                              <DatePicker
                                className="cursor-pointer border-0 datepickerinput"
                                selected={
                                  item?.heading === "Pick Up Date"
                                    ? startDate
                                    : dropDate
                                }
                                onChange={
                                  item?.heading === "Pick Up Date"
                                    ? (date) => hanldepickupTime(date)
                                    : (date) => hanldedropoffTime(date)
                                }
                                showTimeSelect
                                filterTime={filterPassedTime}
                                dateFormat="MMMM d, yyyy h:mm aa"
                                placeholderText="Enter Date & Time"
                                onKeyDown={(event) => event?.preventDefault()}
                                minDate={
                                  item?.heading === "Pick Up Date"
                                    ? new Date() // For pickup date, prevent selecting past dates
                                    : startDate
                                    ? new Date(startDate)
                                    : new Date() // For drop-off date, prevent selecting before pickup date
                                }
                                maxDate={
                                  item?.heading === "Pick Up Date"
                                    ? dropDate || null // For pickup date, prevent selecting after drop-off date
                                    : null // For drop-off date, no upper limit unless specified
                                }
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                  {dropOffLocation && (
                    <div className="h-[75px] flex w-full lg:gap-4 gap-2 lg:mr-6 mr-2 border-black">
                      <div className="grid">
                        <div className="flex gap-2 ">
                          <Image
                            src={"/svg/city-new.svg"}
                            alt="location"
                            width={16}
                            height={18}
                          />
                          <label
                            htmlFor="dropoff"
                            className="lg:text-md  font-semibold items-center mt-[2px]"
                          >
                            Drop-off location
                          </label>
                        </div>
                        <input
                          type="text"
                          value={dropOffLocation}
                          className="bg-[#FCFBFB] outline-none p-[8px] h-fit"
                          readOnly
                        />
                      </div>
                    </div>
                  )}
                  <div>
                    <ThemeButton
                      text="Search"
                      className="px-8 !py-[12px] relative right-6 ml-4"
                      onClick={() => saveLocationData()}
                    />
                  </div>
                </div>
              )}
              {radioToggle === "Local" && (
                <div className="flex items-center mt-6">
                  {localDriverArray?.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className={`flex w-full gap-4 ${
                          index < 3 ? "border-r-2 mr-6 border-black" : ""
                        }`}
                      >
                        <div className="mt-2 flex-none">
                          <Image
                            src={item?.imageUrl}
                            alt="icon"
                            width={16}
                            height={16}
                          />
                        </div>
                        <div className="leading-none w-full">
                          <h3 className="text-lg font-semibold">
                            {item?.heading}
                          </h3>

                          {item?.id === "location" && showLocationPopup && (
                            <>
                              <input
                                className="bg-[#FCFBFB] mt-2 px-2 rounded-md border-0 outline-none py-1 cursor-pointer"
                                type="text"
                                placeholder="All City"
                                onClick={(e) => handleSelectPopupLocation(e)}
                                value={selectedCity}
                                readOnly // Prevent editing directly
                              />

                              <div className="flex flex-col justify-center items-center fixed inset-0 z-[999] bg-[#0000003c] bg-opacity-50">
                                <div className="flex flex-col justify-start items-center bg-white py-3 px-10 rounded-3xl shadow-md relative">
                                  <Image
                                    src={"/svg/close-red.svg"}
                                    alt="nav"
                                    width={26}
                                    height={26}
                                    className="absolute top-2 right-2 border rounded-full p-.5 cursor-pointer"
                                    onClick={() => setShowLocationPopup(false)}
                                  />
                                  <div className="city-list max-w-[1095px] flex-col justify-start items-start m-auto  grid grid-cols-4">
                                    {cities?.map((city: any, index: number) => (
                                      <div key={index}>
                                        <City
                                          city={city}
                                          isSelected={
                                            selectedCity === city.name
                                          }
                                          onClick={() =>
                                            handleCityClick(city.name)
                                          }
                                        />
                                      </div>
                                    ))}
                                  </div>
                                  {/* <ThemeButton
                                                                        onClick={() => setShowLocationPopup(false)}
                                                                        className="!rounded-full sm:!py-4 !py-2 sm:!w-[200px] !w-[120px] !font-semibold"
                                                                        text="Select"
                                                                    /> */}
                                </div>
                              </div>
                            </>
                          )}

                          {item?.id === "location" && !showLocationPopup && (
                            <div className="relative">
                              <input
                                className="bg-[#FCFBFB] mt-2 p-2 rounded-md border-0 outline-none cursor-pointer w-[95%]"
                                type="text"
                                placeholder="All City"
                                onClick={(e) => handleSelectPopupLocation(e)}
                                value={selectedCity}
                                readOnly // Prevent editing directly
                              />
                              <Image
                                src="/svg/arrow-down.svg"
                                alt="arrowDown"
                                width={12}
                                height={12}
                                className="absolute right-8 top-6"
                              />
                            </div>
                          )}
                          {item?.id === "date" && (
                            <div className="flex gap-2 p-2 px-4 w-[95%] bg-[#FCFBFB] react-datepicker1 mt-2">
                              {/* <input
                              type="date"
                              name="date"
                              id="date"
                              className="outline-red-500 w-fit h-8"
                            // onChange={
                            //   item?.heading === "Pick Up Date"
                            //     ? (e) => handlePickupDate(e)
                            //     : (ev) => handleDropOffDate(ev)
                            // }
                            />
                            <input
                              type="time"
                              name="pickup"
                              id=""
                              onChange={
                                item?.heading === "Pick Up Date"
                                  ? (event) => hanldepickupTime(event)
                                  : (event) => hanldedropoffTime(event)
                              }
                            /> */}
                              <DatePicker
                                className="cursor-pointer datepickerinput w-full !p-2"
                                selected={
                                  item?.heading === "Pick Up Date"
                                    ? startDate
                                    : dropDate
                                }
                                onChange={
                                  item?.heading === "Pick Up Date"
                                    ? (date) => hanldepickupTime(date)
                                    : (date) => hanldedropoffTime(date)
                                }
                                showTimeSelect
                                filterTime={filterPassedTime}
                                dateFormat="MMMM d, yyyy h:mm aa"
                                placeholderText="Enter Date & Time"
                                onKeyDown={(event) => event?.preventDefault()}
                                minDate={
                                  item?.heading === "Pick Up Date"
                                    ? new Date() // For pickup date, start from today or any other logic
                                    : startDate
                                    ? new Date(startDate)
                                    : new Date() // For drop-off date, start from pickup date
                                }
                                maxDate={
                                  item?.heading === "Pick Up Date"
                                    ? dropDate || null // For pickup date, cannot select after drop-off date
                                    : null // For drop-off date, no upper limit unless specified
                                }
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                  {dropOffLocation && (
                    <div className="h-[75px] flex w-full lg:gap-4 gap-2 lg:mr-6 mr-2 border-black">
                      <div className="grid">
                        <div className="flex gap-2 ">
                          <Image
                            src={"/svg/city-new.svg"}
                            alt="location"
                            width={16}
                            height={18}
                          />
                          <label
                            htmlFor="dropoff"
                            className="lg:text-md  font-semibold items-center mt-[2px]"
                          >
                            Drop-off location
                          </label>
                        </div>
                        <input
                          type="text"
                          value={dropOffLocation}
                          className="bg-[#FCFBFB] outline-none p-[8px] h-fit"
                          readOnly
                        />
                      </div>
                    </div>
                  )}
                  <div>
                    <ThemeButton
                      text="Search"
                      className="px-8 !py-[12px] relative right-6 ml-4"
                      onClick={() => saveLocationData()}
                    />
                  </div>
                </div>
              )}
              <div
                onClick={(e) => handleDropSelectPopupLocation(e)}
                className={`text-[#FF0000] hover:text-[#ff0000ac] m-auto  text-xl font-bold cursor-pointer ${
                  durationFormat ? "mt-4" : "mt-5"
                }`}
              >
                Drop in different city?
              </div>
              {durationFormat && (
                <div className="w-fit m-auto">
                  <div className="mt-4">
                    <h3 className="font-semibold text-lg bg-[#FCFBFB] p-2 rounded-md">
                      Duration:{" "}
                      <span className="font-[400]"> {durationFormat} </span>
                    </h3>
                  </div>
                </div>
              )}

              {showDropLocationPopup && (
                <>
                  <div className="flex flex-col justify-center items-center fixed inset-0 z-[999] bg-[#0000003c] bg-opacity-50">
                    <div className="flex flex-col justify-start items-center bg-white py-3 px-10 rounded-3xl shadow-md relative">
                      <Image
                        src={"/svg/close-red.svg"}
                        alt="nav"
                        width={26}
                        height={26}
                        className="absolute top-2 right-2 border rounded-full p-.5 cursor-pointer"
                        onClick={() => setShowDropLocationPopup(false)}
                      />
                      <div className="city-list max-w-[1095px] flex-col justify-start items-start m-auto  grid grid-cols-4 ">
                        {cities?.map((city: any, index: number) => (
                          <div key={index}>
                            <City
                              city={city}
                              isSelected={dropSelectedCity === city.name}
                              onClick={() => handleDropOffCity(city.name)}
                            />
                          </div>
                        ))}
                      </div>
                      {/* <ThemeButton
                                                onClick={() => setShowDropLocationPopup(false)}
                                                className="!rounded-full sm:!py-4 !py-2 sm:!w-[200px] !w-[120px] !font-semibold"
                                                text="Select"
                                            /> */}
                    </div>
                  </div>
                </>
              )}
            </div>
          </>
        )}

        {tabValue === "Subscription" && (
          <>
            <div className="grid z-50">
              <div className="grid grid-cols-[1fr_1fr_1fr] mt-10 w-full">
                {outstation?.map((item, index) => {
                  return (
                    <>
                      {item?.id === "location" && (
                        <div
                          key={index}
                          className={`flex w-full gap-4 ${
                            index < 3 ? "border-r-2 mr-6 border-black" : ""
                          }`}
                        >
                          <div className="flex-none">
                            <Image
                              src={item?.imageUrl}
                              alt="icon"
                              width={16}
                              height={16}
                            />
                          </div>
                          <div className="leading-none w-full">
                            <h3 className="text-md font-[600]">
                              {item?.heading}
                            </h3>

                            {item?.id === "location" && showLocationPopup && (
                              <>
                                <input
                                  className="bg-[#FCFBFB] mt-2 px-2 rounded-md border-0 outline-none py-1 cursor-pointer"
                                  type="text"
                                  placeholder="All City"
                                  onClick={(e) => handleSelectPopupLocation(e)}
                                  value={selectedCity}
                                  readOnly
                                />

                                <div className="flex flex-col justify-center items-center fixed inset-0 z-[999] bg-[#0000003c] bg-opacity-50">
                                  <div className="flex flex-col justify-start items-center bg-white py-3 px-10 rounded-3xl shadow-md relative">
                                    <Image
                                      src={"/svg/close-red.svg"}
                                      alt="nav"
                                      width={26}
                                      height={26}
                                      className="absolute top-2 right-2 border rounded-full p-.5 cursor-pointer"
                                      onClick={() =>
                                        setShowLocationPopup(false)
                                      }
                                    />
                                    <div className="city-list max-w-[1095px] flex-col justify-start items-start m-auto  grid grid-cols-4">
                                      {cities?.map(
                                        (city: any, index: number) => (
                                          <div key={index}>
                                            <City
                                              city={city}
                                              isSelected={
                                                selectedCity === city.name
                                              }
                                              onClick={() =>
                                                handleCityClick(city.name)
                                              }
                                            />
                                          </div>
                                        )
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </>
                            )}

                            {item?.id === "location" && !showLocationPopup && (
                              <div className="relative">
                                <input
                                  className="bg-[#FCFBFB] mt-2 p-2 rounded-md border-0 outline-none cursor-pointer w-[95%]"
                                  type="text"
                                  placeholder="All City"
                                  onClick={(e) => handleSelectPopupLocation(e)}
                                  value={selectedCity}
                                  readOnly
                                />
                                <Image
                                  src="/svg/arrow-down.svg"
                                  alt="arrowDown"
                                  width={12}
                                  height={12}
                                  className="absolute right-8 top-6"
                                />
                              </div>
                            )}
                            {/* {item?.id === "date" && (
                                                    <div className=" gap-2 mt-2 w-[100%]">
                                                        
                                                        <DatePicker
                                                            className="cursor-pointer datepickerinput w-full !p-2"
                                                            selected={
                                                                item?.heading === "Pick Up Date"
                                                                    ? startDate
                                                                    : dropDate
                                                            }
                                                            onChange={
                                                                item?.heading === "Pick Up Date"
                                                                    ? (date) => hanldepickupTime(date)
                                                                    : (date) => hanldedropoffTime(date)
                                                            }
                                                            showTimeSelect
                                                            filterTime={filterPassedTime}
                                                            dateFormat="MMMM d, yyyy h:mm aa"
                                                            placeholderText="Enter Date & Time"
                                                            onKeyDown={(event) => event?.preventDefault()}
                                                            minDate={
                                                                item?.heading === "Pick Up Date"
                                                                    ? new Date() 
                                                                    : startDate
                                                                        ? new Date(startDate)
                                                                        : new Date() 
                                                            }
                                                            maxDate={
                                                                item?.heading === "Pick Up Date"
                                                                    ? dropDate || null 
                                                                    : null
                                                            }
                                                        />
                                                    </div>
                                                )} */}
                          </div>
                        </div>
                      )}
                    </>
                  );
                })}
                <div className="pl-4">
                  <div className="flex gap-2">
                    <Image
                      src={"/svg/calender.svg"}
                      alt="date"
                      width={16}
                      height={16}
                    />
                    <h3 className="text-md font-[600]">Pick-up Date</h3>
                  </div>
                  <DatePicker
                    className="cursor-pointer datepickerinput w-full !p-2"
                    selected={startDate}
                    onChange={(date) => hanldepickupTime(date)}
                    showTimeSelect
                    filterTime={filterPassedTime}
                    dateFormat="MMMM d, yyyy h:mm aa"
                    placeholderText="Enter Date & Time"
                    onKeyDown={(event) => event?.preventDefault()}
                    minDate={new Date()}

                    // maxDate={
                    //     item?.heading === "Pick Up Date"
                    //         ? dropDate || null
                    //         : null
                    // }
                  />
                </div>
                
                {/* {dropOffLocation && (
                                    <div className="h-[75px] flex w-full lg:gap-4 gap-2 lg:mr-6 mr-2 border-black">
                                        <div className="grid">
                                            <div className="flex gap-2 ">
                                                <Image
                                                    src={"/svg/city-new.svg"}
                                                    alt="location"
                                                    width={16}
                                                    height={18}
                                                />
                                                <label
                                                    htmlFor="dropoff"
                                                    className="lg:text-md  font-semibold items-center mt-[2px]"
                                                >
                                                    Drop-off location
                                                </label>
                                            </div>
                                            <input
                                                type="text"
                                                value={dropOffLocation}
                                                className="bg-[#FCFBFB] outline-none p-[8px] h-fit"
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                )} */}

                <div className="flex justify-center h-fit">
                  <ThemeButton
                    text="Search"
                    className="px-8 !py-[12px] relative right-6 ml-4"
                    onClick={() => saveLocationData()}
                  />
                </div>
              </div>

              {/* <div
                onClick={(e) => handleDropSelectPopupLocation(e)}
                className={`text-[#FF0000] hover:text-[#ff0000ac] m-auto  text-xl font-bold cursor-pointer ${
                  durationFormat ? "mt-4" : "mt-5"
                }`}
              >
                Drop in different city?
              </div> */}
              {/* {durationFormat && (
                <div className="w-fit m-auto">
                  <div className="mt-2">
                    <h3 className="font-semibold text-lg ">
                      Duration:{" "}
                      <span className="font-[400]"> {durationFormat} </span>
                    </h3>
                  </div>
                </div>
              )} */}

              {/* {showDropLocationPopup && (
                <>
                  <div className="flex flex-col justify-center items-center fixed inset-0 z-[999] bg-[#0000003c] bg-opacity-50">
                    <div className="flex flex-col justify-start items-center bg-white py-3 px-10 rounded-3xl shadow-md relative">
                      <Image
                        src={"/svg/close-red.svg"}
                        alt="nav"
                        width={26}
                        height={26}
                        className="absolute top-2 right-2 border rounded-full p-.5 cursor-pointer"
                        onClick={() => setShowDropLocationPopup(false)}
                      />
                      <div className="city-list max-w-[1095px] flex-col justify-start items-start m-auto  grid grid-cols-4">
                        {cities?.map((city: any, index: number) => (
                          <div key={index}>
                            <City
                              city={city}
                              isSelected={dropSelectedCity === city.name}
                              onClick={() => handleDropOffCity(city.name)}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )} */}
            </div>
          </>
        )}
        {tabValue === "Self-Driving" && (
          <div className="grid">
            <div className="flex items-center mt-10 w-full">
              {localDriverArray?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={`xl:h-fit h-full flex w-full lg:gap-4 gap-2 ${
                      index < 3 ? "border-r-2 lg:mr-6 mr-2 border-black" : ""
                    }`}
                  >
                    <div className=" flex-none">
                      <Image
                        src={item?.imageUrl}
                        alt="icon"
                        width={16}
                        height={16}
                      />
                    </div>
                    <div className="leading-none w-full">
                      <h3 className="lg:text-md text-md font-[600]">
                        {item?.heading}
                      </h3>
                      {item?.id === "location" && showLocationPopup && (
                        <>
                          <input
                            className="bg-[#FCFBFB] mt-2 px-2 rounded-md border-0 outline-none py-1 cursor-pointer"
                            type="text"
                            placeholder="All City"
                            onClick={(e) => handleSelectPopupLocation(e)}
                            value={selectedCity}
                            readOnly
                          />

                          <div className="flex flex-col justify-center items-center fixed inset-0 z-[999] bg-[#0000003c] bg-opacity-50">
                            <div className="flex flex-col justify-start items-center bg-white py-3 px-10 rounded-3xl shadow-md relative">
                              <Image
                                src={"/svg/close-red.svg"}
                                alt="nav"
                                width={26}
                                height={26}
                                className="absolute top-2 right-2 border rounded-full p-.5 cursor-pointer"
                                onClick={() => setShowLocationPopup(false)}
                              />
                              <div className="city-list max-w-[1095px] flex-col justify-start items-start m-auto  grid grid-cols-4">
                                {cities?.map((city: any, index: number) => (
                                  <div key={index}>
                                    <City
                                      city={city}
                                      isSelected={selectedCity === city.name}
                                      onClick={() => handleCityClick(city.name)}
                                    />
                                  </div>
                                ))}
                              </div>
                              {/* <ThemeButton
                                                                onClick={() => setShowLocationPopup(false)}
                                                                className="!rounded-full sm:!py-4 !py-2 sm:!w-[200px] !w-[120px] !font-semibold"
                                                                text="Select"
                                                            /> */}
                            </div>
                          </div>
                        </>
                      )}

                      {item?.id === "location" && !showLocationPopup && (
                        <div className="w-full relative">
                          <input
                            className="bg-[#FCFBFB] mt-2 p-2 rounded-md border-0 outline-none cursor-pointer w-[95%]"
                            type="text"
                            placeholder="All City"
                            onClick={(e) => handleSelectPopupLocation(e)}
                            value={selectedCity}
                            readOnly // Prevent editing directly
                          />
                          <Image
                            src="/svg/arrow-down.svg"
                            alt="arrowDown"
                            width={12}
                            height={12}
                            className="absolute right-8 top-6"
                          />
                        </div>
                      )}
                      {item?.id === "date" && (
                        <div className="flex gap-2 p-2 px-2 w-[95%] bg-[#FCFBFB] react-datepicker1 mt-2">
                          {/* <input

                          type="date"
                          name="date"
                          id="date"
                          className="outline-red-500 w-fit h-8"
                          onChange={
                            item?.heading === "Pick Up Date"
                              ? (e) => handlePickupDate(e)
                              : (ev) => handleDropOffDate(ev)
                          }
                        /> */}

                          {/* <input
                          type="time"
                          name="pickup"
                          id=""
                          onChange={
                            item?.heading === "Pick Up Date"
                              ? (event) => hanldepickupTime(event)
                              : (event) => hanldedropoffTime(event)
                          }
                        /> */}

                          <DatePicker
                            className="cursor-pointer datepickerinput"
                            selected={
                              item?.heading === "Pick Up Date"
                                ? startDate
                                : dropDate
                            }
                            onChange={
                              item?.heading === "Pick Up Date"
                                ? (date) => hanldepickupTime(date)
                                : (date) => hanldedropoffTime(date)
                            }
                            showTimeSelect
                            filterTime={filterPassedTime}
                            dateFormat="MMMM d, yyyy h:mm aa"
                            placeholderText={
                              item?.heading === "Pick Up Date" && !startDate
                                ? "Enter Date & Time"
                                : item?.heading !== "Pick Up Date" && !dropDate
                                ? "Enter Date & Time"
                                : ""
                            }
                            onKeyDown={(event) => event?.preventDefault()}
                            minDate={
                              item?.heading === "Pick Up Date"
                                ? new Date() // Or any other logic to set minDate for pickup
                                : startDate
                                ? new Date(startDate)
                                : new Date() // Prevent selection before pickup date for drop-off
                            }
                            maxDate={
                              item?.heading === "Pick Up Date"
                                ? dropDate // Prevent selection after drop-off date for pickup
                                : null
                            }
                          />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {dropOffLocation && (
                <div className=" h-[75px] flex w-full lg:gap-4 gap-2 lg:mr-6 mr-2 border-black">
                  <div className="grid">
                    <div className="flex gap-2 items-center">
                      <Image
                        src={"/svg/city-new.svg"}
                        alt="location"
                        width={16}
                        height={18}
                      />
                      <label
                        htmlFor="dropoff"
                        className="lg:text-md  font-semibold h-fit"
                      >
                        Drop-off location
                      </label>
                    </div>
                    <input
                      type="text"
                      value={dropOffLocation}
                      className="bg-[#FCFBFB] outline-none p-[8px] h-fit"
                      readOnly
                    />
                  </div>
                </div>
              )}

              <div className="sm:block hidden">
                <ThemeButton
                  className="px-8 !py-[12px] relative right-6 ml-4"
                  text="Search"
                  onClick={() => saveLocationData()}
                />
              </div>
            </div>
            <div
              onClick={(e) => handleDropSelectPopupLocation(e)}
              className={`text-[#FF0000] hover:text-[#ff0000ac] m-auto mt-4 text-xl font-bold cursor-pointer ${
                durationFormat ? "mt-2" : "mt-5"
              }`}
            >
              Drop in different city?
            </div>
            {durationFormat && (
              <div className="w-fit m-auto">
                <div className="mt-2">
                  <h3 className="font-semibold text-lg bg-[#FCFBFB] p-2 rounded-md">
                    Duration:{" "}
                    <span className="font-[400]"> {durationFormat} </span>
                  </h3>
                </div>
              </div>
            )}

            {showDropLocationPopup && (
              <>
                <div className="flex flex-col justify-center items-center fixed inset-0 z-[999] bg-[#0000003c] bg-opacity-50">
                  <div className="flex flex-col justify-start items-center bg-white py-3 px-10 rounded-3xl shadow-md relative">
                    <Image
                      src={"/svg/close-red.svg"}
                      alt="nav"
                      width={26}
                      height={26}
                      className="absolute top-2 right-2 border rounded-full p-.5 cursor-pointer"
                      onClick={() => setShowDropLocationPopup(false)}
                    />
                    <div className="city-list max-w-[1095px] flex-col justify-start items-start m-auto  grid grid-cols-4">
                      {cities?.map((city: any, index: number) => (
                        <div key={index}>
                          <City
                            city={city}
                            isSelected={dropSelectedCity === city.name}
                            onClick={() => handleDropOffCity(city.name)}
                          />
                        </div>
                      ))}
                    </div>
                    {/* <ThemeButton
                                            onClick={() => setShowDropLocationPopup(false)}
                                            className="!rounded-full sm:!py-4 !py-2 sm:!w-[200px] !w-[120px] !font-semibold"
                                            text="Select"
                                        /> */}
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
      {/* Only mobile section subsription */}
      <div className="relative max-w-[340px] sm:hidden block sm:mb-16 mb-10 m-auto border rounded-lg shadow-custom-shadow w-full px-4 sm:pt-16 sm:pt-11 pt-8 pb-4 sm:my-6 my-4 z-[9]">
        <div className="absolute top-[-25px] left-0 right-0 m-auto w-[270px]">
          <div className="max-w-[350px] m-auto bg-primary-color rounded-xl grid grid-cols-2 font-bold p-2 shadow-custom-shadow">
            <div
              className={`${
                mobileTabValue === "Rentals" ||
                tabValue === "Self-Driving" ||
                tabValue === "Driver"
                  ? "bg-white text-black shadow-custom-shadow"
                  : "text-white"
              } rounded-xl px-4 py-[8px] text-center text-sm`}
              onClick={() => {
                setMobileTabValue("Rentals"), setTabsValue("");
              }}
            >
              Rentals
            </div>
            <div
              className={`${
                tabValue === "Subscription"
                  ? "bg-white text-black shadow-custom-shadow"
                  : "text-white"
              } rounded-xl px-4 py-[8px] text-center text-sm `}
              onClick={() => {
                setTabsValue("Subscription"), setMobileTabValue("");
              }}
            >
              Subscription
            </div>
          </div>
        </div>
        {mobileTabValue === "Rentals" && (
          <div className="max-w-[230px] m-auto grid grid-cols-2 border rounded-full overflow-hidden sm:mt-0 mt-2">
            <div
              className={`${
                tabValue === "Self-Driving" || tabValue!=="Driver"
                  ? "bg-black text-white"
                  : "text-black"
              } p-2 rounded-l-full text-center px-4 flex items-center`}
              onClick={() => setTabsValue("Self-Driving")}
            >
              <input
                type="radio"
                name="select"
                id="self"
                className="accent-red-500"
                checked={tabValue !== "Driver" ? true : false}
              />
              <label className="ml-2 text-[10px]" htmlFor="self">
                Self-Driving
              </label>
            </div>
            <div
              className={`p-2 text-center px-4 flex items-center justify-center ${
                tabValue === "Driver" ? "bg-black text-white" : "text-black"
              }`}
              onClick={() => setTabsValue("Driver")}
            >
              <input
                type="radio"
                name="select"
                id="driver"
                className="accent-red-500"
              />
              <label className="ml-2 text-[10px]" htmlFor="driver">
                Driver
              </label>
            </div>
          </div>
        )}
        {mobileTabValue === "Rentals" && (
          <>
            {tabValue === "Driver" && (
              <div className="flex gap-6 w-fit m-auto mt-4">
                {driverRadioButton?.map((driver, ind) => {
                  return (
                    <div className="w-fit" key={ind}>
                      <RadioButton
                        onClick={() => setRadioToggle(driver.content)}
                        content={driver?.content}
                        name={driver?.name}
                        id={driver?.id}
                        className="text-sm"
                      />
                    </div>
                  );
                })}
                {/* <div>
                <input type="radio" name="drivertype" id="local" />
                <label>Local</label>
                </div>
                <div>
                <input type="radio" name="drivertype" id="outstation" />
                <label>Out-station</label>
                </div> */}
              </div>
            )}
          </>
        )}

        <div className="sm:mt-4 mt-3">
          {/* <label htmlFor="city" className="font-semibold">
            {radioToggle === "Local"
              ? "Select your city"
              : switchRadio === "Self Driven"
              ? "Select your city"
              : "Select your city"}
          </label> */}
          <div className="border rounded-xl bg-[#FCFBFB] p-[4px] pl-2 flex gap-2 sm:mt-2 sm:h-auto h-[50px] sm:mx-0 mx-[10px]">
            <Image
              src={"/svg/city-new.svg"}
              alt="location"
              width={16}
              height={18}
            />
            <div className="w-full flex items-center">
              {!showMobileLocationPopup && (
                <input
                  className="bg-transparent px-2 rounded-md border-0 outline-none py-1 cursor-pointer sm:text-md text-sm text-black"
                  type="text"
                  placeholder={
                    radioToggle === "Local"
                      ? "Select Your City"
                      : tabValue === "Self-Driving"
                      ? "Select Your City"
                      : "Select Your City"
                  }
                  // onClick={(e) => handleSelectMobilePopupLocation(e)}
                  onClick={(e) => handleSelectPopupLocation(e)}
                  value={selectedCity}
                  readOnly // Prevent editing directly
                />
              )}
              {showLocationPopup && (
                <>
                  {/* <input
                                        className="bg-[#FCFBFB] mt-2 px-2 rounded-md border-0 outline-none py-1 cursor-pointer w-[300px]"
                                        type="text"
                                        placeholder="All City"
                                        onClick={(e) => handleSelectPopupLocation(e)}
                                        value={selectedCity}
                                        readOnly // Prevent editing directly
                                    /> */}

                  <div className="flex flex-col justify-center items-center fixed inset-0 z-[999] bg-[#0000003c] bg-opacity-50 ">
                    <div className="flex flex-col justify-start items-center bg-white py-3 px-10 rounded-3xl shadow-md relative">
                      <Image
                        src={"/svg/close-red.svg"}
                        alt="nav"
                        width={26}
                        height={26}
                        className="absolute top-2 right-2 border rounded-full p-.5 cursor-pointer"
                        onClick={() => setShowLocationPopup(false)}
                      />

                      <div className="city-list max-w-[1095px] flex-col justify-start items-start m-auto  grid grid-cols-1 overflow-auto mb-2 no-scrollbar max-h-[300px]">
                        {cities?.map((city: any, index: number) => (
                          <div key={index}>
                            <City
                              city={city}
                              isSelected={selectedMobileCity === city.name}
                              onClick={() => handleCityClick(city.name)}
                            />
                          </div>
                        ))}
                      </div>
                      {/* <ThemeButton
                                                onClick={() => setShowMobileLocationPopup(false)}
                                                className="!rounded-full !py-2 sm:!w-[200px] !w-[120px] !font-semibold"
                                                text="Select"
                                            /> */}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          {pickupLocation !== undefined && (
            <div className="mt-2">
              {/* <label htmlFor="pickupDate" className="font-semibold">
                Pickup date
              </label> */}
              <div className="border bg-[#FCFBFB] custom-picker rounded-xl p-2 flex items-center gap-2 sm:h-auto h-[50px] sm:mx-0 mx-[10px]">
                <Image
                  src={"/svg/date-new.svg"}
                  alt="location"
                  width={16}
                  height={18}
                />
                <DatePicker
                  customInput={<CustomInput />}
                  className="cursor-pointer border-0 datepickerinput"
                  selected={startDate}
                  onChange={(date) => hanldepickupTime(date)}
                  showTimeSelect
                  filterTime={filterPassedTime}
                  dateFormat="MMMM d, yyyy h:mm aa"
                  placeholderText="Pickup date"
                  onKeyDown={(event: any) => event?.preventDefault()}
                  minDate={new Date()}
                />
              </div>
            </div>
          )}
          
          {pickupDate !== undefined && (
            <>
            {tabValue!=="Subscription" &&
            
            <div className="mt-2">
              {/* <label htmlFor="dropoffDate" className="font-semibold">
                Dropoff date
              </label> */}
              <div className="border bg-[#FCFBFB] custom-picker rounded-xl p-2 flex items-center gap-2 sm:h-auto h-[50px] sm:mx-0 mx-[10px]">
                <Image
                  src={"/svg/date-new.svg"}
                  alt="location"
                  width={16}
                  height={18}
                />
                <DatePicker
                  className="cursor-pointer datepickerinput"
                  selected={dropDate}
                  onChange={(date) => hanldedropoffTime(date)}
                  showTimeSelect
                  filterTime={filterPassedTime}
                  dateFormat="MMMM d, yyyy h:mm aa"
                  placeholderText="Dropoff date"
                  onKeyDown={(event) => event?.preventDefault()}
                  minDate={pickupDateTime}
                />
              </div>
            </div>
            }
            </>
          )}
          {dropOffLocation && (
            <div className="mt-2 h-[75px] flex w-full lg:gap-4 gap-2 lg:mr-6 mr-2 border-black">
              <div className="grid ml-[14px] mt-2">
                <label
                  htmlFor="dropoff"
                  className="lg:text-xl text-md font-semibold"
                >
                  Drop-off location
                </label>
                <div className="flex">
                  <Image
                    src={"/svg/city-new.svg"}
                    alt="location"
                    width={16}
                    height={18}
                  />
                  <input
                    type="text"
                    value={dropOffLocation}
                    className="outline-none p-[8px] max-w-[280px] sm:text-md text-sm"
                    readOnly
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        {tabValue!=="Subscription" &&
        
        <div className="flex sm:gap-4 flex-col items-center gap-1 w-fit py-2 sm:px-6 rounded-md m-auto sm:mt-4">
          <strong
            onClick={(e) => handleDropSelectPopupLocation(e)}
            className="text-[#ff0000] cursor-pointer sm:text-md text-sm"
          >
            Drop in different city?
          </strong>{" "}
          {durationFormat && (
            <div className="flex items-center gap-[5px] bg-[#FCFBFB] px-4 py-2 border-md">
              <strong>Duration :</strong>{" "}
              <p className="text-sm font-semibold mt-[2px]">{durationFormat}</p>
            </div>
          )}
          {showDropLocationPopup && (
            <>
              <div className="flex flex-col justify-center items-center fixed inset-0 z-[999] bg-[#0000003c] bg-opacity-50">
                <div className="flex flex-col justify-start items-center bg-white py-3 px-10 rounded-3xl shadow-md relative">
                  <Image
                    src={"/svg/close-red.svg"}
                    alt="nav"
                    width={26}
                    height={26}
                    className="absolute top-2 right-2 border rounded-full p-.5 cursor-pointer"
                    onClick={() => setShowDropLocationPopup(false)}
                  />
                  <div className="city-list max-w-[1095px] flex-col justify-start items-start m-auto  grid grid-cols-1 overflow-auto mb-2 no-scrollbar max-h-[300px] ">
                    {cities?.map((city: any, index: number) => (
                      <div key={index}>
                        <City
                          city={city}
                          isSelected={dropSelectedMobileCity === city.name}
                          onClick={() => handleDropOffMobileCity(city.name)}
                        />
                      </div>
                    ))}
                  </div>
                  {/* <ThemeButton
                                        onClick={() => setShowDropLocationPopup(false)}
                                        className="!rounded-full !py-2 sm:!w-[200px] !w-[120px] !font-semibold"
                                        text="Select"
                                    /> */}
                </div>
              </div>
            </>
          )}
        </div>
        }
        <div className="m-auto w-[80%] mt-4">
          <ThemeButton
            className="font-semibold text-sm rounded-xl shadow-custom-shadow gap-2 !py-2 w-full !px-2 !py-[12px]"
            text="Start Your Journey"
            onClick={() => saveLocationDataMobile()}
            // rightArrowIcon
            // image={"/svg/race.svg"}
          />
        </div>
      </div>
    </>
  );
}

const driverRadioButton = [
  {
    content: "Local",
    id: "local",
    name: "driver",
  },
  {
    content: "Out-station",
    id: "outstation",
    name: "driver",
  },
];
const outstation = [
  {
    id: "location",
    imageUrl: "/svg/location.svg",
    heading: "Select your city",
    desc: "Enter pick-up city",
    cities: [
      {
        city: "Noida",
      },
      {
        city: "Meerut",
      },
      {
        city: "Ghaziabad",
      },
      {
        city: "Agra",
      },
      {
        city: "Kanpur",
      },
    ],
  },
  {
    id: "date",
    imageUrl: "/svg/calender.svg",
    heading: "Pick Up Date",
    desc: "Enter pickup date",
  },
  {
    id: "date",
    imageUrl: "/svg/calender.svg",
    heading: "Drop-off Date",
    desc: "Enter drop-off date",
  },
];
const localDriverArray = [
  {
    id: "location",
    imageUrl: "/svg/location.svg",
    heading: "Select your city",
    desc: "Enter pick-up Location",
    cities: [
      {
        city: "Noida",
      },
      {
        city: "Meerut",
      },
      {
        city: "Ghaziabad",
      },
      {
        city: "Agra",
      },
      {
        city: "Kanpur",
      },
    ],
  },
  {
    id: "date",
    imageUrl: "/svg/calender.svg",
    heading: "Pick Up Date",
    desc: "Enter pickup date",
    cities: [
      {
        city: "Noida",
      },
      {
        city: "Meerut",
      },
      {
        city: "Ghaziabad",
      },
      {
        city: "Agra",
      },
      {
        city: "Kanpur",
      },
    ],
  },

  {
    id: "date",
    imageUrl: "/svg/calender.svg",
    heading: "Drop-off Date",
    desc: "Enter drop-off date",
    cities: [
      {
        city: "Noida",
      },
      {
        city: "Meerut",
      },
      {
        city: "Ghaziabad",
      },
      {
        city: "Agra",
      },
      {
        city: "Kanpur",
      },
    ],
  },
];
const tabsArray = [
  {
    tabsValue: "Driver",
  },
  {
    tabsValue: "Self-Driving",
  },
  {
    tabsValue: "Subscription",
  },
];
const chooseArray = [
  {
    imageUrl: "/png/car01.svg",
    width: 132,
    height: 93,
    title: "Safe and Sanitized Car",
    desc: "Your safety is our priority, with a car that's sanitized for purity.",
  },
  {
    imageUrl: "/png/car02.svg",
    width: 132,
    height: 93,
    title: "No Hidden Charges",
    desc: "What you see is what you get, no hidden charges to fret.",
  },
  {
    imageUrl: "/png/car03.svg",
    width: 132,
    height: 93,
    title: "Doorstep Delivery",
    desc: "Your new ride, right to your door, with service you'll adore.",
  },
  {
    imageUrl: "/png/car04.svg",
    width: 132,
    height: 93,
    title: "Insurance included",
    desc: "Your new ride, right to your door, with service you'll adore.",
  },
  {
    imageUrl: "/png/car05.svg",
    width: 132,
    height: 93,
    title: "Brand New Fleets",
    desc: "Your safety is our priority, with a car that's sanitized for purity.",
  },
  {
    imageUrl: "/png/car06.svg",
    width: 132,
    height: 93,
    title: "Road Side Assistance",
    desc: "What you see is what you get, no hidden charges to fret.",
  },
  {
    imageUrl: "/png/car07.svg",
    width: 32,
    height: 93,
    title: "Flexible Kms",
    desc: "Your new ride, right to your door, with service you'll adore.",
  },
  {
    imageUrl: "/png/car08.svg",
    width: 132,
    height: 93,
    title: "Vehicle Health Check",
    desc: "Your new ride, right to your door, with service you'll adore.",
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
const subscriptionPackage = [
    {
        package:"15 Days"
    },
    {
        package:"30 Days"
    },
    {
        package:"1 Month"
    },
    {
        package:"3 Months"
    },
    {
        package:"6 Months"
    },
    {
        package:"1 Year"
    },
    
]