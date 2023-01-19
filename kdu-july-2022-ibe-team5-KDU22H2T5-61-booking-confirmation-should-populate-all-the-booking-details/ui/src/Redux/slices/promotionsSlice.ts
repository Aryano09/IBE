import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Action } from "history";
import type { RootState } from "../store";
import axios from "axios";
import { useAppSelector } from "../hooks";

type obj = {
  minimumDaysOfStay: number;
  priceFactor: number;
  description: string;
  title: string;
};

interface promotionsState {
  value: obj[];
}

const initialState: promotionsState = {
  value: [
  ],
};

export const fetchPromotions = createAsyncThunk(
  "promotionsState/fetchPromotions",
  (obj: any) => {
    return axios
      .get(
        `${process.env.REACT_APP_API_GATEWAY_BASE_URL}/graphql/promotions?checkInDate=${obj.checkInDate}&checkOutDate=${obj.checkOutDate}`,
        {headers:{"x-api-key": process.env.REACT_APP_API_GATEWAY_API_KEY ?? ``}}
      )
      .then(function (res: any) {
        return res.data;
      })
      .catch((err) => console.log(`Oops, an error:\n${err}`));
  }
);

export const promotionsSlice = createSlice({
  name: "promotions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPromotions.fulfilled, (state, action) => {
      state.value = action.payload;
      // console.log(state.value);
    });
  },
});

export const promotions = (state: RootState) => state.promotionsState.value;

export default promotionsSlice.reducer;
