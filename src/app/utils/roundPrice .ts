export const roundPrice = (price: number, decimals: number = 0): number => {
    const factor = Math.pow(10, decimals);
    return Math.round(price * factor) / factor;
};
