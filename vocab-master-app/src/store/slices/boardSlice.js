import { createSlice } from "@reduxjs/toolkit";

export const boardSlice = createSlice({
  name: "board",
  initialState: {
    word: [],
    mark: "",
    isOverflow: false,
  },
  reducers: {
    addChar: (state, { payload }) => {
      state.word.push(payload.char);
    },
    deleteChar: (state) => {
      state.word.splice(-1);
    },
    setOverflowFlag: (state, { payload }) => {
      state.isOverflow = payload.isOverflow;
    },
    submitAnswer: (state) => {
      state.word.length = 0;
    },
    updateCheckmark: (state, { payload }) => {
      state.mark = payload.mark;
    },
  },
});

export const {
  addChar,
  setOverflowFlag,
  deleteChar,
  submitAnswer,
  updateCheckmark,
} = boardSlice.actions;
export default boardSlice.reducer;
