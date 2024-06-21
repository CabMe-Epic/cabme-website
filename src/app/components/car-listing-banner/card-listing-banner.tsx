import React from "react";
import Image from "next/image";

const CardListingBanner = () => {
  return (
    <div>
      <main className="sm:h-[141px] my-10 flex flex-row sm:justify-between items-center bg-[#fff5e1] p-4 pr-0 rounded-[12px]">
        <div className="w-fit">
          <Image
            src={"/carListingBanner/Car.png"}
            width={166}
            height={112}
          className="sm:w-[60%] w-[80%] h-auto"
            alt="car"
          />
        </div>
        <div className="sm:text-[20px] text-[12px] font-semibold">
          Drive smart, stay on track with our{" "}
          <span className="font-bold text-[#ff0000]">GPS-equipped</span>{" "}
          rentals.
        </div>
        <div className="mt-10 sm:ml-10">
          <Image
            src={"/carListingBanner/dots.png"}
            width={76}
            height={98}
            className="sm:w-full w-[70%]"
            alt="car"
          />
        </div>
      </main>
    </div>
  );
};
export default CardListingBanner;
