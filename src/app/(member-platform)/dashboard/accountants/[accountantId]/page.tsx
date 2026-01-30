"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { accountantService } from "@/services/accountant.service";
import { PageHeader } from "@/components/common/PageHeader";
import { DetailCard, DetailItem } from "@/components/common/DetailDisplay";
import { Landmark, Calendar, User, Info, ArrowLeft } from "lucide-react";
import DataFetchSpinner from "@/components/ui/data-fetch-spinner";
import { Button } from "@/components/ui/button";

const Page = () => {
  const { accountantId } = useParams();
  const router = useRouter();

  const {
    data: accountant,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["accountant", accountantId],
    queryFn: () => accountantService.getAccountant(accountantId as string),
  });

  if (isLoading) return <DataFetchSpinner />;
  if (isError || !accountant)
    return (
      <div className="p-8 text-red-500 text-center">
        Accountant record not found or error occurred.
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
          title="Accountant Details"
          subtitle={`Viewing record for ${accountant.user.firstName} ${accountant.user.lastName}`}
          icon={Landmark}
          className="flex-1 mb-0"
        />
      </div>

      <div className="gap-6 grid grid-cols-1 lg:grid-cols-3">
        {/* Left Column: Personal Info */}
        <div className="space-y-6 lg:col-span-2">
          <DetailCard title="Personal Information" icon={User}>
            <div className="flex items-center gap-6 mb-8">
              <div className="flex justify-center items-center bg-primary-100 shadow-sm border-4 border-white rounded-full w-24 h-24 overflow-hidden font-bold text-primary-900 text-3xl">
                {accountant.user.avatar ? (
                  <img
                    src={accountant.user.avatar}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  accountant.user.firstName.charAt(0)
                )}
              </div>
              <div>
                <h2 className="font-bold text-gray-900 text-2xl">
                  {accountant.user.firstName} {accountant.user.lastName}
                </h2>
                <p className="text-gray-500">{accountant.user.role}</p>
              </div>
            </div>

            <div className="gap-x-12 gap-y-6 grid grid-cols-1 sm:grid-cols-2">
              <DetailItem label="Email Address" value={accountant.user.email} />
              <DetailItem
                label="Phone Number"
                value={accountant.user.phoneNumber}
              />
              <DetailItem
                label="Other Names"
                value={accountant.user.otherNames}
              />
            </div>
          </DetailCard>

          <DetailCard title="Account Permissions" icon={Info}>
            <div className="space-y-4">
              <p className="text-gray-600 text-sm">
                This user has administrative access to financial records,
                including receipts, expenditures, and financial reports for the
                parish.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-green-50 px-3 py-1 border border-green-100 rounded-full font-medium text-green-700 text-xs">
                  Financial Reports
                </span>
                <span className="bg-green-50 px-3 py-1 border border-green-100 rounded-full font-medium text-green-700 text-xs">
                  Manage Payments
                </span>
                <span className="bg-green-50 px-3 py-1 border border-green-100 rounded-full font-medium text-green-700 text-xs">
                  Audit Logs
                </span>
              </div>
            </div>
          </DetailCard>
        </div>

        {/* Right Column: Metadata */}
        <div className="space-y-6">
          <DetailCard title="Administrative Metadata" icon={Info}>
            <div className="space-y-4">
              <DetailItem
                label="Accountant ID"
                value={accountant.id.slice(0, 8)}
              />
              <DetailItem
                label="Registered Date"
                value={new Date(accountant.createdAt).toLocaleDateString(
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
                value={new Date(accountant.updatedAt).toLocaleDateString()}
              />
            </div>
          </DetailCard>

          <div className="bg-primary-50 p-6 border border-primary-100 rounded-xl">
            <h4 className="mb-2 font-bold text-primary-900">Management</h4>
            <div className="space-y-3">
              {/* <Button className="hover:bg-primary-100 border-primary-200 w-full text-primary-900">
                Edit Permissions
              </Button> */}
              <Button
                variant="outline"
                className="bg-primary-900 hover:bg-primary-800 w-full text-white"
              >
                View Financial Activity
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
