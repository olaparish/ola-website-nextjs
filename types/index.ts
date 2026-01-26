import { rangeOptions } from "@/app/(member-platform)/dashboard/data";
import { BaseUser, UserDataType } from "./users";

export * from "./form";
export * from "./files";
export * from "./parish-groups.types";
export * from "./parishioner";
export * from "./inputs";
export * from "./users";
export * from "./table.types";
export * from "./group-initiation.types";
export * from "./priest.type";
export * from "./accountant.type";
export * from "./catechist.type";
export * from "./baptism";
export * from "./confirmation";
export * from "./marriage";
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

export type NavElementWithPems = NavElement & { permission?: string };

export type MARITAL_STATUS =
  | "SINGLE"
  | "MARRIED"
  | "SEPARATED"
  | "WIDOWED"
  | "DIVORCED"
  | "RELIGIOUS";

export interface GetUserDetails<T extends UserDataType> {
  user: BaseUser;
  userData: T;
}

export type DataGetType<T> = {
  message: string;
  data: T;
};

export type SuccessResponse = { status: string; message: string };

export type RangeOptionId = (typeof rangeOptions)[number]["id"];
