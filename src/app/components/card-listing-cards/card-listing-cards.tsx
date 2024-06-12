import Image from 'next/image';
import React from 'react';
import ThemeButton from "../../components/theme-button/theme-button";

const CardListingCards = () => {
    return (
        <div className="relative mb-10">
            <div className="absolute -left-2 top-8 z-10">
                <Image
                    src="/carListing/cardTag.png"
                    width={133}
                    objectFit={"contain"}
                    height={46}
                    alt="Tag Icon"
                />
            </div>
            <main className='bg-gradient-to-r from-[#fff] from-10% via-[#F4C6C1] via-30% to-[#fff] to-90% w-[1028px] h-[304px] rounded-[12px] border-[#DCDCDC] border-2 flex flex-row items-center justify-center'>
                <div className="flex flex-col items-center jusitfy-center w-[486px] h-full ">
                    <div className='flex flex-row justify-center m-auto pr-10 pt-14'>
                        <h1 className="m-auto font-bold text-[24px]">POLO</h1>
                    </div>
                    <Image
                        src="/carListing/carDemo.png"
                        width={386}
                        objectFit={"contain"}
                        height={212}
                        alt="Car Icon"
                    />
                    <div className="flex flex-row items-center gap-2 border-[1.2px] border-[#ff0000] px-1 rounded-md mb-4 cursor-pointer">
                        <Image
                            src="/carListing/view.png"
                            width={20}
                            objectFit={"contain"}
                            height={20}
                            alt="Car Icon"
                        />
                        <span className="text-[#ff0000]">View Real Car Images</span>
                    </div>

                </div>
                {/* ---------------------------------------- */}
                <div className='h-[274px]'>
                    <div className="mt-5 flex flex-row items-center gap-4 mr-10">
                        <div className="flex flex-row items-center justify-between bg-white gap-3 border-[1.5px] border-[#FF0000] px-2 py-2 rounded-lg w-[210px] h-[71px]">
                            <span className='font-bold text-[18px] '>₹ 21,635</span>
                            <span className="flex flex-col gap-0">

                                <p className="text-[#565454] font-[500] text-[14px]">120kms/day</p>
                                <hr className="border-[#000000] border-[1.2px]" />
                                <p className="text-[#FF0000] font-[500] text-[14px]">360 Free kms</p>
                            </span>
                        </div>
                        {/*  */}
                        <div className="flex flex-row items-center justify-between bg-white gap-3 border-[1.5px] border-[#000000] px-2 py-2 rounded-lg w-[210px] h-[71px]">
                            <span className='font-bold text-[18px] '>₹ 21,635</span>
                            <span className="flex flex-col gap-0">

                                <p className="text-[#565454] font-[500] text-[14px]">120kms/day</p>
                                <hr className="border-[#000000] border-[1.2px]" />
                                <p className="text-[#FF0000] font-[500] text-[14px]">360 Free kms</p>
                            </span>
                        </div>
                        {/*  */}
                        <div className="flex flex-row items-center justify-between bg-white gap-3 border-[1.5px] border-[#FF0000] px-2 py-2 rounded-lg w-[210px] h-[71px]">
                            <span className='font-bold text-[18px] '>₹ 21,635</span>
                            <span className="flex flex-col gap-0">

                                <p className="text-[#565454] font-[500] text-[14px]">120kms/day</p>
                                <hr className="border-[#000000] border-[1.2px]" />
                                <p className="text-[#FF0000] font-[500] text-[14px]">360 Free kms</p>
                            </span>
                        </div>
                    </div>
                    {/*  */}

                    <div className="flex flex-row justify-end mr-10 my-5">
                        <span>
                            ₹ Extra kms will be charged at <span className="text-[#FF0000]">13/km</span>
                        </span>
                    </div>

                    {/*  */}

                    <div className='flex flex-row justify-between items-center mr-10'>
                        <div className="grid grid-cols-3 gap-y-6">
                            <div className="flex flex-row items-center gap-2">
                                <Image
                                    src="/carListing/bluetooth.png"
                                    width={20}
                                    objectFit={"contain"}
                                    height={20}
                                    alt="bluetooth"
                                />
                                <span>Bluetooth</span>
                            </div>
                            <div className="flex flex-row items-center gap-2">
                                <Image
                                    src="/carListing/manual.png"
                                    width={20}
                                    objectFit={"contain"}
                                    height={20}
                                    alt="bluetooth"
                                />
                                <span>Manual</span>
                            </div>
                            <div className="flex flex-row items-center gap-2">
                                <Image
                                    src="/carListing/gps.png"
                                    width={20}
                                    objectFit={"contain"}
                                    height={20}
                                    alt="bluetooth"
                                />
                                <span>GPS Navigation</span>
                            </div>
                            <div className="flex flex-row items-center gap-2">
                                <Image
                                    src="/carListing/seats.png"
                                    width={20}
                                    objectFit={"contain"}
                                    height={20}
                                    alt="bluetooth"
                                />
                                <span>5 Person</span>
                            </div>
                            <div className="flex flex-row items-center gap-2">
                                <Image
                                    src="/carListing/gas.png"
                                    width={20}
                                    objectFit={"contain"}
                                    height={20}
                                    alt="bluetooth"
                                />
                                <span>Diseal</span>
                            </div>
                            <div className="flex flex-row items-center gap-2">
                                <Image
                                    src="/carListing/bootspace.png"
                                    width={20}
                                    objectFit={"contain"}
                                    height={20}
                                    alt="bluetooth"
                                />
                                <span>Boot Space</span>
                            </div>
                        </div>
                        <div className='m-0'>
                            <ThemeButton
                                text="Book Now"
                                className=" sm:px-6 !px-2 sm:text-md text-xs w-[140px] h-[50px] text-center shadow-lg flex flex-row justify-center !font-bold !text-[20px]
"
                            />
                        </div>

                    </div>
                    <div className='flex flex-row justify-end items-center w-full !pr-10 gap-2 cursor-pointer mt-6'>
                        <span className="text-[#ff0000]">View Details </span>
                        <Image
                            src="/carListing/arrow.png"
                            width={10}
                            objectFit={"contain"}
                            height={10}
                            alt="bluetooth"
                        />
                    </div>
                </div>

            </main>
        </div>
    )
}
export default CardListingCards;
