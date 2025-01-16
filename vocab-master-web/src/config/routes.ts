import {
  RoutePathEnum,
  ApiUrlEnum,
  RouteTypeEnum,
  RouteNameEnum,
  IconEnum,
} from "@enums";
import { Route } from "@/types";

const apiArray = Object.values(ApiUrlEnum) as string[];
const publicApis = [
  ApiUrlEnum.LOGIN,
  ApiUrlEnum.RESET_PASSWORD,
  ApiUrlEnum.REGISTER,
  ApiUrlEnum.LOGIN_WITH_TOKEN,
];
const pageRoutes: Array<Route> = [
  {
    path: RoutePathEnum.NOT_FOUND,
    type: RouteTypeEnum.PAGE,
    name: RouteNameEnum.NOT_FOUNT,
    icon: IconEnum.NOT_FOUND,
    public: true,
    menu: false,
  },
  {
    path: RoutePathEnum.HOME,
    type: RouteTypeEnum.PAGE,
    name: RouteNameEnum.HOME,
    icon: IconEnum.HOME,
    public: true,
    menu: true,
  },
  {
    path: RoutePathEnum.GAME,
    type: RouteTypeEnum.PAGE,
    name: RouteNameEnum.GAME,
    icon: IconEnum.GAME,
    menu: true,
    public: false,
  },

  {
    path: RoutePathEnum.ACCOUNT,
    type: RouteTypeEnum.PAGE,
    name: RouteNameEnum.ACCOUNT,
    public: true,
    menu: false,
    icon: IconEnum.ACCOUNT,
    children: [
      {
        path: RoutePathEnum.RESET_PASSWORD,
        type: RouteTypeEnum.PAGE,
        menu: false,
        name: RouteNameEnum.RESET_PASSWORD,
        icon: IconEnum.EDIT_LIST,
        public: true,
      },
      {
        path: RoutePathEnum.VERIFY_EMAIL,
        type: RouteTypeEnum.PAGE,
        name: RouteNameEnum.VERIFY_EMAIL,
        icon: IconEnum.EDIT_LIST,
        menu: false,
        public: true,
      },
    ],
  },
  {
    path: RoutePathEnum.LISTS,
    type: RouteTypeEnum.PAGE,
    name: RouteNameEnum.LISTS,
    icon: IconEnum.LISTS,
    menu: true,
    public: false,
    children: [
      {
        path: RoutePathEnum.EDIT_LIST,
        type: RouteTypeEnum.PAGE,
        name: RouteNameEnum.EDIT_LIST,
        icon: IconEnum.EDIT_LIST,
        menu: false,
        public: false,
      },
    ],
  },
  // {
  //   path: RoutePathEnum.EDIT_LIST,
  //   type: RouteTypeEnum.PAGE,
  //   name: RouteNameEnum.EDIT_LIST,
  //   icon: IconEnum.EDIT_LIST,
  //   menu: false,
  //   public: false,
  // },
  {
    path: RoutePathEnum.WORDS,
    type: RouteTypeEnum.PAGE,
    name: RouteNameEnum.WORDS,
    icon: IconEnum.WORDS,
    menu: true,
    public: false,
  },
  {
    path: ApiUrlEnum.GET_LIST_BY_ID,
    type: RouteTypeEnum.API,
    menu: false,
    public: false,
  },
  ...apiArray.map((item) => {
    return {
      path: item as ApiUrlEnum,
      type: RouteTypeEnum.API,
      menu: false,
      public: publicApis.includes(item as ApiUrlEnum),
    };
  }),
];
export default pageRoutes;
