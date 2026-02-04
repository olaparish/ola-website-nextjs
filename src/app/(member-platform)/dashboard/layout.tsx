"use client";
import { NavElement } from "@/../types";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import DataFetchSpinner from "@/components/ui/data-fetch-spinner";
import { usePathname, useRouter } from "next/navigation";


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
    <div className="flex bg-gray-50 h-screen overflow-hidden font-montserrat">
      {/* Sidebar - Desktop */}
      <div className="hidden md:block">
        <DashboardSidebar />
      </div>

      {/* Sidebar - Mobile Overlay */}
      {isSidebarOpen && (
        <div className="md:hidden z-50 fixed inset-0 flex">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setIsSidebarOpen(false)}
          />
          <DashboardSidebar />
        </div>
      )}

      {/* Main Content Area */}
      <div className="relative flex flex-col flex-1 md:ml-64 overflow-x-hidden overflow-y-auto">
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
