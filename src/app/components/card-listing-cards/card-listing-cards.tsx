import Image from 'next/image';
import React, {useState} from 'react';
import ThemeButton from "../../components/theme-button/theme-button";

const CardListingCards = () => {
    const [showOptions, setShowOptions] = useState(false);
    const [activeTab, setActiveTab] = useState('Inclusions');

    const tabs = [
      { name: 'Exclusion', content: 'Exclusion Content' },
      { name: 'Inclusions', content: 'Inclusions Content' },
      { name: 'Facilities', content: 'Facilities Content' },
      { name: 'T&C', content: 'T&C Content' },
    ];
    return (
        <div className="relative mb-10">
            {/*  */}
                    
                        {/*  */}
            <div className="absolute -left-2 top-8 z-10">
                <Image
                    src="/carListing/cardTag.png"
                    width={133}
                    objectFit={"contain"}
                    height={46}
                    alt="Tag Icon"
                />
            </div>
            <main className="bg-[url('/png/listing-bg.png')] w-[1028px] h-[304px] rounded-[12px] flex flex-row items-center justify-center">
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
                            width={16}
                            objectFit={"contain"}
                            height={16}
                            alt="Car Icon"
                        />
                        <span className="text-[#ff0000] text-sm">View Real Car Images</span>
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
                            <span className='font-bold text-[18px] '>₹ 25,229</span>
                            <span className="flex flex-col gap-0">

                                <p className="text-[#565454] font-[500] text-[14px]">300kms/day</p>
                                <hr className="border-[#000000] border-[1.2px]" />
                                <p className="text-[#FF0000] font-[500] text-[14px]">900 Free kmss</p>
                            </span>
                        </div>
                        {/*  */}
                        <div className="flex flex-row items-center justify-between bg-white gap-3 border-[1.5px] border-[#FF0000] px-2 py-2 rounded-lg w-[210px] h-[71px]">
                            <span className='font-bold text-[18px] '>₹ 38,675</span>
                            <span className="flex flex-col gap-0">

                                <p className="text-[#565454] font-[500] text-[14px]">Unlimited</p>
                                <hr className="border-[#000000] border-[1.2px]" />
                                <p className="text-[#FF0000] font-[500] text-[14px]">Unlimited Kms</p>
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
                    <div className='flex flex-row justify-end items-center w-full !pr-10 relative gap-2 cursor-pointer mt-2'>
                        <span className="text-[#ff0000]" onClick={ ( ) => setShowOptions(!showOptions)}>View Details </span>
                        <Image
                            src="/carListing/arrow.png"
                            width={10}
                            objectFit={"contain"}
                            height={10}
                            alt="bluetooth"
                        />
                         {
                        showOptions ? 
                        <div className="flex flex-col w-[750px] z-10 absolute right-0 top-8 bg-red-50 p-4 rounded-xl drop-shadow">
                        <div className="flex justify-between px-4 items-center gap-[30px] bg-white rounded-lg overflow-hidden shadow-lg">
                          {tabs.map((tab) => (
                            <button
                              key={tab.name}
                              className={`py-2 px-4 rounded-t-xl mt-2 ${activeTab === tab.name ? 'bg-red-200 text-red-600' : 'bg-red-600 text-white'}`}
                              onClick={() => setActiveTab(tab.name)}
                            >
                              {tab.name}
                            </button>
                          ))}
                        </div>
                        <div className="mt-0 flex justify-center">
                          <div className="bg-red-200 px-4 py-2 rounded-lg flex justify-around items-center w-full max-w-4xl">
                            {activeTab === 'Inclusions' && (
                              <>
                                <div className="flex flex-row gap-2 items-center bg-white px-4 py-2 rounded-md h-[42px]">
                                  <Image
                                    src="/carListingBanner/baseCar.png"
                                    width={25}
                                    height={25}
                                    objectFit="contain"
                                    alt="car"
                                  />
                                  <span className='text-sm'>Base Fare</span>
                                </div>
                                <div className="flex flex-row gap-2 items-center bg-white px-4 py-2 rounded-md h-[42px]">
                                  <Image
                                    src="/carListingBanner/trip.png"
                                    width={25}
                                    height={25}
                                    objectFit="contain"
                                    alt="car"
                                  />
                                  <span className='text-sm'>Trip Insurance</span>
                                </div>
                                <div className="flex flex-row gap-2 items-center bg-white px-4 py-2 rounded-md h-[42px]">
                                  <Image
                                    src="/carListingBanner/gst.png"
                                    width={25}
                                    height={10}
                                    objectFit="contain"
                                    alt="car"
                                  />
                                  <span className='text-sm'>GST</span>
                                </div>
                                <div className="flex flex-row gap-2 items-center bg-white px-4 py-2 rounded-md h-[42px]">
                                  <Image
                                    src="/carListingBanner/deposit.png"
                                    width={25}
                                    height={25}
                                    objectFit="contain"
                                    alt="car"
                                  />
                                  <span className='text-sm'>Refundable Security Deposit</span>
                                </div>
                              </>
                            )}
                            {activeTab === 'Exclusion' && <div>Exclusion Content</div>}
                            {activeTab === 'Facilities' && <div>Facilities Content</div>}
                            {activeTab === 'T&C' && <div>T&C Content</div>}
                          </div>
                        </div>
                      </div>

: ""
                     }
                    </div>
                </div>

            </main>
        </div>
    )
}
export default CardListingCards;
