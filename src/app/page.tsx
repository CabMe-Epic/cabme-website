"use client";
import Image from "next/image";
import ThemeButton from "./components/theme-button/theme-button";
import OfferCards from "./components/offer-cards/offer-cards";
import ReviewCard from "./components/review-card/review-card";
import FaqSection from "./components/faq/faq";
import FleetsSlider from "./components/slider/slider-components";
import OurBlogs from "./components/our-blogs/our-blogs";
import React, { useEffect, useState } from "react";
import RadioButton from "./components/radio-component/radio-component";
import { getAllCities } from "../../networkRequests/hooks/api";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Datepicker.css";
import moment from 'moment';
import BannerSlider from "./components/banner-slider/banner-slider";


export default function Home() {
  // const [startDate, setStartDate] = useState(
  //   setHours(setMinutes(new Date(), 0), 9),
  // );
  const [startDate, setStartDate] = useState<any>();
  const [dropDate, setDropDate] = useState<any>();
  console.log(startDate, "sun");

  const filterPassedTime = (time: any) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

  const router = useRouter();

  const [tabValue, setTabsValue] = useState("Self-Driving");
  const [mobileTabValue, setMobileTabValue] = useState("Rentals");
  const [mobilePickuptime, setMobilepickuptime] = useState("");
  const [mobileDroplocation, setMobiledropCities] = useState("");
  const [mobilDropdate, setMobiledropdate] = useState("");
  const [switchRadio, setSwitchRadio] = useState("Self Driven");
  const [radioToggle, setRadioToggle] = useState("Out-station");
  console.log(radioToggle, "radio");

  const [pickupLocation, setPickupLocation] = useState<any>();
  const [dropOffLocation, setDropoffLocation] = useState<any>();
  const [pickupDate, setPickupDate] = useState<any>();
  const [dropOffDate, setDropoffDate] = useState<any>();
  const [pickupTime, setPickupTime] = useState<any>();
  const [dropoffTime, setDropoffTime] = useState<any>();

  const [mobilestartCity, setMobilestartCity] = useState("select");
  const [mobileStartDate, setMobileStartDate] = useState(null);
  const [mobileStartTime, setMobileStartTime] = useState(null);
  const [mobileEndCity, setMobileEndCity] = useState("select");
  const [mobileEndDate, setMobileEndDate] = useState(null);
  const [mobileEndTime, setMobileEndTime] = useState(null);

  const handlePickupLocation = (event: any) => {
    setPickupLocation(event.target.value);
  };

  const handleDropOffLocation = (event: any) => {
    setDropoffLocation(event.target.value);
  };

  console.log(pickupLocation, "213 pickup location");
  console.log(dropOffLocation, "213 dropOff location");
  console.log(pickupDate, "213pickup date");
  console.log(dropOffDate, "213dropOff date");

  const saveLocationData = () => {
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

    const pickupDateTime = new Date(`${pickupDate}T${pickupTime}`);
    const dropoffDateTime = new Date(`${dropOffDate}T${dropoffTime}`);

    if (pickupDateTime >= dropoffDateTime) {
      alert("Drop-off date and time should be later than Pickup date and time");
      return;
    }

    localStorage.setItem("pickupLocation", pickupLocation || mobilestartCity);
    localStorage.setItem("dropOffLocation", dropOffLocation || mobileEndCity);
    localStorage.setItem("pickupDate", pickupDate || mobileStartDate);
    localStorage.setItem("dropOffDate", dropOffDate || mobileEndDate);
    localStorage.setItem("tabValue", tabValue || switchRadio);
    localStorage.setItem("pickupTime", pickupTime || mobileStartTime);
    localStorage.setItem("dropoffTime", dropoffTime || mobileEndTime);

    if (tabValue === "Driver") {
      localStorage.setItem("radioToggle", radioToggle);
    }

    router.push("/car-listing");
  };


  console.log(pickupTime, dropoffTime, "pickupTime")

  // location section work end

  const [cities, setCities] = useState<[]>();



  const getRecords = React.useCallback(async () => {
    const citiesResponse = await getAllCities();
    const cities = citiesResponse?.data?.response;
    setCities(cities);
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
  const hanldepickupTime = (event: any) => {
    // setPickupTime(event.target.value);
    setStartDate(event);

    console.log(event, "timeee");
    const result = convert(event);
    setPickupDate(result);
    const getpickupTime = convertTime(event);
    setPickupTime(getpickupTime);
    console.log(getpickupTime, "pkk");

    // console.log(result, "resss");
  };
  //extracting date from calender

  const hanldedropoffTime = (event: any) => {
    console.log(event, "joo");
    // setDropoffTime(event?.target?.value);
    const result = convert(event);
    if (pickupDate === undefined || pickupTime === undefined) {
      alert("Please Select the Pickup Date & Time")
      return;
    }
    else {
      setDropDate(event);
      setDropoffDate(result)
      const getDropoffTime = convertTime(event);
      setDropoffTime(getDropoffTime);
      console.log(getDropoffTime, "drrrr");
    }

    // console.log(event, "dropoff time");


  };

  if (typeof window !== "undefined") {
    localStorage.setItem("pickupTime", pickupTime);
    localStorage.setItem("dropoffTime", dropoffTime);
  }

  const handleStartDateTimeChange = (date: any) => {
    
    if (date) {
      setMobileStartDate(moment(date).format('YYYY-MM-DD') as any);
      setMobileStartTime(moment(date).format('HH:mm') as any);
    } else {
      setMobileStartDate(null);
      setMobileStartTime(null);
    }
  };

  const handleDateTimeChange = (date: any) => {
    if (date) {
      setMobileEndDate(moment(date).format('YYYY-MM-DD') as any);
      setMobileEndTime(moment(date).format('HH:mm') as any);
    } else {
      setMobileEndDate(null);
      setMobileEndTime(null);
    }
  };

  const handleDateChange = (date: any, setDate: any) => {
    setDate(moment(date).format('YYYY-MM-DD'));
  };

  const handleTimeChange = (time: any, setTime: any) => {
    setTime(moment(time).format('HH:mm'));
  };

  console.log(mobilestartCity, mobileStartDate, mobileStartTime, "mobile");
  console.log(mobileEndCity, mobileEndDate, mobileEndTime, "mobilee");

  const [offer, setOffer] = useState("Daily Offers");
  console.log(switchRadio, "tabValue")
  console.log(tabValue, "tabValue")
  console.log(startDate, "startDate")

  return (
    <>
      <div
        className=" rounded-2xl sm:py-0 sm:mx-20 sm:mt-4 mt-2 mx-2 rounded-xl overflow-hidden"
        style={{ backgroundSize: "100% 100%" }}
      >
        <BannerSlider />
        {/* <Image src={"/latest-home.png"} alt="banner" width={1650} height={950} className="w-full h-auto" /> */}
        {/* <div className="sm:max-w-[1250px] max-w-[250px] w-full sm:m-auto px-4">
          <h1 className="sm:text-4xl text-[20px] font-semibold sm:mt-8 mt-2">
            Experience innovation on
          </h1>
          <div className="sm:mt-2">
            <p className="text-[12px]">
              <span>wheels with our</span>{" "}
              <b className="text-primary sm:text-xl text-[12px]">
                brand-new selection of cars.
              </b>
            </p>
          </div>
        </div> */}
      </div>
      <div className="max-w-[1250px] h-[230px] sm:grid w-full hidden m-auto mb-20 shadow-xl border rounded-xl px-6 py-12 relative z-[99]">
        <div className="max-w-[700px] flex m-auto justify-between border shadow-custom-shadow rounded-2xl overflow-hidden absolute left-0 right-0 top-[-30px] w-full">
          {tabsArray?.map((value, ind) => {
            return (
              <div
                className={`cursor-pointer w-full text-center py-6 text-lg ${value?.tabsValue === tabValue
                  ? "bg-primary-color text-white font-semibold"
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
            <div className="flex gap-6 w-fit m-auto mt-6 w-fit">
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
                      className={`flex w-full gap-4 ${index < 3 ? "border-r-2 mr-6 border-black" : ""
                        }`}
                    >
                      <div className="mt-2">
                        <Image
                          src={item?.imageUrl}
                          alt="icon"
                          width={16}
                          height={16}
                        />
                      </div>
                      <div className="leading-none">
                        <h3 className="text-xl font-semibold">
                          {item?.heading}
                        </h3>
                        {item?.id === "location" && (
                          <select
                            name="pickup"
                            id="pickup"
                            className="w-full outline-red-500 h-8 text-xs"
                            onChange={
                              item?.heading === "Pick-up Location"
                                ? (e) => handlePickupLocation(e)
                                : (ev) => handleDropOffLocation(ev)
                            }
                          >
                            <option value={item?.desc} className="text-sm">
                              {item?.desc}
                            </option>
                            {cities?.map((value: any, ind) => {
                              return (
                                <option key={ind} value={value?.name}>
                                  {value?.name}
                                </option>
                              );
                            })}
                          </select>
                        )}
                        {item?.id === "date" && (
                          <div className="flex gap-2">
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
                            /> */}<DatePicker
                              className="cursor-pointer"
                              selected={
                                item?.heading === "Pick Up Date"
                                  ? startDate
                                  : dropDate
                              }

                              onChange={
                                item?.heading === "Pick Up Date"
                                  ? (date) => hanldepickupTime(date)
                                  : (date) => hanldedropoffTime(date)
                                // (date) => setStartDate(date)
                              }
                              showTimeSelect
                              filterTime={filterPassedTime}
                              dateFormat="MMMM d, yyyy h:mm aa"
                  onKeyDown={(event)=>event?.preventDefault()}

                            />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}

                <div>

                  <ThemeButton
                    text="Search"
                    className="px-8 !py-[10px] relative right-6"
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
                      className={`flex w-full gap-4 ${index < 3 ? "border-r-2 mr-6 border-black" : ""
                        }`}
                    >
                      <div className="mt-2">
                        <Image
                          src={item?.imageUrl}
                          alt="icon"
                          width={16}
                          height={16}
                        />
                      </div>
                      <div className="leading-none">
                        <h3 className="text-xl font-semibold">
                          {item?.heading}
                        </h3>

                        {item?.id === "location" && (
                          <select
                            name="loc"
                            id="loc"
                            className="w-full outline-red-500 h-8 text-xs"
                            onChange={
                              item?.heading === "Pick-up Location"
                                ? (e) => handlePickupLocation(e)
                                : (ev) => handleDropOffLocation(ev)
                            }
                          >
                            <option value={item?.desc}>{item?.desc}</option>
                            {cities?.map((value: any, ind) => {
                              return (
                                <option key={ind} value={value?.name}>
                                  {value?.name}
                                </option>
                              );
                            })}
                          </select>
                        )}
                        {item?.id === "date" && (
                          <div className="flex gap-2">
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
                              className="cursor-pointer"
                              selected={
                                item?.heading === "Pick Up Date"
                                  ? startDate
                                  : dropDate
                              }
                              onChange={
                                item?.heading === "Pick Up Date"
                                  ? (date) => hanldepickupTime(date)
                                  : (date) => hanldedropoffTime(date)
                                // (date) => setStartDate(date)
                              }
                              showTimeSelect
                              filterTime={filterPassedTime}
                              dateFormat="MMMM d, yyyy h:mm aa"
                  onKeyDown={(event)=>event?.preventDefault()}

                            />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}

                <div>
                  <ThemeButton
                    text="Search"
                    className="px-8 !py-[10px] relative right-6"
                    onClick={() => saveLocationData()}
                  />
                </div>
              </div>
            )}
          </>
        )}

        {tabValue === "Subscription" && (
          <>
            <div className="flex items-center mt-6 w-full">
              {outstation?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={`flex w-full gap-4 ${index < 3 ? "border-r-2 mr-6 border-black" : ""
                      }`}
                  >
                    <div className="mt-2">
                      <Image
                        src={item?.imageUrl}
                        alt="icon"
                        width={16}
                        height={16}
                      />
                    </div>
                    <div className="leading-none">
                      <h3 className="text-xl font-semibold">{item?.heading}</h3>
                      {item?.id === "location" && (
                        <select
                          name="pickup"
                          id="pickup"
                          className="w-full outline-red-500 h-8 text-xs"
                          onChange={
                            item?.heading === "Pick-up Location"
                              ? (e) => handlePickupLocation(e)
                              : (ev) => handleDropOffLocation(ev)
                          }
                        >
                          <option value={item?.desc}>{item?.desc}</option>
                          {cities?.map((value: any, ind) => {
                            return (
                              <option key={ind} value={value?.name}>
                                {value?.name}
                              </option>
                            );
                          })}
                        </select>
                      )}
                      {item?.id === "date" && (
                        <div className="flex gap-2">
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
                            className="cursor-pointer"
                            selected={
                              item?.heading === "Pick Up Date"
                                ? startDate
                                : dropDate
                            }
                            onChange={
                              item?.heading === "Pick Up Date"
                                ? (date) => hanldepickupTime(date)
                                : (date) => hanldedropoffTime(date)
                              // (date) => setStartDate(date)
                            }
                            showTimeSelect
                            filterTime={filterPassedTime}
                            dateFormat="MMMM d, yyyy h:mm aa"
                  onKeyDown={(event)=>event?.preventDefault()}

                          />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
              <div>
                <ThemeButton
                  text="Search"
                  className="px-8 !py-[10px] relative right-6"
                  onClick={() => saveLocationData()}
                />
              </div>
            </div>
          </>
        )}
        {tabValue === "Self-Driving" && (
          <div className="flex items-center mt-6 w-full">
            {localDriverArray?.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`xl:h-fit h-full flex w-full lg:gap-4 gap-2 ${index < 3 ? "border-r-2 lg:mr-6 mr-2 border-black" : ""
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
                  <div className="leading-none">
                    <h3 className="lg:text-xl text-lg font-semibold">{item?.heading}</h3>
                    {item?.id === "location" && (
                      <select
                        name="location"
                        id="location"
                        className="w-full outline-red-500 h-8 text-xs"
                        onChange={
                          item?.heading === "Pick-up Location"
                            ? (e) => handlePickupLocation(e)
                            : (ev) => handleDropOffLocation(ev)
                        }
                      >
                        <option value={item?.desc}>{item?.desc}</option>
                        {cities?.map((value: any, ind) => {
                          return (
                            <option key={ind} value={value?.name}>
                              {value?.name}
                            </option>
                          );
                        })}
                      </select>
                    )}
                    {item?.id === "date" && (
                      <div className="flex flex-col gap-2 mt-2">
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
                          className="cursor-pointer"
                          selected={
                            item?.heading === "Pick Up Date"
                              ? startDate
                              : dropDate
                          }
                          onChange={
                            item?.heading === "Pick Up Date"
                              ? (date) => hanldepickupTime(date)
                              : (date) => hanldedropoffTime(date)
                            // (date) => setStartDate(date)
                          }
                          showTimeSelect
                          filterTime={filterPassedTime}
                          dateFormat="MMMM d, yyyy h:mm aa"
                          placeholderText={item?.heading === "Pick Up Date" && !startDate ? "DD-MM-YYYY" : (item?.heading !== "Pick Up Date" && !dropDate ? "DD-MM-YYYY" : "")}
                  onKeyDown={(event)=>event?.preventDefault()}

                        />

                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            <div className="lg:block hidden">
              <ThemeButton
                className="px-8 !py-[10px] relative right-6"
                text="Search"
                onClick={() => saveLocationData()}
              />
            </div>
          </div>
        )}
        <div className="lg:hidden block mt-4">
          <ThemeButton
            className="px-8 !py-[10px] relative right-6 m-auto"
            text="Search"
            onClick={() => saveLocationData()}
          />
        </div>
      </div>
      {/* Only mobile section subsription */}
      <div className="relative max-w-[340px] sm:hidden block sm:mb-16 mb-10 m-auto border rounded-xl shadow-custom-shadow w-full px-4 pt-16 pb-4 sm:my-6 my-4 z-[9]">
        <div className="absolute top-[-25px] left-0 right-0 m-auto w-[270px]">
          <div className="max-w-[350px] m-auto bg-primary-color rounded-xl grid grid-cols-2 font-bold p-2 shadow-custom-shadow">
            <div
              className={`${mobileTabValue === "Rentals" ? "bg-white text-black shadow-custom-shadow" : ""
                } rounded-xl px-4 py-[8px] text-center text-sm`}
              onClick={() => setMobileTabValue("Rentals")}
            >
              Rentals
            </div>
            <div
              className={`${mobileTabValue === "Subscriptions"
                ? "bg-white text-black shadow-custom-shadow"
                : "text-white"
                } rounded-xl px-4 py-[8px] text-center text-sm `}
              onClick={() => setMobileTabValue("Subscriptions")}
            >
              Subscriptions
            </div>
          </div>
        </div>
        {mobileTabValue === "Rentals" && (
          <div className="max-w-[280px] m-auto grid grid-cols-2 border rounded-full overflow-hidden">
            <div
              className={`${switchRadio === "Self Driven"
                ? "bg-black text-white"
                : "text-black"
                } p-2 rounded-l-full text-center px-4 flex items-center`}
              onClick={() => setSwitchRadio("Self Driven")}
            >
              <input
                type="radio"
                name="select"
                id="self"
                className="accent-red-500"
                checked={switchRadio === "Self Driven" ? true : false}
              />
              <label className="ml-2 text-sm" htmlFor="self">
                Self Driven
              </label>
            </div>
            <div
              className={`p-2 text-center px-4 flex items-center justify-center ${switchRadio === "Driver" ? "bg-black text-white" : "text-black"
                }`}
              onClick={() => setSwitchRadio("Driver")}
            >
              <input
                type="radio"
                name="select"
                id="driver"
                className="accent-red-500"
              />
              <label className="ml-2 text-sm" htmlFor="driver">
                Driver
              </label>
            </div>
          </div>
        )}
        {mobileTabValue === "Rentals" && (
          <>
            {switchRadio === "Driver" && (
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

        <div className="mt-4">
          <label htmlFor="city" className="font-semibold">
            {radioToggle === "Local"
              ? "Pick-up location"
              : switchRadio === "Self Driven"
                ? "Pick-up location"
                : "Pick-up City"}
          </label>
          <div className="border rounded-xl p-2 flex gap-2 mt-2">
            <Image
              src={"/svg/location-gray.svg"}
              alt="location"
              width={16}
              height={18}
            />
            <div className="w-full">
              <select
                name="city"
                id="city"
                className="w-full outline-none text-sm"
                onChange={(event) => setMobilestartCity(event.target.value)}
              >
                <option value="select">Select your city</option>
                {cities?.map((value: any, ind) => (
                  <option key={ind} value={value.name}>
                    {value.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {mobilestartCity !== "select" && (
            <div className="mt-2">
              <label htmlFor="pickupDate" className="font-semibold">
                Pickup date
              </label>
              <div className="border rounded-xl p-2 flex items-center gap-2">
                <Image
                  src={"/date.svg"}
                  alt="location"
                  width={16}
                  height={18}
                />
                <DatePicker
                  selected={mobileStartDate ? moment(`${mobileStartDate} ${mobileStartTime}`, 'YYYY-MM-DD HH:mm').toDate() : null}
                  onChange={handleStartDateTimeChange}
                  showTimeSelect
                  dateFormat="yyyy-MM-dd HH:mm"
                  placeholderText="Select date and time"                  
                  onKeyDown={(event)=>event?.preventDefault()}
                  
                />
              </div>
            </div>
          )}
          {mobileStartDate && (

            <div className="mt-2 mb-2">
              <label htmlFor="dropoffCity" className="font-semibold">
                Drop-off City
              </label>
              <div className="border rounded-xl p-2 flex gap-2 mt-2">
                <Image
                  src={"/svg/location-gray.svg"}
                  alt="location"
                  width={16}
                  height={18}
                />      <select
                  name="dropoffCity"
                  id="dropoffCity"
                  className="w-full outline-none text-sm"
                  onChange={(event) => setMobileEndCity(event.target.value)}
                >
                  <option value="select">Select your city</option>
                  {cities?.map((value: any, ind) => (
                    <option key={ind} value={value.name}>
                      {value.name}
                    </option>
                  ))}
                </select></div>

            </div>
          )}
          {mobileEndCity !== "select" && (
            <div className="mt-2">
              <label htmlFor="dropoffDate" className="font-semibold">
                Dropoff date
              </label>
              <div className="border rounded-xl p-2 flex items-center gap-2">
                <Image
                  src={"/date.svg"}
                  alt="location"
                  width={16}
                  height={18}
                />
                <DatePicker
                  selected={mobileEndDate ? moment(`${mobileEndDate} ${mobileEndTime}`, 'YYYY-MM-DD HH:mm').toDate() : null}
                  onChange={handleDateTimeChange}
                  showTimeSelect
                  dateFormat="yyyy-MM-dd HH:mm"
                  placeholderText="Select date and time"
                  onKeyDown={(event)=>event?.preventDefault()}

                />
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center gap-1 bg-[#FCFBFB] w-fit py-2 px-6 rounded-md m-auto mt-4">
          <strong>Duration :</strong> <p className="text-sm">3 Days and 9 hours</p>
        </div>
        <div className="m-auto w-[80%] mt-4">
          <ThemeButton
            className="font-semibold text-sm rounded-xl shadow-custom-shadow gap-2 !py-2 w-full !px-2 !py-[12px]"
            text="Start Your Journey"
            onClick={() => saveLocationData()}
          // rightArrowIcon
          // image={"/svg/race.svg"}
          />
        </div>
      </div>
      <div className="max-w-[1250px] w-full m-auto">
        <h2 className="sm:text-4xl text-2xl sm:mt-0 mt-0 font-semibold text-center">
          Trending <span className="text-primary"> offers</span>
        </h2>
        <div className="w-fit flex justify-center m-auto text-md font-semibold sm:mt-6 sm:mb-6 mt-6 mb-0">
          <div
            className={`sm:py-4 py-2 sm:px-8 px-4 sm:text-md text-xs ${offer === "Daily Offers" ? "bg-primary-color" : "bg-black"} text-white rounded-l-full cursor-pointer`}
            onClick={() => setOffer("Daily Offers")}
          >
            Daily Offers
          </div>
          <div
            className={`sm:py-4 py-2 sm:px-8 px-4 sm:text-md text-xs ${offer === "Daily Offers" ? "bg-black" : "bg-primary-color"} text-white rounded-r-full cursor-pointer`}
            onClick={() => setOffer("Monthly Offers")}
          >
            Monthly Offers
          </div>
        </div>
        {offer === "Daily Offers" && <div className="mx-4 sm:mt-0 mt-4 offerCards"> <OfferCards dailyOffer /> </div>}
        {offer === "Monthly Offers" &&
          <div className="mx-4 sm:mt-0 mt-4 offerCards">
            <OfferCards monthlyOffer />
          </div>

        }
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
                  className="text-center cursor-pointer content-center grid sm:gap-4 gap-2 h-[250px] sm:hover:shadow-xl sm:hover:rounded-xl sm:hover:border"
                >
                  <div className="flex sm:h-auto h-[100px]">
                    <Image
                      src={value?.imageUrl}
                      alt="image"
                      width={value?.width}
                      height={value?.height}
                      className="m-auto sm:h-[80px] h-auto sm:w-auto w-[90px]"
                    />
                  </div>
                  <div className="sm:px-4">
                    <h3 className="font-semibold line-clamp-1">{value?.title}</h3>
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
          <FleetsSlider />
        </div>
      </div>
      <div className="lg:max-w-[1250px] max-w-[750px] m-auto sm:my-16 my-10 mx-auto">
        <h2 className="sm:text-4xl text-2xl font-semibold text-center">
          Make <span className="text-primary"> 4 steps</span> to rent a car
        </h2>
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-8 sm:mt-12 mt-6">
          {rentCollection?.map((item, index) => {
            return (
              <div
                key={index}
                className={`sm:p-6 p-2 relative sm:w-[261px] w-[200px] sm:h-[261px] h-[200px] lg:m-0 m-auto ${index % 2 === 0 ? "shadow-bottom-shadow" : "shadow-top-shadow"} m-auto rounded-full sm:pb-0 pb-8 sm:px-0 px-8`}
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
                    <h3 className="font-semibold text-xl sm:leading-[26px] leading-none">{item?.title}</h3>
                    <p className="text-xs mt-2 sm:!w-[180px] !w-[130px] m-auto">{item?.desc}</p>
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
              5% <span className="font-normal">OFF</span>
            </h3>
            <div className="border-b border-black lg:text-xl sm:text-lg text-[12px] sm:my-2 sm:pb-4 text-[#909090]">
              <span>Car Rental Discount</span> <br />
              <span>until May 21st 2024</span>
            </div>
            <h4 className="font-semibold text-sm sm:text-[28px]">
              DISCOUNT CODE : <span className="text-primary">NEW5</span>
            </h4>
          </div>
          <div className="flex justify-end">
            <Image src={"/png/thar-new-left.png"} alt="thar" width={543} height={280} />
          </div>
        </div>
        <div className="bg-primary-color sm:w-[120px] w-[80px] text-white sm:p-4 p-2 flex items-center font-semibold sm:text-2xl text-md text-center">
          <div>
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
        className="grid sm:grid-cols-2 gap-4 px-4 py-8 rounded-xl m-4 bg-[#FCE2E2] sm:my-16 my-10"
        style={{ boxShadow: "0px 1px 18.1px 2px #FF000080" }}
      >
        <div className="max-w-[550px] m-auto">
          <h3 className="font-bold lg:text-3xl text-2xl">
            <span className="text-primary">Download</span> our app to get <br />
            most out of it
          </h3>
          <p className="lg:my-8 my-4 sm:text-md text-sm">
            Thrown shy denote ten ladies though ask saw. Or by to he going think
            order event music. Incommode so intention defective at convinced.
            Led income months itself and houses you.
          </p>
          <div className="flex sm:justify-start justify-center sm:gap-12 gap-4">
            <button>
              <Image
                src={"/png/play-store.png"}
                alt="play-store"
                width={179}
                height={77}
                className="lg:w-[179px] sm:w-full w-[110px]"
              />
            </button>
            <button>
              <Image
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
            src={"/png/app.png"}
            alt="app"
            width={700}
            height={550}
            className="w-full lg:h-[532px]"
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
          <p className="lg:text-5xl sm:text-3xl text-2xl font-bold sm:my-2">CAR</p>
          <p className="lg:text-5xl sm:text-3xl text-3xl font-bold text-primary">RENTAL</p>
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
              <li className="text-white">
                Only ₹5,000{" "}
                <span className="text-primary">refundable deposit</span>
              </li>
              <li className="text-white">
                No loan liability,{" "}
                <span className="text-primary">zero down payment</span>
              </li>
              <li className="text-white">
                Insurance & maintained{" "}
                <span className="text-primary">included</span>
              </li>
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea{" "}
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
      {/* blogs section desktop */}
      <OurBlogs />
      {/* blogs section mobile */}

      {/* facts */}
      <div className="my-12 bg-black sm:py-10 sm:px-10 py-6 px-2">
        <h2 className="text-center font-bold sm:text-4xl text-2xl text-white">
          Facts By The <span className="text-primary"> Numbers</span>
        </h2>
        <p className="text-[#E5DADA] text-center my-2 sm:text-md text-xs">
          Lorem Ipsum has been the industry&apos;s standard <br /> dummy text
          ever since the 1500s,
        </p>
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
    heading: "Pick-up City",
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
    id: "location",
    imageUrl: "/svg/location.svg",
    heading: "Drop-off City",
    desc: "Enter drop-off city",
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
  },
];
const localDriverArray = [
  {
    id: "location",
    imageUrl: "/svg/location.svg",
    heading: "Pick-up Location",
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
    id: "location",
    imageUrl: "/svg/location.svg",
    heading: "Drop-off Location",
    desc: "Enter drop-off Location",
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
    imageUrl: "/png/car01.png",
    width: 139,
    height: 132,
    title: "Safe and Sanitized Car",
    desc: "Your safety is our priority, with a car that's sanitized for purity.",
  },
  {
    imageUrl: "/png/car02.png",
    width: 164,
    height: 132,
    title: "No Hidden Charges",
    desc: "What you see is what you get, no hidden charges to fret.",
  },
  {
    imageUrl: "/png/car03.png",
    width: 127,
    height: 95,
    title: "Doorstep Delivery",
    desc: "Your new ride, right to your door, with service you'll adore.",
  },
  {
    imageUrl: "/png/car04.png",
    width: 136,
    height: 132,
    title: "Insurance included",
    desc: "Your new ride, right to your door, with service you'll adore.",
  },
  {
    imageUrl: "/png/car05.png",
    width: 197,
    height: 132,
    title: "Brand New Fleets",
    desc: "Your safety is our priority, with a car that's sanitized for purity.",
  },
  {
    imageUrl: "/png/car06.png",
    width: 164,
    height: 132,
    title: "Road Side Assistance",
    desc: "What you see is what you get, no hidden charges to fret.",
  },
  {
    imageUrl: "/png/car07.png",
    width: 95,
    height: 95,
    title: "Flexible Kms",
    desc: "Your new ride, right to your door, with service you'll adore.",
  },
  {
    imageUrl: "/png/car08.png",
    width: 191,
    height: 73,
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
