"use client";

import { Spinner } from "@/components/ui/spinner";
import { ValidateRights } from "@/utils/validatePermissions";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { ParishGroupResponse } from "../../../../../types";
import { parishGroupService } from "@/services/parish-groups.service";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useParishGroupStore } from "@/hooks/useParishGroups";

type RouteName = {
  name: string;
  permission: string[];
};

const routeNames: Record<string, RouteName> = {
  "resident-priest": {
    name: "Resident Priest details",
    permission: ["create:priest"],
  },
  "visiting-priest": {
    name: "Resident Priest details",
    permission: ["create:priest"],
  },
  accountant: {
    name: "Accountant details",
    permission: ["create:accountant"],
  },
  catechist: {
    name: "Catechist details",
    permission: ["create:catechist"],
  },
};

export function getRouteMeta(pathname: string) {
  const key = pathname.split("/").filter(Boolean).at(-1);
  if (key && key in routeNames) {
    return routeNames[key as keyof typeof routeNames];
  }
  return null;
}

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { setGroups } = useParishGroupStore();
  const router = useRouter();
  const { data, status } = useSession();
  const routeData = getRouteMeta(usePathname());
  const userPermissions = data?.user?.permissions || [];

  const {
    data: fetchedParishGroups,
    isLoading,
    isSuccess,
    isError,
  } = useQuery<ParishGroupResponse>({
    queryKey: ["parishGrous"],
    queryFn: parishGroupService.getGroups,
    retry: 2,
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/auth");
    }
    if (isError) {
      toast.error("Failed to load parish stations");
    }

    if (isSuccess) {
      toast.success("Parish Groups fetched successfully");
      setGroups(fetchedParishGroups);
    }
  }, [fetchedParishGroups, isError, isSuccess, router, setGroups, status]);

  const goBack = () => {
    router.back();
  };

  if (!routeData) {
    return (
      <div className="flex flex-col justify-center items-center w-dvw h-dvh">
        <p className="mb-3 font-semibold text-2xl">Page not found</p>
        <button
          className="bg-secondary-900 px-6 py-3 text-white cursor-pointer"
          onClick={goBack}
        >
          Go back
        </button>
      </div>
    );
  }

  if (status === "loading" || isLoading)
    return (
      <div className="flex flex-col justify-center items-center w-dvw h-dvh">
        <Spinner className="size-8" />
        <p className="text-lg">Loading ...</p>
      </div>
    );

  if (
    status === "authenticated" &&
    routeData &&
    !ValidateRights(routeData.permission, userPermissions)
  ) {
    goBack();
  }

  return (
    <div className="p-5">
      <header className="flex justify-between p-0 sm:p-10">
        <p className="text-sm sm:text-xl">{routeData.name}</p>
        <button
          className="bg-secondary-900 px-2 sm:px-6 py-1 sm:py-3 text-white cursor-pointer"
          onClick={goBack}
        >
          Cancel
        </button>
      </header>
      <div className="flex justify-center gap-52 mt-10 md:px-5 w-full">
        {children}
        <div className="hidden lg:block">
          <Image
            width={220}
            height={95}
            className=""
            src="/logo.webp"
            alt="ola parish logo"
          />
          <p className="block mt-15 w-43.5 font-medium text-dark-900 text-xl">
            Join The Catholic Faith, Celebrate A Welcoming Community
          </p>

          <Image
            width={367}
            height={245}
            className="mt-18.75"
            src="/images/organisations/new-initiation.png"
            alt="ola parish a person holding a Rosary and a Bible"
          />
        </div>
      </div>
    </div>
  );
}
