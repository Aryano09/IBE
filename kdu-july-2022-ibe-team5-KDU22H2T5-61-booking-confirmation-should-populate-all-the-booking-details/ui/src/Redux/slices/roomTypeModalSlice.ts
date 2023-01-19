import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

type obj = {
  showModal: boolean;
  roomType: any;
  amenities: any[];
};

interface roomTypeModalState {
  value: obj;
}

const initialState: roomTypeModalState = {
  value: {
    showModal: false,
    roomType: {},
    amenities: [],
  },
};

export const roomTypeModalSlice = createSlice({
  name: "roomTypeModal",
  initialState,
  reducers: {
    setShowModal: (state, action) => {
      state.value.showModal = action.payload;
    },
    setRoomType: (state, action) => {
      state.value.roomType = action.payload;
      localStorage.setItem('roomType', JSON.stringify(state.value.roomType));
    },
    setAmenities: (state, action) => {
      state.value.amenities = action.payload;
    },
  },
});

export const {
    setShowModal,
    setRoomType,
    setAmenities,
} = roomTypeModalSlice.actions;

export const roomTypeModal = (state: RootState) => state.roomTypeModalState.value;

export default roomTypeModalSlice.reducer;
