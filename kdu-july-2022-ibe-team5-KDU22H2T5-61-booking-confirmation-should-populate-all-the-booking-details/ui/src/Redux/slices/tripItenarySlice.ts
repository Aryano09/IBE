import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

type obj = {
  showTripItenary: boolean;
};

interface tripItenaryState {
  value: obj;
}

const initialState: tripItenaryState = {
  value: {
    showTripItenary: localStorage.getItem("promotion") == null ? false : true,
  },
};

export const tripItenarySlice = createSlice({
  name: "tripItenary",
  initialState,
  reducers: {
    setShowTripItenary: (state, action) => {
      state.value.showTripItenary = action.payload;
    },
  },
});

export const { setShowTripItenary } = tripItenarySlice.actions;

export const texts = (state: RootState) => state.tripItenaryState.value;

export default tripItenarySlice.reducer;
