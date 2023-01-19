import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Action } from "history";
import type { RootState } from "../store";
import axios from "axios";
import {useAppSelector} from '../hooks';

interface roomTypeRoomRateState {
  value: any;
}

const initialState: roomTypeRoomRateState = {
  value: {

  }
};

export const fetchRoomTypeRoomRates = createAsyncThunk(
  "roomTypeRoomRateState/fetchRoomTypeRoomRates",
  (obj:any) => {
    return axios
      .get(
        // `http://ibe-t5-alb-181387793.eu-west-3.elb.amazonaws.com/api/config/room/property/${obj.propertyId}/rates`
        `${process.env.REACT_APP_API_GATEWAY_BASE_URL}/rooms/property/${obj.propertyId}/rates`,
        {headers:{"x-api-key": process.env.REACT_APP_API_GATEWAY_API_KEY ?? ``}}
      )
      .then(function (res: any) {
        return res.data;
      })
      .catch((err) => console.log(`Oops, an error:\n${err}`));
  }
);

export const roomTypeRoomRateSlice = createSlice({
  name: "roomTypeRoomRate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRoomTypeRoomRates.fulfilled, (state, action) => {
      state.value = action.payload;
      // console.log(state.value);
      
    });
  },
});

export const roomTypeRoomRates = (state: RootState) => state.roomTypeRoomRateState.value;

export default roomTypeRoomRateSlice.reducer;
