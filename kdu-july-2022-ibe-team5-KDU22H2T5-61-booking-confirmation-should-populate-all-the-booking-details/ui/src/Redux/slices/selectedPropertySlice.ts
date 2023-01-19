import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

type obj = {
  name: string;
  id: number;
};

interface selectedPropertyState {
  value: obj;
}

const initialState: selectedPropertyState = {
  value: {
    name: "Team 1 Hotel",
    id: 1,
  },
};

export const selectedPropertySlice = createSlice({
  name: "selectedProperty",
  initialState,
  reducers: {
    changeProperty: (state, action) => {
      state.value.name = action.payload.propertyName;
      state.value.id = action.payload.propertyId;
      localStorage.setItem('propertyId', state.value.id.toString());
      localStorage.setItem('propertyName', state.value.name);
    },
  },
});

export const {
    changeProperty
} = selectedPropertySlice.actions;

export const selectedProperty = (state: RootState) => state.selectedPropertyState.value;

export default selectedPropertySlice.reducer;
