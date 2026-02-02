"use client";

import { useState } from "react";
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
  Info
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
  const [activeTab, setActiveTab] = useState<"receipts" | "expenditures">("receipts");
  const [page, setPage] = useState(1);

  const { data: financeData, isLoading } = useQuery({
    queryKey: ["userFinance", user?.id, activeTab, page],
    queryFn: () => parishionerService.getFinancialReport(user!.id, activeTab, page),
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
      full: new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).format(date),
      time: new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }).format(date)
    };
  };

  const getAmount = (tx: any) => {
    return tx.totalAmount || tx.amount || 0;
  };

  const exportColumns = activeTab === "receipts" 
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
    <div className="max-w-6xl mx-auto py-8 space-y-8 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Financial Overview</h1>
          <p className="text-gray-500 mt-1">Track your contributions and church support history.</p>
        </div>
        <div className="flex items-center gap-3">
           <Button variant="outline" className="rounded-xl border-gray-200 h-10">
             <Calendar className="w-4 h-4 mr-2" /> Last 12 Months
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Wallet className="w-24 h-24 text-gray-900" />
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl w-fit mb-4">
            <TrendingUp className="w-6 h-6" />
          </div>
          <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">Total Contributions</p>
          <h2 className="text-3xl font-bold text-gray-900 mt-1">
            {isLoading ? <div className="h-8 w-32 bg-gray-100 animate-pulse rounded" /> : formatCurrency(summary?.totalReceipts || 0)}
          </h2>
          <div className="mt-4 flex items-center gap-2 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full w-fit">
            <ArrowUpRight className="w-3 h-3" /> +12% from last month
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <TrendingDown className="w-24 h-24 text-gray-900" />
          </div>
          <div className="p-3 bg-red-50 text-red-600 rounded-xl w-fit mb-4">
            <TrendingDown className="w-6 h-6" />
          </div>
          <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">Church Support Received</p>
          <h2 className="text-3xl font-bold text-gray-900 mt-1">
            {isLoading ? <div className="h-8 w-32 bg-gray-100 animate-pulse rounded" /> : formatCurrency(summary?.totalExpenditures || 0)}
          </h2>
          <div className="mt-4 flex items-center gap-2 text-xs font-medium text-gray-400 bg-gray-50 px-2 py-1 rounded-full w-fit">
            <Info className="w-3 h-3" /> Support / Benevolence
          </div>
        </div>

        <div className="bg-primary-900 p-6 rounded-2xl shadow-xl shadow-primary-900/20 text-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <CreditCard className="w-24 h-24" />
          </div>
          <div className="p-3 bg-white/10 text-white rounded-xl w-fit mb-4 backdrop-blur-sm">
            <ArrowDownLeft className="w-6 h-6" />
          </div>
          <p className="text-sm font-medium text-blue-200 uppercase tracking-wider">Recent Transaction</p>
          <h2 className="text-3xl font-bold mt-1">
            {isLoading ? (
              <div className="h-8 w-32 bg-white/10 animate-pulse rounded" />
            ) : (
              transactions[0] ? formatCurrency(getAmount(transactions[0])) : formatCurrency(0)
            )}
          </h2>
          <p className="mt-4 text-xs text-blue-200 font-medium">
             Last Ref: {transactions[0]?.id?.slice(0, 8) || "N/A"}
          </p>
        </div>
      </div>

      {/* Transactions Section */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 md:p-8 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-2 bg-gray-50 p-1.5 rounded-xl w-fit border border-gray-100">
             <button 
               onClick={() => { setActiveTab("receipts"); setPage(1); }}
               className={cn(
                 "px-6 py-2 rounded-lg text-sm font-bold transition-all",
                 activeTab === "receipts" ? "bg-white text-primary-900 shadow-sm" : "text-gray-500 hover:text-gray-900"
               )}
             >
               Contributions
             </button>
             <button 
               onClick={() => { setActiveTab("expenditures"); setPage(1); }}
               className={cn(
                 "px-6 py-2 rounded-lg text-sm font-bold transition-all",
                 activeTab === "expenditures" ? "bg-white text-primary-900 shadow-sm" : "text-gray-500 hover:text-gray-900"
               )}
             >
               Church Support
             </button>
          </div>

          <div className="flex items-center gap-3">
             <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input className="pl-10 rounded-xl border-gray-200 w-full md:w-64" placeholder="Search transactions..." />
             </div>
             <Button variant="outline" className="rounded-xl border-gray-200 px-3 h-10 w-10">
                <Filter className="w-4 h-4" />
             </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">Date</th>
                <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">Description</th>
                <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">Type / Category</th>
                <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">Amount</th>
                <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    <td colSpan={5} className="px-8 py-4">
                      <div className="h-6 bg-gray-50 animate-pulse rounded w-full" />
                    </td>
                  </tr>
                ))
              ) : transactions.length > 0 ? (
                transactions.map((tx: any) => {
                  const date = formatDate(tx.createdAt);
                  return (
                    <tr key={tx.id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-8 py-6">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-gray-900">{date.full}</span>
                          <span className="text-xs text-gray-400">{date.time}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <p className="text-sm text-gray-600 line-clamp-1">{tx.description || tx.title || "No description provided"}</p>
                      </td>
                      <td className="px-8 py-6">
                         <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium border border-gray-200">
                            {activeTab === "receipts" ? (tx.category?.name || "Contribution") : "Support"}
                         </span>
                      </td>
                      <td className="px-8 py-6">
                         <span className={cn(
                           "text-sm font-bold",
                           activeTab === "receipts" ? "text-emerald-600" : "text-red-600"
                         )}>
                           {activeTab === "receipts" ? "+" : "-"}{formatCurrency(getAmount(tx))}
                         </span>
                      </td>
                      <td className="px-8 py-6">
                         <div className="flex items-center gap-2">
                            <div className={cn(
                              "w-2 h-2 rounded-full",
                              activeTab === "receipts" ? "bg-emerald-500" : (tx.status === "DONE" || tx.status === "DISBURSED" ? "bg-emerald-500" : "bg-amber-500")
                            )} />
                            <span className="text-xs font-bold text-gray-900">
                               {activeTab === "receipts" ? "COMPLETED" : (tx.status || "COMPLETED")}
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
                       <div className="p-4 bg-gray-50 rounded-full text-gray-300">
                          <History className="w-8 h-8" />
                       </div>
                       <p className="text-gray-500 font-medium">No transactions found for this period.</p>
                       <p className="text-xs text-gray-400">Try adjusting your filters or checking another tab.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="p-6 border-t border-gray-50 bg-gray-50/30 flex items-center justify-between">
             <p className="text-sm text-gray-500">
                Page <span className="font-bold text-gray-900">{page}</span> of <span className="font-bold text-gray-900">{totalPages}</span>
             </p>
             <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="rounded-lg h-9 w-9 p-0 bg-white" 
                  disabled={page === 1}
                  onClick={() => setPage(p => p - 1)}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button 
                   variant="outline" 
                   size="sm" 
                   className="rounded-lg h-9 w-9 p-0 bg-white" 
                   disabled={page >= totalPages}
                   onClick={() => setPage(p => p + 1)}
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
