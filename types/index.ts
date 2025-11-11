export * from "./form";
export * from "./files";
export * from "./parish-groups.types";
export * from "./parishioner";
export * from "./inputs";
export * from "./users";
export * from "./table";
export interface MobileDropDownProps {
  name: string;
  to?: string;
  options: Option[];
  className?: string;
  headerClassName?: string;
  ulClassName?: string;
  onCloseMenu?: () => void;
}

export interface MultiDropDownOption {
  name: string;
  to: string;
}

export type MultiDropDownProps = {
  matcher?: string;
  name: string;
  data: { name: string; options: MultiDropDownOption[] }[];
};

export type Option = {
  name: string;
  to: string;
};

export interface DropDownProps {
  name: string;
  to: string;
  matcher: string;
  options: Option[];
  className?: string;
  headerClassName?: string;
  ulClassName?: string;
}

export type SelectOption = {
  name: string;
  value: string;
};

export type NavElement = {
  name: string;
  href: string;
};

export type MARITAL_STATUS =
  | "MARRIED"
  | "SINGLE"
  | "DIVORCED"
  | "SEPARATED"
  | "WIDOWED";

