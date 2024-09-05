"use client";
import React, { useEffect, useState } from 'react';
import ExtraService from "@/app/components/extra-service/extra-service";
import UserDetails from "@/app/components/personalUser-details/personal-details";
import PriceSummary from "@/app/components/price-summary/price-summary";
import ThemeButton from "@/app/components/theme-button/theme-button";
import Image from "next/image";
import axios from 'axios';

const OrderSuccessful = (slug: any) => {
  const [bookingData, setBookingData] = useState<any>(null);

  const id = '66d2c2c06443b4d84b055c37';
  const url = `process.env.NEXT_PUBLIC_URI_BASE}/cabme/booking/${id}`;
  const header = { Authorization: 'Bearer' };

  // useEffect(() => {
  //   axios.get(url, { headers })
  //     .then((response: { data: any; }) => {
  //       setBookingData(response.data);
  //     })
  //     .catch((error: any) => {
  //       console.error('Error:', error);
  //     });
  // }, [bookingId]);


  const bookingDataRes = React.useCallback(async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_URI_BASE}/cabme/booking/${id}`);
      console.log("res data", { response })
      setBookingData(response.data)

    } catch (error) {
      console.log("error", error)

    }
  }, [])

  React.useEffect(() => {
    bookingDataRes()

  }, [bookingDataRes])

  console.log("bookingData", { bookingData })



  return (
    <div className="max-w-[1250px] m-auto">
      <div className="sm:my-12 my-6 sm:mx-0 mx-4 lg:flex gap-6">
        <div className="bg-gray-500 w-fit pt-4 sm:pb-8 pb-4 px-6 max-w-[830px] w-full lg:m-0 m-auto">
          <div className="flex justify-between">
            <div className="sm:flex gap-4">
              <span className="font-semibold sm:text-2xl text-lg">{bookingData?.booking?.vehicleId?.brandName} {bookingData?.booking?.vehicleId?.carName}</span>
              <p className="w-fit bg-[#B5E6EA] text-[#1AC3D1] px-6 py-[5px] rounded-full font-[450] sm:mt-0 mt-1 sm:text-[15px] text-sm">
              {bookingData?.booking?.vehicleId?.vehicleSpecifications?.body}
              </p>
            </div>
            <span className="text-primary bg-white px-2 py-[5px] h-fit sm:text-[15px] text-[12px]">
            {bookingData?.booking?.bookingStatus?.selfDrive && "Self Driving"}
              {bookingData?.booking?.bookingStatus?.withDriver && "With Driver"}
              {bookingData?.booking?.bookingStatus?.subscription && "Subscription"}
           
            </span>
          </div>
          <div className="sm:flex items-center gap-6 mt-8">
            <div className="flex-none">
              <Image src={bookingData?.booking?.vehicleId?.featuredImage?.image} alt="car" width={317} height={186} />
            </div>
            <div className="w-full">

            <div className="grid grid-cols-3 justify-between gap-6">
              <div className="flex gap-2 sm:text-[15px] text-[12px]">
                <Image
                  src="/svg/manual.svg"
                  alt="manual"
                  width={22}
                  height={22}
                />
       <p>{bookingData?.booking?.vehicleId?.vehicleSpecifications?.transmission}</p>
 </div>

    <div className="flex gap-2 sm:text-[15px] text-[12px]">              
                <Image
                  src="/svg/kilometer.svg"
                  alt="kilometer"
                  width={22}
                  height={22}
                />
    <p>{bookingData?.booking?.vehicleId?.vehicleSpecifications?.mileage}</p>

     </div>
     <div className="flex gap-2 sm:text-[15px] text-[12px]">
                <Image
                  src="/svg/fuel.svg"
                  alt="fuel"
                  width={22}
                  height={22}
                />
       <p>{bookingData?.booking?.vehicleId?.vehicleSpecifications?.fuelType}</p>
 </div>
 <div className="flex gap-2 sm:text-[15px] text-[12px]">
                <Image
                  src="/svg/handle.svg"
                  alt="basic"
                  width={22}
                  height={22}
                />
       <p>{bookingData?.booking?.vehicleId?.vehicleSpecifications?.driveTrain}</p>
 </div>
 <div className="flex gap-2 sm:text-[15px] text-[12px]">
                <Image
                  src="/svg/engine.svg"
                  alt="engine"
                  width={22}
                  height={22}
                />
       <p>{bookingData?.booking?.vehicleId?.vehicleSpecifications?.make}</p>
 </div>
 <div className="flex gap-2 sm:text-[15px] text-[12px]">
                <Image
                  src="/svg/person.svg"
                  alt="seat"
                  width={22}
                  height={22}
                />
       <p>{bookingData?.booking?.vehicleId?.seatingCapacity}</p>
 </div>
           
            {/* <div className="w-full"> */}

      
              {/* <div className="grid grid-cols-3 justify-between gap-6">
                {speciCollection?.map((item: any, index: number) => {
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
                  
              </div> */}
              </div>
              
              
              
              
          
                <div className="mt-4">
                <h3 className="font-semibold sm:mb-4 mb-2 mt-6">
                  Include in the price
                </h3>
                <div className="grid grid-cols-2 gap-2 text-[#787878]">
                  {includeArray?.map((item: any, index: number) => {
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
                <p className="my-2">{new Date(bookingData?.booking?.pickUpDateTime).toLocaleString('en-US', {
    timeZone: 'UTC',
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })}</p>
                <p>{bookingData?.booking?.location}</p>
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
                <p className="my-2">{new Date(bookingData?.booking?.dropOffDateTime).toLocaleString('en-US', {
    timeZone: 'UTC',
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
   
  })}</p>
                <p>{bookingData?.booking?.toCity}</p>
              </div>
            </div>
          </div>
          <h3 className="font-semibold">{bookingData?.booking?.bookingDuration}</h3>
        </div>
      </div>
      <div className="sm:flex gap-6 sm:mx-0 mx-4">
        <div className="max-w-[830px] w-full">
        <div className="bg-[#FBFBFB] py-4 px-6">
            <h3 className="font-semibold text-2xl pb-2 border-b">Extra Service</h3>
            <div className="grid sm:grid-cols-2 sm:gap-8 gap-4 mt-6">
                <div className="w-full flex gap-2 sm:text-[15px] text-[14px] justify-between">
                    <span>Extra Service</span>
                    <span className="text-primary">{bookingData?.booking?.vehicleId?.extraService?.extraKms}</span>
                </div>
                <div className="w-full flex gap-2 sm:text-[15px] text-[14px] justify-between">
                    <span>Insurance</span>
                    <span className="text-primary">{bookingData?.booking?.vehicleId?.extraService?.insurance}</span>
                </div>
                <div className="w-full flex gap-2 sm:text-[15px] text-[14px] justify-between">
                    <span>Free kms for rental</span>
                    <span className="text-primary">{bookingData?.booking?.kmsLimit}</span>
                </div>
                <div className="w-full flex gap-2 sm:text-[15px] text-[14px] justify-between">
                    <span>Road Side Assistance</span>
                    <span className="text-primary">{bookingData?.booking?.vehicleId?.extraService?.roadSideAssistance}</span>
                </div>
                <div className="w-full flex gap-2 sm:text-[15px] text-[14px] justify-between">
                    <span>Extra km charges at</span>
                    <span className="text-primary">{bookingData?.booking?.vehicleId?.bookingOptions?.selfDrive?.packageType?.extraKmsCharge}</span>
                </div>
                <div className="w-full flex gap-2 sm:text-[15px] text-[14px] justify-between">
                    <span>Baby Seat</span>
                    <span className="text-primary">{bookingData?.booking?.vehicleId?.extraService?.babySeat}</span>
                </div>
            </div>
        </div>
        </div>
        <div className="bg-gray-500 w-fit py-4 px-6 max-w-[400px] w-full pb-8 sm:mt-0 mt-6">
        <div className="h-full">
      <h3 className="text-xl font-semibold pb-4">Price Summary</h3>
      <div className="grid h-full">
        <div className="border-b pb-2">
          <div className="flex justify-between sm:mb-0 mb-1">
            <span className="sm:text-[15px] text-[14px]">Base Fare</span>
            <span className="sm:text-lg">{bookingData?.booking?.baseFare}</span>
          </div>
          <div className="flex justify-between sm:mb-0 mb-1">
          <span className="sm:text-[15px] text-[14px]">Refundable Deposit</span>
          <span className="sm:text-lg">{bookingData?.booking?.refundableDeposit}</span>
          </div>
          <div className="flex justify-between sm:mb-0 mb-1">
          <span className="sm:text-[15px] text-[14px]">GST Amount</span>
          <span className="sm:text-lg">{bookingData?.booking?.gstAmount}</span>
          </div>
          <div className="flex justify-between sm:mb-0 mb-1">
          <span className="sm:text-[15px] text-[14px]">DoorStep Delivery Charge</span>
          <span className="sm:text-lg">{bookingData?.booking?.doorstepDelivery}</span>
          </div>
          <div className="flex justify-between mt-4">
            <div>
              <span className="sm:text-[15px] text-[14px]">Discount</span>
              <span className="text-[#83E943] sm:text-[15px] text-[14px]"> </span>
            </div>
            <span className="sm:text-lg">-{bookingData?.booking?.promocode?.discountAmount}</span>
          </div>
        </div>
        <div className="flex justify-between pt-4">
          <span className="font-semibold">Total Amount</span>
          <span className="font-bold">{bookingData?.booking?.totalAmount}</span>
        </div>
      </div>
    </div>
        </div>
      </div>
      <div className="sm:flex gap-6 sm:my-12 my-6 sm:px-0 px-4">
      <div className="bg-[#FBFBFB] py-4 px-6">
            <h3 className="text-2xl font-semibold">Personal Details</h3>
            <div className="mt-4">
                <div className="grid sm:grid-cols-[1fr_5fr] grid-cols-[1fr_2fr] my-2 gap-2 text-sm text-[#676464]">
                    <p>Name:</p>
                    <p>{bookingData?.booking?.userId?.firstName} {bookingData?.booking?.userId?.lastName}</p>
                </div>
                <div className="grid sm:grid-cols-[1fr_5fr] grid-cols-[1fr_2fr] my-2 gap-2 text-sm text-[#676464]">
                    <p>Email Address:</p>
                    <p>{bookingData?.booking?.userId?.email}</p>
                </div>
                <div className="grid sm:grid-cols-[1fr_5fr] grid-cols-[1fr_2fr] my-2 gap-2 text-sm text-[#676464]">
                    <p>Mobile Number:</p>
                    <p>{bookingData?.booking?.userId?.phone}</p>
                </div>
                <div className="grid sm:grid-cols-[1fr_5fr] grid-cols-[1fr_2fr] my-2 gap-2 text-sm text-[#676464]">
                    <p>Address:</p>
                    <p>{bookingData?.booking?.userId?.address}</p>
                </div>
                <div className="grid sm:grid-cols-[1fr_5fr] grid-cols-[1fr_2fr] my-2 gap-2 text-sm text-[#676464]">
                    <p>City:</p>
                    <p>{bookingData?.booking?.userId?.city}</p>
                </div>
                <div className="grid sm:grid-cols-[1fr_5fr] grid-cols-[1fr_2fr] my-2 gap-2 text-sm text-[#676464]">
                    <p>State:</p>
                    <p>{bookingData?.booking?.userId?.state}</p>
                </div>
                <div className="grid sm:grid-cols-[1fr_5fr] grid-cols-[1fr_2fr] my-2 gap-2 text-sm text-[#676464]">
                    <p>Pincode:</p>
                    <p>{bookingData?.booking?.userId?.pincode}</p>
                </div>
            </div>
        </div>
        <div className="bg-gray-500 w-fit py-4 px-6 max-w-[400px] w-full pb-8 sm:mt-0 mt-6">
          <div>
            <h3 className="text-lg font-semibold">Expected date of delivery</h3>
            <p className="text-sm">{new Date(bookingData?.booking?.pickUpDateTime).toLocaleString('en-US', {
    timeZone: 'UTC',
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit', 
    hour12: false,
  })}</p>
          </div>
          <div className="my-4">
            <h3 className="text-lg font-semibold">Place of delivery</h3>
            <p className="text-sm">At Your Doorstep</p>
          </div>
          {/* <div>
            <h3 className="text-lg font-semibold">Delivery Address</h3>
            <p className="text-sm">
              {bookingData?.booking?.vehicleId?.bookingOptions?.selfDrive?.packageType?.DoorstepDeliveryPickup?.subLocation}
                    </p>
          </div> */}
        </div>
      </div>
      <div className="sm:px-0 px-4">
        <div className="grid sm:grid-cols-2 bg-[#FBFBFB] p-6">
          <div className="max-w-[450px] w-full">
            <h3 className="font-semibold sm:text-2xl text-xl mb-4">DOCUMENT </h3>
            <div className=" sm:flex grid grid-cols-[45%_10%_45%] justify-between py-2">
              <span className="sm:w-[200px] w-auto">PAN Number</span>
              <span>:</span>
              <span>{bookingData?.booking?.userId?.panNumber}</span>
            </div>
            <div className="sm:my-4 my-2 sm:flex grid grid-cols-[45%_10%_45%] justify-between py-2">
              <span className="sm:w-[200px] w-auto">Driving License Number</span>
              <span>:</span>
              <span>{bookingData?.booking?.userId?.drivingLicenseNumber}</span>
            </div>
            <div className=" sm:flex grid grid-cols-[45%_10%_45%] justify-between py-2">
              <span className="sm:w-[200px] w-auto">Aadhar Number</span>
              <span>:</span>
              <span>{bookingData?.booking?.userId?.aadharNumber}</span>
            </div>
          </div>
          <div className="sm:border-l sm:pl-12 sm:mt-0 mt-6">
            <h3 className="font-semibold sm:text-2xl text-xl sm:mb-4 mb-2">DOCUMENT IMAGE  </h3>
            <div className="sm:flex items-center sm:mb-0 mb-4">
              <p className="max-w-[250px] w-full">PAN Number</p>
              <div className="flex gap-2">
                <Image src={bookingData?.booking?.userId?.panImageUrl} alt="pancard" width={78} height={44} />
                <Image src={bookingData?.booking?.userId?.panImageUrl} alt="pancard" width={78} height={44} />
              </div>
            </div>
            <div className="sm:flex my-2 items-center sm:mb-0 mb-4">
              <p className="max-w-[250px] w-full">Driving License Number</p>
              <div className="flex gap-2">
                <Image src={bookingData?.booking?.userId?.drivingLicenseFrontImageUrl} alt="license" width={78} height={44} />
                <Image src={bookingData?.booking?.userId?.drivingLicenseBackImageUrl} alt="license" width={78} height={44} />
              </div>
            </div>
            <div className="sm:flex items-center sm:mb-0 mb-4">
              <p className="max-w-[250px] w-full">Aadhar Number</p>
              <div className="flex gap-2">
                <Image src={bookingData?.booking?.userId?.aadharCardFrontImageUrl} alt="aadhar" width={78} height={44} />
                <Image src={bookingData?.booking?.userId?.aadharCardBackImageUrl} alt="aadhar" width={78} height={44} />
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


// const speciCollection=[
//   {
//     imageUrl: "/svg/manual.svg",
//     alt: "manual",
//     content: "manual",
//   },
//   {
//     imageUrl: "/svg/kilometer.svg",
//     alt: "kilometer",
//     content: "kilometer",
//   },
  
//   { 
//     imageUrl: "/svg/fuel.svg",
//     alt: "manual",
//     content:"disel",
//   },
//   {
//     imageUrl: "/svg/handle.svg",
//     alt: "Basic",
//     content: "Basic",
//   },
//   {
//     imageUrl: "/svg/engine.svg",
//     alt: "engine",
//     content: "2022",
//   },
//   {
//     imageUrl: "/svg/person.svg",
//     alt: "seat",
//     content: "5 Person",
//   },
// ];
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

