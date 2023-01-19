import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import themeSlice from "./slices/themeSlice";
import tenantConfigurationSlice from "./slices/tenantConfigurationSlice";
import guestCountSlice from "./slices/guestCountSlice";
import propertiesSlice from "./slices/propertiesSlice";
import bedCountSlice from "./slices/bedCountSlice";
import roomCountSlice from "./slices/roomCountSlice";
import tenantNameSlice from "./slices/tenantNameSlice";
import selectedPropertySlice from "./slices/selectedPropertySlice";
import selectedRoomCountSlice from "./slices/selectedRoomCountSlice";
import selectedDatesSlice from "./slices/selectedDatesSlice";
import roomTypesSlice from "./slices/roomTypesSlice";
import roomTypeModalSlice from "./slices/roomTypeModalSlice";
import promotionsSlice from "./slices/promotionsSlice";
import roomAmenitiesSlice from "./slices/roomAmenitiesSlice";
import dealsAndPackagesSlice from "./slices/dealsAndPackagesSlice";
import dealsCategorySlice from "./slices/dealsCategorySlice";
import dateCalenderRatesSlice from "./slices/dateCalenderRatesSlice";
import textsSlice from "./slices/textsSlice";
import guestSlice from "./slices/BookingSlices/guestSlice";
import billingInfoSlice from "./slices/BookingSlices/billingInfoSlice";
import renderSlice from "./slices/BookingSlices/renderSlice";
import roomTypeRoomRateSlice from "./slices/roomTypeRoomRateSlice";
import billSlice from "./slices/billSlice";
import confirmationInfoState from "./slices/ConfirmationSlices/ConfirmationInfo";
import tripItenarySlice from "./slices/tripItenarySlice";
import userSlice from "./slices/userSlice";
import myBookingsSlice from "./slices/myBookingsSlice";
import errorMessageSlice from "./slices/errorMessageSlice";
import roomTypeFilterSlice from "./slices/FilterSlices/RoomTypeFilterSlice";
import BedTypeFilterSlice from "./slices/FilterSlices/BedTypeFilterSlice";
import roomTypeSorterSlice from "./slices/roomTypeSorterSlice";
import RoomTypeReviewsSlice from "./slices/RoomTypeReviewsSlice";
import roomTypeRatingsSlice from "./slices/roomTypeRatingsSlice";
import progressLoadersSlice from "./slices/progressLoadersSlice";

export const store = configureStore({
  reducer: {
    themeState: themeSlice,
    tenantConfigurationState: tenantConfigurationSlice,
    guestCountState: guestCountSlice,
    propertiesState: propertiesSlice,
    bedCountState: bedCountSlice,
    roomCountState: roomCountSlice,
    roomTypesState: roomTypesSlice,
    tenantNameState: tenantNameSlice,
    selectedPropertyState: selectedPropertySlice,
    selectedRoomCountState: selectedRoomCountSlice,
    selectedDatesState: selectedDatesSlice,
    roomTypeModalState: roomTypeModalSlice,
    promotionsState: promotionsSlice,
    roomAmenitiesState: roomAmenitiesSlice,
    dealsAndPackagesState: dealsAndPackagesSlice,
    dealsCategoryState: dealsCategorySlice,
    dateCalenderRatesState: dateCalenderRatesSlice,
    textsState: textsSlice,
    guestState: guestSlice,
    billingInfoState: billingInfoSlice,
    renderState: renderSlice,
    roomTypeRoomRateState: roomTypeRoomRateSlice,
    billState: billSlice,
    confirmationInfoState: confirmationInfoState,
    tripItenaryState: tripItenarySlice,
    userState: userSlice,
    myBookingsState: myBookingsSlice,
    errorMessageState: errorMessageSlice,
    roomTypeFilterState: roomTypeFilterSlice,
    bedTypeFilterState: BedTypeFilterSlice,
    roomTypeSorterState: roomTypeSorterSlice,
    roomTypeReviewsState: RoomTypeReviewsSlice,
    roomTypeRatingsState: roomTypeRatingsSlice,
    progressLoadersState: progressLoadersSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
