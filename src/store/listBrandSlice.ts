import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ListBrandState {
  mobileNumber: string;
  selectedCountry: string;
}

const initialState: ListBrandState = {
  mobileNumber: "",
  selectedCountry: "+91",
};

export const listBrandSlice = createSlice({
  name: "listBrand",
  initialState,
  reducers: {
    setMobileNumber: (state, action: PayloadAction<string>) => {
      state.mobileNumber = action.payload;
    },
    setSelectedCountry: (state, action: PayloadAction<string>) => {
      state.selectedCountry = action.payload;
    },
  },
});

export const { setMobileNumber, setSelectedCountry } = listBrandSlice.actions;

export default listBrandSlice.reducer;
