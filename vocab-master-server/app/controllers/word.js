const wordService = require("../services/word.js");

module.exports = {
  getRandomWords: async (req, res) => {
    try {
      const num = req.params?.num;
      const response = await wordService.getRandomWords(num);
      res.json(response);
    } catch (err) {
      res.status(500).send(err);
    }
  },
};
