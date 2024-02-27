import { createSlice } from "@reduxjs/toolkit";
import { gameConfig } from "#config";

const initialState = {
  lists: [],
  game: {
    settings: { list: { id: 0, title: "Vocabulary List" } },
    status: gameConfig.status.NOT_STARTED,
    questions: [],
    score: 0,
    activeQuestion: -1,
  },
};
export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    resetGame: (state) => {
      return initialState;
    },
    getGameLists: (state, { payload }) => {
      state.lists = [...payload.lists];
      state.game.status = gameConfig.status.NOT_STARTED;
    },
    selectList: (state, { payload }) => {
      state.game.settings.list.id = payload.id;
      state.game.settings.list.title = payload.label;
    },
    startGame: (state, { payload }) => {
      state.game.status = gameConfig.status.ACTIVE;
      state.game.activeQuestion = 0;
      state.game.score = 0;
      state.game.questions = [...payload.gameData];
    },
    nextQuestion: (state, { payload }) => {
      const { answer, isCorrect, points, status } = payload;
      state.game.questions[state.game.activeQuestion].answer = answer;
      state.game.questions[state.game.activeQuestion].isCorrect = isCorrect;
      state.game.questions[state.game.activeQuestion].score = points;
      state.game.status = status;
      state.game.activeQuestion += 1;
      state.game.score += points;
    },
    restartGame: (state) => {
      state.game.status = gameConfig.status.ACTIVE;
      state.game.activeQuestion = 0;
      state.game.score = 0;
    },
  },
});

export const {
  getGameLists,
  selectList,
  startGame,
  nextQuestion,
  restartGame,
  resetGame,
} = gameSlice.actions;
export default gameSlice.reducer;
