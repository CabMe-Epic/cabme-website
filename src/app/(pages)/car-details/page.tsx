import ProductSlider from "@/app/components/product-slider/product-slider";
import Specifications from "@/app/components/specifications/specifications";
import BookingDetailsCard from "@/app/components/booking-details-card/booking-details-card";
import Image from "next/image";
import CarFeatures from "@/app/components/car-features/car-features";
import ExtraCharges from "@/app/components/extra-charges/extra-charges";
import DescCar from "@/app/components/desc-car/desc-car";
import Video from "@/app/components/video/video";
import FleetsSlider from "@/app/components/slider/slider-components";

const CarDetails = () => {
  return (
    <>
      <div className="py-6">
        <div className="sm:flex hidden px-16 text-[#5F5D5D]">
          <span className="cursor-pointer">Home</span>/
          <span className="cursor-pointer">Listing</span>/
          <span className="cursor-pointer">Car Details</span>
        </div>
        <div className="max-w-[1250px] m-auto my-12 grid grid-cols-[60%_40%] gap-6">
          <div>
            <ProductSlider />
            <div className="my-12">
              <Specifications />
            </div>
            <div className="my-12">
              <CarFeatures />
            </div>
          </div>
          {/*  */}
          <div >
            <div>
              <BookingDetailsCard />
            </div>
            {/* booking summary */}
            <div>

              <main className="w-[511px] flex flex-col items-center bg-[#FAFAFA] py-10 my-6 rounded-md">
                <div className='w-[376px] h-[50px] bg-black text-white font-bold text-[20px] flex justify-center items-center rounded-xl'>
                  <span className="text-center">Booking Summary</span>
                </div>
                <div className="m-auto my-5">
                  <span className="font-bold text-[24px]">
                    Fare Details
                  </span>
                </div>
                <div className="grid grid-cols-1 items-start justify-center gap-4 font-semibold">
                  <div className="grid grid-cols-2 gap-14  justify-center">
                    <span className="w-[220px] ml-10">Base Fare</span>
                    <span className="w-[220px] ml-10">₹ 5,229</span>
                  </div>

                  <div className="grid grid-cols-2 gap-14  justify-center">
                    <span className="w-[220px] ml-10">Doorstep delivery & pickup</span>
                    <span className="w-[220px] ml-10">₹ 500</span>
                  </div>

                  <div className="grid grid-cols-2 gap-14  justify-center">
                    <span className="w-[220px] ml-10">Insurance & GST</span>
                    <span className="w-[220px] ml-10">Included</span>
                  </div>

                  <div className="grid grid-cols-2 gap-14  justify-center">
                    <span className="w-[220px] ml-10">Refundable Deposit</span>
                    <span className="w-[220px] ml-10">₹ 3000</span>
                  </div>

                  <div className="grid grid-cols-2 w-fit gap-14 py-2 justify-center shadow-custom-inner font-bold text-xl">
                    <span className="w-[220px] ml-10">TOTAL</span>
                    <span className="w-[220px] ml-10 text-[#ff0000]">₹ 7686</span>
                  </div>

                  <div className="grid grid-cols-2 gap-14  justify-center">
                    <span className="w-[220px] ml-10">Kms Limit</span>
                    <span className="w-[220px] ml-10">₹ 506 kms</span>
                  </div>

                  <div className="grid grid-cols-2 gap-14  justify-center">
                    <span className="w-[220px] ml-10">Fuel</span>
                    <span className="w-[220px] ml-10">Excluded</span>
                  </div>

                  <div className="grid grid-cols-2 gap-14  justify-center">
                    <span className="w-[220px] ml-10">Extra kms charge</span>
                    <span className="w-[220px] ml-10">₹ 7/km</span>
                  </div>

                  <div className="grid grid-cols-2 gap-14  justify-center">
                    <span className="w-[220px] ml-10">Tolls,Parking & Inner-state taxes</span>
                    <span className="w-[220px] ml-10">To be paid by you</span>
                  </div>
                </div>
                <div>

                  <span className="flex flex-row my-5 mt-10">
                    <Image src="/png/offer.png" width={20} height={20} alt="offer" />
                    <select name="offer" id="offer" className="border-0 outline-0 bg-transparent w-[405px]">
                      <option value="View all promo coupons">View all promo coupons</option>
                    </select>
                  </span>

                  <div className="w-[418px]  h-[53px] flex flex-row justify-center border-[1.5px] border-[#ff0000] rounded item-center bg-white px-4">
                    <input type="text" placeholder="DJF4D4F" className="w-full border-0 outline-none pr-4 text-[#888787]" />
                    <button className="text-[#ff0000]">Apply</button>
                  </div>

                  <div className="my-6 h-[79px] drop-shadow-lg bg-[#E7E7E7] flex flex-row items-center justify-between px-4 py-5 rounded-3xl">
                    <div className="flex flex-col">
                      <span>Total Amount</span>
                      <span className="text-[#ff0000] p-0 text-2xl font-bold">₹ 15,000</span>
                    </div>
                    <div>
                      <button className="bg-gradient-to-r from-[#F1301E] to-[#FA4F2F] text-2xl font-semibold text-white w-[178.31px] h-[53.08px] rounded-full drop-shadow-lg">Proceed</button>
                    </div>

                  </div>

                </div>
                <div className="flex flex-col items-center border-[1.5px] w-[423px] py-2 rounded-3xl border-[#ff0000] cursor-pointer">
                  <span className="font-bold text-md">Pay ₹10,000 Now</span>
                  <span className="text-[#ff0000] font-semibold text-[15px]">Balance on Delivery</span>
                </div>
              </main>
              <div className="flex flex-row items-start gap-2 ml-4">
                <span className="mt-1">
                  <Image src="/png/waiting.png" width={20} height={20} alt="offer" />
                </span>
                <span className="text-[18px] font-semibold text-[#6CAE39]">
                  50% Refund <br /> Until 06June2024, 2:00PM <br />
                  <span className="text-[#737373] text-sm font-light">Convince fees is not refundable</span>
                </span>

              </div>

            </div>


            {/* booking summary */}
          </div>


        </div>
        <div className="mb-10">
          <ExtraCharges/>
        </div>
        <div className="mb-10">

          <DescCar/>
        </div>
        <div>
          <Video/>
        </div>
        <div className="mx-10 top-button">
          {/* <InterestedSlider/> */}
          <FleetsSlider showButton={false} showRatingStar={false} />
        </div>
      </div>
    </>
  );
};
export default CarDetails;
