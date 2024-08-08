const PriceSummary = () => {
  return (
    <div className="h-full">
      <h3 className="text-xl font-semibold pb-4">Price Summary</h3>
      <div className="grid h-full">
        <div className="border-b pb-2">
          <div className="flex justify-between sm:mb-0 mb-1">
            <span className="sm:text-[15px] text-[14px]">Car rental fee</span>
            <span className="sm:text-lg">₹18,000/-</span>
          </div>
          <p className="text-xs">Taxes and Extra Charges are included</p>
          <div className="flex justify-between mt-4">
            <div>
              <span className="sm:text-[15px] text-[14px]">Discount</span>
              <span className="text-[#83E943] sm:text-[15px] text-[14px]"> (10%off)</span>
            </div>
            <span className="sm:text-lg">-100</span>
          </div>
        </div>
        <div className="flex justify-between pt-4">
          <span className="font-semibold">Total Amount</span>
          <span className="font-bold">₹18,000/-</span>
        </div>
      </div>
    </div>
  );
};
export default PriceSummary;
