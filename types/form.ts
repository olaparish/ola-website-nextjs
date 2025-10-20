import { SelectOption } from ".";

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
