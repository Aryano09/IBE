import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Action } from "history";
import type { RootState } from "../store";
import axios from "axios";
import { useAppSelector } from "../hooks";

type obj = {
  id: number;
  name: string;
};

interface roomAmenitiesState {
  value: obj[];
}

const initialState: roomAmenitiesState = {
  value: [
    {
      id: 1,
      name: "Wireless Internet Access",
    },
    {
      id: 2,
      name: "Cable & Pay TV Channels",
    },
    {
      id: 3,
      name: "Alarm Clock",
    },
    {
      id: 4,
      name: "Hair Dryer",
    },
    {
      id: 5,
      name: "In Room Safe",
    },
    {
      id: 6,
      name: "Iron and Ironing Board",
    },
    {
      id: 7,
      name: "Writing Desk and Chair",
    },
  ],
};

export const fetchRoomAmenities = createAsyncThunk(
  "roomAmenitiesState/fetchRoomAmenities",
  () => {
    return axios
      .get(
        // `http://ibe-t5-alb-181387793.eu-west-3.elb.amazonaws.com/api/config/room/amenities/`
        `${process.env.REACT_APP_API_GATEWAY_BASE_URL}/rooms/amenities/`,
        {headers:{"x-api-key": process.env.REACT_APP_API_GATEWAY_API_KEY ?? ``}}
      )
      .then(function (res: any) {
        return res.data;
      })
      .catch((err) => console.log(`Oops, an error:\n${err}`));
  }
);

export const roomAmenitiesSlice = createSlice({
  name: "roomAmenities",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRoomAmenities.fulfilled, (state, action) => {
      state.value = action.payload;
    });
  },
});

export const roomAmenities = (state: RootState) =>
  state.roomAmenitiesState.value;

export default roomAmenitiesSlice.reducer;
