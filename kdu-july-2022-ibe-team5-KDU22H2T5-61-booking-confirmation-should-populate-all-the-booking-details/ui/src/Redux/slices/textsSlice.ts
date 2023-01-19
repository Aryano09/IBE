import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

type obj = {
  brandName: string;
  originalBrandName: string;
  propertyLabel: string;
  originalPropertyLabel: string;
  propertySearchLabel: string;
  originalPropertySearchLabel: string;
  datePickerLabel: string;
  originalDatePickerLabel: string;
  guestsLabel: string;
  originalGuestsLabel: string;
  roomsLabel: string;
  originalRoomsLabel: string;
  accessibleLabel: string;
  originalAccessibleLabel: string;
  promoCodeLabel: string;
  originalPromoCodeLabel: string;
  adultsLabel: string;
  originalAdultsLabel: string;
  teensLabel: string;
  originalTeensLabel: string;
  kidsLabel: string;
  originalKidsLabel: string;
  adultsLabelDescription: string;
  originalAdultsLabelDescription: string;
  teensLabelDescription: string;
  originalTeensLabelDescription: string;
  kidsLabelDescription: string;
  originalKidsLabelDescription: string;
};

interface textsState {
  value: obj;
}

const initialState: textsState = {
  value: {
    brandName: `Internet Booking Engine`,
    originalBrandName: `Internet Booking Engine`,
    propertyLabel: `Property name`,
    originalPropertyLabel: `Property name`,
    propertySearchLabel: `Search all Properties`,
    originalPropertySearchLabel: `Search all Properties`,
    datePickerLabel: `Select dates`,
    originalDatePickerLabel: `Select dates`,
    guestsLabel: `Guests`,
    originalGuestsLabel: `Guests`,
    roomsLabel: `Rooms`,
    originalRoomsLabel: `Rooms`,
    accessibleLabel: `I need an Accessible Room`,
    originalAccessibleLabel: `I need an Accessible Room`,
    promoCodeLabel: `Promo code or special rate`,
    originalPromoCodeLabel: `Promo code or special rate`,
    adultsLabel: `Adults`,
    originalAdultsLabel: `Adults`,
    teensLabel: `Teens`,
    originalTeensLabel: `Teens`,
    kidsLabel: `Kids`,
    originalKidsLabel: `Kids`,
    adultsLabelDescription: `Ages 18+`,
    originalAdultsLabelDescription: `Ages 18+`,
    teensLabelDescription: `Ages 13-17`,
    originalTeensLabelDescription: `Ages 13-17`,
    kidsLabelDescription: `Ages 0-12`,
    originalKidsLabelDescription: `Ages 0-12`,
  },
};

export const textsSlice = createSlice({
  name: "texts",
  initialState,
  reducers: {
    setBrandName: (state, action) => {
      state.value.brandName = action.payload;
    },
    setPropertyLabel: (state, action) => {
      state.value.propertyLabel = action.payload;
    },
    setPropertySearchLabel: (state, action) => {
      state.value.propertySearchLabel = action.payload;
    },
    setDatePickerLabel: (state, action) => {
      state.value.datePickerLabel = action.payload;
    },
    setGuestsLabel: (state, action) => {
      state.value.guestsLabel = action.payload;
    },
    setRoomsLabel: (state, action) => {
      state.value.roomsLabel = action.payload;
    },
    setAccessibleLabel: (state, action) => {
      state.value.accessibleLabel = action.payload;
    },
    setPromoCodeLabel: (state, action) => {
      state.value.promoCodeLabel = action.payload;
    },
    setAdultsLabel: (state, action) => {
      state.value.adultsLabel = action.payload;
    },
    setTeensLabel: (state, action) => {
      state.value.teensLabel = action.payload;
    },
    setKidsLabel: (state, action) => {
      state.value.kidsLabel = action.payload;
    },
    setAdultsLabelDescription: (state, action) => {
      state.value.adultsLabelDescription = action.payload;
    },
    setTeensLabelDescription: (state, action) => {
      state.value.teensLabelDescription = action.payload;
    },
    setKidsLabelDescription: (state, action) => {
      state.value.kidsLabelDescription = action.payload;
    },
  },
});

export const {
  setBrandName,
  setPropertyLabel,
  setPropertySearchLabel,
  setDatePickerLabel,
  setGuestsLabel,
  setRoomsLabel,
  setAccessibleLabel,
  setPromoCodeLabel,
  setAdultsLabel,
  setTeensLabel,
  setKidsLabel,
  setAdultsLabelDescription,
  setTeensLabelDescription,
  setKidsLabelDescription,
} = textsSlice.actions;

export const texts = (state: RootState) => state.textsState.value;

export default textsSlice.reducer;
