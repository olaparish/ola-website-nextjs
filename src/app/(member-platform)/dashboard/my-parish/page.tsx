"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Church, MapPin, Users, CheckCircle2, Loader2, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import Select from "@/components/ui/Select";
import { useParishionerStore } from "@/stores/useParishioner";
import { parishionerService } from "@/services/parishioner.service";
import { parishGroupService } from "@/services/parish-groups.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ParishionerDetailCard } from "@/components/dashboard/ParishionerDetailCard";
import { Label } from "@/components/ui/label";
import { ParishGroupResponse } from "../../../../types";

const parishSchema = z.object({
  stationId: z.string().min(1, "Station is required"),
  communityId: z.string().min(1, "Community is required"),
});

type ParishFormValues = z.infer<typeof parishSchema>;

export default function MyParishPage() {
  const { parishioner, user, setAll } = useParishionerStore();
  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();

  const { data: parishGroups } = useQuery<ParishGroupResponse>({
    queryKey: ["parishGroups"],
    queryFn: parishGroupService.getGroups,
  });

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<ParishFormValues>({
    resolver: zodResolver(parishSchema),
  });

  useEffect(() => {
    if (parishioner) {
      reset({
        stationId: parishioner.stationId,
        communityId: parishioner.communityId,
      });
    }
  }, [parishioner, reset]);

  const updateMutation = useMutation({
    mutationFn: async (data: ParishFormValues) => {
      if (!user?.id) throw new Error("User ID not found");
      return parishionerService.update(user.id, data);
    },
    onSuccess: (updatedData) => {
      setAll(updatedData);
      queryClient.invalidateQueries({ queryKey: ["parishioner", user?.id] });
      toast.success("Parish details updated successfully!");
      setIsEditing(false);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to update details");
    },
  });

  const onSubmit = (data: ParishFormValues) => {
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

  const currentStationName = parishGroups?.outstations?.find(s => s.id === parishioner?.stationId)?.name;
  const currentCommunityName = parishGroups?.communities?.find(c => c.id === parishioner?.communityId)?.name;

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-8">
      <ParishionerDetailCard
        title="Parish Membership"
        description="Your station and community affiliations within the OLA Parish."
        icon={Church}
        iconColor="bg-emerald-50 text-emerald-600"
        isEditing={isEditing}
        onEditToggle={() => setIsEditing(!isEditing)}
        isPending={updateMutation.isPending}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {isEditing ? (
            <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="stationId">Outstation</Label>
                  <Select 
                    id="stationId"
                    options={parishGroups?.outstations?.map(s => ({ name: s.name, value: s.id })) || []}
                    {...register("stationId")}
                  />
                  {errors.stationId && (
                    <p className="text-red-500 text-xs">{errors.stationId.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="communityId">Community</Label>
                  <Select 
                    id="communityId"
                    options={parishGroups?.communities?.map(c => ({ name: c.name, value: c.id })) || []}
                    {...register("communityId")}
                  />
                  {errors.communityId && (
                    <p className="text-red-500 text-xs">{errors.communityId.message}</p>
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
                {renderField("Outstation", currentStationName, MapPin)}
                {renderField("Community", currentCommunityName, Users)}
              </div>
            </div>
          )}
        </form>
      </ParishionerDetailCard>

      {/* Societies Display */}
      <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
         <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Registered Societies</h3>
              <p className="text-sm text-gray-500">View societies you are currently affiliated with.</p>
            </div>
         </div>
         
         {(parishioner as any)?.societies?.length > 0 ? (
           <div className="flex flex-wrap gap-2">
              {(parishioner as any).societies.map((society: any) => (
                <div key={society.id} className="px-4 py-2 bg-gray-50 text-gray-700 border border-gray-100 rounded-full font-medium flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  {society.name}
                </div>
              ))}
           </div>
         ) : (
           <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-dashed border-gray-300">
              <Info className="w-5 h-5 text-gray-400" />
              <p className="text-gray-500 text-sm">No registered societies found in your profile.</p>
           </div>
         )}
      </div>
    </div>
  );
}
