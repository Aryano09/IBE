import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Action } from "history";
import type { RootState } from "../store";
import axios from "axios";
import { useAppSelector } from "../hooks";

type obj = {
  roomTypeId: number;
  area: number;
  doubleBed: number;
  maxCapacity: number;
  name: string;
  singleBed: number;
  basicNightlyRate: number;
  imageUrls: string[];
  description: string;
  amenityIds: number[];
};

interface roomTypesState {
  value: obj[];
}

const initialState: roomTypesState = {
  value: [
    // {
    //     area: 450.0,
    //     doubleBed: 2,
    //     maxCapacity: 4,
    //     name: "GRAND_DELUXE",
    //     singleBed: 1,
    //     basicNightlyRate: 110.0,
    //     imageUrls: [
    //     "url(https://ibe-t5-static.s3.amazonaws.com/grand_deluxe_1.jpeg)",
    //     "url(https://ibe-t5-static.s3.amazonaws.com/grand_deluxe_2.jpeg)",
    //     "url(https://ibe-t5-static.s3.amazonaws.com/grand_deluxe_3.jpeg)",
    //     ],
    // },
  ],
};

export const fetchRoomTypes = createAsyncThunk(
  "roomTypesState/fetchRoomTypes",
  (obj: any) => {
    // let selectedPropertyState = useAppSelector((state) => state.selectedPropertyState.value);
    // let propertyId = selectedPropertyState.id;
    // let selectedDatesState = useAppSelector((state) => state.selectedDatesState.value);
    // let checkInDate = selectedDatesState.checkInDate;
    // let checkOutDate = selectedDatesState.checkOutDate;
    // let guestCountState = useAppSelector((state) => state.guestCountState.value);
    // let totalGuests = guestCountState.adultsCount + guestCountState.teensCount + guestCountState.kidsCount;
    // let bedCountState = useAppSelector((state) => state.bedCountState.value);
    // let totalBeds = bedCountState.bedCount;
    // let selectedRoomCountState = useAppSelector((state) => state.selectedRoomCountState.value);
    // let totalRooms = selectedRoomCountState;
    // let url = `http://ibe-t5-alb-181387793.eu-west-3.elb.amazonaws.com/api/graphql/property/${propertyId}/search/rooms?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&guests=${totalGuests}&beds=${totalBeds}&rooms=${totalRooms}`;
    // console.log(`Fetch url : ${url}`);
    return (
      axios
        .get(
          `${process.env.REACT_APP_API_GATEWAY_BASE_URL}/graphql/property/${obj.propertyId}/search/rooms?checkInDate=${obj.checkInDate}&checkOutDate=${obj.checkOutDate}&guests=${obj.totalGuests}&beds=${obj.totalBeds}&rooms=${obj.totalRooms}`,
          {
            headers: {
              "x-api-key": process.env.REACT_APP_API_GATEWAY_API_KEY ?? ``,
            },
          }
        )
        // .get(`http://ibe-t5-alb-181387793.eu-west-3.elb.amazonaws.com/api/graphql/property/${obj.propertyId}/search/rooms?checkInDate=${obj.checkInDate}&checkOutDate=${obj.checkOutDate}&guests=${obj.totalGuests}&beds=${obj.totalBeds}&rooms=${obj.totalRooms}`)
        // .get(`http://localhost:8080/api/graphql/property/${obj.propertyId}/search/rooms?checkInDate=${obj.checkInDate}&checkOutDate=${obj.checkOutDate}&guests=${obj.totalGuests}&beds=${obj.totalBeds}&rooms=${obj.totalRooms}`)
        .then(function (res: any) {
          return res.data;
        })
        .catch((err) => console.log(`Oops, an error:\n${err}`))
    );
  }
);

export const roomTypesSlice = createSlice({
  name: "roomTypes",
  initialState,
  reducers: {
    sortRoomTypesByPrice: (state, action) => {
      if (action.payload === "ASC") {
        state.value.sort((a, b) => b.basicNightlyRate - a.basicNightlyRate);
      } else if (action.payload === "DSC") {
        state.value.sort((a, b) => a.basicNightlyRate - b.basicNightlyRate);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRoomTypes.fulfilled, (state, action) => {
      state.value = action.payload;
      // console.log(state.value);
    });
  },
});

export const { sortRoomTypesByPrice } = roomTypesSlice.actions;

export const roomTypes = (state: RootState) => state.roomTypesState.value;

export default roomTypesSlice.reducer;
