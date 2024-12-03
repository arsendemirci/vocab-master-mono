import db from "@/server/db/db";

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
