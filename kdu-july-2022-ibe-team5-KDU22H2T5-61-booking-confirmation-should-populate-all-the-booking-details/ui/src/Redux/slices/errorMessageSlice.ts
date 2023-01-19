import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

type obj = {
  message: string;
};

interface errorMessageState {
  value: obj;
}

const initialState: errorMessageState = {
  value: {
    message: "Hello this is the message page",
  },
};

export const errorMessageSlice = createSlice({
  name: "errorMessage",
  initialState,
  reducers: {
    setErrorMessage: (state, action) => {
      state.value.message = action.payload;
    },
  },
});

export const { setErrorMessage } = errorMessageSlice.actions;

export const errorMessage = (state: RootState) => state.errorMessageState.value;

export default errorMessageSlice.reducer;
