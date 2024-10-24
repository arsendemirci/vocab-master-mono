import {
  GameStatus,
  QuestionType,
  QuizLength,
  GridStateEnum,
  ServiceNames,
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
  pageClass: string;
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

export interface StoreType {
  appSlice: AppSliceType;
  gameSlice: GameSliceType;
  gridSlice: GridSliceType;
}

export interface GridDataType {
  columns: any[];
  data: any[];
}
export interface GridSliceType {
  search: string;
  tableData: any[];
}

export interface DataGridCType {
  gridType: GridStateEnum;
  ownerID?: number;
}
export interface ToolbarProps {
  title?: string;
}
export interface GridFormDataType {
  postUrl: string;
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
