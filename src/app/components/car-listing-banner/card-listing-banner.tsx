import React from 'react';
import Image from 'next/image';

 const CardListingBanner = () => {
  return (
    <div>
      <main className="h-[141px] my-10 flex flex-row justify-between items-center bg-[#FFE9BB] p-4 pr-0 rounded-[12px]">
        <div>
        <Image 
        src={"/carListingBanner/Car.png"}
        width={166}
        height={112}
        objectFit={"contain"}
        alt='car'
        />
        </div>
        <div className="text-[20px] font-semibold">
        Drive smart, stay on track with our <span className="font-bold text-[#ff0000]">GPS-equipped</span> rentals.
        </div>
        <div className='mt-10 ml-10'> 
        <Image 
        src={"/carListingBanner/dots.png"}
        width={76}
        height={98}
        objectFit={"contain"}
        alt='car'
        />
        </div>
      </main>
    </div>
  )
}
export default CardListingBanner;