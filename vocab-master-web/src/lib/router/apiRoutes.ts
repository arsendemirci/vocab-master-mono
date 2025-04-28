import ApiRoute from "./ApiRoute";

export const ACCOUNT_FORGOT_PASSWORD = new ApiRoute({
  path: `/api/account/forgotPassword`,
  method: "post",
  isPublic: true,
});
export const ACCOUNT_LOGIN = new ApiRoute({
  path: `/api/account/login`,
  method: "post",
  isPublic: true,
});

export const ACCOUNT_RESET_PASSWORD = new ApiRoute({
  path: `/api/account/resetPassword`,
  method: "post",
  isPublic: true,
});
export const ACCOUNT_REFRESH_TOKEN = new ApiRoute({
  path: `/api/account/refreshToken`,
  method: "post",
  isPublic: true,
});
export const ACCOUNT_REGISTER = new ApiRoute({
  path: `/api/account/register`,
  method: "post",
  isPublic: true,
});
export const ACCOUNT_LOGIN_WITH_TOKEN = new ApiRoute({
  path: `/api/account/loginWithToken`,
  method: "post",
  isPublic: true,
});
export const ACCOUNT_SIGNOUT = new ApiRoute({
  path: `/api/account/logout`,
  method: "post",
});
export const USER_GET_VERIFICATION = new ApiRoute({
  path: "/api/user/getUserVerification",
  method: "post",
  isPublic: true,
});

export const LIST_GET_BY_ID = new ApiRoute({
  path: "/api/list/getListById",
  searchKeys: ["listId"],
});
export const LIST_GET_DETAILS = new ApiRoute({
  path: "/api/list/getListDetails",
  searchKeys: ["listId"],
});

export const LIST_GET = new ApiRoute({ path: "/api/list/getListsAll" });
export const LIST_ADD = new ApiRoute({
  path: "/api/list/addList",
  method: "post",
});
export const LIST_UPDATE = new ApiRoute({
  path: "/api/list/updateListDetails",
  method: "post",
});
export const LIST_DELETE = new ApiRoute({
  path: "/api/list/deleteList",
  method: "delete",
});

export const WORD_GET = new ApiRoute({ path: "/api/word/getWords" });
export const WORD_ADD = new ApiRoute({
  path: "/api/word/addWord",
  method: "post",
});

export const WORD_UPDATE = new ApiRoute({
  path: "/api/word/updateWord",
  method: "post",
});
export const WORD_ADD_TO_LIST = new ApiRoute({
  path: "/api/word/addWordToList",
  method: "post",
});
export const WORD_DELETE = new ApiRoute({
  path: "/api/word/deleteWord",
  method: "delete",
});
export const WORD_DELETE_FROM_LIST = new ApiRoute({
  path: "/api/word/deleteWordFromList",
  method: "delete",
});
export const SEED_DATA = new ApiRoute({
  path: "/api/seed/seedData",
  method: "post",
});
export const SEED_WRITE = new ApiRoute({
  path: "/api/seed/writeData",
  method: "post",
});
