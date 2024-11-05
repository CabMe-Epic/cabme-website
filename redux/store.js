// redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import yourReducer from "../redux/slices/yourSlice";
import locationReducer from "../redux/slices/locationSlice";
import { thunk } from "redux-thunk"; // Ensure you're importing it correctly
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

const persistConfig = {
  key: 'root',
  storage,
};

const persistedLocationReducer = persistReducer(persistConfig, locationReducer);

const store = configureStore({
  reducer: {
    yourSlice: yourReducer,
    location: persistedLocationReducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(thunk), // Explicitly adding thunk (optional)
});

export const persistor = persistStore(store);
export default store;
