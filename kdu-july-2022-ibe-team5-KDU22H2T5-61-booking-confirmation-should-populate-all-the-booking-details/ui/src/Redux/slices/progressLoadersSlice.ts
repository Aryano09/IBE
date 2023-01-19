import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import axios from "axios";

type obj = {
  bookingLoader: boolean;
};

interface progressLoadersState {
  value: obj;
}

const initialState: progressLoadersState = {
  value: {
    bookingLoader: false,
  },
};

export const progressLoadersSlice = createSlice({
  name: "progressLoaders",
  initialState,
  reducers: {
    setBookingLoader: (state, action) => {
      state.value.bookingLoader = action.payload;
    },
  },
});

export const { setBookingLoader } = progressLoadersSlice.actions;

export const progressLoaders = (state: RootState) =>
  state.progressLoadersState.value;

export default progressLoadersSlice.reducer;
