import { createSlice } from "@reduxjs/toolkit";
import { RuleSet } from "../utils/types";

type InitialStateType = {
  ruleSet: RuleSet | null;
};

const initialState: InitialStateType = {
  ruleSet: null,
};

export const rulesetSlice = createSlice({
  name: "ruleSet",
  initialState,
  reducers: {
    addCustomRuleSet: (state, action) => {
      state.ruleSet = action.payload;
    },
    clearCustomRuleSet: (state, action) => {
      state.ruleSet = null;
    },
  },
});

export const { addCustomRuleSet, clearCustomRuleSet } = rulesetSlice.actions;

export default rulesetSlice.reducer;
