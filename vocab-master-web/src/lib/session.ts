"use server";
//import "server-only";

// import { SignJWT, jwtVerify } from "jose";
// import { SessionPayload } from "@/app/lib/definitions";
//import { cookies } from "next/headers";

// const secretKey = process.env.NEXTAUTH_SECRET;
// const encodedKey = new TextEncoder().encode(secretKey);

// export async function encrypt(payload: SessionPayload) {
//   return new SignJWT(payload)
//     .setProtectedHeader({ alg: "HS256" })
//     .setIssuedAt()
//     .setExpirationTime("7d")
//     .sign(encodedKey);
// }

// export async function decrypt(session: string | undefined = "") {
//   try {
//     const { payload } = await jwtVerify(session, encodedKey, {
//       algorithms: ["HS256"],
//     });
//     return payload;
//   } catch (error) {
//     console.log("Failed to verify session");
//     return;
//   }
// }
// export async function createSession(userId: string) {
//   const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
//   const session = await encrypt({ userId, expiresAt });
//   const cookieStore = await cookies();

//   cookieStore.set("session", session, {
//     httpOnly: true,
//     secure: true,
//     expires: expiresAt,
//     sameSite: "lax",
//     path: "/",
//   });
// }

// export async function updateSession() {
//   const session = (await cookies()).get("session")?.value;
//   const payload = await decrypt(session);

//   if (!session || !payload) {
//     return null;
//   }

//   const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

//   const cookieStore = await cookies();
//   cookieStore.set("session", session, {
//     httpOnly: true,
//     secure: true,
//     expires: expires,
//     sameSite: "lax",
//     path: "/",
//   });
// }
export async function deleteSession() {
  const { cookies } = await import("next/headers");
  try {
    const cookieStore = await cookies();
    console.log(
      "COOKIELERE GELDIK",
      cookieStore.get("next-auth.session-token")
    );

    cookieStore.delete("next-auth.session-token");
  } catch (err) {
    console.error("ERROR SIGNOUT", err);
  }
}
