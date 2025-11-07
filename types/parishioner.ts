/* eslint-disable @typescript-eslint/no-explicit-any */
import { MARITAL_STATUS } from ".";

export type CreateParishionerResponseType = { token: string };

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
  societies: Record<string, any>; // or string[] if applicable

  // Sacramental details
  isBaptised?: boolean;
  baptismDate?: string;
  isConfirmed?: boolean;
  confirmationDate?: string;

  // Parents
  fatherIsParishioner?: boolean;
  fatherFirstName?: string;
  fatherLastName?: string;
  fatherOtherNames?: string;
  fatherPhoneNumber?: string;
  fatherResidentialAddress?: string;

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
