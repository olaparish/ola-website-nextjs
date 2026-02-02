"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { confirmationService } from "@/services/confirmation.service";
import ConfirmationTable from "@/components/tables/sample-tables/confirmation";
import { PageHeader } from "@/components/common/PageHeader";
import { DetailCard, DetailItem } from "@/components/common/DetailDisplay";
import { Flame, Calendar, User, Info, ArrowLeft } from "lucide-react";
import DataFetchSpinner from "@/components/ui/data-fetch-spinner";
import { Button } from "@/components/ui/button";

const Page = () => {
  const { confirmationId } = useParams();
  const router = useRouter();

  const { data: confirmation, isLoading } = useQuery({
    queryKey: ["confirmation", confirmationId],
    queryFn: () => confirmationService.getById(confirmationId as string),
  });

  if (isLoading) return <DataFetchSpinner />;
  if (!confirmation) return <div>Confirmation record not found.</div>;

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
          title="Confirmation Details"
          subtitle={`Viewing details for record ID: ${confirmationId?.slice(0, 8)}`}
          icon={Flame}
          className="mb-0 flex-1"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DetailCard title="General Information" icon={Info} className="md:col-span-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12">
            <DetailItem 
              label="Date of Confirmation" 
              value={new Date(confirmation.date).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })} 
              icon={Calendar} 
            />
            <DetailItem 
              label="Officiating Priest" 
              value={`${confirmation.officiatingPriest?.user?.firstName} ${confirmation.officiatingPriest?.user?.lastName}`} 
              icon={User} 
            />
            <DetailItem 
              label="Total Candidates" 
              value={confirmation.count} 
              icon={User} 
            />
          </div>
        </DetailCard>

        <DetailCard title="Record Status" icon={Info}>
          <div className="space-y-4">
            <DetailItem 
              label="Date Created" 
              value={new Date(confirmation.createdAt).toLocaleDateString()} 
            />
            <DetailItem 
              label="Last Updated" 
              value={new Date(confirmation.updatedAt).toLocaleDateString()} 
            />
          </div>
        </DetailCard>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
          <h3 className="font-bold text-gray-900">Candidates List</h3>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-primary-100 text-primary-800">
            {confirmation.count} Total
          </span>
        </div>
        <ConfirmationTable
          wrapperClassName="h-auto border-none bg-transparent"
          paginationClassname="flex justify-end p-4 border-t border-gray-50"
          confirmationId={confirmationId as string}
        />
      </div>
    </div>
  );
};

export default Page;
