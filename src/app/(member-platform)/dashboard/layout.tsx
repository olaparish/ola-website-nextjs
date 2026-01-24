"use client";
import { NavElement } from "../../../../types";
import SignoutBtn from "@/components/common/signout-btn";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useParishPriestStore } from "@/stores/useParishPriestStore";
import { useEffect } from "react";
import { Spinner } from "@/components/ui/spinner";
import DataFetchSpinner from "@/components/ui/data-fetch-spinner";
import PopoverSelect from "@/components/ui/popover";
import { ValidateRights } from "@/utils/validatePermissions";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { IconGear } from "@/components/icons/icon-gear";
import { newOptions, subPages } from "./data";

type Props = {
  children: React.ReactNode;
};

const renderAddPopover = ({ name, href }: NavElement) => {
  return (
    <Link className="block w-30 truncate" href={href}>
      {name}
    </Link>
  );
};

const Layout = ({ children }: Readonly<Props>) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const setData = useParishPriestStore((state) => state.setAll);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/auth");
    }
  }, [setData, router, status]);

  const userPermissions = session?.user?.permissions || [];

  const parsedSubPages = subPages.filter((li) =>
    ValidateRights([li.permission as string], userPermissions),
  );
  const parsedPopoverLinks = newOptions.filter((li) =>
    ValidateRights([li.permission as string], userPermissions),
  );

  const isActiveRoute = (href: string) => {
    const [, first, second] = pathname.split("/");

    return (
      (href === "dashboard" && first === "dashboard" && !second) ||
      second === href
    );
  };

  if (status === "loading") return <DataFetchSpinner />;

  return (
    <div className="p-5 lg:px-17.5">
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

        {/* <MemberNavigation matcherType="ends-with" items={subPages} /> */}
        <div className="flex items-center">
          <div className="hidden sm:flex items-center gap-2 bg-secondary-900 px-5 py-3 text-white">
            {status === "authenticated" ? (
              `${session?.user?.firstName}`
            ) : (
              <Spinner />
            )}
            <Link href="dashboard/settings">
              <IconGear />
            </Link>
          </div>

          <PopoverSelect
            name="New"
            items={parsedPopoverLinks}
            render={renderAddPopover}
            btnClassName="bg-transparent text-normal py-2"
          />
        </div>
      </header>
      <div></div>
      <div className="flex gap-2 mt-10 w-full h-full">
        <div>
          <nav className="flex flex-col pr-12.5 pb-20 w-full lg:w-60.5 h-fit">
            {parsedSubPages.map((sub, index) => {
              const isActive = isActiveRoute(sub.href);
              return (
                <Link
                  key={index}
                  href={sub.href}
                  className={cn(
                    "pt-5 pb-4 border-b-[0.5px] xl:text-[16px] text-xs curser-pointer",
                    isActive
                      ? "bg-primary-900 text-white font-semibold pl-2 rounded-sm"
                      : "",
                  )}
                >
                  {sub.name}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="w-full overflow-y-scroll">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
