import z from "zod";
import { SelectOption } from ".";
import { MemberProfileSchema } from "@/app/(member-platform)/new-parishioner/form-fields";

export type InputType =
  | "text"
  | "number"
  | "password"
  | "email"
  | "tel"
  | "url"
  | "search"
  | "date"
  | "datetime-local"
  | "month"
  | "week"
  | "time"
  | "file"
  | "checkbox"
  | "radio"
  | "range"
  | "color"
  | "hidden"
  | "select"
  | "multi-select";

export type FormFieldType = {
  type: InputType;
  name: string;
  label: string;
  placeholder?: string;
  required: boolean;
  options?: SelectOption[];
  max?: number | number | string;
  accept?: string;
};

export type FormFieldsType = (FormFieldType | FormFieldType[])[];
export type NewParishionerFormData = z.infer<typeof MemberProfileSchema>;
