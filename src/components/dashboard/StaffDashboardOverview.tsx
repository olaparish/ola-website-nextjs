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

export const StaffDashboardOverview = () => {
  const [range, setRange] = useState<RangeOptionId>("current_year");

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
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
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
            className="block w-full p-2.5 text-sm text-gray-700 bg-white border rounded-lg shadow-sm focus:ring-secondary-900 focus:border-secondary-900 transition-all"
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {isStatsLoading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-32 bg-gray-100 rounded-xl animate-pulse"
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Finance Overview */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-lg font-bold text-gray-900">Finance Summary</h3>
          <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 bg-secondary-900 text-white">
              <p className="text-sm font-medium text-secondary-100 uppercase tracking-wider">
                Net Balance
              </p>
              <h4 className="text-3xl font-bold mt-1">
                GHS {stats?.finance.netBalance.toLocaleString() || "0.00"}
              </h4>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-50 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Total Income
                    </p>
                    <p className="text-lg font-bold text-gray-900">
                      GHS{" "}
                      {stats?.finance.totalIncome.toLocaleString() || "0.00"}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400">Transactions</p>
                  <p className="text-sm font-semibold">
                    {stats?.finance.incomeCount || 0}
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-50 rounded-lg">
                    <TrendingDown className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Total Expenditure
                    </p>
                    <p className="text-lg font-bold text-gray-900">
                      GHS{" "}
                      {stats?.finance.totalExpenditure.toLocaleString() ||
                        "0.00"}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400">Transactions</p>
                  <p className="text-sm font-semibold">
                    {stats?.finance.expenditureCount || 0}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Parishioners */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900">
              Recent Enrollments
            </h3>
            <Link
              href="/dashboard/parishioners"
              className="text-sm font-medium text-primary-900 hover:text-secondary-900 flex items-center gap-1 transition-colors"
            >
              View all <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
            {isParishionersLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="h-16 bg-gray-50 border-b animate-pulse"
                />
              ))
            ) : (
              <div className="divide-y">
                {parishioners?.docs.map((p) => (
                  <Link
                    key={p.id}
                    href={`/dashboard/parishioners/${p.id}`}
                    className="group flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-900 font-bold">
                        {p.firstName.charAt(0)}
                        {p.lastName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 group-hover:text-primary-900 transition-colors">
                          {p.firstName} {p.otherNames ? `${p.otherNames} ` : ""}
                          {p.lastName}
                        </p>
                        <p className="text-xs text-gray-500">
                          Member since{" "}
                          {new Date(p.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="hidden sm:block text-right">
                        <p className="text-sm font-medium text-gray-700">
                          {p.userData.occupation}
                        </p>
                        <p className="text-xs text-gray-400">
                          {p.userData.residentialAddress}
                        </p>
                      </div>
                      <ArrowUpRight className="w-5 h-5 text-gray-300 group-hover:text-primary-900 transition-colors" />
                    </div>
                  </Link>
                ))}
                {(!parishioners || parishioners.docs.length === 0) && (
                  <div className="p-8 text-center text-gray-500">
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
        <h3 className="text-lg font-bold text-gray-900">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/new-parishioner"
            className="group flex items-center gap-4 p-4 bg-white border rounded-xl shadow-sm hover:border-primary-900 transition-all"
          >
            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-primary-900 group-hover:text-white transition-all">
              <Plus className="w-6 h-6" />
            </div>
            <span className="font-semibold text-gray-700">Add Parishioner</span>
          </Link>
          <Link
            href="/dashboard/parishioners"
            className="group flex items-center gap-4 p-4 bg-white border rounded-xl shadow-sm hover:border-primary-900 transition-all"
          >
            <div className="p-3 bg-purple-50 text-purple-600 rounded-lg group-hover:bg-primary-900 group-hover:text-white transition-all">
              <Users className="w-6 h-6" />
            </div>
            <span className="font-semibold text-gray-700">Manage Members</span>
          </Link>
          <Link
            href="/dashboard/payments"
            className="group flex items-center gap-4 p-4 bg-white border rounded-xl shadow-sm hover:border-primary-900 transition-all"
          >
            <div className="p-3 bg-green-50 text-green-600 rounded-lg group-hover:bg-primary-900 group-hover:text-white transition-all">
              <Wallet className="w-6 h-6" />
            </div>
            <span className="font-semibold text-gray-700">View Payments</span>
          </Link>
          <Link
            href="/dashboard/baptisms"
            className="group flex items-center gap-4 p-4 bg-white border rounded-xl shadow-sm hover:border-primary-900 transition-all"
          >
            <div className="p-3 bg-cyan-50 text-cyan-600 rounded-lg group-hover:bg-primary-900 group-hover:text-white transition-all">
              <Droplets className="w-6 h-6" />
            </div>
            <span className="font-semibold text-gray-700">Baptism Records</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
