"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { parishionerService } from "@/services/parishioner.service";
import { useParishionerStore } from "@/stores/useParishioner";
import { GetUserDetails, Parishioner } from "@/../types";

export function useParishioner() {
  const { data: session } = useSession();
  const setData = useParishionerStore((state) => state.setAll);

  const query = useQuery<GetUserDetails<Parishioner>>({
    queryKey: ["parishioner", session?.user?.id],
    queryFn: parishionerService.getParishioner,
    enabled: !!session?.user?.id, // important
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (query.data) {
      setData(query.data);
    }
  }, [query.data, setData]);

  return query;
}
