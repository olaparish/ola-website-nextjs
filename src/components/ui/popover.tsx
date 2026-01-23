"use client";
import React, { useEffect, useRef, useState } from "react";
import { NavElement } from "../../../types";
import { RiArrowDropDownLine } from "react-icons/ri";
import { cn } from "@/lib/utils";
import Link from "next/link";

type Props = {
  name: string;
  items: NavElement[];
  render?: (item: NavElement) => React.ReactNode;
};

const PopoverSelect = ({ name, items, render = SelectNavItem }: Props) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Clamp dropdown into viewport
  useEffect(() => {
    if (!open || !dropdownRef.current) return;

    const dropdown = dropdownRef.current;
    const rect = dropdown.getBoundingClientRect();
    const viewportWidth = window.innerWidth;

    let shiftX = 0;

    if (rect.left < 8) {
      shiftX = 8 - rect.left;
    } else if (rect.right > viewportWidth - 8) {
      shiftX = viewportWidth - 8 - rect.right;
    }

    dropdown.style.transform = `translateX(${shiftX}px)`;
  }, [open]);

  return (
    <div ref={containerRef} className="inline-block relative">
      {/* Trigger */}
      <button
        type="button"
        className="flex items-center gap-3 bg-secondary-900 px-5.5 py-3 text-white cursor-pointer"
        onClick={() => setOpen((v) => !v)}
      >
        <p className="text-sm">{name}</p>
        <RiArrowDropDownLine
          className={cn("size-7 transition-transform", open && "rotate-180")}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <nav
          ref={dropdownRef}
          className={cn(
            "z-50 absolute mt-2",
            "left-1/2 -translate-x-1/2",
            "w-44 max-w-[90vw]",
            "rounded-md bg-primary-100 py-2 shadow-lg"
          )}
        >
          {items.map((it, index) => (
            <div
              key={index}
              className="hover:bg-primary-700 px-4 py-2.5 hover:text-white cursor-pointer"
              onClick={() => setOpen(false)}
            >
              {render(it)}
            </div>
          ))}
        </nav>
      )}
    </div>
  );
};

const SelectNavItem = ({ name, href }: NavElement) => {
  return (
    <Link href={href} className="block truncate">
      {name}
    </Link>
  );
};

export default PopoverSelect;
