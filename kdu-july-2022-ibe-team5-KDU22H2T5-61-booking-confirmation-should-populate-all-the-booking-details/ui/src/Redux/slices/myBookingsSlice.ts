import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import axios from "axios";

type obj = {
  bookingId: string;
  encryptedBookingId: string;
  amountDueAtResort: number;
  adultCount: number;
  childCount: number;
  roomCount: number;
  roomTypeName: "FAMILY_DELUXE";
  checkInDate: "2022-10-01T00:00:00.000Z";
  checkOutDate: "2022-10-04T00:00:00.000Z";
  promotionId: number;
  nightlyRate: number;
  subtotal: number;
  taxSurchargeFeeTotal: number;
  totalCost: number;
  guestDTO: {
    firstName: string;
    lastName: string;
    phone: number;
    email: string;
  };
  billingInfoDTO: {
    firstName: string;
    lastName: string;
    mailingAddress1: string;
    mailingAddress2: string;
    country: string;
    city: string;
    state: string;
    zip: number;
    phone: number;
    email: string;
    guestId: number;
  };
  roomTypeId: number;
  duration: number;
  bookingStatusDTO: {
    id: number;
    status: string;
    isDeactivated: false;
  };
  promotionDTO: {
    promotionId: number;
    minimumDaysOfStay: number;
    priceFactor: number;
    description: string;
    title: string;
  };
};

type progressLoader = boolean;

interface myBookingsState {
  value: [obj[], progressLoader];
}

const initialState: myBookingsState = {
  value: [
    [
      {
        bookingId: "1",
        encryptedBookingId: "cv3zIOOVJrF%20kj5YsdC51A==",
        amountDueAtResort: 176.44,
        adultCount: 2,
        childCount: 0,
        roomCount: 1,
        roomTypeName: "FAMILY_DELUXE",
        checkInDate: "2022-10-01T00:00:00.000Z",
        checkOutDate: "2022-10-04T00:00:00.000Z",
        promotionId: 6,
        nightlyRate: 160.0,
        subtotal: 480.0,
        taxSurchargeFeeTotal: 176.44,
        totalCost: 656.44,
        guestDTO: {
          firstName: "rohit",
          lastName: "test",
          phone: 9800160356,
          email: "aryan@rawat.com",
        },
        billingInfoDTO: {
          firstName: "rohit",
          lastName: "test",
          mailingAddress1: "ahsidkuhqikduhwqi",
          mailingAddress2: "dqwdqwdqwdqw",
          country: "Afghanistan",
          city: "delhi",
          state: "Delhi",
          zip: 12345,
          phone: 9800160356,
          email: "aryan@rawat.com",
          guestId: 940,
        },
        roomTypeId: 26,
        duration: 3,
        bookingStatusDTO: {
          id: 1,
          status: "BOOKED",
          isDeactivated: false,
        },
        promotionDTO: {
          promotionId: 6,
          minimumDaysOfStay: 2,
          priceFactor: 0.9,
          description:
            "Applies only if trip falls around a Saturday and Sunday",
          title: "Weekend discount",
        },
      },
    ],
    false,
  ],
};

export const fetchMyBookingsState = createAsyncThunk(
  "myBookingsState",
  (email: any) => {
    return axios
      .get(
        `
        ${process.env.REACT_APP_API_GATEWAY_BASE_URL}/confirmation/booking/user`,
        {
          params: { email: email },
          headers:{"x-api-key": process.env.REACT_APP_API_GATEWAY_API_KEY ?? ``}
        }
      )
      .then(function (res: any) {
        return res.data;
      })
      .catch((err) => console.log(`Oops, an error:\n${err}`));
  }
);

export const myBookingsSlice = createSlice({
  name: "myBookings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMyBookingsState.pending, (state, action) => {
      state.value[1] = true;
    });
    builder.addCase(fetchMyBookingsState.fulfilled, (state, action) => {
      state.value[0] = action.payload;
      state.value[1] = false;
      //console.log(state.value);
    });
  },
});

export const myBookingsState = (state: RootState) =>
  state.myBookingsState.value;

export default myBookingsSlice.reducer;
