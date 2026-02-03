"use client";
import React, { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";
import { financialService } from "@/services/financial.service";
import { parishGroupService } from "@/services/parish-groups.service";
import { GetUserDetails, Parishioner } from "../../../types";

export const WithdrawalRequestForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [recipientIdInput, setRecipientIdInput] = useState("");
  const [recipientData, setRecipientData] = useState<GetUserDetails<Parishioner> | null>(null);
  const [isValidRecipient, setIsValidRecipient] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
        await financialService.createDebitRequest({
            title,
            description,
            amount,
            recipientId: isValidRecipient ? recipientData?.user?.id : undefined
        })
    },
    onSuccess: () => {
        toast.success("Request submitted successfully");
        // Reset form
        setTitle("");
        setDescription("");
        setAmount(0);
        setRecipientIdInput("");
        setRecipientData(null);
        setIsValidRecipient(false);
    },
    onError: () => toast.error("Failed to submit request")
  });

  const handleRecipientSearch = async () => {
    if (!recipientIdInput) return;
    setIsSearching(true);
    try {
        const res = await parishGroupService.getUser(recipientIdInput);
        if (res?.userData) {
            setRecipientData(res);
            setIsValidRecipient(true);
            toast.success("Recipient found");
        }
    } catch (e) {
        setIsValidRecipient(false);
        setRecipientData(null);
        toast.error("User not found");
    } finally {
        setIsSearching(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || amount <= 0) {
        toast.error("Please fill all required fields");
        return;
    }
    mutate();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm w-full max-w-2xl mx-auto">
        <h2 className="text-xl font-semibold mb-6 text-gray-800">New Withdrawal Request</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <Label htmlFor="title">Title / Purpose</Label>
                <Input 
                    id="title" 
                    value={title} 
                    onChange={e => setTitle(e.target.value)} 
                    placeholder="e.g. Electricity Bill Payment"
                />
            </div>
            
            <div>
                <Label htmlFor="amount">Amount (GHS)</Label>
                <Input 
                    id="amount" 
                    type="number" 
                    step="0.01" 
                    value={amount || ""} 
                    onChange={e => {
                        const val = parseFloat(e.target.value);
                        setAmount(isNaN(val) ? 0 : val);
                    }} 
                />
            </div>

            <div>
                <Label htmlFor="recipient">Recipient ID (Optional - if paying a parishioner)</Label>
                <div className="flex gap-2">
                    <Input 
                        id="recipient" 
                        value={recipientIdInput} 
                        onChange={e => {
                            setRecipientIdInput(e.target.value);
                            setIsValidRecipient(false);
                        }} 
                        placeholder="Enter user ID"
                    />
                    <Button type="button" onClick={handleRecipientSearch} disabled={isSearching} className="bg-secondary-900 text-white">
                        {isSearching ? <Spinner className="w-4 h-4" /> : "Verify"}
                    </Button>
                </div>
                {isValidRecipient && recipientData && recipientData.user && (
                    <p className="text-sm text-green-600 mt-1">
                        Paying to: {recipientData.user.firstName} {recipientData.user.lastName}
                    </p>
                )}
            </div>

            <div>
                <Label htmlFor="desc">Detailed Description</Label>
                <Textarea 
                    id="desc" 
                    value={description} 
                    onChange={e => setDescription(e.target.value)} 
                    placeholder="Provide detailed breakdown or reason..."
                    className="h-32"
                />
            </div>

            <div className="pt-4 flex justify-end">
                <Button 
                    type="submit" 
                    disabled={isPending} 
                    className="bg-primary-900 text-white px-8 font-medium"
                >
                    {isPending ? "Submitting..." : "Submit Request"}
                </Button>
            </div>
        </form>
    </div>
  );
};
