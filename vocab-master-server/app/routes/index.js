const router = require("express").Router();
const {
  verifyAccessToken,
} = require("../middleware/authMiddleware.js");

// middleware that is specific to secure routes
router.use("/secure", verifyAccessToken, require("./secureRoutes.js"));
// no middleware in public routes in general
router.use("/public", require("./publicRoutes.js"));

module.exports = router;
