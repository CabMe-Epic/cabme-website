// components/CarFeatures.js
import Image from "next/image";
import React from "react";

const features = [
  "Multi-zone A/C",
  "Premium sound system",
  "6 Cylinders",
  "Android Auto",
  "Keyless Start",
  "Intermittent wipers",
  "Navigation system",
  "Memory seat",
  "Bluetooth",
  "Heated front seats",
  "4 power windows",
  "Adaptive Cruise Control",
];

const CarFeatures = ({ carFeatures }: any) => {
  return (
    <div className="sm:max-w-[600px] lg:max-w-full mx-auto p-6 bg-white rounded-lg shadow-features-shadow">
      <h2 className="sm:text-2xl text-xl sm:font-bold font-semibold mb-4 border-b-[1px] pb-4 border-grey-100">
        Car Features
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {/* {features.map((feature, index) => ( */}
        {carFeatures?.adaptiveCruiseControl && (
          <>
            <div className="flex items-center gap-4">
              <Image
                src="/carDetails/check.png"
                width={30}
                height={30}
                alt=""
              />

              <span className="text-[#6B6767] sm:text-md text-sm">
                Adaptive Cruise Control
              </span>
              <span className="text-[#6B6767] sm:text-md text-sm">
                {carFeatures?.adaptiveCruiseControl}
              </span>
            </div>
          </>
        )}
        {carFeatures?.androidAuto && (
          <>
            <div className="flex items-center gap-4">
              <Image
                src="/carDetails/check.png"
                width={30}
                height={30}
                alt=""
              />

              <span className="text-[#6B6767] sm:text-md text-sm">
                androidAuto
              </span>

              <span className="text-[#6B6767] sm:text-md text-sm">
                {carFeatures?.androidAuto}
              </span>
            </div>
          </>
        )}
        {carFeatures?.bluetooth && (
          <>
            <div className="flex items-center gap-4">
              <Image
                src="/carDetails/check.png"
                width={30}
                height={30}
                alt=""
              />

              <span className="text-[#6B6767] sm:text-md text-sm">
                Bluetooth
              </span>

              <span className="text-[#6B6767] sm:text-md text-sm">
                {carFeatures?.bluetooth}
              </span>
            </div>
          </>
        )}
        {carFeatures?.cylinders !== 0 && (
          <div className="flex items-center gap-4">
            <Image src="/carDetails/check.png" width={30} height={30} alt="" />
            <div>
              <span className="text-[#6B6767] sm:text-md text-sm">
                {carFeatures?.cylinders}
              </span>
              <span className="text-[#6B6767] sm:text-md text-sm">
                cylinders
              </span>
            </div>
          </div>
        )}
        {carFeatures?.heatedFrontSeats && (
          <>
            <div className="flex items-center gap-4">
              <Image
                src="/carDetails/check.png"
                width={30}
                height={30}
                alt=""
              />

              <span className="text-[#6B6767] sm:text-md text-sm">
                Heated Front Seats
              </span>
              <span className="text-[#6B6767] sm:text-md text-sm">
                {carFeatures?.heatedFrontSeats}
              </span>
            </div>
          </>
        )}
        {carFeatures?.intermittentWipers && (
          <div className="flex items-center gap-4">
            <Image src="/carDetails/check.png" width={30} height={30} alt="" />

            <span className="text-[#6B6767] sm:text-md text-sm">
              intermittent Wipers
            </span>
            <span className="text-[#6B6767] sm:text-md text-sm">
              {carFeatures?.intermittentWipers}
            </span>
          </div>
        )}
        {carFeatures?.keylessStart && (
          <div className="flex items-center gap-4">
            <Image src="/carDetails/check.png" width={30} height={30} alt="" />

            <span className="text-[#6B6767] sm:text-md text-sm">
              keyless Start
            </span>
            <span className="text-[#6B6767] sm:text-md text-sm">
              {carFeatures?.keylessStart}
            </span>
          </div>
        )}
        {carFeatures?.memorySeat && (
          <div className="flex items-center gap-4">
            <Image src="/carDetails/check.png" width={30} height={30} alt="" />

            <span className="text-[#6B6767] sm:text-md text-sm">
              Memory Seat
            </span>
            <span className="text-[#6B6767] sm:text-md text-sm">
              {carFeatures?.memorySeat}
            </span>
          </div>
        )}
        {carFeatures?.multiZoneAC && (
          <div className="flex items-center gap-4">
            <Image src="/carDetails/check.png" width={30} height={30} alt="" />

            <span className="text-[#6B6767] sm:text-md text-sm">
              Multi Zone AC
            </span>

            <span className="text-[#6B6767] sm:text-md text-sm">
              {carFeatures?.multiZoneAC}
            </span>
          </div>
        )}
        {carFeatures?.navigationSystem && (
          <div className="flex items-center gap-4">
            <Image src="/carDetails/check.png" width={30} height={30} alt="" />

            <span className="text-[#6B6767] sm:text-md text-sm">
              Navigation System
            </span>

            <span className="text-[#6B6767] sm:text-md text-sm">
              {carFeatures?.navigationSystem}
            </span>
          </div>
        )}
        {carFeatures?.powerWindows!==0 && (
          <div className="flex items-center gap-4">
            <Image src="/carDetails/check.png" width={30} height={30} alt="" />

            <span className="text-[#6B6767] sm:text-md text-sm">
              Power Windows
            </span>
            <span className="text-[#6B6767] sm:text-md text-sm">
              {carFeatures?.powerWindows}
            </span>
          </div>
        )}
        {carFeatures?.premiumSoundSystem && (
          <div className="flex items-center gap-4">
            <Image src="/carDetails/check.png" width={30} height={30} alt="" />

            <span className="text-[#6B6767] sm:text-md text-sm">
              Premium Sound System
            </span>
            <span className="text-[#6B6767] sm:text-md text-sm">
              {carFeatures?.premiumSoundSystem}
            </span>
          </div>
        )}
        {/* ))} */}
      </div>
    </div>
  );
};

export default CarFeatures;
