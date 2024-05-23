import Image from "next/image";

const ReviewCard = () => {
  return (
    <div className="max-w-[550px] border p-12 pb-8 m-auto rounded-xl">
      <div>
        <p className="relative text-center text-[#607D8B]">
          "As a satisfied customer of [SaaS Provider], I want to share my
          positive experience with others. Their software as a service platform
          has greatly improved the efficiency and productivity of our business
          operations. The cloud-based solution is user-friendly and regularly
          updated to stay ahead of the technology curve.{" "}
          <Image src="/svg/left-quote.svg" alt="quote" width={32} height={32} className="absolute top-[-30px] left-[-30px]" />
          <Image src="/svg/right-quote.svg" alt="quote" width={32} height={32} className="absolute bottom-[-30px] right-[-30px]" />
        </p>
        <div className="flex w-fit m-auto mt-4">
            <Image src={"/svg/rating-star.svg"} alt="rating" width={20} height={20} />
            <Image src={"/svg/rating-star.svg"} alt="rating" width={20} height={20} />
            <Image src={"/svg/rating-star.svg"} alt="rating" width={20} height={20} />
            <Image src={"/svg/rating-star.svg"} alt="rating" width={20} height={20} />
            <Image src={"/svg/rating-star.svg"} alt="rating" width={20} height={20} />
        </div>
        <p className="text-center mt-4">Savannah Nguyen</p>
        <p className="text-center">Customer</p>
      </div>
    </div>
  );
};
export default ReviewCard;
