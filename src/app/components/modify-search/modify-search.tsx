import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React, { useEffect, useRef, useState } from "react";
import ThemeButton from "../theme-button/theme-button";
import { getAllCities } from "../../../../networkRequests/hooks/api";
import moment from "moment";
import City from "../city-selection-2/city-selection-2";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  setPickupLocationRedux,
  setDropOffLocationRedux,
  setPickupDateRedux,
  setDropOffDateRedux,
  setPickupTimeRedux,
  setDropoffTimeRedux,
  setTabValueRedux,
  setNonFormatedPickupDateRedux,
  setNonFormatedDropoffDateRedux,
  setRadioToggleRedux,
} from "../../../../redux/slices/locationSlice";

const ModifySearch: React.FC = () => {
  const dispatch = useDispatch();

  const route = useRouter();
  const [cities, setCities] = useState<{ name: string }[] | undefined>([]);
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedDropCity, setSelectedDropCity] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<string | null>(null);
  const [endTime, setEndTime] = useState<string | null>(null);
  const [tabValue, setTabsValue] = useState<any>();
  const [radioToggle, setRadioToggle] = useState<any>();
  const datePickerRef = useRef<any>(null);
  const datePickerRef1 = useRef<any>(null);

  const handleImageClick = () => {
    if (datePickerRef.current) {
      datePickerRef.current.setFocus();
    }
  };

  const handleImageClick1 = () => {
    if (datePickerRef1.current) {
      datePickerRef1.current.setFocus();
    }
  };

  const handleStartDateTimeChange = (date: Date | null) => {
    if (date) {
      // localStorage.setItem(
      //   "nonFormatedPickupDate",
      // );
      dispatch(setNonFormatedPickupDateRedux( moment(date).format("YYYY-MM-DDTHH:mm:ss.SSSZ")))

      setStartDate(date);
      setStartTime(moment(date).format("HH:mm"));
    }
  };

  const handleEndDateTimeChange = (date: Date | null) => {
    if (date) {
      // localStorage.setItem(
      //   "nonFormatedDropoffDate",
      //   moment(date).format("YYYY-MM-DDTHH:mm:ss.SSSZ")
      // );

      dispatch(setNonFormatedDropoffDateRedux( moment(date).format("YYYY-MM-DDTHH:mm:ss.SSSZ")))

      setEndDate(date);
      setEndTime(moment(date).format("HH:mm"));
    }
  };

  useEffect(() => {
    const getCities = async () => {
      try {
        const res = await getAllCities();
        setCities(res?.data?.response || []);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    getCities();
  }, []);

  const handleCity = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(e.target.value);
  };

  const handleModifySearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedCity && startDate && endDate) {
      const pickupDateTime = new Date(
        `${moment(startDate).format("YYYY-MM-DD")}T${startTime || "00:00"}`
      );
      const dropoffDateTime = new Date(
        `${moment(endDate).format("YYYY-MM-DD")}T${endTime || "00:00"}`
      );



      if ((tabValue == "Subscription") || (tabValue == 'Driver' && radioToggle == "One-way")) {
        // localStorage.setItem(
        //   "pickupDate",
        //   moment(startDate).format("YYYY-MM-DD")
        // );

        dispatch(setPickupDateRedux( moment(startDate).format("YYYY-MM-DD")))

        console.log(startTime, "innn")
        // localStorage.setItem(
        //   "pickupTime",
        //   startTime as any
        // );
        dispatch(setPickupTimeRedux( startTime as any))
        window.location.reload();

        // localStorage.setItem("dropOffLocation", selectedDropCity || "");
        dispatch(setDropOffLocationRedux( selectedDropCity || ""))
        // localStorage.setItem("pickupLocation", selectedCity);
        dispatch(setPickupLocationRedux( selectedCity))
        return
      }
      if (pickupDateTime >= dropoffDateTime) {
        alert(
          "Drop-off date and time should be later than Pickup date and time"
        );
        return;
      }

      // Validation for "Self-Driving" tab
      if (tabValue === "Self-Driving") {
        // Calculate the time difference in milliseconds
        const timeDifference =
          dropoffDateTime.getTime() - pickupDateTime.getTime(); // Get time in milliseconds

        // Convert the time difference to hours
        const hoursDifference = timeDifference / (1000 * 60 * 60); // Convert milliseconds to hours

        if (hoursDifference < 24) {
          alert(
            "For Self-Driving, the duration between Pickup and Drop-off should be at least 24 hours."
          );
          return;
        }
      }

      // Save data to localStorage
      // localStorage.setItem("pickupLocation", selectedCity);
      dispatch(setPickupLocationRedux( selectedCity))
      // localStorage.setItem(
      //   "pickupDate",
      //   moment(startDate).format("YYYY-MM-DD")
      // );
      dispatch(setPickupDateRedux( moment(startDate).format("YYYY-MM-DD")))


      // localStorage.setItem("dropOffDate", moment(endDate).format("YYYY-MM-DD"));

      dispatch(setDropOffDateRedux(moment(endDate).format("YYYY-MM-DD")))

      // localStorage.setItem("pickupTime", startTime || "");

      dispatch(setPickupTimeRedux(startTime || ""))


      // localStorage.setItem("dropoffTime", endTime || "");

      dispatch(setDropoffTimeRedux(endTime || ""))

      // localStorage.setItem("dropOffLocation", selectedDropCity || "");

      dispatch(setDropOffLocationRedux(selectedDropCity || ""))

      window.location.reload();
    }
  };

  const pickupLocationRedux = useSelector((state) => state.location.pickupLocation);
  const dropOffLocationRedux = useSelector((state) => state.location.dropOffLocation);
  const pickupDateRedux = useSelector((state) => state.location.pickupDate);
  const dropOffDateRedux = useSelector((state) => state.location.dropOffDate);
  const pickupTimeRedux = useSelector((state) => state.location.pickupTime);
  const dropoffTimeRedux = useSelector((state) => state.location.dropoffTime);
  const tabValueRedux = useSelector((state) => state.location.tabValue);
  const radioToggleRedux = useSelector((state) => state.location.radioToggle);


  useEffect(() => {
    const getData = () => {

     

      setTabsValue(tabValueRedux);
      setRadioToggle(radioToggleRedux);
      setSelectedCity(pickupLocationRedux);
      setSelectedDropCity(dropOffLocationRedux);

      if (pickupDateRedux && pickupTimeRedux) {
        const startDateTime = new Date(`${pickupDateRedux}T${pickupTimeRedux}`);
        setStartDate(pickupDateRedux);
        setStartTime(moment(startDateTime).format("HH:mm"));
      }

      if (dropOffDateRedux && dropoffTimeRedux) {
        const endDateTime = new Date(`${dropOffDateRedux}T${dropoffTimeRedux}`);
        setEndDate(endDateTime);
        setEndTime(moment(endDateTime).format("HH:mm"));
      }
    };

    getData();
  }, []);

  console.log(radioToggleRedux,tabValueRedux,dropoffTimeRedux,pickupTimeRedux,dropOffDateRedux,pickupDateRedux,dropOffLocationRedux,pickupLocationRedux,"newVCal")
  const [showLocationPopup, setShowLocationPopup] = useState(false);
  const [showDropLocationPopup, setShowDropLocationPopup] = useState(false);
  const [pickupLocation, setPickupLocation] = useState<any>();
  const [pickupDropLocation, setPickupDropLocation] = useState<any>();

  const handleSelectPopupLocation = (e: any) => {
    e.preventDefault();
    setShowLocationPopup(!showLocationPopup);
  };
  const handleSelectPopupDropLocation = (e: any) => {
    e.preventDefault();
    setShowDropLocationPopup(!showLocationPopup);
  };

  const handlePickupLocation = (event: any) => {
    setPickupLocation(event);
  };
  const handlePickupDropLocation = (event: any) => {
    setPickupDropLocation(event);
  };

  const handleCityClick = (cityName: any) => {
    setSelectedCity(cityName);
    // setPickupLocation(cityName);
    handlePickupLocation(cityName);
    setShowLocationPopup(false);
  };

  const handleDropCityClick = (cityName: any) => {
    setSelectedDropCity(cityName);
    // setPickupLocation(cityName);
    handlePickupDropLocation(cityName);
    setShowDropLocationPopup(false);
  };

  console.log("startTime", startDate, startTime)

  const handleRemoveDropLocation = () => {
    setSelectedDropCity("");
  }

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-[1fr_2fr_1fr+1fr] grid-flow-row-dense md:grid-cols-[1fr_2fr_1fr] justify-between sm:my-12 my-6 sm:px-4 px-4 sm:pt-4 sm:pb-4 pt-4 !pb-[45px] items-center rounded-md bg-[url('/png/search-bg.png')] "
      style={{ backgroundSize: "100% 100%" }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-2 sm:mb-0">
        <div
          onClick={() => route.push("/")}
          className="text-3xl cursor-pointer w-fit hidden sm:block"
        >
          &larr;
        </div>
        <div className="flex flex-col sm:flex-col sm:items-start gap-2">
          {/* <div className="text-3xl cursor-pointer w-fit sm:hidden block">&larr;</div> */}
          <div className="flex items-center gap-2 sm:ml-1">
            <span className="block sm:hidden ">&larr;</span>{" "}
            <span className="sm:text-[16px] text-xs"> Showing Cars</span>
          </div>
          <div>
            <div className="flex flex-row justify-between gap-2 items-start -ml-2">
              <div>
                {
                  <div className="ml-[0px]">
                    <legend className="text-xs ml-2 block sm:hidden">Pickup Location</legend>
                    <input
                      className="bg-[#FCFBFB] px-2 rounded-md border-0 outline-none py-1 cursor-pointer w-[130px]"
                      style={{ backgroundColor: "rgb(252, 251, 251, 0%)" }}
                      type="text"
                      placeholder="All City"
                      onClick={(e) => handleSelectPopupLocation(e)}
                      value={selectedCity}
                      readOnly // Prevent editing directly
                    />
                    {showLocationPopup && (
                      <div className="flex flex-col justify-center items-center fixed inset-0 !z-[9999] bg-[#0000003c] bg-opacity-50 w-full">
                        <div className="flex flex-col justify-start items-center bg-white  rounded-xl shadow-md relative pb-6">
                          <div className="bg-[#FF0000] w-full py-2 px-10 rounded-t-xl">
                            <h1 className="text-white font-semibold text-center text-xl">
                              Select City
                            </h1>
                          </div>
                          <Image
                            src={"/svg/close-red.svg"}
                            alt="nav"
                            width={26}
                            height={26}
                            className="absolute top-2.5 right-2 border rounded-full bg-white p-.5 cursor-pointer"
                            onClick={() => setShowLocationPopup(false)}
                          />
                          <div className="city-list max-w-[1095px] max-h-[60vh] overflow-auto w-full flex-col justify-start items-start m-auto  grid grid-cols-1 py-3 px-6">
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
                        className="!rounded-full !py-2 mt-6 !w-[200px] !font-semibold"
                        text="Select"
                      /> */}
                        </div>
                      </div>
                    )}
                  </div>
                }
                {(tabValue == "Self-Driving" ||
                  (tabValue == "Driver" && radioToggle == "One-way")) &&
                  <div className="flex flex-col items-start justify-start sm:hidden">
                    <legend className="text-xs ml-2">Dropoff Location</legend>
                   <div className="flex flex-row-reverse items-center">
                   {
                      selectedDropCity !== "" &&
                      <Image src="/out-remove.png" onClick={() => handleRemoveDropLocation()} alt="" width={100} height={100} className="w-[20px] object-contain" />
                    }
                    <input
                      className="bg-[#FCFBFB] px-2 rounded-md border-0 outline-none py-1 cursor-pointer w-[130px]"
                      style={{ backgroundColor: "rgb(252, 251, 251, 0%)" }}
                      type="text"
                      placeholder="All City"
                      onClick={(e) => handleSelectPopupDropLocation(e)}
                      value={selectedDropCity}
                      readOnly // Prevent editing directly
                    />
                   </div>
                    {showDropLocationPopup && (
                      <div className="flex flex-col justify-center items-center fixed inset-0  bg-[#0000003c] bg-opacity-50 w-full !z-[9999]">
                        <div className="flex flex-col justify-start items-center bg-white  rounded-xl shadow-md relative pb-6">
                          <div className="bg-[#FF0000] w-full py-2 px-10 rounded-t-xl">
                            <h1 className="text-white font-semibold text-center text-xl">
                              Select City
                            </h1>
                          </div>
                          <Image
                            src={"/svg/close-red.svg"}
                            alt="nav"
                            width={26}
                            height={26}
                            className="absolute top-2.5 right-2 border rounded-full bg-white p-.5 cursor-pointer"
                            onClick={() => setShowDropLocationPopup(false)}
                          />
                          <div className="city-list max-w-[1095px] max-h-[60vh] overflow-auto w-full flex-col justify-start items-start m-auto  grid grid-cols-1 py-3 px-6">
                            {cities?.map((city: any, index: number) => (
                              <div key={index}>
                                <City
                                  city={city}
                                  isSelected={selectedDropCity === city.name}
                                  onClick={() => handleDropCityClick(city.name)}
                                />
                              </div>
                            ))}
                          </div>
                          {/* <ThemeButton
                        onClick={() => setShowLocationPopup(false)}
                        className="!rounded-full !py-2 mt-6 !w-[200px] !font-semibold"
                        text="Select"
                      /> */}
                        </div>
                      </div>
                    )}
                  </div>
                }
              </div>

              <div className="sm:ml-auto sm:my-10 block sm:hidden mt-5">
                <ThemeButton
                  onClick={handleModifySearch}
                  text="Modify Search"
                  className="!rounded-full !px-4 sm:text-md text-xs h-[35px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="sm:flex grid grid-cols-1 flex-col sm:mt-0 mt-0 items-start sm:items-center sm:flex-row gap-2 z-[999]">
        <div className="flex flex-col lg:flex-row items-start lg:items-center   sm:gap-2 max-w-[350px] sm:w-[400px]">
          <div className="whitespace-nowrap sm:text-[14px] text-xs">
            Pickup Date
          </div>
          <div className="relative  modify-search m-0 w-[100%] sm:min-[200px] max-w-[350px]  bg-white ">
            <DatePicker
              selected={startDate}
              className=" cursor-pointer border border-[#FF0000] py-[5px] pl-2 bg-transparent pr-10"

              onChange={handleStartDateTimeChange}
              showTimeSelect
              dateFormat="MMMM d, yyyy h:mm aa"
              placeholderText="MMMM d, yyyy h:mm aa"
              ref={datePickerRef}
            />
            <Image
              src={"/svg/edit-red.svg"}
              alt="edit"
              width={12}
              height={12}
              className="absolute top-[9px]  sm:right-[-5px] right-[5px] z-[1]"
              onClick={handleImageClick}
            />
          </div>
        </div>
        {(tabValue === "Self-Driving" ||
          (tabValue === "Driver" &&
            (radioToggle === "Local" || radioToggle === "Out-station"))) && (
            <div className="flex flex-col lg:flex-row items-start lg:items-center sm:gap-2 max-w-[350px] sm:w-[400px]">
              <div className="whitespace-nowrap sm:text-[14px] text-xs">
                Return Date
              </div>
              <div className="relative  modify-search m-0  w-[100%]  sm:min-[200px] max-w-[350px]  bg-white">
                <DatePicker
                  className=" cursor-pointer border border-[#FF0000] py-[5px] pl-2 bg-transparent pr-10"
                  selected={endDate}
                  onChange={handleEndDateTimeChange}
                  showTimeSelect
                  dateFormat="MMMM d, yyyy h:mm aa"
                  placeholderText="MMMM d, yyyy h:mm aa"
                  ref={datePickerRef1}
                />
                <Image
                  src={"/svg/edit-red.svg"}
                  alt="edit"
                  width={12}
                  height={12}
                  className="absolute top-[9px] sm:right-[-5px] right-[5px] z-[9]"
                  onClick={handleImageClick1}
                />
              </div>
            </div>
          )}
      </div>
      <div className="sm:ml-10">
        {(tabValue == "Self-Driving" ||
          (tabValue == "Driver" && radioToggle == "One-way")) &&
          <div className="flex-col items-start justify-start hidden sm:flex ">
            <legend className="text-xs ml-2">Dropoff Location</legend>
            <div className="flex flex-row">
              {
                selectedDropCity !== "" &&
                <Image src="/out-remove.png" alt="" onClick={() => handleRemoveDropLocation()} width={20} className="object-contain cursor-pointer" height={20} />

              }

              <input
                className="bg-[#FCFBFB] px-2 rounded-md border-0 outline-none py-1 cursor-pointer w-[130px]"
                style={{ backgroundColor: "rgb(252, 251, 251, 0%)" }}
                type="text"
                placeholder="All City"
                onClick={(e) => handleSelectPopupDropLocation(e)}
                value={selectedDropCity}
                readOnly // Prevent editing directly
              />
            </div>

            {showDropLocationPopup && (
              <div className="flex flex-col justify-center items-center fixed inset-0 !z-[9999] bg-[#0000003c] bg-opacity-50 w-full ">
                <div className="flex flex-col justify-start items-center bg-white  rounded-xl shadow-md relative pb-6">
                  <div className="bg-[#FF0000] w-full py-2 px-10 rounded-t-xl">
                    <h1 className="text-white font-semibold text-center text-xl">
                      Select City
                    </h1>
                  </div>
                  <Image
                    src={"/svg/close-red.svg"}
                    alt="nav"
                    width={26}
                    height={26}
                    className="absolute top-2.5 right-2 border rounded-full bg-white p-.5 cursor-pointer"
                    onClick={() => setShowDropLocationPopup(false)}
                  />
                  <div className="city-list max-w-[1095px] max-h-[60vh] overflow-auto w-full flex-col justify-start items-start m-auto  grid grid-cols-1 py-3 px-6">
                    {cities?.map((city: any, index: number) => (
                      <div key={index}>
                        <City
                          city={city}
                          isSelected={selectedDropCity === city.name}
                          onClick={() => handleDropCityClick(city.name)}
                        />
                      </div>
                    ))}
                  </div>
                  {/* <ThemeButton
                        onClick={() => setShowLocationPopup(false)}
                        className="!rounded-full !py-2 mt-6 !w-[200px] !font-semibold"
                        text="Select"
                      /> */}
                </div>
              </div>
            )}
          </div>
        }
      </div>
      <div className="sm:ml-auto sm:my-10 my-4 sm:m-4 hidden sm:block">
        <ThemeButton
          onClick={handleModifySearch}
          text="Modify Search"
          className="!rounded-full !px-4 sm:text-md text-sm"
        />
      </div>
    </div>
  );
};

export default ModifySearch;
