import CredentialsProvider from "next-auth/providers/credentials";
import { JWT, NextAuthOptions } from "next-auth";
import { UserService } from "@/service/clientService";

const authOptions: NextAuthOptions = {
  providers: [
    // GitHubProvider({
    //   clientId: process.env.GITHUB_ID ?? "",
    //   clientSecret: process.env.GITHUB_SECRET ?? "",
    // }),
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
        const data = {
          email: credentials.username,
          password: credentials.password,
        };
        //const formData = toFormData(data);
        try {
          const headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            credentials: JSON.stringify(credentials),
          };

          const res = await UserService.login.call(
            data,
            headers,
            req.headers?.origin
          );

          const resData = res?.data?.data;

          if (res && resData) {
            console.log("LOGIN RETURN ::", resData);
            return {
              ...resData.auth,
              ...resData.user,
              picture: resData.profile.avatar,
            };
          } else {
            console.error("Authorization failed:", resData);
            return null;
          }
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/account",
  },
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
        token.accessToken = user.accessToken;
      }

      return token;
    },
    async session({ session, token }) {
      session.user = token.user as any;
      return session;
    },
  },
};

export default authOptions;
