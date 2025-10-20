import Image from "next/image";
import Link from "next/link";
import React from "react";

const NewParishionerHeader = () => {
  return (
    <header className="justify-between items-center grid grid-cols-[auto_1fr] p-7.5">
      <Link href={"/home"}>
        <Image
          width={225}
          height={97.5}
          className="w-22.5 h-9.75"
          src="/logo.webp"
          alt="ola parish logo"
        />
      </Link>
      <div className="flex justify-center">
        <div className="shadow-[0_2px_6px_0_rgba(0,0,0,0.1)] px-11 py-3.75 font-medium text-sm">
          Parishioner Sign Up Form
        </div>
      </div>
    </header>
  );
};

export default NewParishionerHeader;
