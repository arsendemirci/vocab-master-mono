const userController = require("../controllers/user.js");
const authController = require("../controllers/auth.js");
const router = require("express").Router();
const {
  verifyRefreshToken,
  login,
  refresh,
  register,
  verifyUser,
} = require("../middleware/authMiddleware.js");

router.post("/login", login, userController.getUserInfo);
router.post(
  "/refresh",
  verifyRefreshToken,
  refresh,
  userController.getUserInfo
);
router.post("/register", register, authController.registerUser);
router.post("/verify-user", verifyUser, userController.getUserInfo);

module.exports = router;
