import SignoutBtn from "@/components/common/signout-btn";
import ParishionerHeader from "@/components/layout/headers/parishioner.header";
import { ParishionerNavigation } from "@/components/layout/navigations/Navigation";
import NavSelect from "@/components/ui/NavSelect";
import type { Metadata } from "next";
import React from "react";
import { NavElement } from "../../../../../types";

export const metadata: Metadata = {
  title: "Parishioner",
  description: "OLA Parishioner dashboard",
};

const subPages: NavElement[] = [
  {
    name: "Profile",
    href: "profile",
  },
  {
    name: "Marriage",
    href: "marriage",
  },
  {
    name: "Home",
    href: "home",
  },
  {
    name: "Work",
    href: "work",
  },
  {
    name: "Parish",
    href: "parish",
  },
  {
    name: "Parents",
    href: "parents",
  },
  {
    name: "Other",
    href: "other",
  },
];

type Props = {
  children: React.ReactNode;
};
export default function Layout({ children }: Readonly<Props>) {
  return (
    <div className="p-7.5 px-2 sm:px-7.5">
      <div className="antialiased">
        <ParishionerHeader />

        <div>
          <div className="">
            <SignoutBtn />
            {/* <div className="flex justify-end-safe pt-4.75">
              <NavSelect
                name="Add"
                items={[{ name: "Initation", href: "/society/new-initation" }]}
              />
            </div> */}

            <header>
              <h2 className="font-normal">Overview</h2>
              <p className="text-secondary-900">All your details</p>
            </header>

            <div className="flex justify-center mt-10">
              <ParishionerNavigation matcherType="ends-with" items={subPages} />
            </div>
            <main className="mt-5">{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
}
