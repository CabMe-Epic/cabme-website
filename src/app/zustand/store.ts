import create from 'zustand';
import { persist } from 'zustand/middleware';
import { UserState, UserData } from './types';

export const useStore = create<UserState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      userData: {
        firstName: '',
        lastName: '',
        fullName: '',
        email: '',
        phone: '',
        date: null,
        phoneVerified: false,
        aadharNumber: '',
        aadharCardFrontImageUrl: '',
        aadharCardBackImageUrl: '',
        aadharVerified: false,
        panNumber: '',
        panVerified: false,
        panImageUrl: '',
        drivingLicenseNumber: '',
        drivingLicenseFrontImageUrl: '',
        drivingLicenseBackImageUrl: '',
        drivingLicenseVerified: false,
        role: '',
        address: '',
        city: '',
        state: '',
        starRating: 0,
      },
      login: (userData: UserData) => set({ isLoggedIn: true, userData: { ...userData, fullName: `${userData.firstName} ${userData.lastName}` } }),
      logout: () => set({ isLoggedIn: false, userData: {} as UserData }),
      updateUserData: (newData: Partial<UserData>) =>
        set((state) => ({
          userData: { ...state.userData, ...newData },
        })),
    }),
    {
      name: 'user-storage', 
      getStorage: () => localStorage, 
    }
  )
);

