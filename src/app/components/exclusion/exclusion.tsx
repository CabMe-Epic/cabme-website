import Image from "next/image";

const ExclusionComponent = () => {
  return (
    <div className="grid grid-cols-4 gap-4">
      {exclusionCollection?.map((item, index) => {
        return (
          <div key={index} className="flex items-center gap-2 border border-[#FF0000] shadow-tabs-shadow rounded-md py-[4px] px-4">
            <div className="rounded-md p-[4px] flex-none">
              <Image src={item?.imageURl} alt={item?.alt} width={22} height={22} />
            </div>
            <span className="whitespace-nowrap text-xs font-semibold">{item?.content}</span>
          </div>
        );
      })}
    </div>
  );
};
export default ExclusionComponent;
const exclusionCollection = [
  {
    imageURl: "/png/fuels-png.svg",
    content: "Fuel",
    alt:"fuel"
  },
  {
    imageURl: "/png/toll-png.svg",
    content: "Tolls",
    alt:"toll"
  },
  {
    imageURl: "/png/parkings-png.svg",
    content: "Parking",
    alt:"parking"
  },
  {
    imageURl: "/png/charges.svg",
    content: "Interstate Charges",
    alt:"charges"
  },
];
