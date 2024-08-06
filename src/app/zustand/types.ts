interface SelectedUser {
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  address: string;
  state: string;
  city: string;
}

export interface User extends SelectedUser {
  id: string;
  _id?: string;
  phone: string;
  phoneVerified: boolean;
  aadharNumber: string;
  aadharCardFrontImageUrl: string;
  aadharCardBackImageUrl: string;
  aadharVerified: boolean;
  panNumber: string;
  panVerified: boolean;
  panImageUrl: string;
  drivingLicenseNumber: string;
  drivingLicenseFrontImageUrl: string;
  drivingLicenseBackImageUrl: string;
  drivingLicenseVerified: boolean;
  role: string;
  starRating: number;
}

export interface UserState {
  isLoggedIn: boolean;
  userData: User | null;
  login: (userData: User) => void;
  logout: () => void;
  updateUserData: (newData: Partial<User>) => void;
}


export interface CarsStore {
  package1Price: number | null
  package2Price: number | null
  package3Price: number | null

  setPackage1Price: (price: number | null) => void;
  setPackage2Price: (price: number | null) => void;
  setPackage3Price: (price: number | null) => void;

  getPackagePrices: () => (number | null)[];
}
// export interface CompleteFlow{
//   pickupLocationStore:string | null;
//   setPickuplocationStore:(pickLocation: string | null) => void;
//   getCompleteDetails: () => (number | string | null)[];
// }