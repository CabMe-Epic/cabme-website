import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React, { useEffect } from "react";
import ThemeButton from "../theme-button/theme-button";
import { getAllCities } from "../../../../networkRequests/hooks/api";

const ModifySearch = () => {
  const [startDate, setStartDate] = React.useState(new Date());
  const [cities, setCities] = React.useState<any>();
  const [selectedCity, setSelectedCity] = React.useState<any>();
  useEffect(() => {

    const getCities = async () => {
      const res = await getAllCities();
      console.log(res, "resCity")
      setCities(res?.data?.response)
    }

    getCities();

    // const city =  localStorage.getItem("pickupLocation")

  }, [])

  const handleCity = async (e: any) => {
    e.preventDefault();
    setSelectedCity(e.target.value)
    localStorage.setItem("pickupLocation", e.target.value);
  }

  return (
    <div
      className="grid grid-cols-[1fr_2fr_1fr] justify-between my-12 p-4 items-center rounded-md bg-[url('/png/search-bg.png')]"
      style={{ backgroundSize: "100% 100%" }}
    >
      <div className="flex gap-4 items-center">
        <div className="text-3xl cursor-pointer w-fit">&larr;</div>
        <div>
          <p className="">Showing Cars</p>
          <select onChange={handleCity} name="city" id="city" className="font-semibold">
            {
              cities?.map((item: any, index: number) => {
                return (
                  <option key={index} value={item?.name}>{item?.name}</option>
                )
              })
            }
          </select>
        </div>
      </div>
      <div className="flex gap-6">
        <div className="lg:flex gap-2">
          <div className="whitespace-nowrap">Pickup Date</div>
          <div className="relative">
            <DatePicker
              className="cursor-pointer border border-[#FF0000] py-[5px] pl-2 bg-transparent"
              selected={startDate}
              //   onChange={
              //     item?.heading === "Pick Up Date"
              //       ? (date) => hanldepickupTime(date)
              //       : (date) => hanldedropoffTime(date)
              //     // (date) => setStartDate(date)
              //   }
              showTimeSelect
              //   filterTime={filterPassedTime}
              dateFormat="MMMM d, yyyy h:mm aa"
            />
            <Image src={"/svg/edit-red.svg"} alt="edit" width={12} height={12} className="absolute top-[9px] right-[5px] z-[-9]" />
          </div>
        </div>
        <div className="lg:flex gap-2">
          <div className="whitespace-nowrap">Return Date</div>
          <div className="relative">
            <DatePicker
              className="cursor-pointer border border-[#FF0000] py-[5px] pl-2 bg-transparent"
              selected={startDate}
              //   onChange={
              //     item?.heading === "Pick Up Date"
              //       ? (date) => hanldepickupTime(date)
              //       : (date) => hanldedropoffTime(date)
              //     // (date) => setStartDate(date)
              //   }
              showTimeSelect
              //   filterTime={filterPassedTime}
              dateFormat="MMMM d, yyyy h:mm aa"
            />
            <Image src={"/svg/edit-red.svg"} alt="edit" width={12} height={12} className="absolute top-[9px] right-[5px] z-[-9]" />
          </div>
        </div>
      </div>
      <div className="ml-auto">
        <ThemeButton text="Modify Search" className="!rounded-full !px-4" />
      </div>
    </div>
  );
};
export default ModifySearch;