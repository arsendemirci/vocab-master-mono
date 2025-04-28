import { SignJWT, jwtVerify } from "jose";
import { parseDurationToMs } from "@/utils/dateUtils";
import Enum from "@enums";

export const createToken = async (
  userId: number,
  type: Enum.Token.Type = Enum.Token.Type.VERIFICATION
) => {
  let secretKey, expiry;
  if (type === Enum.Token.Type.ACCESS) {
    secretKey = process.env.NEXTAUTH_SECRET;
    expiry = Enum.Token.Expires.ACCESS;
  } else if (type === Enum.Token.Type.REFRESH) {
    secretKey = process.env.REFRESH_SECRET;
    expiry = Enum.Token.Expires.REFRESH;
  } else {
    secretKey = process.env.VERIFY_SECRET;
    expiry = Enum.Token.Expires.VERIFICATION;
  }

  const encodedKey = new TextEncoder().encode(secretKey);

  const token = await new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiry)
    .sign(encodedKey);

  // console.log("TOKEN CREATED => ", token);
  return { token, expires: new Date(Date.now() + parseDurationToMs(expiry)) };
};
export async function createTokenSet(userId) {
  const { token: accessToken } = await createToken(
    userId,
    Enum.Token.Type.ACCESS
  );
  const accessTokenExpires = Date.now() + Enum.Token.Expires.ACCESS_INTERVAL;
  const { token: refreshToken } = await createToken(
    userId,
    Enum.Token.Type.REFRESH
  );
  return { accessToken, accessTokenExpires, refreshToken };
}

export const verifyToken = async (token, type: string) => {
  let secretKey;
  if (type === Enum.Token.Type.ACCESS) {
    secretKey = process.env.NEXTAUTH_SECRET;
  } else if (type === Enum.Token.Type.REFRESH) {
    secretKey = process.env.REFRESH_SECRET;
  } else {
    secretKey = process.env.VERIFY_SECRET;
  }
  const encodedKey = new TextEncoder().encode(secretKey);
  try {
    const { payload } = await jwtVerify(token, encodedKey, {
      algorithms: ["HS256"],
    });
    return { status: Enum.Token.Status.OK, userId: payload.userId };
  } catch (err: any) {
    if (err.code == "ERR_JWT_EXPIRED") {
      console.log("TOKEN EXPIRED ERROR ", err);
      return { status: Enum.Token.Status.EXPIRED, userId: 0 };
    }
    console.log("TOKEN INVALID ERROR ", err);
    return { status: Enum.Token.Status.INVALID, userId: 0 };
  }
};
