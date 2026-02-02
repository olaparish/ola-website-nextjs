/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import {
  CreditCard,
  ArrowUpRight,
  ArrowDownLeft,
  History,
  Filter,
  Calendar,
  Wallet,
  TrendingDown,
  TrendingUp,
  Search,
  ChevronLeft,
  ChevronRight,
  Info,
} from "lucide-react";
import { useParishionerStore } from "@/stores/useParishioner";
import { parishionerService } from "@/services/parishioner.service";
import DashboardCard from "@/components/ui/DashboardCard";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ExportButton } from "@/components/common/ExportButton";

export default function MyFinancePage() {
  const { user } = useParishionerStore();
  const [activeTab, setActiveTab] = useState<"receipts" | "expenditures">(
    "receipts",
  );
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  const { data: financeData, isLoading } = useQuery({
    queryKey: ["userFinance", user?.id, activeTab, page, debouncedSearch],
    queryFn: () =>
      parishionerService.getFinancialReport(
        user!.id,
        activeTab,
        page,
        debouncedSearch,
      ),
    enabled: !!user?.id,
  });

  const summary = financeData?.summary;
  const transactions = financeData?.data?.docs || [];
  const totalPages = financeData?.data?.totalPages || 1;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-GH", {
      style: "currency",
      currency: "GHS",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      full: new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }).format(date),
      time: new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }).format(date),
    };
  };

  const getAmount = (tx: any) => {
    return tx.totalAmount || tx.amount || 0;
  };

  const exportColumns =
    activeTab === "receipts"
      ? [
          { key: "createdAt", label: "Date" },
          { key: "description", label: "Description" },
          { key: "category.name", label: "Category" },
          { key: "totalAmount", label: "Amount (GHS)" },
        ]
      : [
          { key: "createdAt", label: "Date" },
          { key: "title", label: "Title" },
          { key: "description", label: "Description" },
          { key: "amount", label: "Amount (GHS)" },
        ];

  return (
    <div className="space-y-8 mx-auto py-8 max-w-6xl animate-in duration-500 fade-in">
      {/* Header Section */}
      <div className="flex md:flex-row flex-col justify-between md:items-center gap-6">
        <div>
          <h1 className="font-bold text-gray-900 text-3xl">
            Financial Overview
          </h1>
          <p className="mt-1 text-gray-500">
            Track your contributions and church support history.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-gray-200 rounded-xl h-10">
            <Calendar className="mr-2 w-4 h-4" /> Last 12 Months
          </Button>
          <ExportButton
            data={transactions}
            columns={exportColumns}
            fileName={`My_${activeTab}`}
            className="bg-primary-900 hover:bg-primary-800 rounded-xl h-10 text-white"
            label="Export Current Page"
          />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="gap-6 grid grid-cols-1 md:grid-cols-3">
        <div className="group relative bg-white shadow-sm p-6 border border-gray-100 rounded-2xl overflow-hidden">
          <div className="top-0 right-0 absolute opacity-5 group-hover:opacity-10 p-4 transition-opacity">
            <Wallet className="w-24 h-24 text-gray-900" />
          </div>
          <div className="bg-blue-50 mb-4 p-3 rounded-xl w-fit text-blue-600">
            <TrendingUp className="w-6 h-6" />
          </div>
          <p className="font-medium text-gray-400 text-sm uppercase tracking-wider">
            Total Contributions
          </p>
          <h2 className="mt-1 font-bold text-gray-900 text-3xl">
            {isLoading ? (
              <div className="bg-gray-100 rounded w-32 h-8 animate-pulse" />
            ) : (
              formatCurrency(summary?.totalReceipts || 0)
            )}
          </h2>
          <div className="flex items-center gap-2 bg-emerald-50 mt-4 px-2 py-1 rounded-full w-fit font-medium text-emerald-600 text-xs">
            <ArrowUpRight className="w-3 h-3" /> +12% from last month
          </div>
        </div>

        <div className="group relative bg-white shadow-sm p-6 border border-gray-100 rounded-2xl overflow-hidden">
          <div className="top-0 right-0 absolute opacity-5 group-hover:opacity-10 p-4 transition-opacity">
            <TrendingDown className="w-24 h-24 text-gray-900" />
          </div>
          <div className="bg-red-50 mb-4 p-3 rounded-xl w-fit text-red-600">
            <TrendingDown className="w-6 h-6" />
          </div>
          <p className="font-medium text-gray-400 text-sm uppercase tracking-wider">
            Church Support Received
          </p>
          <h2 className="mt-1 font-bold text-gray-900 text-3xl">
            {isLoading ? (
              <div className="bg-gray-100 rounded w-32 h-8 animate-pulse" />
            ) : (
              formatCurrency(summary?.totalExpenditures || 0)
            )}
          </h2>
          <div className="flex items-center gap-2 bg-gray-50 mt-4 px-2 py-1 rounded-full w-fit font-medium text-gray-400 text-xs">
            <Info className="w-3 h-3" /> Support / Benevolence
          </div>
        </div>

        <div className="group relative bg-primary-900 shadow-primary-900/20 shadow-xl p-6 rounded-2xl overflow-hidden text-white">
          <div className="top-0 right-0 absolute opacity-10 p-4">
            <CreditCard className="w-24 h-24" />
          </div>
          <div className="bg-white/10 backdrop-blur-sm mb-4 p-3 rounded-xl w-fit text-white">
            <ArrowDownLeft className="w-6 h-6" />
          </div>
          <p className="font-medium text-blue-200 text-sm uppercase tracking-wider">
            Recent Transaction
          </p>
          <h2 className="mt-1 font-bold text-3xl">
            {isLoading ? (
              <div className="bg-white/10 rounded w-32 h-8 animate-pulse" />
            ) : transactions[0] ? (
              formatCurrency(getAmount(transactions[0]))
            ) : (
              formatCurrency(0)
            )}
          </h2>
          <p className="mt-4 font-medium text-blue-200 text-xs">
            Last Ref: {transactions[0]?.id?.slice(0, 8) || "N/A"}
          </p>
        </div>
      </div>

      {/* Transactions Section */}
      <div className="bg-white shadow-sm border border-gray-100 rounded-2xl overflow-hidden">
        <div className="flex md:flex-row flex-col justify-between md:items-center gap-6 p-6 md:p-8 border-gray-50 border-b">
          <div className="flex items-center gap-2 bg-gray-50 p-1.5 border border-gray-100 rounded-xl w-fit">
            <button
              onClick={() => {
                setActiveTab("receipts");
                setPage(1);
              }}
              className={cn(
                "px-6 py-2 rounded-lg font-bold text-sm transition-all",
                activeTab === "receipts"
                  ? "bg-white text-primary-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-900",
              )}
            >
              Contributions
            </button>
            <button
              onClick={() => {
                setActiveTab("expenditures");
                setPage(1);
              }}
              className={cn(
                "px-6 py-2 rounded-lg font-bold text-sm transition-all",
                activeTab === "expenditures"
                  ? "bg-white text-primary-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-900",
              )}
            >
              Church Support
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="top-1/2 left-3 absolute w-4 h-4 text-gray-400 -translate-y-1/2" />
              <Input
                className="pl-10 border-gray-200 rounded-xl w-full md:w-64"
                placeholder="Search transactions..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              className="px-3 border-gray-200 rounded-xl w-10 h-10"
            >
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-8 py-4 border-gray-100 border-b font-bold text-gray-400 text-xs uppercase tracking-widest">
                  Date
                </th>
                <th className="px-8 py-4 border-gray-100 border-b font-bold text-gray-400 text-xs uppercase tracking-widest">
                  Description
                </th>
                <th className="px-8 py-4 border-gray-100 border-b font-bold text-gray-400 text-xs uppercase tracking-widest">
                  Type / Category
                </th>
                <th className="px-8 py-4 border-gray-100 border-b font-bold text-gray-400 text-xs uppercase tracking-widest">
                  Amount
                </th>
                <th className="px-8 py-4 border-gray-100 border-b font-bold text-gray-400 text-xs uppercase tracking-widest">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    <td colSpan={5} className="px-8 py-4">
                      <div className="bg-gray-50 rounded w-full h-6 animate-pulse" />
                    </td>
                  </tr>
                ))
              ) : transactions.length > 0 ? (
                transactions.map((tx: any) => {
                  const date = formatDate(tx.createdAt);
                  return (
                    <tr
                      key={tx.id}
                      className="group hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="px-8 py-6">
                        <div className="flex flex-col">
                          <span className="font-bold text-gray-900 text-sm">
                            {date.full}
                          </span>
                          <span className="text-gray-400 text-xs">
                            {date.time}
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <p className="text-gray-600 text-sm line-clamp-1">
                          {tx.description ||
                            tx.title ||
                            "No description provided"}
                        </p>
                      </td>
                      <td className="px-8 py-6">
                        <span className="bg-gray-100 px-3 py-1 border border-gray-200 rounded-full font-medium text-gray-600 text-xs">
                          {activeTab === "receipts"
                            ? tx.category?.name || "Contribution"
                            : "Support"}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <span
                          className={cn(
                            "font-bold text-sm",
                            activeTab === "receipts"
                              ? "text-emerald-600"
                              : "text-red-600",
                          )}
                        >
                          {activeTab === "receipts" ? "+" : "-"}
                          {formatCurrency(getAmount(tx))}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2">
                          <div
                            className={cn(
                              "rounded-full w-2 h-2",
                              activeTab === "receipts"
                                ? "bg-emerald-500"
                                : tx.status === "DONE" ||
                                    tx.status === "DISBURSED"
                                  ? "bg-emerald-500"
                                  : "bg-amber-500",
                            )}
                          />
                          <span className="font-bold text-gray-900 text-xs">
                            {activeTab === "receipts"
                              ? "COMPLETED"
                              : tx.status || "COMPLETED"}
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="px-8 py-16 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="bg-gray-50 p-4 rounded-full text-gray-300">
                        <History className="w-8 h-8" />
                      </div>
                      <p className="font-medium text-gray-500">
                        No transactions found for this period.
                      </p>
                      <p className="text-gray-400 text-xs">
                        Try adjusting your filters or checking another tab.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center bg-gray-50/30 p-6 border-gray-50 border-t">
            <p className="text-gray-500 text-sm">
              Page <span className="font-bold text-gray-900">{page}</span> of{" "}
              <span className="font-bold text-gray-900">{totalPages}</span>
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="bg-white p-0 rounded-lg w-9 h-9"
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-white p-0 rounded-lg w-9 h-9"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
