import { createTokenSet, createToken } from "@/utils/tokenUtils";

import Enum from "@enums";
import { wrapResponse, wrapRequest } from "@/utils/apiUtils";
import { Db } from "@Db";
import { getNextId } from "@/utils/dbUtils";

export const getUserByEmail = async (email) => {
  const user: any = await Db.Model.User.findOne({ email })
    .select("id password verified")
    .lean();
  console.log("ARSEN - user -> ", user);
  if (!user) return null;

  const profile = await Db.Model.Profile.findOne({
    userId: user.id,
    isDefault: true,
  }).select("firstName");
  if (!profile) return null;

  return { ...user, name: profile.firstName };
};

export const getUserInfoById = async (userId) =>
  wrapResponse(async () => {
    const user = await Db.Model.User.findOne({ id: userId });
    if (!user) return null;

    const profile = await Db.Model.Profile.findOne({
      userId: user.id,
      isDefault: true,
    });
    if (!profile) return null;

    return {
      userId: user.id,
      email: user.email,
      verified: user.verified,
      profileId: profile.id,
      avatar: profile.avatar,
      firstName: profile.firstName,
      lastName: profile.lastName,
    };
  });
export const createUser = async (name, email, password) => {
  //create user
  const nextUserId = await getNextId("User");
  const newUser = new Db.Model.User({
    email,
    password,
    id: nextUserId,
    verified: false,
  });
  await newUser.save();
  //create profile
  const nextProfileId = await getNextId("Profile");
  const newProfile = new Db.Model.Profile({
    firstName: name,
    lastName: "",
    userId: nextUserId,
    avatar: "guest.png",
    isDefault: true,
    id: nextProfileId,
  });
  await newProfile.save();

  //create verification code
  const { token, expires } = await createToken(nextUserId);

  const nextVerificationId = await getNextId("UserVerification");
  const newVerification = new Db.Model.UserVerification({
    code: token,
    userId: nextUserId,
    validDate: expires,
    id: nextVerificationId,
  });
  await newVerification.save();

  return { userId: nextUserId, verificationCode: token };
};

export const getUserVerification = async ({ code, type }) => {
  const verification = await Db.Model.UserVerification.findOne({ code });
  if (!verification || !verification.validDate)
    throw new Error(Enum.Api.Response.Error.TOKEN_NOT_FOUND);

  const currentDate = new Date();
  if (currentDate > verification.validDate)
    new Error(Enum.Api.Response.Error.TOKEN_EXPIRED);

  return { status: Enum.Token.Status.OK, userId: verification.userId };
};

export const verifyUserRegistration = async (userId) => {
  await Db.Model.User.updateOne({ id: userId }, { verified: true });
  return { success: true };
};
export const addUserVerification = async (
  verification: Db.Dto.UserVerification
) => {
  const nextVerificationId = await getNextId("UserVerification");
  await Db.Model.UserVerification.findOneAndUpdate(
    { userId: verification.userId }, // match by userId
    {
      $set: {
        code: verification.code,
        validDate: verification.validDate,
      },
      $setOnInsert: {
        id: nextVerificationId,
        userId: verification.userId,
      },
    },
    { upsert: true, new: true, runValidators: true }
  );
  return { success: true };
};

export const getSessionInfo = async (userId) => {
  const { data: userInfo } = await getUserInfoById(userId);
  const tokenData = await createTokenSet(userId);
  return {
    user: {
      ...tokenData,
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
};

export const deleteUserVerification = async (userId, code) => {
  await Db.Model.UserVerification.deleteOne({ userId });
  return { success: true };
};

export const updateUserPassword = async (userId, password) =>
  wrapResponse(async () => {
    await Db.Model.User.findOneAndUpdate(
      { id: userId }, // filter by custom ID field
      { password }, // update the password field
      { new: true, runValidators: true } // return updated doc and validate
    );
    return { success: true };
  });
