import create from 'zustand';
import { persist } from 'zustand/middleware';
import { User, UserState } from './types';

export const useStore = create<UserState>()(
  persist(
    (set, get) => ({
      isLoggedIn: false,
      userData: null,
      login: (userData: User) => set({ isLoggedIn: true, userData }),
      logout: () => set({ isLoggedIn: false, userData: null }),
      updateUserData: (newData: Partial<User>) =>
        set((state) => ({
          userData: { ...state.userData!, ...newData },
        })),
      getUserData: () => get().userData,
    }),
    {
      name: 'user-storage',
      getStorage: () => localStorage,
    }
  )
);

