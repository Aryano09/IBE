import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

type obj = {
  priceSortWay: string;
};

interface roomTypeSorterState {
  value: obj;
}

const initialState: roomTypeSorterState = {
  value: {
    priceSortWay: "ASC",
  },
};

export const roomTypeSorterSlice = createSlice({
  name: "roomTypeSorter",
  initialState,
  reducers: {
    togglePriceSortWay: (state) => {
      if (state.value.priceSortWay === "ASC") state.value.priceSortWay = "DSC";
      else state.value.priceSortWay = "ASC";
    },
  },
});

export const { togglePriceSortWay } = roomTypeSorterSlice.actions;

export const roomTypeSorter = (state: RootState) =>
  state.roomTypeSorterState.value;

export default roomTypeSorterSlice.reducer;
