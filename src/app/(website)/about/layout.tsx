"use client";
/* eslint-disable @next/next/no-img-element */
import NavItem from "@/components/ui/navItem";
import { usePathname } from "next/navigation";
import React from "react";

const routeNames: Record<string, string> = {
  "/about": "About",
  "/about/parish-priets": "Parish Priest: Rev Fr. Lawrence Azure",
  "/about/priest-bio": "Priest Bios",
  "/about/parish-staff": "Parish Staff",
  "/about/contact-us": "Contact Us",
};

const AboutLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathname = usePathname();
  const pageTitle = routeNames[pathname] || "OLA Parish";

  const classes = {
    defaultClasses:
      "curser-pointer border-b-[0.5px] hover:text-primary-700 pt-5 pb-4",
    activeClasses: "text-primary-900",
    inActiveClasses: "text-black",
  };

  return (
    <div>
      <header className="flex justify-center items-center bg-gold-200 h-36">
        <h2>{pageTitle}</h2>
      </header>

      <div className="flex lg:flex-row flex-col gap-15 mx-5 lg:mx-20 py-25">
        <div className="relative">
          <nav className="z-20 lg:relative flex flex-col bg-gold-200 px-12.5 pt-10 pb-20 w-full lg:w-78 h-fit">
            <NavItem {...classes} href="/about">
              About
            </NavItem>
            <NavItem {...classes} href="/about/parish-priest">
              Parish Priest
            </NavItem>
            <NavItem {...classes} href="/about/priests-bio">
              Priest Bios
            </NavItem>
            <NavItem {...classes} href="/about/parish-staff">
              Parish Staff
            </NavItem>
            <NavItem {...classes} href="/about/contact-us">
              Contact Us
            </NavItem>
          </nav>
          <img
            className="hidden lg:block top-0 -left-20 z-10 absolute opacity-15"
            src="/images/general/mary.png"
            alt="mary"
          />
        </div>
        <>{children}</>
      </div>
    </div>
  );
};

// const NavItem = ({
//   children,
//   to,
//   className,
// }: {
//   children: React.ReactNode;
//   to: string;
//   className?: string;
// }) => {
//   const getNavClass = (state: NavLinkRenderProps) => {
//     return [
//       "curser-pointer border-b-[0.5px] hover:text-primary-700 pt-5 pb-4",
//       state.isActive ? "text-primary-900 " : "text-black",
//       className,
//     ].join(" ");
//   };

//   return (
//     <NavLink to={to} className={(props) => getNavClass(props)}>
//       {children}
//     </NavLink>
//   );
// };

export default AboutLayout;
