"use client";
import React from "react";
import { Receipt, DebitRequest } from "../../../types/finance";
import { PaginateResult } from "../../../types/parishioner";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import PaginationControls from "@/components/tables/ui/pagination-controls";
import { useRouter } from "next/navigation";

type TransactionListProps = {
  receipts?: PaginateResult<Receipt>;
  requests?: PaginateResult<DebitRequest>;
  type: "income" | "expenditure";
  onAction?: (action: string, id: string) => void;
  userRole?: string;
  onPageChange?: (page: number) => void;
};

export const TransactionList = ({ receipts, requests, type, onAction, userRole, onPageChange }: TransactionListProps) => {
  const router = useRouter();

  if (type === "income" && receipts) {
    return (
      <div className="space-y-4">
      <div className="overflow-x-auto border rounded-md">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3 text-right">Amount (GHS)</th>
              <th className="px-4 py-3 text-center">Items</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {receipts.docs.length === 0 && (
                <tr><td colSpan={5} className="text-center py-8 text-gray-500">No receipts found</td></tr>
            )}
            {receipts.docs.map((receipt) => (
              <tr 
                key={receipt.id} 
                className="hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => router.push(`/dashboard/finance/receipts/${receipt.id}`)}
              >
                <td className="px-4 py-3">{format(new Date(receipt.date), "MMM d, yyyy")}</td>
                <td className="px-4 py-3">{receipt.category?.name || "N/A"}</td>
                <td className="px-4 py-3 max-w-xs truncate" title={receipt.description}>{receipt.description}</td>
                <td className="px-4 py-3 text-right font-medium text-green-600">
                  {Number(receipt.totalAmount).toFixed(2)}
                </td>
                <td className="px-4 py-3 text-center">
                    <span className="bg-gray-100 px-2 py-1 rounded text-xs">{receipt.items?.length || 0}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {receipts.totalPages > 1 && onPageChange && (
         <div className="flex justify-end">
            <PaginationControls {...receipts} changePage={onPageChange} />
         </div>
      )}
      </div>
    );
  }

  if (type === "expenditure" && requests) {
    return (
      <div className="space-y-4">
      <div className="overflow-x-auto border rounded-md">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Requester</th>
              <th className="px-4 py-3 text-right">Amount (GHS)</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {requests.docs.length === 0 && (
                <tr><td colSpan={6} className="text-center py-8 text-gray-500">No requests found</td></tr>
            )}
            {requests.docs.map((req) => (
              <tr 
                key={req.id} 
                className="hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={(e) => {
                    // Prevent navigation if clicking action buttons
                    if ((e.target as HTMLElement).closest('button')) return;
                    router.push(`/dashboard/finance/requests/${req.id}`);
                }}
              >
                <td className="px-4 py-3">{format(new Date(req.createdAt), "MMM d, yyyy")}</td>
                <td className="px-4 py-3 font-medium">{req.title}</td>
                <td className="px-4 py-3">{req.creator?.firstName} {req.creator?.lastName}</td>
                <td className="px-4 py-3 text-right font-medium text-red-600">
                  {Number(req.amount).toFixed(2)}
                </td>
                <td className="px-4 py-3">
                    <StatusBadge status={req.status} />
                </td>
                <td className="px-4 py-3 text-right space-x-2">
                    {/* Actions for PP: Approve, Sign Check */}
                    {userRole === "PARISH_PRIEST" && req.status === "PENDING" && (
                        <div className="flex gap-2 justify-end">
                            <Button size="sm" onClick={() => onAction?.('APPROVE', req.id)} className="bg-green-600 h-7 text-xs">Approve</Button>
                            <Button size="sm" onClick={() => onAction?.('REJECT', req.id)} variant="destructive" className="h-7 text-xs">Reject</Button>
                        </div>
                    )}
                    {userRole === "PARISH_PRIEST" && req.status === "APPROVED" && (
                        <Button size="sm" onClick={() => onAction?.('SIGN_CHECK', req.id)} className="bg-blue-600 h-7 text-xs text-white">Sign Check</Button>
                    )}

                    {/* Actions for Accountant: Disburse */}
                    {userRole === "ACCOUNTANT" && (req.status === "CHECK_SIGNED" || req.status === "APPROVED") && (
                        <Button size="sm" onClick={() => onAction?.('DISBURSE', req.id)} className="bg-purple-600 h-7 text-xs text-white">Mark Disbursed</Button>
                    )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {requests.totalPages > 1 && onPageChange && (
         <div className="flex justify-end">
            <PaginationControls {...requests} changePage={onPageChange} />
         </div>
      )}
      </div>
    );
  }

  return null;
};

const StatusBadge = ({ status }: { status: string }) => {
    const styles: Record<string, string> = {
        PENDING: "bg-yellow-100 text-yellow-800",
        APPROVED: "bg-blue-100 text-blue-800",
        CHECK_SIGNED: "bg-indigo-100 text-indigo-800",
        DISBURSED: "bg-green-100 text-green-800",
        REJECTED: "bg-red-100 text-red-800",
    };
    
    return (
        <span className={cn("px-2 py-1 rounded-full text-xs font-semibold", styles[status] || "bg-gray-100 text-gray-800")}>
            {status.replace("_", " ")}
        </span>
    );
};
