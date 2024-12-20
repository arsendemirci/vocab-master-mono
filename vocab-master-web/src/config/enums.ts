export enum GameStatus {
  ACTIVE = 1,
  NOT_STARTED,
  GAME_OVER,
}
export enum QuestionType {
  NORMAL = 1,
  MIXED,
  REVERSE,
}
export enum QuizLength {
  SHORT = 5,
  NORMAL = 10,
  LONG = 15,
  ALL = 999,
}
export enum GridStateEnum {
  WORDS = "words",
  LISTS = "lists",
  LIST_DETAIL = "listDetail",
}
export enum ServiceNames {
  WORD = "word",
  LIST = "list",
  GAME = "game",
  USER = "user",
}
export enum GridActionStateEnum {
  SAVE = "saved",
  DELETE = "deleted",
  CANCEL = "canceled",
  EDIT = "edited",
}
export enum TokenStatus {
  INVALID = "invalid",
  EXPIRED = "expired",
  OK = "ok",
}

export default { GameStatus, QuestionType, QuizLength, GridStateEnum };
// export default {
//   enum status {
//     ACTIVE: "active",
//     NOT_STARTED: "not_started",
//     GAME_OVER: "game_over",
//   },
//   list: {
//     VERBS: "verbs",
//     NOUNS: "nouns",
//     ADJECTIVES: "adjectives",
//   },
//   length: {
//     5: 5,
//     10: 10,
//     15: 15,
//     ALL: 999,
//   },
//   questionType: {
//     NORMAL: 1,
//     MIXED: 2,
//     REVERSE: 3,
//   },
//   mode: {
//     TIME_TRIAL: {
//       name: "Time Trial",
//       description:
//         "You get to answer as much question as you can in a certain time. Score is based on how many correct answer you got.",
//     },
//     MARATHON: {
//       name: "Marathon",
//       description:
//         "You get to answer all the questions in the selected vocabulary list. Score will be based on the number of correct answers",
//     },
//     SURVIVAL: {
//       name: "Survival",
//       description:
//         "You will be given three lives, a live will be lost on each wrong answer you give. Game over if all the lives are lost or vocabulary list is finished ",
//     },
//   },
// };
