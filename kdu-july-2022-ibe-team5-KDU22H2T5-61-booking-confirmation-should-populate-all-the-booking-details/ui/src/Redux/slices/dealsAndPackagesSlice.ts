import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Action } from "history";
import type { RootState } from "../store";
import axios from "axios";
import { setCurrentDeals } from "./dealsCategorySlice";
import { useAppSelector, useAppDispatch } from "../hooks";


interface dealsAndPackagesState {
  value: any;
}

const initialState: dealsAndPackagesState = {
  value: [
  ],
};

export const fetchdealsAndPackages = createAsyncThunk(
  "dealsAndPackagesState/fetchdealsAndPackages",
  (obj: any) => {
    return axios
      .get(
        // `http://ibe-t5-alb-181387793.eu-west-3.elb.amazonaws.com/api/config/room/deals?checkInDate=${obj.checkInDate}&checkOutDate=${obj.checkOutDate}`
        `${process.env.REACT_APP_API_GATEWAY_BASE_URL}/rooms/deals?checkInDate=${obj.checkInDate}&checkOutDate=${obj.checkOutDate}`,
        {headers:{"x-api-key": process.env.REACT_APP_API_GATEWAY_API_KEY ?? ``}}
      )
      .then(function (res: any) {
        return res.data;
      })
      .catch((err) => console.log(`Oops, an error:\n${err}`));
  }
);

export const dealsAndPackagesSlice = createSlice({
  name: "dealsAndPackages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchdealsAndPackages.fulfilled, (state, action) => {
      state.value = action.payload;
      // console.log(state.value);
    });
  },
});

export const dealsAndPackages = (state: RootState) => state.dealsAndPackagesState.value;

export default dealsAndPackagesSlice.reducer;
