import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Withdrawal Request Details',
  description: 'View and manage withdrawal request details.',
};

export default function RequestDetailsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
