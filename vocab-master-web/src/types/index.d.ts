import {
  GameStatus,
  QuestionType,
  QuizLength,
  GridStateEnum,
  ServiceNames,
  GridActionStateEnum,
} from "@/config/enums";

export interface IconType {
  [key: string]: SvgType;
}
export interface IconPropsType {
  icon: string;
  color?: string;
  width?: number;
  height?: number;
  bg?: any;
}

export interface NavLinkType {
  name: string;
  href: string;
  icon: string;
  inMenu: boolean;
  subRoutes?: NavLinkType[];
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
  menuClass: "menu_open" | "menu_closed";
  loader: { show: boolean };
  modal: {
    show: boolean;
    component: string;
  };
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
}

export interface UserSliceType {
  user: {
    id: number;
    email: string;
    name: string;
    verified: boolean;
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
    dataUrl: (...args) => ApiUrl;
    formData?: GridFormDataType;
    editUrl?: Function;
    editPostUrl?: ApiUrl;
    deleteUrl?: Function;
  };
}
export type ApiUrl = `/api/${ServiceNames}/${string}`;
export interface BaseObjectType {
  id: number;
}
export interface ListFormType extends BaseObjectType {
  title: string;
  description: string;
}

export interface WordFormType extends BaseObjectType {
  question: string;
  check: string;
}
export type ClientServiceType = {
  [key in ServiceNames]: {
    [key: string]: {
      getUrl: (...args) => ApiUrl;
      call: Function;
    };
  };
};
