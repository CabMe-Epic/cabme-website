// components/CarFeatures.js
import Image from 'next/image';
import React from 'react';

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
    <div className=" mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 border-b-[1px] pb-4 border-grey-100">Car Features</h2>
      <div className="grid grid-cols-2 gap-4">
        {/* {features.map((feature, index) => ( */}
        <div className="flex items-center gap-4">

          {
            carFeatures?.adaptiveCruiseControl ? <Image src="/carDetails/check.png" width={30} height={30} alt="" /> : "X"
          }
          <span className='text-[#6B6767] sm:text-md text-sm'>Adaptive Cruise Control</span>
          <span className='text-[#6B6767] sm:text-md text-sm'>{carFeatures?.adaptiveCruiseControl}</span>
        </div>
        <div className="flex items-center gap-4">

          {
            carFeatures?.androidAuto ?
              <Image src="/carDetails/check.png" width={30} height={30} alt="" /> : "X"

          }
          <span className='text-[#6B6767] sm:text-md text-sm'>androidAuto</span>

          <span className='text-[#6B6767] sm:text-md text-sm'>{carFeatures?.androidAuto}</span>
        </div>
        <div className="flex items-center gap-4">
          {
            carFeatures?.bluetooth ?
              <Image src="/carDetails/check.png" width={30} height={30} alt="" />
              : "X"

          }
          <span className='text-[#6B6767] sm:text-md text-sm'>Bluetooth</span>

          <span className='text-[#6B6767] sm:text-md text-sm'>{carFeatures?.bluetooth}</span>
        </div>
        <div className="flex items-center gap-4">
          <Image src="/carDetails/check.png" width={30} height={30} alt="" />

          <span className='text-[#6B6767] sm:text-md text-sm'>{carFeatures?.cylinders}</span>
          <span className='text-[#6B6767] sm:text-md text-sm'>cylinders</span>
        </div>
        <div className="flex items-center gap-4">

          {
            carFeatures?.heatedFrontSeats ?
              <Image src="/carDetails/check.png" width={30} height={30} alt="" />
              : "X"

          }
          <span className='text-[#6B6767] sm:text-md text-sm'>Heated Front Seats</span>
          <span className='text-[#6B6767] sm:text-md text-sm'>{carFeatures?.heatedFrontSeats}</span>
        </div>
        <div className="flex items-center gap-4">

          {
            carFeatures?.intermittentWipers ?
              <Image src="/carDetails/check.png" width={30} height={30} alt="" /> : "X"
          }
          <span className='text-[#6B6767] sm:text-md text-sm'>intermittent Wipers</span>
          <span className='text-[#6B6767] sm:text-md text-sm'>{carFeatures?.intermittentWipers}</span>
        </div>
        <div className="flex items-center gap-4">
          {
            carFeatures?.keylessStart ?
              <Image src="/carDetails/check.png" width={30} height={30} alt="" />
              : "X"

          }
          <span className='text-[#6B6767] sm:text-md text-sm'>keyless Start</span>
          <span className='text-[#6B6767] sm:text-md text-sm'>{carFeatures?.keylessStart}</span>
        </div>
        <div className="flex items-center gap-4">
          {
            carFeatures?.memorySeat ?
              <Image src="/carDetails/check.png" width={30} height={30} alt="" />
              : "X"

          }
          <span className='text-[#6B6767] sm:text-md text-sm'>Memory Seat</span>
          <span className='text-[#6B6767] sm:text-md text-sm'>{carFeatures?.memorySeat}</span>

        </div>
        <div className="flex items-center gap-4">
          {
            carFeatures?.multiZoneAC ?
              <Image src="/carDetails/check.png" width={30} height={30} alt="" />
              : "X"

          }
          <span className='text-[#6B6767] sm:text-md text-sm'>Multi Zone AC</span>

          <span className='text-[#6B6767] sm:text-md text-sm'>{carFeatures?.multiZoneAC}</span>
        </div>
        <div className="flex items-center gap-4">
          {
            carFeatures?.navigationSystem ?
              <Image src="/carDetails/check.png" width={30} height={30} alt="" />
              : "X"
          }
          <span className='text-[#6B6767] sm:text-md text-sm'>Navigation System</span>

          <span className='text-[#6B6767] sm:text-md text-sm'>{carFeatures?.navigationSystem}</span>
        </div>
        <div className="flex items-center gap-4">
          {
            carFeatures?.powerWindows ?
              <Image src="/carDetails/check.png" width={30} height={30} alt="" />
              : "X"

          }
          <span className='text-[#6B6767] sm:text-md text-sm'>Power Windows</span>
          <span className='text-[#6B6767] sm:text-md text-sm'>{carFeatures?.powerWindows}</span>
        </div>
        <div className="flex items-center gap-4">
          {
            carFeatures?.premiumSoundSystem ?
              <Image src="/carDetails/check.png" width={30} height={30} alt="" />
              : "X"
          }

          <span className='text-[#6B6767] sm:text-md text-sm'>Premium Sound System</span>
          <span className='text-[#6B6767] sm:text-md text-sm'>{carFeatures?.premiumSoundSystem}</span>
        </div>
        {/* ))} */}
      </div>
    </div>
  );
};

export default CarFeatures;
