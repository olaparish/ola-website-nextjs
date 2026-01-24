import Image from "next/image";
import { RangeOptionId } from "../../../types";
import { useQuery } from "@tanstack/react-query";
import { statsService } from "@/services/stats.service";
import DashboardCard from "../ui/DashboardCard";
import DataFetchError from "../ui/data-fetch-error";
import DataFetchSpinner from "../ui/data-fetch-spinner";
import { cn } from "@/lib/utils";

type Props = {
  range: RangeOptionId;
};

const Stats = ({ range }: Props) => {
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["stats", range],
    queryFn: () => statsService.get(range),
  });

  console.log("Data: ", data);

  const metrics: { name: string; value: string }[] = [
    { name: "Baptisms", value: data?.counts.baptisms.toString() as string },
    {
      name: "Confirmations",
      value: data?.counts.confirmations.toString() as string,
    },
    { name: "Marriages", value: data?.counts.marriages.toString() as string },
  ];

  return (
    <div className={cn("relative", isError || isLoading ? "h-54" : "")}>
      {isLoading && <DataFetchSpinner />}
      {isError && (
        <DataFetchError
          message={`Error fetching statistics. Reload to try again`}
        />
      )}
      {isSuccess && (
        <div>
          <div className="flex mt-6">
            <div className="relative mr-12.5 pt-8 pl-6 w-102.5 h-48.25">
              <Image
                src="/vectors/total-number.svg"
                fill
                alt="vector"
                className="top-0 left-0 absolute w-full h-full"
              />
              <div className="z-10 absolute flex gap-5 w-full h-full">
                <div>
                  <p className="font-light text-sm">Parishioners</p>
                  <p className="mt-2 font-medium text-2xl">
                    {data?.counts.parishioners}
                  </p>
                </div>
                <div>
                  <p className="font-light text-sm">Visitors</p>
                  <p className="mt-2 font-medium text-2xl">
                    {data?.counts.visitors}
                  </p>
                </div>
              </div>
            </div>
            <ul className="gap-x-7.5 gap-y-2 grid grid-cols-[auto_auto]">
              {metrics.map((metric, index) => (
                <li key={index}>
                  <DashboardCard title={metric.name} subtitle={metric.value} />
                </li>
              ))}
            </ul>
            <div className="bg-primary-100 ml-7.5 px-5.5 py-4 w-70 h-fit cursor-pointer">
              <p className="block mb-3 font-light">Finance</p>
              <p className="font-medium">GHC {data?.finance.totalIncome}</p>
              <hr className="bg-black/30 my-5 border-none h-[0.5px]" />
              <p className="block mb-3 text-sm truncate">
                Total Income: GHC {data?.finance.totalIncome}
              </p>
              <p className="block mb-3 text-sm truncate">
                Total Expenditure: GHC {data?.finance.totalExpenditure}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Stats;
