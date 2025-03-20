import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CreateInvitation, Invitation } from "../utils/types";
import {
  getInvitationsByUserId,
  sendInvitation,
  updateInvitationStatus,
} from "../utils/api";

type InitialStateType = {
  invitations: Invitation[] | null;
  sucess: boolean;
  error: string | null;
};

const initialState: InitialStateType = {
  invitations: null,
  sucess: false,
  error: null,
};

export const fetchCreateInvitation = createAsyncThunk<
  Invitation,
  CreateInvitation,
  { rejectValue: string }
>(
  "invitation/fetchCreateInvitation",
  async ({ storyId, userId, token }, { rejectWithValue }) => {
    try {
      const response = await sendInvitation(storyId, userId, token);

      const data = await response.json();
      return data;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchGetInvitations = createAsyncThunk<
  Invitation[],
  { id: string; token: string },
  { rejectValue: string }
>(
  "invitation/fetchGetInvitation",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const response = await getInvitationsByUserId(id, token);

      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchUpdateInvitation = createAsyncThunk<
  Invitation,
  { userId: string; token: string },
  { rejectValue: string }
>(
  "invitation/fetchUpdateInvitation",
  async ({ userId, token }, { rejectWithValue }) => {
    try {
      const response = await updateInvitationStatus(userId, token);

      const data = await response.json();
      return data;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      return rejectWithValue(errorMessage);
    }
  }
);

export const invitationSlice = createSlice({
  name: "invitation",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchGetInvitations.fulfilled,
      (state, action: PayloadAction<Invitation[]>) => {
        state.invitations = action.payload;
      }
    );
    builder.addCase(fetchGetInvitations.rejected, (state, action) => {
      state.error = action.payload || "An unexpected error occurred";
    });

    builder.addCase(fetchCreateInvitation.fulfilled, (state) => {
      state.sucess = true;
      state.error = null;
    });
    builder.addCase(fetchCreateInvitation.rejected, (state, action) => {
      state.sucess = false;
      state.error = action.payload || "An unexpected error occurred";
    });
    builder.addCase(fetchUpdateInvitation.fulfilled, (state) => {
      state.sucess = true;
      state.error = null;
    });
    builder.addCase(fetchUpdateInvitation.rejected, (state, action) => {
      state.sucess = false;
      state.error = action.payload || "An unexpected error occurred";
    });
  },
});

export const {} = invitationSlice.actions;

export default invitationSlice.reducer;
