"use client";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Plus, User, LogOut, Menu } from "lucide-react";
import PopoverSelect from "@/components/ui/popover";
import { newOptions } from "@/app/(member-platform)/dashboard/data";
import { ValidateRights } from "@/utils/validatePermissions";
import Link from "next/link";
import SignoutBtn from "../common/signout-btn";
import { NavElement } from "../../../types";

const renderAddPopover = ({ name, href }: NavElement) => {
  return (
    <Link className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors" href={href}>
      {name}
    </Link>
  );
};

interface DashboardHeaderProps {
  onMenuClick?: () => void;
}

const DashboardHeader = ({ onMenuClick }: DashboardHeaderProps) => {
  const { data: session } = useSession();
  const pathname = usePathname();

  const userPermissions = session?.user?.permissions || [];
  const parsedPopoverLinks = newOptions.filter((li) =>
    ValidateRights([li.permission as string], userPermissions)
  );

  // Derive page title from pathname
  const getPageTitle = () => {
    const parts = pathname.split("/").filter(Boolean);
    if (parts.length <= 1) return "Dashboard";
    const lastPart = parts[parts.length - 1];
    // Handle UUIDs or IDs in path (optional check)
    if (lastPart.length > 20) return parts[parts.length - 2].charAt(0).toUpperCase() + parts[parts.length - 2].slice(1);
    return lastPart.charAt(0).toUpperCase() + lastPart.slice(1);
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b bg-white px-4 md:px-8 shadow-sm">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md md:hidden hover:bg-gray-100"
        >
          <Menu className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-bold text-gray-800 md:text-2xl">
          {getPageTitle()}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <PopoverSelect
          name={
            <div className="flex items-center gap-2 bg-primary-900 px-4 py-2 text-white rounded-md hover:bg-primary-900/90 transition-colors">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">New Action</span>
            </div>
          }
          items={parsedPopoverLinks}
          render={renderAddPopover}
          btnClassName="p-0 border-none bg-transparent"
        />

        <div className="flex items-center gap-3 border-l pl-4">
          <div className="hidden flex-col items-end sm:flex leading-tight">
            <span className="text-sm font-semibold text-gray-900">
              {session?.user?.firstName} {session?.user?.lastName}
            </span>
            <span className="text-xs text-gray-500 capitalize">
              {session?.user?.role || "Member"}
            </span>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary-900 text-white font-bold">
             {session?.user?.firstName?.charAt(0)}
          </div>
          <SignoutBtn />
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
