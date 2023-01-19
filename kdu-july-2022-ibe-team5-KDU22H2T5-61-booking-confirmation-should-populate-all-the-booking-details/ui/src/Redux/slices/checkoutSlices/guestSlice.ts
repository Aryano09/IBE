import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

type obj = {
    firstName: string,
    lastName: string,
    phone: number,
    email:string,
};

interface guestState {
  value: obj;
}

const initialState: guestState = {
  value: {
    firstName: "Test",
    lastName: "User1",
    phone: 9999888822,
    email: "Test@User1.com"
  },
};

export const guestSlice = createSlice({
  name: "guestState",
  initialState,
  reducers: {
    createGuest: (state, action) => {
        state.value.firstName = action.payload.firstName;
        state.value.lastName = action.payload.lastName;
        state.value.phone = action.payload.phone;
        state.value.email = action.payload.email;
    }
  },
});

export const {
    createGuest,
} = guestSlice.actions;

export const guestState = (state: RootState) => state.guestState.value;

export default guestSlice.reducer;
