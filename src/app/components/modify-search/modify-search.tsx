import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React, { useEffect, useRef, useState } from "react";
import ThemeButton from "../theme-button/theme-button";
import { getAllCities } from "../../../../networkRequests/hooks/api";
import moment from "moment";
import City from "../city-selection-2/city-selection-2";
import { useRouter } from "next/navigation";

const ModifySearch: React.FC = () => {
  const route = useRouter();
  const [cities, setCities] = useState<{ name: string }[] | undefined>([]);
  const [selectedCity, setSelectedCity] = useState<string | undefined>();
  const [dropOffCity, setDropOffCity] = useState<string | undefined>();
  const [selectedDropCity, setSelectedDropCity] = useState<string | undefined>();

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
      localStorage.setItem(
        "nonFormatedPickupDate",
        moment(date).format("YYYY-MM-DDTHH:mm:ss.SSSZ")
      );

      setStartDate(date);
      setStartTime(moment(date).format("HH:mm"));
    }
  };

  const handleEndDateTimeChange = (date: Date | null) => {
    if (date) {
      localStorage.setItem(
        "nonFormatedDropoffDate",
        moment(date).format("YYYY-MM-DDTHH:mm:ss.SSSZ")
      );

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

      // Ensure both are valid Date objects
      // if (isNaN(pickupDateTime.getTime()) || isNaN(dropoffDateTime.getTime())) {
      //   alert("Invalid date or time. Please enter valid Pickup and Drop-off dates and times.");
      //   return;
      // }

      // Check if Drop-off time is later than Pickup time
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
      localStorage.setItem("pickupLocation", selectedCity);
      localStorage.setItem(
        "pickupDate",
        moment(startDate).format("YYYY-MM-DD")
      );
      localStorage.setItem("dropOffDate", moment(endDate).format("YYYY-MM-DD"));
      localStorage.setItem("pickupTime", startTime || "");
      localStorage.setItem("dropoffTime", endTime || "");
      localStorage.setItem("dropOffLocation", selectedDropCity || "");

      window.location.reload();
    }
  };

  useEffect(() => {
    const getData = () => {
      const initialLocation = localStorage.getItem("pickupLocation") || "";
      const dropLoc = localStorage.getItem("dropOffLocation") || "";
      const pickupdate = localStorage.getItem("pickupDate");
      const dropoffDate = localStorage.getItem("dropOffDate");
      const pickUpTime = localStorage.getItem("pickupTime");
      const dropOffTime = localStorage.getItem("dropoffTime");
      const tabValue = localStorage.getItem("tabValue");
      const radioToggle = localStorage.getItem("radioToggle");
      setTabsValue(tabValue);
      setRadioToggle(radioToggle);
      setSelectedCity(initialLocation);
      setSelectedDropCity(dropLoc);

      if (pickupdate && pickUpTime) {
        const startDateTime = new Date(`${pickupdate}T${pickUpTime}`);
        setStartDate(startDateTime);
        setStartTime(moment(startDateTime).format("HH:mm"));
      }

      if (dropoffDate && dropOffTime) {
        const endDateTime = new Date(`${dropoffDate}T${dropOffTime}`);
        setEndDate(endDateTime);
        setEndTime(moment(endDateTime).format("HH:mm"));
      }
    };

    getData();
  }, []);
  const [showLocationPopup, setShowLocationPopup] = useState(false);
  const [showDropLocationPopup, setShowDropLocationPopup] = useState(false);
  const [pickupLocation, setPickupLocation] = useState<any>();

  const handleSelectPopupLocation = (e: any) => {
    e.preventDefault();
    setShowLocationPopup(!showLocationPopup);
  };
  const handleSelectDropPopupLocation = (e: any) => {
    e.preventDefault();
    setShowDropLocationPopup(!showLocationPopup);
  };

  const handlePickupLocation = (event: any) => {
    setPickupLocation(event);
  };

  const handlePickupDropLocation = (event: any) => {
    setPickupLocation(event);
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
  return (
    <div className="flex sm:flex-row flex-wrap w-full sm:justify-center sm:items-end gap-4 sm:gap-10  p-6 rounded-lg  h-auto mt-10  pb-5 flex-col  bg-gradient-to-r from-white via-[#fbd9f1] to-white relative border-[1px] border-[#696969] shadow-md">
      {/* <Image src="/bgdate.png"  alt="" width={100} height={100} className="w-[100%] rounded-lg h-[100%] absolute top-0 left-0 -z-[99] overflow-hidden m-auto border-[1px] border-[#000]"/> */}
      <div className="flex flex-col-5 sm:flex-row sm:items-center gap-4 mb-2 sm:mb-0">
        <div className="flex flex-row items-center">
          <div
            onClick={() => route.push("/")}
            className="text-3xl cursor-pointer w-fit hidden sm:block"
          >
            &larr;
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2 sm:ml-1">
              <span className="block sm:hidden text-[15px] sm:mr-4">
                &larr;
              </span>{" "}
              <span className="sm:text-[16px] text-[15px]"> Showing Cars</span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center mr-4 ">
                {
                  <>
                    <input
                      className="bg-[#FCFBFB] px-2 border border-[#ff0000] rounded-md outline-none p-[3px] cursor-pointer w-[280px] sm:w-full"
                      // style={{ backgroundColor: 'rgb(252, 251, 251, 0%)' }}

                      type="text"
                      placeholder="All City"
                      onClick={(e) => handleSelectPopupLocation(e)}
                      value={selectedCity}
                      readOnly
                    />
                    {showLocationPopup && (
                      <div className="flex flex-col justify-center items-center fixed inset-0 z-[999] bg-[#0000003c] bg-opacity-50 w-full">
                        <div className="flex flex-col justify-start items-center bg-white  rounded-xl shadow-md relative pb-6">
                          <div className="bg-[#FF0000] w-full py-2 px-10 rounded-t-xl">
                            <h1 className="text-white font-semibold text-center text-[15px]">
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
                        </div>
                      </div>
                    )}
                  </>
                }
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sm:flex grid grid-cols-1 flex-col sm:mt-0 mt-2 items-start sm:items-center sm:flex-row gap-2">
        <div className="flex flex-col items-start  sm:gap-2 max-w-[350px] sm:w-[220px]">
          <div className="whitespace-nowrap sm:text-[14px] text-[15px]">
            Pickup Date
          </div>
          <div className="relative date-picker modify-search m-0 w-[100%] !z-[990] sm:min-[200px] max-w-[350px]  ">
            <DatePicker
              className="date-picker cursor-pointer border border-[#FF0000] rounded-md py-[5px] pl-2 bg-transparent pr-10"
              selected={startDate}
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
      </div>

      <div className="sm:flex grid grid-cols-1 flex-col sm:mt-0 mt-2 items-start sm:items-center sm:flex-row gap-2">
        {(tabValue === "Self-Driving" ||
          (tabValue === "Driver" &&
            (radioToggle === "Local" || radioToggle === "Out-station"))) && (
          <div className="flex flex-col items-start sm:gap-2 max-w-[350px] sm:w-[220px]">
            <div className="whitespace-nowrap sm:text-[14px] text-[15px]">
              Return Date
            </div>
            <div className="relative date-picker modify-search m-0 w-[100%] !z-[99] sm:min-[200px] max-w-[350px] ">
              <DatePicker
                className="date-picker cursor-pointer border border-[#FF0000] rounded-md py-[5px] pl-2i bg-transparent pr-10 "
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
                className="absolute top-[9px] sm:right-[-5px] right-[5px] z-[-9]"
                onClick={handleImageClick1}
              />
            </div>
          </div>
        )}
      </div>

    {
      (tabValue == "Self-Driving" || 
     ( tabValue == "Driver" && radioToggle == "One-way")) &&
     <div className="flex justify-between items-center">
     <div className="flex justify-between items-center mr-4 ">
       {
         <div className="flex flex-col">
           <legend className="mb-2 sm:text-[14px] text-[15px]">Drop City</legend>
           <input
             className="bg-[#FCFBFB] px-2 border border-[#ff0000] rounded-md outline-none p-[3px] cursor-pointer w-[280px]  sm:w-full"

             type="text"
             placeholder="All City"
             onClick={(e) => handleSelectDropPopupLocation(e)}
             value={selectedDropCity}
             readOnly
           />
           {showDropLocationPopup && (
             <div className="flex flex-col justify-center items-center fixed inset-0 z-[999] bg-[#0000003c] bg-opacity-50 w-full">
               <div className="flex flex-col justify-start items-center bg-white  rounded-xl shadow-md relative pb-6">
                 <div className="bg-[#FF0000] w-full py-2 px-10 rounded-t-xl">
                   <h1 className="text-white font-semibold text-center text-[15px]">
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
               </div>
             </div>
           )}
         </div>
       }
     </div>
   </div>
    }

      <div className="">
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
