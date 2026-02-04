"use client";

import DataFetchError from "@/components/ui/data-fetch-error";
import DataFetchSpinner from "@/components/ui/data-fetch-spinner";
import { useParishioner } from "@/hooks/useParishioner";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Readonly<Props>) {
  const { isLoading, isError } = useParishioner();

  if (isLoading) return <DataFetchSpinner />;
  if (isError) return <DataFetchError />;

  return <div>{children}</div>;
}
