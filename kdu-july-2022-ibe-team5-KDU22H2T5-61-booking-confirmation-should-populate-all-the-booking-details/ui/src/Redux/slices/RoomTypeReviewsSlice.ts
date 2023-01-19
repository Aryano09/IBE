import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import axios from "axios";

type RoomTypeReviewDTO = {
  roomTypeId: number;
  description: string;
  rating: number;
  username: string;
};

type obj = {
  roomTypeReviewDTOList: RoomTypeReviewDTO[];
  ratingsCountPercentage: number[];
};

interface roomTypeReviewsState {
  value: obj;
}

const initialState: roomTypeReviewsState = {
  value: {
    roomTypeReviewDTOList: [],
    ratingsCountPercentage: [0.0, 0.0, 0.0, 0.0, 0.0],
  },
};

export const fetchRoomTypeReviews = createAsyncThunk(
  "roomTypeReviewsState/fetchRoomTypeReviews",
  (obj: any) => {
    return axios
      .get(
        `${process.env.REACT_APP_API_GATEWAY_BASE_URL}/rooms/type/${obj.roomTypeId}/reviews`,
        // `http://localhost:8080/api/config/room/type/${obj.roomTypeId}/reviews`,
        // `${process.env.REACT_APP_ALB_BASE_URL}/api/config/room/type/${obj.roomTypeId}/reviews`,
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

export const roomTypeReviewsSlice = createSlice({
  name: "roomTypeReviews",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRoomTypeReviews.fulfilled, (state, action) => {
      state.value = action.payload;
      // console.log(state.value);
    });
  },
});

export const roomTypeReviews = (state: RootState) =>
  state.roomTypeReviewsState.value;

export default roomTypeReviewsSlice.reducer;
