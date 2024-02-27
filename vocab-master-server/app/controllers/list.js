const listService = require("../services/list.js");

module.exports = {
  getListById: async (req, res) => {
    try {
      const id = req.params.listId;
      const response = await listService.getListById(id);
      res.json(response);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  getListsAll: async (req, res) => {
    try {
      const response = await listService.getListsAll();
      res.json(response);
    } catch (err) {
      res.status(500).send(err);
    }
  },
};
