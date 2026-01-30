"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { catechistService } from "@/services/catechist.service";
import { PageHeader } from "@/components/common/PageHeader";
import { DetailCard, DetailItem } from "@/components/common/DetailDisplay";
import {
  GraduationCap,
  Calendar,
  User,
  Info,
  ArrowLeft,
  MapPin,
} from "lucide-react";
import DataFetchSpinner from "@/components/ui/data-fetch-spinner";
import { Button } from "@/components/ui/button";

const Page = () => {
  const { catechistId } = useParams();
  const router = useRouter();

  const {
    data: catechist,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["catechist", catechistId],
    queryFn: () => catechistService.getCatechist(catechistId as string),
  });

  if (isLoading) return <DataFetchSpinner />;
  if (isError || !catechist)
    return (
      <div className="p-8 text-red-500 text-center">
        Catechist record not found or error occurred.
      </div>
    );

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
          title="Catechist Details"
          subtitle={`Viewing record for ${catechist.user.firstName} ${catechist.user.lastName}`}
          icon={GraduationCap}
          className="flex-1 mb-0"
        />
      </div>

      <div className="gap-6 grid grid-cols-1 lg:grid-cols-3">
        {/* Left Column: Personal and Role Info */}
        <div className="space-y-6 lg:col-span-2">
          <DetailCard title="Personal Information" icon={User}>
            <div className="flex items-center gap-6 mb-8">
              <div className="flex justify-center items-center bg-primary-100 shadow-sm border-4 border-white rounded-full w-24 h-24 overflow-hidden font-bold text-primary-900 text-3xl">
                {catechist.user.avatar ? (
                  <img
                    src={catechist.user.avatar}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  catechist.user.firstName.charAt(0)
                )}
              </div>
              <div>
                <h2 className="font-bold text-gray-900 text-2xl">
                  {catechist.user.firstName} {catechist.user.lastName}
                </h2>
                <p className="text-gray-500">{catechist.user.role}</p>
              </div>
            </div>

            <div className="gap-x-12 gap-y-6 grid grid-cols-1 sm:grid-cols-2">
              <DetailItem label="Email Address" value={catechist.user.email} />
              <DetailItem
                label="Phone Number"
                value={catechist.user.phoneNumber}
              />
              <DetailItem
                label="Other Names"
                value={catechist.user.otherNames}
              />
            </div>
          </DetailCard>

          <DetailCard title="Assignments & Station" icon={MapPin}>
            <div className="space-y-6">
              <div className="gap-x-12 gap-y-6 grid grid-cols-1 sm:grid-cols-2">
                <DetailItem
                  label="Primary Station"
                  value={catechist.groups?.[0]?.name || "None Assigned"}
                  icon={MapPin}
                />
                <DetailItem
                  label="Station Type"
                  value={catechist.groups?.[0]?.type}
                />
              </div>

              {catechist.groups && catechist.groups.length > 0 && (
                <div className="mt-4 pt-4 border-gray-50 border-t">
                  <h4 className="mb-3 font-semibold text-gray-900 text-sm">
                    Associated Groups
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {catechist.groups.map((group) => (
                      <span
                        key={group.id}
                        className="bg-gray-100 px-3 py-1 border border-gray-200 rounded-full font-medium text-gray-700 text-xs"
                      >
                        {group.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </DetailCard>
        </div>

        {/* Right Column: Metadata */}
        <div className="space-y-6">
          <DetailCard title="Account Info" icon={Info}>
            <div className="space-y-4">
              <DetailItem
                label="Catechist ID"
                value={catechist.id.slice(0, 8)}
              />
              <DetailItem
                label="Joined Date"
                value={new Date(catechist.createdAt).toLocaleDateString(
                  undefined,
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  },
                )}
                icon={Calendar}
              />
              <DetailItem
                label="Last Updated"
                value={new Date(catechist.updatedAt).toLocaleDateString()}
              />
            </div>
          </DetailCard>
          {/* 
          <div className="bg-primary-50 p-6 border border-primary-100 rounded-xl">
            <h4 className="mb-2 font-bold text-primary-900">Actions</h4>
            <div className="space-y-3">
              <Button className="bg-primary-900 hover:bg-primary-800 w-full text-white">
                Edit Profile
              </Button>
              <Button variant="outline" className="hover:bg-primary-100 border-primary-200 w-full text-primary-900">
                Contact Catechist
              </Button>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Page;
