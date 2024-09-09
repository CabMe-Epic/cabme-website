import BookingDetailsCard from "@/app/components/booking-details-card/booking-details-card";

interface Vehicle {
    bookingDate: any;
    response: ApiResponse[];
    id: string;
    name: string;
  
  }
  
  interface UseVehiclesResult {
    vehicles: Vehicle[];
    loading: boolean;
    error: Error | null;
  }

  interface ApiResponse {
    success: boolean;
    response: any;
  }
  
  interface Vehicle {
    _id: string;
    vehicleSpecifications: {
      body: string;
      make: string;
      transmission: string;
      vin: string;
      year: string;
      mileage: string;
      fuelType: string;
      engine: string;
      door: string;
      brake: string;
      driveTrain: string;
      AC: string;
     
    };
    carFeatures: {
      type: any;
      multiZoneAC: boolean;
      premiumSoundSystem: boolean;
      cylinders: number;
      androidAuto: boolean;
      keylessStart: boolean;
      intermittentWipers: boolean;
      navigationSystem: boolean;
      memorySeat: boolean;
      bluetooth: boolean;
      heatedFrontSeats: boolean;
      powerWindows: number;
      adaptiveCruiseControl: boolean;
    };
    extraService: {
      packageType: string;
      freeKmsForRental: number;
      extraKmCharges: number;
      insurance: string;
      roadSideAssistance: string;
      fuel: string;
      babySeat: string;
    };
    city: string;
    carName: string;
    brandName: string;
    seatingCapacity: string;
    vehicleDescriptions: string;
    vehicleRegistrationNumber: string;
    available: boolean;
    typeOfBooking: string;
    featuredImage: string;
    imageGallery: string[];
    customerFeedback: string;
    starRating: string;
    metaTitle: string;
    metaDescription: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    
  }



  
