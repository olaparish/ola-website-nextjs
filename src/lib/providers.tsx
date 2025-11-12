"use client";

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "next-auth/react";

const Providers = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  const originalInvalidateQueries =
    queryClient.invalidateQueries.bind(queryClient);
  queryClient.invalidateQueries = (filters) => {
    return originalInvalidateQueries({
      ...filters,
      exact: filters?.exact ?? false,
    });
  };
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        {/* <PermissionProvider> */}
        <Toaster richColors />
        {/* <RouteFeedbackProvider /> */}
        {children}
        {/* </PermissionProvider> */}
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default Providers;
