/* eslint-disable @typescript-eslint/no-explicit-any */

import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { selectMinimalSessionUser, selectMinimalTokenData } from "./helpers";

const UserStates = {
  parishioner: {
    route: "/parishioner",
    loginPathName: "parishioner",
  },
  catechist: {
    route: "/catechist",
    loginPathName: "leader",
  },
};
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        user: { label: "user", type: "text" },
        tokenData: { label: "tokenData", type: "text" },
        userType: { label: "userType", type: "string" },
      },
      async authorize(credentials) {
        console.log("Sigining in with credentials: ", credentials);
        if (!credentials) return null;

        if (credentials.user && credentials.tokenData) {
          const user = JSON.parse(credentials.user as string);
          const tokenData = JSON.parse(credentials.tokenData as string);
          const userType = JSON.parse(credentials.userType as string);
          return { ...user, tokenData, userType };
        }

        return null;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update" && session) {
        return { ...token, ...session };
      }

      if (user) {
        const u = user as any;
        token.user = selectMinimalSessionUser(u);
        token.tokenData = selectMinimalTokenData(u.tokenData ?? {});
        token.userType = u.userType;
      }

      return token;
    },
    async session({ session, token }) {
      session.user = token.user as any;
      session.userType = token.userType as string;
      session.tokenData = token.tokenData as any;
      return session;
    },

    async authorized({ request, auth }) {
      const isLoggedIn = !!auth?.user;

      const pathname = request.nextUrl.pathname;
      const authName = pathname.split("/")[1];
      console.log("getting: ", authName);
      const objectState = UserStates[authName as keyof typeof UserStates];

      console.log("ObjectState: ", objectState);

      if (objectState && !isLoggedIn) {
        return Response.redirect(
          new URL(`/auth/${authName}/login`, request.url)
        );
      }

      if (authName !== auth?.userType?.toLowerCase()) {
        return Response.redirect(
          new URL(`/auth/${authName}/login`, request.url)
        );
      }

      console.log("Returning true");

      return true;
    },
  },
});

export const runtime = "nodejs";
