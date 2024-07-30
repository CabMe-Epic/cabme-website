import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface CarsStore {
    package1Price: number | null;
    package2Price: number | null;
    package3Price: number | null;
    setPackage1Price: (price: number | null) => void;
    setPackage2Price: (price: number | null) => void;
    setPackage3Price: (price: number | null) => void;
    getPackagePrices: () => (number | null)[];
}

const useCarsStore = create<CarsStore>()(
    devtools(
        persist(
            (set, get) => ({
                package1Price: null,
                package2Price: null,
                package3Price: null,
                setPackage1Price: (price: number | null) => set({ package1Price: price }),
                setPackage2Price: (price: number | null) => set({ package2Price: price }),
                setPackage3Price: (price: number | null) => set({ package3Price: price }),
                getPackagePrices: () => {
                    const state = get();
                    return [state.package1Price, state.package2Price, state.package3Price];
                }
            }),
            {
                name: 'cars-store',
                getStorage: () => localStorage
            }
        )
    )
);

export default useCarsStore;
