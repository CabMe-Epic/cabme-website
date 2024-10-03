import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';


interface CarsStore {
    package1Price: number | null;
    package2Price: number | null;
    package3Price: number | null;
    payableAmount: number | null;
    // pickupLocation:string | null;
    setPackage1Price: (price: number | null) => void;
    setPackage2Price: (price: number | null) => void;
    setPackage3Price: (price: number | null) => void;
    setPayableAmount: (price: number | null) => void;
    // setPickuplocation:(pickLocation: string | null) => void;
    getPackagePrices: () => (number | string | null)[];
}

const useCarsStore = create<CarsStore>()(
    devtools(
        persist(
            (set, get) => ({
                package1Price: null,
                package2Price: null,
                package3Price: null,
                payableAmount:null,
                // pickupLocation: null,

                setPackage1Price: (price: number | null) => set({ package1Price: price }),
                setPackage2Price: (price: number | null) => set({ package2Price: price }),
                setPackage3Price: (price: number | null) => set({ package3Price: price }),
                setPayableAmount:(price: number | null) => set({payableAmount:price}),
                // setPickuplocation: (pickLocation: string | null) => set({pickupLocation:pickLocation}),
                getPackagePrices: () => {
                    const state = get();
                    return [state.package1Price, state.package2Price, state.package3Price, state.payableAmount
                        // , state.pickupLocation
                    ];
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
