export default {
  words: {
    columns: [
      { header: "ID", key: "id" },
      { header: "Question", key: "question" },
      { header: "Answer", key: "check" },
    ],
    dataUrl: "/api/word/getWords",
  },
  lists: {
    columns: [
      { header: "ID", key: "id" },
      { header: "Name", key: "title" },
      { header: "Description", key: "description" },
    ],
    dataUrl: "/api/list/getListsAll",
  },
};
