import NewParishionerHeader from "@/components/layout/headers/new-parishioner";
import { useQuery } from "@tanstack/react-query";
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
  //   const {} = useQuery({});
  return (
    <html lang="en">
      <body className="antialiased">
        <NewParishionerHeader />
        <main>{children}</main>
      </body>
    </html>
  );
}
