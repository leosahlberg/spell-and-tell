import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../utils/types";
import { logIn, registerUser, updateUserprofile } from "../utils/api";

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

type RegistrationData = {
  name: string;
  username: string;
  email: string;
  password: string;
};

type RegistrationRespons = {
  message: string;
};

type LogInResponse = {
  user: User;
  token: string;
};

type UpdateUserRequest = {
  userId: string;
  imgUrl: string;
  name: string;
  email: string;
};

export const fetchLogin = createAsyncThunk<
  LogInResponse,
  LogInData,
  { rejectValue: string }
>("user/fetchLogin", async ({ username, password }, { rejectWithValue }) => {
  try {
    const response = await logIn(username, password);

    const data = (await response.json()) as LogInResponse;
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    return data;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return rejectWithValue(errorMessage);
  }
});

export const fetchRegistrateUser = createAsyncThunk<
  RegistrationRespons,
  RegistrationData,
  { rejectValue: string }
>(
  "user/fetchRegistrateUser",
  async ({ name, username, email, password }, { rejectWithValue }) => {
    try {
      const response = await registerUser(
        name,
        username,
        email,
        password,
        "/src/assets/profile_default.png"
      );
      return (await response.json()) as RegistrationRespons;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchUpdateUserProfile = createAsyncThunk<
  User,
  UpdateUserRequest,
  { rejectValue: string }
>(
  "user/fetchUpdateUserProfile",
  async ({ userId, imgUrl, name, email }, { rejectWithValue }) => {
    try {
      const response = await updateUserprofile(userId, imgUrl, name, email);
      return (await response.json()) as User;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      return rejectWithValue(errorMessage);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    updateProfile: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchLogin.fulfilled,
      (state, action: PayloadAction<LogInResponse>) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      }
    );
    builder.addCase(fetchLogin.rejected, (state, action) => {
      state.error = action.payload || "An unexpected error occurred";
    });

    builder.addCase(fetchRegistrateUser.fulfilled, (state) => {
      state.registerAccepted = true;
      state.error = null;
    });
    builder.addCase(fetchRegistrateUser.rejected, (state, action) => {
      state.registerAccepted = false;
      state.error = action.payload || "An unexpected error occurred";
    });
    builder.addCase(
      fetchUpdateUserProfile.fulfilled,
      (state, action: PayloadAction<User>) => {
        state.user = action.payload;
      }
    );
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
