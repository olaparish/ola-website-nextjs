import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  children: React.ReactNode;
  matcher?: string;
  href: string;
  exact?: boolean;
  defaultClasses?: string;
  activeClasses?: string;
  inActiveClasses?: string;
  className?: string;
};

const NavItem = ({
  href,
  exact = false,
  className = "",
  defaultClasses = "px-2 curser-pointer border-b-4 hover:border-primary-600",
  activeClasses = "border-primary-900",
  inActiveClasses = "border-transparent",
  children,
  matcher,
}: Props) => {
  const pathname = usePathname();
  const matcherString = matcher ?? href;

  const isActive = exact
    ? pathname === matcherString
    : pathname?.startsWith(matcherString);

  const classNames = [
    defaultClasses,
    isActive ? activeClasses : inActiveClasses,
    className,
  ].join(" ");

  return (
    <Link href={href} className={classNames}>
      {children}
    </Link>
  );
};

export default NavItem;
