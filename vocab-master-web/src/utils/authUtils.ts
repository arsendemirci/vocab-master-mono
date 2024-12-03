const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
import { TokenStatus } from "@/config/enums";
const accessTokenSecret =
  "8068bed4e1d79f790a6b3a9fc408c1aada386721ea32ddd3f44e2d6da3fb8937dea58c762e77b279c5b92df837ad51401a68879c9d9e970ad5a3b3e44ac0d92";
const refreshTokenSecret =
  "3ac0fbd92232ddd01a68879f837ad51ecd6df437d44e44a3897b279c5b38068bea58c762e1d79f790a6b4e3a9fc408c1aada386721ea9de792dd49e970ad5a3b";

export const createHash = (word, callback) => {
  bcrypt.hash(word, 10, callback);
};
export const validate = async (word, hash) => {
  const res = await bcrypt.compare(word, hash);
  return res;
};
export const createToken = (userId) => {
  const accessToken = jwt.sign({ userId }, accessTokenSecret, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign({ userId }, refreshTokenSecret, {
    expiresIn: "7d",
  });
  return { accessToken, refreshToken };
};

export const verifyToken = (token, isRefresh) => {
  let status = "";
  let userId = null;
  try {
    const decoded = jwt.verify(
      token,
      isRefresh ? refreshTokenSecret : accessTokenSecret
    );
    status = TokenStatus.OK;
    userId = decoded.userId;
  } catch (err: any) {
    if (err.name == "TokenExpiredError") status = TokenStatus.EXPIRED;
    else {
      status = TokenStatus.INVALID;
    }
  }

  return { status, userId };
};
