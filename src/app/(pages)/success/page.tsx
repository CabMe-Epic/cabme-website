"use client";
import BlinkerLoader from "@/app/components/blinker-loader/blinkerLoader";
import axios from "axios";
import Image from "next/image";
import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const Success = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any | null>(null);
  const [bookingId, setBookingId] = useState("");
  const searchParams = useSearchParams();

  useEffect(() => {
    const bookingid = searchParams.get("bookingid");
    if (bookingid) {
      setBookingId(bookingid);
    }
  }, [searchParams]);

  useEffect(() => {
    const getBooking = async () => {
      if (!bookingId) return;
      setLoading(true);
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_URI_BASE}/cabme/user/booking/${bookingId}`
        );
        setData(res.data);
      } catch (err) {
        console.error("Error fetching booking:", err);
      } finally {
        setLoading(false);
      }
    };

    getBooking();
  }, [bookingId]);

  if (loading) return <BlinkerLoader />;

  function Search() {
    const searchParams = useSearchParams()

    return <div className="flex flex-col  m-5 sm:m-10 h-auto text-center">
      <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-start mx-auto">
        <Image
          src="/true.svg"
          alt="Success Icon"
          className="w-8 sm:w-10"
          width={100}
          height={100}
        />

        <div className="flex flex-col items-center sm:items-start gap-6 sm:!w-[150%]">
          <h1 className="font-bold sm:text-left text-lg sm:text-2xl">
            Thank you for your order, {data?.booking?.userId?.fullName || "Customer"}
          </h1>
          <p className="sm:text-left">
            A confirmation email will be sent to you at{" "}
            {data?.booking?.userId?.email || "your email"} with your complete order details.
          </p>
          <span className="bg-[#B5E6EA] px-4 py-2 rounded-3xl font-bold">
            Booking ID: {bookingId}
          </span>

          <div className="flex flex-col sm:flex-row gap-7  w-[100%]">
            <div className="bg-[#F3F3F3] p-5 sm:p-10 rounded-lg sm:w-full md:!w-[70%]">
              <div className="flex flex-col justify-between sm:flex-row items-center sm:items-start gap-2">
                <span className="text-xl text-left whitespace-nowrap">
                  Please login to complete your KYC
                </span>
                <a
                  className="bg-[#ff0000] ml-2 rounded-lg text-white px-4 w-1/3 py-2"
                  href="https://admin.cabme.in/auth/customer-login"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Login
                </a>
              </div>

              <div className="flex justify-center mt-4 sm:mt-0 sm:justify-start mb-5">
                <span className="text-xl">Booking Details</span>
              </div>

              {[
                {
                  label: "Car Name",
                  value:
                    `${data?.booking?.vehicleId?.carName || ""} ${data?.booking?.vehicleId?.brandName || ""}`,
                },
                {
                  label: "Booking Type",
                  value: data?.booking?.bookingStatus?.selfDrive
                    ? "Self Driving"
                    : data?.booking?.bookingStatus?.withDriver
                      ? "With Driver"
                      : data?.booking?.bookingStatus?.subscription
                        ? "Subscription"
                        : "",
                },
                { label: "Start City", value: data?.booking?.location || "N/A" },
                {
                  label: "Destination City",
                  value: data?.booking?.toCity || "N/A",
                },
                {
                  label: "Booking Duration",
                  value: data?.booking?.bookingDuration || "N/A",
                },
              ].map((detail, index) => (
                <div
                  key={index}
                  className="grid grid-cols-[auto_45%_auto] sm:grid-cols-[0%_35%_auto] w-full items-center justify-start text-left gap-2 !text-md sm:text-lg sm:gap-10"
                >
                  <span className="w-[5px] h-[5px] bg-[#ff0000] p-1 rounded-full"></span>
                  <span className="sm:text-lg">{detail.label}:</span>
                  <span className="sm:text-lg">{detail.value}</span>
                </div>
              ))}
            </div>

            <div className="bg-[#F3F3F3] p-5 sm:p-10 rounded-lg flex flex-col items-start gap-3 w-full sm:w-full !max-w-[500px]">
              <span className="font-bold">Price Summary</span>
              {[
                {
                  label: "Total Booking Amount",
                  value: `₹${data?.booking?.totalAmount || 0}/-`,
                  isBold: true,
                },
                {
                  label: "Total Amount Paid",
                  value: `₹${data?.booking?.partialPayments?.reduce(
                    (acc: any, payment: any) => acc + payment.amount,
                    0
                  ) || 0}/-`,
                  isBold: true,
                  textColor: "text-green-600",
                },
                {
                  label: "Pending Amount",
                  value: `₹${(data?.booking?.totalAmount || 0) -
                    (data?.booking?.partialPayments?.reduce(
                      (acc: any, payment: any) => acc + payment.amount,
                      0
                    ) || 0)}/-`,
                  isBold: true,
                  textColor: "text-red-600",
                },
              ].map((summary, index) => (
                <div
                  key={index}
                  className="flex flex-row gap-4 justify-between w-full"
                >
                  <span>{summary.label}</span>
                  <span className={`${summary.textColor || ""} font-bold`}>
                    {summary.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  }

  return (
    <Suspense>
      <Search />
    </Suspense>
  );
};

export default Success;
