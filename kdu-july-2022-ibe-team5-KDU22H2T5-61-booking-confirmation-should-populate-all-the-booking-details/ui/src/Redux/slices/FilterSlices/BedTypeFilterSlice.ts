import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

type obj = {
  filterList: string[];
};

interface bedTypeFilterState {
  value: obj;
}

const initialState: bedTypeFilterState = {
  value: {
    filterList: [],
  },
};

export const bedTypeFilterSlice = createSlice({
  name: "bedTypeFilter",
  initialState,
  reducers: {
    appendBedTypeToFilter: (state, action) => {
      console.log(`adding bed type filter `, action.payload);
      state.value.filterList.push(action.payload.toString());
    },
    removeBedTypeFromFilter: (state, action) => {
      console.log(`removing bed type filter `, action.payload);
      const index = state.value.filterList.indexOf(action.payload);
      if (index > -1) {
        state.value.filterList.splice(index, 1);
      }
    },
  },
});

export const { appendBedTypeToFilter, removeBedTypeFromFilter } =
  bedTypeFilterSlice.actions;

export const bedTypeFilter = (state: RootState) =>
  state.bedTypeFilterState.value;

export default bedTypeFilterSlice.reducer;
