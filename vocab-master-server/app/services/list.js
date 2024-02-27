const db = require("../db/db.js");

module.exports = {
  getListById: async (listId) => {
    const dao = new db();
    const data = await dao.all(dao.query.GetListWordsByListId(listId));
    const { shuffle } = require("../utils/arrayUtils");
    let words = shuffle(data).slice(0, 5);
    return words;
  },
  getListsAll: async () => {
    const dao = new db();
    const data = await dao.all(dao.query.GetListsAll());
    return data;
  },
};
