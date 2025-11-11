import { SessionUser, UserTypes } from "./users";

declare module "next-auth" {
  interface Session {
    userType?: UserTypes;
    user?: SessionUser;
    tokenData?: StaffTokenData | OrganizationTokenData;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userType?: string;
    user?: StaffUser | OrganizationUser;
    tokenData?: StaffTokenData | OrganizationTokenData;
    sub?: string;
    exp?: number;
    iat?: number;
    jti?: string;
  }
}
