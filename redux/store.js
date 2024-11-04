// redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import yourReducer from "../redux/slices/yourSlice";
import locationReducer from "../redux/slices/locationSlice";
import {thunk} from "redux-thunk"; // Ensure you're importing it correctly

const store = configureStore({
  reducer: {
    yourSlice: yourReducer,
    location: locationReducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(thunk), // Explicitly adding thunk (optional)
});

export default store;
