import React, { useCallback, useState } from "react";
import Image from "next/image";
import ThemeButton from "../theme-button/theme-button";
import axios from "axios";

interface CouponProp {
  setHide?: () => void; // Changed type to void since it's used as a function call
  onClick?: () => void;
  promoCodes?: { code: string }[];
  setSelectedPromoCode?: any;
  handleChangePromocodeOption?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  totalAmount: number;
  vehicleId: string;
  userIdPromo: string;
  paymentMode: string;
  discountApplyAmount: any;
  appliedCode: any;
  fromDate: any;
  toDate: any;
  // discountType: any;
}

const ApplyCoupon = ({
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
  toDate
  // discountType
}: CouponProp) => {
  const [code, setCode] = useState<string>("");
  const [errMsg, setErrMsg] = useState<string>("");
  const [gotAmount, setGotAmount] = useState("");

  console.log(paymentMode, "paymentMode")

  // alert(`${toDate} ${fromDate}`)

  const payload = {
    couponCode: code,
    userId: userIdPromo,
    totalAmount: totalAmount,
    vehicleId: vehicleId,
    paymentmode: paymentMode,
    toDate: toDate,
    fromDate: fromDate

  };

  const handleApply = useCallback(async (e: any) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_URI_BASE}/cabme/apply-promocode`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(res, "Response from apply-promocode");
      setGotAmount(res?.data.promocode.discountApplied);
      discountApplyAmount(res?.data.promocode.discountApplied);
      appliedCode(res?.data.promocode.code)
      setSelectedPromoCode(res?.data.promocode);

      alert("Coupon applied successfully!");

      if (setHide) {
        setHide();
      }
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || "Failed to apply coupon";
      setErrMsg(errorMessage);
      console.error("Error applying coupon:", errorMessage);
    }
  }, [code, totalAmount, vehicleId, userIdPromo, paymentMode, setHide]);

  console.log(gotAmount, "gotAmount")

  return (
    <div className="fixed w-screen h-screen top-0 backdrop-blur-md left-0 flex items-center justify-center z-[9]">
      <div className="bg-white border rounded-xl w-fit overflow-hidden  w-[350px] md:max-w-[500px] md:w-[500px] relative">
        <p className="py-2 px-4 bg-primary-color text-white font-semibold tracking-wide">
          Apply Coupon
        </p>
        <div className="p-4">
          <h3 className="text-lg mb-2">Top Coupon</h3>
          <div className="bg-[#FAFAFA] p-4 rounded-md">
            <div>
              <input
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                type="text"
                className="border rounded-sm w-full py-1 pl-2 outline-0"
                placeholder="Enter coupon code"
              />
            </div>
            {errMsg && <span className="text-red-500 text-xs">This coupon is invalid. Please contact support <a className="underline" href="tel:1800 121 6162">1800 121 6162</a></span>}
          </div>
          <div className="flex justify-end mt-4">
            <ThemeButton onClick={(e: any) => handleApply(e)} text="Apply" className="text-xs tracking-wide" />
          </div>
        </div>
        <div className="w-fit absolute top-3 right-2 cursor-pointer" onClick={onClick}>
          <Image src="/svg/cross-white.svg" alt="cross" width={18} height={18} />
        </div>
      </div>
    </div>
  );
};

export default ApplyCoupon;
