import {
  getUserByEmail,
  getSessionInfo,
  createUser,
  verifyUser,
} from "@api/user";
import { LoginFormType, ApiResponse, RegisterFormType } from "@types";
import { validate, createHash, verifyToken } from "@/utils/authUtils";
import SmtpMail from "@/lib/SmtpMail";
import { templates } from "@/config";
import { formatString } from "@/utils/stringUtils";
import { RoutePathEnum, TokenStatus } from "@/config/enums";

export const resetPassword = async (email) => {
  const userInfo = await getUserByEmail(email);
  if (userInfo.length > 0) {
    console.log(`[SERVER LOG] burda mail atma islemleri yapilacak`);
  }
};
export const login = async ({ email, password }: LoginFormType) => {
  let response: ApiResponse = { status: "fail" };
  //check user exeists
  const user = await getUserByEmail(email);

  if (!user || !(await validate(password, user.password))) {
    response.error = { msg: "Email or Password is incorrect!" };
  } else {
    response.status = "ok";
    response.data = await getSessionInfo(user.id);
  }

  return response;
};
export const register = async ({ name, email, password }: RegisterFormType) => {
  let response: ApiResponse = { status: "fail" };
  const hashedPassword = await createHash(password);
  console.log("SERVER hashed password", hashedPassword);
  // await createHash(password, async function (err, hash) {
  const { userId, verificationCode } = await createUser(
    name,
    email,
    hashedPassword
  );

  if (userId && verificationCode) {
    // user create successful,send the verification mail
    const mail = new SmtpMail(email, templates.verification, {
      NAME: name,
      LINK: formatString(
        `${process.env.BASE_URL}${RoutePathEnum.VERIFY_EMAIL}`,
        verificationCode
      ),
    });

    mail.send();
    response.status = "ok";
    response.data = { userId };
  } else {
    response.error = { msg: "Server error" };
  }
  // });

  return response;
};
export const loginWithToken = async ({ token }: any) => {
  let response: ApiResponse = { status: "fail" };
  const { userId, status } = verifyToken(token);

  if (userId && status == TokenStatus.OK) {
    await verifyUser(userId);
    //TODO: verify the user in db
    response.status = "ok";
    response.data = await getSessionInfo(userId);
  } else {
    response.error = { msg: "Invalid Or Expired token" };
  }

  return response;
};
