import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Story, CreateStory } from "../utils/types";
import {
  createStory,
  deleteStory,
  getStorys,
  getStoriesCreatedOrContributedToByUser,
  updateStory,
} from "../utils/api";

type InitialStateType = {
  stories: Story[];
  created: Story | null;
  storiesByUser: Story[];
  story: Story | null;
};

const initialState: InitialStateType = {
  stories: [],
  storiesByUser: [],
  created: null,
  story: null,
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

export const fetchStoriesByUserId = createAsyncThunk<
  Story[],
  { userId: string; token: string },
  { rejectValue: string }
>(
  "story/fetchStoriesByUserId",
  async ({ userId, token }, { rejectWithValue }) => {
    try {
      const response = await getStoriesCreatedOrContributedToByUser(
        userId,
        token
      );

      const data = await response.json();
      return data;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      return rejectWithValue(errorMessage);
    }
  }
);

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
      publicStory,
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
        publicStory,
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

export const fetchUpdateStory = createAsyncThunk<
  Story,
  { id: string; text: string; userId: string; score: number; token: string },
  { rejectValue: string }
>(
  "story/fetchUpdateStory",
  async ({ id, text, userId, score, token }, { rejectWithValue }) => {
    try {
      const response = await updateStory(id, text, userId, score, token);
      return await response.json();
    } catch (error) {
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
      fetchStoriesByUserId.fulfilled,
      (state, action: PayloadAction<Story[]>) => {
        state.storiesByUser = action.payload;
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
    builder.addCase(
      fetchUpdateStory.fulfilled,
      (state, action: PayloadAction<Story>) => {
        const updatedStory = action.payload;
        state.stories = state.stories.map((story) =>
          story._id === updatedStory._id ? updatedStory : story
        );
        state.story = action.payload;
      }
    );
  },
});

export const {} = storySlice.actions;

export default storySlice.reducer;
