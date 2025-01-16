import {
  GameStatus,
  QuestionType,
  QuizLength,
  GridStateEnum,
  ServiceNames,
  GridActionStateEnum,
  RoutePathEnum,
  RouteNameEnum,
  IconEnum,
  ApiUrlEnum,
} from "@/config/enums";

export interface ApiResponse {
  data?: {};
  status: "ok" | "fail";
  error?: {
    msg: string;
  };
}
export interface IconType {
  [key: string]: SvgType;
}
export interface IconPropsType {
  icon: string;
  color?: string;
  width?: number;
  height?: number;
  bg?: any;
  type?: "svg" | "png" | "component";
}

export interface PageCardProps {
  children: ReactNode;
  ref: any;
}

export interface AppContextProviderType {
  currentPath: string;
  pageClass?: string;
  children: ReactNode;
}
export interface LoaderPropsType {
  show: boolean;
}

export interface AppSliceType {
  currentPath: string;
  pageClass: "page_open" | "page_closed";
  loader: { show: boolean };
  modal: {
    show: boolean;
    component: string;
  };
}
export interface PersistSliceType {
  menuClass: "menu_open" | "menu_closed";
  user?: VMUser | null;
}

export interface GameSliceType {
  lists: Array;
  game: {
    settings: {
      list: { id: number; title: string };
      questionType: QuestionType;
      length: QuizLength;
    };
    status: GameStatus;
    questions: Array;
    score: number;
    activeQuestion: any;
  };
}
export interface FormFieldValidationType {
  error: boolean;
  msg: string;
}
export interface AccountSliceType {
  activePanel: "login" | "register";
  registeredUserId: number;
  loginForm: {
    email: FormFieldValidationType;
    password: FormFieldValidationType;
  };
  registerForm: {
    email: FormFieldValidationType;
  };
  resetPasswordForm: {
    email: FormFieldValidationType;
  };
}

export interface UserSliceType {
  user: {
    id: number;
    email: string;
    name: string;
    verified: boolean;
    image: string;
  };
  profile: {
    id: number;
    firstName: string;
    lastName: string;
    avatar: string;
  };
}
export interface StoreType {
  appSlice: AppSliceType;
  gameSlice: GameSliceType;
  gridSlice: GridSliceType;
  accountSlice: AccountSliceType;
  userSlice: UserSliceType;
  persistSlice: PersistSliceType;
}

export interface GridDataType {
  columns: any[];
  data: any[];
}
export interface GridSliceType {
  search: string;
  tableData: any[];
  actionState:
    | { [key: number]: { action: GridActionStateEnum; form: any | undefined } }
    | {};
  formState: { [key: number]: BaseObjectType };
}

export interface DataGridCType {
  gridType: GridStateEnum;
  ownerID?: number;
  height?: any;
}
export interface ToolbarProps {
  title?: string;
}
export interface GridFormDataType {
  postUrl: ApiUrl;
  primaryKey: string;
  defaultState: Object;
  ownerKey?: string;
  inputs: GridColumnType[];
}
export interface RowAdderProps {
  formData: GridFormDataType;
  rowStyle: string;
  onSave: Function;
  ownerId?: number;
}
export interface GridColumnType {
  header: string;
  key: string;
}
export interface GridStateType {
  [key: string]: {
    columns: GridColumnType[];
    dataUrl: string;
    formData?: GridFormDataType;
    editUrl?: string;
    editPostUrl?: string;
    deleteUrl?: string;
  };
}
export type ApiUrl =
  | `/api/${ServiceNames}/${string}`
  | `${string}/api/${ServiceNames}/${string}`;
export interface BaseObjectType {
  id: number;
}
export interface ListFormType extends BaseObjectType {
  title: string;
  description: string;
}
export interface LoginFormType {
  email: string;
  password: string;
}
export interface RegisterFormType {
  name: string;
  email: string;
  password: string;
}

export interface WordFormType extends BaseObjectType {
  question: string;
  check: string;
}
export type ClientServiceType = {
  [key in ServiceNames]: { [key: string]: Function };
};
export interface VMUser {
  id: number;
  name: string;
  email: string;
  picture: string;
  accessToken: string;
}
export interface VMSession {
  user: VMUser;
  expires: string;
}
export interface Route {
  path: RoutePathEnum | ApiUrl | ApiUrlEnum;
  type: "api" | "page";
  menu: boolean;
  name?: RouteNameEnum;
  icon?: IconEnum;
  public: boolean;
  children?: Array<Route>;
}
