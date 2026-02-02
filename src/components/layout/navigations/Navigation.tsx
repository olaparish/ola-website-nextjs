"use client";
import React from "react";
import { NavElement } from "@/../types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type NavigationVariant = "member" | "parishioner" | "secondary";

type Props = {
  items: NavElement[];
  className?: string;
  variant?: NavigationVariant;
  matcherType?: "ends-with" | "includes";
};

const MergedNavigation = ({
  items,
  className,
  variant = "member",
  matcherType,
}: Props) => {
  const pathname = usePathname();

  const isActiveElement = (href: string): boolean => {
    const matcherString = `${href}`;
    if (matcherType === "ends-with") {
      return pathname?.endsWith(matcherString);
    }
    return pathname?.includes(matcherString);
  };

  const getNavClassName = () => {
    const baseClasses = "flex lg:gap-4 overflow-x-auto no-scrollbar";
    switch (variant) {
      case "parishioner":
        return cn(baseClasses, "bg-primary-100 w-fit", className);
      case "member":
      case "secondary":
      default:
        return cn(baseClasses, className);
    }
  };

  return (
    <nav className={getNavClassName()}>
      {items.map((it, index) => {
        return (
          <div key={index}>
            <NavItem
              item={it}
              isActive={isActiveElement(it.href)}
              variant={variant}
            />
          </div>
        );
      })}
    </nav>
  );
};

type NavItemProps = {
  item: NavElement;
  isActive: boolean;
  variant: NavigationVariant;
};

const NavItem = ({ item, isActive, variant }: NavItemProps) => {
  const getItemClassName = () => {
    const baseClasses =
      "flex justify-center items-center w-45 h-10.5 font-medium text-sm border-2 border-transparent";

    switch (variant) {
      case "member":
        return [
          baseClasses,
          "shadow-[0_2px_6px_0_rgba(0,0,0,0.1)]",
          !isActive ? "bg-gold-200 hover:border-primary-900" : "",
          isActive ? "bg-secondary-900 text-white" : "",
        ].join(" ");

      case "parishioner":
        return [
          baseClasses,
          "border-1",
          !isActive ? "border-transparent" : "border-secondary-900",
        ].join(" ");

      case "secondary":
        return [
          baseClasses,
          "border-2 border-secondary-900 shadow-[0_2px_6px_0_rgba(0,0,0,0.1)]",
          !isActive ? "bg-transparent" : "bg-secondary-900 text-white",
        ].join(" ");

      default:
        return baseClasses;
    }
  };

  return (
    <Link className={getItemClassName()} href={item.href}>
      {item.name}
    </Link>
  );
};

export default MergedNavigation;

// Export individual variants for backward compatibility
export const MemberNavigation = (props: Omit<Props, "variant">) => (
  <MergedNavigation {...props} variant="member" />
);

export const ParishionerNavigation = (props: Omit<Props, "variant">) => (
  <MergedNavigation {...props} variant="parishioner" />
);

export const SecondaryNavigation = (props: Omit<Props, "variant">) => (
  <MergedNavigation {...props} variant="secondary" />
);
