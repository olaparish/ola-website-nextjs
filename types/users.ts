import { ParishGroup } from "./parish-groups.types";
import { Parishioner } from "./parishioner";
import { GetParishPriestType } from "./priest.type";

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
  permissions: string[];
};

export type UserTypes =
  | "PARISHIONER"
  | "PARISH_PRIEST"
  | "PARISH_COUNCIL_CHAIRMAN"
  | "PRIEST"
  | "CATECHIST"
  | "ACCOUNTANT"
  | "COMMUNITY"
  | "SOCIETY"
  | "OUTSTATION";

export type UserDataType = Parishioner | ParishGroup | GetParishPriestType | null;

export interface ParishionerUser extends User<Parishioner> {
  societies: ParishGroup[];
  community: ParishGroup[];
  station: ParishGroup[];
};
export type ParishGroupUser = User<ParishGroup>;

export type AppUser = ParishionerUser | ParishGroupUser;

export interface User<T = UserDataType> extends BaseUser {
  userData: T;
}

export type SessionUser = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
  role: string;
  permissions: string[];
};

export type UpdateUserOmmissions = "id" | "role";