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

const CarFeatures = () => {
  return (
    <div className=" mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 border-b-[1px] pb-4 border-grey-100">Car Features</h2>
      <div className="grid grid-cols-2 gap-4">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center gap-4">
             <Image src="/carDetails/check.png" width={30} height={30} alt="" />
        
            <span className='text-[#6B6767]'>{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarFeatures;
