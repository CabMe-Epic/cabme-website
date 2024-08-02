import create from 'zustand';
import { persist } from 'zustand/middleware';
import CryptoJS from 'crypto-js';
import Cookies from 'js-cookie';
import { User, UserState } from '../types';

const secretKey = '@secure.s@currentuser';

const encryptData = (data: any, secretKey: string) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
};

const decryptData = (encryptedData: string, secretKey: string) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

export const useStore = create<UserState>()(
  persist(
    (set, get) => ({
      isLoggedIn: false,
      userData: null,
      login: (userData: User) => set({ isLoggedIn: true, userData }),
      logout: () => set({ isLoggedIn: false, userData: null }),
      updateUserData: (newData: Partial<User>) =>
        set((state) => ({
          isLoggedIn: true,
          userData: { ...state.userData!, ...newData },
        })),
      getUserData: () => get().userData,
    }),
    {
      name: '@secure.s@currentuser',
      getStorage: () => ({
        getItem: (key) => {
          const value = Cookies.get(key);
          return value ? value : null;
        },
        setItem: (key, value) => {
          Cookies.set(key, value, { expires: 7 }); 
        },
        removeItem: (key) => {
          Cookies.remove(key);
        },
      }),
      serialize: (state) => {
        return encryptData(state, secretKey);
      },
      deserialize: (str) => {
        return decryptData(str, secretKey);
      },
    }
  )
);

