import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { AccountService } from "@/service/clientService";

const authReturn = (res) => {
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
        if (!credentials?.password && req.query?.token) {
          const res = await AccountService.loginWithToken({
            token: req.query.token,
          });

          return authReturn(res);
        } else {
          const data = {
            email: credentials?.username,
            password: credentials?.password,
          };

          const headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            credentials: JSON.stringify(credentials),
          };

          const res = await AccountService.login(data, headers);
          console.log("[CLIENNT LOG RESPONSE]", res);

          return authReturn(res);
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      console.log("JWTye gelir", token, user);
      if (user) {
        token.user = user;
      }

      return token;
    },
    async session({ session, token }) {
      console.log("Sessionaaa ye gelir", session, token);
      session.user = token.user as any;
      return session;
    },
  },
};

export default authOptions;
