import { GridStateType } from "@types";
import { pageRoutes, apiRoutes } from "@/lib/router";

const gridState: GridStateType = {
  words: {
    primaryKey: "id",
    columns: [
      { header: "ID", key: "id" },
      { header: "Question", key: "question" },
      { header: "Answer", key: "check" },
    ],
    dataRoute: apiRoutes.WORD_GET,
    formData: {
      postRoute: apiRoutes.WORD_ADD,
      defaultState: { question: "", check: "" },
      inputs: [
        { header: "Question", key: "question" },
        { header: "Answer", key: "check" },
      ],
    },
    editPostRoute: apiRoutes.WORD_UPDATE,
    deleteRoute: apiRoutes.WORD_DELETE,
  },
  lists: {
    primaryKey: "id",
    columns: [
      { header: "ID", key: "id" },
      { header: "Name", key: "title" },
      { header: "Description", key: "description" },
    ],
    dataRoute: apiRoutes.LIST_GET,
    formData: {
      postRoute: apiRoutes.LIST_ADD,
      defaultState: { title: "", description: "" },
      inputs: [
        { header: "Name", key: "title" },
        { header: "Description", key: "description" },
      ],
    },
    editRoute: pageRoutes.EDIT_LIST,
    deleteRoute: apiRoutes.LIST_DELETE,
  },
  listDetail: {
    primaryKey: "id",
    columns: [
      { header: "ID", key: "id" },
      { header: "Question", key: "question" },
      { header: "Answer", key: "check" },
    ],
    formData: {
      postRoute: apiRoutes.WORD_ADD_TO_LIST,
      ownerKey: "listId",
      defaultState: { question: "", check: "" },
      inputs: [
        { header: "Question", key: "question" },
        { header: "Answer", key: "check" },
      ],
    },
    editPostRoute: apiRoutes.WORD_UPDATE,
    dataRoute: apiRoutes.LIST_GET_BY_ID,
    deleteRoute: apiRoutes.WORD_DELETE_FROM_LIST,
  },
};

export default gridState;
