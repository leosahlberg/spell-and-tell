import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import storyReducer from "./storySlice";
import ruleSetReducer from "./rulesetSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    story: storyReducer,
    ruleSet: ruleSetReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
