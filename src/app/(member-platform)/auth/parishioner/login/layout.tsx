/* eslint-disable @next/next/no-img-element */
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Parishioner Sign in - OLA Members Platofrm",
  description: "Sign into the OLA members platform",
};

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="w-full h-dvh">
      <div className="z-5 absolute bg-gradient-to-b from-bg-gradient-from to-bg-gradient-to opacity-20 w-full h-full"></div>
      <img
        src={"/images/mary-high-contrast.png"}
        alt="blessed virgin mary"
        className="top-1/2 -left-23 z-10 absolute opacity-5 w-auto h-auto object-contain -translate-y-1/2"
      />
      <div className="z-20 absolute w-full h-full">{children}</div>
    </div>
  );
};

export default Layout;
