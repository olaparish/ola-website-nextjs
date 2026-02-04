"use client";

import { useQuery } from "@tanstack/react-query";
import { statsService } from "@/services/stats.service";
import { parishionerService } from "@/services/parishioner.service";
import { rangeOptions } from "@/app/(member-platform)/dashboard/data";
import { RangeOptionId } from "@/../types";
import { useState } from "react";
import StatCard from "@/components/dashboard/StatCard";
import { 
  Users, 
  UserPlus, 
  Droplets, 
  CheckCircle2, 
  Heart, 
  Wallet, 
  TrendingUp, 
  TrendingDown,
  ChevronRight,
  ArrowUpRight,
  Plus
} from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";

export const StaffDashboardOverview = () => {
  const { data: session } = useSession();
  const [range, setRange] = useState<RangeOptionId>("current_year");

  const userPermissions = session?.user?.permissions;
  const { data: stats, isLoading: isStatsLoading } = useQuery({
    queryKey: ["stats", range],
    queryFn: () => statsService.get(range),
  });

  const { data: parishioners, isLoading: isParishionersLoading } = useQuery({
    queryKey: ["recent-parishioners"],
    queryFn: () => parishionerService.getAll(1, undefined, 5),
  });

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex md:flex-row flex-col justify-between md:items-center gap-4">
        <div>
          <h2 className="font-bold text-gray-900 text-2xl">
            Dashboard Overview
          </h2>
          <p className="text-gray-500">
            Welcome back! Here&apos;s what&apos;s happening in the parish.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={range}
            onChange={(e) => setRange(e.target.value as RangeOptionId)}
            className="block bg-white shadow-sm p-2.5 border focus:border-secondary-900 rounded-lg focus:ring-secondary-900 w-full text-gray-700 text-sm transition-all"
          >
            {rangeOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
        {isStatsLoading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="bg-gray-100 rounded-xl h-32 animate-pulse"
            />
          ))
        ) : (
          <>
            <StatCard
              title="Total Members"
              value={stats?.counts.parishioners || 0}
              icon={Users}
              iconClassName="bg-blue-50"
            />
            <StatCard
              title="Visitors"
              value={stats?.counts.visitors || 0}
              icon={UserPlus}
              iconClassName="bg-purple-50"
            />
            <StatCard
              title="Baptisms"
              value={stats?.counts.baptisms || 0}
              icon={Droplets}
              iconClassName="bg-cyan-50"
            />
            <StatCard
              title="Confirmations"
              value={stats?.counts.confirmations || 0}
              icon={CheckCircle2}
              iconClassName="bg-indigo-50"
            />
            <StatCard
              title="Marriages"
              value={stats?.counts.marriages || 0}
              icon={Heart}
              iconClassName="bg-pink-50"
            />
          </>
        )}
      </div>

      <div className="gap-8 grid grid-cols-1 lg:grid-cols-3">
        {/* Finance Overview */}
        {userPermissions?.includes("view:finance") && (
          <div className="space-y-4 lg:col-span-1">
            <h3 className="font-bold text-gray-900 text-lg">Finance Summary</h3>
            <div className="bg-white shadow-sm border rounded-xl overflow-hidden">
              <div className="bg-secondary-900 p-6 text-white">
                <p className="font-medium text-secondary-100 text-sm uppercase tracking-wider">
                  Net Balance
                </p>
                <h4 className="mt-1 font-bold text-3xl">
                  GHS {stats?.finance.netBalance.toLocaleString() || "0.00"}
                </h4>
              </div>
              <div className="space-y-6 p-6">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-50 p-2 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-500 text-sm">
                        Total Income
                      </p>
                      <p className="font-bold text-gray-900 text-lg">
                        GHS{" "}
                        {stats?.finance.totalIncome.toLocaleString() || "0.00"}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400 text-xs">Transactions</p>
                    <p className="font-semibold text-sm">
                      {stats?.finance.incomeCount || 0}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-6 border-t">
                  <div className="flex items-center gap-3">
                    <div className="bg-red-50 p-2 rounded-lg">
                      <TrendingDown className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-500 text-sm">
                        Total Expenditure
                      </p>
                      <p className="font-bold text-gray-900 text-lg">
                        GHS{" "}
                        {stats?.finance.totalExpenditure.toLocaleString() ||
                          "0.00"}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400 text-xs">Transactions</p>
                    <p className="font-semibold text-sm">
                      {stats?.finance.expenditureCount || 0}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recent Parishioners */}
        <div className="space-y-4 lg:col-span-2">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-gray-900 text-lg">
              Recent Enrollments
            </h3>
            <Link
              href="/dashboard/parishioners"
              className="flex items-center gap-1 font-medium text-primary-900 hover:text-secondary-900 text-sm transition-colors"
            >
              View all <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="bg-white shadow-sm border rounded-xl overflow-hidden">
            {isParishionersLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-50 border-b h-16 animate-pulse"
                />
              ))
            ) : (
              <div className="divide-y">
                {parishioners?.docs.map((p) => (
                  <Link
                    key={p.id}
                    href={`/dashboard/parishioners/${p.id}`}
                    className="group flex justify-between items-center hover:bg-gray-50 p-4 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex justify-center items-center bg-primary-100 rounded-full w-10 h-10 font-bold text-primary-900">
                        {p.firstName.charAt(0)}
                        {p.lastName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 group-hover:text-primary-900 transition-colors">
                          {p.firstName} {p.otherNames ? `${p.otherNames} ` : ""}
                          {p.lastName}
                        </p>
                        <p className="text-gray-500 text-xs">
                          Member since{" "}
                          {new Date(p.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="hidden sm:block text-right">
                        <p className="font-medium text-gray-700 text-sm">
                          {p.userData.occupation}
                        </p>
                        <p className="text-gray-400 text-xs">
                          {p.userData.residentialAddress}
                        </p>
                      </div>
                      <ArrowUpRight className="w-5 h-5 text-gray-300 group-hover:text-primary-900 transition-colors" />
                    </div>
                  </Link>
                ))}
                {(!parishioners || parishioners.docs.length === 0) && (
                  <div className="p-8 text-gray-500 text-center">
                    No recent enrollments found.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <h3 className="font-bold text-gray-900 text-lg">Quick Actions</h3>
        <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <Link
            href="/new-parishioner"
            className="group flex items-center gap-4 bg-white shadow-sm p-4 border hover:border-primary-900 rounded-xl transition-all"
          >
            <div className="bg-blue-50 group-hover:bg-primary-900 p-3 rounded-lg text-blue-600 group-hover:text-white transition-all">
              <Plus className="w-6 h-6" />
            </div>
            <span className="font-semibold text-gray-700">Add Parishioner</span>
          </Link>
          {userPermissions?.includes("get:parishioner") && (
            <Link
              href="/dashboard/parishioners"
              className="group flex items-center gap-4 bg-white shadow-sm p-4 border hover:border-primary-900 rounded-xl transition-all"
            >
              <div className="bg-purple-50 group-hover:bg-primary-900 p-3 rounded-lg text-purple-600 group-hover:text-white transition-all">
                <Users className="w-6 h-6" />
              </div>
              <span className="font-semibold text-gray-700">
                Manage Members
              </span>
            </Link>
          )}
          {userPermissions?.includes("view:finance") && (
            <Link
              href="/dashboard/payments"
              className="group flex items-center gap-4 bg-white shadow-sm p-4 border hover:border-primary-900 rounded-xl transition-all"
            >
              <div className="bg-green-50 group-hover:bg-primary-900 p-3 rounded-lg text-green-600 group-hover:text-white transition-all">
                <Wallet className="w-6 h-6" />
              </div>
              <span className="font-semibold text-gray-700">View Payments</span>
            </Link>
          )}
          {userPermissions?.includes("get:baptism") && (
            <Link
              href="/dashboard/baptisms"
              className="group flex items-center gap-4 bg-white shadow-sm p-4 border hover:border-primary-900 rounded-xl transition-all"
            >
              <div className="bg-cyan-50 group-hover:bg-primary-900 p-3 rounded-lg text-cyan-600 group-hover:text-white transition-all">
                <Droplets className="w-6 h-6" />
              </div>
              <span className="font-semibold text-gray-700">
                Baptism Records
              </span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
