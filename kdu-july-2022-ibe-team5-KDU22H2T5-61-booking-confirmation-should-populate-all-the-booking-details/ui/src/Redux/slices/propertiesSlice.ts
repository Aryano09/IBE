import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import axios from "axios";

type obj = {
  propertyName: string;
  propertyId: number;
};

interface propertiesState {
  value: obj[];
}

const initialState: propertiesState = {
  value: [
    {
      propertyName: "myProperty",
      propertyId: 1,
    },
  ],
};

export const fetchProperties = createAsyncThunk(
  "propertiesState/fetchProperties",
  () => {
    return axios
      .get(
        `${process.env.REACT_APP_API_GATEWAY_BASE_URL}/config/tenants/1/properties`,
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

export const propertiesSlice = createSlice({
  name: "properties",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProperties.fulfilled, (state, action) => {
      state.value = action.payload;
      // console.log(state.value);
    });
  },
});

export const properties = (state: RootState) => state.propertiesState.value;

export default propertiesSlice.reducer;
