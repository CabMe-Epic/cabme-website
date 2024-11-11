import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import ThemeButton from "../theme-button/theme-button";
import axios from "axios";
import OfferCardsDetails from "../OfferCardDetails";
import { useDispatch } from "react-redux";
import { setSelectedPromoCodeRedux } from "../../../../redux/slices/locationSlice";

interface CouponProp {
  setHide?: () => void;
  onClick?: () => void;
  promoCodes?: { code: string }[];
  setSelectedPromoCode?: (code: any) => void;
  totalAmount: number;
  vehicleId: string;
  userIdPromo: string;
  paymentMode: string;
  discountApplyAmount: (amount: number) => void;
  appliedCode: (code: string) => void;
  fromDate: string;
  toDate: string;
}

const ApplyCoupon: React.FC<CouponProp> = ({
  setHide,
  onClick,
  promoCodes = [],
  setSelectedPromoCode,
  totalAmount,
  vehicleId,
  userIdPromo,
  paymentMode,
  discountApplyAmount,
  appliedCode,
  fromDate,
  toDate,
}) => {
  const [code, setCode] = useState<string>("");
  const [errMsg, setErrMsg] = useState<string>("");
  const [gotAmount, setGotAmount] = useState<number | null>(null);
  const [cms, setCms] = useState<any>();
  const [offer, setOffer] = useState<string>("Daily Offers");

  const dispatch = useDispatch();

  const handleApply = useCallback(async () => {
    setErrMsg("");
    setSelectedPromoCode?.(null);
    dispatch(setSelectedPromoCodeRedux(null));

    if (!code) return;

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_URI_BASE}/cabme/apply-promocode`,
        {
          couponCode: code,
          totalAmount,
          vehicleId,
          paymentmode: paymentMode || "fullPayment",
          toDate,
          fromDate,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      const discountAmount = res.data.promocode.discountApplied;
      setGotAmount(discountAmount);
      discountApplyAmount(discountAmount);
      appliedCode(res.data.promocode.code);

      setSelectedPromoCode?.(res.data.promocode);
      dispatch(setSelectedPromoCodeRedux(res.data.promocode));

      alert("Coupon applied successfully!");
      setCode("");
      setHide(false);
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || "Failed to apply coupon";
      setErrMsg(errorMessage);
      setCode("");
      console.error("Error applying coupon:", errorMessage);
    }
  }, [
    code,
    totalAmount,
    vehicleId,
    paymentMode,
    toDate,
    fromDate,
    setSelectedPromoCode,
    dispatch,
    discountApplyAmount,
    appliedCode,
    setHide,
  ]);

  const handleCopy = (couponCode: string) => {
    setCode(couponCode);
  };
  

  useEffect(() => {
    if (code) {
      handleApply();
    }
  }, [code]);
  

  useEffect(() => {
    const fetchCMSData = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_URI_BASE}/cabme/homepage`
        );
        setCms(res.data);
      } catch (error) {
        console.error("Error fetching homepage CMS:", error);
      }
    };
    fetchCMSData();
  }, []);

  return (
    <div className="fixed w-screen h-screen top-0 backdrop-brightness-50 left-0 flex items-center justify-center z-[9]">
      <div className="bg-white border rounded-xl min-w-fit overflow-hidden w-[350px] sm:w-[750px] sm:min-h-[500px] md:max-w-[800px] md:w-[750px] relative">
        <div className="p-4">
          <h3 className="text-lg mb-2 font-[600] tracking-wide">Coupons</h3>
          <h5 className="text-[#7B7B7B] text-[16px] mb-3">
            Have a Coupon Code?
          </h5>
          <div className="bg-[#F3F3F3] p-2 relative rounded-md">
            <div className="flex flex-row items-center">
              <input
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                type="text"
                className="bg-[#F3F3F3] rounded-sm w-full py-1 pl-2 outline-0 text-[16px] placeholder:text-[#000000] text-[#000000]"
                placeholder="Enter coupon code"
              />
              <ThemeButton
                onClick={handleApply}
                text="Apply"
                className="text-xs tracking-wide !p-3 !px-8 !font-bold"
              />
            </div>
            {errMsg && (
              <span className="text-red-500 text-xs ml-2">
                {errMsg} Contact support at{" "}
                <a className="underline" href="tel:1800 121 6162">
                  1800 121 6162
                </a>
              </span>
            )}
          </div>
          <div className="max-w-[850px] w-fit m-auto h-[450px] overflow-auto">
            {offer === "Daily Offers" && (
              <OfferCardsDetails
                banners={cms?.trendingOffer}
                getCode={handleCopy}
                dailyOffer
              />
            )}
            {offer === "Monthly Offers" && (
              <OfferCardsDetails
                getCode={handleCopy}
                banners={cms?.trendingOffer}
                monthlyOffer
              />
            )}
          </div>
        </div>
        <div
          className="w-fit absolute top-3 right-2 cursor-pointer p-1 bg-black rounded-full"
          onClick={onClick}
        >
          <Image
            src="/svg/cross-white.svg"
            alt="cross"
            width={18}
            height={18}
          />
        </div>
      </div>
    </div>
  );
};

export default ApplyCoupon;
