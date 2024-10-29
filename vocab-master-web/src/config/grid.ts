import { GridStateType } from "@types";
import api from "@/service/clientService";

const gridState: GridStateType = {
  words: {
    columns: [
      { header: "ID", key: "id" },
      { header: "Question", key: "question" },
      { header: "Answer", key: "check" },
    ],
    dataUrl: api.word.getWords.getUrl,
    formData: {
      postUrl: api.word.addWord.getUrl(),
      primaryKey: "id",
      defaultState: { question: "", check: "" },
      inputs: [
        { header: "Question", key: "question" },
        { header: "Answer", key: "check" },
      ],
    },
    editPostUrl: api.word.updateWord.getUrl(),
    deleteUrl: api.word.deleteWord.getUrl,
  },
  lists: {
    columns: [
      { header: "ID", key: "id" },
      { header: "Name", key: "title" },
      { header: "Description", key: "description" },
    ],
    dataUrl: api.list.getListsAll.getUrl,
    formData: {
      postUrl: api.list.addList.getUrl(),
      primaryKey: "id",
      defaultState: { title: "", description: "" },
      inputs: [
        { header: "Name", key: "title" },
        { header: "Description", key: "description" },
      ],
    },
    editUrl: (id: number) => `/lists/edit/${id}`,
    deleteUrl: api.list.deleteList.getUrl,
  },
  listDetail: {
    columns: [
      { header: "ID", key: "id" },
      { header: "Question", key: "question" },
      { header: "Answer", key: "check" },
    ],
    formData: {
      postUrl: api.word.addWordToList.getUrl(),
      primaryKey: "id",
      ownerKey: "listId",
      defaultState: { question: "", check: "" },
      inputs: [
        { header: "Question", key: "question" },
        { header: "Answer", key: "check" },
      ],
    },
    editPostUrl: api.word.updateWord.getUrl(),
    dataUrl: api.list.getListById.getUrl,
    deleteUrl: api.word.deleteWordFromList.getUrl,
  },
};
export default gridState;
