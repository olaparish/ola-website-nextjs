import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Receipt Details',
  description: 'View receipt transaction details.',
};

export default function ReceiptDetailsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
