import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

type obj = {
    firstName: string,
    lastName: string,
    mailingAddress1:string,
    mailingAddress2:string,
    country:string,
    city:string,
    state:string,
    zip:number,
    phone: number,
    email:string,
    guestId: number,
};

interface billingInfoState {
  value: obj;
}

const initialState: billingInfoState = {
  value: {
    firstName: "",
    lastName: "",
    mailingAddress1:"",
    mailingAddress2:"",
    country:"",
    city:"",
    state:"",
    zip:0,
    phone: 0,
    email:"",
    guestId: 0,
  },
};

export const billingInfoSlice = createSlice({
  name: "billingInfoState",
  initialState,
  reducers: {
    createBilllingInfo: (state, action) => {
        state.value.firstName = action.payload.firstName;
        state.value.lastName = action.payload.lastName;
        state.value.mailingAddress1 = action.payload.mailingAddress1;
        state.value.mailingAddress2 = action.payload.mailingAddress2;
        state.value.country = action.payload.country;
        state.value.city = action.payload.city;
        state.value.state = action.payload.state;
        state.value.zip = action.payload.zip;
        state.value.phone = action.payload.phone;
        state.value.email = action.payload.email;
    },
    setGuestId : (state,action) => {
        state.value.guestId = action.payload;
    }
  },
});

export const {
    createBilllingInfo,
    setGuestId,
} = billingInfoSlice.actions;

export const billingInfoState = (state: RootState) => state.billingInfoState.value;

export default billingInfoSlice.reducer;
