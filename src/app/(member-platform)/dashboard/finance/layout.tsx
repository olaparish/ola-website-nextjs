import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Financial Management',
  description: 'Manage parish finances, receipts, and withdrawal requests.',
};

export default function FinanceLayout({ children }: { children: React.ReactNode }) {
  return children;
}
