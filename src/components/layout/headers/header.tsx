/* eslint-disable @next/next/no-img-element */
"use client";
import { Fragment, useState } from "react";
import { IconChevronDown } from "../../icons/chevron-down";
import { IconMenu } from "../../icons/icon-menu";
import Modal from "../../common/modal";
import Link from "next/link";
import NavItem from "../../ui/navItem";
import { DropDownProps, MultiDropDownOption, MultiDropDownProps } from "../../../../types";
import { IconChevronRight } from "../../icons/chevron-right";
import { communitiesData, outstationsData, societiesData } from "@/data";
import MobileNavigation from "../MobileNavigation";

const Header = () => {
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);

  const closeMobileNavHandler = () => {
    setShowMobileMenu(false);
  };

  return (
    <Fragment>
      <header className="flex justify-between items-center mt-8 mb-5 px-5 lg:px-25">
        <Link href={"/home"}>
          <img
            className="w-22.5 h-9.75"
            src="/logo.webp"
            alt="ola parish logo"
          />
        </Link>
        <div className="md:hidden">
          <IconMenu
            className="fill-primary-900 size-6"
            onClick={() => setShowMobileMenu(true)}
          />
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <NavItem href="/home">Home</NavItem>
          <DropDown {...aboutDropdownData} />
          <MultiDropDown
            matcher="/organizations"
            name={"organizations"}
            data={[societiesData, communitiesData, outstationsData]}
          />
          <NavItem href="/the-catholic-faith">The Catholic Faith</NavItem>
          <NavItem href="about/contact-us"> Contact Us</NavItem>

          <Link
            href="about/contact-us"
            className="flex justify-center items-center bg-primary-900 w-33 h-8 text-white"
          >
            Member Area
          </Link>
        </nav>
      </header>
      <Modal isOpen={showMobileMenu} onClose={closeMobileNavHandler}>
        <MobileNavigation closeHandler={closeMobileNavHandler} />
      </Modal>
    </Fragment>
  );
};

export const aboutDropdownData: DropDownProps = {
  name: "About",
  to: "/welcome",
  matcher: "/welcome",
  options: [
    {
      name: "Parish Priest",
      to: "/about/parish-priest",
    },

    {
      name: "Priests Bios",
      to: "/about/priests-bio",
    },

    {
      name: "Staff",
      to: "/about/parish-staff",
    },

    {
      name: "Contact Us",
      to: "/about/contact-us",
    },
  ],
};

const DropDown = (props: DropDownProps) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  return (
    <div className="hover:ul:block z-1000 relative" onMouseEnter={() => setShowMenu(true)} onMouseLeave={() => setShowMenu(false)}>
      {props.to ? (
        <NavItem matcher={props.matcher} href={props.to} className="flex items-center gap-1">
          <span>{props.name}</span>
          <IconChevronDown />
        </NavItem>
      ) : (
        <NavItem matcher={props.matcher} href={props.to} className="flex items-center gap-1">
          <span>{props.name}</span>
          <IconChevronDown />
        </NavItem>
      )}

      {showMenu && (
        <ul className="absolute flex flex-col gap-3.5 bg-primary-100/90 px-3.5 py-5 w-36 text-xs">
          {props.options.map((option, indx) => {
            return (
              <NavItem matcher={props.matcher} key={indx} href={option.to} className="hover:text-primary-900">
                {option.name}
              </NavItem>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export const MultiDropDown = (props: MultiDropDownProps) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [secondaryOptions, setSecondaryOptions] = useState<{
    name: string;
    data: MultiDropDownOption[];
  }>();
  return (
    <div className="z-1000 relative" onMouseEnter={() => setShowMenu(true)} onMouseLeave={() => setShowMenu(false)}>
      <NavItem href={props.name} matcher={props.matcher} className="flex items-center gap-1">
        <p>{props.name}</p>
        <IconChevronDown />
      </NavItem>
      {showMenu && (
        <ul className="absolute flex flex-col gap-3.5 bg-primary-100/90 px-3.5 py-5 w-36 text-xs">
          {props.data.map((op, indx) => {
            return (
              <li
                key={indx}
                className={`cursor-pointer ${op.name === secondaryOptions?.name ? "text-primary-900" : ""}`}
                onMouseEnter={() => {
                  setSecondaryOptions({ name: op.name, data: op.options });
                }}
              >
                <div className="flex justify-between items-center">
                  <p>{op.name}</p>
                  <IconChevronRight />
                </div>
              </li>
            );
          })}
        </ul>
      )}
      {showMenu && secondaryOptions && (
        <ul className="absolute flex flex-col gap-3.5 bg-primary-100/90 mt-2 ml-36 px-3.5 py-5 w-36 text-xs">
          {secondaryOptions.data.map((op, indx) => {
            return (
              <li key={indx} className="cursor-pointer">
                <NavItem href={op.to} className={`flex justify-between items-center hover:text-primary-900`}>
                  <p>{op.name}</p>
                </NavItem>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Header;
