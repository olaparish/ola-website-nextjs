/* eslint-disable @next/next/no-img-element */
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
    <div className="bg-transparent px-2 sm:px-7.5 py-7.5">
      <div>
        {/* <img
          src={"/images/mary-high-contrast-full.png"}
          alt="blessed virgin mary"
          className="top-25 right-0 -z-10 absolute opacity-5 w-auto h-[calc(100vh-100px)] object-contain"
        /> */}
        <NewInitiationHeader />
        <div>{children}</div>
      </div>
    </div>
  );
}
