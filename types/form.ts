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
  required?: boolean;
  placeholder?: string;
  options?: SelectOption[];
  multiSelectValues?: SelectOption[];
  max?: number | number | string;
  accept?: string;
  isEditable?: boolean;
  // parseFieldNames?: (fields: any) => any;
};

export type FormFieldsType = (FormFieldType | FormFieldType[])[];
export type NewParishionerFormData = z.infer<typeof MemberProfileSchema>;
