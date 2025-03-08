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
  imgUrl: string;
  text: string;
  token: string;
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
  Story[],
  CreateStory,
  { rejectValue: string }
>(
  "story/fetchCreateStories",
  async ({ title, id, imgUrl, text, token }, { rejectWithValue }) => {
    try {
      const response = await createStory(title, id, imgUrl, text, token);
      return await response.json();
    } catch (error) {
      console.log(error);
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      return rejectWithValue(errorMessage);
    }
  }
);

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
    builder.addCase(fetchCreateStory.fulfilled, (state, action) => {
      console.log("created");
    });
  },
});

export const {} = storySlice.actions;

export default storySlice.reducer;
