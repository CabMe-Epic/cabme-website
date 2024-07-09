"use client";
import ProductSlider from "@/app/components/product-slider/product-slider";
import Specifications from "@/app/components/specifications/specifications";
import BookingDetailsCard from "@/app/components/booking-details-card/booking-details-card";
import Image from "next/image";
import CarFeatures from "@/app/components/car-features/car-features";
import ExtraCharges from "@/app/components/extra-charges/extra-charges";
import DescCar from "@/app/components/desc-car/desc-car";
import Video from "@/app/components/video/video";
import FleetsSlider from "@/app/components/slider/slider-components";
import { useParams } from "next/navigation";
import useVehicleById from "../../../../../networkRequests/hooks/useVehicleById";
import React, { useCallback, useState } from "react";
import { searchVehicle } from "../../../../../networkRequests/hooks/api";
import { useRouter } from 'next/navigation'
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useReservationDateTime from "../../../../../networkRequests/hooks/useReservationDateTime";
import { extractDaysAndHours } from "@/app/utils/extractDaysAndHours";
import { calculatePrice } from "@/app/utils/calculatePrice ";
import { fetchPromoCodes } from "../../../../../networkRequests/hooks/promocodes";
import BookingSummery from "@/app/components/booking-summery";

const CarDetails = () => {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [pickupTime, setPickupTime] = useState<string | null>(null);
  const [dropoffTime, setDropoffTime] = useState<string | null>(null);
  const [selectedTabValue, setSelectedTabValue] = useState<string | null>(null);
  const [promoCodes, setPromoCodes] = useState([]);

  const [currentPackage, setCurrentPackage] = useState<any>();

  const [carDetails, setCarDetails] = useState<any>();
  const [pickupDate, setPickupDate] = useState<any>();
  const [dropoffDate, setDropoffDate] = useState<any>();
  const [packagePrice, setPackagePrice] = useState<any>();
  const [bookingOpt, setBookingOpt] = useState<any>();


  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Duration >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const total = Number(packagePrice) + (currentPackage?.DoorstepDeliveryPickup) + (currentPackage?.refundableDeposit);
  const { reservationDateTime, setReservationDateTime, duration } = useReservationDateTime();

  const { days, hours } = extractDaysAndHours(duration)
  const totalPrice = calculatePrice(Number(days), Number(hours), Number(total))

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedPickupTime = localStorage.getItem('pickupTime');
      const storedDropoffTime = localStorage.getItem('dropoffTime');
      const storedTabValue = localStorage.getItem('tabValue');
      setPickupTime(storedPickupTime);
      setDropoffTime(storedDropoffTime);
      setSelectedTabValue(storedTabValue)
    }
  }, []);
  console.log(pickupTime,dropoffTime,"lkkk");

  const pickupDateTimeString = pickupTime ? `${pickupDate}T${pickupTime}:00.000Z` : null;
  const droppingDateTimeString = dropoffTime ? `${dropoffDate}T${dropoffTime}:00.000Z` : null;

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUserId = localStorage.getItem('userId');
      const storedToken = localStorage.getItem('token');
      setUserId(storedUserId);
      setToken(storedToken);
    }
  }, []);

  const bookingData = {
    userId: userId,
    vehicleId: carDetails?._id,
    option: selectedTabValue,
    location: carDetails?.city,
    pickUpDateTime: pickupDateTimeString,
    dropOffDateTime: droppingDateTimeString,
    baseFare: packagePrice,
    doorstepDelivery: 0,
    insuranceGST: carDetails?.extraService?.insurance,
    refundableDeposit: 0,
    kmsLimit: 0,
    fuel: carDetails?.extraService?.fuel,
    extraKmsCharge: carDetails?.extraService?.extraKmCharges,
    tollsParking: "",
    promocode: "",
    totalAmount: Number(totalPrice.toFixed(2)),
    bookingDuration: duration,
    bufferTime: 0,
    kilometers: 0,
    createdByUser: userId
  };

  async function handleBooking() {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_URI_BASE}/cabme/booking`, bookingData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Booking response:', { response });
      toast.success(response?.data?.message)
      if (response?.data?.success) {
        setTimeout(() => {
          router.push("/payment")
        }, 2000);
      }
    } catch (error: any) {
      console.error('Error booking cab:', { error });
    }
  }

  React.useEffect(() => {
    const getPromoCodes = async () => {
      try {
        const data = await fetchPromoCodes();
        setPromoCodes(data);
      } catch (error) {
        console.log({ error })
      }
    };

    getPromoCodes();
  }, [])

  console.log({ promoCodes })

  const { slug } = useParams();


  const getCarDetails = useCallback(async () => {
    const getSearchCarData = await searchVehicle();
    const carData = getSearchCarData?.data?.vehicles;
    carData?.map((item: any) => {
      return (
        item?._id === slug ? setCarDetails(item) : ""
      );
    });
    carDetails?.bookingOptions?.selfDrive?.name === bookingOpt
      ? setCurrentPackage(
        carDetails?.bookingOptions?.selfDrive?.packageType?.package1.price
      )
      : "";
  }, []);

  React.useEffect(() => {
    const getPickup = localStorage.getItem("pickupDate");
    const getDropoff = localStorage.getItem("dropOffDate");
    const storedPickupTime = localStorage.getItem('pickupTime');
      const storedDropoffTime = localStorage.getItem('dropoffTime');
    const selectedPackagePrice = localStorage.getItem("selectedPackagePrice")
    
    setPackagePrice(selectedPackagePrice)
    setPickupDate(getPickup);
    setDropoffDate(getDropoff)
    setDropoffTime(storedDropoffTime)
    setPickupTime(storedPickupTime)
    getCarDetails();
  }, [getCarDetails]);

  console.log({ carDetails });

  const { vehicle, loading, error } = useVehicleById(slug as string);

  React.useEffect(() => {
    const getPickup = localStorage.getItem("pickupDate");
    const getDropoff = localStorage.getItem("dropOffDate");
    const selectedPackagePrice = localStorage.getItem("selectedPackagePrice");
    const bookingOption = localStorage.getItem("tabValue");
    setPackagePrice(selectedPackagePrice);
    setPickupDate(getPickup);
    setDropoffDate(getDropoff);
    setBookingOpt(bookingOption);
    getCarDetails();
    // price();
  }, []);
  console.log(typeof packagePrice, "pppppp");
  React.useEffect(() => {
    {
      carDetails?.bookingOptions?.selfDrive?.name === bookingOpt
        ? setCurrentPackage(carDetails?.bookingOptions?.selfDrive?.packageType)
        : carDetails?.bookingOptions?.subscription?.name === bookingOpt
          ? setCurrentPackage(
            carDetails?.bookingOptions?.subscription?.packageType
          )
          : carDetails?.bookingOptions?.withDriver?.name === bookingOpt
            ? setCurrentPackage("")
            : "";
    }
  }, [carDetails]);
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handlePriceChange = (updatedPrice: any) => {
    localStorage.setItem("selectedPackagePrice", updatedPrice);
    setPackagePrice(updatedPrice)
  }


  return (
    <>
      <div className="py-6">
        <ToastContainer />
        <div className="sm:flex hidden px-16 text-[#5F5D5D]">
          <span className="cursor-pointer">Home</span>/
          <span className="cursor-pointer">Listing</span>/
          <span className="cursor-pointer">Car Details</span>
        </div>
        <div className="max-w-[1250px] m-auto sm:my-12 sm:grid grid-cols-[60%_40%] gap-6">
          <div className="px-4">
            <ProductSlider
              featuredImage={carDetails?.featuredImage as any}
              imageGallery={carDetails?.imageGallery as any}
            />
            {/* mobile view */}
            <div className="sm:hidden block my-4">
              <BookingDetailsCard city={carDetails?.city as any} />
            </div>
            {/* mobile view */}

            <div className="sm:hidden block">
              <main className="max-w-[511px] px-4 shadow-custom-shadow flex flex-col items-center bg-[#FAFAFA] py-10 my-6 rounded-md">
                <div className="max-w-[376px] h-[50px] w-full bg-black text-white font-bold text-[20px] flex justify-center items-center rounded-xl">
                  <span className="text-center">Booking Summary</span>
                </div>
                <div className="m-auto my-5">
                  <span className="font-bold text-[24px]">Fare Details</span>
                </div>
                <div className="grid grid-cols-1 w-full items-start justify-between gap-4 font-semibold">
                  <div className="flex justify-between gap-2 text-sm">
                    <span className="">Base Fare</span>
                    <span className="">
                      ₹ {packagePrice}
                    </span>
                  </div>

                  <div className="flex justify-between gap-2 text-sm">
                    <span className="">Doorstep delivery & pickup</span>
                    <span className="">₹ {currentPackage?.DoorstepDeliveryPickup}</span>
                  </div>

                  <div className="flex justify-between gap-2 text-sm">
                    <span className="">Insurance & GST</span>
                    <span className="">{carDetails?.extraService?.insurance}</span>
                  </div>

                  <div className="flex justify-between gap-2 text-sm">
                    <span className="">Refundable Deposit</span>
                    <span className="">₹ {currentPackage?.refundableDeposit}</span>
                  </div>

                  <div className="flex px-2 py-2 text-md justify-between gap-2 shadow-custom-inner font-bold">
                    <span className="">TOTAL</span>
                    <span className=" text-[#ff0000]">₹ {total}</span>
                  </div>

                  <div className="flex justify-between gap-2 text-sm">
                    <span className="">Kms Limit</span>
                    <span className="">₹ {currentPackage?.kmsLimit !== "" ? currentPackage?.kmsLimit : "0"} kms</span>
                  </div>

                  <div className="flex justify-between gap-2 text-sm">
                    <span className="">Fuel</span>
                    <span className="">{currentPackage?.fuel}</span>
                  </div>

                  <div className="flex justify-between gap-2 text-sm">
                    <span className="">Extra kms charge</span>
                    <span className="">{currentPackage?.extraKmsCharge}</span>
                  </div>

                  <div className="flex justify-between gap-2 text-sm">
                    <span className="">
                      Tolls,Parking & <br /> Inner-state taxes
                    </span>
                    <span className="">{currentPackage?.tollsParkingTaxes}</span>
                  </div>
                </div>
                <div className="w-full">
                  <span className="flex flex-row my-5 mt-10">
                    <Image
                      src="/png/offer.png"
                      width={20}
                      height={20}
                      alt="offer"
                    />
                    <select
                      name="offer"
                      id="offer"
                      className="border-0 outline-0 bg-transparent max-w-[405px] text-sm"
                    >
                      <option value="View all promo coupons">
                        View all promo coupons
                      </option>
                    </select>
                  </span>

                  <div className="max-w-[418px]  h-[45px] flex flex-row justify-center border-[1.5px] border-[#ff0000] rounded item-center bg-white px-4">
                    <input
                      type="text"
                      placeholder="DJF4D4F"
                      className="w-full border-0 outline-none pr-4 text-[#888787]"
                    />
                    <button className="text-[#ff0000]">Apply</button>
                  </div>

                  <div className="my-6 h-[69px] drop-shadow-lg bg-[#E7E7E7] flex flex-row items-center justify-between px-4 py-5 rounded-3xl">
                    <div className="flex flex-col">
                      <span>Total Amount</span>
                      <span className="text-[#ff0000] p-0 text-xl font-semibold">
                        ₹ 15,000
                      </span>
                    </div>
                    <div>
                      <button className="bg-gradient-to-r from-[#F1301E] to-[#FA4F2F] text-xl font-semibold text-white px-6 py-2 rounded-full drop-shadow-lg">
                        Proceed
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center border-[1.5px] max-w-[423px] w-full py-2 rounded-3xl border-[#ff0000] cursor-pointer">
                  <span className="font-bold text-md">Pay ₹10,000 Now</span>
                  <span className="text-[#ff0000] font-semibold text-[15px]">
                    Balance on Delivery
                  </span>
                </div>
              </main>
              <div className="flex flex-row items-start gap-2 ml-4">
                <span className="mt-1">
                  <Image
                    src="/png/waiting.png"
                    width={20}
                    height={20}
                    alt="offer"
                  />
                </span>
                <span className="text-[18px] font-semibold text-[#6CAE39]">
                  50% Refund <br /> Until 06June2024, 2:00PM <br />
                  <span className="text-[#737373] text-sm font-light">
                    Convince fees is not refundable
                  </span>
                </span>
              </div>
            </div>

            <div className="my-12">
              <Specifications spec={carDetails?.vehicleSpecifications as any} />
            </div>
            <div className="my-12">
              <CarFeatures carFeatures={carDetails?.carFeatures as any} />
            </div>
          </div>
          {/*  */}
          <div>
            <div className="sm:block hidden">
              <BookingDetailsCard city={carDetails?.city as any} />
            </div>
            {/* booking summary */}
            <div className="sm:block hidden">
              <BookingSummery/>
              <main className=" w-[511px] flex flex-col items-center bg-[#FAFAFA] py-10 my-6 rounded-md">
                <div className="w-[376px] h-[50px] bg-black text-white font-bold text-[20px] flex justify-center items-center rounded-xl">
                  <span className="text-center">Booking Summary</span>
                </div>
                <div className="my-5 flex justify-between w-full px-8">
                  <span className="font-bold text-[24px]">Fare Details</span>
                  <select
                    name="package"
                    id="package"
                    onChange={(event) => handlePriceChange(event?.target?.value)}
                  >
                    <option value="package">change package</option>
                    <option value={currentPackage?.package1?.price}>
                      {currentPackage?.package1?.price}
                    </option>
                    <option value={currentPackage?.package2?.price}>
                      {currentPackage?.package2?.price}
                    </option>
                    <option value={currentPackage?.package3?.price}>
                      {currentPackage?.package3?.price}
                    </option>
                  </select>
                </div>
                <div className="grid grid-cols-1 items-start justify-center gap-4 font-semibold">
                  <div className="grid grid-cols-2 gap-14  justify-center">
                    <span className="w-[220px] ml-10">Base Fare</span>
                    <span className="w-[220px] ml-10 w-fit">
                      ₹{packagePrice} * {days} Days and {hours} Hours
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-14  justify-center">
                    <span className="w-[220px] ml-10">
                      Doorstep delivery & pickup
                    </span>
                    <span className="w-[220px] ml-10">₹ {currentPackage?.DoorstepDeliveryPickup}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-14  justify-center">
                    <span className="w-[220px] ml-10">Insurance & GST</span>
                    <span className="w-[220px] ml-10">{carDetails?.extraService?.insurance}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-14  justify-center">
                    <span className="w-[220px] ml-10">Refundable Deposit</span>
                    <span className="w-[220px] ml-10">₹ {currentPackage?.refundableDeposit}</span>
                  </div>

                  {/* DESKTOP ...  */}
                  <div className="grid grid-cols-2 w-fit gap-14 py-2 justify-center shadow-custom-inner font-bold text-xl">
                    <span className="w-[220px] ml-10">TOTAL</span>
                    <span className="w-[220px] ml-10 text-[#ff0000]">
                      ₹ {totalPrice.toFixed(2)}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-14  justify-center">
                    <span className="w-[220px] ml-10">Kms Limit</span>
                    <span className="w-[220px] ml-10">₹ {currentPackage?.kmsLimit !== "" ? currentPackage?.kmsLimit : "0"} kms</span>
                  </div>

                  <div className="grid grid-cols-2 gap-14  justify-center">
                    <span className="w-[220px] ml-10">Fuel</span>
                    <span className="w-[220px] ml-10">{currentPackage?.fuel}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-14  justify-center">
                    <span className="w-[220px] ml-10">Extra kms charge</span>
                    <span className="w-[220px] ml-10">₹ {currentPackage?.extraKmsCharge}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-14  justify-center">
                    <span className="w-[220px] ml-10">
                      Tolls,Parking & Inner-state taxes
                    </span>
                    <span className="w-[220px] ml-10">{currentPackage?.tollsParkingTaxes}</span>
                  </div>
                </div>
                <div>
                  <span className="flex flex-row my-5 mt-10">
                    <Image
                      src="/png/offer.png"
                      width={20}
                      height={20}
                      alt="offer"
                    />
                    <select
                      name="offer"
                      id="offer"
                      className="border-0 outline-0 bg-transparent w-[405px]"
                    >
                      <option value="View all promo coupons">
                        View all promo coupons1
                      </option>
                      <option value="View all promo coupons">
                        View all promo coupons2
                      </option>
                      <option value="View all promo coupons">
                        View all promo coupons3
                      </option>
                      <option value="View all promo coupons">
                        View all promo coupons4
                      </option>
                      <option value="View all promo coupons">
                        View all promo coupons5
                      </option>
                    </select>
                  </span>

                  <div className="w-[418px]  h-[53px] flex flex-row justify-center border-[1.5px] border-[#ff0000] rounded item-center bg-white px-4">
                    <input
                      type="text"
                      placeholder="DJF4D4F"
                      className="w-full border-0 outline-none pr-4 text-[#888787]"
                    />
                    <button className="text-[#ff0000]">Apply</button>
                  </div>

                  <div className="my-6 h-[79px] drop-shadow-lg bg-[#E7E7E7] flex flex-row items-center justify-between px-4 py-5 rounded-3xl">
                    <div className="flex flex-col">
                      <span>Total Amount</span>
                      <span className="text-[#ff0000] p-0 text-2xl font-bold">
                        ₹ {totalPrice.toFixed(2)}
                      </span>
                    </div>
                    <div>

                      {/* Desktop button ... */}
                      {userId && token ? (
                        <button
                          onClick={handleBooking}
                          className="bg-gradient-to-r from-[#F1301E] to-[#FA4F2F] text-2xl font-semibold text-white w-[178.31px] h-[53.08px] rounded-full drop-shadow-lg">
                          Checkout
                        </button>
                      ) : (
                        <button
                          onClick={() => router.push("/sign-in")}
                          className="bg-gradient-to-r from-[#F1301E] to-[#FA4F2F] text-2xl font-semibold text-white w-[178.31px] h-[53.08px] rounded-full drop-shadow-lg">
                          Proceed
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center border-[1.5px] w-[423px] py-2 rounded-3xl border-[#ff0000] cursor-pointer">
                  <span className="font-bold text-md">Pay ₹10,000 Now</span>
                  <span className="text-[#ff0000] font-semibold text-[15px]">
                    Balance on Delivery
                  </span>
                </div>
              </main>
              <div className="flex flex-row items-start gap-2 ml-4">
                <span className="mt-1">
                  <Image
                    src="/png/waiting.png"
                    width={20}
                    height={20}
                    alt="offer"
                  />
                </span>
                <span className="text-[18px] font-semibold text-[#6CAE39]">
                  50% Refund <br /> Until 06June2024, 2:00PM <br />
                  <span className="text-[#737373] text-sm font-light">
                    Convince fees is not refundable
                  </span>
                </span>
              </div>
            </div>

            {/* booking summary */}
          </div>
        </div>
        <div className="mb-10">
          <ExtraCharges details={carDetails} />
        </div>
        <div className="mb-10">
          <DescCar desc={carDetails?.vehicleDescriptions as any} />
        </div>
        <div>
          <Video />
        </div>
        <div className="mx-10 top-button">
          {/* <InterestedSlider/> */}
          <FleetsSlider showButton={false} showRatingStar={false} />
        </div>
      </div>
    </>
  );
};
export default CarDetails;
