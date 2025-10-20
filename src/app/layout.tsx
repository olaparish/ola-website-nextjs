import type { Metadata } from "next";
import React from "react";
import "./globals.css";
import Providers from "@/lib/providers";

export const metadata: Metadata = {
  title: "OLA Parish",
  description: "OLA Parish Bolgatanga. Navrongo Bolgatange Diocese",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Providers>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}



