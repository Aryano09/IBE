import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

type obj = {
  isLoggedIn: boolean;
  username: string;
  password: string;
  email: string;
};

interface userState {
  value: obj;
}

const initialState: userState = {
  value: {
    isLoggedIn: false,
    username: ``,
    password: ``,
    email: ``,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.value.isLoggedIn = action.payload;
    },
    setUsername: (state, action) => {
      state.value.username = action.payload;
    },
    setPassword: (state, action) => {
      state.value.password = action.payload;
    },
    setEmail: (state, action) => {
      state.value.email = action.payload;
    },
  },
});

export const { setIsLoggedIn, setUsername, setPassword, setEmail } =
  userSlice.actions;

export const user = (state: RootState) => state.userState.value;

export default userSlice.reducer;
