import z from "zod";

export const MaritalStatusSchema = z.enum([
  "MARRIED",
  "SINGLE",
  "DIVORCED",
  "SEPARATED",
  "WIDOWED",
  "RELIGIOUS",
]);

export type MaritalStatus = z.infer<typeof MaritalStatusSchema>;
