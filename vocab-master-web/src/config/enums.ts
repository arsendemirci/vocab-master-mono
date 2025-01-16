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
  ACCOUNT = "account",
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
export enum RoutePathEnum {
  HOME = "/home",
  GAME = "/game",
  ACCOUNT = "/account",
  WORDS = "/words",
  LISTS = "/lists",
  PROFILE = "/profile",
  RESET_PASSWORD = "/account/reset-password",
  EDIT_LIST = "/lists/edit/{0}",
  VERIFY_EMAIL = "/account/verify-email?token={0}",
  NOT_FOUND = "/not-found",
}
export enum ApiUrlEnum {
  LOGIN = "/api/account/login",
  RESET_PASSWORD = "/api/account/resetPassword",
  REGISTER = "/api/account/register",
  GET_WORDS = "/api/word/getWords",
  ADD_WORD = "/api/word/addWord",
  UPDATE_WORD = "/api/word/updateWord",
  ADD_WORD_TO_LIST = "/api/word/addWordToList",
  DELETE_WORD = "/api/word/deleteWord",
  DELETE_WORD_FROM_LIST = "/api/word/deleteWordFromList",
  GET_LIST_BY_ID = "/api/list/getListById/{0}",
  GET_LIST_DETAILS = "/api/list/getListDetails/{0}",
  GET_LISTS = "/api/list/getListsAll",
  ADD_LIST = "/api/list/addList",
  UPDATE_LIST = "/api/list/updateListDetails",
  DELETE_LIST = "/api/list/deleteList",
  LOGIN_WITH_TOKEN = "/api/account/loginWithToken",
}

export enum RouteTypeEnum {
  API = "api",
  PAGE = "page",
}
export enum RouteNameEnum {
  HOME = "Home",
  GAME = "Create Game",
  WORDS = "Words",
  LISTS = "Lists",
  EDIT_LIST = "Edit List",
  PROFILE = "Profile",
  ACCOUNT = "Account",
  RESET_PASSWORD = "Reset Password",
  VERIFY_EMAIL = "Verify Email",
  NOT_FOUNT = "Not Found",
}
export enum IconEnum {
  HOME = "Home",
  GAME = "Joystick",
  WORDS = "Words",
  LISTS = "List",
  EDIT_LIST = "EditList",
  PROFILE = "Avatar",
  ACCOUNT = "Account",
  NOT_FOUND = "AlertTriangle",
  LOGOUT = "Logout",
}

export default {
  GameStatus,
  QuestionType,
  QuizLength,
  GridStateEnum,
  RoutePathEnum,
  ApiUrlEnum,
  RouteTypeEnum,
  RouteNameEnum,
  IconEnum,
};
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
