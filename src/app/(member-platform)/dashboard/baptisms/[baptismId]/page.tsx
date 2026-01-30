"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { baptismService } from "@/services/baptism.service";
import BaptismTable from "@/components/tables/sample-tables/baptism";
import { PageHeader } from "@/components/common/PageHeader";
import { DetailCard, DetailItem } from "@/components/common/DetailDisplay";
import { Droplets, Calendar, User, Info, ArrowLeft } from "lucide-react";
import DataFetchSpinner from "@/components/ui/data-fetch-spinner";
import { Button } from "@/components/ui/button";

const Page = () => {
  const { baptismId } = useParams();
  const router = useRouter();

  const { data: baptism, isLoading } = useQuery({
    queryKey: ["baptism", baptismId],
    queryFn: () => baptismService.getById(baptismId as string),
  });

  if (isLoading) return <DataFetchSpinner />;
  if (!baptism) return <div>Baptism record not found.</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => router.back()}
          className="hover:bg-gray-100 rounded-full"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <PageHeader
          title="Baptism Details"
          subtitle={`Viewing details for record ID: ${baptismId?.slice(0, 8)}`}
          icon={Droplets}
          className="mb-0 flex-1"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DetailCard title="General Information" icon={Info} className="md:col-span-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12">
            <DetailItem 
              label="Baptism Type" 
              value={baptism.type} 
              icon={Info} 
            />
            <DetailItem 
              label="Date of Baptism" 
              value={new Date(baptism.date).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })} 
              icon={Calendar} 
            />
            <DetailItem 
              label="Officiating Priest" 
              value={`${baptism.officiatingPriest?.user?.firstName} ${baptism.officiatingPriest?.user?.lastName}`} 
              icon={User} 
            />
            <DetailItem 
              label="Total Candidates" 
              value={baptism.count} 
              icon={User} 
            />
          </div>
        </DetailCard>

        <DetailCard title="Record Status" icon={Info}>
          <div className="space-y-4">
            <DetailItem 
              label="Date Created" 
              value={new Date(baptism.createdAt).toLocaleDateString()} 
            />
            <DetailItem 
              label="Last Updated" 
              value={new Date(baptism.updatedAt).toLocaleDateString()} 
            />
          </div>
        </DetailCard>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
          <h3 className="font-bold text-gray-900">Candidates List</h3>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-primary-100 text-primary-800">
            {baptism.count} Total
          </span>
        </div>
        <BaptismTable
          wrapperClassName="h-auto border-none bg-transparent"
          paginationClassname="flex justify-end p-4 border-t border-gray-50"
          baptismId={baptismId as string}
        />
      </div>
    </div>
  );
};

export default Page;
