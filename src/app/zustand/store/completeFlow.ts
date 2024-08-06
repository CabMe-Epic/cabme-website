// import { create } from 'zustand';
// import { devtools } from 'zustand/middleware';

// interface CompleteFlow {
//   pickupLocationStore: string | null;
//   setPickuplocationStore: (pickLocation: string | null) => void;
//   getCompleteDetails: () => (string | null)[];
// }

// const useCompleteFlow = create<CompleteFlow>()(
//   devtools(
//     (set, get) => ({
//       pickupLocationStore: null,
//       setPickuplocationStore: (pickLocation: string | null) => set({ pickupLocationStore: pickLocation }),
//       getCompleteDetails: () => {
//         const state = get();
//         return [state.pickupLocationStore];
//       },
//     })
//   )
// );

// export default useCompleteFlow;


// import {create} from 'zustand';
// const useCompleteFlow = (set) =>{

// }