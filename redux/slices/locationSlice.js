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
  nonFormatedPickupDate:'',
  nonFormatedDropoffDate:'',
  selectedPackagePrice:'',
  selectedPackageFreeKms: '',
  doorStepPriceCharge:''
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setDoorStepPriceChargeRedux: (state, action) => {
      state.doorStepPriceCharge = action.payload;
    },
    setSelectedPackageFreeKmsRedux: (state, action) => {
      state.selectedPackageFreeKms = action.payload;
    },
    setSelectedPackagePriceRedux: (state, action) => {
      state.selectedPackagePrice = action.payload;
    },
    setNonFormatedPickupDateRedux: (state, action) => {
      state.nonFormatedPickupDate = action.payload;
    },
    setNonFormatedDropoffDateRedux: (state, action) => {
      state.nonFormatedDropoffDate = action.payload;
    },
    setPickupLocationRedux: (state, action) => {
      state.pickupLocation = action.payload;
    },
    setDropOffLocationRedux: (state, action) => {
      state.dropOffLocation = action.payload;
    },
    setPickupDateRedux: (state, action) => {
      state.pickupDate = action.payload;
    },
    setDropOffDateRedux: (state, action) => {
      state.dropOffDate = action.payload;
    },
    setPickupTimeRedux: (state, action) => {
      state.pickupTime = action.payload;
    },
    setDropoffTimeRedux: (state, action) => {
      state.dropoffTime = action.payload;
    },
    setTabValueRedux: (state, action) => {
      state.tabValue = action.payload;
    },
    setRadioToggleRedux: (state, action) => {
      state.radioToggle = action.payload;
    },
  },
});

export const {
  setPickupLocationRedux,
  setDropOffLocationRedux,
  setPickupDateRedux,
  setDropOffDateRedux,
  setPickupTimeRedux,
  setDropoffTimeRedux,
  setTabValueRedux,
  setRadioToggleRedux,
  setNonFormatedPickupDateRedux,
  setNonFormatedDropoffDateRedux,
  setSelectedPackagePriceRedux,
  setSelectedPackageFreeKmsRedux,
  setDoorStepPriceChargeRedux
} = locationSlice.actions;

export default locationSlice.reducer;
