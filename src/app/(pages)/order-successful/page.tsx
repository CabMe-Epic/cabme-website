import ExtraService from "@/app/components/extra-service/extra-service";
import UserDetails from "@/app/components/personalUser-details/personal-details";
import PriceSummary from "@/app/components/price-summary/price-summary";
import ThemeButton from "@/app/components/theme-button/theme-button";
import Image from "next/image";

const OrderSuccessful = (slug:any) => {
  console.log(slug,"slug");
  return (
    <div className="max-w-[1250px] m-auto">
      <div className="sm:my-12 my-6 sm:mx-0 mx-4 lg:flex gap-6">
        <div className="bg-gray-500 w-fit pt-4 sm:pb-8 pb-4 px-6 max-w-[830px] w-full lg:m-0 m-auto">
          <div className="flex justify-between">
            <div className="sm:flex gap-4">
              <span className="font-semibold sm:text-2xl text-lg">Creta Hyundai</span>
              <p className="w-fit bg-[#B5E6EA] text-[#1AC3D1] px-6 py-[5px] rounded-full font-[450] sm:mt-0 mt-1 sm:text-[15px] text-sm">
                Economy
              </p>
            </div>
            <span className="text-primary bg-white px-2 py-[5px] h-fit sm:text-[15px] text-[12px]">
              Self-Driving
            </span>
          </div>
          <div className="sm:flex items-center gap-6 mt-8">
            <div className="flex-none">
              <Image src="/png/creta.png" alt="car" width={317} height={186} />
            </div>
            <div className="w-full">
              <div className="grid grid-cols-3 justify-between gap-6">
                {speciCollection?.map((item, index) => {
                  return (
                    <div key={index} className="flex gap-2 sm:text-[15px] text-[12px]">
                      <Image
                        src={item?.imageUrl}
                        alt={item?.alt}
                        width={22}
                        height={22}
                      />
                      <p>{item?.content}</p>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4">
                <h3 className="font-semibold sm:mb-4 mb-2 mt-6">
                  Include in the price
                </h3>
                <div className="grid grid-cols-2 gap-2 text-[#787878]">
                  {includeArray?.map((item, index) => {
                    return (
                      <div key={index} className="flex gap-1 items-start">
                        <Image
                          src={"/svg/green-check.svg"}
                          alt="check"
                          width={16}
                          height={12}
                          className="flex-none sm:w-[16px] w-[12px] mt-[5px]"
                        />
                        <p className="text-sm">{item?.content}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-500 w-fit py-4 px-6 lg:max-w-[400px] max-w-[830px] w-full lg:m-0 m-auto ">
          <div className="flex gap-2 relative ml-[-11px]">
            <div className="border-l border-dashed w-[2px] relative left-[18px] top-4"></div>
            <p className="p-[4px] w-fit rounded-full bg-[#E4E4E4] w-[18px] h-[17px] flex items-center justify-center mt-[3px] z-[9]">
              <span className="w-2 h-2 block bg-primary-color rounded-full"></span>
            </p>
            <div className="pb-8">
              <h3 className="font-semibold">Pick-up</h3>
              <div className="text-[#707070] text-sm">
                <p className="my-2">March 11, 2019, 10:00AM</p>
                <p>Ahmedabad</p>
              </div>
            </div>
          </div>
          <div className="flex gap-2 mb-8">
            <p className="p-[4px] w-fit rounded-full bg-[#E4E4E4] w-[18px] h-[17px] flex items-center justify-center mt-[3px] z-[9]">
              <span className="w-2 h-2 block bg-primary-color rounded-full"></span>
            </p>
            <div>
              <h3 className="font-semibold">Drop-off</h3>
              <div className="text-[#707070] text-sm">
                <p className="my-2">March 17, 2019, 08:00AM</p>
                <p>Noida</p>
              </div>
            </div>
          </div>
          <h3 className="font-semibold">7 Days Booking</h3>
        </div>
      </div>
      <div className="sm:flex gap-6 sm:mx-0 mx-4">
        <div className="max-w-[830px] w-full">
          <ExtraService />
        </div>
        <div className="bg-gray-500 w-fit py-4 px-6 max-w-[400px] w-full pb-8 sm:mt-0 mt-6">
          <PriceSummary />
        </div>
      </div>
      <div className="sm:flex gap-6 sm:my-12 my-6 sm:px-0 px-4">
        <div className="max-w-[830px] w-full ">
          <UserDetails />
        </div>
        <div className="bg-gray-500 w-fit py-4 px-6 max-w-[400px] w-full pb-8 sm:mt-0 mt-6">
          <div>
            <h3 className="text-lg font-semibold">Expected date of delivery</h3>
            <p className="text-sm">Between 26th -  26th May</p>
          </div>
          <div className="my-4">
            <h3 className="text-lg font-semibold">Place of delivery</h3>
            <p className="text-sm">At your doorstep</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Delivery Address</h3>
            <p className="text-sm">B-21,Plot no -115,Street4 near Bansal Hospital Noida,201031</p>
          </div>
        </div>
      </div>
      <div className="sm:px-0 px-4">
      <div className="grid sm:grid-cols-2 bg-[#FBFBFB] p-6">
        <div className="max-w-[450px] w-full">
          <h3 className="font-semibold sm:text-2xl text-xl mb-4">DOCUMENT </h3>
          <div className=" sm:flex grid grid-cols-[45%_10%_45%] justify-between py-2">
            <span className="sm:w-[200px] w-auto">PAN Number</span>
            <span>:</span>
            <span>UXRG56789KO</span>
          </div>
          <div className="sm:my-4 my-2 sm:flex grid grid-cols-[45%_10%_45%] justify-between py-2">
            <span className="sm:w-[200px] w-auto">Driving License Number</span>
            <span>:</span>
            <span>678905443789</span>
          </div>
          <div className=" sm:flex grid grid-cols-[45%_10%_45%] justify-between py-2">
            <span className="sm:w-[200px] w-auto">Aadhar Number</span>
            <span>:</span>
            <span>3214 6788 8976</span>
          </div>
        </div>
        <div className="sm:border-l sm:pl-12 sm:mt-0 mt-6">
          <h3 className="font-semibold sm:text-2xl text-xl sm:mb-4 mb-2">DOCUMENT IMAGE  </h3>
          <div className="sm:flex items-center sm:mb-0 mb-4">
            <p className="max-w-[250px] w-full">PAN Number</p>
            <div className="flex gap-2">
              <Image src={"/png/pan-front.png"} alt="pancard" width={78} height={44} />
              <Image src={"/png/pan-back.png"} alt="pancard" width={78} height={44} />
            </div>
          </div>
          <div className="sm:flex my-2 items-center sm:mb-0 mb-4">
            <p className="max-w-[250px] w-full">Driving License Number</p>
            <div className="flex gap-2">
              <Image src={"/png/dl-front.png"} alt="license" width={78} height={44} />
              <Image src={"/png/dl-back.png"} alt="license" width={78} height={44} />
            </div>
          </div>
          <div className="sm:flex items-center sm:mb-0 mb-4">
            <p className="max-w-[250px] w-full">Aadhar Number</p>
            <div className="flex gap-2">
              <Image src={"/png/adhar-front.png"} alt="pancard" width={78} height={44} />
              <Image src={"/png/adhar-back.png"} alt="pancard" width={78} height={44} />
            </div>
          </div>
        </div>
      </div>
      </div>
      <div className="mt-8 pb-4">
        <ThemeButton text="Continue" className="m-auto !rounded-full shadow-custom-shadow grad-button font-semibold" />
      </div>
      <div className="my-6">
        <p className="text-sm text-center">We appreciate your trust in us and look forward to providing you with an exceptional experience.</p>
        <p className="text-sm text-center mt-4">If you have any questions or need to make any changes to your booking, please dont hesitate to contact us at [Contact Information].</p>
      </div>
    </div>
  );
};
export default OrderSuccessful;
const speciCollection = [
  {
    imageUrl: "/svg/manual.svg",
    alt: "manual",
    content: "Manual",
  },
  {
    imageUrl: "/svg/kilometer.svg",
    alt: "kilometer",
    content: "kilometer",
  },
  {
    imageUrl: "/svg/fuel.svg",
    alt: "manual",
    content: "Diesel",
  },
  {
    imageUrl: "/svg/handle.svg",
    alt: "Basic",
    content: "Basic",
  },
  {
    imageUrl: "/svg/engine.svg",
    alt: "engine",
    content: "2022",
  },
  {
    imageUrl: "/svg/person.svg",
    alt: "seat",
    content: "5 Person",
  },
];
const includeArray = [
  {
    content: "Free Cancellation",
  },
  {
    content: "Instant Confirmed",
  },
  {
    content: "Price Guarantee",
  },
  {
    content: "Damage Warrior",
  },
  {
    content: "Thefts Protection",
  },
  {
    content: "Full Balance on Delivery",
  },
];
