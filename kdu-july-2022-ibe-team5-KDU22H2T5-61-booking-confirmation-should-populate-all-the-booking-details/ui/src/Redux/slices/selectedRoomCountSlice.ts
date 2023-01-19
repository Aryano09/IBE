import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

type obj = {
  roomCount: number;
};
interface selectedRoomCountState {
  value : obj;
}

const initialState: selectedRoomCountState = {
  value : { 
    roomCount:localStorage.getItem('selectedRoomCountState') != null ? Number(localStorage.getItem('selectedRoomCountState')) : 1
  },
};

export const selectedRoomCountSlice = createSlice({
  name: "selectedRoomCount",
  initialState,
  reducers: {
    changeSelectedRoomCount: (state, action) => {
      state.value.roomCount = action.payload;
      window.localStorage.setItem('selectedRoomCountState', action.payload);
    },
  },
});

export const {
    changeSelectedRoomCount
} = selectedRoomCountSlice.actions;

export const selectedRoomCount = (state: RootState) => state.selectedRoomCountState.value;

export default selectedRoomCountSlice.reducer;
