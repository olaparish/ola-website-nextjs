import { PaginateResult, PaginateOptions } from "../../types/parishioner";
import { FinancialParams, Receipt, DebitRequest, FinancialCategory, FinancialSummary } from "../../types/finance";
import axios from "@/utils/axios";

export const financialService = {
  // Categories
  getCategories: async () => {
    return axios.get<{ data: FinancialCategory[] }>("/finance/categories");
  },
  createCategory: async (data: { name: string; description?: string }) => {
    return axios.post("/finance/categories", data);
  },

  // Receipts
  getReceipts: async (params: PaginateOptions) => {
    return axios.get<PaginateResult<Receipt>>("/finance/receipts", { params });
  },
  createReceipt: async (data: {
    categoryId: string;
    description?: string;
    date: string;
    items: { parishionerId: string; amount: number }[];
  }) => {
    return axios.post("/finance/receipts", data);
  },

  // Debit Requests
  getDebitRequests: async (params: PaginateOptions) => {
    return axios.get<PaginateResult<DebitRequest>>("/finance/debit-requests", { params });
  },
  createDebitRequest: async (data: {
    title: string;
    description: string;
    amount: number;
    recipientId?: string;
  }) => {
    return axios.post("/finance/debit-requests", data);
  },
  reviewDebitRequest: async (id: string, data: { status: 'APPROVED' | 'REJECTED'; reason?: string }) => {
    return axios.put(`/finance/debit-requests/${id}/review`, data);
  },
  signCheck: async (id: string) => {
    return axios.put(`/finance/debit-requests/${id}/sign-check`, {});
  },
  markAsDisbursed: async (id: string) => {
    return axios.put(`/finance/debit-requests/${id}/disburse`, {});
  },

  // Reports
  getFinancialReport: async (params: FinancialParams) => {
    return axios.get("/finance/report", { params });
  },

  // User Finance
  getUserFinance: async (userId: string, params: { type?: 'receipts' | 'expenditures'; page?: number; limit?: number }) => {
    return axios.get<{ summary: FinancialSummary; data: PaginateResult<Receipt | DebitRequest> }>(`/finance/users/${userId}`, { params });
  },
};
