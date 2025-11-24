import type { Metadata } from "next";
import React from "react";
import "./globals.css";
import Providers from "@/lib/providers";

export const metadata: Metadata = {
  title: {
    default: "OLA Parish Bolgatanga | Our Lady Queen of Africa",
    template: "%s | OLA Parish Bolgatanga",
  },
  description:
    "Welcome to Our Lady Queen of Africa (OLA) Parish, Bolgatanga. A vibrant Catholic community in the Navrongo-Bolgatanga Diocese, dedicated to faith, worship, and service.",
  keywords: [
    "OLA Parish",
    "Our Lady Queen of Africa",
    "Bolgatanga Catholic Church",
    "Navrongo-Bolgatanga Diocese",
    "Catholic Church Ghana",
    "Mass Schedule Bolgatanga",
    "Rev Fr Lawrence Azure",
  ],
  authors: [{ name: "Louis Marie Atoluko Ayariga" }],
  creator: "Louis Marie Atoluko Ayariga",
  publisher: "OLA Parish Bolgatanga",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "OLA Parish Bolgatanga | Our Lady Queen of Africa",
    description:
      "Welcome to Our Lady Queen of Africa (OLA) Parish, Bolgatanga. Join our vibrant Catholic community in faith, worship, and service.",
    url: "https://olaparishbolga.com", // Assuming a domain, can be updated later
    siteName: "OLA Parish Bolgatanga",
    images: [
      {
        url: "/logo.webp",
        width: 800,
        height: 600,
        alt: "OLA Parish Bolgatanga Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OLA Parish Bolgatanga",
    description:
      "Welcome to Our Lady Queen of Africa (OLA) Parish, Bolgatanga. Join our vibrant Catholic community.",
    images: ["/logo.webp"],
  },
  icons: {
    icon: "/logo.webp",
    shortcut: "/logo.webp",
    apple: "/logo.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-transparent antialiased">
        <Providers>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}



