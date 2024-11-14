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
        
        // const res = await fetch(
        //   `${process.env.NEXT_PUBLIC_FAKE_API_BASE_URL}/login`,
        //   {
        //     method: "POST",
        //     body: JSON.stringify({
        //       email: credentials?.email,
        //       password: credentials?.password,
        //     }),
        //     headers: { "Content-Type": "application/json" },
        //   }
        // );
        // const user = await res.json();
        
        return {
          "message": "success",
          "success": true,
          "data": {
            "name": "Super Admin",
            "userType": "super",
            "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ZjAyNTBkMS03NTc1LTRiNmMtYjg1Yy0yZDM3YThlM2ZkZjAiLCJuYW1lIjoiU3VwZXIgQWRtaW4iLCJlbWFpbCI6InN1cGVyX2FkbWluQGdtYWlsLmNvbSIsInVzZXJUeXBlIjoic3VwZXIiLCJpYXQiOjE3MzE1NzMxNzAsImV4cCI6MTAwMTczMTU2NjI5MH0.3xGHnMKAjclesAOvArQbGOBk1Ju2pqUcT8fHFVziY1w",
            "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ZjAyNTBkMS03NTc1LTRiNmMtYjg1Yy0yZDM3YThlM2ZkZjAiLCJ0b2tlblR5cGUiOiJyZWZyZXNoIiwiaWF0IjoxNzMxNTczMTcwLCJleHAiOjEwMDE3MzE1NjYyOTB9.xRwuu8xNA_6Zv_1x-hrMwHR3wVe_ekMxwXCLalDpZks",
            "tokenExpirationTime": "999999993120s"
          }
        };
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
