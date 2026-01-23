"use client";

import { parishionerService } from "@/services/parishioner.service";
import { useParishionerStore } from "@/stores/useParishioner";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { GetUserDetails, Parishioner } from "../../../../types";
import DataFetchSpinner from "@/components/ui/data-fetch-spinner";
import DataFetchError from "@/components/ui/data-fetch-error";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Readonly<Props>) {
  const { data: session } = useSession();
  const setData = useParishionerStore((state) => state.setAll);
  const { data, isLoading, isError } = useQuery<GetUserDetails<Parishioner>>({
    queryKey: ["parishioner", session?.user?.id],
    queryFn: parishionerService.getParishioner,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!data) return;
    setData(data);
  }, [data, setData]);

  if (isLoading) return <DataFetchSpinner />;
  if (isError) return <DataFetchError />;
  return <div className="mt-5">{children}</div>;
}
