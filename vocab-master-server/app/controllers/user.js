const userService = require("../services/user.js");

const { statusCode } = require("../config/constants.js");

module.exports = {
  getUserInfo: async (req, res) => {
    try {
      const { userId, auth } = req;
      //get user default profile
      const userInfo = await userService.GetUserInfoById(userId);

      const resJson = {
        auth,
        user: {
          id: userId,
          email: userInfo.email,
          name: `${userInfo.firstName} ${userInfo.lastName}`.trim(),
          verified: !!+userInfo.verified,
        },
        profile: {
          id: userInfo.profileId,
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          avatar: userInfo.avatar,
        },
      };

      return res.json(resJson);
    } catch (err) {
      res.status(statusCode.SERVER_ERROR).send(err);
    }
  },
  
};
