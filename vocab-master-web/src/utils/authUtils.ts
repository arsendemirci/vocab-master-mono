const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// import { TokenStatus } from "@/config/enums";
// const accessTokenSecret =
//   "ffc0db4712ccbfd7a3a4a457eb11e4fbfbe93af11ba3e7ef40a2808b6b44197c";
// const refreshTokenSecret =
//   "3ac0fbd92232ddd01a68879f837ad51ecd6df437d44e44a3897b279c5b38068bea58c762e1d79f790a6b4e3a9fc408c1aada386721ea9de792dd49e970ad5a3b";

export const createHash = async (word) => {
  const hashedPassword = await new Promise((resolve, reject) => {
    bcrypt.hash(word, 10, function (err, hash) {
      if (err) {
        console.log("ARSEN - SERVER - hash error - ", err);
        reject(err);
      }
      console.log("ARSEN - SERVER - hash success - ", hash);
      resolve(hash);
    });
  });

  return hashedPassword;
};
export const validate = async (word, hash) => {
  const res = await bcrypt.compare(word, hash);
  return res;
};
// export const createToken = (userId) => {
//   const accessToken = jwt.sign({ userId }, process.env.NEXTAUTH_SECRET, {
//     expiresIn: "7d",
//   });
//   // const refreshToken = jwt.sign({ userId }, refreshTokenSecret, {
//   //   expiresIn: "7d",
//   // });
//   console.log("SERVER TOKEN", userId, process.env.NEXTAUTH_SECRET);
//   return accessToken;
// };

// export const verifyToken = (token) => {
//   let status = "";
//   let userId = null;
//   try {
//     const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET);
//     status = TokenStatus.OK;
//     userId = decoded.userId;
//   } catch (err: any) {
//     if (err.name == "TokenExpiredError") status = TokenStatus.EXPIRED;
//     else {
//       status = TokenStatus.INVALID;
//     }
//   }

//   return { status, userId };
// };
// export const validateToken = (token: string): boolean => {
//   const { status } = verifyToken(token);
//   return status === TokenStatus.OK;
// };
