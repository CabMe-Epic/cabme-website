import React from "react";

const ExtraCharges = ({ details }: any) => {
  return (
    <div className="px-4">
      <div className=" mx-auto p-6 bg-white rounded-lg shadow-md max-w-[1250px] border">
        <h2 className="sm:text-2xl text-xl font-semibold mb-4 border-b-[1px] pb-4 border-grey-100">
          Extra Services
        </h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="flex flex-col items-center justify-center gap-4 pr-3 sm:border-r-[2px]">
            {details?.extraService.packageType && (
              <div className="grid grid-cols-[1.3fr_1fr] items-center sm:justify-center justify-between w-full sm:text-md text-sm gap-4">
                <span className="text-[#161616]">Package Type:</span>
                <span className="text-[#ff0000] ">
                  {details?.extraService.packageType}
                </span>
              </div>
            )}
            {details?.extraService.freeKmsForRental !== 0 && (
              <div className="grid grid-cols-[1.3fr_1fr] items-center sm:justify-center justify-between w-full sm:text-md text-sm gap-4">
                <span className="text-[#161616]">Free kms for Rental:</span>
                <span className="text-[#ff0000]">
                  {details?.extraService.freeKmsForRental}
                </span>
              </div>
            )}
            {details?.extraService.roadSideAssistance && (
              <div className="grid grid-cols-[1.3fr_1fr] items-center sm:justify-center justify-between w-full sm:text-md text-sm gap-4">
                <span className="text-[#161616]">Road Side Assistance:</span>
                <span className="text-[#ff0000]">
                  {details?.extraService.roadSideAssistance}
                </span>
              </div>
            )}
            
          </div>

          <div className="flex flex-col justify-center items-center gap-4 pr-3 sm:border-r-[2px]">
            {details?.extraService.insurance && (
              <div className="grid grid-cols-[1.3fr_1fr] items-center sm:justify-center justify-between w-full sm:text-md text-sm gap-4">
                <span className="text-[#161616]">Insurance:</span>
                <span className="text-[#ff0000]">
                  {details?.extraService.insurance}
                </span>
              </div>
            )}
            {details?.extraService.fuel && (
              <div className="grid grid-cols-[1.3fr_1fr] items-center sm:justify-center justify-between w-full sm:text-md text-sm gap-4">
                <span className="text-[#161616]">Fuel:</span>
                <span className="text-[#ff0000]">
                  {details?.extraService.fuel}
                </span>
              </div>
            )}


            {details?.extraService.extraKmCharges !== 0 && (
              <div className="grid grid-cols-[1.3fr_1fr] items-center sm:justify-center justify-between w-full sm:text-md text-sm gap-4">
                <span className="text-[#161616]">Extra kms charges at:</span>
                <span className="text-[#ff0000]">
                  ₹{details?.extraService.extraKmCharges}
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-col  items-center justify-center gap-4 pr-3 ">
            {details?.extraService.babySeat && (
              <div className="grid grid-cols-[1.3fr_1fr] items-center sm:justify-center justify-between w-full sm:text-md text-sm gap-4">
                <span className="text-[#161616]">Baby Seat:</span>
                <span className="text-[#ff0000]">
                  {details?.extraService.babySeat}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* <div className=" max-w-[1250px] my-5 mx-auto">
        <span className="text-[#161616] px-4">
          Extra kms will be charged at{" "}
          <span className="text-[#ff0000]">13/km</span>
        </span>
      </div> */}
    </div>
  );
};

export default ExtraCharges;
