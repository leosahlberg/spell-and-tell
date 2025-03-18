import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Story, CreateStory } from "../utils/types";
import { createStory, deleteStory, getStorys } from "../utils/api";

type InitialStateType = {
  stories: Story[];
  created: Story | null;
};

const initialState: InitialStateType = {
  stories: [],
  created: null,
};

export const fetchPublicStories = createAsyncThunk<
  Story[],
  string,
  { rejectValue: string }
>("story/fetchPublicStories", async (token, { rejectWithValue }) => {
  try {
    const response = await getStorys(token);

    const data = await response.json();
    return data;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return rejectWithValue(errorMessage);
  }
});

export const fetchCreateStory = createAsyncThunk<
  Story,
  CreateStory,
  { rejectValue: string }
>(
  "story/fetchCreateStories",
  async (
    {
      title,
      id,
      imgUrl,
      text,
      numberOfContributors,
      maxNumberOfWordsPerContribution,
      maxTime,
      spellChecking,
      scoring,
      score,
      token,
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await createStory(
        title,
        id,
        imgUrl,
        text,
        numberOfContributors,
        maxNumberOfWordsPerContribution,
        maxTime,
        spellChecking,
        scoring,
        score,
        token
      );
      return await response.json();
    } catch (error) {
      console.log(error);
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchDeleteStory = createAsyncThunk<
  string,
  { id: string; token: string },
  { rejectValue: string }
>("story/fetchDeleteStory", async ({ id, token }, { rejectWithValue }) => {
  try {
    await deleteStory(id, token);
    return id;
  } catch (error) {
    console.log(error);
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
    builder.addCase(
      fetchCreateStory.fulfilled,
      (state, action: PayloadAction<Story>) => {
        state.created = action.payload;
      }
    );
    builder.addCase(fetchDeleteStory.fulfilled, (state, action) => {
      state.stories = state.stories.filter(
        (story) => story._id !== action.payload
      );
    });
  },
});

export const {} = storySlice.actions;

export default storySlice.reducer;
