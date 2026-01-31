"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FileText, User, Phone, CheckCircle2, Loader2, HeartPulse } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useParishionerStore } from "@/stores/useParishioner";
import { parishionerService } from "@/services/parishioner.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ParishionerDetailCard } from "@/components/dashboard/ParishionerDetailCard";
import { Label } from "@/components/ui/label";

const otherSchema = z.object({
  emergencyContactName: z.string().min(1, "Emergency contact name is required"),
  emergencyContact: z.string().min(1, "Emergency contact phone is required"),
});

type OtherFormValues = z.infer<typeof otherSchema>;

export default function AdditionalInfoPage() {
  const { parishioner, user, setAll } = useParishionerStore();
  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<OtherFormValues>({
    resolver: zodResolver(otherSchema),
  });

  useEffect(() => {
    if (parishioner) {
      reset({
        emergencyContactName: parishioner.emergencyContactName || "",
        emergencyContact: parishioner.emergencyContact || "",
      });
    }
  }, [parishioner, reset]);

  const updateMutation = useMutation({
    mutationFn: async (data: OtherFormValues) => {
      if (!user?.id) throw new Error("User ID not found");
      return parishionerService.update(user.id, data);
    },
    onSuccess: (updatedData) => {
      setAll(updatedData);
      queryClient.invalidateQueries({ queryKey: ["parishioner", user?.id] });
      toast.success("Additional details updated successfully!");
      setIsEditing(false);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to update details");
    },
  });

  const onSubmit = (data: OtherFormValues) => {
    updateMutation.mutate(data);
  };

  const renderField = (label: string, value: string | undefined, Icon: any) => (
    <div className="space-y-1.5">
      <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">{label}</p>
      <div className="flex items-center gap-2 text-gray-900">
        {Icon && <Icon className="w-4 h-4 text-gray-400" />}
        <span className="font-semibold">{value || "Not provided"}</span>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto py-8">
      <ParishionerDetailCard
        title="Other Information"
        description="Important emergency contacts and other relevant details."
        icon={FileText}
        iconColor="bg-gray-100 text-gray-600"
        isEditing={isEditing}
        onEditToggle={() => setIsEditing(!isEditing)}
        isPending={updateMutation.isPending}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {isEditing ? (
            <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-500">
               <div className="bg-red-50/50 p-4 rounded-xl border border-red-100 flex items-start gap-3 mb-4">
                  <HeartPulse className="w-5 h-5 text-red-500 mt-0.5" />
                  <p className="text-sm text-red-700">Please provide accurate emergency contact details to ensure the parish can reach your family if necessary.</p>
               </div>
               
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="emergencyContactName">Emergency Contact Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input 
                      id="emergencyContactName"
                      {...register("emergencyContactName")} 
                      className="pl-10 rounded-xl border-gray-200"
                      placeholder="e.g. Jane Doe"
                    />
                  </div>
                  {errors.emergencyContactName && (
                    <p className="text-red-500 text-xs">{errors.emergencyContactName.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emergencyContact">Emergency Contact Phone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input 
                      id="emergencyContact"
                      {...register("emergencyContact")} 
                      className="pl-10 rounded-xl border-gray-200"
                      placeholder="e.g. +233 24 000 0000"
                    />
                  </div>
                  {errors.emergencyContact && (
                    <p className="text-red-500 text-xs">{errors.emergencyContact.message}</p>
                  )}
                </div>
              </div>

              <div className="flex justify-end pt-6">
                <Button 
                  type="submit" 
                  disabled={updateMutation.isPending}
                  className="bg-primary-900 hover:bg-primary-800 rounded-xl px-8 py-6 h-auto font-bold text-lg shadow-xl shadow-primary-900/20"
                >
                  {updateMutation.isPending ? (
                    <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                  ) : (
                    <CheckCircle2 className="mr-2 w-5 h-5" />
                  )}
                  Save Changes
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-10 animate-in fade-in duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10">
                {renderField("Emergency Contact Name", parishioner?.emergencyContactName, User)}
                {renderField("Emergency Contact Phone", parishioner?.emergencyContact, Phone)}
              </div>
            </div>
          )}
        </form>
      </ParishionerDetailCard>
    </div>
  );
}
