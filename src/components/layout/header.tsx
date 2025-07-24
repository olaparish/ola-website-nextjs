/* eslint-disable @next/next/no-img-element */
"use client";
import { Fragment, useState, type MouseEvent } from "react";
import { IconChevronDown } from "../ui/icons/chevron-down";
import { IconChevronRight } from "../ui/icons/chevron-right";
import { IconMenu } from "../ui/icons/icon-menu";
import Modal from "../ui/modal";
import { IconClose } from "../ui/icons/icon-close";
import Link from "next/link";

import communities from "../../data/communities_data.json";
import societies from "../../data/societies_data.json";
import outstations from "../../data/outstations_data.json";
import NavItem from "../ui/navItem";

const Header = () => {
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);

  return (
    <Fragment>
      {showMobileMenu && (
        <Modal isOpen={showMobileMenu} onClose={() => setShowMobileMenu(false)}>
          <div className="p-5 text-white">
            <div className="flex justify-between items-center">
              <Link href="/home">
                <img src="/logo.webp" alt="ourshea" className="w-22.5 h-9.75" />
              </Link>
              <IconClose
                className="size-6 text-white"
                onClick={() => setShowMobileMenu(false)}
              />
            </div>

            <nav className="flex flex-col gap-5 mt-4">
              <Link className="text-2xl" href="/welcome">
                Home
              </Link>
              <MobileDropDown
                {...aboutDropdownData}
                onCloseMenu={() => setShowMobileMenu(false)}
              />
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
            </nav>
          </div>
        </Modal>
      )}
      {!showMobileMenu && (
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
            <Link
              href="about/contact-us"
              className="flex justify-center items-center bg-primary-900 w-33 h-8 text-white"
            >
              Contact Us
            </Link>
          </nav>
        </header>
      )}
    </Fragment>
  );
};

const aboutDropdownData: DropDownProps = {
  name: "About",
  to: "/about",
  matcher: "/about",
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

const societiesData = {
  name: "Societies",
  matcher: "/organizations",
  options: societies.map((soc) => {
    return {
      name: soc.name,
      to: soc.link,
    };
  }),
};

const communitiesData = {
  name: "Communities",
  matcher: "/organizations",
  options: communities.map((com) => {
    return {
      name: com.name,
      to: com.link,
    };
  }),
};

const outstationsData = {
  name: "Out Stations",
  matcher: "/organizations",
  options: outstations.map((sta) => {
    return {
      name: sta.name,
      to: sta.link,
    };
  }),
};

type Option = {
  name: string;
  to: string;
};

interface DropDownProps {
  name: string;
  to: string;
  matcher: string;
  options: Option[];
  className?: string;
  headerClassName?: string;
  ulClassName?: string;
}

interface MobileDropDownProps {
  name: string;
  to?: string;
  options: Option[];
  className?: string;
  headerClassName?: string;
  ulClassName?: string;
  onCloseMenu?: () => void;
}
const DropDown = (props: DropDownProps) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  return (
    <div
      className="hover:ul:block z-1000 relative"
      onMouseEnter={() => setShowMenu(true)}
      onMouseLeave={() => setShowMenu(false)}
    >
      {props.to ? (
        <NavItem
          matcher={props.matcher}
          href={props.to}
          className="flex items-center gap-1"
        >
          <span>{props.name}</span>
          <IconChevronDown />
        </NavItem>
      ) : (
        <NavItem
          matcher={props.matcher}
          href={props.to}
          className="flex items-center gap-1"
        >
          <span>{props.name}</span>
          <IconChevronDown />
        </NavItem>
      )}

      {showMenu && (
        <ul className="absolute flex flex-col gap-3.5 bg-primary-100/90 px-3.5 py-5 w-36 text-xs">
          {props.options.map((option, indx) => {
            return (
              <NavItem
                matcher={props.matcher}
                key={indx}
                href={option.to}
                className="hover:text-primary-900"
              >
                {option.name}
              </NavItem>
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
      <div
        className={"flex items-center gap-1 text-2xl " + props.headerClassName}
      >
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

interface MultiDropDownOption {
  name: string;
  to: string;
}

type MultiDropDownProps = {
  matcher?: string;
  name: string;
  data: { name: string; options: MultiDropDownOption[] }[];
};
const MultiDropDown = (props: MultiDropDownProps) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [secondaryOptions, setSecondaryOptions] = useState<{
    name: string;
    data: MultiDropDownOption[];
  }>();
  return (
    <div
      className="z-1000 relative"
      onMouseEnter={() => setShowMenu(true)}
      onMouseLeave={() => setShowMenu(false)}
    >
      <NavItem
        href={props.name}
        matcher={props.matcher}
        className="flex items-center gap-1"
      >
        <p>{props.name}</p>
        <IconChevronDown />
      </NavItem>
      {showMenu && (
        <ul className="absolute flex flex-col gap-3.5 bg-primary-100/90 px-3.5 py-5 w-36 text-xs">
          {props.data.map((op, indx) => {
            return (
              <li
                key={indx}
                className={`cursor-pointer ${
                  op.name === secondaryOptions?.name ? "text-primary-900" : ""
                }`}
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
                <NavItem
                  href={op.to}
                  className={`flex justify-between items-center hover:text-primary-900`}
                >
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
                <MobileDropDown
                  {...option}
                  ulClassName="gap-6"
                  headerClassName="text-xl"
                />
              </div>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Header;
