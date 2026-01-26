"use client";
import { NavElement } from "../../../../types";
import SignoutBtn from "@/components/common/signout-btn";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useParishPriestStore } from "@/stores/useParishPriestStore";
import { useEffect } from "react";
import { Spinner } from "@/components/ui/spinner";
import DataFetchSpinner from "@/components/ui/data-fetch-spinner";
import PopoverSelect from "@/components/ui/popover";
import { ValidateRights } from "@/utils/validatePermissions";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { IconGear } from "@/components/icons/icon-gear";
import { newOptions, subPages } from "./data";

type Props = {
  children: React.ReactNode;
};

const renderAddPopover = ({ name, href }: NavElement) => {
  return (
    <Link className="block w-30 truncate" href={href}>
      {name}
    </Link>
  );
};

import DashboardSidebar from "@/components/layout/DashboardSidebar";
import DashboardHeader from "@/components/layout/DashboardHeader";
import { useState } from "react";

const Layout = ({ children }: Readonly<Props>) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/auth");
    }
  }, [router, status]);

  if (status === "loading") return <DataFetchSpinner />;

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-montserrat">
      {/* Sidebar - Desktop */}
      <div className="hidden md:block">
        <DashboardSidebar />
      </div>

      {/* Sidebar - Mobile Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setIsSidebarOpen(false)}
          />
          <DashboardSidebar />
        </div>
      )}

      {/* Main Content Area */}
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden md:ml-64">
        <DashboardHeader onMenuClick={() => setIsSidebarOpen(true)} />
        
        <main className="flex-1 p-4 md:p-8">
          <div className="mx-auto max-w-7xl h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
