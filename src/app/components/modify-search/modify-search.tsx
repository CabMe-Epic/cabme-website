import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React, { useEffect, useState } from "react";
import ThemeButton from "../theme-button/theme-button";
import { getAllCities } from "../../../../networkRequests/hooks/api";
import moment from "moment";

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
      setStartTime(moment(date).format('HH:mm'));
    }
  };

  const handleEndDateTimeChange = (date: Date | null) => {
    if (date) {
      setEndDate(date);
      setEndTime(moment(date).format('HH:mm'));
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
      localStorage.setItem("pickupDate", moment(startDate).format('YYYY-MM-DD'));
      localStorage.setItem("dropOffDate", moment(endDate).format('YYYY-MM-DD'));
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
        setStartTime(moment(startDateTime).format('HH:mm'));
      }

      if (dropoffDate && dropOffTime) {
        const endDateTime = new Date(`${dropoffDate}T${dropOffTime}`);
        setEndDate(endDateTime);
        setEndTime(moment(endDateTime).format('HH:mm'));
      }
    };

    getData();
  }, []);

  return (
    <div
      className="grid grid-cols-[1fr_2fr_1fr] justify-between my-12 p-4 items-center rounded-md bg-[url('/png/search-bg.png')]"
      style={{ backgroundSize: "100% 100%" }}
    >
      <div className="flex gap-4 items-center">
        <div className="text-3xl cursor-pointer w-fit">&larr;</div>
        <div>
          <p className="">Showing Cars</p>
          <select
            onChange={handleCity}
            name="city"
            id="city"
            className="font-semibold"
            value={selectedCity || ""}
          >
            <option value="" disabled>Select a city</option>
            {cities?.map((item, index) => (
              <option key={index} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex gap-6">
        <div className="lg:flex gap-2">
          <div className="whitespace-nowrap">Pickup Date</div>
          <div className="relative date-picker">
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
              className="absolute top-[9px] right-[5px] z-[-9]"
            />
          </div>
        </div>
        <div className="lg:flex gap-2">
          <div className="whitespace-nowrap">Return Date</div>
          <div className="relative">
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
              className="absolute top-[9px] right-[5px] z-[-9]"
            />
          </div>
        </div>
      </div>
      <div className="ml-auto">
        <ThemeButton
          onClick={handleModifySearch}
          text="Modify Search"
          className="!rounded-full !px-4"
        />
      </div>
    </div>
  );
};

export default ModifySearch;
