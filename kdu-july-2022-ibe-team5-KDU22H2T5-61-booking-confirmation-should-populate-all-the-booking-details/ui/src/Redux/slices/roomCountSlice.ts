import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

type obj = {
  roomCount: number;
};

interface bedCountState {
  value: obj;
}

const initialState: bedCountState = {
  value: {
    roomCount: 1,
  },
};

export const roomCountSlice = createSlice({
  name: "roomCount",
  initialState,
  reducers: {
    incrementRoomCount: (state) => {
      state.value.roomCount += 1;
    },
    decrementRoomCount: (state) => {
      if (state.value.roomCount > 0) state.value.roomCount -= 1;
    },
    updateRoomCount: (state, action) => {
      state.value.roomCount = action.payload;
    }
  },
});

export const {
  incrementRoomCount,
  decrementRoomCount,
  updateRoomCount,
} = roomCountSlice.actions;

export const RoomCount = (state: RootState) => state.roomCountState.value;

export default roomCountSlice.reducer;
