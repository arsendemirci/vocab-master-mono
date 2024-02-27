const router = require("express").Router();

// middleware that is specific to list
router.use("/list", require("./list.js"));

// middleware that is specific to word
router.use("/word", require("./word.js"));

module.exports = router;
