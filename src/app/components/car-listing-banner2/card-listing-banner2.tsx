import React from "react";
import Image from "next/image";

const CardListingBanner2 = (cardCount: any) => {
  console.log(cardCount,"cardCountcardCount")
  return (
    <div>
      <main className="sm:h-[141px] my-10 flex gap-4 flex-row sm:justify-between items-center bg-[#F6FAFB] p-4 pr-0 rounded-[12px]">
        <div className="w-fit">
          <Image
            src={"/carListingBanner/girl2.svg"}
            width={106}
            height={112}
          className=" h-auto"
            alt="car"
          />
        </div>
        <div className="sm:text-[20px] text-[12px] font-semibold">
        Unlimited  {" "}
          <span className="font-bold text-[#ff0000]">Kilometers </span>{" "}
          - No need for fuel slips or reimbursements.
        </div>
        <div className="mt-10 sm:ml-10">
          <Image
            src={"/carListingBanner/dot2.svg"}
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
export default CardListingBanner2;
