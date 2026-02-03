import { BaseUser } from "./users";

export interface FinancialCategory {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReceiptItem {
  id: string;
  receiptId: string;
  parishionerId: string;
  amount: number;
  parishioner?: {
    id: string;
    userId: string;
    user: BaseUser;
  };
}

export interface Receipt {
  id: string;
  categoryId: string;
  description?: string;
  totalAmount: number;
  date: string;
  createdById: string;
  category?: FinancialCategory;
  items?: ReceiptItem[];
  creator?: BaseUser;
  createdAt: string;
  updatedAt: string;
}

export interface DebitRequest {
  id: string;
  title: string;
  description: string;
  amount: number;
  recipientId?: string;
  status: 'PENDING' | 'APPROVED' | 'CHECK_SIGNED' | 'REJECTED' | 'DISBURSED';
  createdById: string;
  reviewedById?: string;
  rejectionReason?: string;
  disbursedAt?: string;
  recipient?: BaseUser;
  creator?: BaseUser;
  reviewer?: BaseUser;
  createdAt: string;
  updatedAt: string;
}

export interface FinancialSummary {
  totalReceipts: number;
  totalExpenditures: number;
  balance: number;
}

export interface FinancialParams {
  startDate: string;
  endDate: string;
  categoryId?: string;
}
