import Image from "next/image";
import React from "react";

const BookingDetailsCard = ({city}: any) => {
  console.log("city",city)
  return (
    <div>
      <main className="max-w-[511px] px-2 border-[1.5px] rounded-md flex bg-[#f7f7f7] flex-col items-center justify-center py-6">
        <div className="max-w-[376px]">
          <div className="h-[50px] bg-black text-white font-bold text-[20px] flex justify-center items-center rounded-xl">
            <span className="text-center">Booking Details</span>
          </div>
          <div className="font-bold flex justify-center my-5  text-[18px]">
            <span className="font-semibold">Location : </span>{" "}
            <span className="text-[#ff0000] ml-2"> {city}</span>
          </div>
          <div className="flex flex-row justify-between items-center gap-10">
            <div className="flex flex-col gap-2">
              <span className="font-semibold">Pick-up</span>
              <span className="flex flex-row items-center gap-3">
                <Image
                  src="/png/calender.png"
                  width={16}
                  height={16}
                  alt="calender"
                />
                <span className="text-[#787070] text-sm">Feb 6, 2023</span>
              </span>
              <span className="flex flex-row items-center gap-3">
                <Image src="/png/time.png" width={20} height={20} alt="time" />
                <span className="text-[#787070] text-sm">02:45 AM</span>
              </span>
            </div>
            <div>
              <span className="bg-[#ff0000] py-[14px] px-[14px] font-bold text-white rounded-full">
                To
              </span>
            </div>
            <div className="flex flex-col gap-2">
              {" "}
              <span className="font-semibold">Drop-off</span>
              <span className="flex flex-row items-center gap-3">
                <Image
                  src="/png/calender.png"
                  width={16}
                  height={16}
                  alt="calender"
                />
                <span className="text-[#787070] text-sm">Feb 6, 2023</span>
              </span>
              <span className="flex flex-row items-center gap-3">
                <Image
                  src="/png/time.png"
                  width={20}
                  height={20}
                  alt="calender"
                />
                <span className="text-[#787070] text-sm">02:45 AM</span>
              </span>
            </div>
          </div>
          <div className="my-8 text-center">
            <span className="bg-[#F2F7F6] w-[240px] h-[50px] p-4 rounded-lg drop-shadow-lg">
             <b> Duration: </b> 2days,24hours,12minutes{" "}
            </span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookingDetailsCard;
