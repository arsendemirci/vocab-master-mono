namespace Enum {
  export enum Icon {
    HOME = "Home",
    GAME = "Joystick",
    WORDS = "Book",
    LISTS = "List",
    EDIT_LIST = "EditList",
    PROFILE = "Avatar",
    ACCOUNT = "Account",
    NOT_FOUND = "AlertTriangle",
    LOGOUT = "Logout",
  }
  export enum QueryParam {
    NO_ACCEES = "noAccess",
  }

  export namespace Token {
    export enum Status {
      INVALID = "invalid",
      EXPIRED = "expired",
      OK = "ok",
    }
    export enum Type {
      REFRESH = "refresh",
      ACCESS = "access",
      VERIFICATION = "verify",
      ACTIVATION = "activation",
      RESET = "reset",
    }
    export enum Expires {
      SESSION_INTERVAL = 1800000, //30m in miliseconds
      SESSION = 2592000, // 30d in seconds,
      ACCESS_INTERVAL = 518400000, //6d in miliseconds
      ACCESS = "7d",
      VERIFICATION = "1d",
      REFRESH = "30d",
    }
  }
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

  export enum GridActionStateEnum {
    SAVE = "saved",
    DELETE = "deleted",
    CANCEL = "canceled",
    EDIT = "edited",
  }
  export namespace Route {
    export enum SearchKey {
      TOKEN = "token",
      TOKEN_TYPE = "token-type",
    }
    export enum Path {
      HOME = "/home",
      GAME = "/game",
      ACCOUNT = "/account",
      WORDS = "/words",
      LISTS = "/lists",
      PROFILE = "/profile",
      FORGOT_PASSWORD = "/account/forgot-password",
      RESET_PASSWORD = "/account/reset-password",
      EDIT_LIST = "/lists/edit",
      VERIFY_EMAIL = "/account/verify-email",
      SIGNOUT = "/account/signout",
      NOT_FOUND = "/not-found",
    }
    export enum Name {
      HOME = "Home",
      GAME = "Create Game",
      WORDS = "Words",
      LISTS = "Lists",
      EDIT_LIST = "Edit List",
      PROFILE = "Profile",
      ACCOUNT = "Account",
      FORGOT_PASSWORD = "Forgot Password",
      RESET_PASSWORD = "Reset Password",
      VERIFY_EMAIL = "Verify Email",
      NOT_FOUND = "Not Found",
      SIGNOUT = "Signout",
    }
    export enum Type {
      API = "api",
      PAGE = "page",
    }
  }
  export namespace Api {
    export enum Url {
      ACCOUNT_LOGIN = "/api/account/login",
      ACCOUNT_FORGOT_PASSWORD = "/api/account/forgotPassword",
      ACCOUNT_RESET_PASSWORD = "/api/account/resetPassword",
      ACCOUNT_REFRESH_TOKEN = "/api/account/refreshToken",
      ACCOUNT_REGISTER = "/api/account/register",
      ACCOUNT_LOGIN_WITH_TOKEN = "/api/account/loginWithToken",
      ACCOUNT_SIGNOUT = "/api/account/logout",
      WORD_GET = "/api/word/getWords",
      WORD_ADD = "/api/word/addWord",
      WORD_UPDATE = "/api/word/updateWord",
      WORD_ADD_TO_LIST = "/api/word/addWordToList",
      WORD_DELETE = "/api/word/deleteWord",
      WORD_DELETE_FROM_LIST = "/api/word/deleteWordFromList",
      LIST_GET_BY_ID = "/api/list/getListById",
      LIST_GET_DETAILS = "/api/list/getListDetails",
      LIST_GET = "/api/list/getListsAll",
      LIST_ADD = "/api/list/addList",
      LIST_UPDATE = "/api/list/updateListDetails",
      LIST_DELETE = "/api/list/deleteList",
      AUTH_SESSION = "/api/auth/session",
      AUTH_CSRF = "/api/auth/csrf",
    }
    export enum Method {
      ACCOUNT_LOGIN = "login",
      ACCOUNT_FORGOT_PASSWORD = "forgotPassword",
      ACCOUNT_RESET_PASSWORD = "resetPassword",
      ACCOUNT_REFRESH_TOKEN = "refreshToken",
      ACCOUNT_REGISTER = "register",
      ACCOUNT_LOGIN_WITH_TOKEN = "loginWithToken",
      ACCOUNT_SIGNOUT = "logout",
      WORD_GET = "getWords",
      WORD_ADD = "addWord",
      WORD_UPDATE = "updateWord",
      WORD_ADD_TO_LIST = "addWordToList",
      WORD_DELETE = "deleteWord",
      WORD_DELETE_FROM_LIST = "deleteWordFromList",
      LIST_GET_BY_ID = "getListById",
      LIST_GET_DETAILS = "getListDetails",
      LIST_GET = "getListsAll",
      LIST_ADD = "addList",
      LIST_UPDATE = "updateListDetails",
      LIST_DELETE = "deleteList",
      AUTH_SESSION = "session",
      AUTH_CSRF = "csrf",
    }
    export enum Service {
      WORD = "word",
      LIST = "list",
      GAME = "game",
      USER = "user",
      ACCOUNT = "account",
    }
    export namespace Response {
      export enum Status {
        OK = "ok",
        FAIL = "fail",
      }
      export enum Error {
        NOT_REGISTERED = "Specified email is not registered!",
        NOT_VERIFIED = "Email not verified!",
        INVALID_CREDENTIALS = "Email or password is incorrect!",
        TOKEN_NOT_OK = "Invalid Or Expired Token!",
        SERVER_ERROR = "Server Error!",
        ALREADY_REGISTERED = "Email already registered!",
        TOKEN_EXPIRED = "Token expired!",
        TOKEN_NOT_FOUND = "Token not found!",
        UNAUTHORIZED = "Unauthorized",
      }
    }
    export enum SourceHeader {
      KEY = "vm-Source",
      NEXT_AUTH = "NextAuthCallback",
    }
  }
}

export default Enum;
