const tokenUtils = require("../utils/tokenUtils.js");
const userService = require("../services/user.js");
const crypto = require("../utils/cryptoUtils.js");
const bcrypt = require("bcrypt");
const { template, SmtpMail } = require("../utils/smtpUtils.js");
const {
  statusCode,
  errorCode,
  tokenStatus,
} = require("../config/constants.js");

module.exports = {
  verifyAccessToken: (req, res, next) => {
    const token = req.header("Authorization");
    if (!token)
      return res
        .status(statusCode.ACCESS_DENIED)
        .json(errorCode.TOKEN_NOT_FOUND);

    const { status, userId } = tokenUtils.verifyToken(token);
    if (status === tokenStatus.OK) {
      req.userId = userId;
      next();
    } else {
      res
        .status(statusCode.ACCESS_DENIED)
        .json(
          status === tokenStatus.EXPIRED
            ? errorCode.EXPIRED_TOKEN
            : errorCode.INVALID_TOKEN
        );
    }
  },
  verifyRefreshToken: (req, res, next) => {
    const { refreshToken } = req.body;
    if (!refreshToken)
      return res
        .status(statusCode.FORBIDDEN)
        .json(errorCode.ACCESS_TOKEN_NOT_FOUND);

    const { status, userId } = tokenUtils.verifyToken(refreshToken, true);
    if (status === tokenStatus.OK) {
      req.userId = userId;
      next();
    } else {
      res.status(statusCode.FORBIDDEN).json(errorCode.INVALID_REFRESH_TOKEN);
    }
  },
  login: async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const user = await userService.getUserByEmail(email);
      if (!user) {
        return res
          .status(statusCode.ACCESS_DENIED)
          .json(errorCode.INVALID_EMAIL);
      }
      const isPasswordValid = await crypto.validate(password, user.password);

      if (!isPasswordValid) {
        return res
          .status(statusCode.ACCESS_DENIED)
          .json(errorCode.INVALID_PASSWORD);
      }

      if (!user.verified) {
        return res
          .status(statusCode.CUSTOM_ERROR)
          .json({ ...errorCode.ACCOUNT_NOT_VERIFIED, userId: user.id });
      }

      req.userId = user.id;
      req.auth = tokenUtils.createToken(user.id);
      next();
    } catch (err) {
      res.status(statusCode.SERVER_ERROR).send(err);
    }
  },
  refresh: (req, res, next) => {
    try {
      req.auth = tokenUtils.createToken(req.userId);

      next();
    } catch (err) {
      console.error(err);
      res.status(statusCode.SERVER_ERROR).send(err);
    }
  },
  register: async (req, res, next) => {
    try {
      const { email } = req.body;
      const user = await userService.getUserByEmail(email);
      if (!user) {
        next();
      } else {
        res.status(statusCode.CUSTOM_ERROR).json(errorCode.REGISTERED_EMAIL);
      }
    } catch (err) {
      res.status(statusCode.SERVER_ERROR).send(err);
    }
  },
  verifyUser: async (req, res,next) => {
    try {
      const { userId, verificationCode } = req.body;
      console.log(
        `user id is ${userId}, verificationCode is ${verificationCode}`
      );
      const verification = await userService.GetUserVerification(
        userId,
        verificationCode
      );
      if (verification) {
        const currentDate = new Date();
        const validDate = new Date(verification.validDate);

        if (validDate > currentDate) {
          const data = await userService.VerifyUser(userId);
          if (data) {
            req.userId = userId;
            req.auth = tokenUtils.createToken(userId);

            next();
          }
        } else {
          res.status(statusCode.CUSTOM_ERROR).json(errorCode.CODE_EXPIRED);
        }
      } else {
        res.status(statusCode.CUSTOM_ERROR).json(errorCode.INVALID_CODE);
      }
    } catch (err) {
      res.status(statusCode.SERVER_ERROR).send(err);
    }
  },
};
