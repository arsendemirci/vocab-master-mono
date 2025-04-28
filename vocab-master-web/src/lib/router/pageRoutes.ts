import PageRoute from "./PageRoute";
import Enum from "@enums";

//--- Page Routes --- //
export const HOME = new PageRoute({
  path: "/home",
  icon: Enum.Icon.HOME,
  name: Enum.Route.Name.HOME,
  isPublic: true,
  menu: { order: 1 },
});
export const NOT_FOUND = new PageRoute({
  path: `/not-found`,
  icon: Enum.Icon.NOT_FOUND,
  name: Enum.Route.Name.NOT_FOUND,
  isPublic: true,
});
export const FORGOT_PASSWORD = new PageRoute({
  path: `/account/forgot-password`,
  icon: Enum.Icon.EDIT_LIST,
  name: Enum.Route.Name.FORGOT_PASSWORD,
  isPublic: true,
});
export const RESET_PASSWORD = new PageRoute({
  path: `/account/reset-password`,
  icon: Enum.Icon.EDIT_LIST,
  name: Enum.Route.Name.RESET_PASSWORD,
  isPublic: false,
  token: true,
});
export const VERIFY_EMAIL = new PageRoute({
  path: `/account/verify-email`,
  icon: Enum.Icon.EDIT_LIST,
  name: Enum.Route.Name.VERIFY_EMAIL,
  isPublic: false,
  token: true,
});
export const SIGNOUT = new PageRoute({
  path: `/account/signout`,
  icon: Enum.Icon.EDIT_LIST,
  name: Enum.Route.Name.SIGNOUT,
});
export const ACCOUNT = new PageRoute({
  path: "/account",
  icon: Enum.Icon.ACCOUNT,
  name: Enum.Route.Name.ACCOUNT,
  isPublic: true,
  children: [FORGOT_PASSWORD, RESET_PASSWORD, VERIFY_EMAIL, SIGNOUT],
});

export const GAME = new PageRoute({
  path: "/game",
  icon: Enum.Icon.GAME,
  name: Enum.Route.Name.GAME,
  menu: { order: 2 },
});
export const EDIT_LIST = new PageRoute({
  path: `/lists/edit`,
  icon: Enum.Icon.EDIT_LIST,
  name: Enum.Route.Name.EDIT_LIST,
  searchKeys: ["listId"],
});
export const LISTS = new PageRoute({
  path: "/lists",
  icon: Enum.Icon.LISTS,
  name: Enum.Route.Name.LISTS,
  menu: { order: 3 },
  children: [EDIT_LIST],
});

export const WORDS = new PageRoute({
  path: "/words",
  icon: Enum.Icon.WORDS,
  name: Enum.Route.Name.WORDS,
  menu: { order: 4 },
});
