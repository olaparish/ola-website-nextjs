import NewParishionerHeader from "@/components/layout/headers/new-parishioner";
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "New Parishioner",
  description: "New OLA Parishioner registration form",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="antialiased">
      <NewParishionerHeader />
      <main>{children}</main>
    </div>
  );
}
