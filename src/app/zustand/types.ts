export interface UserData {
    firstName: string;
    lastName: string;
    fullName: string;
    email: string;
    phone: string;
    date: Date | null;
    phoneVerified: boolean;
    aadharNumber: string;
    aadharCardFrontImageUrl?: string;
    aadharCardBackImageUrl?: string;
    aadharVerified: boolean;
    panNumber: string;
    panVerified: boolean;
    panImageUrl: string;
    drivingLicenseNumber: string;
    drivingLicenseFrontImageUrl?: string;
    drivingLicenseBackImageUrl?: string;
    drivingLicenseVerified: boolean;
    role: string;
    address: string;
    city: string;
    state: string;
    starRating: number;
  }
  
  export interface UserState {
    isLoggedIn: boolean;
    userData: UserData;
    login: (userData: UserData) => void;
    logout: () => void;
    updateUserData: (newData: Partial<UserData>) => void;
  }
  