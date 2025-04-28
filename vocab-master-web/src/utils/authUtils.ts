const bcrypt = require("bcrypt");

export const createHash = async (word) => {
  const hashedPassword = await new Promise((resolve, reject) => {
    bcrypt.hash(word, 10, function (err, hash) {
      if (err) {
        reject(err);
      }
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
//   return accessToken;
// };

// export const verifyToken = (token) => {
//   let status = "";
//   let userId = null;
//   try {
//     const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET);
//     status = Enum.TokenenStatus.OK;
//     userId = decoded.userId;
//   } catch (err: any) {
//     if (err.name == "TokenExpiredError") status = Enum.TokenenStatus.EXPIRED;
//     else {
//       status = Enum.TokenenStatus.INVALID;
//     }
//   }

//   return { status, userId };
// };
// export const validateToken = (token: string): boolean => {
//   const { status } = verifyToken(token);
//   return status === Enum.TokenenStatus.OK;
// };
