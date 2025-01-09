import db from "@/server/db/db";

import { LoginFormType } from "@types";
import { getUserByEmail, getUserInfoById } from "@api/user";
import { validate, createToken } from "@/utils/authUtils";

export const login = async ({ email, password }: LoginFormType) => {
  debugger;
  const user = await getUserByEmail(email);
  //check user exeists
  const isPasswordValid = validate(password, user.password);
  //check password is correct
  const auth = createToken(user.Id);
  const sessionInfo = await getSessionInfo({ userId: user.Id, auth });

  return sessionInfo;
};
export const getSessionInfo = async ({ userId, auth }) => {
  // const { userId, auth } = req;
  //get user default profile
  const userInfo = await getUserInfoById(userId);

  const sesInfo = {
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

  return sesInfo;
};
