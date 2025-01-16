import { SignJWT, jwtVerify } from "jose";
import { TokenStatus } from "@/config/enums";
const secretKey = process.env.NEXTAUTH_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function createToken(userId) {
  const token = new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1m")
    .sign(encodedKey);

  console.log("TOKEN CREATED => ", token);
  return token;
}

export const verifyToken = async (token) => {
  try {
    const { payload } = await jwtVerify(token, encodedKey, {
      algorithms: ["HS256"],
    });
    return { status: TokenStatus.OK, userId: payload.userId };
  } catch (err: any) {
    if (err.code == "ERR_JWT_EXPIRED") {
      console.log("TOKEN EXPIRED ERROR ", err);
      return { status: TokenStatus.EXPIRED, userId: 0 };
    }
    console.log("TOKEN INVALID ERROR ", err);
    return { status: TokenStatus.INVALID, userId: 0 };
  }
};
export const validateToken = async (token: string) => {
  const { status } = await verifyToken(token);
  return status === TokenStatus.OK;
};
