import Image from "next/image";
import React, { useState } from "react";

interface PackageItem {
  location: string;
  subLocation?: string;
  price: string | number;
}

interface DropLocationProps {
  currentPackage: PackageItem[];
  onSelectItem?: (item: PackageItem | null) => void; // Add this prop
  onClose?: any;
}

const DropLocation: React.FC<DropLocationProps> = ({
  currentPackage,
  onClose,
  onSelectItem,
}) => {
  const [selectedItem, setSelectedItem] = useState<PackageItem | null>(null);

  const handleSelectItem = (item: PackageItem) => {
    setSelectedItem(item);
    if (onSelectItem) {
      onSelectItem(item); // Call the callback function
    }
  };

  const handleRemoveItem = () => {
    setSelectedItem( null);
    if (onSelectItem) {
      onSelectItem(null); // Call the callback function
    }
  }

  return (
    <div className="bg-white shadow-md  overflow-hidden max-w-[900px] w-[340px] lg:w-[600px] rounded-xl relative">
      <h2 className="text-xl font-semibold text-black mb-4 p-4 pb-0">
        Drop Location
      </h2>
      <div className="bg-[#ff0000] text-white p-2 py-4">
        <div className="flex justify-between text-xl mx-4">
          <span className="font-semibold">Location</span>
          <span className="font-semibold">Cost</span>
        </div>
      </div>
      <div className="max-h-[500px]  overflow-auto">
        <div className="bg-white divide-y divide-gray-200 rounded-xl break-all ">
          
           
            {
                <div
                onClick={handleRemoveItem}
                className={`p-4 mx-2 flex gap-4 justify-between cursor-pointer text-sm`}
              >
                <div className="flex items-center justify-between w-full mr-4">
                  <p className="font-semibold text-gray-700 ">
                    Remove Selected Location{" "}
                  </p>
                  <Image src="/dustbin.png" width={15} height={15} alt="" />
                </div>
              </div>
            }
          

          {currentPackage
          ?.map((item, index) => (
            <div
              key={index}
              onClick={() => handleSelectItem(item)} // Handle item selection
              className={`p-4 mx-2 flex gap-4 justify-between cursor-pointer text-sm ${
                selectedItem === item ? "bg-gray-100" : ""
              }`}
            >
              <div className=" ">
                <p className="font-semibold text-gray-700 ">{item.location}</p>
                <p className="text-gray-500 font-[400] ">
                  {item.subLocation || "N/A"}
                </p>
              </div>
              <div className="flex items-center">
                <p className="text-gray-500 min-w-[55px]">₹{item.price}</p>
              </div>
              
            </div>
          ))}
          
        </div>
      </div>

      <div
        className="w-[34] h-[34] rounded-full border w-fit absolute top-4 right-4 cursor-pointer"
        onClick={onClose}
      >
        <Image src="/svg/close-red.svg" alt="close" width={20} height={20} />
      </div>
    </div>
  );
};

export default DropLocation;
