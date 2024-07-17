const PriceSummary = () => {
  return (
    <div className="h-full">
      <h3 className="text-xl font-semibold pb-4">Price Summary</h3>
      <div className="grid h-full">
        <div className="border-b">
          <div className="flex justify-between">
            <span>Car rental fee</span>
            <span className="text-lg">₹18,000/-</span>
          </div>
          <p className="text-xs">Taxes and Extra Charges are included</p>
          <div className="flex justify-between mt-4">
            <div>
              <span>Discount</span>
              <span className="text-[#83E943]">(10%off)</span>
            </div>
            <span className="text-lg">-100</span>
          </div>
        </div>
        <div className="flex justify-between pt-4">
          <span>Total Amount</span>
          <span className="font-bold">₹18,000/-</span>
        </div>
      </div>
    </div>
  );
};
export default PriceSummary;
