import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import axios from "axios";

type RoomTypeRatingDTO = {
  roomTypeId: number;
  averageRating: number;
  count: number;
};

type obj = {
    roomTypeRatingDTOHashMap: any;
};

interface roomTypeRatingsState {
  value: obj;
}

const initialState: roomTypeRatingsState = {
  value: {
    roomTypeRatingDTOHashMap: {},
  },
};

export const fetchRoomTypeRatings = createAsyncThunk(
  "roomTypeRatingsState/fetchRoomTypeRatings",
  () => {
    return axios
      .get(
        `${process.env.REACT_APP_API_GATEWAY_BASE_URL}/rooms/ratings`,
        // `http://localhost:8080/api/config/room/ratings`,
        // `${process.env.REACT_APP_ALB_BASE_URL}/api/config/room/ratings`,
        {
          headers: {
            "x-api-key": process.env.REACT_APP_API_GATEWAY_API_KEY ?? ``,
          },
        }
      )
      .then(function (res: any) {
        return res.data;
      });
  }
);

export const roomTypeRatingsSlice = createSlice({
  name: "roomTypeRatings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRoomTypeRatings.fulfilled, (state, action) => {
      state.value.roomTypeRatingDTOHashMap = action.payload;
      // console.log(state.value);
    });
  },
});

export const roomTypeRatings = (state: RootState) =>
  state.roomTypeRatingsState.value;

export default roomTypeRatingsSlice.reducer;
