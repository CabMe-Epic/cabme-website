export function calculateGST(price: number, gstRate: number, gstType: string) {
    function calculateGSTIncluded(price: number, gstRate: number) {
        const gstAmount = price - (price / (1 + gstRate / 100));
        const priceExcludingGST = price / (1 + gstRate / 100);
        return {
            gstAmount,
            priceExcludingGST,
            totalPrice: Number(price)
        };
    }

    function calculateGSTExcluded(price: number, gstRate: number) {
        const gstAmount = (price * gstRate) / 100;
        const totalPrice = Number(price) + Number(gstAmount);
        return {
            gstAmount,
            priceExcludingGST: Number(price),
            totalPrice
        };
    }

    if (gstType === "Included") {
        return calculateGSTIncluded(price, gstRate);
    } else if (gstType === "Excluded") {
        return calculateGSTExcluded(price, gstRate);
    } else {
        console.log("Invalid GST type. Must be 'Included' or 'Excluded'.");
        return null;
    }
}