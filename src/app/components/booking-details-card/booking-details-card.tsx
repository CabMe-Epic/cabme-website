import Image from 'next/image';
import React from 'react';

const BookingDetailsCard = () => {
    return (
        <div>

            <main className="w-[511px] h-[304px] border-[1.5px] rounded-md flex flex-col items-center justify-center">
                <div className='w-[376px] h-[50px] bg-black text-white font-bold text-[20px] flex justify-center items-center rounded-xl'>
                    <span className="text-center">Booking Details</span>
                </div>
                <div className="font-bold flex justify-center my-5  text-[18px]">
                    <span >Location  : </span> <span className="text-[#ff0000] ml-2"> Delhi</span>
                </div>
                <div className="flex flex-row justify-between items-center gap-10">
                    <div className="flex flex-col gap-2">
                        <span className="font-bold">Pick-up</span>
                        <span className="flex flex-row items-center gap-3">
                            <Image src="/png/calender.png" width={20} height={20} alt="calender" />
                            <span className="text-[#787070]">Feb 6, 2023</span>
                        </span>
                        <span className="flex flex-row items-center gap-3">
                            <Image src="/png/time.png" width={20} height={20} alt="time" />
                            <span className="text-[#787070]">02:45 AM</span>
                        </span>
                    </div>
                    <div>
                        <span className="bg-[#ff0000] py-[14px] px-[14px] font-bold text-white rounded-full">To</span>
                    </div>
                    <div className="flex flex-col gap-2"> <span className="font-bold">Drop-off</span>
                        <span className="flex flex-row items-center gap-3">
                            <Image src="/png/calender.png" width={20} height={20} alt="calender" />
                            <span className="text-[#787070]">Feb 6, 2023</span>
                        </span>
                        <span className="flex flex-row items-center gap-3">
                            <Image src="/png/time.png" width={20} height={20} alt="calender" />
                            <span className="text-[#787070]">02:45 AM</span>
                        </span>
                    </div>
                    
                </div>
                <div className="mt-6 mb-6">
                <span className='bg-[#F2F7F6] w-[240px] h-[50px] p-4 rounded-lg drop-shadow-lg '>Duration: 2days,24hours,12minutes </span>
                </div>
            </main>

        </div>
    )
}

export default BookingDetailsCard;
