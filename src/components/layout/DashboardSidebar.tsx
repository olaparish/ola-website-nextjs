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

  const filteredPages = subPages.filter((page) => {
    // Check permissions
    const hasPermission = page.permission ? ValidateRights([page.permission as string], userPermissions) : true;
    
    // Check roles if specified
    const hasRole = page.roles ? page.roles.includes(userRole as string) : true;

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
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-white transition-transform overflow-y-auto">
      <div className="flex h-full flex-col px-3 py-4">
        <Link href="/dashboard" className="mb-10 flex items-center px-2">
          <Image
            src="/logo.webp"
            alt="OLA Parish Logo"
            width={150}
            height={60}
            className="h-10 w-auto"
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
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-secondary-900 text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                )}
              >
                <Icon className={cn("h-5 w-5", active ? "text-white" : "text-gray-500")} />
                {page.name}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pt-4 border-t space-y-1">
          <Link
            href="/dashboard/settings"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              isActive("/dashboard/settings")
                ? "bg-secondary-900 text-white"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            )}
          >
            <Settings className={cn("h-5 w-5", isActive("/dashboard/settings") ? "text-white" : "text-gray-500")} />
            Settings
          </Link>
          <SignoutBtn className="px-3 py-2 text-sm font-medium transition-colors text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-lg w-full flex items-center gap-3 font-medium" />
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
