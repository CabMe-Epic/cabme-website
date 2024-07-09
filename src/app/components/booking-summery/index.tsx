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
import useVehicleById from "../../../../networkRequests/hooks/useVehicleById";
import React, { useCallback, useState } from "react";
import { searchVehicle } from "../../../../networkRequests/hooks/api";
import { useRouter } from 'next/navigation'
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useReservationDateTime from "../../../../networkRequests/hooks/useReservationDateTime";
import { extractDaysAndHours } from "@/app/utils/extractDaysAndHours";
import { calculatePrice } from "@/app/utils/calculatePrice ";
import { fetchPromoCodes } from "../../../../networkRequests/hooks/promocodes";

const BookingSummery = () => {
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
    console.log(pickupTime, dropoffTime, "lkkk");

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
        <div>  <main className="max-w-[511px] px-4 shadow-custom-shadow flex flex-col items-center bg-[#FAFAFA] py-10 my-6 rounded-md">
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
        </main></div>
    )
}

export default BookingSummery;