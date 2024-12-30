import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../utils/types";
import { logIn } from "../utils/api";

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

type LogInData = {
  username: string;
  password: string;
};

type LogInResponse = {
  user: User;
  token: string;
};

export const getUserToken = createAsyncThunk<
  LogInResponse,
  LogInData,
  { rejectValue: string }
>("token/getUserToken", async ({ username, password }, { rejectWithValue }) => {
  try {
    const response = await logIn(username, password);
    return response;
  } catch (error) {
    return rejectWithValue("Something went wrong");
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state, action) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getUserToken.fulfilled,
      (state, action: PayloadAction<LogInResponse>) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
      }
    );
  },
});

export default authSlice.reducer;
