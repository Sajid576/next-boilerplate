import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_AUTH_API_BASE_URL}/users/login`,
          {
            method: "POST",
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
            headers: { "Content-Type": "application/json" },
          }
        );
        const user = await res.json();
        // console.log("Login successful", user.data);
        // If no error and we have user data, return it

        if (res.ok && user) {
          const userInfoResponse = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/internal-user/my-info`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${user.data.accessToken}`,
                "Content-Type": "application/json",
              },
            }
          );

          const userInfo = await userInfoResponse.json();
          
          if (userInfo) {
            return {
              email: userInfo?.data?.email,
              status: userInfo?.data?.status,
              ...user.data,
            };
          }
        }
        return null;
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: any }) {
      // console.log("token,user", token, user);
      if (user) {
        token.accessToken = user?.accessToken;
        token.refreshToken = user?.refreshToken;
        token.user = {
          email: user?.email,
          name: user?.name,
          status: user?.status,
          userType: user?.userType,
        };
        token.role = user?.permissions;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      // console.log("session, token", session, token);
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.user = token.user;
      session.role = token.role;
      session.email = token.user?.email;
      session.status = token.user?.status;
      return session;
    },
  },
};
