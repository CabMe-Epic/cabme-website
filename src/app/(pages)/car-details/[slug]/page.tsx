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
import React, { useCallback, useEffect, useRef, useState } from "react";
import { searchVehicle } from "../../../../../networkRequests/hooks/api";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useReservationDateTime from "../../../../../networkRequests/hooks/useReservationDateTime";
import { extractDaysAndHours } from "@/app/utils/extractDaysAndHours";
import { calculatePrice } from "@/app/utils/calculatePrice ";
import { fetchPromoCodes } from "../../../../../networkRequests/hooks/promocodes";
import { calculateTotalPrice } from "@/app/utils/getTotalPrice";
import { roundPrice } from "@/app/utils/roundPrice ";
import DropLocation from "@/app/components/doorstep-popup/DoorstepPopup";
import { calculateGST } from "@/app/utils/calculateGST";
import { useStore } from "@/app/zustand/store/store";
import BlinkerLoader from "@/app/components/blinker-loader/blinkerLoader";
import useCarsStore from "@/app/zustand/store/carsStore";
import { set } from "react-datepicker/dist/date_utils";

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
  // context api
  // const { data, setData } = useContextApi();
  

  const { payableAmount, setPayableAmount } = useCarsStore();

  const userData = useStore((state) => state);
  console.log("USER DATA", { userData });
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [pickupTime, setPickupTime] = useState<string | null>(null);
  const [dropoffTime, setDropoffTime] = useState<string | null>(null);
  const [selectedTabValue, setSelectedTabValue] = useState<string | null>(null);
  const [promoCodes, setPromoCodes] = useState([]);
  const [message, setMessage] = useState<string | null>("");

  const [currentPackage, setCurrentPackage] = useState<any>();
  const [showDoorStep, setShowDoorStep] = useState(false);

  const handleShowDoorstepPopup = () => {
    setShowDoorStep(true);
  };

  const [selectedDoorStepObject, setSelectedDoorStepObject] = useState<any>([]);
  const handleSelectItemDoorStep = (arr: any) => {
    setSelectedDoorStepObject([{ ...arr }]);
    setShowDoorStep(false);
  };

  React.useEffect(() => {
    if (selectedDoorStepObject.length > 0) {
      const price = selectedDoorStepObject[0]?.price;
      localStorage.setItem("doorStepPriceCharge", JSON.stringify(price));
    }
    setTextareaHeight(textareaRef?.current?.scrollHeight + "px");

    console.log(selectedDoorStepObject, "selectedDoorStepObject");
  }, [selectedDoorStepObject]);

  useEffect(() => {
    localStorage.removeItem("doorStepPriceCharge");
  }, []);

  const [carDetails, setCarDetails] = useState<any>();
  const [pickupDate, setPickupDate] = useState<any>();
  const [dropoffDate, setDropoffDate] = useState<any>();
  const [packagePrice, setPackagePrice] = useState<any>();
  const [bookingOpt, setBookingOpt] = useState<any>();

  const [selectedPackageAmount, setSelectedPackageAmount] = useState<number>();
  const [textareaHeight, setTextareaHeight] = useState("auto");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [selectedPromocodeOption, setSelectedPromocodeOption] = useState<
    string | any
  >();
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [discountAppliedAmount, setDiscountAppliedAmount] = useState<number>(0);
  const [selectedDiscountType, setSelectedDiscountType] = useState<
    string | any
  >();

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Inculded/Excluded GST >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  console.log({ currentPackage });

  const result = calculateGST(
    packagePrice,
    parseFloat(currentPackage?.package1?.gstRate),
    currentPackage?.gst
  );
  // console.log(`Price: ${packagePrice} - GST ${parseFloat(currentPackage?.package1?.gstRate)}%:`, result);

  const doorStepAmount = selectedDoorStepObject?.[0]?.price ?? 0;
  const totalExcludedGSTAmount =
    Number(packagePrice) +
    Number(result?.gstAmount) +
    Number(currentPackage?.refundableDeposit) +
    doorStepAmount;
  const totalIncludedGSTAmount =
    Number(packagePrice) +
    Number(currentPackage?.refundableDeposit) +
    doorStepAmount;

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Duration >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const total = Number(packagePrice);

  const { duration } = useReservationDateTime();
  const { days, hours } = extractDaysAndHours(duration);
  const totalPrice = calculatePrice(Number(days), Number(hours), Number(total));
  // console.log({ totalPrice })

  const ThirtyDiscountForInculdedTax = (totalIncludedGSTAmount * 30) / 100;
  const ThirtyDiscountForExcludedTax = (totalExcludedGSTAmount * 30) / 100;
  // console.log(ThirtyDiscountForInculdedTax,"advance");
  // console.log(totalIncludedGSTAmount,"else");

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const storedPickupTime = localStorage.getItem("pickupTime");
      const storedDropoffTime = localStorage.getItem("dropoffTime");
      const storedTabValue = localStorage.getItem("tabValue");
      setPickupTime(storedPickupTime);
      setDropoffTime(storedDropoffTime);
      setSelectedTabValue(storedTabValue);
    }
  }, []);

  const pickupDateTimeString = pickupTime
    ? `${pickupDate}T${pickupTime}:00.000Z`
    : null;
  const droppingDateTimeString = dropoffTime
    ? `${dropoffDate}T${dropoffTime}:00.000Z`
    : null;

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("userId");
      const storedToken = localStorage.getItem("token");
      setUserId(storedUserId);
      setToken(storedToken);
    }
  }, []);

  console.log("carDetails", { carDetails });
  console.log("selectedTabValue", { selectedTabValue });

  const bookingData = {
    // userId: userData?.userData?._id,
    vehicleId: carDetails?._id,
    option: selectedTabValue,
    location: carDetails?.city,
    pickUpDateTime: pickupDateTimeString,
    dropOffDateTime: droppingDateTimeString,
    baseFare: packagePrice,
    doorstepDelivery: roundPrice(Number(selectedDoorStepObject[0]?.price)),
    gstRate: currentPackage?.package1?.gstRate,
    gstAmount: roundPrice(Number(result?.gstAmount)),
    insuranceGST: carDetails?.extraService?.insurance,
    refundableDeposit: currentPackage?.refundableDeposit,
    kmsLimit: 0,
    fuel: carDetails?.extraService?.fuel,
    extraKmsCharge: carDetails?.extraService?.extraKmCharges,
    tollsParking: "",
    promocode: {
      code: selectedPromocodeOption ? selectedPromocodeOption : null,
      discountType: selectedDiscountType ? selectedDiscountType : null,
      discountAmount: Number(discountAppliedAmount.toFixed(2)),
    },
    totalAmount:
      (currentPackage?.gst === "Excluded" && totalExcludedGSTAmount) ||
      (currentPackage?.gst === "Included" && totalIncludedGSTAmount),
    bookingDuration: duration,
    bufferTime: 0,
    kilometers: 0,
    // createdByUser: userData?.userData?._id,
  };

  console.log("bookingData", { bookingData });

  const [bookingSuccess, setBookingSuccess] = useState(false);

  async function handleBooking() {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_URI_BASE}/cabme/booking`,
        bookingData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(response?.data?.message);
      setMessage(response?.data?.message);
      if (response?.data?.success) {
        setBookingSuccess(true);
        setTimeout(() => {
          // router.push("/payment")
        }, 2000);
      }
    } catch (error: any) {
      console.error("Error booking cab:", { error });
    }
  }

  React.useEffect(() => {
    const getPromoCodes = async () => {
      try {
        const data = await fetchPromoCodes();
        setPromoCodes(data?.promocodes);
      } catch (error) {
        console.log({ error });
      }
    };

    getPromoCodes();
  }, []);

  const handleChangePromocodeOption = (e: any) => {
    setSelectedPromocodeOption(e.target.value);
  };

  const handleApplyPromoCode = () => {
    if (selectedPromocodeOption) {
      const selectedPromoCode = promoCodes.find(
        (code: PromoCode) => code.code === selectedPromocodeOption
      ) as PromoCode | undefined;
      console.log({ selectedPromoCode });
      if (selectedPromoCode) {
        if (selectedPromoCode.selectDiscount === "Percentage") {
          const discount = (selectedPromoCode.couponAmount / 100) * totalPrice;
          const discountedPrice = totalPrice - discount;
          setDiscountAmount(discountedPrice);
          setDiscountAppliedAmount(discount);
          setSelectedDiscountType(selectedPromoCode.selectDiscount);
        } else if (selectedPromoCode.selectDiscount === "Fixed") {
          const discountedPrice = totalPrice - selectedPromoCode.couponAmount;
          setDiscountAmount(discountedPrice);
          setDiscountAppliedAmount(selectedPromoCode.couponAmount);
          setSelectedDiscountType(selectedPromoCode.selectDiscount);
        }
      } else {
        setDiscountAmount(0);
        setDiscountAppliedAmount(0);
        setSelectedPromocodeOption(null);
        setSelectedDiscountType(null);
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
      return item?._id === slug ? setCarDetails(item) : "";
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
    const storedPickupTime = localStorage.getItem("pickupTime");
    const storedDropoffTime = localStorage.getItem("dropoffTime");
    const selectedPackagePrice = localStorage.getItem("selectedPackagePrice");

    setPackagePrice(selectedPackagePrice);
    setPickupDate(getPickup);
    setDropoffDate(getDropoff);
    setDropoffTime(storedDropoffTime);
    setPickupTime(storedPickupTime);
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
        ? setCurrentPackage(
            carDetails?.bookingOptions?.withDriver?.local?.packageType
          )
        : "";
    }
  }, [carDetails]);
  if (loading) {
    return (
      <div>
        <BlinkerLoader />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // console.log({ selectedPackageAmount })
  const handlePriceChange = (updatedPrice: any) => {
    setSelectedPackageAmount(updatedPrice);
    localStorage.setItem("selectedPackagePrice", updatedPrice);
    setPackagePrice(updatedPrice);
  };

  const paymentExcludedTax =
    roundPrice(Number(ThirtyDiscountForExcludedTax)) >= 2000
      ? roundPrice(Number(ThirtyDiscountForExcludedTax))
      : roundPrice(Number(totalExcludedGSTAmount));

  const advance_Payment =
    roundPrice(Number(ThirtyDiscountForInculdedTax)) >= 2000
      ? roundPrice(Number(ThirtyDiscountForInculdedTax))
      : roundPrice(totalIncludedGSTAmount);

  // if advance_Payment is nan then don't return the advance_payment value
  const advancePayment = isNaN(advance_Payment) ? null : advance_Payment;
  console.log("advancePayment", { advance_Payment });

  // console.log("paymentExcludedTax tas",{paymentExcludedTax})

  const handleProceed = () => {
    const x = sessionStorage.setItem("slug", slug);
    //  if(advance_Payment){
    //   setPayableAmount(paymentExcludedTax > advance_Payment ? paymentExcludedTax : advance_Payment);
    //  }

    localStorage.setItem("bookingData", JSON.stringify(bookingData));

    // if value is nan in advance_Payment then don't set valuein local storage if value is not nan then set value in local storage
    if (advancePayment) {
      localStorage.setItem("advancePayment", advancePayment);
    }

    console.log(payableAmount, "xx");
    router.push("/check-out");
  };

  console.log(payableAmount, "advance payment");

  const handleProceedTotal = () => {
    sessionStorage.setItem("slug", slug);
    console.log(payableAmount, "total payment");

    setPayableAmount(null);

    // for save booking data
    // setData(bookingData);

    localStorage.setItem("bookingData", JSON.stringify(bookingData));

    localStorage.removeItem("advancePayment");

    router.push("/check-out");
  };

  const package1Price =
    calculateTotalPrice(currentPackage?.package1?.price) || 0;
  const package2Price =
    calculateTotalPrice(currentPackage?.package2?.price) || 0;
  const package3Price =
    calculateTotalPrice(currentPackage?.package3?.price) || 0;

  const allPrices = [
    roundPrice(package1Price),
    roundPrice(package2Price),
    roundPrice(package3Price),
  ];
  const roundedPrices = allPrices?.map(roundPrice);

  const uniquePrices = Array.from(
    new Set(roundedPrices.filter((price) => price !== 0))
  );

  const balance_payment = totalIncludedGSTAmount - advance_Payment;
  console.log("balance_payment", { balance_payment });

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

            {/* mobile view */}

            <div className="my-12">
              <Specifications spec={carDetails?.vehicleSpecifications as any} />
            </div>
            <div className="my-12">
              <CarFeatures carFeatures={carDetails?.carFeatures as any} />
            </div>
          </div>
          {/*  */}
          <div>
            <div className="lg:block">
              <BookingDetailsCard city={carDetails?.city as any} />
            </div>
            {/* booking summary */}
            <div className="lg:block m-auto flex justify-center w-full sm:px-0 px-4">
              {/* <BookingSummery/> */}
              <main className="max-w-[380px] px-4 sm:max-w-[511px] w-full flex flex-col items-center bg-[#f5f5f5] py-10 my-6 rounded-xl">
                <div className="w-[320px] sm:w-[376px] lg:w-[440px] h-[50px] bg-black text-white font-bold text-[20px] flex justify-center items-center rounded-xl">
                  <span className="text-center">Booking Summary</span>
                </div>
                <div className="my-5  flex justify-between items-center w-full sm:px-8 text-[14px] sm:text-[18px]">
                  <span className="font-semibold sm:ml-2">Package Name</span>
                  <select
                    name="package"
                    id="package"
                    className="cursor-pointer w-[140px] p-2 mr-2 rounded-md font-semibold outline-none"
        
                    onChange={(event) =>
                      handlePriceChange(event?.target?.value)
                    }
                  >
                    <option value={packagePrice}>
                      {packagePrice !== undefined
                        ? `₹${packagePrice}`
                        : "Select Package"}
                    </option>
                    <option value={roundPrice(package1Price)}>
                      ₹{roundPrice(package1Price)}
                    </option>
                    <option value={roundPrice(package2Price)}>
                      ₹{roundPrice(package2Price)}
                    </option>
                    <option value={roundPrice(package3Price)}>
                      ₹{roundPrice(package3Price)}
                    </option>
                  </select>
                </div>
                <div className="grid grid-cols-1 items-start justify-center gap-4 font-semibold">
                  <div className="grid grid-cols-2 gap-14  justify-center text-[14px] sm:text-[18px]">
                    <span className="sm:w-[220px] sm:ml-10">
                      Package Amount
                    </span>
                    <span className="sm:w-[220px] sm:ml-10 w-fit">
                      ₹{roundPrice(packagePrice)}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-14  justify-center text-[14px] sm:text-[18px]">
                    <span className="sm:w-[220px] sm:ml-10">
                      Doorstep delivery & pickup
                    </span>
                    <span
                      className="sm:w-[220px]  sm:ml-8"
                      onClick={handleShowDoorstepPopup}
                    >
                      <div className="relative w-full sm:w-[80%]">
                        <textarea
                          ref={textareaRef}
                          className="w-full p-1 rounded-md border resize-none overflow-hidden"
                          style={{ height: textareaHeight }}
                          value={
                            selectedDoorStepObject[0]?.location
                              ? `${selectedDoorStepObject[0]?.location} - ${selectedDoorStepObject[0]?.subLocation} - ₹${selectedDoorStepObject[0]?.price}`
                              : "Select"
                          }
                          disabled
                        />
                        <div
                          className="absolute top-0 left-0 w-full h-full cursor-pointer"
                          onClick={() => handleShowDoorstepPopup()}
                          style={{ background: "rgba(0,0,0,0)", zIndex: 1 }}
                        />
                      </div>

                      {/* ₹{currentPackage?.DoorstepDeliveryPickup?.reduce((acc: any, item: any) => acc + item?.price, 0)} */}
                    </span>
                    {showDoorStep && (
                      <div className="fixed bg-[#00000082] left-0 top-0 z-[999] w-full h-full flex items-center justify-center">
                        <DropLocation
                          onClose={() => setShowDoorStep(false)}
                          onSelectItem={handleSelectItemDoorStep}
                          currentPackage={
                            currentPackage?.DoorstepDeliveryPickup
                          }
                        />
                      </div>
                    )}
                  </div>
                  {/* <div className="text-sm font-semibold text-[#5c5c5c] sm:w-[220px] sm:ml-10">
                    {
                      selectedDoorStepObject[0]?.location + " " + selectedDoorStepObject[0]?.subLocation + " - " + selectedDoorStepObject[0]?.price
                    }
                  </div> */}

                  <div className="grid grid-cols-2 gap-14  justify-center text-[14px] sm:text-[18px]">
                    <span className="sm:w-[220px] sm:ml-10">
                      GST ({currentPackage?.package1?.gstRate}%)
                    </span>
                    <span className="sm:w-[220px] sm:ml-10">
                      ₹{roundPrice(Number(result?.gstAmount))}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-14  justify-center text-[14px] sm:text-[18px]">
                    <span className="sm:w-[220px] sm:ml-10">
                      Refundable Deposit
                    </span>
                    <span className="sm:w-[220px] sm:ml-10">
                      ₹{currentPackage?.refundableDeposit}
                    </span>
                  </div>

                  {/* DESKTOP ...  */}
                  {currentPackage?.gst === "Excluded" && (
                    <div className="grid grid-cols-2 w-full gap-14 py-2 justify-center shadow-custom-inner font-bold text-xl text-[14px] sm:text-[18px]">
                      <span className="sm:w-[220px] sm:ml-10">TOTAL</span>
                      <span className="sm:w-[220px] sm:ml-10 text-[#ff0000]">
                        ₹ {roundPrice(totalExcludedGSTAmount)}
                      </span>
                    </div>
                  )}
                  {currentPackage?.gst === "Included" && (
                    <div className="grid grid-cols-2 w-full gap-14 py-2 justify-center shadow-custom-inner font-bold text-xl text-[14px] sm:text-[18px]">
                      <span className="sm:w-[220px] sm:ml-10">TOTAL</span>
                      <span className="sm:w-[220px] sm:ml-10 text-[#ff0000]">
                        ₹ {roundPrice(totalIncludedGSTAmount)}
                      </span>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-14  justify-center text-[14px] sm:text-[18px]">
                    <span className="sm:w-[220px] sm:ml-10">Fuel</span>
                    <span className="sm:w-[220px] sm:ml-10">
                      {currentPackage?.fuel}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-14  justify-center text-[14px] sm:text-[18px]">
                    <span className="sm:w-[220px] sm:ml-10">
                      Extra kms charge
                    </span>
                    <span className="sm:w-[220px] sm:ml-10">
                      ₹{currentPackage?.extraKmsCharge}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-14 text-[14px] sm:text-[18px] justify-center">
                    <span className="sm:w-[220px] sm:ml-10">
                      Tolls,Parking & Inner-state taxes
                    </span>
                    <span className="sm:w-[220px] sm:ml-10">
                      {currentPackage?.tollsParkingTaxes}
                    </span>
                  </div>
                </div>
                <div>
                  {/* DESKTOP TOTAL AMOUNT  */}
                  <div className="my-6 h-[79px] gap-6 drop-shadow-lg bg-[#FAFAFA] flex flex-row items-center justify-between px-4 w-[340px] sm:w-[420px] py-5 rounded-3xl" style={{ backgroundColor: '#E7E7E7' }}>
                    {currentPackage?.gst === "Excluded" && (
                      <div className="flex flex-col">
                        <span className="text-sm md:text-md">
                          Total Amount{" "}
                        </span>
                        <span className="text-[#ff0000] p-0 sm:text-2xl font-bold">
                          ₹ {roundPrice(totalExcludedGSTAmount)}
                        </span>
                      </div>
                    )}
                    {currentPackage?.gst === "Included" && (
                      <div className="flex flex-col">
                        <span className="text-sm md:text-md">Total Amount</span>
                        <span className="text-[#ff0000] p-0 sm:text-2xl font-bold">
                          ₹ {roundPrice(totalIncludedGSTAmount)}
                        </span>
                      </div>
                    )}
                    <div>
                      <button
                        onClick={handleProceedTotal}
                        className="bg-gradient-to-r from-[#F1301E] to-[#FA4F2F] sm:text-2xl font-semibold text-white sm:w-[178.31px] px-6 py-2  sm:h-[53.08px] rounded-full drop-shadow-lg "
                      >
                        Proceed
                      </button>
                    </div>
                  </div>
                </div>

                {/* DESKTOP  */}
                <div className="flex flex-row items-center justify-around border-[1.5px] w-[340px] sm:w-[423px] py-2 rounded-3xl border-[#ff0000] cursor-pointer" style={{
  width: '355px',
  height: '100px',
  gap: '0px',
  borderRadius: '29px 29px 29px 29px',
}}>
                  <div className="flex flex-col items-start">
                    {currentPackage?.gst === "Included" && (
                      <span className="font-bold text-md" style={{marginTop:'1rem', marginLeft:'1rem'}} >
                        Pay ₹
                        {roundPrice(Number(ThirtyDiscountForInculdedTax)) >=
                        2000
                          ? roundPrice(Number(ThirtyDiscountForInculdedTax))
                          : roundPrice(totalIncludedGSTAmount)}{" "}
                        Now
                      </span>
                    )}
                    {currentPackage?.gst === "Excluded" && (
                     <span className="font-bold text-md" style={{marginTop:'1rem', marginLeft:'1rem'}}>
                        Pay ₹ {paymentExcludedTax}
                        {/* {roundPrice(Number(ThirtyDiscountForExcludedTax)) >= 2000 ? roundPrice(Number(ThirtyDiscountForExcludedTax)) : roundPrice(totalExcludedGSTAmount)} Now */}
                      </span>
                    )}
                    <span className="text-[#ff0000] font-semibold text-[15px]" style={{marginLeft:'1rem', marginBottom:'1rem'}}>
                      ₹{balance_payment} Balance on Delivery
                    </span>
                  </div>
                  <button
                    onClick={handleProceed}
                    className="bg-gradient-to-r from-[#F1301E] to-[#FA4F2F] text-md font-semibold text-white w-[120.31px] h-[42.08px] rounded-full drop-shadow-lg"style={{marginRight:'1rem'}}
                  >
                    Proceed
                  </button>
                </div>
              </main>
            </div>
            {/* <h1 className="text-[#ff0000] font-semibold text-[15px]">{message}</h1> */}

            <div className="p-6 sm:p-0">
              <div className="flex gap-2 items-start"><Image src="/clock.png" alt=" " width={30} height={30} />
              <div className="flex flex-col gap-2 text-[#6CAE39] font-semibold text-[16px]">
                <li>100% refund before 48 hours</li>
                <li>50% refund before 24 hours
                </li>
                <li>Cancellation after the above date will have to bear additional INR 2000 as convenience fees.
                </li>
                <li>Any cancellations after the booking date will only get the security deposit amount and not the rental fare received.</li>
              </div>
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
        <div>{/* <Video /> */}</div>
        <div className="mx-10 top-button">
          {/* <InterestedSlider/> */}
          {/* <FleetsSlider showButton={false} showRatingStar={false} /> */}
        </div>
      </div>
    </>
  );
};
export default CarDetails;
