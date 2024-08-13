type KmsCalculatorProps = {
    days: number;
    hours: number;
    kmsPerHalfHour: number;
  };
  
  const calculateKms = ({
    days,
    hours,
    kmsPerHalfHour
  }: KmsCalculatorProps): number => {
    // Calculate the total number of half-hours
    const totalHalfHours = Math.ceil(hours / 0.5);
    
    // Calculate the total kilometers based on the number of days and half-hours
    const totalKmsFromDays = days * 48 * kmsPerHalfHour; // Each day has 48 half-hours
    const totalAdditionalKms = totalHalfHours * kmsPerHalfHour;
    
    // Total kilometers
    return totalKmsFromDays + totalAdditionalKms;
  };
  
  export default calculateKms;
  