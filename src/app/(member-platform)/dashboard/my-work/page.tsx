"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Briefcase, Building2, MapPin, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useParishionerStore } from "@/stores/useParishioner";
import { parishionerService } from "@/services/parishioner.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ParishionerDetailCard } from "@/components/dashboard/ParishionerDetailCard";
import { Label } from "@/components/ui/label";

const workSchema = z.object({
  occupation: z.string().min(1, "Occupation is required"),
  placeOfWork: z.string().optional(),
  workDigitalAddress: z.string().optional(),
});

type WorkFormValues = z.infer<typeof workSchema>;

export default function MyWorkPage() {
  const { parishioner, user, setAll } = useParishionerStore();
  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<WorkFormValues>({
    resolver: zodResolver(workSchema),
  });

  useEffect(() => {
    if (parishioner) {
      reset({
        occupation: parishioner.occupation || "",
        placeOfWork: parishioner.placeOfWork || "",
        workDigitalAddress: parishioner.workDigitalAddress || "",
      });
    }
  }, [parishioner, reset]);

  const updateMutation = useMutation({
    mutationFn: async (data: WorkFormValues) => {
      if (!user?.id) throw new Error("User ID not found");
      return parishionerService.update(user.id, data);
    },
    onSuccess: (updatedData) => {
      setAll(updatedData);
      queryClient.invalidateQueries({ queryKey: ["parishioner", user?.id] });
      toast.success("Work details updated successfully!");
      setIsEditing(false);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to update details");
    },
  });

  const onSubmit = (data: WorkFormValues) => {
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
        title="Work & Profession"
        description="Share your occupational details and workplace information."
        icon={Briefcase}
        iconColor="bg-blue-50 text-blue-600"
        isEditing={isEditing}
        onEditToggle={() => setIsEditing(!isEditing)}
        isPending={updateMutation.isPending}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {isEditing ? (
            <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="occupation">Occupation</Label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input 
                      id="occupation"
                      {...register("occupation")} 
                      className="pl-10 rounded-xl border-gray-200"
                      placeholder="e.g. Teacher, Engineer, Doctor"
                    />
                  </div>
                  {errors.occupation && (
                    <p className="text-red-500 text-xs">{errors.occupation.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="placeOfWork">Place of Work</Label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input 
                      id="placeOfWork"
                      {...register("placeOfWork")} 
                      className="pl-10 rounded-xl border-gray-200"
                      placeholder="e.g. OLA Catholic School"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="workDigitalAddress">Work Digital Address (GPS)</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input 
                      id="workDigitalAddress"
                      {...register("workDigitalAddress")} 
                      className="pl-10 rounded-xl border-gray-200"
                      placeholder="e.g. AK-123-4567"
                    />
                  </div>
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
                <div className="md:col-span-2">
                   {renderField("Occupation", parishioner?.occupation, Briefcase)}
                </div>
                {renderField("Place of Work", parishioner?.placeOfWork, Building2)}
                {renderField("Work Digital Address (GPS)", parishioner?.workDigitalAddress, MapPin)}
              </div>
            </div>
          )}
        </form>
      </ParishionerDetailCard>
    </div>
  );
}
