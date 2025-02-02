import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../utils/types";
import { getStorys } from "../utils/api";

type InitialStateType = {
  stories: Story[];
};

const initialState: InitialStateType = {
  stories: [],
};

type RouleSet = {
  maxNumberOfWordsPerCpntribution: Number;
  numberOfContribution: Number;
  maxTime: Number;
  scoring: Boolean;
  spellChecking: Boolean;
  type: "default" | "custom";
};

type Story = {
  title: String;
  created: Date;
  status: "created" | "in progress" | "completed";
  score: Number;
  rouleSet: RouleSet;
  user: User;
};

export const fetchPublicStories = createAsyncThunk<
  Story[],
  { rejectValue: string }
>("story/fetchPublicStories", async (_, { rejectWithValue }) => {
  try {
    const response = await getStorys();
    return await response.json();
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return rejectWithValue(errorMessage);
  }
});

export const storySlice = createSlice({
  name: "story",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchPublicStories.fulfilled,
      (state, action: PayloadAction<Story[]>) => {
        state.stories = action.payload;
      }
    );
    builder.addCase(fetchPublicStories.rejected, (state, action) => {});
  },
});

export const {} = storySlice.actions;

export default storySlice.reducer;
