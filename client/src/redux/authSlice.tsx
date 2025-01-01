import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../utils/types";
import { logIn } from "../utils/api";

type InitialStateType = {
  user: User | null;
  token: string | null;
  registerAccepted: boolean | null;
  error: string | null;
};

const initialState: InitialStateType = {
  user: null,
  token: null,
  registerAccepted: null,
  error: null,
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
    return (await response.json()) as LogInResponse;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return rejectWithValue(errorMessage);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getUserToken.fulfilled,
      (state, action: PayloadAction<LogInResponse>) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      }
    ),
      builder.addCase(getUserToken.rejected, (state, action) => {
        state.error = action.payload || "An unexpected error occurred";
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
