const db = require("../db/db.js");

module.exports = {
  getRandomWords: async (num = 5) => {
    const dao = new db();
    const data = await dao.all(dao.query.GetRandomWords(num));
    return data;
  },
};
