import z from "zod";

export const MaritalStatusSchema = z.enum([
  "MARRIED",
  "SINGLE",
  "DIVORCED",
  "SEPARATED",
  "WIDOWED",
]);

export type MaritalStatus = z.infer<typeof MaritalStatusSchema>;
