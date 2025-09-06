/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div className="flex flex-wrap items-center">
      <img className="w-auto h-89" src="/images/general/mary-full.jpg" alt="mary" />
      <div className="space-y-5">
        <h2>Our Lady Queen Of Africa Parish, Bolgatanga</h2>
        <p className="">
          <em>
            P. O. Box 245
            <br /> Bolgatanga
            <br /> Upper East Region
            <br /> Ghana
            <br /> West Africa
          </em>
        </p>
        <Link href="mailto:info@olaparish.com" className="block text-primary-900">
          info@olaparish.com
        </Link>
        <Link href="tel:+233234567890">Phone: (233) 00 000-0000</Link>
      </div>
    </div>
  );
};

export default Page;
