"use client";
import { ImageInput, Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import MultiSelect from "@/components/ui/MultiSelect";
import Select from "@/components/ui/Select";
import TagInput from "@/components/ui/TagInput";
import React, { useState } from "react";
import { NavElement, SelectOption } from "../../../../types";
import NavSelect from "@/components/ui/NavSelect";
import {
  MemberNavigation,
  ParishionerNavigation,
  SecondaryNavigation,
} from "@/components/layout/navigations/Navigation";
import DashboardCard from "@/components/ui/DashboardCard";
import TestForm from "@/components/forms/TestForm";

const options = [
  { name: "Apple", value: "apple" },
  { name: "Banana", value: "banana" },
  { name: "Orange", value: "orange" },
  { name: "Mango", value: "mango" },
  { name: "Pineapple", value: "pineapple" },
  { name: "Strawberry", value: "strawberry" },
  { name: "Watermelon", value: "watermelon" },
  { name: "Grapes", value: "grapes" },
  { name: "Blueberry", value: "blueberry" },
  { name: "Papaya", value: "papaya" },
];

const navItems: NavElement[] = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Baptisms", href: "/baptisms" },
  { name: "Confirmations", href: "/components" },
  { name: "First Commmunicants", href: "/first-communicants" },
  { name: "Marriages", href: "/marriages" },
];

const Page = () => {
  const [selected, setSelected] = useState<SelectOption[]>([]);
  const handleSelectChange = (values: SelectOption[]) => {
    setSelected(values);
  };

  return (
    <div className="">
      <div className="px-5">
        <TestForm />
      </div>
      <div className="flex flex-col gap-5 p-4">
        <MemberNavigation matcherType="ends-with" items={navItems} />
        <SecondaryNavigation matcherType="ends-with" items={navItems} />
        <ParishionerNavigation matcherType="ends-with" items={navItems} />
      </div>
      <div className="flex flex-col gap-5 p-4 w-100">
        <DashboardCard title="Number of Baptisms" subtitle="500" />
        <NavSelect name="Add" items={navItems} />
        <Label htmlFor="ddkdk">FirstName</Label>
        <Input type="date" placeholder="please select" />
        <ImageInput name="filename" />
        <Select options={options} />
        <TagInput value="Knights of St. John International and Ladies Auxiliary" />
        <TagInput value="Caritas" />

        <MultiSelect options={options} setValue={handleSelectChange} />
      </div>
    </div>
  );
};

export default Page;
