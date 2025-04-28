import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { apiRoutes } from "@/lib/router";
import Enum from "@enums";

const authReturn = (res) => {
  console.log("ARSEN - res -> ", res);
  if (res.status == "ok") {
    return {
      ...res.data.auth,
      ...res.data.user,
      picture: res.data.profile.avatar,
    };
  } else {
    console.error("Authorization failed:", res);
    return null;
  }
};

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "jsmith",
          value: "administrator",
        },
        password: { label: "Password", type: "password", value: "admin" },
      },

      async authorize(credentials, req) {
        if (!credentials) return null;

        if (!credentials.password && req.query?.token) {
          console.log("ARSEN - req.query?.token -> ", req.query?.token);
          const res = await apiRoutes.ACCOUNT_LOGIN_WITH_TOKEN.call({
            token: req.query.token,
          });

          return authReturn(res);
        } else {
          try {
            const data = {
              email: credentials.username,
              password: credentials.password,
            };

            const headers = {
              Accept: "application/json",
              "Content-Type": "application/json",
              credentials: JSON.stringify(credentials),
            };

            const res = await apiRoutes.ACCOUNT_LOGIN.call(data, headers);

            return authReturn(res);
          } catch (error) {
            console.error("Authorization error:", error);
            return null;
          }
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: Enum.Token.Expires.SESSION as number,
  },
  callbacks: {
    async jwt({ token, user, trigger }) {
      if (trigger === "update") {
        if (
          token &&
          token.user &&
          token.user.refreshToken &&
          token.user.accessTokenExpires < Date.now()
        ) {
          try {
            const headers = {
              [Enum.Api.SourceHeader.KEY]: Enum.Api.SourceHeader.NEXT_AUTH,
            };
            const res = await apiRoutes.ACCOUNT_REFRESH_TOKEN.call(
              { token: token.user.refreshToken },
              headers
            );
            if (res.status == Enum.Api.Response.Status.OK) {
              return { ...token, user: { ...token.user, ...res.data } };
            }
          } catch (error) {}
        }
      }

      if (user) {
        return { ...token, user };
      }

      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
};

export default authOptions;
