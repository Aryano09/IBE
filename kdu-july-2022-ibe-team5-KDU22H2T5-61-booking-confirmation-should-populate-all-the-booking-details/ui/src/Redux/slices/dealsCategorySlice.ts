import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

type obj = {
  currentDeals: any[];
};

interface dealsCategoryState {
  value: obj;
}

const initialState: dealsCategoryState = {
  value: {
    currentDeals: [
      {
        minimumDaysOfStay: 1,
        priceFactor: 0.85,
        description:
          "Spend $10 every night you stay and earn $150 in dining credit at the resort",
        title: "T5 Kids eat free",
      },
    ],
  },
};

export const dealsCategorySlice = createSlice({
  name: "dealsCategory",
  initialState,
  reducers: {
    setCurrentDeals: (state, action) => {
      state.value.currentDeals = action.payload;
    },
  },
});

export const { setCurrentDeals } = dealsCategorySlice.actions;

export const RoomCount = (state: RootState) => state.dealsCategoryState.value;

export default dealsCategorySlice.reducer;
