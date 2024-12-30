import { createSlice } from "@reduxjs/toolkit";
import { User } from "../utils/types";

type InitialStateType = {
  user: User | null;
  token: string | null;
  registerAccepted: boolean | null;
};

const initialState: InitialStateType = {
  user: null,
  token: null,
  registerAccepted: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state, action) => {
      state.user = null;
      state.token = null;
    },
  },
});

export default authSlice.reducer;
