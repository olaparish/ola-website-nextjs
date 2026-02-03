"use client";
import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, CheckCircle, XCircle, PenTool, ExternalLink } from 'lucide-react';
import axios from '@/utils/axios';
import { toast } from 'sonner';
import { financialService } from '@/services/financial.service';
import { useAuth } from '@/hooks/useAuth';

import { DebitRequest } from '../../../../../../../types/finance';

const RequestDetailsPage = () => {
    const { id } = useParams();
    const router = useRouter();
    const queryClient = useQueryClient();
    const { user } = useAuth();
    const userRole = user?.role;

    const { data: request, isLoading } = useQuery<DebitRequest>({
        queryKey: ['debit-request', id],
        queryFn: async () => {
             const res = await axios.get<DebitRequest>(`/finance/debit-requests/${id}`);
             return res.data;
        }
    });

    const { mutate: mutateStatus, isPending } = useMutation({
        mutationFn: async ({ action }: { action: string }) => {
            if (action === 'SIGN_CHECK') return financialService.signCheck(id as string);
            if (action === 'DISBURSE') return financialService.markAsDisbursed(id as string);
            if (action === 'APPROVE') return financialService.reviewDebitRequest(id as string, { status: 'APPROVED' });
            if (action === 'REJECT') return financialService.reviewDebitRequest(id as string, { status: 'REJECTED', reason: 'Rejected from details page' });
        },
        onSuccess: () => {
            toast.success("Action completed successfully");
            queryClient.invalidateQueries({ queryKey: ['debit-request', id] });
        },
        onError: () => toast.error("Action failed")
    });

    if (isLoading) return <div className="flex justify-center p-10"><Spinner /></div>;
    if (!request) return <div className="p-10">Request not found</div>;

    const styles: Record<string, string> = {
        PENDING: "bg-yellow-100 text-yellow-800",
        APPROVED: "bg-blue-100 text-blue-800",
        CHECK_SIGNED: "bg-indigo-100 text-indigo-800",
        DISBURSED: "bg-green-100 text-green-800",
        REJECTED: "bg-red-100 text-red-800",
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <Button variant="ghost" onClick={() => router.back()} className="gap-2">
                <ArrowLeft className="size-4" /> Back to Finance
            </Button>

            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Withdrawal Request</h1>
                    <div className="flex items-center gap-2 mt-2">
                        <span className={`px-2.5 py-0.5 rounded-full text-sm font-medium ${styles[request.status]}`}>
                            {request.status.replace("_", " ")}
                        </span>
                        <span className="text-gray-500 text-sm">#{request.id.substring(0, 8)}</span>
                    </div>
                </div>
                
                <div className="flex gap-2">
                     {/* Actions logic reused */}
                    {userRole === "PARISH_PRIEST" && request.status === "PENDING" && (
                        <>
                            <Button onClick={() => mutateStatus({ action: 'APPROVE' })} className="bg-green-600 gap-2" disabled={isPending}>
                                <CheckCircle className="size-4" /> Approve
                            </Button>
                            <Button onClick={() => mutateStatus({ action: 'REJECT' })} variant="destructive" className="gap-2" disabled={isPending}>
                                <XCircle className="size-4" /> Reject
                            </Button>
                        </>
                    )}
                    {userRole === "PARISH_PRIEST" && request.status === "APPROVED" && (
                        <Button onClick={() => mutateStatus({ action: 'SIGN_CHECK' })} className="bg-blue-600 text-white gap-2" disabled={isPending}>
                            <PenTool className="size-4" /> Sign Check
                        </Button>
                    )}
                    {userRole === "ACCOUNTANT" && (request.status === "CHECK_SIGNED" || request.status === "APPROVED") && (
                        <Button onClick={() => mutateStatus({ action: 'DISBURSE' })} className="bg-purple-600 text-white gap-2" disabled={isPending}>
                            <ExternalLink className="size-4" /> Mark Disbursed
                        </Button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Request Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Title</p>
                            <p className="text-lg font-medium">{request.title}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Description</p>
                            <p className="whitespace-pre-wrap">{request.description}</p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-6 pt-4 border-t">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Requested By</p>
                                <div className="flex items-center gap-2 mt-1">
                                    {request.creator?.avatar && <img src={request.creator.avatar} className="w-8 h-8 rounded-full" alt="" />}
                                    <div>
                                        <p className="font-medium">{request.creator?.firstName} {request.creator?.lastName}</p>
                                        <p className="text-xs text-gray-500">{format(new Date(request.createdAt), "PPP p")}</p>
                                    </div>
                                </div>
                            </div>
                            
                            {request.recipient && (
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Paid To</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600">
                                            {request.recipient.firstName[0]}
                                        </div>
                                        <div>
                                            <p className="font-medium">{request.recipient.firstName} {request.recipient.lastName}</p>
                                            <p className="text-xs text-gray-500">Beneficiary</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        
                        {(request.status === 'REJECTED' && request.rejectionReason) && (
                            <div className="bg-red-50 p-4 rounded-md text-red-800">
                                <p className="font-semibold text-sm">Rejection Reason</p>
                                <p>{request.rejectionReason}</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Amount</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-red-600">
                                GHS {Number(request.amount).toFixed(2)}
                            </div>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader>
                            <CardTitle>Approvals</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                             <div className="flex items-start gap-3">
                                <div className={`mt-1 w-2 h-2 rounded-full ${['APPROVED', 'CHECK_SIGNED', 'DISBURSED'].includes(request.status) ? 'bg-green-500' : 'bg-gray-300'}`} />
                                <div>
                                    <p className="font-medium text-sm">Parish Priest Approval</p>
                                    {request.reviewedById && (
                                        <p className="text-xs text-gray-500">
                                            Reviewed by {request.reviewer?.firstName} {request.reviewer?.lastName}
                                        </p>
                                    )}
                                </div>
                             </div>
                             
                             <div className="flex items-start gap-3">
                                <div className={`mt-1 w-2 h-2 rounded-full ${['CHECK_SIGNED', 'DISBURSED'].includes(request.status) ? 'bg-green-500' : 'bg-gray-300'}`} />
                                <div>
                                    <p className="font-medium text-sm">Check Signed</p>
                                    {request.status === 'CHECK_SIGNED' || request.status === 'DISBURSED' ? <p className="text-xs text-green-600">Signed</p> : null}
                                </div>
                             </div>
                             
                             <div className="flex items-start gap-3">
                                <div className={`mt-1 w-2 h-2 rounded-full ${request.status === 'DISBURSED' ? 'bg-green-500' : 'bg-gray-300'}`} />
                                <div>
                                    <p className="font-medium text-sm">Disbursement</p>
                                     {request.disbursedAt && <p className="text-xs text-gray-500">{format(new Date(request.disbursedAt), "PPP")}</p>}
                                </div>
                             </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default RequestDetailsPage;
