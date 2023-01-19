import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

type obj = {
  filterList: string[];
};

interface roomTypeFilterState {
  value: obj;
}

const initialState: roomTypeFilterState = {
  value: {
    filterList: [],
  },
};

export const roomTypeFilterSlice = createSlice({
  name: "roomTypeFilter",
  initialState,
  reducers: {
    appendRoomTypeToFilter: (state, action) => {
      console.log(`adding room type filter `, action.payload);
      state.value.filterList.push(action.payload.toString());
    },
    removeRoomTypeFromFilter: (state, action) => {
      console.log(`removing room type filter `, action.payload);
      const index = state.value.filterList.indexOf(action.payload);
      if (index > -1) {
        state.value.filterList.splice(index, 1);
      }
    },
  },
});

export const { appendRoomTypeToFilter, removeRoomTypeFromFilter } =
  roomTypeFilterSlice.actions;

export const roomTypeFilter = (state: RootState) =>
  state.roomTypeFilterState.value;

export default roomTypeFilterSlice.reducer;
