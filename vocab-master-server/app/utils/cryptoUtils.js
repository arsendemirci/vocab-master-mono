const bcrypt = require("bcrypt");

module.exports = {
  createHash: (word, callback) => {
    bcrypt.hash(word, 10, callback);
  },
  validate: async (word, hash) => {
    const res = await bcrypt.compare(word, hash);
    return res;
  },
};
