import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pickupLocation: '',
  dropOffLocation: '',
  pickupDate: '',
  dropOffDate: '',
  pickupTime: '',
  dropoffTime: '',
  tabValue: '',
  radioToggle: '',
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setPickupLocation: (state, action) => {
      state.pickupLocation = action.payload;
    },
    setDropOffLocation: (state, action) => {
      state.dropOffLocation = action.payload;
    },
    setPickupDate: (state, action) => {
      state.pickupDate = action.payload;
    },
    setDropOffDate: (state, action) => {
      state.dropOffDate = action.payload;
    },
    setPickupTime: (state, action) => {
      state.pickupTime = action.payload;
    },
    setDropoffTime: (state, action) => {
      state.dropoffTime = action.payload;
    },
    setTabValue: (state, action) => {
      state.tabValue = action.payload;
    },
    setRadioToggle: (state, action) => {
      state.radioToggle = action.payload;
    },
  },
});

export const {
  setPickupLocation,
  setDropOffLocation,
  setPickupDate,
  setDropOffDate,
  setPickupTime,
  setDropoffTime,
  setTabValue,
  setRadioToggle,
} = locationSlice.actions;

export default locationSlice.reducer;
