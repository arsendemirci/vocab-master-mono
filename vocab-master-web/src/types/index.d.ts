import { PageRoute } from "@/lib/router/pageRoutes";
import { ReactNode } from "react";
import Enum from "@enums";
export interface ApiResponse {
  data?: any;
  status: "ok" | "fail";
  message?: string;
  error?: Enum.Api.Response.Error;
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
    | {
        [key: number]: {
          action: Enum.GridActionStateEnum;
          form: any | undefined;
        };
      }
    | {};
  formState: { [key: number]: BaseObjectType };
}

export interface DataGridCType {
  gridType: Enum.GridStateEnum;
  ownerID?: number;
  height?: any;
}
export interface ToolbarProps {
  title?: string;
}
export interface GridFormDataType {
  postRoute: ApiRoute;
  defaultState: Object;
  ownerKey?: string;
  inputs: GridColumnType[];
}
export interface RowAdderProps {
  primaryKey: string;
  formData: GridFormDataType;
  rowStyle: string;
  onSave: Function;
  ownerId?: any;
}
export interface RowEditorProps {
  [key: number]: number;
  id: number;
  editPostUrl?: ApiRoute;
}
export interface GridColumnType {
  header: string;
  key: string;
}
export interface GridStateType {
  [key: string]: {
    primaryKey: string;
    columns: GridColumnType[];
    dataRoute: ApiRoute;
    formData?: GridFormDataType;
    editRoute?: PageRoute;
    editPostRoute?: ApiRoute;
    deleteRoute?: ApiRoute;
  };
}
export type ApiUrl =
  | `/api/${ServiceNames}/${string}`
  | `${string}/api/${ServiceNames}/${string}`;

export interface BaseObjectType {
  id: number;
}
export interface SearchParams {
  [key: string]: string | undefined | null;
}
export interface RouteOptions {
  path: string;
  type?: Enum.Route.Type;
  isPublic?: boolean;
  searchKeys?: string[];
  menu?: { order: number };
  token?: boolean;
  children?: PageRoute[];
  method?: "get" | "post" | "delete";
  name?: Enum.Route.Name;
  icon?: Enum.Icon;
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

export interface VMUser {
  id: number;
  name: string;
  email: string;
  picture: string;
  accessToken: string;
  refreshToken: string;
}
export interface VMSession {
  user: VMUser;
  expires: string;
}
export interface ModalContentType {
  open: boolean;
  title: string;
  message: string;
  iconImage: string;
  actionContent: ReactNode;
}

export interface TokenInfo {
  accessToken: string;
  accessTokenExpires: number;
  refreshToken: string;
}
export namespace DbEntity {
  export interface User {
    id: number;
    email: string;
    name: string;
    password: string;
    verified: number;
  }
  export interface EmailUser extends User {
    name: string;
  }
}

export type Handler<T = any> = (args: RequestDTO) => Promise<T>;
export interface RequestDTO {
  userId?: number;
  data?: any;
}
