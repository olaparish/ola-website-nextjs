import { ParishGroup } from "./parish-groups.types";
import { BaseUser } from "./users";

export type Catechist = {
  id: string;
  userId: string;
  station: string;
  createdBy: string;
  deletedAt: string;
  createdAt: string;
  updatedAt: string;
  groups: ParishGroup[];
};

export type CatechistUser = {
  id: string;
  userId: string;
  station: string;
  createdBy: string;
  deletedAt: string;
  createdAt: string;
  updatedAt: string;
  groups: ParishGroup[];
  user: BaseUser;
};

export type CreateCatechistDto = {
  firstName: string;
  lastName: string;
  otherNames: string;
  email: string;
  phoneNumber: string;
  avatar?: string;
  station: string;
};
