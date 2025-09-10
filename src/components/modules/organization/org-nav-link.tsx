import { IconChevronDown } from "@/components/icons/chevron-down";
import NavItem from "@/components/ui/navItem";
import Link from "next/link";
import { useState } from "react";

import communities from "../../../data/communities_data.json";
import societies from "../../../data/societies_data.json";
import outstations from "../../../data/outstations_data.json";

const OrgNavItem = ({ title, to, className }: { title: "Outstations" | "Societies" | "Communities"; to: string; className?: string }) => {
  const [showSubMenu, setShowSubMenu] = useState<boolean>(false);
  let subNav;
  if (title === "Societies") subNav = societies;
  else if (title === "Communities") subNav = communities;
  else subNav = outstations;

  return (
    <>
      <div className="flex items-center gap-4" onClick={() => setShowSubMenu((prev) => !prev)}>
        <NavItem href={to} defaultClasses="curser-pointer hover:text-primary-700 pt-5 pb-4" activeClasses="text-primary-900" inActiveClasses="text-black" className={className}>
          {title}
        </NavItem>
        <IconChevronDown />
      </div>
      <nav className="flex flex-col gap-2 ml-4 pl-4 border-gray-400 border-l-2">
        {showSubMenu &&
          subNav.map((na, indx) => {
            return (
              <Link className={`py-2 border-gray-400 border-b-1 text-sm ${indx === subNav.length - 1 ? "border-none" : ""}`} key={indx} href={`${title}/${na.slug}`}>
                {na.name}
              </Link>
            );
          })}
      </nav>
      <div className="mt-4 border-b-[0.5px]" />
    </>
  );
};

export default OrgNavItem;
