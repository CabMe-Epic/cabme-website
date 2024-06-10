import Image from "next/image";
import ThemeButton from "../theme-button/theme-button";

const PickupDropOff = () =>{
    return(
        <>
             <div className="max-w-[1250px] sm:block hidden m-auto my-20 shadow-xl border rounded-xl px-6 py-12 relative">
        <div className="max-w-[700px] flex m-auto justify-between border shadow-custom-shadow rounded-md absolute left-0 right-0 top-[-30px] w-full">
          {tabsArray?.map((value, ind) => {
            return (
              <div
                className={`cursor-pointer w-full text-center py-4 ${
                  value?.tabsValue === "Self-Driving"
                    ? "bg-red-500 text-white font-semibold"
                    : "bg-[#EFF1FB]"
                }`}
                key={ind}
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
        </>
    )
}
export default PickupDropOff
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