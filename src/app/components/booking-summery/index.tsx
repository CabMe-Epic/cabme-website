"use client";
import Image from "next/image";

import { useParams } from "next/navigation";
import useVehicleById from "../../../../networkRequests/hooks/useVehicleById";
import React, { useCallback, useState } from "react";
import { searchVehicle } from "../../../../networkRequests/hooks/api";
import { useRouter } from 'next/navigation'
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useReservationDateTime from "../../../../networkRequests/hooks/useReservationDateTime";
import { extractDaysAndHours } from "@/app/utils/extractDaysAndHours";
import { calculatePrice } from "@/app/utils/calculatePrice ";
import { fetchPromoCodes } from "../../../../networkRequests/hooks/promocodes";

const BookingSummery = () => {


    return (
        <div>
            <main className=" px-4 shadow-custom-shadow flex flex-col items-center bg-[#FAFAFA] py-10 my-6 rounded-md">
                <div className="max-w-[376px] h-[50px] w-full bg-black text-white font-bold text-[20px] flex justify-center items-center rounded-xl">
                    <span className="text-center">Booking Summary</span>
                </div>
                <div className="m-auto my-5">
                    <span className="font-bold text-[24px]">Fare Details</span>
                </div>
                <div className="grid grid-cols-1 w-full items-start justify-between gap-4 font-semibold">
                    <div className="flex justify-between gap-2 text-sm">
                        <span className="">Base Fare</span>
                        <span className="">
                            ₹ 1000
                        </span>
                    </div>

                    <div className="flex justify-between gap-2 text-sm">
                        <span className="">Doorstep delivery & pickup</span>
                        <span className="">₹ 1000</span>
                    </div>

                    <div className="flex justify-between gap-2 text-sm">
                        <span className="">Insurance & GST</span>
                        <span className="">23</span>
                    </div>

                    <div className="flex justify-between gap-2 text-sm">
                        <span className="">Refundable Deposit</span>
                        <span className="">₹ 34</span>
                    </div>

                    <div className="flex px-2 py-2 text-md justify-between gap-2 shadow-custom-inner font-bold">
                        <span className="">TOTAL</span>
                        <span className=" text-[#ff0000]">₹34</span>
                    </div>

                    <div className="flex justify-between gap-2 text-sm">
                        <span className="">Kms Limit</span>
                        <span className="">₹ 434 kms</span>
                    </div>

                    <div className="flex justify-between gap-2 text-sm">
                        <span className="">Fuel</span>
                        <span className="">Petrol</span>
                    </div>

                    <div className="flex justify-between gap-2 text-sm">
                        <span className="">Extra kms charge</span>
                        <span className="">100 km</span>
                    </div>

                    <div className="flex justify-between gap-2 text-sm">
                        <span className="">
                            Tolls,Parking & <br /> Inner-state taxes
                        </span>
                        <span className="">50</span>
                    </div>
                </div>
                <div className="w-full">
                    <span className="flex flex-row my-5 mt-10">
                        <Image
                            src="/png/offer.png"
                            width={20}
                            height={20}
                            alt="offer"
                        />
                        <select
                            name="offer"
                            id="offer"
                            className="border-0 outline-0 bg-transparent max-w-[405px] text-sm"
                        >
                            <option value="View all promo coupons">
                                View all promo coupons
                            </option>
                        </select>
                    </span>

                    <div className="max-w-[418px]  h-[45px] flex flex-row justify-center border-[1.5px] border-[#ff0000] rounded item-center bg-white px-4">
                        <input
                            type="text"
                            placeholder="DJF4D4F"
                            className="w-full border-0 outline-none pr-4 text-[#888787]"
                        />
                        <button className="text-[#ff0000]">Apply</button>
                    </div>

                    <div className="my-6 h-[69px] drop-shadow-lg bg-[#E7E7E7] flex flex-row items-center justify-between px-4 py-5 rounded-3xl">
                        <div className="flex flex-row items-center gap-4">
                            <span className="text-2xl font-bold">Total Amount</span>
                            <span className="text-[#ff0000] p-0 text-xl font-semibold">
                                ₹ 15,000
                            </span>
                        </div>
                        <div>
                            {/* <button className="bg-gradient-to-r from-[#F1301E] to-[#FA4F2F] text-xl font-semibold text-white px-6 py-2 rounded-full drop-shadow-lg">
                                Proceed
                            </button> */}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center border-[1.5px] max-w-[423px] w-full py-2 rounded-3xl border-[#ff0000] cursor-pointer">
                    <span className="font-bold text-md">Pay ₹10,000 Now</span>
                    <span className="text-[#ff0000] font-semibold text-[15px]">
                        Balance on Delivery
                    </span>
                </div>
            </main>
        </div>
    )
}

export default BookingSummery;