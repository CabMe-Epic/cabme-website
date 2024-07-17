import React from "react";
import Image from "next/image";

const CardListingBanner3 = (cardCount: any) => {
  console.log(cardCount,"cardCountcardCount")
  return (
    <div>
      <main className="sm:h-[141px] my-10 flex gap-4 flex-row sm:justify-between items-center bg-[#fcefd4] p-4 pr-0 rounded-[12px]">
        <div className="w-fit">
          <Image
            src={"/carListingBanner/trip2.svg"}
            width={106}
            height={112}
          className=" h-auto"
            alt="car"
          />
        </div>
        <div className="sm:text-[20px] text-[12px] font-semibold">
          Rent a  {" "}
          <span className="font-bold text-[#ff0000]">self-drive </span>{" "}
          car on a Daily, Weekly or Monthly basis.
        </div>
        <div className="mt-10 sm:ml-10">
          <Image
            src={"/carListingBanner/dot3.svg"}
            width={76}
            height={98}
            className=""
            alt="car"
          />
        </div>
      </main>
    </div>
  );
};
export default CardListingBanner3;
