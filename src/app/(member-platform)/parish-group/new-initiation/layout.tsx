import NewInitiationHeader from "@/components/layout/headers/new-initiation";
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
      <div className="antialiased">
        <NewInitiationHeader />
        <div>{children}</div>
      </div>
    </div>
  );
}
