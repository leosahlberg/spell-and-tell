import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PublicUser } from "../utils/types";
import { getUsers } from "../utils/api";

type InitialStateType = {
  users: PublicUser[] | null;
  sucess: boolean;
  error: string | null;
};

const initialState: InitialStateType = {
  users: null,
  sucess: false,
  error: null,
};

export const fetchGetAllUsers = createAsyncThunk<
  PublicUser[],
  { token: string },
  { rejectValue: string }
>("user/fetchGetAllUsers", async ({ token }, { rejectWithValue }) => {
  try {
    const response = await getUsers(token);

    const data = await response.json();
    return data;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return rejectWithValue(errorMessage);
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchGetAllUsers.fulfilled,
      (state, action: PayloadAction<PublicUser[]>) => {
        state.users = action.payload;
      }
    );
    builder.addCase(fetchGetAllUsers.rejected, (state, action) => {
      state.error = action.payload || "An unexpected error occurred";
    });
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
