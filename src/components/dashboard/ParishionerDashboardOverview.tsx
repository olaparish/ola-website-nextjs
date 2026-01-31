"use client";

import { useQuery } from "@tanstack/react-query";
import { parishionerService } from "@/services/parishioner.service";
import { useSession } from "next-auth/react";
import { 
  User, 
  Heart, 
  Briefcase, 
  Home, 
  Church, 
  Users, 
  FileText,
  CreditCard,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ChevronRight,
  ShieldCheck
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useParishionerStore } from "@/stores/useParishioner";
import { useEffect } from "react";

export const ParishionerDashboardOverview = () => {
  const { data: session } = useSession();
  const { setAll, user, parishioner } = useParishionerStore();

  const { data: userDetails, isLoading: isUserLoading } = useQuery({
    queryKey: ["parishioner-full-data", session?.user?.id],
    queryFn: () => parishionerService.getParishioner(),
    enabled: !!session?.user?.id,
  });

  const { data: financeReceipts, isLoading: isReceiptsLoading } = useQuery({
    queryKey: ["parishioner-finance-receipts", session?.user?.id],
    queryFn: () => parishionerService.getFinancialReport(session?.user?.id as string, "receipts"),
    enabled: !!session?.user?.id,
  });

  const { data: financeExpenditures, isLoading: isExpendituresLoading } = useQuery({
    queryKey: ["parishioner-finance-expenditures", session?.user?.id],
    queryFn: () => parishionerService.getFinancialReport(session?.user?.id as string, "expenditures"),
    enabled: !!session?.user?.id,
  });

  useEffect(() => {
    if (userDetails) {
      setAll(userDetails);
    }
  }, [userDetails, setAll]);

  const quickActions = [
    {
      name: "Marriage Status",
      desc: "Update marital & spouse details",
      href: "/dashboard/my-marriage",
      icon: Heart,
      color: "bg-pink-50 text-pink-600",
      hover: "hover:border-pink-200"
    },
    {
      name: "Work & Profession",
      desc: "Manage your career information",
      href: "/dashboard/my-work",
      icon: Briefcase,
      color: "bg-blue-50 text-blue-600",
      hover: "hover:border-blue-200"
    },
    {
      name: "Home & Address",
      desc: "Contact and residential details",
      href: "/dashboard/my-home",
      icon: Home,
      color: "bg-amber-50 text-amber-600",
      hover: "hover:border-amber-200"
    },
    {
      name: "Family & Parents",
      desc: "Parental and family records",
      href: "/dashboard/my-family",
      icon: Users,
      color: "bg-purple-50 text-purple-600",
      hover: "hover:border-purple-200"
    },
    {
      name: "Parish Details",
      desc: "Baptism, groups & sacrament info",
      href: "/dashboard/my-parish",
      icon: Church,
      color: "bg-emerald-50 text-emerald-600",
      hover: "hover:border-emerald-200"
    },
    {
      name: "Additional Info",
      desc: "Other relevant parish records",
      href: "/dashboard/additional-info",
      icon: FileText,
      color: "bg-gray-50 text-gray-600",
      hover: "hover:border-gray-300"
    }
  ];

  if (isUserLoading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="h-48 bg-gray-100 rounded-2xl" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="h-32 bg-gray-100 rounded-xl" />
          <div className="h-32 bg-gray-100 rounded-xl" />
          <div className="h-32 bg-gray-100 rounded-xl" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="h-24 bg-gray-100 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  const totalContributions = financeReceipts?.summary?.totalReceipts ?? 0;
  const totalExpenditures = financeExpenditures?.summary?.totalExpenditures ?? 0;

  return (
    <div className="space-y-8">
      {/* Hero Welcome Section */}
      <div className="relative overflow-hidden bg-primary-900 rounded-2xl p-8 md:p-12 text-white shadow-xl shadow-primary-900/20">
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Welcome back, {user?.firstName}!
          </h1>
          <p className="text-primary-100 text-lg mb-8 leading-relaxed">
            Manage your parish records, track your contributions, and stay connected with the OLA community.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link 
              href="/dashboard/settings"
              className="px-6 py-3 bg-white text-primary-900 rounded-xl font-bold flex items-center gap-2 hover:bg-primary-50 transition-colors"
            >
              <User className="w-5 h-5" />
              Complete Profile
            </Link>
          </div>
        </div>
        {/* Abstract background shapes */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-primary-800 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-0 right-0 translate-y-1/4 w-64 h-64 bg-secondary-800 rounded-full blur-3xl opacity-30" />
      </div>

      {/* Finance Summary Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
           <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-primary-900" />
            Financial Summary
          </h3>
          <Link href="/dashboard/my-finance" className="text-sm font-medium text-primary-900 hover:underline flex items-center gap-1">
            View Statement <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-green-50 text-green-600 rounded-lg">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Contributions</p>
                <h4 className="text-2xl font-bold text-gray-900">GHS {totalContributions.toLocaleString()}</h4>
              </div>
            </div>
            <div className="h-1 bg-gray-50 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 w-full" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-red-50 text-red-600 rounded-lg">
                <TrendingDown className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Benevolence Received</p>
                <h4 className="text-2xl font-bold text-gray-900">GHS {totalExpenditures.toLocaleString()}</h4>
              </div>
            </div>
             <div className="h-1 bg-gray-50 rounded-full overflow-hidden">
              <div className="h-full bg-red-500 w-full opacity-50" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-center">
            <p className="text-sm font-medium text-gray-500 mb-2">Member Status</p>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <span className="font-bold text-gray-900 text-lg uppercase">Active Parishioner</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Access Section */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-primary-900" />
            My Parish Record
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link 
                key={action.name}
                href={action.href}
                className={cn(
                  "group bg-white p-6 rounded-2xl border border-gray-100 shadow-sm transition-all duration-300",
                  "flex flex-col gap-4 items-start",
                  action.hover, "hover:shadow-lg hover:-translate-y-1"
                )}
              >
                <div className={cn("p-4 rounded-xl transition-colors", action.color)}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 group-hover:text-primary-900 transition-colors">
                    {action.name}
                  </h4>
                  <p className="text-sm text-gray-500 mt-1">
                    {action.desc}
                  </p>
                </div>
                <div className="mt-2 text-primary-900 flex items-center gap-1 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  View Details <ArrowUpRight className="w-4 h-4" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
