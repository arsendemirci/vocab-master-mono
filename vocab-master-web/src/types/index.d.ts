import { GameStatus, QuestionType, QuizLength } from "@/config/enums";

export interface NavLinkType {
  name: string;
  href: string;
  icon: string;
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
