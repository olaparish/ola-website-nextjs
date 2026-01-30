"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { parishGroupService } from "@/services/parish-groups.service";
import { PageHeader } from "@/components/common/PageHeader";
import { DetailCard, DetailItem } from "@/components/common/DetailDisplay";
import {
  Users,
  Calendar,
  Info,
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Globe,
  Facebook,
  Image as ImageIcon,
} from "lucide-react";
import DataFetchSpinner from "@/components/ui/data-fetch-spinner";
import { Button } from "@/components/ui/button";

const Page = () => {
  const { slug } = useParams();
  const router = useRouter();

  const {
    data: group,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["group", slug],
    queryFn: () => parishGroupService.getGroupBySlug(slug as string),
  });

  console.log("Data: ", group);

  if (isLoading) return <DataFetchSpinner />;
  if (isError || !group)
    return (
      <div className="p-8 text-red-500 text-center">
        Group not found or error occurred.
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
          title={group.name}
          subtitle={`Details for ${group.type.toLowerCase()}`}
          icon={Users}
          className="flex-1 mb-0"
        />
      </div>

      {/* Hero Image / Writeup Section */}
      <div className="bg-white shadow-sm border border-gray-100 rounded-xl overflow-hidden">
        <div className="relative bg-gray-200 h-64">
          {group.heroImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={group.heroImage}
              alt={group.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex justify-center items-center w-full h-full text-gray-400">
              <ImageIcon className="w-12 h-12" />
            </div>
          )}
          <div className="bottom-0 absolute inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-6">
            <h2 className="font-bold text-white text-3xl">{group.name}</h2>
            <p className="text-white/80">{group.type}</p>
          </div>
        </div>
        <div className="p-8">
          <h3 className="mb-4 font-bold text-gray-900 text-xl">
            About the Group
          </h3>
          <div className="max-w-none text-gray-600 prose">
            {group.writeup || "No description available for this group."}
          </div>
        </div>
      </div>

      <div className="gap-6 grid grid-cols-1 lg:grid-cols-3">
        {/* Left Column: Contact and Info */}
        <div className="space-y-6 lg:col-span-2">
          <DetailCard title="Contact Information" icon={Info}>
            <div className="gap-x-12 gap-y-6 grid grid-cols-1 sm:grid-cols-2">
              <DetailItem label="Email" value={group.email} icon={Mail} />
              <DetailItem label="Phone" value={group.phone} icon={Phone} />
              <DetailItem
                label="Address"
                value={group.address}
                icon={MapPin}
                className="sm:col-span-2"
              />
            </div>
          </DetailCard>

          <DetailCard title="Online Presence" icon={Globe}>
            <div className="gap-x-12 gap-y-6 grid grid-cols-1 sm:grid-cols-2">
              <DetailItem label="Website" value={group.website} icon={Globe} />
              <DetailItem
                label="Facebook"
                value={group.facebook}
                icon={Facebook}
              />
            </div>
          </DetailCard>
        </div>

        {/* Right Column: Metadata */}
        <div className="space-y-6">
          <DetailCard title="Group Metadata" icon={Info}>
            <div className="space-y-4">
              <DetailItem label="Group ID" value={group.id.slice(0, 8)} />
              <DetailItem
                label="Date Founded"
                value={
                  group.dateFounded
                    ? new Date(group.dateFounded).toLocaleDateString(
                        undefined,
                        {
                          year: "numeric",
                          month: "long",
                        },
                      )
                    : "N/A"
                }
                icon={Calendar}
              />
              <DetailItem
                label="Registered Date"
                value={new Date(group.createdAt).toLocaleDateString()}
              />
            </div>
          </DetailCard>

          <div className="bg-primary-50 p-6 border border-primary-100 rounded-xl">
            <h4 className="mb-2 font-bold text-primary-900">Management</h4>
            <div className="space-y-3">
              {/* <Button variant="outline" className="hover:bg-primary-100 border-primary-200 w-full text-primary-900.">
                Edit Group Details
              </Button> */}
              <Button
                className="bg-primary-900 hover:bg-primary-800 w-full text-white"
                onClick={() => router.push(`/dashboard/groups/${slug}/members`)}
              >
                Manage Members
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
