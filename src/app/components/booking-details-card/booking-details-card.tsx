"use client"
import Image from "next/image";
import React, { useEffect, useState } from "react";



const BookingDetailsCard = ({city}:any) => {
  const [pickupDate,setPickupDate] = useState<any>();
  const [dropoffDate,setDropoffDate] = useState<any>()
  const [pickupTime,setPickupTime] =useState<any>()
  const [dropoffTime,setDropoffTime] =useState<any>()
  const [duration, setDuration] = useState('');

  console.log(pickupTime,"ppp");
  useEffect(()=>{   
     
      const getPickup = localStorage.getItem("pickupDate");
      const getDropoff = localStorage.getItem("dropOffDate");
      const pickTime=localStorage.getItem("pickupTime")
      const dropTime=localStorage.getItem("dropoffTime")
      
      setPickupDate(getPickup);
      setDropoffDate(getDropoff);
      setPickupTime(pickTime);
      setDropoffTime(dropTime);

      const pickupDateTime:any = new Date(`${pickupDate?.split('-').join('-')}T${pickupTime}:00`);
      const droppingDateTime:any = new Date(`${dropoffDate?.split('-').join('-')}T${dropoffTime}:00`);
      const diffInMs = Math.abs(droppingDateTime - pickupDateTime);
      const diffInSeconds = Math.floor(diffInMs / 1000);
      const days = Math.floor(diffInSeconds / (3600 * 24));
      const hours = Math.floor((diffInSeconds % (3600 * 24)) / 3600);
      const minutes = Math.floor((diffInSeconds % 3600) / 60);
      // const seconds = diffInSeconds % 60;
      setDuration(`${days}days, ${hours}hours, ${minutes}minutes`);
  })


  console.log(duration,"duration");

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
                <span className="text-[#787070] text-sm">{pickupDate}</span>
              </span>
              <span className="flex flex-row items-center gap-3">
                <Image src="/png/time.png" width={20} height={20} alt="time" />
                <span className="text-[#787070] text-sm">{pickupTime}</span>
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
                <span className="text-[#787070] text-sm">{dropoffDate}</span>
              </span>
              <span className="flex flex-row items-center gap-3">
                <Image
                  src="/png/time.png"
                  width={20}
                  height={20}
                  alt="calender"
                />
                <span className="text-[#787070] text-sm">{dropoffTime}</span>
              </span>
            </div>
          </div>
          <div className="my-8 text-center">
            <span className="bg-[#F2F7F6] w-[240px] h-[50px] p-4 rounded-lg drop-shadow-lg">
             <b> Duration: </b> {duration ? duration:""}{" "}
            </span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookingDetailsCard;
