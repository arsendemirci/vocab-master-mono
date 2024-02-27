const jwt = require("jsonwebtoken");
const { tokenStatus } = require("../config/constants.js");

module.exports = {
  createToken: (userId) => {
    const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign(
      { userId },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    return { accessToken, refreshToken };
  },
  verifyToken: (token, isRefresh) => {
    let status = "";
    let userId = null;
    try {
      const decoded = jwt.verify(
        token,
        isRefresh
          ? process.env.REFRESH_TOKEN_SECRET
          : process.env.ACCESS_TOKEN_SECRET
      );
      status = tokenStatus.OK;
      userId = decoded.userId;
    } catch (err) {
      if (err.name == "TokenExpiredError") status = tokenStatus.EXPIRED;
      else {
        status = tokenStatus.INVALID;
      }
    }

    return { status, userId };
  },
};
