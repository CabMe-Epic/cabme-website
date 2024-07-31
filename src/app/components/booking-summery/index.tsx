"use client";
import Image from "next/image";

import { useParams } from "next/navigation";
import useVehicleById from "../../../../networkRequests/hooks/useVehicleById";
import React, { useCallback, useEffect, useState } from "react";
import { searchVehicle } from "../../../../networkRequests/hooks/api";
import { useRouter } from 'next/navigation'
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useReservationDateTime from "../../../../networkRequests/hooks/useReservationDateTime";
import { extractDaysAndHours } from "@/app/utils/extractDaysAndHours";
import { calculatePrice } from "@/app/utils/calculatePrice ";
import { fetchPromoCodes } from "../../../../networkRequests/hooks/promocodes";
import ApplyCoupon from "../ApplyCoupon/apply-coupon";

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

const BookingSummery = () => {
    const router = useRouter();
    const { slug } = useParams();
    const [token, setToken] = useState<string | null>(null);

    const [userId, setUserId] = useState<string | null>(null);
    const [carDetails, setCarDetails] = useState<any>();
    const [bookingOpt, setBookingOpt] = useState<any>();
    const [currentPackage, setCurrentPackage] = useState<any>();
    const [pickupTime, setPickupTime] = useState<string | null>(null);
    const [pickupDate, setPickupDate] = useState<any>();
    const [packagePrice, setPackagePrice] = useState<any>();
    const [discountAmount, setDiscountAmount] = useState<number>(0);
    const [promoCodes, setPromoCodes] = useState([]);

    const [dropoffTime, setDropoffTime] = useState<string | null>(null);
    const [dropoffDate, setDropoffDate] = useState<any>();
    const [selectedPromocodeOption, setSelectedPromocodeOption] = useState<string | any>();
    const [selectedDiscountType, setSelectedDiscountType] = useState<string | any>();

    const [discountAppliedAmount, setDiscountAppliedAmount] = useState<number>(0);

    const handleChangePromocodeOption = (e: any) => {
        setSelectedPromocodeOption(e.target.value)
    }
    const [sessionSlug, setFromSessionSlug] = useState('');
    const [selectedTabValue, setSelectedTabValue] = useState<string | null>(null);
    const [bookingSuccess, setBookingSuccess] = useState(false);

    const [applyCoupon, setApplyCoupon] = React.useState(false);
    const { vehicle, loading, error } = useVehicleById(slug as string);
    const { reservationDateTime, setReservationDateTime, duration } = useReservationDateTime();
    const total = Number(packagePrice) + (currentPackage?.DoorstepDeliveryPickup?.reduce((acc: any, item: any) => acc + item?.price, 0)) + (currentPackage?.refundableDeposit);
    const pickupDateTimeString = pickupTime ? `${pickupDate}T${pickupTime}:00.000Z` : null;
    const droppingDateTimeString = dropoffTime ? `${dropoffDate}T${dropoffTime}:00.000Z` : null;
    const { days, hours } = extractDaysAndHours(duration)
    const totalPrice = calculatePrice(Number(days), Number(hours), Number(total))

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

    const handleApplyPromoCode = () => {
        if (selectedPromocodeOption) {
            const selectedPromoCode = promoCodes.find((code: PromoCode) => code.code === selectedPromocodeOption) as PromoCode | undefined;
            // console.log({ selectedPromoCode });
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

    const getCarDetails = useCallback(async () => {
        const getSearchCarData = await searchVehicle();
        const carData = getSearchCarData?.data?.vehicles;
        carData?.forEach((item: any) => {
            if (item?._id === sessionSlug) {
                setCarDetails(item);
            }
        });
    }, [sessionSlug]);

    useEffect(() => {
        getCarDetails();
    }, [getCarDetails]);

    useEffect(() => {
        if (carDetails?.bookingOptions?.selfDrive?.name === bookingOpt) {
            setCurrentPackage(carDetails?.bookingOptions?.selfDrive?.packageType?.package1.price);
        }
    }, [carDetails, bookingOpt]);

    // console.log(sessionSlug, "sessionSlug")


    async function handleBooking() {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_URI_BASE}/cabme/booking`, bookingData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            // console.log('Booking response:', { response });
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

    const handlePriceChange = (updatedPrice: any) => {
        localStorage.setItem("selectedPackagePrice", updatedPrice);
        setPackagePrice(updatedPrice)
    }

    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedUserId = localStorage.getItem('userId');
            const storedToken = localStorage.getItem('token');
            setUserId(storedUserId);
            setToken(storedToken);
        }
    }, []);

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

    useEffect(() => {
        // Retrieve slug from session storage
        const storedSlug = sessionStorage.getItem('slug');
        if (storedSlug) {
            setFromSessionSlug(storedSlug);
        }
    }, []);

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

    // console.log(carDetails, "carDetails")
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

    return (
        <div>
            <main className=" px-4 shadow-custom-shadow flex flex-col items-center bg-[#FAFAFA] py-10 my-6 rounded-md">
                <div className="max-w-[376px] w-full h-[50px] bg-black text-white font-semibold text-[20px] flex justify-center items-center rounded-xl">
                    <span className="text-center tracking-wide sm:text-md text-[18px]">Booking Summary</span>
                </div>
                {/* <div className="my-5 flex justify-between w-full sm:px-4">
                    <span className="font-bold sm:text-lg">Fare Details</span>
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
                </div> */}
                <div className="grid grid-cols-1 items-start justify-center gap-4 mt-4 font-semibold">
                    <div className="grid grid-cols-2 gap-14  justify-center">
                        <span className="w-[220px] sm:ml-4 sm:text-[16px] text-sm">Base Fare</span>
                        <span className="sm:text-[16px] text-sm w-fit word-wrap sm:ml-10 w-fit">
                            ₹{packagePrice} * {days} Days and {hours} Hours
                        </span>
                    </div>

                    <div className="grid grid-cols-2 gap-14  justify-center">
                        <span className=" w-fit word-wrap sm:ml-4 sm:text-[16px] text-sm">
                            Doorstep delivery & pickup
                        </span>
                        <span className=" w-fit word-wrap sm:ml-10">₹ {currentPackage?.DoorstepDeliveryPickup?.reduce((acc: any, item: any) => acc + item?.price, 0)}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-14  justify-center">
                        <span className=" w-fit word-wrap sm:ml-4 sm:text-[16px] text-sm">Insurance & GST</span>
                        <span className=" w-fit word-wrap sm:ml-10">{carDetails?.extraService?.insurance}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-14  justify-center">
                        <span className=" w-fit word-wrap sm:ml-4 sm:text-[16px] text-sm">Refundable Deposit</span>
                        <span className=" w-fit word-wrap sm:ml-10">₹ {currentPackage?.refundableDeposit}</span>
                    </div>

                    {/* DESKTOP ...  */}
                    {discountAmount > 0 ? (
                        <div className="grid grid-cols-2 w-fit gap-14 py-2 justify-center shadow-custom-inner font-bold text-xl w-full">
                            <span className=" w-fit word-wrap ml-4">TOTAL</span>
                            <span className=" w-fit word-wrap ml-10 text-[#ff0000]">
                                ₹ {totalPrice.toFixed(2)}
                            </span>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 w-fit sm:gap-14 py-2 justify-center shadow-custom-inner font-bold text-xl w-full">
                            <span className=" w-fit word-wrap sm:ml-4 ml-2">TOTAL</span>
                            <span className=" w-fit word-wrap sm:ml-10 text-[#ff0000]">
                                ₹ {totalPrice.toFixed(2)}
                            </span>
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-14  justify-center">
                        <span className="sm:text-[16px] text-sm w-fit word-wrap sm:ml-4">Kms Limit</span>
                        <span className="sm:text-[16px] text-sm w-fit word-wrap sm:ml-10">₹ {currentPackage?.kmsLimit !== "" ? currentPackage?.kmsLimit : "0"} kms</span>
                    </div>

                    <div className="grid grid-cols-2 gap-14  justify-center">
                        <span className="sm:text-[16px] text-sm w-fit word-wrap sm:ml-4">Fuel</span>
                        <span className="sm:text-[16px] text-sm w-fit word-wrap sm:ml-10">{currentPackage?.fuel}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-14  justify-center">
                        <span className="sm:text-[16px] text-sm w-fit word-wrap sm:ml-4">Extra kms charge</span>
                        <span className="sm:text-[16px] text-sm w-fit word-wrap sm:ml-10">₹ {currentPackage?.extraKmsCharge}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-14  justify-center">
                        <span className="sm:text-[16px] text-sm w-fit word-wrap sm:ml-4">
                            Tolls,Parking & Inner-state taxes
                        </span>
                        <span className="sm:text-[16px] text-sm w-fit word-wrap sm:ml-10">{currentPackage?.tollsParkingTaxes}</span>
                    </div>
                </div>
                <div className="w-full">
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
                    {/* <div className="my-6 sm:h-[79px] h-[52px] drop-shadow-lg bg-[#E7E7E7] flex flex-row items-center justify-between px-4  w-full py-5 rounded-3xl"> */}
                    {/* {discountAmount > 0 ? (
                            <div className="flex flex-col">
                                <span>Total Amount </span>
                                <span className="text-[#ff0000] p-0 text-2xl font-bold">
                                    ₹ {discountAmount.toFixed(2)}
                                </span>
                            </div>
                        ) : (
                            <div className="flex flex-col">
                                <span className="sm:text-[16px] text-[12px]">Total Amount</span>
                                <span className="text-[#ff0000] p-0 sm:text-2xl font-bold">
                                    ₹ {totalPrice.toFixed(2)}
                                </span>
                            </div>
                        )} */}

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

                        {/* <>
                                {userId && token ? (
                                    bookingSuccess ? (
                                        <button
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
                                        onClick={() => router.push("/check-out")}
                                        className="bg-gradient-to-r from-[#F1301E] to-[#FA4F2F] sm:text-xl font-semibold text-white sm:w-[158.31px] w-[100px] sm:h-[48.08px] h-[36px] rounded-full drop-shadow-lg">
                                        Proceed
                                    </button>
                                )}
                            </> */}
                    </div>
                    {/* </div> */}
                </div>
                <div className="w-full">
                    <span className="flex flex-row my-5 mt-2">
                        <div>
                            <Image
                                src="/png/offer.png"
                                width={20}
                                height={20}
                                alt="offer"
                            />
                        </div>
                        <div className="flex gap-2 ml-2 items-center">
                            <h3 className="font-semibold text-sm">Have a coupon?</h3>
                            <h4 className="font-semibold text-xs text-primary cursor-pointer" onClick={() => setApplyCoupon(true)}>Click here to enter your code</h4>
                        </div>
                        {/* <select
                            name="offer"
                            id="offer"
                            className="border-0 outline-0 bg-transparent max-w-[405px] text-sm"
                        >
                            <option value="View all promo coupons">
                                View all promo coupons
                            </option>
                        </select> */}
                    </span>

                    {/* <div className="max-w-[418px]  h-[45px] flex flex-row justify-center border-[1.5px] border-[#ff0000] rounded item-center bg-white px-4">
                        <input
                            type="text"
                            placeholder="DJF4D4F"
                            className="w-full border-0 outline-none pr-4 text-[#888787]"
                        />
                        <button className="text-[#ff0000]">Apply</button>
                    </div> */}

                    <div className="my-6 h-[69px] drop-shadow-lg bg-[#E7E7E7] flex flex-row items-center justify-between px-4 py-5 rounded-3xl">
                        <div className="flex justify-between flex-row items-center sm:gap-4 gap-2 w-full sm:px-4">
                            <span className="sm:text-2xl font-bold">Total Amount</span>
                            <span>:</span>
                            <span className="text-[#ff0000] p-0 sm:text-2xl font-bold">
                                ₹ 15,000
                            </span>
                        </div>
                        <div>
                            {/* <button className="bg-gradient-to-r from-[#F1301E] to-[#FA4F2F] text-xl font-semibold text-white px-6 py-2 rounded-full drop-shadow-lg">
                                Proceed
                            </button> */}
                        </div>
                    </div>
                </div>
                {/* <div className="flex flex-col items-center border-[1.5px] max-w-[423px] w-full py-2 rounded-3xl border-[#ff0000] cursor-pointer">
                    <span className="font-bold text-md">Pay ₹10,000 Now</span>
                    <span className="text-[#ff0000] font-semibold text-[15px]">
                        Balance on Delivery
                    </span>
                </div> */}
            </main>
            {applyCoupon &&

                <ApplyCoupon onClick={() => setApplyCoupon(false)} />
            }
        </div>
    )
}

export default BookingSummery;