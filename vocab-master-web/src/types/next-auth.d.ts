import NextAuth, { DefaultSession } from "next-auth";
import { DefaultJWT, JWT } from "next-auth/jwt";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface User {
    name: string;
    email: string;
    id: number;
    accessToken: string;
    refreshToken: string;
    accessTokenExpires: number;
    picture: string;
  }

  interface Session {
    user: User;
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    user: User;
  }
}
