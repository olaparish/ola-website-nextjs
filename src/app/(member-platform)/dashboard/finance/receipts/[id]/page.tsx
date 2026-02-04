/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { financialService } from "@/services/financial.service"; // You might need a getReceiptById method
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import axios from "@/utils/axios";

import { Receipt } from "../../../../../../../types/finance";

const ReceiptDetailsPage = () => {
  const { id } = useParams();
  const router = useRouter();

  const { data: receipt, isLoading } = useQuery<Receipt>({
    queryKey: ["receipt", id],
    queryFn: async () => {
      const res = await axios.get<Receipt>(`/finance/receipts/${id}`);
      return res.data;
    },
  });

  console.log("Receipt: ", receipt);

  if (isLoading)
    return (
      <div className="flex justify-center p-10">
        <Spinner />
      </div>
    );
  if (!receipt) return <div className="p-10">Receipt not found</div>;

  return (
    <div className="space-y-6 mx-auto max-w-4xl">
      <Button variant="ghost" onClick={() => router.back()} className="gap-2">
        <ArrowLeft className="size-4" /> Back to Finance
      </Button>

      <div className="flex justify-between items-start">
        <div>
          <h1 className="font-bold text-gray-900 text-2xl">Receipt Details</h1>
          <p className="text-gray-500">ID: {receipt.id}</p>
        </div>
        <div className="text-right">
          <p className="text-gray-500 text-sm">Date recorded</p>
          <p className="font-medium">{format(new Date(receipt.date), "PPP")}</p>
        </div>
      </div>

      <div className="gap-6 grid grid-cols-1 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Transaction Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-medium text-gray-500 text-sm">Description</p>
              <p className="text-lg">{receipt.description}</p>
            </div>
            <div>
              <p className="font-medium text-gray-500 text-sm">Category</p>
              <span className="inline-flex items-center bg-blue-100 px-2.5 py-0.5 rounded-full font-medium text-blue-800 text-xs">
                {receipt.category?.name}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="font-bold text-green-600 text-3xl">
              GHS {Number(receipt.totalAmount).toFixed(2)}
            </div>
            <p className="mt-1 text-gray-500 text-sm">Total collected</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Contributors ({receipt.items?.length || 0})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 border-b font-medium text-gray-600">
                <tr>
                  <th className="px-4 py-3">Parishioner ID</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {receipt.items?.map((item: any) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-mono">
                      {item.parishioner?.userId}
                    </td>
                    <td className="px-4 py-3">
                      {item.parishioner?.user?.firstName}{" "}
                      {item.parishioner?.user?.lastName}
                    </td>
                    <td className="px-4 py-3 font-medium text-right">
                      GHS {Number(item.amount).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReceiptDetailsPage;
