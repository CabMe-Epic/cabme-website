import Image from "next/image";
import React, { useState } from "react";
import ThemeButton from "../../components/theme-button/theme-button";

const CardListingCards = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [activeTab, setActiveTab] = useState("Inclusions");

  const tabs = [
    { name: "Exclusion", content: "Exclusion Content" },
    { name: "Inclusions", content: "Inclusions Content" },
    { name: "Facilities", content: "Facilities Content" },
    { name: "T&C", content: "T&C Content" },
  ];
  return (
    <div className="relative mb-10">
      {/*  */}

      {/*  */}
      <div className="absolute sm:block hidden -left-2 top-8 z-10">
        <Image
          src="/carListing/cardTag.png"
          width={133}
          objectFit={"contain"}
          height={46}
          alt="Tag Icon"
        />
      </div>
      <main className="bg-[url('/png/listing-bg.png')] sm:w-[1028px] h-[304px] rounded-[12px] hidden sm:flex flex-row items-center justify-center">
        <div className="flex flex-col items-center jusitfy-center w-[486px] h-full ">
          <div className="flex flex-row justify-center m-auto pr-10 pt-14">
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
        <div className="h-[274px]">
          <div className="mt-5 flex flex-row items-center gap-4 mr-10">
            <div className="sm:flex flex-row items-center justify-between bg-white gap-3 border-[1.5px] border-[#FF0000] px-2 py-2 rounded-lg sm:w-[210px] sm:h-[71px]">
              <span className="font-bold text-[18px] ">₹ 21,635</span>
              <span className="flex flex-col gap-0">
                <p className="text-[#565454] font-[500] text-[14px]">
                  120kms/day
                </p>
                <hr className="border-[#000000] border-[1.2px]" />
                <p className="text-[#FF0000] font-[500] text-[14px]">
                  360 Free kms
                </p>
              </span>
            </div>
            {/*  */}
            <div className="sm:flex flex-row items-center justify-between bg-white gap-3 border-[1.5px] border-[#000000] px-2 py-2 rounded-lg sm:w-[210px] sm:h-[71px]">
              <span className="font-bold text-[18px] ">₹ 21,635</span>
              <span className="flex flex-col gap-0">
                <p className="text-[#565454] font-[500] text-[14px]">
                  120kms/day
                </p>
                <hr className="border-[#000000] border-[1.2px]" />
                <p className="text-[#FF0000] font-[500] text-[14px]">
                  360 Free kms
                </p>
              </span>
            </div>
            {/*  */}
            <div className="sm:flex flex-row items-center justify-between bg-white gap-3 border-[1.5px] border-[#FF0000] px-2 py-2 rounded-lg sm:w-[210px] sm:h-[71px]">
              <span className="font-bold text-[18px] ">₹ 21,635</span>
              <span className="flex flex-col gap-0">
                <p className="text-[#565454] font-[500] text-[14px]">
                  120kms/day
                </p>
                <hr className="border-[#000000] border-[1.2px]" />
                <p className="text-[#FF0000] font-[500] text-[14px]">
                  360 Free kms
                </p>
              </span>
            </div>
          </div>
          {/*  */}

          <div className="flex flex-row justify-end mr-10 my-5">
            <span>
              ₹ Extra kms will be charged at{" "}
              <span className="text-[#FF0000]">13/km</span>
            </span>
          </div>

          {/*  */}

          <div className="flex flex-row justify-between items-center mr-10">
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
            <div className="m-0">
              <ThemeButton
                text="Book Now"
                className=" sm:px-6 !px-2 sm:text-md text-xs w-[140px] h-[50px] text-center shadow-lg flex flex-row justify-center !font-bold !text-[20px]
"
              />
            </div>
          </div>
          <div className="flex flex-row justify-end items-center w-full !pr-10 relative gap-2 cursor-pointer mt-2">
            <span
              className="text-[#ff0000]"
              onClick={() => setShowOptions(!showOptions)}
            >
              View Details{" "}
            </span>
            <Image
              src="/carListing/arrow.png"
              width={10}
              objectFit={"contain"}
              height={10}
              alt="bluetooth"
            />
            {showOptions ? (
              <div className="flex flex-col w-[750px] z-10 absolute right-0 top-8 bg-red-50 p-4 rounded-xl drop-shadow">
                <div className="flex justify-between px-4 items-center gap-[30px] bg-white rounded-lg overflow-hidden shadow-lg">
                  {tabs.map((tab) => (
                    <button
                      key={tab.name}
                      className={`py-2 px-4 rounded-t-xl mt-2 ${
                        activeTab === tab.name
                          ? "bg-red-200 text-red-600"
                          : "bg-red-600 text-white"
                      }`}
                      onClick={() => setActiveTab(tab.name)}
                    >
                      {tab.name}
                    </button>
                  ))}
                </div>
                <div className="mt-0 flex justify-center">
                  <div className="bg-red-200 px-4 py-2 rounded-lg flex justify-around items-center w-full max-w-4xl">
                    {activeTab === "Inclusions" && (
                      <>
                        <div className="flex flex-row gap-2 items-center bg-white px-4 py-2 rounded-md h-[42px]">
                          <Image
                            src="/carListingBanner/baseCar.png"
                            width={25}
                            height={25}
                            objectFit="contain"
                            alt="car"
                          />
                          <span className="text-sm">Base Fare</span>
                        </div>
                        <div className="flex flex-row gap-2 items-center bg-white px-4 py-2 rounded-md h-[42px]">
                          <Image
                            src="/carListingBanner/trip.png"
                            width={25}
                            height={25}
                            objectFit="contain"
                            alt="car"
                          />
                          <span className="text-sm">Trip Insurance</span>
                        </div>
                        <div className="flex flex-row gap-2 items-center bg-white px-4 py-2 rounded-md h-[42px]">
                          <Image
                            src="/carListingBanner/gst.png"
                            width={25}
                            height={10}
                            objectFit="contain"
                            alt="car"
                          />
                          <span className="text-sm">GST</span>
                        </div>
                        <div className="flex flex-row gap-2 items-center bg-white px-4 py-2 rounded-md h-[42px]">
                          <Image
                            src="/carListingBanner/deposit.png"
                            width={25}
                            height={25}
                            objectFit="contain"
                            alt="car"
                          />
                          <span className="text-sm">
                            Refundable Security Deposit
                          </span>
                        </div>
                      </>
                    )}
                    {activeTab === "Exclusion" && <div>Exclusion Content</div>}
                    {activeTab === "Facilities" && (
                      <div>Facilities Content</div>
                    )}
                    {activeTab === "T&C" && <div>T&C Content</div>}
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </main>
      {/* mobile view for car listing */}
      <section>
        <div className="sm:hidden block p-4 pb-0  relative pb-6 bg-[url('/carListing/listing-card-bg.png')]" style={{backgroundSize:"100% 100%"}}>
          <div className="grid grid-cols-3 gap-2 mt-10">
            {priceArray?.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`border text-center py-[3px] px-2 rounded-md`}
                >
                  <p
                    className={`${
                      item?.chargePerDay === "Unlimited"
                        ? "text-[#939393]"
                        : "text-[#565454]"
                    } text-sm`}
                  >
                    {item?.chargePerDay}
                  </p>
                  <strong className="block">{item?.price}</strong>
                  <p className="text-red-500 text-xs">{item?.kilometers}</p>
                </div>
              );
            })}
          </div>
          <div className="absolute top-4 left-[-8px]">
            <Image
              src="/carListing/cardTag.png"
              width={133}
              objectFit={"contain"}
              height={46}
              alt="Tag Icon"
            />
          </div>
          <div className="xs:grid grid-cols-[1fr_1.7fr] gap-2 mt-4">
            <div>
              <span>
                <Image
                  src={"/png/thar-full.png"}
                  alt="car"
                  width={350}
                  height={350}
                  className="xs:w-full w-[60%] h-auto xs:m-0 m-auto"
                />
              </span>

              <div className="flex flex-row justify-end items-center w-full xs:!pr-10 relative gap-2 cursor-pointer mt-2">
                <span
                  className="text-[#ff0000] text-xs"
                  onClick={() => setShowOptions(!showOptions)}
                >
                  View Details{" "}
                </span>
                <Image
                  src="/carListing/arrow.png"
                  width={10}
                  objectFit={"contain"}
                  height={10}
                  alt="bluetooth"
                  className={showOptions ? "" : "rotate-180"}
                />
                {showOptions ? (
                  <div className="flex flex-col z-10 absolute xs:left-[-10px] left-[-10px] xs:top-8 top-4 bg-red-50 rounded-xl drop-shadow">
                    <div className="flex justify-between xs:px-2 items-center xs:gap-[30px] gap-[4px] bg-white rounded-lg overflow-hidden shadow-lg">
                      {tabs.map((tab) => (
                        <button
                          key={tab.name}
                          className={`py-2 px-2 rounded-t-xl mt-2 xs:text-sm text-xs ${
                            activeTab !== tab.name
                              ? "bg-black text-white"
                              : "bg-white text-red-500 border shadow-xl"
                          }`}
                          onClick={() => setActiveTab(tab.name)}
                        >
                          {tab.name}
                        </button>
                      ))}
                    </div>
                    <div className="mt-0 flex justify-center">
                      <div className="rounded-lg grid gap-4 items-center w-full bg-white p-4">
                        {activeTab === "Inclusions" && (
                          <>
                            <div className="flex flex-row gap-[4px] items-center py-[2px] rounded-md">
                              <Image
                                src="/carListingBanner/baseCar.png"
                                width={20}
                                height={20}
                                objectFit="contain"
                                alt="car"
                              />
                              <span className="text-sm whitespace-nowrap">
                                Base Fare
                              </span>
                            </div>
                            <div className="flex flex-row gap-[4px] items-center bg-white py-[2px] rounded-md">
                              <Image
                                src="/carListingBanner/trip.png"
                                width={20}
                                height={20}
                                objectFit="contain"
                                alt="car"
                              />
                              <span className="text-sm whitespace-nowrap">
                                Trip Insurance
                              </span>
                            </div>
                            <div className="flex flex-row gap-2 items-center bg-white py-[2px] rounded-md">
                              <Image
                                src="/carListingBanner/gst.png"
                                width={16}
                                height={20}
                                objectFit="contain"
                                alt="car"
                              />
                              <span className="text-sm whitespace-nowrap">
                                GST
                              </span>
                            </div>
                            <div className="flex flex-row gap-[4px] items-center bg-white py-[2px] rounded-md">
                              <Image
                                src="/carListingBanner/deposit.png"
                                width={20}
                                height={20}
                                objectFit="contain"
                                alt="car"
                              />
                              <span className="text-sm whitespace-nowrap">
                                Refundable Security Deposit
                              </span>
                            </div>
                          </>
                        )}
                        {activeTab === "Exclusion" && (
                          <div className="text-sm">Exclusion Content</div>
                        )}
                        {activeTab === "Facilities" && (
                          <div className="text-sm">Facilities Content</div>
                        )}
                        {activeTab === "T&C" && (
                          <div className="text-sm">T&C Content</div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div>
              <div className="flex gap-2 xs:mt-0 mt-2">
                <p className="font-semibold text-xl">Polo</p>
                <div className="flex gap-2 px-2 py-[3px] rounded-md border border-red-500">
                  <div className="flex-none">
                    <Image
                      src="/carListing/view.png"
                      width={14}
                      objectFit={"contain"}
                      height={14}
                      alt="Car Icon"
                    />
                  </div>
                  <span className="text-[#ff0000] text-xs whitespace-nowrap">
                    View Real Car Images
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-[1fr_1.2fr] my-2">
                {featuresArray?.map((item, index) => {
                  return (
                    <div key={index} className="flex items-center gap-2 mt-2">
                      <div>
                        <Image
                          src={item?.imageUrl}
                          alt="image"
                          width={16}
                          height={16}
                        />
                      </div>
                      <span className="text-xs">{item?.feature}</span>
                    </div>
                  );
                })}
              </div>
              <ThemeButton text="Book Now" className="ml-auto mt-4" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default CardListingCards;
const priceArray = [
  {
    chargePerDay: "120kms/day",
    price: "₹ 21,635",
    kilometers: "360 Free kms",
  },
  {
    chargePerDay: "300kms/day",
    price: "₹ 25,229",
    kilometers: "900 Free kms",
  },
  {
    chargePerDay: "Unlimited",
    price: "₹ 38,675",
    kilometers: "Unlimited kms",
  },
];
const featuresArray = [
  {
    imageUrl: "/carListing/bluetooth.png",
    feature: "Bluetooth",
  },
  {
    imageUrl: "/carListing/gps.png",
    feature: "GPS Navigation",
  },
  {
    imageUrl: "/carListing/bootspace.png",
    feature: "Boot Space",
  },
  {
    imageUrl: "/carListing/gas.png",
    feature: "Diesel",
  },
];
