import db from "@/server/db/db";
import { LoginFormType, ApiResponse } from "@types";
import { validate, createToken } from "@/utils/authUtils";

export const getUserByEmail = async (email) => {
  const dao = new db();
  const data = await dao.get(dao.query.GetUserByEmail(email));
  return data;
};
export const getUserInfoById = async (userId) => {
  const dao = new db();
  const data = await dao.get(dao.query.GetUserInfoById(userId));

  return data;
};
export const createUser = async (name, email, password) => {
  const dao = new db(true);
  const userId = await dao.run(dao.query.InsertUser(email, password));
  let verificationCode;
  if (userId) {
    const defaultProfileId = await dao.run(
      dao.query.InsertProfile(name, "", userId, "", 1)
    );
    verificationCode = Math.floor(Math.random() * 90000) + 10000;

    const validDate = new Date();
    let time = validDate.getTime();
    let validTime = time + 2 * 60 * 60 * 1000;
    validDate.setTime(validTime);

    dao
      .run(
        dao.query.InsertUserVerification(
          verificationCode,
          userId,
          validDate.toJSON()
        )
      )
      .then((res) => {})
      .catch((err) => {})
      .finally(() => {
        dao.close();
      });
  }

  return { userId, verificationCode };
};
export const getUserVerification = async (userId, code) => {
  const dao = new db();
  const data = await dao.get(dao.query.GetUserVerification(userId, code));

  return data;
};
export const verifyUser = async (userId) => {
  const dao = new db();
  const data = await dao.run(dao.query.UpdateUserVerified(userId));

  return data;
};

export const login = async ({ email, password }: LoginFormType) => {
  console.log("test from server", email, password);
  let response: ApiResponse = { status: "success", data: {} };
  //check user exeists
  const user = await getUserByEmail(email);
  console.log("USER INFOOO", user);

  //check password is correct
  const isPasswordValid = await validate(password, user.password);

  if (!isPasswordValid) {
    response.status = "fail";
    response.error = { msg: "Email or Password is incorrect!" };
  } else {
    const auth = createToken(user.id);
    response.data = await getSessionInfo({ userId: user.id, auth });
  }

  return response;
};

export const getSessionInfo = async ({ userId, auth }) => {
  console.log("server GET SESSION INFO", userId, auth);
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
