import Image from "next/image";
import ThemeButton from "./components/theme-button/theme-button";
import SliderManual from "./components/slider/slider-components";
import OfferCards from "./components/offer-cards/offer-cards";
import ReviewCard from "./components/review-card/review-card";

export default function Home() {
  return (
    <>
      <div
        className="bg-[url('/home-banner.png')] h-[370px] bg-no-repeat bg-contain flex items-center"
        style={{ backgroundSize: "100% 100%" }}
      >
        <div className="max-w-[1250px] w-full m-auto">
          <h1 className="text-4xl font-semibold mt-8">
            Experience innovation on
          </h1>
          <div className="mt-2">
            <p>
              <span>wheels with our</span>{" "}
              <b className="text-red-500 text-xl">
                brand-new selection of cars.
              </b>
            </p>
          </div>
        </div>
      </div>
      <div className="max-w-[1250px] m-auto my-20 shadow-xl border rounded-xl px-6 py-12 relative">
        <div className="max-w-[700px] flex m-auto justify-between border shadow-custom-shadow rounded-md absolute left-0 right-0 top-[-30px] w-full">
          {tabsArray?.map((value, ind) => {
            return (
              <div
                className={`cursor-pointer w-full text-center py-4 ${
                  value?.tabsValue === "Self-Driving"
                    ? "bg-red-500 text-white font-semibold"
                    : "bg-[#EFF1FB]"
                }`}
              >
                {value?.tabsValue}
              </div>
            );
          })}
        </div>
        <div className="flex items-center mt-6">
          {driverArray?.map((item, index) => {
            return (
              <div
                key={index}
                className={`flex w-full gap-4 ${
                  index < 3 ? "border-r-2 mr-6 border-black" : ""
                }`}
              >
                <div className="mt-2">
                  <Image
                    src={item?.imageUrl}
                    alt="icon"
                    width={16}
                    height={16}
                  />
                </div>
                <div className="leading-none">
                  <h3 className="text-xl font-semibold">{item?.heading}</h3>
                  <p className="mt-2">{item?.desc}</p>
                </div>
              </div>
            );
          })}

          <div>
            <ThemeButton text="Search" />
          </div>
        </div>
      </div>
      <div className="max-w-[1250px] w-full m-auto">
        <h2 className="text-4xl font-semibold text-center">
          Trending <span className="text-red-500"> offers</span>
        </h2>
        <div className="w-fit flex justify-center m-auto text-md font-semibold my-6">
          <div className="py-4 px-8 bg-red-500 text-white rounded-l-full cursor-pointer">
            Daily Offers
          </div>
          <div className="py-4 px-8 bg-black text-white rounded-r-full cursor-pointer">
            Monthly Offers
          </div>
        </div>
        {/* <SliderManual /> */}
        <OfferCards />
      </div>
      <div className="max-w-[1250px] m-auto my-20">
        <h2 className="text-center text-4xl font-semibold">
          <span className="text-red-500"> Why</span> choose us
        </h2>
        <div className="grid grid-cols-4 mt-10">
          {chooseArray?.map((value, ind) => {
            return (
              <>
                <div key={ind} className="text-center grid gap-4 h-[250px]">
                  <div className="flex">
                    <Image
                      src={value?.imageUrl}
                      alt="image"
                      width={value?.width}
                      height={value?.height}
                      className="m-auto h-[80px] w-auto"
                    />
                  </div>
                  <div className="px-4">
                    <h3 className="font-semibold">{value?.title}</h3>
                    <p className="text-xs mt-1">{value?.desc}</p>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
      <div className="max-w-[1250px] m-auto">
        <h2 className="text-center font-semibold text-4xl">
          Fleets <span className="text-red-500">high</span> on demand{" "}
        </h2>
        <div className="grid grid-cols-3 gap-6 my-12">
          {fleetsArray?.map((item, index) => {
            return (
              <div
                className=" bg-[#FAFAFA] shadow-custom-shadow w-full border p-4 rounded-xl"
                key={index}
              >
                <div className="flex justify-between">
                  <span className="bg-[#403D3D] text-white px-4 py-1 text-xs rounded-md">
                    {item?.badge}
                  </span>
                  <div className="flex gap-[3px]">
                    <Image
                      src={"/svg/rating-star.svg"}
                      alt="rating"
                      width={18}
                      height={18}
                    />
                    <Image
                      src={"/svg/rating-star.svg"}
                      alt="rating"
                      width={18}
                      height={18}
                    />
                    <Image
                      src={"/svg/rating-star.svg"}
                      alt="rating"
                      width={18}
                      height={18}
                    />
                    <Image
                      src={"/svg/rating-star.svg"}
                      alt="rating"
                      width={18}
                      height={18}
                    />
                  </div>
                </div>
                <div className="h-[185px]">
                  <Image
                    src={item?.imageUrl}
                    alt="car"
                    width={400}
                    height={185}
                  />
                </div>
                <h3 className="font-semibold text-2xl text-center border-b pb-2 mt-4">
                  {item?.title}
                </h3>
                <div className="grid grid-cols-3 gap-6 mt-4">
                  {item?.specification?.map((value, ind) => {
                    return (
                      <div key={ind} className="flex gap-4">
                        <Image
                          src={value?.iconUrl}
                          alt="icons"
                          width={18}
                          height={18}
                        />
                        <span className="text-sm">{value?.speci}</span>
                      </div>
                    );
                  })}
                </div>
                <p className="text-xs my-4">{item?.desc}</p>
                <ThemeButton className="w-full" text="Book Now" />
              </div>
            );
          })}
        </div>
      </div>
      <div className="max-w-[1250px] m-auto my-16">
        <h2 className="text-4xl font-semibold text-center">
          Make <span className="text-red-500"> 4 steps</span> to rent a car
        </h2>
        <div className="grid grid-cols-4 gap-8 mt-12">
          {rentCollection?.map((item, index) => {
            return (
              <div key={index} className="p-6 relative">
                <span className="text-white mb-6 font-semibold bg-red-500 w-8 h-8 flex justify-center items-center rounded-full">
                  {item?.steps}
                </span>
                <Image
                  src={item?.imageUrl}
                  alt="image"
                  width={62}
                  height={62}
                  className={`${
                    item?.imageUrl === "/svg/car-vector.svg"
                      ? "w-[130px]"
                      : "w-auto"
                  } h-[62px] m-auto mb-4`}
                />
                <div className="text-center">
                  <h3 className="font-semibold text-xl">{item?.title}</h3>
                  <p className="text-sm mt-2">{item?.desc}</p>
                </div>
                {index < 3 ? (
                  <Image
                    src={"/svg/arrow.svg"}
                    alt="arrow"
                    width={140}
                    height={30}
                    className="absolute top-[35%] right-[-30%]"
                  />
                ) : (
                  ""
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex justify-between bg-[#F9F9F9]">
        <div className="grid grid-cols-2 justify-center w-full">
          <div className="w-[450px] m-auto">
            <h3 className="font-bold text-[62px]">
              5% <span className="font-normal">OFF</span>
            </h3>
            <div className="border-b border-black text-xl my-2 pb-4 text-[#909090]">
              <span>Car Rental Discount</span> <br />
              <span>until May 21st 2024</span>
            </div>
            <h4 className="font-semibold text-2xl text-[34px]">
              DISCOUNT CODE : <span className="text-red-500">NEW5</span>
            </h4>
          </div>
          <div className="flex justify-end">
            <Image src={"/png/thar.png"} alt="thar" width={543} height={280} />
          </div>
        </div>
        <div className="bg-red-500 w-[120px] text-white p-4 flex items-center font-semibold text-2xl text-center">
          <div>
            <div className="mb-2">
              <span>GET IT </span> <br />
              <span>NOW</span>
            </div>
            <Image
              src={"/svg/arrow-white.svg"}
              alt="arrow"
              width={50}
              height={20}
              className="m-auto"
            />
          </div>
        </div>
      </div>
      {/* app section */}
      <div className="grid grid-cols-2 p-4 bg-[#FCE2E2] my-16">
        <div className="max-w-[550px] m-auto">
          <h3 className="font-bold text-3xl">
            <span className="text-red-500">Download</span> our app to get <br />
            most out of it
          </h3>
          <p className="my-8">
            Thrown shy denote ten ladies though ask saw. Or by to he going think
            order event music. Incommode so intention defective at convinced.
            Led income months itself and houses you.
          </p>
          <div className="flex gap-12">
            <button>
              <Image
                src={"/png/play-store.png"}
                alt="play-store"
                width={179}
                height={77}
              />
            </button>
            <button>
              <Image
                src={"/png/apple.png"}
                alt="apple"
                width={179}
                height={77}
              />
            </button>
          </div>
        </div>
        <div>
          <Image
            src={"/png/app.png"}
            alt="app"
            width={700}
            height={550}
            className="w-full h-[532px]"
          />
        </div>
      </div>
      <div className="my-20">
        <h2 className="text-4xl font-semibold text-center mb-12">Customer <span className="text-red-500">reviews</span></h2>
        <ReviewCard />
      </div>
    </>
  );
}
const driverArray = [
  {
    imageUrl: "/svg/location.svg",
    heading: "Pick-up City",
    desc: "Enter pick-up city",
  },
  {
    imageUrl: "/svg/calender.svg",
    heading: "Pick Up Date",
    desc: "Enter pickup date",
  },
  {
    imageUrl: "/svg/location.svg",
    heading: "Drop-off City",
    desc: "Enter drop-off city",
  },
  {
    imageUrl: "/svg/calender.svg",
    heading: "Drop-off Date",
    desc: "Enter drop-off date",
  },
];
const tabsArray = [
  {
    tabsValue: "Driver",
  },
  {
    tabsValue: "Self-Driving",
  },
  {
    tabsValue: "Subscription",
  },
];
const chooseArray = [
  {
    imageUrl: "/png/car01.png",
    width: 139,
    height: 132,
    title: "Safe and Sanitized Car",
    desc: "Your safety is our priority, with a car that's sanitized for purity.",
  },
  {
    imageUrl: "/png/car02.png",
    width: 164,
    height: 132,
    title: "Safe and Sanitized Car",
    desc: "Your safety is our priority, with a car that's sanitized for purity.",
  },
  {
    imageUrl: "/png/car03.png",
    width: 127,
    height: 95,
    title: "Safe and Sanitized Car",
    desc: "Your safety is our priority, with a car that's sanitized for purity.",
  },
  {
    imageUrl: "/png/car04.png",
    width: 136,
    height: 132,
    title: "Safe and Sanitized Car",
    desc: "Your safety is our priority, with a car that's sanitized for purity.",
  },
  {
    imageUrl: "/png/car05.png",
    width: 197,
    height: 132,
    title: "Safe and Sanitized Car",
    desc: "Your safety is our priority, with a car that's sanitized for purity.",
  },
  {
    imageUrl: "/png/car06.png",
    width: 164,
    height: 132,
    title: "Safe and Sanitized Car",
    desc: "Your safety is our priority, with a car that's sanitized for purity.",
  },
  {
    imageUrl: "/png/car07.png",
    width: 95,
    height: 95,
    title: "Safe and Sanitized Car",
    desc: "Your safety is our priority, with a car that's sanitized for purity.",
  },
  {
    imageUrl: "/png/car08.png",
    width: 191,
    height: 73,
    title: "Safe and Sanitized Car",
    desc: "Your safety is our priority, with a car that's sanitized for purity.",
  },
];
const fleetsArray = [
  {
    badge: "Maruti",
    imageUrl: "/cars/swift.png",
    title: "Swift Dzire",
    specification: [
      {
        iconUrl: "/svg/manual.svg",
        speci: "Manual",
      },
      {
        iconUrl: "/svg/speed.svg",
        speci: "14Km",
      },
      {
        iconUrl: "/svg/diesel.svg",
        speci: "14Km",
      },
      {
        iconUrl: "/svg/basic.svg",
        speci: "Basic",
      },
      {
        iconUrl: "/svg/engine.svg",
        speci: "2022",
      },
      {
        iconUrl: "/svg/person.svg",
        speci: "5 Person",
      },
    ],
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
  },
  {
    badge: "Mahindra",
    imageUrl: "/cars/xuv-mahindra.png",
    title: "XUV 700 Mahindra",
    specification: [
      {
        iconUrl: "/svg/manual.svg",
        speci: "Manual",
      },
      {
        iconUrl: "/svg/speed.svg",
        speci: "14Km",
      },
      {
        iconUrl: "/svg/diesel.svg",
        speci: "14Km",
      },
      {
        iconUrl: "/svg/basic.svg",
        speci: "Basic",
      },
      {
        iconUrl: "/svg/engine.svg",
        speci: "2022",
      },
      {
        iconUrl: "/svg/person.svg",
        speci: "5 Person",
      },
    ],
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
  },
  {
    badge: "Honda",
    imageUrl: "/cars/amaze.png",
    title: "AMAZE VX",
    specification: [
      {
        iconUrl: "/svg/manual.svg",
        speci: "Manual",
      },
      {
        iconUrl: "/svg/speed.svg",
        speci: "14Km",
      },
      {
        iconUrl: "/svg/diesel.svg",
        speci: "14Km",
      },
      {
        iconUrl: "/svg/basic.svg",
        speci: "Basic",
      },
      {
        iconUrl: "/svg/engine.svg",
        speci: "2022",
      },
      {
        iconUrl: "/svg/person.svg",
        speci: "5 Person",
      },
    ],
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
  },
];
const rentCollection = [
  {
    steps: 1,
    imageUrl: "/svg/calendar.svg",
    title: "Date & Location",
    desc: "Pick the location and the needed rent date.",
  },
  {
    steps: 2,

    imageUrl: "/svg/car-vector.svg",
    title: "Choose A Car",
    desc: "Select the vehicle using our catalogues.",
  },
  {
    steps: 3,

    imageUrl: "/svg/search.svg",
    title: "Make A Booking",
    desc: "Enter your name and booking details.",
  },
  {
    steps: 4,

    imageUrl: "/svg/ride.svg",
    title: "Enjoy Your Ride!",
    desc: "Enjoy your trip and our good services!",
  },
];
