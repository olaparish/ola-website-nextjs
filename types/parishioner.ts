/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseUser, MARITAL_STATUS, ParishGroup } from ".";

export type CreateParishionerResponseType = { token: string; id: string };

export interface Parishioner {
  id?: string;
  userId: string;
  title: string;
  dateOfBirth: string;
  picture?: string;
  maritalStatus: MARITAL_STATUS;

  // Spouse
  spouseIsParishioner?: string;
  spouseFirstName?: string;
  spouseLastName?: string;
  spouseOtherNames?: string;
  spousePhoneNumber?: string;
  spouseAddress?: string;

  // Address
  residentialAddress: string;
  digitalAddress?: string;

  // Occupation
  occupation: string;
  placeOfWork?: string;
  workDigitalAddress?: string;

  // Parish details
  communityId: string;
  stationId: string;
  societies: ParishGroup[]; // or string[] if applicable

  // Sacramental details
  isBaptised?: boolean;
  baptismDate?: string;
  isConfirmed?: boolean;
  confirmationDate?: string;

  // Parents
  fatherIsAlive?: boolean;
  fatherIsCatholic?: boolean;
  fatherParishionerId?: string;
  fatherIsParishioner?: boolean;
  fatherFirstName?: string;
  fatherLastName?: string;
  fatherOtherNames?: string;
  fatherPhoneNumber?: string;
  fatherResidentialAddress?: string;

  motherIsAlive?: boolean;
  motherIsCatholic?: boolean;
  motherParishionerId?: string;
  motherIsParishioner?: boolean;
  motherFirstName?: string;
  motherLastName?: string;
  motherOtherNames?: string;
  motherPhoneNumber?: string;
  motherResidentialAddress?: string;

  // Emergency contact
  emergencyContactName: string;
  emergencyContact: string;

  // System fields
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type UpdateParishionerOmmissions =
  | "id"
  | "userId"
  | "deletedAt"
  | "createdAt"
  | "updatedAt";

export type UpdateParishionerDtoType = {
  firstName?: string;
  lastName?: string;
  otherNames?: string;
  email?: string;
  avatar?: string;
  phoneNumber?: string;
  title?: string;
  dateOfBirth?: string;
  picture?: string;
  maritalStatus?:
    | "SINGLE"
    | "MARRIED"
    | "SEPARATED"
    | "WIDOWED"
    | "DIVORCED"
    | "RELIGIOUS";
  emergencyContactName?: string;
  emergencyContact?: string;
  residentialAddress?: string;
  digitalAddress?: string;
  occupation?: string;
  placeOfWork?: string;
  workDigitalAddress?: string;

  // Parents
  motherFirstName?: string;
  motherLastName?: string;
  motherOtherNames?: string;
  motherPhoneNumber?: string;
  motherResidentialAddress?: string;
  motherIsParishioner?: boolean;
  motherIsAlive?: boolean;
  motherIsCatholic?: boolean;
  motherParishionerId?: string;
  fatherFirstName?: string;
  fatherLastName?: string;
  fatherOtherNames?: string;
  fatherPhoneNumber?: string;
  fatherResidentialAddress?: string;
  fatherIsParishioner?: boolean;
  fatherIsAlive?: boolean;
  fatherIsCatholic?: boolean;
  fatherParishionerId?: string;
};

export type UpdateParishDetailsDtoType = {
  communityId?: string;
  stationId?: string;
  societies?: string[];
};

export interface ParishionerWitUser extends Parishioner {
  user: BaseUser;
}

export interface DetailedParishioner extends Parishioner {
  baptism?: any;
  confirmation?: any;
  marriage?: any;
  groups?: ParishGroup[];
  fatherParishioner?: DetailedParishionerUser;
  motherParishioner?: DetailedParishionerUser;
}

export interface DetailedParishionerUser {
  user:BaseUser,
  userData: DetailedParishioner;
}

export type PaginateResult<T> = {
  docs: T[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
};

export interface ReceiptItem {
  id: string;
  receiptId: string;
  parishionerId?: string;
  amount: number;
  createdAt: string;
  updatedAt: string;
  parishioner?: any;
  receipt?: any;
}

export interface Receipt {
  id: string;
  categoryId: string;
  description?: string;
  totalAmount: number;
  date: string;
  createdById: string;
  deletedAt?: string;
  createdAt: string;
  updatedAt: string;
  category?: any;
  items?: ReceiptItem[];
}

export interface DebitRequest {
  id: string;
  title: string;
  description: string;
  amount: number;
  recipientId?: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'DISBURSED';
  createdById: string;
  reviewedById?: string;
  rejectionReason?: string;
  disbursedAt?: string;
  deletedAt?: string;
  createdAt: string;
  updatedAt: string;
  recipient?: any;
  creator?: any;
  reviewer?: any;
}

export interface FinancialReport {
  summary: {
    totalReceipts: number;
    totalExpenditures: number;
  };
  data: PaginateResult<Receipt | DebitRequest>;
}

// const GetDetailedParishionerDetails = {
//   user: User,
//   userData: DetailedParishioner,
// };