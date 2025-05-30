import { createSlice } from "@reduxjs/toolkit";
// import { gameConfig } from "@/config";
import { GameSliceType } from "@/types";
import Enum from "@enums";
const initialState: GameSliceType = {
  lists: [],
  game: {
    settings: {
      list: { id: 0, title: "Vocabulary List" },
      questionType: Enum.QuestionType.NORMAL,
      length: Enum.QuizLength.SHORT,
    },
    status: Enum.GameStatus.NOT_STARTED,
    questions: [],
    score: 0,
    activeQuestion: -1,
  },
};
export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    resetGame: () => {
      return initialState;
    },
    getGameLists: (state, { payload }) => {
      state.lists = [...payload.lists];
      state.game.status = Enum.GameStatus.NOT_STARTED;
    },
    selectList: (state, { payload }) => {
      state.game.settings.list.id = payload.id;
      state.game.settings.list.title = payload.label;
    },
    selectQuestionType: (state, { payload }) => {
      state.game.settings.questionType = payload;
    },
    selectQuizLength: (state, { payload }) => {
      state.game.settings.length = payload;
    },
    startGame: (state, { payload }) => {
      console.log("starting the game store", payload);
      state.game.status = Enum.GameStatus.ACTIVE;
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
      state.game.status = Enum.GameStatus.ACTIVE;
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
  selectQuestionType,
  selectQuizLength,
} = gameSlice.actions;
export default gameSlice.reducer;
