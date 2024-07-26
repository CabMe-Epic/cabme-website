import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React, { useEffect, useState } from "react";
import ThemeButton from "../theme-button/theme-button";
import { getAllCities } from "../../../../networkRequests/hooks/api";
import moment from "moment";
import City from "../city-selection-2/city-selection-2";

const ModifySearch: React.FC = () => {
  const [cities, setCities] = useState<{ name: string }[] | undefined>([]);
  const [selectedCity, setSelectedCity] = useState<string | undefined>();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<string | null>(null);
  const [endTime, setEndTime] = useState<string | null>(null);

  const handleStartDateTimeChange = (date: Date | null) => {
    if (date) {
      setStartDate(date);
      setStartTime(moment(date).format("HH:mm"));
    }
  };

  const handleEndDateTimeChange = (date: Date | null) => {
    if (date) {
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
      // Save data to localStorage
      localStorage.setItem("pickupLocation", selectedCity);
      localStorage.setItem(
        "pickupDate",
        moment(startDate).format("YYYY-MM-DD")
      );
      localStorage.setItem("dropOffDate", moment(endDate).format("YYYY-MM-DD"));
      localStorage.setItem("pickupTime", startTime || "");
      localStorage.setItem("dropoffTime", endTime || "");

      window.location.reload();
    }
  };

  useEffect(() => {
    const getData = () => {
      const initialLocation = localStorage.getItem("pickupLocation") || "";
      const pickupdate = localStorage.getItem("pickupDate");
      const dropoffDate = localStorage.getItem("dropOffDate");
      const pickUpTime = localStorage.getItem("pickupTime");
      const dropOffTime = localStorage.getItem("dropoffTime");

      setSelectedCity(initialLocation);

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
  const [pickupLocation, setPickupLocation] = useState<any>();


  const handleSelectPopupLocation = (e: any) => {
    e.preventDefault();
    setShowLocationPopup(!showLocationPopup);
  };


  const handlePickupLocation = (event: any) => {
    setPickupLocation(event);
  };



  const handleCityClick = (cityName: any) => {
    setSelectedCity(cityName);
    // setPickupLocation(cityName);
    handlePickupLocation(cityName);
    // setShowLocationPopup(false);
  };
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-[1fr_2fr_1fr] grid-flow-row-dense md:grid-cols-[1fr_2fr_1fr] justify-between sm:my-12 my-6 sm:px-4 px-4 sm:pt-4 sm:pb-4 pt-4 pb-[30px] items-center rounded-md bg-[url('/png/search-bg.png')]"
      style={{ backgroundSize: "100% 100%" }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-2 sm:mb-0">
        <div className="text-3xl cursor-pointer w-fit hidden sm:block">
          &larr;
        </div>
        <div className="flex flex-col sm:flex-col sm:items-start gap-2">
          {/* <div className="text-3xl cursor-pointer w-fit sm:hidden block">&larr;</div> */}
          <div className="flex items-center gap-2 sm:ml-1">
            <span className="block sm:hidden ">&larr;</span> <span className="sm:text-[16px] text-xs"> Showing Cars</span>
          </div>
          <div>
            <div className="flex justify-between items-center">
              {/* <select
                onChange={handleCity}
                name="city"
                id="city"
                className="font-semibold w-fit min-[200px] sm:text-[14px] text-xs"
                value={selectedCity || ""}
              >
                <option value="" disabled>
                  Select a city
                </option>
                {cities?.map((item, index) => (
                  <option key={index} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select> */}
              { (
                <>
                  <input
                    className="bg-[#FCFBFB] px-2 rounded-md border-0 outline-none py-1 cursor-pointer w-[130px]"
                    type="text"
                    placeholder="All City"
                    onClick={(e) => handleSelectPopupLocation(e)}
                    value={selectedCity}
                    readOnly // Prevent editing directly
                  />
                  {
                    showLocationPopup &&
                    <div className="flex flex-col justify-center items-center fixed inset-0 z-[999] bg-[#0000003c] bg-opacity-50 w-full">
                    <div className="flex flex-col justify-start items-center bg-white  rounded-xl shadow-md relative pb-6">
                      <div className="bg-[#FF0000] w-full py-2 px-10 rounded-t-xl"><h1 className="text-white font-semibold text-center text-xl">Select City</h1></div>
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
                      <ThemeButton
                        onClick={() => setShowLocationPopup(false)}
                        className="!rounded-full !py-2 mt-6 !w-[200px] !font-semibold"
                        text="Select"
                      />
                    </div>
                  </div>
                  }

                
                </>
              )}
              <div className="sm:ml-auto sm:my-10 sm:hidden block">
                <ThemeButton
                  onClick={handleModifySearch}
                  text="Modify Search"
                  className="!rounded-full !px-4 sm:text-md text-xs"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="sm:flex grid grid-cols-2 flex-col sm:mt-0 mt-2 items-start sm:items-center sm:flex-row gap-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center sm:gap-2">
          <div className="whitespace-nowrap sm:text-[14px] text-xs">Pickup Date</div>
          <div className="relative date-picker modify-search m-0 w-[100%] sm:min-[200px]">
            <DatePicker
              className="date-picker cursor-pointer border border-[#FF0000] py-[5px] pl-2 bg-transparent pr-10"
              selected={startDate}
              onChange={handleStartDateTimeChange}
              showTimeSelect
              dateFormat="MMMM d, yyyy h:mm aa"
              placeholderText="MMMM d, yyyy h:mm aa"
            />
            <Image
              src={"/svg/edit-red.svg"}
              alt="edit"
              width={12}
              height={12}
              className="absolute top-[9px] sm:right-[-5px] right-[5px] z-[-9]"
            />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row items-start lg:items-center sm:gap-2">
          <div className="whitespace-nowrap sm:text-[14px] text-xs">Return Date</div>
          <div className="relative date-picker modify-search m-0 w-[100%] sm:min-[200px]">
            <DatePicker
              className="date-picker cursor-pointer border border-[#FF0000] py-[5px] pl-2 bg-transparent pr-10"
              selected={endDate}
              onChange={handleEndDateTimeChange}
              showTimeSelect
              dateFormat="MMMM d, yyyy h:mm aa"
              placeholderText="MMMM d, yyyy h:mm aa"
            />
            <Image
              src={"/svg/edit-red.svg"}
              alt="edit"
              width={12}
              height={12}
              className="absolute top-[9px] sm:right-[-5px] right-[5px] z-[-9]"
            />
          </div>
        </div>
      </div>
      <div className="sm:ml-auto sm:my-10 my-4 sm:m-4 sm:block hidden">
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
