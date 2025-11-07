import { Parishioner } from "./parishioner";

export const Roles = {
  PARISHIONER: "PARISHIONER",
  PARISH_PRIEST: "PARISH_PRIEST",
  PARISH_COUNCIL_CHAIRMAN: "PARISH_COUNCIL_CHAIRMAN",
  PRIEST: "PRIEST",
  CATECHIST: "CATECHIST",
  ACCOUNTANT: "ACCOUNTANT",
  COMMUNITY: "COMMUNITY",
  SOCIETY: "SOCIETY",
  OUTSTATION: "OUTSTATION",
} as const;

export type UserRoleTypes = keyof typeof Roles;

export type UserAccountMeta = {
  id: string;
  isEmailVerified: boolean;
  authType?: string;
  hasEnabledTwoFactorAuth: boolean;
  twoFASecret?: string;
  hasSetPassword: boolean;
  ownerId: string;
  status: string;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type BaseUser = {
  id: string;
  tally?: string;
  firstName: string;
  lastName: string;
  otherNames?: string;
  ownerId: string;
  role: UserRoleTypes;
  email?: string;
  avatar?: string;
  phoneNumber: string;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  accountMeta?: UserAccountMeta;
};

export type UserTypes = Parishioner;

export interface User<T = UserTypes> extends BaseUser {
  userData: T;
}

export interface ParishionerUser extends BaseUser {
  userData: Parishioner;
}
