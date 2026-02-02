import { BaseUser } from "./users";

export type Accountant = {
  id: string;
  userId: string;
  createdBy: string;
  deletedAt: string;
  createdAt: string;
  updatedAt: string;
};

export type AccountantUser = {
  id: string;
  userId: string;
  createdBy: string;
  deletedAt: string;
  createdAt: string;
  updatedAt: string;
  user: BaseUser;
};

export type CreateAccountantDto = {
  firstName: string;
  lastName: string;
  otherNames: string;
  email: string;
  phoneNumber: string;
  gender: 'MALE' | 'FEMALE';
  avatar?: string;
};
