"use client";
import { MemberNavigation } from "@/components/layout/navigations/Navigation";
import { GetParishPriestType, NavElement } from "@/../types";
import SignoutBtn from "@/components/common/signout-btn";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useParishPriestStore } from "@/stores/useParishPriestStore";
import { useQuery } from "@tanstack/react-query";
import { parishPriestService } from "@/services/parish-priest.service";
import { useEffect } from "react";
import { Spinner } from "@/components/ui/spinner";
import DataFetchSpinner from "@/components/ui/data-fetch-spinner";
import DataFetchError from "@/components/ui/data-fetch-error";

const subPages: NavElement[] = [
  {
    name: "Dashboard",
    href: "dashboard",
  },
  {
    name: "Baptisms",
    href: "baptisms",
  },
  {
    name: "Confirmations",
    href: "confirmations",
  },
  {
    name: "Marriages",
    href: "Marriages",
  },
  {
    name: "Parishioners",
    href: "parishioners",
  },
];

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Readonly<Props>) => {
  const { data: session } = useSession();
  const setData = useParishPriestStore((state) => state.setAll);
  const { data, isLoading, isError, isSuccess } = useQuery<GetParishPriestType>(
    {
      queryKey: ["parishioner", session?.user?.id],
      queryFn: parishPriestService.getMe,
      refetchOnWindowFocus: false,
    },
  );

  useEffect(() => {
    if (!data) return;
    setData(data);
  }, [data, setData]);
  return (
    <div className="p-7.5">
      <SignoutBtn />

      <header className="flex justify-between mt-7.5">
        <Link href={"/dashboard"} className="hidden sm:block">
          <Image
            width={225}
            height={97.5}
            className="w-22.5 h-9.75"
            src="/logo.webp"
            alt="ola parish logo"
          />
        </Link>

        <MemberNavigation matcherType="ends-with" items={subPages} />
        <div className="hidden sm:block bg-secondary-900 px-5 py-3 text-white">
          {data ? `${data?.priest.title} ${data?.user.firstName}` : <Spinner />}
        </div>
      </header>
      <div className="w-full h-full">
        {isLoading && <DataFetchSpinner />}
        {isError && <DataFetchError />}
        {isSuccess && children}
      </div>
    </div>
  );
};

export default Layout;
