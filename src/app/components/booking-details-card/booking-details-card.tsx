"use client"
import moment from "moment";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const BookingDetailsCard = ({ city }: any) => {

  const [pickupDate, setPickupDate] = useState<any>();
  const [dropoffDate, setDropoffDate] = useState<any>()
  const [pickupTime, setPickupTime] = useState<any>()
  const [dropoffTime, setDropoffTime] = useState<any>()
  const [duration, setDuration] = useState('');

  const pickupDateRedux = useSelector((state: any) => state.location.pickupDate);
  const dropOffDateRedux = useSelector((state: any) => state.location.dropOffDate);
  const pickupTimeRedux = useSelector((state: any) => state.location.pickupTime);
  const dropoffTimeRedux = useSelector((state: any) => state.location.dropoffTime);
  const tabValueRedux = useSelector((state: any) => state.location.tabValue);
  const radioToggleRedux = useSelector((state: any) => state.location.radioToggle);


  useEffect(() => {
    // const getPickup = localStorage.getItem("pickupDate");
    // const getDropoff = localStorage.getItem("dropOffDate");
    // const pickTime = localStorage.getItem("pickupTime")
    // const dropTime = localStorage.getItem("dropoffTime")

    // const getPickup = localStorage.getItem("pickupDate");
    // const getDropoff = localStorage.getItem("dropOffDate");
    // const pickTime = localStorage.getItem("pickupTime")
    // const dropTime = localStorage.getItem("dropoffTime")

    setPickupDate(pickupDateRedux);
    setDropoffDate(dropOffDateRedux);
    setPickupTime(pickupTimeRedux);
    setDropoffTime(dropoffTimeRedux);

    const pickupDateTime: any = new Date(`${pickupDate?.split('-').join('-')}T${pickupTime}:00`);
    const droppingDateTime: any = new Date(`${dropoffDate?.split('-').join('-')}T${dropoffTime}:00`);
    const diffInMs = Math.abs(droppingDateTime - pickupDateTime);
    const diffInSeconds = Math.floor(diffInMs / 1000);
    const days = Math.floor(diffInSeconds / (3600 * 24));
    const hours = Math.floor((diffInSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((diffInSeconds % 3600) / 60);
    setDuration(`${days} days ${hours} hours ${minutes} minutes`);
  }, [dropoffDate, dropoffTime, pickupDate, pickupTime])

  // console.log({ duration })

  return (
    <div>
      <main className="bg-[url('/png/details-bg.png')] bg-no-repeat bg-cover max-w-[511px] m-auto sm:px-2 rounded-xl flex bg-[#f7f7f7] flex-col items-center justify-center py-6 w-[90%]" style={{ backgroundSize: "100% 100%" }}>
        <div className="max-w-[376px]  sm:py-0 sm:px-0 px-4">
          <div className="sm:h-[50px] h-[43px] bg-black text-white font-bold text-[20px] flex justify-center items-center rounded-xl w-[80%] m-auto sm:w-[100%]">
            <span className="text-center sm:text-md text-[18px] whitespace-nowrap px-10">Booking Details</span>
          </div>
          <div className="font-bold flex justify-center my-5  text-[18px]">
            <span className="font-semibold">Location : </span>{" "}
            <span className="text-[#ff0000] ml-2"> {city}</span>
          </div>
          <div className="flex flex-row sm:justify-between text-center sm:text-left justify-center items-center sm:gap-10 gap-2">
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
                <span className="text-[#787070] text-sm">{(moment(pickupTime, 'HH:mm').format('hh:mm A'))}</span>
              </span>
            </div>

            {
              tabValueRedux !== 'Subscription' &&
              <div>
                <span className="bg-[#ff0000] py-[14px] px-[14px] font-bold text-white rounded-full">
                  To
                </span>
              </div>
            }


            {
              tabValueRedux !== 'Subscription' &&
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
                  <span className="text-[#787070] text-sm">{(moment(dropoffTime, 'HH:mm').format('hh:mm A'))}</span>
                </span>
              </div>
            }
          </div>

          {
            tabValueRedux !== 'Subscription' &&
            <div className="my-8 text-center">
              <span className="bg-[#F2F7F6] w-full block p-4 rounded-lg drop-shadow-lg m-auto sm:text-md text-sm">
                <b> Duration: </b> {duration ? duration : ""}{" "}
              </span>
            </div>
          }

        </div>
      </main>
    </div>
  );
};

export default BookingDetailsCard;
