import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import axios from "axios";

type obj = {
  id: number;
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  background: string;
};

interface themeState {
  value: obj;
}

const initialState: themeState = {
  value: {
    id: 1,
    primaryColor: "#26266d",
    secondaryColor: "white",
    backgroundColor: "rgb(107,114,128)",
    background: `url("https://daedayib1baqz.cloudfront.net/sunnyBackground.jpg")`,
  },
};

export const fetchTheme = createAsyncThunk("themeState/fetchTheme", () => {
  return axios
  .get(
    `${process.env.REACT_APP_API_GATEWAY_BASE_URL}/config/tenants/1/theme`,
    {
      headers: {
        "x-api-key": process.env.REACT_APP_API_GATEWAY_API_KEY ?? ``,
      },
    }
  )
    .then(function (res: any) {
      return res.data;
    });
});

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTheme.fulfilled, (state, action) => {
      state.value = action.payload;
      document.documentElement.style.setProperty(
        "--primaryColor",
        state.value.primaryColor
      );
      document.documentElement.style.setProperty(
        "--secondaryColor",
        state.value.secondaryColor
      );
      document.documentElement.style.setProperty(
        "--backgroundColor",
        state.value.backgroundColor
      );
      document.documentElement.style.setProperty(
        "--background",
        state.value.background
      );
      // console.log(
      //   getComputedStyle(document.documentElement).getPropertyValue(
      //     "--primaryColor"
      //   )
      // );
      // console.log(
      //   getComputedStyle(document.documentElement).getPropertyValue(
      //     "--secondaryColor"
      //   )
      // );
      // console.log(
      //   getComputedStyle(document.documentElement).getPropertyValue(
      //     "--backgroundColor"
      //   )
      // );
      // console.log(
      //   getComputedStyle(document.documentElement).getPropertyValue(
      //     "--background"
      //   )
      // );
      // document.documentElement.style.setProperty('--labelColor', state.value.labelColor);
      // document.documentElement.style.setProperty('--borderColor', state.value.borderColor);
      // document.documentElement.style.setProperty('--fontFamily', state.value.fontFamily);
    });
  },
});

export const theme = (state: RootState) => state.themeState.value;

export default themeSlice.reducer;
