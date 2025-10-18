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
    <html lang="en">
      <body className="antialiased">
        <main>{children}</main>
      </body>
    </html>
  );
}
