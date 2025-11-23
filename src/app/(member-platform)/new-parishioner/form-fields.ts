import { z } from "zod";
import { FormFieldsType } from "../../../../types";
import { getDateMaxValue } from "@/utils/time";

export const MARITAL_STATUS_OBJ = [
  { name: "Single", value: "SINGLE" },
  { name: "Married", value: "MARRIED" },
  { name: "Separated", value: "SEPARATED" },
  { name: "Widowed", value: "WIDOWED" },
  { name: "Religious (Priest / Sister / Brother)", value: "RELIGIOUS" },
];


export const ProfileFields: FormFieldsType = [
  {
    type: "text",
    name: "title",
    label: "Title",
    placeholder: "e.g., Miss, Mr., Mrs., Dr., Dr. (Ph.D.), etc.",
    required: true,
  },

  [
    {
      type: "text",
      name: "firstName",
      label: "First Name",
      placeholder: "Enter your first name",
      required: true,
    },
    {
      type: "text",
      name: "lastName",
      label: "Last name (Surname)",
      placeholder: "Enter your last name",
      required: true,
    },
  ],
  {
    type: "text",
    name: "otherNames",
    label: "Other names",
    placeholder: "Enter the other names you have",
    required: false,
  },
  {
    type: "date",
    name: "dateOfBirth",
    label: "Date of Birth",
    placeholder: "e.g., 07/08/2000",
    required: true,
    max: getDateMaxValue(),
  },
  {
    type: "text",
    name: "phoneNumber",
    label: "Phone Number",
    placeholder: "e.g., +233 (0) 24 567 2728",
    required: true,
  },
  {
    type: "email",
    name: "email",
    label: "Email Address",
    placeholder: "e.g., mail@gmail.com",
    required: false,
  },
  {
    type: "select",
    name: "maritalStatus",
    label: "Marital Status",
    required: true,
    options: MARITAL_STATUS_OBJ,
  },
  {
    type: "file",
    name: "picture",
    label: "Picture",
    placeholder: "Drop your picture here",
    required: false,
    accept: "image/*",
  },
] as const;

export const HomeDetails: FormFieldsType = [
  {
    type: "text",
    name: "residentialAddress",
    label: "Residential Address",
    placeholder: "Enter your residential address",
    required: true,
  },
  {
    type: "text",
    name: "digitalAddress",
    label: "Digital Address (GPS)",
    placeholder: "Enter your home digital address",
    required: false,
  },
] as const;

export const WorkDetails: FormFieldsType = [
  [
    {
      type: "text",
      name: "occupation",
      label: "Occupation",
      placeholder: "Enter your occupational status",
      required: true,
    },
    {
      type: "text",
      name: "placeOfWork",
      label: "Place of Work",
      placeholder: "Enter the name of your work organization",
      required: false,
    },
  ],
  {
    type: "text",
    name: "workDigitalAddress",
    label: "Work Digital Address (GPS)",
    placeholder: "Enter your home digital address",
    required: false,
  },
] as const;

// export const ParishDetails: FormFieldsType = [
//   [
//     {
//       type: "select",
//       name: "station",
//       label: "Station",
//       required: true,
//       options: [
//         ...OutStations.map((station) => {
//           return { name: station.name, value: station.name };
//         }),
//         { name: "N/A", value: "N/A" },
//       ],
//     },
//     {
//       type: "select",
//       name: "community",
//       label: "Community",
//       required: true,
//       options: [
//         ...Communities.map((community) => {
//           return { name: community.name, value: community.name };
//         }),
//         { name: "N/A", value: "N/A" },
//       ],
//     },
//   ],
//   {
//     type: "multi-select",
//     name: "society",
//     label: "Societies",
//     required: true,
//     options: [
//       ...Societies.map((society) => {
//         return { name: society.name, value: society.name };
//       }),
//       { name: "N/A", value: "N/A" },
//     ],
//   },
// ] as const;

export const OtherDetails: FormFieldsType = [
  [
    {
      type: "text",
      name: "emergencyContactName",
      label: "Enter emergency person name",
      required: true,
    },
    {
      type: "text",
      name: "emergencyContact",
      label: "Enter emergency person contact",
      required: true,
    },
  ],
] as const;

export const MemberProfileSchema = z.object({
  // Profile Fields
  title: z.string().min(1, "Title is required"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  otherNames: z.string().optional(),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  email: z.email("Invalid email address").optional(),
  maritalStatus: z.enum(MARITAL_STATUS_OBJ.map((status) => status.value)),

  // Home Details
  residentialAddress: z.string().min(1, "Residential address is required"),
  digitalAddress: z.string().optional(),

  // Work Details
  occupation: z.string().min(1, "Occupation is required"),
  placeOfWork: z.string().optional(),
  workDigitalAddress: z.string().optional(),

  // Parish Details
  stationId: z.string().min(1, "Station is required"),
  communityId: z.string().min(1, "Community is required"),
  // societies: z.string().min(1, "Societies are required"),

  // Other Details
  emergencyContactName: z.string().min(1, "Emergency person name is required"),
  emergencyContact: z.string().min(1, "Emergency contact is required"),
});

export type MemberProfile = z.infer<typeof MemberProfileSchema>;

export type MemberFieldNames =
  | "title"
  | "firstName"
  | "lastName"
  | "otherNames"
  | "dateOfBirth"
  | "phoneNumber"
  | "email"
  | "maritalStatus"

  // Home Details
  | "residentialAddress"
  | "digitalAddress"

  // Work Details
  | "occupation"
  | "placeOfWork"
  | "workDigitalAddress"

  // Parish Details
  | "stationId"
  | "communityId"

  // Other Details
  | "emergencyContactName"
  | "emergencyContact";
