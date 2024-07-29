import React from "react";
import Image from "next/image";

interface CardListingBannerProps {
  count: number;
}

const CardListingBanner: React.FC<CardListingBannerProps> = ({ count }) => {
  function isInSequence1(x: number): boolean {
    return (x - 2) % 6 === 0;
  }

  function isInSequence2(x: number): boolean {
    return (x - 4) % 6 === 0;
  }

  function isInSequence3(x: number): boolean {
    return (x - 6) % 6 === 0;
  }

  function isInAnySequence(x: number): boolean {
    return isInSequence1(x) || isInSequence2(x) || isInSequence3(x);
  }

  let imageSrc = "";
  if (isInSequence1(count)) {
    imageSrc = "/carListingBanner/car.png";
  } else if (isInSequence2(count)) {
    imageSrc = "/carListingBanner/girl2.svg";
  } else if (isInSequence3(count)) {
    imageSrc = "/carListingBanner/trip2.svg";
  }

  let dotSrc = "/carListingBanner/dots.png";
  if (isInSequence1(count)) {
    dotSrc = "/carListingBanner/dots.png";
  } else if (isInSequence2(count)) {
    dotSrc = "/carListingBanner/dot2.svg";
  } else if (isInSequence3(count)) {
    dotSrc = "/carListingBanner/dot3.svg";
  }

  let paraSrc;
  if (isInSequence1(count)) {
    paraSrc = (
      <div className="sm:text-[20px] text-[12px] font-semibold">
        Drive smart, stay on track with our{" "}
        <span className="font-bold text-[#ff0000]">GPS-equipped</span>{" "}
        rentals.
      </div>
    );
  } else if (isInSequence2(count)) {
    paraSrc = (
      <div className="sm:text-[20px] text-[12px] font-semibold">
        Unlimited{" "}
        <span className="font-bold text-[#ff0000]">Kilometers</span>{" "}
        - No need for fuel slips or reimbursements.
      </div>
    );
  } else if (isInSequence3(count)) {
    paraSrc = (
      <div className="sm:text-[20px] text-[12px] font-semibold">
        Rent a{" "}
        <span className="font-bold text-[#ff0000]">self-drive</span>{" "}
        car on a Daily, Weekly, or Monthly basis.
      </div>
    );
  } else {
    paraSrc = (
      <div className="sm:text-[20px] text-[12px] font-semibold">
        Default paragraph text.
      </div>
    );
  }

  console.log(isInAnySequence(count), "isInSeq");

  let bgColor = "bg-[#FDF9F9]";
  if (isInSequence1(count)) {
    bgColor = "bg-[#FDF9F9]";
  } else if (isInSequence2(count)) {
    bgColor = "bg-[#F6FAFB]";
  } else if (isInSequence3(count)) {
    bgColor = "bg-[#fcefd4]";
  }

  return (
    <div>
      <main
        className={`sm:h-[141px] my-10 flex gap-4 flex-row sm:justify-between items-center ${bgColor} p-4 pr-0 rounded-[12px]`}>
        <div className="w-fit">
          <Image
            src={imageSrc}
            width={106}
            height={112}
            className="h-auto"
            alt="banner"
          />
        </div>
        <div className="sm:text-[20px] text-[12px] font-semibold">
          {paraSrc}
        </div>
        <div className="mt-10 sm:ml-10">
          <Image
            src={dotSrc}
            width={76}
            height={98}
            className=""
            alt="dots"
          />
        </div>
      </main>
    </div>
  );
};

export default CardListingBanner;
