import { User } from "./users";

type BasePriest = {
  id: string;
  userId: string;
  createdBy: string;
  bio: string;
  type: "RESIDENT" | "VISITING";
  isParishPriest: boolean;
  title: string;
  designation: string;
  arrivalDate: Date;
  departureDate?: null;
  parish?: null;
  diocese?: null;
  deletedAt?: null;
  createdAt: Date;
  updatedAt: Date;
};

export type Priest = BasePriest;

export type PriestUser = BasePriest & {
  user: User;
};

export type ParishPriest = {
  id: string;
  priestId: string;
  isCurrent: boolean;
  message: string;
  picture: string;
  deletedAt?: null;
  createdAt: string;
  updatedAt: string;
};

export type GetParishPriestType = {
  parishPriest: ParishPriest;
  priest: Priest;
  user: User;
};

export type CreateResidentPristDto = {
  firstName: string;
  lastName: string;
  otherNames: string;
  email: string;
  phoneNumber: string;
  avatar?: string;
  title: string;
  designation: string;
  arrivalDate: string;
};

export type CreateVisitingPristDto = CreateResidentPristDto & {
  parish: string;
  diocese: string;
};