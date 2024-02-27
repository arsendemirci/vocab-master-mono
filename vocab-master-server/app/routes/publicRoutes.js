const router = require("express").Router();

// middleware that is specific to authentication
router.use("/auth", require("./auth.js"));

module.exports = router;
