/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { parishionerService } from "@/services/parishioner.service";
import {
  DetailedParishionerUser,
  FinancialReport,
} from "@/../types/parishioner";
import { ParishGroup } from "@/../types/parish-groups.types";
import { Spinner } from "@/components/ui/spinner";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

// --- Components ---

const Section = ({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-white shadow-sm mb-4 border rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center bg-gray-50 hover:bg-gray-100 p-4 w-full text-left transition-colors"
      >
        <h2 className="font-semibold text-gray-800 text-lg">{title}</h2>
        {isOpen ? (
          <ChevronUp className="w-5 h-5" />
        ) : (
          <ChevronDown className="w-5 h-5" />
        )}
      </button>
      {isOpen && <div className="p-4 border-t">{children}</div>}
    </div>
  );
};

const ProfileView = ({ data }: { data: DetailedParishionerUser }) => {
  const p = data.userData;
  return (
    <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
      <div>
        <h3 className="mb-2 font-medium text-gray-500">Personal Information</h3>
        <p>
          <span className="font-semibold">Name:</span> {data.userData.title}{" "}
          {data.user.firstName} {data.user.otherNames} {data.user.lastName}
        </p>
        <p>
          <span className="font-semibold">Email:</span>{" "}
          {data.user.email || "N/A"}
        </p>
        <p>
          <span className="font-semibold">Phone:</span> {data.user.phoneNumber}
        </p>
        <p>
          <span className="font-semibold">Date of Birth:</span>{" "}
          {p.dateOfBirth ? new Date(p.dateOfBirth).toLocaleDateString() : "N/A"}
        </p>
        {/* Gender not available in type <p><span className="font-semibold">Gender:</span> {p.gender || 'N/A'}</p> */}
        <p>
          <span className="font-semibold">Marital Status:</span>{" "}
          {p.maritalStatus}
        </p>
        <p>
          <span className="font-semibold">Occupation:</span> {p.occupation}
        </p>
      </div>
      <div>
        <h3 className="mb-2 font-medium text-gray-500">Address</h3>
        <p>
          <span className="font-semibold">Residential:</span>{" "}
          {p.residentialAddress}
        </p>
        <p>
          <span className="font-semibold">Digital:</span>{" "}
          {p.digitalAddress || "N/A"}
        </p>

        <h3 className="mt-4 mb-2 font-medium text-gray-500">
          Emergency Contact
        </h3>
        <p>
          <span className="font-semibold">Name:</span> {p.emergencyContactName}
        </p>
        <p>
          <span className="font-semibold">Contact:</span> {p.emergencyContact}
        </p>
      </div>
    </div>
  );
};

const SacramentsView = ({ data }: { data: DetailedParishionerUser }) => {
  const p = data.userData;
  return (
    <div className="gap-4 grid grid-cols-1 md:grid-cols-3">
      <div className="bg-blue-50 p-4 border rounded">
        <h3 className="mb-2 font-bold text-blue-800">Baptism</h3>
        <p>{p.isBaptised ? "Baptised" : "Not Baptised"}</p>
        {p.baptismDate && (
          <p className="text-sm">
            Date: {new Date(p.baptismDate).toLocaleDateString()}
          </p>
        )}
        {/* Add more baptism details if available in DetailedParishioner */}
      </div>
      <div className="bg-indigo-50 p-4 border rounded">
        <h3 className="mb-2 font-bold text-indigo-800">Confirmation</h3>
        <p>{p.isConfirmed ? "Confirmed" : "Not Confirmed"}</p>
        {p.confirmationDate && (
          <p className="text-sm">
            Date: {new Date(p.confirmationDate).toLocaleDateString()}
          </p>
        )}
      </div>
      <div className="bg-purple-50 p-4 border rounded">
        <h3 className="mb-2 font-bold text-purple-800">Marriage</h3>
        <p>{p.maritalStatus === "MARRIED" ? "Married" : p.maritalStatus}</p>
      </div>
    </div>
  );
};

const GroupsView = ({ data }: { data: DetailedParishionerUser }) => {
  const groups = data.userData.groups || [];
  if (groups.length === 0)
    return <p className="text-gray-500">No groups found.</p>;

  return (
    <ul className="list-disc list-inside">
      {groups.map((g: ParishGroup) => (
        <li key={g.id}>{g.name}</li>
      ))}
    </ul>
  );
};

const FinancialView = ({ userId }: { userId: string }) => {
  const [type, setType] = useState<"receipts" | "expenditures">("receipts");
  const [report, setReport] = useState<FinancialReport | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    parishionerService
      .getFinancialReport(userId, type)
      .then(setReport)
      .catch((err) => console.error("Failed to load financial report", err))
      .finally(() => setLoading(false));
  }, [userId, type]);

  if (loading)
    return (
      <div className="flex items-center gap-2">
        <Spinner /> Loading Financial Data...
      </div>
    );
  if (!report)
    return <p className="text-red-500">Failed to load financial data.</p>;

  return (
    <div>
      <div className="flex mb-6 border-b">
        <button
          className={`px-4 py-2 font-medium ${
            type === "receipts"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setType("receipts")}
        >
          Contributions
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            type === "expenditures"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setType("expenditures")}
        >
          Support
        </button>
      </div>

      <div className="gap-4 grid grid-cols-1 md:grid-cols-2 mb-6">
        <div className="bg-green-50 p-4 border border-green-100 rounded text-green-800">
          <h4 className="font-semibold text-sm uppercase">
            Total Contributions
          </h4>
          <p className="font-bold text-2xl">
            GHS {report.summary.totalReceipts.toFixed(2)}
          </p>
        </div>
        <div className="bg-red-50 p-4 border border-red-100 rounded text-red-800">
          <h4 className="font-semibold text-sm uppercase">Total Received</h4>
          <p className="font-bold text-2xl">
            GHS {report.summary.totalExpenditures.toFixed(2)}
          </p>
        </div>
      </div>

      <h4 className="mb-2 font-semibold">
        {type === "receipts" ? "All Contributions" : "All Support"}
      </h4>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">
                {type === "receipts" ? "Description" : "Title"}
              </th>
              {type === "expenditures" && <th className="px-4 py-2">Status</th>}
              <th className="px-4 py-2 text-right">Amount (GHS)</th>
            </tr>
          </thead>
          <tbody>
            {report.data.docs.map((item: any) => (
              <tr key={item.id} className="border-b">
                <td className="px-4 py-2">
                  {new Date(item.date || item.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">
                  {type === "receipts" ? item.description : item.title}
                </td>
                {type === "expenditures" && (
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.status === "DISBURSED"
                          ? "bg-green-100 text-green-800"
                          : item.status === "REJECTED"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                )}
                <td className="px-4 py-2 text-right">
                  {item.totalAmount || item.amount || 0}
                </td>
              </tr>
            ))}
            {report.data.docs.length === 0 && (
              <tr>
                <td
                  colSpan={type === "expenditures" ? 4 : 3}
                  className="px-4 py-8 text-gray-500 text-center"
                >
                  No {type} found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// --- Main Page ---

export default function ParishionerDetailsPage() {
  const params = useParams(); // params is a promise in newer Next.js but generic here? Wrapper might handle it.
  // In Next.js 15 params is async, in 14 it's not. Assuming 14 or compliant usage.
  // However, useParams() hook from next/navigation is safe.
  const parishionerId = params?.parishionerId as string;

  // const [data, setData] = useState<DetailedParishionerUser | null>(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState("");
  const { data, isLoading, isError, error } = useQuery<DetailedParishionerUser>(
    {
      queryKey: ["parishioner", "long", parishionerId],
      queryFn: () => parishionerService.getParishionerDetails(parishionerId),
    },
  );

  console.log("Data: ", data);

  // useEffect(() => {
  //   if (!parishionerId) return;

  //   parishionerService
  //     .getParishionerDetails(parishionerId)
  //     .then(setData)
  //     .catch((err) => {
  //       console.error(err);
  //       setError("Failed to load parishioner details. Please try again.");
  //     })
  //     .finally(() => setLoading(false));
  // }, [parishionerId]);

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[50vh]">
        <Spinner />
        <p className="mt-4 text-gray-500">Loading parishioner details...</p>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[50vh] text-red-500">
        <p>{error?.message || "Parishioner not found."}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 mx-auto p-6 max-w-5xl">
      <div className="flex items-center gap-4 mb-8">
        {/* Avatar or Placeholder */}
        <div className="flex justify-center items-center bg-gray-200 rounded-full w-16 h-16 font-bold text-gray-500 text-xl">
          {data.user.firstName.charAt(0)}
          {data.user.lastName.charAt(0)}
        </div>
        <div>
          <h1 className="font-bold text-gray-900 text-3xl">
            {data.userData.title} {data.user.firstName} {data.user.lastName}
          </h1>
          <p className="text-gray-500">
            {data.userData.occupation} • {data.userData.maritalStatus}
          </p>
        </div>
      </div>

      <Section title="Profile Information" defaultOpen={true}>
        <ProfileView data={data} />
      </Section>

      <Section title="Sacramental Details" defaultOpen={true}>
        <SacramentsView data={data} />
      </Section>

      <Section title="Groups & Societies">
        <GroupsView data={data} />
      </Section>

      <Section title="Financial Data">
        <FinancialView userId={data.user.id} />
      </Section>
    </div>
  );
}
