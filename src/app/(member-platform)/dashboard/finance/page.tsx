"use client";
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { financialService } from "@/services/financial.service";
import { PaymentForm } from "@/components/finance/PaymentForm";
import { TransactionList } from "@/components/finance/TransactionList";
import { WithdrawalRequestForm } from "@/components/finance/WithdrawalRequestForm";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const FinancePage = () => {
  const { user } = useAuth();
  const userRole = user?.role;
  const userId = user?.id;
  const isFinanceAdmin = ["ACCOUNTANT", "CATECHIST", "PARISH_COUNCIL_CHAIRMAN", "AUDITOR", "PARISH_PRIEST"].includes(userRole || "");
  const canAct = ["ACCOUNTANT", "CATECHIST", "PARISH_PRIEST"].includes(userRole || "");
  const canCreate = ["ACCOUNTANT", "CATECHIST"].includes(userRole || "");

  const queryClient = useQueryClient();
  
  // Pagination State
  const [receiptsPage, setReceiptsPage] = useState(1);
  const [requestsPage, setRequestsPage] = useState(1);
  const limit = 20;

  const { data: receipts, isLoading: receiptsLoading } = useQuery({
    queryKey: ['receipts', receiptsPage],
    queryFn: async () => {
        const res = await financialService.getReceipts({ page: receiptsPage, limit });
        return res.data;
    },
    enabled: isFinanceAdmin
  });

  const { data: requests, isLoading: requestsLoading } = useQuery({
    queryKey: ['debit-requests', requestsPage],
    queryFn: async () => {
        const res = await financialService.getDebitRequests({ page: requestsPage, limit });
        return res.data;
    },
    enabled: isFinanceAdmin
  });

  // Actions...
  const { mutate: mutateStatus } = useMutation({
    mutationFn: async ({ id, action }: { id: string, action: string }) => {
        if (action === 'SIGN_CHECK') return financialService.signCheck(id);
        if (action === 'DISBURSE') return financialService.markAsDisbursed(id);
        if (action === 'APPROVE') return financialService.reviewDebitRequest(id, { status: 'APPROVED' });
        if (action === 'REJECT') return financialService.reviewDebitRequest(id, { status: 'REJECTED', reason: 'Rejected by PP' });
    },
    onSuccess: () => {
        toast.success("Action completed successfully");
        queryClient.invalidateQueries({ queryKey: ['debit-requests'] });
    },
    onError: () => toast.error("Action failed")
  });

  const handleAction = (action: string, id: string) => {
    mutateStatus({ id, action });
  };

  // Access Control for Non-Admins (Parishioners)
  if (!isFinanceAdmin) {
    return <ParishionerFinanceView userId={userId || ""} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Financial Management</h1>
      </div>

      <Tabs defaultValue="income" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="income">Income</TabsTrigger>
          <TabsTrigger value="expenditure">Expenditure</TabsTrigger>
        </TabsList>
        
        <TabsContent value="income" className="space-y-6 mt-6">
          {canCreate && (
             <div className="flex justify-end">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="bg-primary-900 text-white gap-2">
                            <Plus className="size-4" /> Record New Payment
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>Record New Payment</DialogTitle>
                        </DialogHeader>
                        <PaymentForm />
                    </DialogContent>
                </Dialog>
             </div>
          )}
          
          <Card>
            <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Recent Receipts</h3>
                {receiptsLoading ? <Spinner /> : (
                    <TransactionList 
                        type="income" 
                        receipts={receipts} 
                        userRole={userRole}
                        onPageChange={setReceiptsPage}
                    />
                )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="expenditure" className="space-y-6 mt-6">
          {canCreate && (
              <div className="flex justify-end">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="bg-secondary-900 text-white gap-2">
                            <Plus className="size-4" /> New Withdrawal Request
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                        <DialogHeader>
                            <DialogTitle>New Withdrawal Request</DialogTitle>
                        </DialogHeader>
                        <WithdrawalRequestForm />
                    </DialogContent>
                </Dialog>
              </div>
          )}

          <Card>
            <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Withdrawal Requests</h3>
                {requestsLoading ? <Spinner /> : (
                    <TransactionList 
                        type="expenditure" 
                        requests={requests} 
                        userRole={userRole} 
                        onAction={handleAction}
                        onPageChange={setRequestsPage}
                    />
                )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinancePage;

const ParishionerFinanceView = ({ userId }: { userId: string }) => {
    const { data, isLoading } = useQuery({
        queryKey: ['my-finance', userId],
        queryFn: async () => {
            if (!userId) return null;
            const res = await financialService.getUserFinance(userId, { limit: 10 });
            return res.data;
        }
    });

    if (isLoading) return <div className="p-8 flex justify-center"><Spinner /></div>;
    if (!data) return <div className="p-8 text-center">No data available</div>;

    const { summary, data: transactions } = data; // Default data is receipts

    return (
        <div className="p-6 max-w-4xl mx-auto space-y-8">
            <h1 className="text-2xl font-bold">My Financials</h1>
            
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                    <p className="text-sm text-green-600">Total Contributed</p>
                    <p className="text-2xl font-bold text-green-700">GHS {summary.totalReceipts.toFixed(2)}</p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                    <p className="text-sm text-red-600">Total Received</p>
                    <p className="text-2xl font-bold text-red-700">GHS {summary.totalExpenditures.toFixed(2)}</p>
                </div>
                 <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <p className="text-sm text-blue-600">Net Balance</p>
                    <p className="text-2xl font-bold text-blue-700">GHS {summary.balance.toFixed(2)}</p>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-4">
                <h3 className="font-semibold mb-4">Recent Transactions</h3>
                {/* Simplified list for parishioner */}
                <TransactionList 
                    type="income" // Reusing list, strictly showing what api returned for now (defaults to receipts)
                    receipts={transactions.docs as any} 
                />
            </div>
        </div>
    )
}
