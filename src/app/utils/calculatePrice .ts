export const calculatePrice = (days: number, hours: number, total: number) => {
    const baseHours = 24;
    const additionalHourRate = total / baseHours;
    const totalHours = (days * 24) + hours;
    if (totalHours <= baseHours) {
        return total;
    } else {
        const additionalHours = totalHours - baseHours;
        const additionalCost = additionalHours * additionalHourRate;
        return total + additionalCost;
    }
};