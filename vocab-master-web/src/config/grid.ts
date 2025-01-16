import { GridStateType } from "@types";
import { formatString } from "@/utils/stringUtils";
import { ApiUrlEnum, RoutePathEnum } from "@enums";
import api from "@/service/clientService";

const gridState: GridStateType = {
  words: {
    columns: [
      { header: "ID", key: "id" },
      { header: "Question", key: "question" },
      { header: "Answer", key: "check" },
    ],
    dataUrl: ApiUrlEnum.GET_WORDS,
    formData: {
      postUrl: ApiUrlEnum.ADD_WORD,
      primaryKey: "id",
      defaultState: { question: "", check: "" },
      inputs: [
        { header: "Question", key: "question" },
        { header: "Answer", key: "check" },
      ],
    },
    editPostUrl: ApiUrlEnum.UPDATE_WORD,
    deleteUrl: ApiUrlEnum.DELETE_WORD,
  },
  lists: {
    columns: [
      { header: "ID", key: "id" },
      { header: "Name", key: "title" },
      { header: "Description", key: "description" },
    ],
    dataUrl: ApiUrlEnum.GET_LISTS,
    formData: {
      postUrl: ApiUrlEnum.ADD_LIST,
      primaryKey: "id",
      defaultState: { title: "", description: "" },
      inputs: [
        { header: "Name", key: "title" },
        { header: "Description", key: "description" },
      ],
    },
    editUrl: RoutePathEnum.EDIT_LIST,
    deleteUrl: ApiUrlEnum.DELETE_LIST,
  },
  listDetail: {
    columns: [
      { header: "ID", key: "id" },
      { header: "Question", key: "question" },
      { header: "Answer", key: "check" },
    ],
    formData: {
      postUrl: ApiUrlEnum.ADD_WORD_TO_LIST,
      primaryKey: "id",
      ownerKey: "listId",
      defaultState: { question: "", check: "" },
      inputs: [
        { header: "Question", key: "question" },
        { header: "Answer", key: "check" },
      ],
    },
    editPostUrl: ApiUrlEnum.UPDATE_WORD,
    dataUrl: ApiUrlEnum.GET_LIST_BY_ID,
    deleteUrl: ApiUrlEnum.DELETE_WORD_FROM_LIST,
  },
};
export default gridState;
