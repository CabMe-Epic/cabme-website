import Image from "next/image";

const FacilityComponent = () =>{
    return(
        <div className="grid sm:grid-cols-4 gap-4">
        {facilityCollection?.map((item, index) => {
          return (
            <div key={index} className="flex items-center gap-2 border border-[#FF0000] shadow-tabs-shadow rounded-md py-[4px] px-4 h-[42px]">
              <div className="rounded-md p-[4px] flex-none">
                <Image src={item?.imageURl} alt={item?.alt} width={22} height={22} />
              </div>
              <span className="whitespace-nowrap text-xs font-semibold">{item?.content}</span>
            </div>
          );
        })}
      </div>
    )
}
export default FacilityComponent
const facilityCollection = [
    {
      imageURl: "/svg/delivery.svg",
      content: "Doorstep delivery",
      alt:"delivery"
    },
    {
      imageURl: "/svg/assistance.svg",
      content: "24*7 Roadside Assistance",
      alt:"support"
    },
    {
      imageURl: "/svg/carrier.svg",
      content: "Luggage Carrier",
      alt:"carrier"
    },
    {
      imageURl: "/svg/fasttag.svg",
      content: "Fasttags",
      alt:"fastag"
    },
  ];