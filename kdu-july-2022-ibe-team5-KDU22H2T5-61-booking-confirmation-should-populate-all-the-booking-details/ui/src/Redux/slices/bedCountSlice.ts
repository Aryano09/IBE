import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

type obj = {
  bedCount: number;
};

interface bedCountState {
  value: obj;
}

const initialState: bedCountState = {
  value: {
    bedCount: localStorage.getItem('bedCountState') != null ? Number(localStorage.getItem('bedCountState')) : 1,
  },
};

export const bedCountSlice = createSlice({
  name: "bedCount",
  initialState,
  reducers: {
    updateBedCount: (state, action) => {
        state.value.bedCount = action.payload;
        window.localStorage.setItem('bedCountState',JSON.stringify(action.payload));
    }
  },
});

export const {
  updateBedCount,
} = bedCountSlice.actions;

export const bedCount = (state: RootState) => state.bedCountState.value;

export default bedCountSlice.reducer;
