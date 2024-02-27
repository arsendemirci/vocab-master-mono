const wordController = require("../controllers/word.js");
const router = require("express").Router();

router.get("/random-words/:num?", wordController.getRandomWords);


module.exports = router;
