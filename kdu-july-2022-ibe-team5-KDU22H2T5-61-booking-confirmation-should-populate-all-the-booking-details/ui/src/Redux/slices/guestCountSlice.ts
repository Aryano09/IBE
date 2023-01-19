import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import axios from "axios";

type obj = {
  adultsCount: number;
  teensCount: number;
  kidsCount: number;
};

interface guestCountState {
  value: obj;
}

const initialState: guestCountState = {
  value: {
    adultsCount: localStorage.getItem('adultsCount') != null ? Number(localStorage.getItem('adultsCount')) : Number(localStorage.getItem('totalGuests')),
    teensCount: localStorage.getItem('teensCount') != null ? Number(localStorage.getItem('teensCount')) : 0,
    kidsCount: localStorage.getItem('kidsCount') != null ? Number(localStorage.getItem('kidsCount')) : 0,
  },
};

export const guestCountSlice = createSlice({
  name: "guestCount",
  initialState,
  reducers: {
    incrementAdultsCount: (state) => {
      state.value.adultsCount += 1;
      localStorage.setItem('totalGuests', (state.value.adultsCount + state.value.teensCount + state.value.kidsCount).toString());
      localStorage.setItem('adultsCount', state.value.adultsCount.toString());
    },
    incrementTeensCount: (state) => {
      state.value.teensCount += 1;
      localStorage.setItem('totalGuests', (state.value.adultsCount + state.value.teensCount + state.value.kidsCount).toString());
      localStorage.setItem('teensCount', state.value.teensCount.toString());
    },
    incrementKidsCount: (state) => {
      state.value.kidsCount += 1;
      localStorage.setItem('totalGuests', (state.value.adultsCount + state.value.teensCount + state.value.kidsCount).toString());
      localStorage.setItem('kidsCount', state.value.kidsCount.toString());
    },
    decrementAdultsCount: (state) => {
      if (state.value.adultsCount > 0) {
        state.value.adultsCount -= 1;
      localStorage.setItem('totalGuests', (state.value.adultsCount + state.value.teensCount + state.value.kidsCount).toString());
      localStorage.setItem('adultsCount', state.value.adultsCount.toString());
    }},
    decrementTeensCount: (state) => {
      if (state.value.teensCount > 0) {
        state.value.teensCount -= 1;
      localStorage.setItem('totalGuests', (state.value.adultsCount + state.value.teensCount + state.value.kidsCount).toString());
      localStorage.setItem('teensCount', state.value.teensCount.toString());
    }},
    decrementKidsCount: (state) => {
      if (state.value.kidsCount > 0) {
        state.value.kidsCount -= 1;
      localStorage.setItem('totalGuests', (state.value.adultsCount + state.value.teensCount + state.value.kidsCount).toString());
      localStorage.setItem('kidsCount', state.value.kidsCount.toString());
    }},
  },
});

export const {
  incrementAdultsCount,
  incrementTeensCount,
  incrementKidsCount,
  decrementAdultsCount,
  decrementTeensCount,
  decrementKidsCount,
} = guestCountSlice.actions;

export const guestCount = (state: RootState) => state.guestCountState.value;

export default guestCountSlice.reducer;