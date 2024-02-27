const path = require("path");
//FilePath constants
module.exports = {
  root: path.resolve(__dirname, "../../src/"),
  dbFile: path.resolve(__dirname, "../../src/backend/db/vocab.db"),
  dbModule: "../../src/backend/db/db.js",
  // excelList: path.resolve(this.root, "backend/data/excelLists/toConvert.xlsx"),
  game: function (gameName) {
    return path.resolve(this.root, `backend/data/games/${gameName}.json`);
  },
};
