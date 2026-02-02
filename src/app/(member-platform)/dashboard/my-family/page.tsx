"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Users, User, CheckCircle2, Loader2, Heart, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useParishionerStore } from "@/stores/useParishioner";
import { parishionerService } from "@/services/parishioner.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ParishionerDetailCard } from "@/components/dashboard/ParishionerDetailCard";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const familySchema = z.object({
  fatherName: z.string().optional(),
  fatherIsAlive: z.boolean().optional(),
  fatherIsCatholic: z.boolean().optional(),
  motherName: z.string().optional(),
  motherIsAlive: z.boolean().optional(),
  motherIsCatholic: z.boolean().optional(),
});

type FamilyFormValues = z.infer<typeof familySchema>;

export default function MyFamilyPage() {
  const { parishioner, user, setAll } = useParishionerStore();
  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FamilyFormValues>({
    resolver: zodResolver(familySchema),
  });

  const fatherIsAlive = watch("fatherIsAlive");
  const fatherIsCatholic = watch("fatherIsCatholic");
  const motherIsAlive = watch("motherIsAlive");
  const motherIsCatholic = watch("motherIsCatholic");

  useEffect(() => {
    if (parishioner) {
      reset({
        fatherName: parishioner.fatherName || "",
        fatherIsAlive: !!parishioner.fatherIsAlive,
        fatherIsCatholic: !!parishioner.fatherIsCatholic,
        motherName: parishioner.motherName || "",
        motherIsAlive: !!parishioner.motherIsAlive,
        motherIsCatholic: !!parishioner.motherIsCatholic,
      });
    }
  }, [parishioner, reset]);

  const updateMutation = useMutation({
    mutationFn: async (data: FamilyFormValues) => {
      if (!user?.id) throw new Error("User ID not found");
      return parishionerService.update(user.id, data);
    },
    onSuccess: (updatedData) => {
      setAll(updatedData);
      queryClient.invalidateQueries({ queryKey: ["parishioner", user?.id] });
      toast.success("Family details updated successfully!");
      setIsEditing(false);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to update details");
    },
  });

  const onSubmit = (data: FamilyFormValues) => {
    updateMutation.mutate(data);
  };

  const renderField = (label: string, value: string | boolean | undefined, Icon: any) => {
    let displayValue = "";
    if (typeof value === "boolean") {
      displayValue = value ? "YES" : "NO";
    } else {
      displayValue = value || "Not provided";
    }

    return (
      <div className="space-y-1.5">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">{label}</p>
        <div className="flex items-center gap-2 text-gray-900">
          {Icon && <Icon className="w-4 h-4 text-gray-400" />}
          <span className="font-semibold">{displayValue}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <ParishionerDetailCard
        title="Family & Parents"
        description="Information about your parents and their religious affiliations."
        icon={Users}
        iconColor="bg-purple-50 text-purple-600"
        isEditing={isEditing}
        onEditToggle={() => setIsEditing(!isEditing)}
        isPending={updateMutation.isPending}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
          {isEditing ? (
            <div className="space-y-12 animate-in fade-in slide-in-from-top-4 duration-500">
              {/* Father Details */}
              <div className="space-y-6">
                <h4 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                   <User className="w-5 h-5 text-blue-500" /> Father&apos;s Details
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="fatherName">Father&apos;s Full Name</Label>
                    <Input id="fatherName" {...register("fatherName")} className="rounded-xl border-gray-200" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="father-is-alive" 
                      checked={fatherIsAlive}
                      onCheckedChange={(v) => setValue("fatherIsAlive", v)}
                    />
                    <Label htmlFor="father-is-alive" className="mb-0">Is Father Alive?</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="father-is-catholic" 
                      checked={fatherIsCatholic}
                      onCheckedChange={(v) => setValue("fatherIsCatholic", v)}
                    />
                    <Label htmlFor="father-is-catholic" className="mb-0">Is Father Catholic?</Label>
                  </div>
                </div>
              </div>

              {/* Mother Details */}
              <div className="space-y-6 pt-12 border-t border-gray-50">
                <h4 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                   <User className="w-5 h-5 text-pink-500" /> Mother&apos;s Details
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="motherName">Mother&apos;s Full Name</Label>
                    <Input id="motherName" {...register("motherName")} className="rounded-xl border-gray-200" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="mother-is-alive" 
                      checked={motherIsAlive}
                      onCheckedChange={(v) => setValue("motherIsAlive", v)}
                    />
                    <Label htmlFor="mother-is-alive" className="mb-0">Is Mother Alive?</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="mother-is-catholic" 
                      checked={motherIsCatholic}
                      onCheckedChange={(v) => setValue("motherIsCatholic", v)}
                    />
                    <Label htmlFor="mother-is-catholic" className="mb-0">Is Mother Catholic?</Label>
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
            <div className="space-y-16 animate-in fade-in duration-500">
               {/* View Father */}
              <div className="space-y-8">
                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Father&apos;s Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10">
                   <div className="md:col-span-2">
                      {renderField("Full Name", parishioner?.fatherName, User)}
                   </div>
                   {renderField("Is Alive?", parishioner?.fatherIsAlive, Heart)}
                   {renderField("Is Catholic?", parishioner?.fatherIsCatholic, ShieldCheck)}
                </div>
              </div>

              {/* View Mother */}
              <div className="space-y-8 pt-10 border-t border-gray-50">
                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Mother&apos;s Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10">
                   <div className="md:col-span-2">
                      {renderField("Full Name", parishioner?.motherName, User)}
                   </div>
                   {renderField("Is Alive?", parishioner?.motherIsAlive, Heart)}
                   {renderField("Is Catholic?", parishioner?.motherIsCatholic, ShieldCheck)}
                </div>
              </div>
            </div>
          )}
        </form>
      </ParishionerDetailCard>
    </div>
  );
}
