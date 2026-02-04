/* eslint-disable @typescript-eslint/no-explicit-any */

import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { selectMinimalSessionUser, selectMinimalTokenData } from "./helpers";
import { UserTypes } from "../../types";

const UserStates = {
  parishioner: {
    route: "/parishioner",
    loginPathName: "parishioner",
  },
  "parish-group": {
    route: "/parish-group",
    loginPathName: "leader",
  },
  catechist: {
    route: "/catechist",
    loginPathName: "leader",
  },
  "parish-priest": {
    route: "/parish-priest",
    loginPathName: "leader",
  },
  priest: {
    route: "/priest",
    loginPathName: "leader",
  },
  "parish-youth": {
    route: "/parish-youth",
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
        if (!credentials) return null;

        if (credentials.user && credentials.tokenData) {
          const user = JSON.parse(credentials.user as string);
          // console.log("User: ", user);
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
      session.userType = token.userType as UserTypes;
      session.tokenData = token.tokenData as any;
      return session;
    },

    async authorized({ request, auth }) {
      const isLoggedIn = !!auth?.user;

      const pathname = request.nextUrl.pathname;
      const authName = pathname.split("/")[1];
      const objectState = UserStates[authName as keyof typeof UserStates];

      if (authName === "dashboard") {
        if (!isLoggedIn) {
          return Response.redirect(
            new URL("/auth/parishioner/login", request.url)
          );
        }
        return true;
      }

      if (objectState && !isLoggedIn) {
        return Response.redirect(
          new URL(`/auth/${objectState.loginPathName}/login`, request.url)
        );
      }
      const userType = auth?.userType?.toLowerCase() as string;
      const isParishGroup = ["community", "outstation", "society"].includes(
        userType
      );

      const isParishGroupRoute = authName === "parish-group";
      if (isParishGroup && isParishGroupRoute) {
        return true;
      }
      if (authName !== userType) {
        console.log("Here, auth name not = user type: ", {
          authName,
          userType,
        });
        // return Response.redirect(
        //   new URL(`/auth/${objectState.loginPathName}/login`, request.url)
        // );
      }

      return true;
    },
  },
});

export const runtime = "nodejs";