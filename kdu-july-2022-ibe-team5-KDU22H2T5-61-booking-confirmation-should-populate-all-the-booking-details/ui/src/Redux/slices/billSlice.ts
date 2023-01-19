import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

type obj = {
  pricePerRoomOnCheckInDate: number;
  duration: number;
  subtotal: number;
  dueNow: number;
  occupancyTax: number;
  totalResortFee: number;
  totalAmount: number;
  dueAtResort: number;
  taxSurchargFeeTotal: number;
};

interface billState {
  value: obj;
}

const initialState: billState = {
  value: {
    pricePerRoomOnCheckInDate: localStorage.getItem('pricePerRoomOnCheckInDate') ? Number(localStorage.getItem('pricePerRoomOnCheckInDate')) : 0,
    duration: localStorage.getItem('subtotal') ? Number(localStorage.getItem('duration')) : 0,
    subtotal: localStorage.getItem('subtotal') ? Number(localStorage.getItem('subtotal')) : 0,
    dueNow: localStorage.getItem('dueNow') ? Number(localStorage.getItem('dueNow')) : 0,
    occupancyTax: localStorage.getItem('occupancyTax') ? Number(localStorage.getItem('occupancyTax')) : 0,
    totalResortFee: localStorage.getItem('totalResortFee') ? Number(localStorage.getItem('totalResortFee')) : 0,
    totalAmount: localStorage.getItem('totalAmount') ? Number(localStorage.getItem('totalAmount')) : 0,
    dueAtResort: localStorage.getItem('dueAtResort') ? Number(localStorage.getItem('dueAtResort')) : 0,
    taxSurchargFeeTotal: localStorage.getItem('taxSurchargFeeTotal') ? Number(localStorage.getItem('taxSurchargFeeTotal')) : 0,
  },
};

export const billSlice = createSlice({
  name: "bill",
  initialState,
  reducers: {
    setPricePerRoomOnCheckInDate: (state, action) => {
      state.value.pricePerRoomOnCheckInDate = action.payload;
      localStorage.setItem('pricePerRoomOnCheckInDate', action.payload);
    },
    setDuration: (state, action) => {
      state.value.duration = action.payload;
      localStorage.setItem('duration', action.payload);
    },
    setSubtotal: (state, action) => {
      state.value.subtotal = action.payload;
      localStorage.setItem('subtotal', action.payload);
    },
    setDueNow: (state, action) => {
      state.value.dueNow = action.payload;
      localStorage.setItem('dueNow', action.payload);
    },
    setOccupancyTax: (state, action) => {
      state.value.occupancyTax = action.payload;
      localStorage.setItem('occupancyTax', action.payload);
    },
    setTotalResortFee: (state, action) => {
      state.value.totalResortFee = action.payload;
      localStorage.setItem('totalResortFee', action.payload);
    },
    setTotalAmount: (state, action) => {
      state.value.totalAmount = action.payload;
      localStorage.setItem('totalAmount', action.payload);
    },
    setDueAtResort: (state, action) => {
      state.value.dueAtResort = action.payload;
      localStorage.setItem('dueAtResort', action.payload);
    },
    setTaxSurchargFeeTotal: (state, action) => {
      state.value.taxSurchargFeeTotal = action.payload;
      localStorage.setItem('taxSurchargFeeTotal', action.payload);
    },
  },
});

export const {
  setPricePerRoomOnCheckInDate,
  setDuration,
  setSubtotal,
  setDueNow,
  setOccupancyTax,
  setTotalResortFee,
  setTotalAmount,
  setDueAtResort,
  setTaxSurchargFeeTotal,
} = billSlice.actions;

export const bill = (state: RootState) => state.billState.value;

export default billSlice.reducer;
