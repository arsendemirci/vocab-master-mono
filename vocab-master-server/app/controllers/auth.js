const userService = require("../services/user.js");
const crypto = require("../utils/cryptoUtils.js");
const { statusCode, errorCode } = require("../config/constants.js");
const { template, SmtpMail } = require("../utils/smtpUtils.js");
module.exports = {
  registerUser: async (req, res) => {
    const { name, email, password } = req.body;

    crypto.createHash(password, async function (err, hash) {
      const { userId, verificationCode } = await userService.CreateUser(
        name,
        email,
        hash
      );

      if (userId && verificationCode) {
        // user create successful,send the verification mail
        const mail = new SmtpMail(email, template.verification, {
          NAME: name,
          CODE: verificationCode,
        });

        mail.send();
        return res.json({ userId });
      } else {
        res.status(statusCode.CUSTOM_ERROR).json(errorCode.REGISTER_FAIL);
      }
    });
  },
  verifyUser: async (req, res) => {
    const { userId, verificationCode } = req.body;
    const verification = await userService.verifyUser(userId, verificationCode);
    if (verification) {
      const currentDate = new Date();
      const validDate = new Date(verification.validDate);
      if (validDate > currentDate) {
        //update user verified and return userInfo
      } else {
        res.status(statusCode.CUSTOM_ERROR).json(errorCode.CODE_EXPIRED);
      }
      // check validDate
      // if valid => update user verified to 1 then return true
      // if invalid => return error with a prompt to get another verification email
    }
  },
};
