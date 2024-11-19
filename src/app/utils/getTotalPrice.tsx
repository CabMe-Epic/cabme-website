const extractDaysAndHours = (durationString: string) => {
  const daysMatch = durationString.match(/(\d+)\s+days/);
  const hoursMatch = durationString.match(/(\d+)\s+hours/);

  const days = daysMatch ? parseInt(daysMatch[1], 10) : 0;
  const hours = hoursMatch ? parseInt(hoursMatch[1], 10) : 0;

  return { days, hours };
};

const calculatePrice = (days: number, hours: number, total: number) => {
  const baseHours = 24;
  const additionalHourRate = total / baseHours;
  const totalHours = days * 24 + hours;

  if (totalHours <= baseHours) {
    return total;
  } else {
    const additionalHours = totalHours - baseHours;
    const additionalCost = additionalHours * additionalHourRate;
    return total + additionalCost;
  }
};

const getReservationData = () => {
  const pickupDate = localStorage.getItem("pickupDate") || "";
  const dropoffDate = localStorage.getItem("dropOffDate") || "";
  const pickupTime = localStorage.getItem("pickupTime") || "";
  const dropoffTime = localStorage.getItem("dropoffTime") || "";

  return {
    pickupDate,
    dropoffDate,
    pickupTime,
    dropoffTime,
  };
};

export const calculateTotalPrice = (
  pickupDateRedux: any,
  dropOffDateRedux: any,
  pickupTimeRedux: any,
  dropoffTimeRedux: any,
  price: number
) => {
  const { pickupDate, dropoffDate, pickupTime, dropoffTime } =
    getReservationData();

  if (pickupDateRedux && dropOffDateRedux && pickupTimeRedux && dropoffTimeRedux) {
    const pickupDateTime: Date = new Date(
      `${pickupDateRedux.split("-").join("-")}T${pickupTimeRedux}:00`
    );
    const droppingDateTime: Date = new Date(
      `${dropOffDateRedux.split("-").join("-")}T${dropoffTimeRedux}:00`
    );
    const diffInMs: number = Math.abs(
      droppingDateTime.getTime() - pickupDateTime.getTime()
    );
    const diffInSeconds: number = Math.floor(diffInMs / 1000);
    const days: number = Math.floor(diffInSeconds / (3600 * 24));
    const hours: number = Math.floor((diffInSeconds % (3600 * 24)) / 3600);

    const duration = `${days} days, ${hours} hours`;

    const { days: extractedDays, hours: extractedHours } =
      extractDaysAndHours(duration);

    return calculatePrice(extractedDays, extractedHours, price);
  }

  return undefined;
};
