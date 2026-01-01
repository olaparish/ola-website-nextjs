"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { GetParishPriestType } from "../../../../../types";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { priestService } from "@/services/priest.service";
import { Spinner } from "@/components/ui/spinner";
import { ErrorSpan } from "@/components/ui/errors";

const Page = () => {
  const { data, isLoading, isError } = useQuery<GetParishPriestType>({
    queryKey: ["parish-priest"],
    queryFn: async () => {
      const pp = await priestService.getParishPriest();
      if (!pp) {
        toast.error("Parish priest not found");
      }
      toast.success("Parish Priest Fetched");
      return pp;
    },
    refetchOnWindowFocus: false,
  });

  if (isError)
    return (
      <div className="flex justify-center items-center w-full">
        <ErrorSpan message="Error fetching Parish Priest Data" className="" />
      </div>
    );

  if (isLoading)
    return (
      <div className="flex justify-center items-center w-full">
        <Spinner className="size-10" />
      </div>
    );

  return (
    <div className="w-full">
      <div className="gap-9 grid grid-cols-2">
        <img
          className="hidden md:block w-72"
          src="/logo.webp"
          alt="ola parish"
        />
        <div>
          <p className="mb-3.75">
            {`${data?.priest.title} ${data?.user.firstName} ${data?.user.lastName} ${data?.user.otherNames}`}
          </p>

          <p className="mb-2.75">Office of Ola Parish</p>
          <Link className="mb-2.5" href={`mailto:${data?.user.email}`}>
            {data?.user.email}
          </Link>
          <br />
          <Link href={`tel:${data?.user.phoneNumber}`}>
            {data?.user.phoneNumber}
          </Link>
        </div>
      </div>
      <div className="flex flex-col-reverse items-center gap-9 xl:grid xl:grid-cols-2 mt-9">
        <div className="space-y-7.5 w-full">
          {data?.parishPriest.message.split("\n").map((message, index) => (
            <p key={index}>{message}</p>
          ))}
        </div>
        <div className="w-full h-auto">
          <img
            src={data?.user.avatar}
            alt="ola parish priest"
            className="max-h-225 object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
