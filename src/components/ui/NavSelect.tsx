"use client";
import React, { useState } from "react";
import { NavElement } from "../../../types";
import Link from "next/link";
import { RiArrowDropDownLine } from "react-icons/ri";
import { cn } from "@/lib/utils";

type Props = {
  direction?: "to-right" | "to-left";
  name: string;
  items: NavElement[];
};
const NavSelect = ({ name, items, direction = "to-left" }: Props) => {
  const [showNav, setShowNav] = useState(false);

  return (
    <div className="relative">
      <div
        className="flex items-center gap-3 bg-secondary-900 px-5.5 py-3 w-fit text-white cursor-pointer"
        onClick={() => setShowNav((prev) => !prev)}
      >
        <p className="text-sm">{name}</p>
        <RiArrowDropDownLine className="size-7" />
      </div>
      {showNav && (
        <nav
          className={cn(
            "top-14 z-10 absolute bg-primary-100 py-6 w-44",
            direction === "to-right" ? "left-0" : "right-0"
          )}
        >
          {items.map((it, index) => (
            <div
              className="hover:bg-primary-700 py-2.5 pl-10 hover:text-white cursor-pointer"
              key={index}
            >
              <SelectNavItem {...it} />
            </div>
          ))}
        </nav>
      )}
    </div>
  );
};

const SelectNavItem = ({ href, name }: NavElement) => {
  return (
    <Link className="block w-30 truncate" href={href}>
      {name}
    </Link>
  );
};

export default NavSelect;
