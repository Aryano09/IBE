import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Action } from "history";
import type { RootState } from "../store";
import axios from "axios";
import { useAppSelector } from "../hooks";

type obj = {
    basic_nightly_rate: number,
    date: string,
};

interface dateCalenderRatesState {
  value: obj[];
}

const initialState: dateCalenderRatesState = {
  value:[
    ]
};

export const fetchDateCalenderRates = createAsyncThunk(
  "dateCalenderRatesState/fetchDateCalenderRates",
  () => {
    return axios
      .get(
        `${process.env.REACT_APP_API_GATEWAY_BASE_URL}/calendar/basicrates/property/5`,
        {headers:{"x-api-key": process.env.REACT_APP_API_GATEWAY_API_KEY ?? ``}}
      )
      .then(function (res: any) {
        return res.data;
      })
      .catch((err) => console.log(`Oops, an error:\n${err}`));
  }
);

export const dateCalenderRatesSlice = createSlice({
  name: "dateCalenderRates",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDateCalenderRates.fulfilled, (state, action) => {
      state.value = action.payload;
      //console.log(state.value);
    });
  },
});

export const dateCalenderRates = (state: RootState) =>
  state.dateCalenderRatesState.value;

export default dateCalenderRatesSlice.reducer;
