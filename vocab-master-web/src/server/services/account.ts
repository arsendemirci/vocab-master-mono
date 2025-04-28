import {
  getUserByEmail,
  getSessionInfo,
  createUser,
  verifyUserRegistration,
  getUserVerification,
  updateUserPassword,
  addUserVerification,
  deleteUserVerification,
} from "@api/user";
import { LoginFormType, RegisterFormType, RequestDTO } from "@types";
import { validate, createHash } from "@/utils/authUtils";
import SmtpMail from "@/lib/SmtpMail";
import { templates } from "@/config";
import { getPageUrl } from "@/utils/stringUtils";
import { verifyToken, createTokenSet, createToken } from "@/utils/tokenUtils";
import { cookies } from "next/headers";
import { pageRoutes } from "@/lib/router";
import Enum from "@enums";

export const forgotPassword = async ({ email }) => {
  const userInfo = await getUserByEmail(email);

  if (!userInfo || !userInfo.id)
    throw new Error(Enum.Api.Response.Error.NOT_REGISTERED);

  await initVerificationProcess(userInfo, Enum.Token.Type.VERIFICATION);
  return { success: true };
};

export const resetPassword = async ({ password, code }) => {
  const { data } = await getUserVerification({
    code,
    type: Enum.Token.Type.VERIFICATION,
  });
  if (!data || !data.status || data.status !== Enum.Token.Status.OK) {
    throw new Error(Enum.Api.Response.Error.TOKEN_NOT_OK);
  }

  const hashedPassword = await createHash(password);
  await updateUserPassword(data.userId, hashedPassword);
  await deleteUserVerification(data.userId, code);

  return { success: true };
};

export const login = async ({ data: { email, password } }: RequestDTO) => {
  const user = await getUserByEmail(email);

  if (!user || !(await validate(password, user.password))) {
    throw new Error(Enum.Api.Response.Error.INVALID_CREDENTIALS);
  }

  const sessionData = await getSessionInfo(user.id);

  return sessionData;
};

export const register = async ({
  data: { name, email, password },
}: RequestDTO) => {
  const user = await getUserByEmail(email);

  if (user) {
    if (user.verified)
      throw new Error(Enum.Api.Response.Error.ALREADY_REGISTERED);
    else {
      await initVerificationProcess(user, Enum.Token.Type.ACTIVATION);
      throw new Error(Enum.Api.Response.Error.NOT_VERIFIED);
    }
  } else {
    const hashedPassword = await createHash(password);
    const { userId, verificationCode } = await createUser(
      name,
      email,
      hashedPassword
    );

    if (!userId || !verificationCode) {
      throw new Error(Enum.Api.Response.Error.SERVER_ERROR);
    }

    // user create successful,send the verification mail
    new SmtpMail(email, templates.verification, {
      NAME: name,
      LINK: getPageUrl(pageRoutes.VERIFY_EMAIL.path, {
        key: Enum.Route.SearchKey.TOKEN,
        value: verificationCode,
      }),
    });
    return { success: true };
  }
};
export const loginWithToken = async ({ data: { token } }: RequestDTO) => {
  const { userId, status } = await verifyToken(
    token,
    Enum.Token.Type.VERIFICATION
  );

  if (!userId || status !== Enum.Token.Status.OK) {
    throw new Error(Enum.Api.Response.Error.TOKEN_NOT_OK);
  }

  const resp = await getUserVerification({
    code: token,
    type: Enum.Token.Type.ACTIVATION,
  });
  if (!resp || !resp.status || resp.status !== Enum.Token.Status.OK) {
    throw new Error(Enum.Api.Response.Error.TOKEN_NOT_OK);
  }

  await verifyUserRegistration(userId);
  await deleteUserVerification(userId, token);

  const sessionData = await getSessionInfo(userId);

  return sessionData;
};
export const logout = async () => {
  const cookieStore = await cookies();
  cookieStore.getAll().forEach((cookie) => {
    cookieStore.delete(cookie.name);
  });

  return { success: true };
};

export const refreshToken = async (token) => {
  const { userId, status } = await verifyToken(token, Enum.Token.Type.REFRESH);
  if (!userId || status !== Enum.Token.Status.OK) {
    throw new Error(Enum.Api.Response.Error.TOKEN_NOT_OK);
  }

  const resData = await createTokenSet(userId);

  return resData;
};
const initVerificationProcess = async (userInfo, type: Enum.Token.Type) => {
  const { token, expires } = await createToken(
    userInfo.id,
    Enum.Token.Type.VERIFICATION
  );

  const { success } = await addUserVerification({
    userId: userInfo.id,
    code: token,
    validDate: expires,
  });

  if (!success) {
    throw new Error(Enum.Api.Response.Error.SERVER_ERROR);
  }

  const emailTemplate =
    type === Enum.Token.Type.ACTIVATION
      ? templates.verification
      : templates.forgotPassword;
  const pageRouteLink =
    type === Enum.Token.Type.ACTIVATION
      ? pageRoutes.VERIFY_EMAIL.path
      : pageRoutes.RESET_PASSWORD.path;
  new SmtpMail(userInfo.email, emailTemplate, {
    NAME: userInfo.name,
    LINK: getPageUrl(
      pageRouteLink,
      {
        key: Enum.Route.SearchKey.TOKEN,
        value: token,
      },
      {
        key: Enum.Route.SearchKey.TOKEN_TYPE,
        value: type,
      }
    ),
    BRAND: "Vocab Master",
  });
};
