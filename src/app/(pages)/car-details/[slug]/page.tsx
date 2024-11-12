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
import { searchVehicleNew } from "../../../../../networkRequests/hooks/api";
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
import OfferCards from "@/app/components/offer-cards/offer-cards";
import { useSelector, useDispatch } from "react-redux";
import {
  setPickupLocationRedux,
  setDropOffLocationRedux,
  setPickupDateRedux,
  setDropOffDateRedux,
  setPickupTimeRedux,
  setDropoffTimeRedux,
  setTabValueRedux,
  setRadioToggleRedux,
  setNonFormatedPickupDateRedux,
  setNonFormatedDropoffDateRedux,
  setSelectedPackagePriceRedux,
  setSelectedPackageFreeKmsRedux,
  setDoorStepPriceChargeRedux,
  setBookingDataRedux,
  setCheckFreeKmRedux,
  setAdvancePaymentRedux,
  setIsFullpaymentRedux,
} from "../../../../../redux/slices/locationSlice";
import ApplyCoupon from "@/app/components/ApplyCoupon/apply-coupon";

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
interface VehicleSearchPayload {
  city: string | null;
  dropOffDateTime: string | null;
  pickUpDateTime: string | null;
  toCity: string | null;
  bookingType: any;
}

const CarDetails = () => {
  // context api
  // const { data, setData } = useContextApi();
  const [bookingOptions, setBookingOptions] = useState<any>();
  const [dropoffLocation, setDropoffLocation] = useState<any>("");
  const { payableAmount, setPayableAmount } = useCarsStore();
  const [showCoupon, setShowCoupon] = useState<any | void>();
  const [promoCodes, setPromoCodes] = useState<any>([]);
  const [appliedCode, setAppliedCode] = useState<any>();
  const [discountApplied, setDiscountApplied] = useState<any>();
  const [vehicleIdCoupon, setVehicleIdCoupon] = useState<any>();
  const handleHidePopUp = () => {
    setApplyCoupon(false);
  };
  const [applyCoupon, setApplyCoupon] = React.useState(false);
  const [selectedPromoCode, setSelectedPromoCode] = useState<any>(null);
  const [currentVehicleId, setCurrentVehicleId] = useState<string | null>();

  const userData = useStore((state: any) => state);
  console.log("USER DATA", { userData });
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [pickupTime, setPickupTime] = useState<string | null>(null);
  const [dropoffTime, setDropoffTime] = useState<string | null>(null);
  const [selectedTabValue, setSelectedTabValue] = useState<string | null>(null);
  const [couponFromDate, setCouponFromDate] = useState<any>();
  const [couponToDate, setCouponToDate] = useState<any>();
  // const [promoCodes, setPromoCodes] = useState([]);
  const [message, setMessage] = useState<string | null>("");
  const [tabValue, setTabValue] = useState<any>();
  const [radioToggle, setRadioToggle] = useState<any>();
  const [currentPackage, setCurrentPackage] = useState<any>(0);
  const [showDoorStep, setShowDoorStep] = useState(false);
  const [bookingNote, setBookingNote] = useState<any>("");
  const [offer, setOffer] = useState("Daily Offers");
  const [cms, setCms] = useState<any>();

  const handleShowDoorstepPopup = () => {
    setShowDoorStep(true);
  };
  useEffect(() => {
    const getHomePageCMS = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_URI_BASE}/cabme/homepage`
        );
        console.log(res, "homepageres");
        setCms(res?.data);
      } catch (error) {
        console.error("Error fetching CMS data:", error);
      }
    };

    getHomePageCMS();
    const vehicleId = sessionStorage.getItem("slug");
    if (vehicleId) {
      setCurrentVehicleId(vehicleId);
    }
    // setCouponFromDate(fromDate);
    // setCouponToDate(toDate);
  }, []);

  if (showCoupon == true) {
    document.body.style.overflow = "hidden";
  }

  const fromDate = useSelector((state: any) => state.location.pickupDate);
  const toDate = useSelector((state: any) => state.location.dropOffDate);
  const userIdPromo = useSelector((state: any) => state.location.userId);

  console.log(currentVehicleId, "currentVehicleId");

  const [selectedDoorStepObject, setSelectedDoorStepObject] = useState<any>([]);
  const handleSelectItemDoorStep = (arr: any) => {
    setSelectedDoorStepObject([{ ...arr }]);
    setShowDoorStep(false);
  };

  React.useEffect(() => {
    if (selectedDoorStepObject.length > 0) {
      const price = selectedDoorStepObject[0]?.price;
      // localStorage.setItem("doorStepPriceCharge", JSON.stringify(price));
      dispatch(setDoorStepPriceChargeRedux(JSON.stringify(price)));
    }
    setTextareaHeight(textareaRef?.current?.scrollHeight + "px");

    console.log(selectedDoorStepObject, "selectedDoorStepObject");
  }, [selectedDoorStepObject]);

  const tabValueRedux = useSelector((state: any) => state.location.tabValue);

  const radioToggleRedux = useSelector(
    (state: any) => state.location.radioToggle
  );
  useEffect(() => {
    // const tabval = localStorage.getItem("tabValue");
    const tabval = tabValueRedux;

    // const radioTog = localStorage.getItem("radioToggle");

    const radioTog = radioToggleRedux;

    setTabValue(tabval);
    setRadioToggle(radioTog);
    // localStorage.removeItem("doorStepPriceCharge");
    dispatch(setDoorStepPriceChargeRedux(0));
    const x: any = sessionStorage.setItem("slug", slug);
    if (x) {
      setVehicleIdCoupon(x);
    }
  }, []);

  console.log(selectedPromoCode, "selectedPromoCode");

  const [carDetails, setCarDetails] = useState<any>();
  const [pickupDate, setPickupDate] = useState<any>();
  const [dropoffDate, setDropoffDate] = useState<any>();
  const [packagePrice, setPackagePrice] = useState<any>();
  const [freeKms, setFreeKms] = useState<any>(0);
  const [bookingOpt, setBookingOpt] = useState<any>();

  const dispatch = useDispatch();
  const [selectedPackageAmount, setSelectedPackageAmount] = useState<number>(0);
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

  const [locationData, setLocationData] = useState<VehicleSearchPayload>({
    city: null,
    pickUpDateTime: null,
    dropOffDateTime: null,
    bookingType: bookingOptions,
    toCity: dropoffLocation,
  });
  // console.log(`Price: ${packagePrice} - GST ${parseFloat(currentPackage?.package1?.gstRate)}%:`, result);

  const selfDropCities = (() => {
    // Check if selected tab is "Driver" and radio toggle is "One-way"
    if (selectedTabValue === "Driver" && radioToggle === "One-way") {
      return (
        carDetails?.bookingOptions?.withDriver?.oneway?.doorstepDelivery
          ?.filter((item: any) => item?.city === dropoffLocation)
          ?.map((item: any) => item?.price || 0) || []
      );
    }

    // Check if selected tab is "Self-Driving"
    if (selectedTabValue === "Self-Driving") {
      return (
        carDetails?.bookingOptions?.selfDrive?.packageType?.doorstepDelivery
          ?.filter((item: any) => item?.city === dropoffLocation)
          ?.map((item: any) => item?.price || 0) || []
      );
    }

    // Default value if no conditions are met
    return 0;
  })();

  const doorStepAmount = selectedDoorStepObject?.[0]?.price ?? 0;

  const totalExcludedGSTAmount =
    Number(packagePrice) +
    Number(result?.gstAmount) +
    Number(tabValue === "Driver" ? 0 : currentPackage?.refundableDeposit) +
    Number(selectedTabValue === "Self-Driving" ? selfDropCities : 0) +
    doorStepAmount- Number(selectedPromoCode?.discountApplied || 0);

  const totalIncludedGSTAmount =
    Number(packagePrice) +
    Number(tabValue === "Driver" ? 0 : currentPackage?.refundableDeposit) +
    Number(selectedTabValue === "Self-Driving" ? selfDropCities : 0) +
    doorStepAmount - Number(selectedPromoCode?.discountApplied || 0);

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Duration >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const total = Number(packagePrice);

  const { duration } = useReservationDateTime();
  const { days, hours, minutes } = extractDaysAndHours(duration);
  const totalPrice = calculatePrice(Number(days), Number(hours), Number(total));
  // console.log({ totalPrice })

  const ThirtyDiscountForInculdedTax = (totalIncludedGSTAmount * 30) / 100;
  const ThirtyDiscountForExcludedTax = (totalExcludedGSTAmount * 30) / 100;
  // console.log(ThirtyDiscountForInculdedTax,"advance");
  // console.log(totalIncludedGSTAmount,"else");
  // const tabValueRedux = useSelector((state: any) => state.location.tabValue);
  const dropOffLocationRedux = useSelector(
    (state: any) => state.location.dropOffLocation
  );
  const pickupDateRedux = useSelector(
    (state: any) => state.location.pickupDate
  );
  const dropOffDateRedux = useSelector(
    (state: any) => state.location.dropOffDate
  );
  const pickupTimeRedux = useSelector(
    (state: any) => state.location.pickupTime
  );
  const dropoffTimeRedux = useSelector(
    (state: any) => state.location.dropoffTime
  );
  const selectedPackagePriceRedux = useSelector(
    (state: any) => state.location.selectedPackagePrice
  );
  const selectedPackageFreeKmsRedux = useSelector(
    (state: any) => state.location.selectedPackageFreeKms
  );

  const paymentMode = useSelector((state: any) => state.location.isFullpayment);
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      // const storedPickupTime = localStorage.getItem("pickupTime");
      // const storedDropoffTime = localStorage.getItem("dropoffTime");
      // const storedTabValue = localStorage.getItem("tabValue");

      const storedPickupTime = pickupTimeRedux;
      const storedDropoffTime = dropoffTimeRedux;
      const storedTabValue = tabValueRedux;

      setPickupTime(storedPickupTime);
      setDropoffTime(storedDropoffTime);
      setSelectedTabValue(storedTabValue);
    }

    console.log(paymentMode == "", "paymentMode");
  }, []);

  const pickupDateTimeString = pickupTime
    ? `${pickupDate}T${pickupTime}:00.000Z`
    : null;
  const droppingDateTimeString = dropoffTime
    ? `${dropoffDate}T${dropoffTime}:00.000Z`
    : null;

  const userIdRedux = useSelector((state: any) => state.location.userId);
  const tokenRedux = useSelector((state: any) => state.location.token);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      // const storedUserId = localStorage.getItem("userId");
      // const storedToken = localStorage.getItem("token");

      const storedUserId = userIdRedux;
      const storedToken = tokenRedux;

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
    refundableDeposit: Number(
      tabValue === "Driver" ? 0 : currentPackage?.refundableDeposit
    ),
    kmsLimit: 0,
    fuel: carDetails?.extraService?.fuel,
    extraKmsCharge: carDetails?.extraService?.extraKmCharges,
    tollsParking: "",
    note: bookingNote || "",
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

  const [red1, setRed1] = useState(false);
  const [red2, setRed2] = useState(false);
  const [red3, setRed3] = useState(false);

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
  const pickupLocationRedux = useSelector(
    (state: any) => state.location.pickupLocation
  );

  const nonFormatedDropoffDate = useSelector(
    (state: any) => state.location.nonFormatedDropoffDate
  );
  const nonFormatedPickupDate = useSelector(
    (state: any) => state.location.nonFormatedPickupDate
  );
  useEffect(() => {
    // const location = localStorage.getItem("pickupLocation");

    // const pickupDate = localStorage.getItem("nonFormatedPickupDate");
    // const dropDate = localStorage.getItem("nonFormatedDropoffDate");

    const location = pickupLocationRedux;
    const pickupDate = nonFormatedPickupDate;
    const dropDate = nonFormatedDropoffDate;

    console.log("Location:", location);
    console.log("Pickup Date:", pickupDate);
    console.log("Dropoff Date:", dropDate);

    setLocationData({
      city: location,
      pickUpDateTime: pickupDate,
      dropOffDateTime: dropDate,
      bookingType: bookingOptions,
      toCity: dropoffLocation,
    });
  }, [bookingOptions, dropoffLocation]);

  const getCarDetails = useCallback(async () => {
    if (locationData.city && locationData.pickUpDateTime) {
      const getSearchCarData = await searchVehicleNew(locationData);
      const carData = getSearchCarData?.data?.vehiclesWithStatus;
      console.log(carData, "carDatadetail");
      carData?.map((item: any) => {
        return item?._id === slug ? setCarDetails(item) : "";
      });
      carDetails?.bookingOptions?.selfDrive?.name === bookingOpt
        ? setCurrentPackage(
            carDetails?.bookingOptions?.selfDrive?.packageType?.package1.price
          )
        : setCurrentPackage(
            carDetails?.bookingOptions.withDriver?.oneway?.doorstepDelivery.find(
              (item: any) => (item?.city === dropoffLocation ? item?.price : 0)
            )
          );
    }
  }, [locationData, slug, dropoffLocation, bookingOpt, radioToggle]);

  console.log(currentPackage, "currentPackage");

  console.log(dropoffLocation, "dropoffLocation");

  React.useEffect(() => {
    // const getPickup = localStorage.getItem("pickupDate");
    // const getDropoff = localStorage.getItem("dropOffDate");
    // const storedPickupTime = localStorage.getItem("pickupTime");
    // const storedDropoffTime = localStorage.getItem("dropoffTime");
    // const selectedPackagePrice: any = localStorage.getItem(
    //   "selectedPackagePrice"
    // );
    // const dropLoc = localStorage.getItem("dropOffLocation");
    // const freekms = localStorage.getItem("selectedPackageFreeKms");

    const getPickup = pickupDateRedux;
    const getDropoff = dropOffDateRedux;
    const storedPickupTime = pickupTimeRedux;
    const storedDropoffTime = dropoffTimeRedux;
    const selectedPackagePrice = selectedPackagePriceRedux;
    const dropLoc = dropOffLocationRedux;
    const freekms = selectedPackageFreeKmsRedux;

    setPackagePrice(selectedPackagePrice);
    setSelectedPackageAmount(selectedPackagePrice);
    setFreeKms(freekms);
    setPickupDate(getPickup);
    setDropoffDate(getDropoff);
    setDropoffTime(storedDropoffTime);
    setPickupTime(storedPickupTime);
    setDropoffLocation(dropLoc);
    getCarDetails();
  }, [slug]);

  React.useEffect(() => {
    // const getPickup = localStorage.getItem("pickupDate");
    // const getDropoff = localStorage.getItem("dropOffDate");
    // const storedPickupTime = localStorage.getItem("pickupTime");
    // const storedDropoffTime = localStorage.getItem("dropoffTime");
    // const selectedPackagePrice = localStorage.getItem("selectedPackagePrice");
    // const bookingOptions = localStorage.getItem("tabValue");
    // const freeKmss = localStorage.getItem("selectedPackageFreeKms");

    const getPickup = pickupDateRedux;
    const getDropoff = dropOffDateRedux;
    const storedPickupTime = pickupTimeRedux;
    const storedDropoffTime = dropoffTimeRedux;
    const selectedPackagePrice = selectedPackagePriceRedux;
    const dropLoc = dropOffLocationRedux;
    const freekms = selectedPackageFreeKmsRedux;

    setPackagePrice(selectedPackagePrice);

    setFreeKms(freeKms);
    setPickupDate(getPickup);
    setDropoffDate(getDropoff);
    setDropoffTime(storedDropoffTime);
    setPickupTime(storedPickupTime);
    setBookingOptions(bookingOptions);

    getCarDetails();
  }, [getCarDetails, slug]);

  const { vehicle, loading, error } = useVehicleById(slug as string);

  React.useEffect(() => {
    // const getPickup = localStorage.getItem("pickupDate");
    // const getDropoff = localStorage.getItem("dropOffDate");
    // const selectedPackagePrice = localStorage.getItem("selectedPackagePrice");
    // const bookingOption = localStorage.getItem("tabValue");
    // const freekm = localStorage.getItem("selectedPackageFreeKms");
    const getPickup = pickupDateRedux;
    const getDropoff = dropOffDateRedux;
    const selectedPackagePrice = selectedPackagePriceRedux;
    const bookingOption = tabValueRedux;
    const freekm = selectedPackageFreeKmsRedux;
    setPackagePrice(selectedPackagePrice);
    setFreeKms(freekm);
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

  console.log("duration", duration);

  const package1FreeKms =
    Number(
      currentPackage?.package1?.kmsLimit *
        (((days as number) + hours / 24) as number)
    ).toFixed(0) || 0;
  const package2FreeKms =
    Number(
      currentPackage?.package2?.kmsLimit *
        (((days as number) + hours / 24) as number)
    ).toFixed(0) || 0;
  const package3FreeKms =
    Number(
      currentPackage?.package3?.kmsLimit *
        (((days as number) + hours / 24) as number)
    ).toFixed(0) || 0;

  let totalHours = days * 24 + hours + minutes / 60;

  if (totalHours < 48) {
    console.log("Duration is less than 48 hours.");
  } else {
    console.log("Duration meets the requirement.");
  }

  const handlePriceChange = (updatedPrice: any, name: any) => {
    setSelectedPackageAmount(updatedPrice);

    // localStorage.setItem("selectedPackagePrice", updatedPrice);
    dispatch(setSelectedPackagePriceRedux(updatedPrice));
    setPackagePrice(updatedPrice);
    console.log(name, "packagename");
    if (name === "Package 1") {
      // setFreeKms(package1FreeKms);
      // localStorage.setItem(
      //   "selectedPackageFreeKms",
      //   package1FreeKms.toString()
      // );

      dispatch(setSelectedPackageFreeKmsRedux(package1FreeKms.toString()));

      setRed1(true);
      setRed2(false);
      setRed3(false);
    }
    if (name === "Package 2") {
      setFreeKms(package2FreeKms);
      // localStorage.setItem(
      //   "selectedPackageFreeKms",
      //   package2FreeKms.toString()
      // );
      dispatch(setSelectedPackageFreeKmsRedux(package2FreeKms.toString()));

      setRed2(true);
      setRed1(false);
      setRed3(false);
    }
    if (name === "Package 3") {
      setFreeKms(package3FreeKms);
      // localStorage.setItem(
      //   "selectedPackageFreeKms",
      //   package3FreeKms.toString()
      // );
      dispatch(setSelectedPackageFreeKmsRedux(package3FreeKms.toString()));

      setRed2(false);
      setRed1(false);
      setRed3(true);
    }
    console.log(package3FreeKms, "package3FreeKms");
  };

  // useEffect(() => {
  //   const freekm = localStorage.getItem("")
  // },[])

  console.log(package3FreeKms, "package3FreeKms");

  const paymentExcludedTax =
    roundPrice(Number(ThirtyDiscountForExcludedTax)) >= 2000
      ? roundPrice(Number(ThirtyDiscountForExcludedTax))
      : roundPrice(Number(totalExcludedGSTAmount));

  const advance_Payment =
    roundPrice(Number(ThirtyDiscountForInculdedTax)) >= 2000
      ? roundPrice(Number(ThirtyDiscountForInculdedTax))
      : roundPrice(totalIncludedGSTAmount);

  const Driver15k = 1500;

  console.log(
    ThirtyDiscountForInculdedTax,
    ThirtyDiscountForExcludedTax,
    advance_Payment,
    "pppp"
  );

  // if advance_Payment is nan then don't return the advance_payment value
  const advancePayment = isNaN(advance_Payment) ? null : advance_Payment;
  console.log("advancePayment", { advancePayment });

  // console.log("paymentExcludedTax tas",{paymentExcludedTax})

  const handleProceed = () => {
    const x = sessionStorage.setItem("slug", slug);
    //  if(advance_Payment){
    //   setPayableAmount(paymentExcludedTax > advance_Payment ? paymentExcludedTax : advance_Payment);
    //  }

    // localStorage.setItem("bookingData", JSON.stringify(bookingData));

    dispatch(setBookingDataRedux(JSON.stringify(bookingData)));

    // localStorage.setItem("checkFreeKm", freeKms);

    dispatch(setCheckFreeKmRedux(freeKms));

    let paymentAmount;

    if (currentPackage?.gst === "Included" && selectedTabValue !== "Driver") {
      paymentAmount =
        roundPrice(Number(ThirtyDiscountForInculdedTax)) >= 2000
          ? roundPrice(Number(ThirtyDiscountForInculdedTax))
          : roundPrice(totalIncludedGSTAmount);
    } else if (
      currentPackage?.gst === "Excluded" &&
      selectedTabValue !== "Driver"
    ) {
      paymentAmount =
        roundPrice(Number(ThirtyDiscountForExcludedTax)) >= 2000
          ? roundPrice(Number(ThirtyDiscountForExcludedTax))
          : roundPrice(totalExcludedGSTAmount);
    } else if (
      currentPackage?.gst === "Excluded" &&
      selectedTabValue == "Driver"
    ) {
      paymentAmount = Driver15k;
    } else if (
      currentPackage?.gst === "Included" &&
      selectedTabValue == "Driver"
    ) {
      paymentAmount = Driver15k;
    }

    if (paymentAmount) {
      // localStorage.setItem("advancePayment", paymentAmount);
      dispatch(setAdvancePaymentRedux(paymentAmount));
    }
    const val = "false";

    // localStorage.setItem("isFullpayment", val);
    dispatch(setIsFullpaymentRedux(val));

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
    const val = "true";

    // localStorage.setItem("isFullpayment", val);
    dispatch(setIsFullpaymentRedux(val));

    // localStorage.setItem("checkFreeKm", freeKms);

    dispatch(setCheckFreeKmRedux(freeKms));

    // localStorage.setItem("bookingData", JSON.stringify(bookingData));
    dispatch(setBookingDataRedux(JSON.stringify(bookingData)));

    // localStorage.removeItem("advancePayment");

    dispatch(setAdvancePaymentRedux(""));

    router.push("/check-out");
  };

  const package1Price = calculateTotalPrice(
    pickupDateRedux,
    dropOffDateRedux,
    pickupTimeRedux,
    dropoffTimeRedux,
    currentPackage?.package1?.price
  );
  const package2Price = calculateTotalPrice(
    pickupDateRedux,
    dropOffDateRedux,
    pickupTimeRedux,
    dropoffTimeRedux,
    currentPackage?.package2?.price
  );
  const package3Price = calculateTotalPrice(
    pickupDateRedux,
    dropOffDateRedux,
    pickupTimeRedux,
    dropoffTimeRedux,
    currentPackage?.package3?.price
  );

  // console.log(currentPackage?.package2?.price,"currentPackage")

  const package1Duration = currentPackage?.package1?.duration;
  const package2Duration = currentPackage?.package2?.duration;
  const package3Duration = currentPackage?.package3?.duration;

  const allPrices = [
    roundPrice(package1Price || 0 || 0),
    roundPrice(package2Price || 0 || 0),
    roundPrice(package3Price || 0),
  ];
  const roundedPrices = allPrices?.map(roundPrice);

  const uniquePrices = Array.from(
    new Set(roundedPrices.filter((price) => price !== 0))
  );

  const balance_paymentExculded =
    totalExcludedGSTAmount - ThirtyDiscountForExcludedTax;
  const balance_paymentIncluded =
    totalIncludedGSTAmount - ThirtyDiscountForInculdedTax;
  const balance_driverInclude = totalIncludedGSTAmount - Driver15k;
  const balance_driverExclude = totalExcludedGSTAmount - Driver15k;
  console.log("balance_payment", {
    balance_paymentExculded,
    balance_paymentIncluded,
  });
  console.log("advance_Payment", { advance_Payment });

  console.log(
    totalIncludedGSTAmount,
    totalExcludedGSTAmount,
    "totalIncludedGSTAmount"
  );

  // alert(vehicleIdCoupon)

  return (
    <>
      <div className="py-6">
        <div className="z-[99999]">
          <ToastContainer />
        </div>

        <div>
          {showCoupon && (
            <ApplyCoupon
              promoCodes={promoCodes}
              setHide={setShowCoupon}
              appliedCode={setAppliedCode}
              // discountType={setDiscountType}
              discountApplyAmount={setDiscountApplied}
              paymentMode={paymentMode}
              totalAmount={
                currentPackage?.gst === "Included"
                  ? roundPrice(totalIncludedGSTAmount)
                  : totalExcludedGSTAmount
              }
              vehicleId={vehicleIdCoupon}
              fromDate={fromDate}
              toDate={toDate}
              userIdPromo={userIdPromo}
              onClick={() => {
                setShowCoupon(false);
                document.body.style.overflow = "auto";
              }}
              setSelectedPromoCode={setSelectedPromoCode}
            />
          )}
        </div>

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
              <div className="max-w-[1250px] w-full m-auto mt-20 hidden sm:block">
                <h2 className="sm:text-4xl text-2xl sm:mt-0 mt-0 font-semibold text-center">
                  Trending <span className="text-primary"> offers</span>
                </h2>
                <div className="w-fit flex justify-start m-auto text-md font-semibold sm:mt-6 sm:mb-6 mt-6  mb-0">
                  <div
                    className={`sm:py-4 py-2 sm:px-8 px-4 sm:text-md text-xs ${
                      offer === "Daily Offers" ? "bg-primary-color" : "bg-black"
                    } text-white rounded-l-full cursor-pointer`}
                    onClick={() => setOffer("Daily Offers")}
                  >
                    Daily Offers
                  </div>
                  <div
                    className={`sm:py-4 py-2 sm:px-8 px-4 sm:text-md text-xs ${
                      offer === "Daily Offers" ? "bg-black" : "bg-primary-color"
                    } text-white rounded-r-full cursor-pointer`}
                    onClick={() => setOffer("Monthly Offers")}
                  >
                    Monthly Offers
                  </div>
                </div>

                {offer === "Daily Offers" && (
                  <div className=" sm:mt-0 mt-4  offerCards">
                    {" "}
                    <OfferCards
                      isDetails={true}
                      banners={cms?.trendingOffer}
                      dailyOffer
                    />{" "}
                  </div>
                )}
                {offer === "Monthly Offers" && (
                  <div className=" sm:mt-0 mt-4 offerCards">
                    <OfferCards
                      isDetails={true}
                      banners={cms?.trendingOffer}
                      monthlyOffer
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          {/*  */}

          {/*  */}
          <div>
            <div className="lg:block">
              <BookingDetailsCard city={carDetails?.city as any} />
            </div>
            {/* booking summary */}
            <div className="lg:block m-auto flex justify-center w-full sm:px-0 px-4">
              {/* <BookingSummery/> */}
              <main className="max-w-[380px] px-4 sm:px-6 sm:max-w-[440px] w-full m-auto flex flex-col items-center bg-[#f5f5f5] py-10 my-6 rounded-xl">
                <div className="w-full max-w-[420px] mb-4 h-[50px] bg-black text-white font-bold text-[20px] flex justify-center items-center rounded-xl">
                  <span className="text-center">Booking Summary</span>
                </div>

                {tabValue === "Subscription" && (
                  <div className="my-5 flex justify-between items-center w-full text-[14px] sm:text-[16px]">
                    <div className="flex gap-2 items-center flex-wrap">
                      <button
                        onClick={() => {
                          let packageName = "Package 1";
                          const selectedValue = roundPrice(
                            package1Price || 0
                          ).toString();

                          if (
                            bookingOptions == "Self-Driving" &&
                            package1FreeKms == 0 &&
                            totalHours < 48
                          ) {
                            alert(
                              "To select the unlimited package, the minimum booking duration must be at least 2 days."
                            );
                            setSelectedPackageAmount(
                              roundPrice(package1Price || 0).toString()
                            );
                            handlePriceChange(
                              roundPrice(package1Price || 0).toString(),
                              packageName
                            );
                            return;
                          }

                          handlePriceChange(selectedValue, packageName);
                        }}
                        className={`bg-[#fff] click:bg-red-400 rounded-md p-2 cursor-pointer border border-[#fff0] hover:border-[#ccc] px-4 font-bold whitespace-nowrap hover:bg-red-500 hover:text-[#fff] ${
                          red1 && "bg-red-600 text-[#fff]"
                        }`}
                      >
                        {package1Duration}
                      </button>

                      <button
                        onClick={() => {
                          let packageName = "Package 2";
                          const selectedValue = roundPrice(
                            package2Price || 0
                          ).toString();

                          if (
                            bookingOptions == "Self-Driving" &&
                            package2FreeKms == 0 &&
                            totalHours < 48
                          ) {
                            alert(
                              "To select the unlimited package, the minimum booking duration must be at least 2 days."
                            );
                            setSelectedPackageAmount(
                              roundPrice(package1Price || 0).toString()
                            );
                            handlePriceChange(
                              roundPrice(package1Price || 0).toString(),
                              "Package 1"
                            );
                            return;
                          }

                          handlePriceChange(selectedValue, packageName);
                        }}
                        className={`bg-[#fff] rounded-md p-2 cursor-pointer border border-[#fff0] font-bold  hover:border-[#ccc] px-4 whitespace-nowrap hover:bg-red-500 hover:text-[#fff] ${
                          red2 && "bg-red-600 text-[#fff]"
                        }`}
                      >
                        {package2Duration}
                      </button>

                      <button
                        onClick={() => {
                          let packageName = "Package 3";
                          const selectedValue = roundPrice(
                            package3Price || 0
                          ).toString();

                          if (
                            bookingOptions == "Self-Driving" &&
                            package3FreeKms == 0 &&
                            totalHours < 48
                          ) {
                            alert(
                              "To select the unlimited package, the minimum booking duration must be at least 2 days."
                            );
                            setSelectedPackageAmount(
                              roundPrice(package1Price || 0).toString()
                            );
                            handlePriceChange(
                              roundPrice(package1Price || 0).toString(),
                              "Package 1"
                            );
                            return;
                          }

                          handlePriceChange(selectedValue, packageName);
                        }}
                        className={`bg-[#fff] font-bold  rounded-md p-2 cursor-pointer border border-[#fff0] hover:border-[#ccc] px-4 whitespace-nowrap hover:bg-red-500 hover:text-[#fff] ${
                          red3 && "bg-red-600 text-[#fff]"
                        }`}
                      >
                        {package3Duration}
                      </button>
                    </div>
                  </div>
                )}

                {(tabValue === "Self-Driving" ||
                  tabValue === "Subscription" ||
                  (tabValue === "Driver" && radioToggle === "Local")) && (
                  <div className="my-5 flex justify-between items-center w-full text-[14px] sm:text-[16px]">
                    <span className="font-semibold">Package Name</span>
                    <select
                      value={selectedPackageAmount}
                      name="package"
                      id="package"
                      className="cursor-pointer w-[180px] sm:w-[w-350px] text-[14px] sm:text-[16px] p-2 rounded-md font-semibold outline-none"
                      onChange={(event) => {
                        const selectedValue = event.target.value;
                        let packageName = "";

                        switch (selectedValue) {
                          case roundPrice(package1Price || 0).toString():
                            packageName = "Package 1";
                            break;
                          case roundPrice(package2Price || 0).toString():
                            packageName = "Package 2";
                            break;
                          case roundPrice(package3Price || 0).toString():
                            packageName = "Package 3";
                            break;
                          default:
                            packageName = "Select Package";
                        }

                        if (bookingOptions == "Self-Driving") {
                          if (
                            packageName == "Package 1" &&
                            package1FreeKms == 0
                          ) {
                            if (totalHours < 48) {
                              alert(
                                "To select the unlimited package, the minimum booking duration must be at least 2 days."
                              );
                              setSelectedPackageAmount(
                                roundPrice(package1Price || 0).toString()
                              ); // Revert to Package 1
                              handlePriceChange(
                                roundPrice(package1Price || 0).toString(),
                                "Package 1"
                              );
                              return;
                            }
                          }
                          if (
                            packageName == "Package 2" &&
                            package2FreeKms == 0
                          ) {
                            if (totalHours < 48) {
                              alert(
                                "To select the unlimited package, the minimum booking duration must be at least 2 days."
                              );
                              setSelectedPackageAmount(
                                roundPrice(package1Price || 0).toString()
                              ); // Revert to Package 1
                              handlePriceChange(
                                roundPrice(package1Price || 0).toString(),
                                "Package 1"
                              );
                              return;
                            }
                          }
                          if (
                            packageName == "Package 3" &&
                            package3FreeKms == 0
                          ) {
                            if (totalHours < 48) {
                              alert(
                                "To select the unlimited package, the minimum booking duration must be at least 2 days."
                              );
                              setSelectedPackageAmount(
                                roundPrice(package1Price || 0).toString()
                              ); // Revert to Package 1
                              handlePriceChange(
                                roundPrice(package1Price || 0).toString(),
                                "Package 1"
                              );
                              return;
                            }
                          }
                        }

                        // Send the selected package name and price
                        handlePriceChange(selectedValue, packageName);
                      }}
                    >
                      <option value={roundPrice(package1Price || 0)}>
                        ₹{roundPrice(package1Price || 0)}
                      </option>
                      <option value={roundPrice(package2Price || 0)}>
                        ₹{roundPrice(package2Price || 0)}
                      </option>
                      <option value={roundPrice(package3Price || 0)}>
                        ₹{roundPrice(package3Price || 0)}
                      </option>
                    </select>
                  </div>
                )}
                {/* {console.log(package1Price,'surajprice')} */}

                <div className="grid grid-cols-1 gap-4 mt-0 font-semibold text-[14px] sm:text-[18px]">
                  <div className="grid grid-cols-2 gap-14 justify-between text-[14px] sm:text-[16px]">
                    <span>Package Amount</span>
                    <span>₹{roundPrice(packagePrice)}</span>
                  </div>
                  {(tabValue == "Self-Driving" ||
                    tabValue == "Subscription") && (
                    <div className="grid grid-cols-2 gap-14 justify-between text-[14px] sm:text-[16px]">
                      <span>Free Kms</span>
                      <span>{freeKms != 0 ? `${freeKms}km` : "Unlimited"}</span>
                    </div>
                  )}

                  {selectedTabValue !== "Driver" &&
                    selectedTabValue !== "Subscription" && (
                      <div className="grid grid-cols-2 gap-14 justify-between text-[14px] sm:text-[16px]">
                        <span>Doorstep delivery & pickup</span>
                        <div className="relative w-full">
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
                        {showDoorStep && (
                          <div className="fixed bg-[#00000082] left-0 top-0 z-[999] w-full h-full flex items-center justify-center text-[14px] sm:text-[16px]">
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
                    )}

                  <div className="grid grid-cols-2 gap-14 justify-between text-[14px] sm:text-[16px]">
                    <span>GST ({currentPackage?.package1?.gstRate}%)</span>
                    <span>₹{roundPrice(Number(result?.gstAmount))}</span>
                  </div>

                  {tabValue !== "Driver" && (
                    <div className="grid grid-cols-2 gap-14 justify-between text-[14px] sm:text-[16px]">
                      <span>Refundable Deposit</span>
                      <span>
                        ₹
                        {tabValue === "Driver"
                          ? 0
                          : currentPackage?.refundableDeposit}
                      </span>
                    </div>
                  )}

                  {selectedTabValue === "Self-Driving" &&
                    selfDropCities.length !== 0 && (
                      <div className="grid grid-cols-2 gap-14 justify-between text-[14px] sm:text-[16px]">
                        <span>DropOff City Charges</span>
                        <span>₹ {selfDropCities}</span>
                      </div>
                    )}

                  {currentPackage?.gst === "Excluded" && (
                    <div className="grid grid-cols-2 w-full gap-14 py-2 justify-between shadow-custom-inner font-bold text-xl">
                      <span>TOTAL</span>
                      <span className="text-[#ff0000]">
                        ₹ {roundPrice(totalExcludedGSTAmount + Number(selectedPromoCode?.discountApplied || 0))}
                      </span>
                    </div>
                  )}

                  {currentPackage?.gst === "Included" && (
                    <div className="grid grid-cols-2 w-full gap-14 py-2 justify-between shadow-custom-inner font-bold text-xl">
                      <span>TOTAL</span>
                      <span className="text-[#ff0000]">
                        ₹ {roundPrice(totalIncludedGSTAmount + Number(selectedPromoCode?.discountApplied || 0))}
                      </span>
                    </div>
                  )}

                  {(tabValue === "Self-Driving" ||
                    tabValue === "Subscription") && (
                    <div className="grid grid-cols-2 gap-14 justify-between text-[14px] sm:text-[16px]">
                      <span>Fuel</span>
                      <span>{currentPackage?.fuel}</span>
                    </div>
                  )}

                  {(tabValue === "Self-Driving" ||
                    tabValue === "Subscription") && (
                    <div className="grid grid-cols-2 gap-14 justify-between text-[14px] sm:text-[16px]">
                      <span>Extra kms charge</span>
                      <span>₹{currentPackage?.extraKmsCharge}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-14 justify-between text-[14px] sm:text-[16px]">
                    <span>Tolls, Parking & Inner-state taxes</span>
                    <span>{currentPackage?.tollsParkingTaxes}</span>
                  </div>
                </div>

              

                {/* <div className="max-w-sm p-4 border-2 border-[#F1301E] mb-6 rounded-lg shadow-md text-center">
                  <p className="text-sm font-semibold mb-2 text-[#F1301E]">
                    Use coupon codes in the checkout page to get huge discounts
                    after mobile number verification.
                  </p>

                  <div className="bg-gradient-to-r from-[#000] to-[#000000] text-white py-4 px-2 rounded-lg flex items-center justify-center space-x-4">
                    <div className="w-20 h-20 flex items-center rounded-full overflow-hidden">
                      <Image
                        src={"/png/dispcount.png"}
                        alt="discount"
                        width={120}
                        height={120}
                      />
                    </div>
                    <p className="font-semibold">
                      If you do not have a coupon code you can call us directly
                      to get your best available offer.
                    </p>
                  </div>


                  <a
                    href="tel:18001216162"
                    className="font-semibold text-[#F1301E]"
                  >
                    <div className="mt-4 flex items-center justify-center space-x-2 text-red-700">
                      <Image
                        src={"/svg/phone-red.svg"}
                        alt="phone"
                        width={15}
                        height={15}
                      />
                      <p className="font-semibold  text-[#F1301E]">
                        24*7 Customer Support (Toll Free)
                      </p>
                    </div>
                  </a>
                </div> */}

                <div className="mb-4 flex flex-row justify-start gap-1 items-center py-5 text-xs w-full">
                  <Image
                    src={"/tag.png"}
                    alt="discount"
                    width={50}
                    height={50}
                    className="bg-transparent sm:w-[50px] sm:h-[50px] w-[40px] h-[40px]"
                  />
                  {selectedPromoCode ? (
                    <div className="flex flex-row  justify-between w-full mb-5">
                        <span className="font-semibold text-sm flex flex-col ">
                       <span className="mt-6">{selectedPromoCode.code}</span>
                       <span className="text-[#39DA2B]">Success</span>
                      </span>
                      <span
                        // onClick={() => setShowCoupon(!showCoupon)}
                        className="text-[#ff0000]  cursor-pointer ml-2 mt-6 flex flex-col font-semibold text-sm"
                      >
                        <span className="text-[#000]">₹{selectedPromoCode.discountApplied}</span>
                        <span className="text-[#C21515]" 
                        onClick={() => 
                          // e.stopPropagation();
                        { setSelectedPromoCode(null)
                          setShowCoupon(null)
                          document.body.style.overflow = "auto";
                        }}>Remove promocode</span>

                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-row justify-between items-center w-full sm:mb-1 mb-1">
                      <span className="font-semibold text-sm whitespace-nowrap">
                        Have a coupon?
                      </span>
                      <span
                        onClick={() => setShowCoupon(!showCoupon)}
                        className="text-[#ff0000] font-semibold cursor-pointer ml-1 whitespace-nowrap"
                      >
                        Click here to enter your code
                      </span>
                    </div>
                  )}
                </div>

                {(tabValue === "Self-Driving" ||
                  tabValue === "Subscription" ||
                  (tabValue === "Driver" && radioToggle === "Local")) && (
                  <div className="my-6 h-[79px] gap-6 drop-shadow-lg bg-[#FAFAFA] flex flex-row items-center justify-between px-4 w-full max-w-[420px] py-5 rounded-3xl -mt-5">
                    {currentPackage?.gst === "Excluded" && (
                      <div className="flex flex-col">
                        <span className="text-sm md:text-md">Total Amount</span>
                        <span className="text-[#ff0000] p-0 sm:text-2xl font-bold">
                          ₹ {roundPrice(totalExcludedGSTAmount)}
                        </span>
                      </div>
                    )}
                    {currentPackage?.gst === "Included" && (
                      <div className="flex flex-col">
                        <span className="text-sm md:text-md">Total Amount</span>
                        <span className="text-[#ff0000] p-0 sm:text-2xl font-bold">
                          ₹ {roundPrice(totalIncludedGSTAmount )}
                        </span>
                      </div>
                    )}
                    <button
                      onClick={handleProceedTotal}
                      className="bg-gradient-to-r from-[#F1301E] to-[#FA4F2F] text-white font-semibold sm:text-2xl px-6 py-2 rounded-full drop-shadow-lg"
                    >
                      Proceed
                    </button>
                  </div>
                )}

                <div
                  className={`flex flex-row items-center justify-between border-[1.5px] px-4 w-full max-w-[423px] py-2 rounded-3xl border-[#ff0000] cursor-pointer ${
                    tabValue === "Driver" &&
                    radioToggle === "Out-station" &&
                    "mt-4"
                  }`}
                >
                  <div className="flex flex-col items-start">
                    {currentPackage?.gst === "Included" &&
                      selectedTabValue !== "Driver" && (
                        <span className="font-bold text-md">
                          Pay ₹
                          {roundPrice(Number(ThirtyDiscountForInculdedTax)) >=
                          2000
                            ? roundPrice(Number(ThirtyDiscountForInculdedTax))
                            : roundPrice(totalIncludedGSTAmount)}{" "}
                          Now
                        </span>
                      )}
                    {currentPackage?.gst === "Excluded" &&
                      selectedTabValue !== "Driver" && (
                        <span className="font-bold text-md">
                          Pay ₹ {paymentExcludedTax}
                        </span>
                      )}
                    {currentPackage?.gst === "Excluded" &&
                      selectedTabValue === "Driver" && (
                        <span
                          className={`font-bold text-md ${
                            tabValue === "Driver" &&
                            radioToggle === "Out-station" &&
                            "text-2xl"
                          }`}
                        >
                          Pay ₹ {Driver15k}
                        </span>
                      )}
                    {currentPackage?.gst === "Included" &&
                      selectedTabValue === "Driver" && (
                        <span
                          className={`font-bold text-md ${
                            tabValue === "Driver" &&
                            radioToggle === "Out-station" &&
                            "text-2xl"
                          }`}
                        >
                          Pay ₹ {Driver15k}
                        </span>
                      )}
                    {(tabValue === "Self-Driving" ||
                      tabValue === "Subscription" ||
                      (tabValue === "Driver" &&
                        (radioToggle === "One-way" ||
                          radioToggle === "Local"))) && (
                      <span className="text-[#ff0000] font-semibold text-[12px] sm:text-[15px]">
                        ₹
                        {currentPackage?.gst === "Excluded" &&
                        selectedTabValue !== "Driver"
                          ? balance_paymentExculded.toFixed(0)
                          : currentPackage?.gst === "Included" &&
                            selectedTabValue !== "Driver"
                          ? balance_paymentIncluded.toFixed(0)
                          : currentPackage?.gst === "Excluded" &&
                            selectedTabValue === "Driver"
                          ? balance_driverExclude.toFixed(0)
                          : currentPackage?.gst === "Included" &&
                            selectedTabValue === "Driver"
                          ? balance_driverInclude.toFixed(0)
                          : ""}{" "}
                        Balance on Delivery
                      </span>
                    )}
                  </div>
                  <button
                    onClick={handleProceed}
                    className="bg-gradient-to-r from-[#F1301E] to-[#FA4F2F] text-md font-semibold text-white w-[120.31px] h-[42.08px] rounded-full drop-shadow-lg"
                  >
                    Proceed
                  </button>
                </div>
                <div className="flex flex-col gap-2 justify-between text-[14px] sm:text-[16px] w-full mt-6">
                  <span>Notes</span>
                  <span>
                    <textarea
                      name=""
                      id=""
                      value={bookingNote}
                      onChange={(e) => setBookingNote(e.target.value)}
                      className="w-full rounded-md outline-none text-[#000000] font-normal text-sm p-2"
                    ></textarea>
                  </span>
                </div>
              </main>
            </div>
            <div className="max-w-[1250px] w-full m-auto sm:mt-20 block sm:hidden">
              <h2 className="sm:text-4xl text-2xl sm:mt-0 mt-0 font-semibold text-center">
                Trending <span className="text-primary"> offers</span>
              </h2>
              <div className="w-fit flex justify-start m-auto text-md font-semibold sm:mt-6 sm:mb-6 mt-6  mb-0">
                <div
                  className={`sm:py-4 py-2 sm:px-8 px-4 sm:text-md text-xs ${
                    offer === "Daily Offers" ? "bg-primary-color" : "bg-black"
                  } text-white rounded-l-full cursor-pointer`}
                  onClick={() => setOffer("Daily Offers")}
                >
                  Daily Offers
                </div>
                <div
                  className={`sm:py-4 py-2 sm:px-8 px-4 sm:text-md text-xs ${
                    offer === "Daily Offers" ? "bg-black" : "bg-primary-color"
                  } text-white rounded-r-full cursor-pointer`}
                  onClick={() => setOffer("Monthly Offers")}
                >
                  Monthly Offers
                </div>
              </div>

              {offer === "Daily Offers" && (
                <div className=" sm:mt-0 mt-4  offerCards">
                  {" "}
                  <OfferCards
                    isDetails={true}
                    banners={cms?.trendingOffer}
                    dailyOffer
                  />{" "}
                </div>
              )}
              {offer === "Monthly Offers" && (
                <div className=" sm:mt-0 mt-4 offerCards">
                  <OfferCards
                    isDetails={true}
                    banners={cms?.trendingOffer}
                    monthlyOffer
                  />
                </div>
              )}
            </div>
            {/* <h1 className="text-[#ff0000] font-semibold text-[15px]">{message}</h1> */}
            <div className="p-6 sm:px-4 bg-white rounded-lg ">
              <div className="flex gap-4 items-start w-[350px] sm:w-[420px] text-justify">
                <Image
                  src="/clock.png"
                  alt="Clock Icon"
                  width={30}
                  height={30}
                  className="mt-1"
                />
                <ul className="flex flex-col gap-3 text-left text-gray-800 font-medium text-[15px] leading-relaxed">
                  <li className="flex items-center gap-2 text-[#6CAE39]">
                    <span className="text-[#6CAE39] font-bold">•</span>
                    100% refund before 48 hours
                  </li>
                  <li className="flex items-center gap-2 text-[#6CAE39]">
                    <span className="text-[#6CAE39] font-bold">•</span>
                    50% refund before 24 hours
                  </li>
                  <li className="flex items-start gap-2 text-[#6CAE39]">
                    <span className="text-[#6CAE39] font-bold">•</span>
                    Cancellation after the above date will have to bear
                    additional INR 2000 as convenience fees.
                  </li>
                  <li className="flex items-start gap-2 text-[#6CAE39]">
                    <span className="text-[#6CAE39] font-bold">•</span>
                    Any cancellations after the booking date will only get the
                    security deposit amount and not the rental fare received.
                  </li>
                </ul>
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
