import Image from "next/image";

const FAQ = () => {
  return (
    <div className="max-w-[1250px] m-auto px-4">
      <div className="flex">
        <div className="grid gap-4 max-w-[410px] m-auto">
          <h2 className="sm:text-4xl text-2xl sm:text-left text-center font-bold">
            Any <span className="sm:text-black text-primary"> questions</span>{" "}
            <br />
            <span className="text-primary sm:block hidden">
              {" "}
              WE GOT YOU
            </span>{" "}
          </h2>
          <p className="mb-6 sm:block hidden">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea{" "}
          </p>
        </div>
        <Image
          src={"/png/car-red.png"}
          alt="car"
          width={628}
          height={340}
          className="sm:block hidden"
        />
      </div>
      <div>
        
      </div>
    </div>
  );
};
export default FAQ;
