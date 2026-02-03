"use client";
import React, { useState, useRef, useEffect, FormEvent } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/shadcn-select";
import { ErrorSpan } from "@/components/ui/errors";
import { Spinner } from "@/components/ui/spinner";
import { IconFluentDelete } from "@/components/icons/icon-fluent-delete";
import { financialService } from "@/services/financial.service";
import { parishGroupService } from "@/services/parish-groups.service";
import { GetUserDetails, Parishioner } from "../../../types";
import { FinancialCategory } from "../../../types/finance";

export const PaymentForm = () => {
  const [amount, setAmount] = useState<number>(0);
  const [categoryId, setCategoryId] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  
  // Bulk Entry State
  const [addedIds, setAddedIds] = useState<string[]>([]);
  const [parsedParishionerIds, setParsedParishionerIds] = useState<string[]>([]);
  const [idError, setIdError] = useState("");
  
  const bottomRef = useRef<HTMLDivElement>(null);
  const parishionerIdInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (addedIds.length > 0) {
        bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [addedIds]);

  const { data: categories } = useQuery({
    queryKey: ["financial-categories"],
    queryFn: async () => {
        const res = await financialService.getCategories();
        return res.data;
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      // Create a receipt per parishioner or one receipt with many items?
      // Backend expects one receipt with multiple items.
      const items = parsedParishionerIds.map(id => ({
        parishionerId: id,
        amount: amount, // Assuming same amount for bulk entry (e.g. dues)
      }));

      await financialService.createReceipt({
        categoryId,
        description,
        date,
        items,
      });
    },
    onSuccess: () => {
      toast.success("Payment recorded successfully");
      // Reset form
      setAddedIds([]);
      setParsedParishionerIds([]);
      setAmount(0);
      setDescription("");
      if (parishionerIdInputRef.current) parishionerIdInputRef.current.value = "";
    },
    onError: (error) => {
      toast.error("Failed to record payment");
      console.error(error);
    },
  });

  const handleAddId = () => {
    const id = parishionerIdInputRef.current?.value;
    if (!id) {
      setIdError("Please enter an ID");
      return;
    }
    if (addedIds.includes(id)) {
      setIdError("ID already added");
      return;
    }
    
    setIdError("");
    setAddedIds((prev) => [...prev, id]);
    if (parishionerIdInputRef.current) parishionerIdInputRef.current.value = "";
  };

  const handleDeleteId = (id: string, parishionerId?: string) => {
    setAddedIds((prev) => prev.filter((i) => i !== id));
    if (parishionerId) {
        setParsedParishionerIds(prev => prev.filter(pId => pId !== parishionerId));
    }
  };

  const handleParishionerFound = (parishionerId: string) => {
    setParsedParishionerIds(prev => {
        if (prev.includes(parishionerId)) return prev;
        return [...prev, parishionerId];
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!categoryId || amount <= 0 || parsedParishionerIds.length === 0) {
        toast.error("Please fill all required fields and add at least one parishioner");
        return;
    }
    mutate();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm w-full max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">Record New Payment</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <Label htmlFor="category">Category</Label>
            <Select onValueChange={setCategoryId} value={categoryId}>
              <SelectTrigger>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {categories?.data?.map((cat: { id: string, name: string }) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="amount">Amount (per person)</Label>
            <Input
              id="amount"
              type="number"
              min="0"
              step="0.01"
              value={amount || ""}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                setAmount(isNaN(val) ? 0 : val);
              }}
            />
          </div>
          <div>
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Monthly Dues for October"
            />
          </div>
        </div>

        <div className="border-t pt-6">
          <h3 className="text-lg font-medium mb-4 text-gray-700">Add Payers (Bulk Entry)</h3>
          
          <div className="flex gap-4 items-end mb-2">
            <div className="flex-1">
              <Label htmlFor="parishionerId">Parishioner ID (First 8 chars)</Label>
              <Input 
                ref={parishionerIdInputRef} 
                id="parishionerId" 
                placeholder="e.g. 19e345a" 
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddId();
                    }
                }}
              />
            </div>
            <Button type="button" onClick={handleAddId} className="bg-secondary-900 text-white">
              Add ID
            </Button>
          </div>
          <ErrorSpan message={idError} />

          <div className="mt-4 border rounded-md min-h-[200px] max-h-[400px] overflow-y-auto bg-gray-50 p-4">
             {addedIds.length === 0 && (
                <p className="text-center text-gray-500 mt-10">No parishioners added yet.</p>
             )}
             <div className="grid grid-cols-[50px_1fr_1fr_50px] gap-4 font-semibold text-sm text-gray-600 mb-2 border-b pb-2">
                <span>#</span>
                <span>ID</span>
                <span>Name</span>
                <span></span>
             </div>
             {addedIds.map((id, index) => (
                <AddedParishionerItem 
                    key={id} 
                    id={id} 
                    index={index + 1} 
                    onDelete={handleDeleteId}
                    onFound={handleParishionerFound}
                />
             ))}
             <div ref={bottomRef} />
          </div>
          
          <div className="mt-2 text-right text-sm text-gray-600">
            Total Payers: {parsedParishionerIds.length} | Total Expected: GHS {(parsedParishionerIds.length * amount).toFixed(2)}
          </div>
        </div>

        <div className="mt-8 flex justify-end">
             <Button 
                type="submit" 
                disabled={isPending || parsedParishionerIds.length === 0} 
                className="bg-primary-900 text-white px-8 py-2 font-medium"
            >
                {isPending ? <div className="flex items-center gap-2">Processing <Spinner className="size-4" /></div> : "Save Payments"}
             </Button>
        </div>
      </form>
    </div>
  );
};

const AddedParishionerItem = ({ id, index, onDelete, onFound }: { id: string, index: number, onDelete: (id: string, pId?: string) => void, onFound: (pId: string) => void }) => {
    const { data, isError, isLoading, isSuccess } = useQuery<GetUserDetails<Parishioner>>({
        queryKey: ["parishioner-lookup", id],
        queryFn: async () => {
            const res = await parishGroupService.getUser(id);
            if (!res?.userData?.id) throw new Error("Not found");
            onFound(res.userData.id);
            return res;
        },
        retry: false
    });

    const handleDelete = () => {
        onDelete(id, data?.userData?.id);
    };

    if (isLoading) return <div className="py-2 text-sm text-gray-500">Loading {id}...</div>;
    
    if (isError) return (
        <div className="grid grid-cols-[50px_1fr_1fr_50px] gap-4 py-2 text-sm items-center border-b">
            <span>{index}</span>
            <span className="text-red-500 font-mono">{id}</span>
            <span className="text-red-500">Not Found</span>
            <button onClick={handleDelete} type="button"><IconFluentDelete className="w-5 h-5 text-red-500" /></button>
        </div>
    );

    return (
        <div className="grid grid-cols-[50px_1fr_1fr_50px] gap-4 py-2 text-sm items-center border-b">
            <span>{index}</span>
            <span className="font-mono">{data?.user?.id?.substring(0, 8)}</span>
            <span>{data?.user?.firstName} {data?.user?.lastName}</span>
            <button onClick={handleDelete} type="button"><IconFluentDelete className="w-5 h-5 text-gray-500 hover:text-red-500 transition-colors" /></button>
        </div>
    );
};
