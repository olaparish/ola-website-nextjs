/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import React, { MouseEvent, useState } from "react";
import { IconClose } from "../icons/icon-close";
import { MobileDropDownProps, MultiDropDownProps } from "../../../types";
import { IconChevronDown } from "../icons/chevron-down";
import { IconChevronRight } from "../icons/chevron-right";
import { communitiesData, outstationsData, societiesData } from "@/data";
import { aboutDropdownData } from "./headers/header";

interface Props {
  closeHandler: () => void;
}

const MobileNavigation = ({ closeHandler }: Props) => {
  return (
    <div>
      <div className="p-5 text-white">
        <div className="flex justify-between items-center">
          <Link href="/home">
            <img src="/logo.webp" alt="ourshea" className="w-22.5 h-9.75" />
          </Link>
          <IconClose className="size-6 text-white" onClick={closeHandler} />
        </div>

        <nav className="flex flex-col gap-5 mt-4">
          <Link className="text-2xl" href="/home">
            Home
          </Link>
          <MobileDropDown {...aboutDropdownData} onCloseMenu={closeHandler} />
          <MobileMultiDropDown
            name={"organizations"}
            data={[societiesData, communitiesData, outstationsData]}
          />
          <Link className="text-2xl" href="/the-catholic-faith">
            The Catholic Faith
          </Link>

          <Link className="text-2xl" href="about/contact-us">
            Contact Us
          </Link>
          <Link className="text-2xl" href="/auth">
            Member Area
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default MobileNavigation;

const MobileMultiDropDown = (props: MultiDropDownProps) => {
  const [showItems, setShowItems] = useState<boolean>(false);
  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setShowItems((prev) => !prev);
  };
  return (
    <div className="" onClick={handleClick}>
      <div className="flex items-center gap-1 text-2xl">
        <span>{props.name}</span>
        {showItems ? <IconChevronDown /> : <IconChevronRight />}
      </div>

      {showItems && (
        <ul className="flex flex-col gap-2 mt-4 ml-5">
          {props.data.map((option, indx) => {
            return (
              <div key={indx}>
                <MobileDropDown {...option} ulClassName="gap-6" headerClassName="text-xl" />
              </div>
            );
          })}
        </ul>
      )}
    </div>
  );
};

const MobileDropDown = (props: MobileDropDownProps) => {
  const [showItems, setShowItems] = useState<boolean>(false);
  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setShowItems((prev) => !prev);
    if (showItems && props.onCloseMenu) props.onCloseMenu();
  };
  return (
    <div className={"" + props.className} onClick={handleClick}>
      <div className={"flex items-center gap-1 text-2xl " + props.headerClassName}>
        <span>{props.name}</span>
        {showItems ? <IconChevronDown /> : <IconChevronRight />}
      </div>

      {showItems && (
        <ul className={"flex flex-col gap-2 mt-4 ml-5 " + props.ulClassName}>
          <Link href={"/about"} className="text-xl">
            {props.name}
          </Link>
          {props.options.map((option, indx) => {
            return (
              <Link key={indx} href={option.to} className="text-xl">
                {option.name}
              </Link>
            );
          })}
        </ul>
      )}
    </div>
  );
};
