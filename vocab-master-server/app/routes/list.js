const listController = require("../controllers/list.js");
const router = require("express").Router();

router.get("/words/:listId", listController.getListById);
router.get("/", listController.getListsAll);


module.exports = router;
