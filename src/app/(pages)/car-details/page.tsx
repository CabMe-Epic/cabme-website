import ProductSlider from "@/app/components/product-slider/product-slider";

const CarDetails = () => {
  return (
    <>
      <div className="py-6">
        <div className="sm:flex hidden px-16 text-[#5F5D5D]">
          <span className="cursor-pointer">Home</span>/
          <span className="cursor-pointer">Listing</span>/
          <span className="cursor-pointer">Car Listing</span>
        </div>
        <div className="max-w-[1250px] m-auto my-12">
            <ProductSlider />
        </div>
      </div>
    </>
  );
};
export default CarDetails;
