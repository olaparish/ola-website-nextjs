"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { parishGroupService } from "@/services/parish-groups.service";
import { PageHeader } from "@/components/common/PageHeader";
import { DetailCard, DetailItem } from "@/components/common/DetailDisplay";
import { MapPin, Calendar, Info, ArrowLeft, Mail, Phone, Users, Image as ImageIcon } from "lucide-react";
import DataFetchSpinner from "@/components/ui/data-fetch-spinner";
import { Button } from "@/components/ui/button";

const Page = () => {
  const { slug } = useParams();
  const router = useRouter();

  const { data: outstation, isLoading, isError } = useQuery({
    queryKey: ["outstation", slug],
    queryFn: () => parishGroupService.getGroupBySlug(slug as string),
  });

  if (isLoading) return <DataFetchSpinner />;
  if (isError || !outstation) return <div className="p-8 text-center text-red-500">Outstation not found or error occurred.</div>;

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
          title={outstation.name}
          subtitle="Parish Outstation Details"
          icon={MapPin}
          className="mb-0 flex-1"
        />
      </div>

      {/* Main Info Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3 h-64 md:h-auto relative bg-gray-200">
            {outstation.heroImage ? (
              <img src={outstation.heroImage} alt={outstation.name} className="w-full h-full object-cover" />
            ) : (
              <img src="/images/placeholders/outstation.png" alt={outstation.name} className="w-full h-full object-cover" />
            )}
          </div>
          <div className="p-8 md:w-2/3">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">{outstation.name}</h2>
                <p className="text-primary-600 font-medium">Outstation</p>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-bold border border-green-200">
                Active
              </span>
            </div>
            
            <p className="text-gray-600 mb-8 max-w-2xl leading-relaxed">
              {outstation.writeup || "This outstation is a vital part of our parish community, serving local members with regular services and community support."}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary-100 rounded-lg text-primary-900">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Email</p>
                  <p className="text-sm font-semibold text-gray-900">{outstation.email || "N/A"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary-100 rounded-lg text-primary-900">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Phone</p>
                  <p className="text-sm font-semibold text-gray-900">{outstation.phone || "N/A"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <DetailCard title="Location Details" icon={MapPin}>
            <div className="space-y-4">
              <DetailItem label="Full Address" value={outstation.address} icon={MapPin} />
              <div className="aspect-video bg-gray-100 rounded-lg border border-gray-200 overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  scrolling="no"
                  marginHeight={0}
                  marginWidth={0}
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(outstation.address)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                />
              </div>
            </div>
          </DetailCard>
        </div>

        <div className="space-y-6">
          <DetailCard title="Station Info" icon={Info}>
            <div className="space-y-4">
              <DetailItem label="Station ID" value={outstation.id.slice(0, 8)} />
              <DetailItem label="Date Established" value={outstation.dateFounded ? new Date(outstation.dateFounded).toLocaleDateString() : "N/A"} icon={Calendar} />
              <DetailItem 
                label="Members Count" 
                value="View List" 
                icon={Users}
                className="cursor-pointer hover:text-primary-600 transition-colors"
                // This would normally link to a filtered parishioners list
              />
            </div>
          </DetailCard>

          <div className="bg-primary-900 rounded-xl p-6 text-white text-center shadow-lg shadow-primary-900/20">
            <h4 className="font-bold text-xl mb-2">Member Directory</h4>
            <p className="text-primary-100/80 text-sm mb-6">
              Access the complete list of parishioners registered at this outstation.
            </p>
            <Button 
              className="w-full bg-white text-primary-900 hover:bg-primary-50 font-bold"
              onClick={() => router.push(`/dashboard/outstations/${slug}/members`)}
            >
              View Members
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
