import Image from "next/image";
import ThemeButton from "../theme-button/theme-button";

interface couponProp{
    onClick?:any
}
const ApplyCoupon = ({onClick}:couponProp) => {
  return (
    <div className="fixed w-screen h-screen top-0 backdrop-blur-md left-0 flex items-center justify-center">
      <div className="bg-white border rounded-xl w-fit overflow-hidden max-w-[400px] w-full relative">
        <p className="py-2 px-4 bg-primary-color text-white font-semibold tracking-wide">
          Apply Coupon
        </p>
        <div className="p-4">
          <h3 className="text-lg mb-2">Top Coupon</h3>
          <div className="bg-[#FAFAFA] p-4 rounded-md">
            <div>
              <input type="radio" name="discount" id="ten" className="accent-[#FF0000]" />
              <label htmlFor="ten" className="font-[400] text-[#B8B8B8] ml-2">Extra 10</label>
            </div>
            <div>
              <input type="radio" name="discount" id="twenty" className="accent-[#FF0000]" />
              <label htmlFor="twenty" className="font-[400] text-[#B8B8B8] ml-2">Extra 20</label>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <ThemeButton text="Apply" className="text-xs tracking-wide" />
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
