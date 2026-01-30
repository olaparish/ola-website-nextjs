"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { marriageService } from "@/services/marriage.service";
import { PageHeader } from "@/components/common/PageHeader";
import { DetailCard, DetailItem } from "@/components/common/DetailDisplay";
import { Heart, Calendar, User, Info, ArrowLeft } from "lucide-react";
import DataFetchSpinner from "@/components/ui/data-fetch-spinner";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const Page = () => {
  const { marriageId } = useParams();
  const router = useRouter();

  const { data: response, isLoading } = useQuery({
    queryKey: ["marriage", marriageId],
    queryFn: () => marriageService.getMarriage(marriageId as string),
  });

  console.log("Response: ", response);
  const marriage = response;

  if (isLoading) return <DataFetchSpinner />;
  if (!marriage) return <div>Marriage record not found.</div>;

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
          title="Marriage Details"
          subtitle={`Viewing record for ID: ${marriageId?.slice(0, 8)}`}
          icon={Heart}
          className="flex-1 mb-0"
        />
      </div>

      <div className="gap-6 grid grid-cols-1 lg:grid-cols-3">
        {/* Left Column: General Info */}
        <div className="space-y-6 lg:col-span-2">
          <DetailCard title="Ceremony Details" icon={Info}>
            <div className="gap-x-12 gap-y-6 grid grid-cols-1 sm:grid-cols-2">
              <DetailItem
                label="Date of Marriage"
                value={new Date(marriage.date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
                icon={Calendar}
              />
              <DetailItem
                label="Officiating Priest"
                value={
                  marriage.officiatingPriest
                    ? `${marriage.officiatingPriest.user.firstName} ${marriage.officiatingPriest.user.lastName}`
                    : "Not Assigned"
                }
                icon={User}
              />
            </div>
          </DetailCard>

          <div className="gap-6 grid grid-cols-1 sm:grid-cols-2">
            <DetailCard title="Husband" icon={User}>
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex justify-center items-center bg-blue-100 rounded-full w-12 h-12 overflow-hidden font-bold text-blue-600 text-lg">
                    {!marriage.husband?.avatar &&
                      marriage.husband?.firstName?.charAt(0)}
                    {marriage.husband?.avatar && (
                      <Image
                        src={marriage.husband.avatar}
                        height={48}
                        width={48}
                        className="size-12"
                        alt={marriage.husband.firstName}
                      />
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">
                      {marriage.husband?.firstName} {marriage.husband?.lastName}
                    </h4>
                    <p className="text-gray-500 text-xs">Groom</p>
                  </div>
                </div>
                <DetailItem label="Email" value={marriage.husband?.email} />
                <DetailItem
                  label="Phone"
                  value={marriage.husband?.phoneNumber}
                />
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2 w-full"
                  onClick={() =>
                    router.push(`/dashboard/parishioners/${marriage.husbandId}`)
                  }
                >
                  View Profile
                </Button>
              </div>
            </DetailCard>

            <DetailCard title="Wife" icon={User}>
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex justify-center items-center bg-pink-100 rounded-full w-12 h-12 overflow-hidden font-bold text-pink-600 text-lg">
                    {!marriage.wife?.avatar &&
                      marriage.wife?.firstName?.charAt(0)}
                    {marriage.wife?.avatar && (
                      <Image
                        src={marriage.wife.avatar}
                        height={48}
                        width={48}
                        className="size-12"
                        alt={marriage.wife.firstName}
                      />
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">
                      {marriage.wife?.firstName} {marriage.wife?.lastName}
                    </h4>
                    <p className="text-gray-500 text-xs">Bride</p>
                  </div>
                </div>
                <DetailItem label="Email" value={marriage.wife?.email} />
                <DetailItem label="Phone" value={marriage.wife?.phoneNumber} />
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2 w-full"
                  onClick={() =>
                    router.push(`/dashboard/parishioners/${marriage.wifeId}`)
                  }
                >
                  View Profile
                </Button>
              </div>
            </DetailCard>
          </div>
        </div>

        {/* Right Column: Metadata */}
        <div className="space-y-6">
          <DetailCard title="System Information" icon={Info}>
            <div className="space-y-4">
              <DetailItem
                label="Registered By"
                value={
                  marriage.createdBy
                    ? `${marriage.createdBy.firstName} ${marriage.createdBy.lastName}`
                    : "System"
                }
              />
              <DetailItem
                label="Date Created"
                value={new Date(marriage.createdAt).toLocaleDateString()}
              />
              <DetailItem
                label="Last Updated"
                value={new Date(marriage.updatedAt).toLocaleDateString()}
              />
            </div>
          </DetailCard>

          <div className="bg-primary-50 p-6 border border-primary-100 rounded-xl">
            <h4 className="flex items-center gap-2 mb-2 font-bold text-primary-900">
              <Info className="w-4 h-4" />
              Marriage Certificate
            </h4>
            <p className="mb-4 text-primary-700 text-sm">
              Certified record of holy matrimony between{" "}
              {marriage.husband?.firstName} and {marriage.wife?.firstName}.
            </p>
            <Button className="bg-primary-900 hover:bg-primary-800 w-full text-white">
              Download Certificate
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
