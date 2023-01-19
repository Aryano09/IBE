import { createSlice } from "@reduxjs/toolkit";
import { addDays, format } from "date-fns";
import type { RootState } from "../store";

type obj = {
  checkInDate: Date;
  checkOutDate: Date;
};

interface selectedDatesState {
  value: obj;
}

const initialState: selectedDatesState = {
  value: {
    checkInDate: new Date(),
    checkOutDate: addDays(new Date(), 2),
  },
};

export const selectedDatesSlice = createSlice({
  name: "selectedDates",
  initialState,
  reducers: {
    updateDates: (state, action) => {
      state.value.checkInDate = addDays(action.payload.startDate, 1);
      state.value.checkOutDate = addDays(action.payload.endDate, 1);
      localStorage.setItem('checkInDate', state.value.checkInDate.toISOString().split('T')[0] + 'T00:00:00.000Z');
      localStorage.setItem('checkOutDate', state.value.checkOutDate.toISOString().split('T')[0] + 'T00:00:00.000Z');
      // console.log('in ', localStorage.getItem('checkInDate'));
      // console.log('out ', localStorage.getItem('checkOutDate'));
      
    },
  },
});

export const { updateDates } = selectedDatesSlice.actions;

export const selectedDates = (state: RootState) =>
  state.selectedDatesState.value;

export default selectedDatesSlice.reducer;
