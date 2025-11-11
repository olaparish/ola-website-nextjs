import ParishGroupsHeader from "@/components/layout/headers/parish-groups.header";
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Parishioner",
  description: "OLA Parishioner dashboard",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="p-7.5 px-2 sm:px-7.5">
      <body className="antialiased">
        <ParishGroupsHeader />
        <main>{children}</main>
      </body>
    </div>
  );
}
