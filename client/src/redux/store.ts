import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import storyReducer from "./storySlice";
import ruleSetReducer from "./rulesetSlice";
import invitationReducer from "./invitationSlice";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    story: storyReducer,
    ruleSet: ruleSetReducer,
    invitation: invitationReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
