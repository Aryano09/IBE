import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

type obj = {
    showTravellerInfo: boolean,
    showBillingInfo: boolean,
    showPaymentInfo: boolean,
};

interface renderState {
  value: obj;
}

const initialState: renderState = {
  value: {
    showTravellerInfo: true,
    showBillingInfo: false,
    showPaymentInfo: false,
  },
};

export const renderSlice = createSlice({
  name: "renderState",
  initialState,
  reducers: {
    updateShowTravellerInfo: (state, action) => {
        state.value.showTravellerInfo = action.payload;
    },
    updateShowBillingInfo: (state, action) => {
        state.value.showBillingInfo = action.payload;
    },
    updateShowPaymentInfo: (state, action) => {
        state.value.showPaymentInfo = action.payload;
    }
  },
});

export const {
    updateShowTravellerInfo,
    updateShowBillingInfo,
    updateShowPaymentInfo,
} = renderSlice.actions;

export const renderState = (state: RootState) => state.renderState.value;

export default renderSlice.reducer;
