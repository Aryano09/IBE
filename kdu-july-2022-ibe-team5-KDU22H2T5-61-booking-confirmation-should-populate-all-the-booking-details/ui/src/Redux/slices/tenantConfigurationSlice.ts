import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import axios from "axios";

type obj = {
  showGuests: boolean;
  showAdults: boolean;
  showTeens: boolean;
  showKids: boolean;
  showAccessibleRoom: boolean;
  showPromoCode: boolean;
  roomLimit: number;
  resortFeePerRoomPerDay: number;
  occupancyTaxRate: number;
};

interface tenantConfigurationState {
  value: obj;
}

const initialState: tenantConfigurationState = {
  value: {
    showGuests: true,
    showAdults: true,
    showTeens: true,
    showKids: true,
    showAccessibleRoom: true,
    showPromoCode: true,
    roomLimit: 3,
    resortFeePerRoomPerDay: 37.42,
    occupancyTaxRate: 13.37,
  },
};

export const fetchTenantConfiguration = createAsyncThunk(
  "tenantConfigurationState/fetchTenantConfiguration",
  () => {
    return axios
    .get(
      `${process.env.REACT_APP_API_GATEWAY_BASE_URL}/config/tenants/1`,
      {
        headers: {
          "x-api-key": process.env.REACT_APP_API_GATEWAY_API_KEY ?? ``,
        },
      }
    )
      .then(function (res: any) {
        return res.data;
      });
  }
);

export const tenantConfigurationSlice = createSlice({
  name: "tenantConfiguration",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTenantConfiguration.fulfilled, (state, action) => {
      state.value = action.payload;
    });
  },
});

export const tenantConfiguration = (state: RootState) => state.themeState.value;

export default tenantConfigurationSlice.reducer;

