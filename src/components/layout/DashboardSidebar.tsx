/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Droplets,
  CheckCircle2,
  Heart,
  UserRound,
  Calculator,
  Users2,
  MapPin,
  CreditCard,
  Settings,
  Home,
  Briefcase,
  Church,
  FileText,
} from "lucide-react";
import { subPages } from "@/app/(member-platform)/dashboard/data";
import { ValidateRights } from "@/utils/validatePermissions";
import { useSession } from "next-auth/react";
import SignoutBtn from "../common/signout-btn";

const iconMap: Record<string, any> = {
  Dashboard: LayoutDashboard,
  Parishioners: Users,
  Baptisms: Droplets,
  Confirmations: CheckCircle2,
  Marriages: Heart,
  Catechists: UserRound,
  Accountants: Calculator,
  Groups: Users2,
  Outstations: MapPin,
  Payments: CreditCard,
  "My Marriage": Heart,
  "My Home": Home,
  "My Work": Briefcase,
  "My Parish": Church,
  "My Family": Users,
  "Additional Info": FileText,
  "My Finance": CreditCard,
  Finance: Calculator,
};

const DashboardSidebar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const userPermissions = session?.user?.permissions || [];
  const userRole = session?.user?.role;

  console.log("Session: ", session);
  const filteredPages = subPages.filter((page) => {
    // Check permissions
    const hasPermission = page.permission
      ? ValidateRights([page.permission as string], userPermissions)
      : true;

    // Check roles if specified
    const hasRole = page.roles ? page.roles.includes(userRole as string) : true;

    // console.log("Has has permission: ", hasPermission);
    // Special case: if it has permissions but NO roles specified, it's a staff page.
    // If it has ROLES but NO permission specified, it's a role-only page.
    // If it has BOTH, both must pass.
    // If it has NEITHER, it shows for everyone (like Dashboard).

    return hasPermission && hasRole;
  });

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  return (
    <aside className="top-0 left-0 z-40 fixed bg-white border-r w-64 h-screen overflow-y-auto transition-transform">
      <div className="flex flex-col px-3 py-4 h-full">
        <Link href="/dashboard" className="flex items-center mb-10 px-2">
          <Image
            src="/logo.webp"
            alt="OLA Parish Logo"
            width={150}
            height={60}
            className="w-auto h-10"
          />
        </Link>

        <nav className="flex-1 space-y-1">
          {filteredPages.map((page) => {
            const Icon = iconMap[page.name] || LayoutDashboard;
            const active = isActive(page.href);

            return (
              <Link
                key={page.href}
                href={page.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-sm transition-colors",
                  active
                    ? "bg-secondary-900 text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
                )}
              >
                <Icon
                  className={cn(
                    "w-5 h-5",
                    active ? "text-white" : "text-gray-500",
                  )}
                />
                {page.name}
              </Link>
            );
          })}
        </nav>

        <div className="space-y-1 mt-auto pt-4 border-t">
          <Link
            href="/dashboard/settings"
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-sm transition-colors",
              isActive("/dashboard/settings")
                ? "bg-secondary-900 text-white"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
            )}
          >
            <Settings
              className={cn(
                "w-5 h-5",
                isActive("/dashboard/settings")
                  ? "text-white"
                  : "text-gray-500",
              )}
            />
            Settings
          </Link>
          <SignoutBtn className="flex items-center gap-3 hover:bg-gray-100 px-3 py-2 rounded-lg w-full font-medium font-medium text-gray-600 hover:text-gray-900 text-sm transition-colors" />
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
