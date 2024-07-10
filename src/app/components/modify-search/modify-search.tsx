import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React from "react";
import ThemeButton from "../theme-button/theme-button";

const ModifySearch = () => {
  const [startDate, setStartDate] = React.useState(new Date());

  return (
    <div className="grid grid-cols-3 justify-between my-12 p-4 items-center rounded-md bg-[url('/png/search-bg.png')]" style={{backgroundSize:"100% 100%"}}>
      <div className="flex gap-4 items-center">
        <div className="text-3xl cursor-pointer w-fit">&larr;</div>
        <div>
          <p className="">Showing Cars</p>
          <select name="city" id="city" className="font-semibold">
            <option value="bangluru">Bangluru</option>
          </select>
        </div>
      </div>
      <div className="flex gap-6">
        <div className="flex gap-2">
          <div className="whitespace-nowrap">Pickup Date</div>
          <DatePicker
            className="cursor-pointer border py-[5px] pl-2"
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
        </div>
        <div className="flex gap-2">
          <div className="whitespace-nowrap">Return Date</div>
          <DatePicker
            className="cursor-pointer border py-[5px] pl-2"
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
        </div>
      </div>
        <div className="ml-auto">
            <ThemeButton text="Modify Search" className="!rounded-full !px-4" />
        </div>
    </div>
  );
};
export default ModifySearch;
