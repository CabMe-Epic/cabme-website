"use client";
import ProductSlider from "@/app/components/product-slider/product-slider";
import Specifications from "@/app/components/specifications/specifications";
import BookingDetailsCard from "@/app/components/booking-details-card/booking-details-card";
import Image from "next/image";
import CarFeatures from "@/app/components/car-features/car-features";
import ExtraCharges from "@/app/components/extra-charges/extra-charges";
import DescCar from "@/app/components/desc-car/desc-car";
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
import { calculateTotalPrice } from "@/app/utils/getTotalPrice";
import { roundPrice } from "@/app/utils/roundPrice ";

interface PromoCode {
  code: string;
  promocodeType: string;
  promocodeDescription: string;
  couponExpiryDate: Date;
  usageLimits: number;
  couponAmount: number;
  maximumDiscount: number;
  selectDiscount: string;
  couponStartDate: Date;
  minimumBookingDay: number;
  usageRestriction: string;
  promotionClassification: string;
  customerContact?: string;
}

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

  const [selectedPromocodeOption, setSelectedPromocodeOption] = useState<string | any>();
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [discountAppliedAmount, setDiscountAppliedAmount] = useState<number>(0);
  const [selectedDiscountType, setSelectedDiscountType] = useState<string | any>();

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Duration >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const total = Number(packagePrice)
  const { reservationDateTime, setReservationDateTime, duration } = useReservationDateTime();

  console.log({ total })
  const { days, hours } = extractDaysAndHours(duration)
  const totalPrice = calculatePrice(Number(days), Number(hours), Number(total))
  // console.log({ totalPrice })

  const ThirtyDiscount = (total * 30) / 100

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
    promocode: {
      code: selectedPromocodeOption ? selectedPromocodeOption : null,
      discountType: selectedDiscountType ? selectedDiscountType : null,
      discountAmount: Number(discountAppliedAmount.toFixed(2)),
    },
    totalAmount: discountAmount > 0 ? Number(discountAmount.toFixed(2)) : Number(totalPrice.toFixed(2)),
    bookingDuration: duration,
    bufferTime: 0,
    kilometers: 0,
    createdByUser: userId
  };

  const [bookingSuccess, setBookingSuccess] = useState(false);

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
        setBookingSuccess(true);
        setTimeout(() => {
          // router.push("/payment")
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
        setPromoCodes(data?.promocodes);
      } catch (error) {
        console.log({ error })
      }
    };

    getPromoCodes();
  }, [])


  const handleChangePromocodeOption = (e: any) => {
    setSelectedPromocodeOption(e.target.value)
  }

  const handleApplyPromoCode = () => {
    if (selectedPromocodeOption) {
      const selectedPromoCode = promoCodes.find((code: PromoCode) => code.code === selectedPromocodeOption) as PromoCode | undefined;
      console.log({ selectedPromoCode });
      if (selectedPromoCode) {
        if (selectedPromoCode.selectDiscount === 'Percentage') {
          const discount = (selectedPromoCode.couponAmount / 100) * totalPrice;
          const discountedPrice = totalPrice - discount;
          setDiscountAmount(discountedPrice);
          setDiscountAppliedAmount(discount);
          setSelectedDiscountType(selectedPromoCode.selectDiscount)
        } else if (selectedPromoCode.selectDiscount === 'Fixed') {
          const discountedPrice = totalPrice - selectedPromoCode.couponAmount;
          setDiscountAmount(discountedPrice);
          setDiscountAppliedAmount(selectedPromoCode.couponAmount);
          setSelectedDiscountType(selectedPromoCode.selectDiscount)
        }
      } else {
        setDiscountAmount(0);
        setDiscountAppliedAmount(0);
        setSelectedPromocodeOption(null)
        setSelectedDiscountType(null)
        alert("Clear coupon");
      }
    } else {
      alert("Please select a promo code first.");
    }
  };


  const { slug }: any = useParams();


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

  const handleProceed = () => {
    sessionStorage.setItem('slug', slug);
    router.push("/check-out");
  }

  const package1Price = calculateTotalPrice(currentPackage?.package1?.price) || 0;
  const package2Price = calculateTotalPrice(currentPackage?.package2?.price) || 0;
  const package3Price = calculateTotalPrice(currentPackage?.package3?.price) || 0;

  const allPrices = [packagePrice, roundPrice(package1Price), roundPrice(package2Price), roundPrice(package3Price)];
  const roundedPrices = allPrices?.map(roundPrice);

  const uniquePrices = Array.from(new Set(roundedPrices.filter(price => price !== 0)));
  console.log({ uniquePrices })
  return (
    <>
      <div className="py-6">
        <ToastContainer />
        <div className="sm:flex hidden px-16 text-[#5F5D5D]">
          <span className="cursor-pointer">Home</span>/
          <span className="cursor-pointer">Listing</span>/
          <span className="cursor-pointer">Car Details</span>
        </div>
        <div className="max-w-[1250px] m-auto sm:my-12 lg:grid rounded-xl items-start grid-cols-[60%_40%] gap-6 ">
          <div className="px-4 lg:max-w-auto max-w-[700px] -mt-1 rounded-xl m-auto">
            <ProductSlider
              featuredImage={carDetails?.featuredImage as any}
              imageGallery={carDetails?.imageGallery as any}
            />
            {/* mobile view */}
            <div className="lg:hidden block my-4">
              <BookingDetailsCard city={carDetails?.city as any} />
            </div>
            {/* mobile view */}
            <div className="lg:hidden block">
              <main className="max-w-[90vw] mx-auto flex flex-col items-center bg-[#FAFAFA] py-10 my-6 rounded-md">
                <div className="w-full max-w-[376px] h-[50px] bg-black text-white font-bold text-[20px] flex justify-center items-center rounded-xl mb-5">
                  <span className="text-center">Booking Summary</span>
                </div>
                <div className="w-full max-w-[376px] mb-5 px-2 flex justify-between">
                  <span className="font-bold text-[24px]">Fare Details</span>
                  <select
                    name="package"
                    id="package"
                    onChange={(event) => handlePriceChange(event?.target?.value)}
                    className="w-[50%] max-w-[180px]"
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
                <div className="grid grid-cols-1 gap-4 w-full max-w-full px-2 font-semibold">
                  <div className="grid grid-cols-2 gap-4">
                    <span className="ml-2">Base Fare</span>
                    <span>
                      ₹{packagePrice} * {days} Days and {hours} Hours
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <span className="ml-2">
                      Doorstep delivery & pickup
                    </span>
                    <span>
                      ₹ {currentPackage?.DoorstepDeliveryPickup}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <span className="ml-2">
                      Insurance & GST
                    </span>
                    <span>
                      {carDetails?.extraService?.insurance}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <span className="ml-2">
                      Refundable Deposit
                    </span>
                    <span>
                      ₹ {currentPackage?.refundableDeposit}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <span className="ml-2">
                      TOTAL
                    </span>
                    <span className="text-[#ff0000]">
                      ₹ {totalPrice.toFixed(2)}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <span className="ml-2">
                      Kms Limit
                    </span>
                    <span>
                      ₹ {currentPackage?.kmsLimit !== "" ? currentPackage?.kmsLimit : "0"} kms
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <span className="ml-2">
                      Fuel
                    </span>
                    <span>
                      {currentPackage?.fuel}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <span className="ml-2">
                      Extra kms charge
                    </span>
                    <span>
                      ₹ {currentPackage?.extraKmsCharge}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <span className="ml-2">
                      Tolls, Parking & Inner-state taxes
                    </span>
                    <span>
                      {currentPackage?.tollsParkingTaxes}
                    </span>
                  </div>
                </div>
                <div className="w-full max-w-[376px] mb-6  mt-6">
                  <div className="flex justify-between items-center bg-[#E7E7E7] p-4 rounded-3xl shadow-lg">
                    <div className="flex flex-col">
                      <span>
                        Total Amount
                      </span>
                      <span className="text-[#ff0000] text-2xl font-bold">
                        ₹ {discountAmount > 0 ? discountAmount.toFixed(2) : totalPrice.toFixed(2)}
                      </span>
                    </div>
                    <div>
                      {userId && token ? (
                        bookingSuccess ? (
                          <button
                            // onClick={() => router.push("/payment")}
                            className="bg-gradient-to-r from-[#F1301E] to-[#FA4F2F] text-2xl font-semibold text-white w-[178.31px] h-[53.08px] rounded-full drop-shadow-lg">
                            Payment
                          </button>
                        ) : (
                          <button
                            onClick={handleBooking}
                            className="bg-gradient-to-r from-[#F1301E] to-[#FA4F2F] text-2xl font-semibold text-white w-[178.31px] h-[53.08px] rounded-full drop-shadow-lg">
                            Checkout
                          </button>
                        )
                      ) : (
                        <button
                          onClick={handleProceed}
                          className="bg-gradient-to-r from-[#F1301E] to-[#FA4F2F] text-2xl font-semibold text-white w-[178.31px] h-[53.08px] rounded-full drop-shadow-lg">
                          Proceed
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                <div className="w-full max-w-[376px] flex justify-around items-center border-[1.5px] rounded-3xl border-[#ff0000] cursor-pointer">
                  <div className="flex flex-col items-start p-4">
                    <span className="font-bold text-md">
                      Pay ₹{roundPrice(ThirtyDiscount) >= 2000 ? roundPrice(ThirtyDiscount) : roundPrice(total)} Now
                    </span>
                    <span className="text-[#ff0000] font-semibold text-[15px]">
                      Balance on Delivery
                    </span>
                  </div>
                  <button
                    onClick={handleProceed}
                    className="bg-gradient-to-r from-[#F1301E] to-[#FA4F2F] text-sm font-semibold text-white w-[78.31px] h-[53.08px] rounded-md drop-shadow-lg">
                    Proceed
                  </button>
                </div>
              </main>

              <div className="sm:max-w-[511px] lg:max-w-full m-auto flex flex-row items-start gap-2 ml-4">
                <span className="mt-1">
                  <Image
                    src="/png/waiting.png"
                    width={20}
                    height={20}
                    alt="offer"
                  />
                </span>
                <span className="sm:text-[18px] text-[14px] font-semibold text-[#6CAE39]">
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
            <div className="lg:block hidden">
              <BookingDetailsCard city={carDetails?.city as any} />
            </div>
            {/* booking summary */}
            <div className="lg:block hidden">
              {/* <BookingSummery/> */}
              <main className=" w-[511px] flex flex-col items-center bg-[#FAFAFA] py-10 my-6 rounded-md">
                <div className="w-[376px] h-[50px] bg-black text-white font-bold text-[20px] flex justify-center items-center rounded-xl">
                  <span className="text-center">Booking Summary</span>
                </div>
                <div className="my-5 flex justify-between w-full px-8">
                  <span className="font-semibold ml-2">Package Name</span>
                  <select
                    name="package"
                    id="package"
                    className="cursor-pointer w-[160px] p-2 rounded-md font-semibold outline-none"
                    onChange={(event) => handlePriceChange(event?.target?.value)}
                    defaultValue={roundPrice(packagePrice)}
                  >
                    {uniquePrices?.map(price => (
                      <option key={price} value={price}>
                        ₹{price}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-1 items-start justify-center gap-4 font-semibold">
                  <div className="grid grid-cols-2 gap-14  justify-center">
                    <span className="w-[220px] ml-10">Package Amount</span>
                    <span className="w-[220px] ml-10 w-fit">
                      ₹{roundPrice(packagePrice)}
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
                  {discountAmount > 0 ? (
                    <div className="grid grid-cols-2 w-fit gap-14 py-2 justify-center shadow-custom-inner font-bold text-xl">
                      <span className="w-[220px] ml-10">TOTAL Aasif</span>
                      <span className="w-[220px] ml-10 text-[#ff0000]">
                        ₹ {totalPrice.toFixed(2)}
                      </span>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 w-fit gap-14 py-2 justify-center shadow-custom-inner font-bold text-xl">
                      <span className="w-[220px] ml-10">TOTAL</span>
                      <span className="w-[220px] ml-10 text-[#ff0000]">
                        ₹ {roundPrice(total)}
                      </span>
                    </div>
                  )}

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
                  {/* <span className="flex flex-row my-5 mt-10">
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
                      onChange={(e) => handleChangePromocodeOption(e)}
                    >

                      <option value="View all promo coupons">
                        View all promo coupons
                      </option>
                      {promoCodes?.map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {item.code}
                        </option>
                      ))}

                    </select>
                  </span> */}

                  {/* <div className="w-[418px]  h-[53px] flex flex-row justify-center border-[1.5px] border-[#ff0000] rounded item-center bg-white px-4">
                    <input
                      type="text"
                      placeholder="DJF4D4F"
                      className="w-full border-0 outline-none pr-4 text-[#888787]"
                      value={selectedPromocodeOption}
                      readOnly
                    />
                    <button className="text-[#ff0000]" onClick={handleApplyPromoCode}>Apply</button>
                  </div> */}

                  {/* DESKTOP TOTAL AMOUNT  */}
                  <div className="my-6 h-[79px] gap-6 drop-shadow-lg bg-[#E7E7E7] flex flex-row items-center justify-between px-4 w-[420px] py-5 rounded-3xl">
                    {discountAmount > 0 ? (
                      <div className="flex flex-col">
                        <span>Total Amount </span>
                        <span className="text-[#ff0000] p-0 text-2xl font-bold">
                          ₹ {discountAmount.toFixed(2)}
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-col">
                        <span>Total Amount</span>
                        <span className="text-[#ff0000] p-0 text-2xl font-bold">
                          ₹ {totalPrice.toFixed(2)}
                        </span>
                      </div>
                    )}

                    <div>

                      {/* Desktop button ... */}
                      {/* {userId && token ? (
                        <button
                          onClick={handleBooking}
                          className="bg-gradient-to-r from-[#F1301E] to-[#FA4F2F] text-2xl font-semibold text-white w-[178.31px] h-[53.08px] rounded-full drop-shadow-lg">
                          Checkout
                        </button>
                      ) : (
                        <button
                          onClick={() => router.push("/check-out")}
                          className="bg-gradient-to-r from-[#F1301E] to-[#FA4F2F] text-2xl font-semibold text-white w-[178.31px] h-[53.08px] rounded-full drop-shadow-lg">
                          Proceed
                        </button>
                      )} */}

                      {/* Dynamic buttons ...  */}

                      <>
                        {userId && token ? (
                          bookingSuccess ? (
                            <button
                              // onClick={() => router.push("/payment")}
                              className="bg-gradient-to-r from-[#F1301E] to-[#FA4F2F] text-2xl font-semibold text-white w-[178.31px] h-[53.08px] rounded-full drop-shadow-lg">
                              Payment
                            </button>
                          ) : (
                            <button
                              onClick={handleBooking}
                              className="bg-gradient-to-r from-[#F1301E] to-[#FA4F2F] text-2xl font-semibold text-white w-[178.31px] h-[53.08px] rounded-full drop-shadow-lg">
                              Checkout
                            </button>
                          )
                        ) : (
                          <button
                            onClick={handleProceed}
                            className="bg-gradient-to-r from-[#F1301E] to-[#FA4F2F] text-2xl font-semibold text-white w-[178.31px] h-[53.08px] rounded-full drop-shadow-lg">
                            Proceed
                          </button>
                        )}
                      </>
                    </div>
                  </div>
                </div>

                {/* DESKTOP  */}
                <div className="flex flex-row items-center justify-around border-[1.5px] w-[423px] py-2 rounded-3xl border-[#ff0000] cursor-pointer">
                  <div className="flex flex-col items-start">
                    <span className="font-bold text-md">Pay ₹{roundPrice(ThirtyDiscount) >= 2000 ? roundPrice(ThirtyDiscount) : roundPrice(total)} Now </span>
                    <span className="text-[#ff0000] font-semibold text-[15px]">
                      Balance on Delivery
                    </span>
                  </div>
                  <button
                    onClick={handleProceed}
                    className="bg-gradient-to-r from-[#F1301E] to-[#FA4F2F] text-md font-semibold text-white w-[120.31px] h-[42.08px] rounded-full drop-shadow-lg">
                    Proceed
                  </button>
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
          {/* <Video /> */}
        </div>
        <div className="mx-10 top-button">
          {/* <InterestedSlider/> */}
          {/* <FleetsSlider showButton={false} showRatingStar={false} /> */}
        </div>
      </div>
    </>
  );
};
export default CarDetails;
