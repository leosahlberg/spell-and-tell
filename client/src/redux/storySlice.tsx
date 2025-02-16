import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Story } from "../utils/types";
import { createStory, getStorys } from "../utils/api";

type InitialStateType = {
  stories: Story[];
};

const initialState: InitialStateType = {
  stories: [],
};

type CreateStory = {
  title: string;
  id: string;
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

export const fetchcreateStory = createAsyncThunk<
  Story[],
  CreateStory,
  { rejectValue: string }
>("story/fetchPublicStories", async ({ title, id }, { rejectWithValue }) => {
  try {
    const response = await createStory(title, id);
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
