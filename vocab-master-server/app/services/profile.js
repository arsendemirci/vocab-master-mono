const db = require("../db/db.js");

module.exports = {
  GetDefaultProfileByUserId: async (userId) => {
    const dao = new db();
    const data = await dao.get(dao.query.GetDefaultProfileByUserId(userId));
    return data;
  },
};
