import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import axios from "axios";
import { NONAME } from "dns";

type obj = {
  name: string
};

interface tenantNameState {
  value: obj;
}

const initialState: tenantNameState = {
  value: {
    name: "kdu-hotels",
  },
};

export const fetchTenantName = createAsyncThunk(
  "tenantNameState/fetchTenantName",
  () => {
    return axios
     // .get("http://ibe-t5-alb-181387793.eu-west-3.elb.amazonaws.com/api/graphql/tenant/1/name")
     .get(`${process.env.REACT_APP_API_GATEWAY_BASE_URL}/graphql/tenant/1/name`, {headers:{"x-api-key": process.env.REACT_APP_API_GATEWAY_API_KEY ?? ``}})
      .then(function (res: any) {
        return res.data;
      });
  }
);

export const tenantNameSlice = createSlice({
  name: "tenantName",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTenantName.fulfilled, (state, action) => {
      state.value.name = action.payload.data.getTenant.tenant_name;
    });
  },
});

export const tenantName = (state: RootState) => state.themeState.value;

export default tenantNameSlice.reducer;

