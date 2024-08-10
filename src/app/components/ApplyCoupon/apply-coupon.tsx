import React, { useState } from "react";
import Image from "next/image";
import ThemeButton from "../theme-button/theme-button";

interface CouponProp {
  hide?: any;
  onClick?:any;
  promoCodes?: any[];
  setSelectedPromoCode?:any
  handleChangePromocodeOption?: (e: any) => void;
}

const ApplyCoupon = ({ hide,onClick, promoCodes = [],  setSelectedPromoCode }: CouponProp) => { 
 


  const handleRadioChange = React.useCallback((item:any) => {
    setSelectedPromoCode(item);
  }, [setSelectedPromoCode]);
// console.log(selectedPromoCode,"promo code value");
  return (
    <div className="fixed w-screen h-screen top-0 backdrop-blur-md left-0 flex items-center justify-center">
      <div className="bg-white border rounded-xl w-fit overflow-hidden max-w-[400px] w-full relative">
        <p className="py-2 px-4 bg-primary-color text-white font-semibold tracking-wide">
          Apply Coupon
        </p>
        <div className="p-4">
          <h3 className="text-lg mb-2">Top Coupon</h3>
          <div className="bg-[#FAFAFA] p-4 rounded-md">
            

            {promoCodes?.map((item , index)=>{
              console.log({promoCodes},"lelo promo");
              return(
                <div key={index}>
                <input
                  type="radio"
                  name="promoCode"
                  id={item.code}
                  value={item.code}
                  // checked={selectedPromoCode == item?.code}
                  onChange={()=>handleRadioChange(item)}
                  className="accent-[#FF0000]"

                />
                <label htmlFor={item.code} className="font-[400] text-[#B8B8B8] ml-2">
                  {item.code}
                </label>
              </div>
              )
            })}
          </div>
          <div className="flex justify-end mt-4">
            <ThemeButton onClick={hide} text="Apply" className="text-xs tracking-wide" />
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
