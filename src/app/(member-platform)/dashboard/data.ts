import { NavElementWithPems } from "../../../../types";

export const newOptions: NavElementWithPems[] = [
  {
    name: "Resident Priest",
    href: "/new/forms/resident-priest",
    permission: "create:priest",
  },
  {
    name: "Visiting Priest",
    href: "/new/forms/visiting-priest",
    permission: "create:priest",
  },
  {
    name: "Catechist",
    href: "/new/forms/catechist",
    permission: "manage:catechist",
  },
  {
    name: "Accountant",
    href: "/new/forms/accountant",
    permission: "manage:accountant",
  },
  {
    name: "Parishioner",
    href: "/new/forms/parishioner",
    permission: "*",
  },
];

export const subPages: NavElementWithPems[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
    permission: "*",
  },
  {
    name: "Parishioners",
    href: "/dashboard/parishioners",
    permission: "get:parishioner",
  },
  {
    name: "Baptisms",
    href: "/dashboard/baptisms",
    permission: "get:baptism",
  },
  {
    name: "Confirmations",
    href: "/dashboard/confirmations",
    permission: "get:confirmation",
  },
  {
    name: "Marriages",
    href: "/dashboard/marriages",
    permission: "get:marriage",
  },
  {
    name: "Catechists",
    href: "/dashboard/catechists",
    permission: "get:catechist",
  },
  {
    name: "Accountants",
    href: "/dashboard/accountants",
    permission: "get:accountant",
  },
  {
    name: "Groups",
    href: "/dashboard/groups",
    permission: "get:parish-groups",
  },
  {
    name: "Outstations",
    href: "/dashboard/outstations",
    permission: "get:parish-groups",
  },
  {
    name: "Payments",
    href: "/dashboard/payments",
    permission: "get:payment",
  },
];

export const rangeOptions = [
  { id: "current_week", label: "Current Week" },
  { id: "last_week", label: "Last Week" },

  { id: "current_month", label: "Current Month" },
  { id: "last_month", label: "Last Month" },

  { id: "q1", label: "1st Quarter" },
  { id: "q2", label: "2nd Quarter" },
  { id: "q3", label: "3rd Quarter" },
  { id: "q4", label: "4th Quarter" },

  { id: "current_year", label: "Whole Year" },
  { id: "last_year", label: "Last Year" },

  { id: "last_7_days", label: "Last 7 Days" },
  { id: "last_30_days", label: "Last 30 Days" },
  { id: "last_90_days", label: "Last 90 Days" },

  { id: "all_time", label: "All Time" },
  { id: "custom", label: "Custom Range" },
] as const;
