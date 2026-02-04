/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Heart, User, Phone, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Select from "@/components/ui/Select";
import { useParishionerStore } from "@/stores/useParishioner";
import { parishionerService } from "@/services/parishioner.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ParishionerDetailCard } from "@/components/dashboard/ParishionerDetailCard";
import { MARITAL_STATUS_OBJ } from "@/app/(member-platform)/new-parishioner/form-fields";
import { MaritalStatusSchema } from "@/lib/validations.z";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cleanObject } from "@/utils/cleanObject";

const marriageSchema = z.object({
  maritalStatus: MaritalStatusSchema.optional(),
  spouseIsParishioner: z.boolean().optional(),
  spouseFirstName: z.string().optional(),
  spouseLastName: z.string().optional(),
  spouseOtherNames: z.string().optional(),
  spousePhoneNumber: z.string().optional(),
});

type MarriageFormValues = z.infer<typeof marriageSchema>;

export default function MyMarriagePage() {
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
  } = useForm<MarriageFormValues>({
    resolver: zodResolver(marriageSchema),
  });

  const spouseIsParishioner = watch("spouseIsParishioner");

  useEffect(() => {
    if (parishioner) {
      reset({
        maritalStatus: parishioner.maritalStatus as any,
        spouseIsParishioner:
          parishioner.spouseIsParishioner === "1" ||
          (parishioner.spouseIsParishioner as any) === true,
        spouseFirstName: parishioner.spouseFirstName || "",
        spouseLastName: parishioner.spouseLastName || "",
        spouseOtherNames: parishioner.spouseOtherNames || "",
        spousePhoneNumber: parishioner.spousePhoneNumber || "",
      });
    }
  }, [parishioner, reset]);

  const updateMutation = useMutation({
    mutationFn: async (data: MarriageFormValues) => {
    console.log("Here: I am submitting", user);

      if (!user?.id) throw new Error("User ID not found");
    console.log("Here 2: I am submitting", data);

      // Map back to string for backend if needed, but usually the service handles DTO
      console.log("I am here: ", data);
      // const submitData = {
      //   ...data,
      //   spouseIsParishioner: data.spouseIsParishioner ? "1" : "0",
      // };
      return parishionerService.update(user.id, data as any);
    },
    onSuccess: (updatedData) => {
      setAll(updatedData);
      queryClient.invalidateQueries({ queryKey: ["parishioner", user?.id] });
      toast.success("Marriage details updated successfully!");
      setIsEditing(false);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to update details");
    },
  });

  const onSubmit = (data: MarriageFormValues) => {
    const parsed = cleanObject(data);

    updateMutation.mutate(parsed);
  };

  const renderField = (label: string, value: string | undefined, Icon: any) => (
    <div className="space-y-1.5">
      <p className="font-medium text-gray-400 text-xs uppercase tracking-wider">
        {label}
      </p>
      <div className="flex items-center gap-2 text-gray-900">
        {Icon && <Icon className="w-4 h-4 text-gray-400" />}
        <span className="font-semibold">{value || "Not provided"}</span>
      </div>
    </div>
  );

  console.log("Errors: ", errors);

  return (
    <div className="mx-auto py-8 max-w-4xl">
      <ParishionerDetailCard
        title="Marriage & Spouse"
        description="Manage your marital status and spouse information."
        icon={Heart}
        iconColor="bg-pink-50 text-pink-600"
        isEditing={isEditing}
        onEditToggle={() => setIsEditing(!isEditing)}
        isPending={updateMutation.isPending}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {isEditing ? (
            <div className="space-y-8 slide-in-from-top-4 animate-in duration-500 fade-in">
              <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="maritalStatus">Marital Status</Label>
                  <Select
                    id="maritalStatus"
                    options={MARITAL_STATUS_OBJ}
                    {...register("maritalStatus")}
                  />
                  {errors.maritalStatus && (
                    <p className="text-red-500 text-xs">
                      {errors.maritalStatus.message}
                    </p>
                  )}
                </div>

                <div className="flex items-center space-x-2 pt-8">
                  <Switch
                    id="spouse-is-parishioner"
                    checked={spouseIsParishioner}
                    onCheckedChange={(checked) =>
                      setValue("spouseIsParishioner", checked, {
                        shouldDirty: true,
                      })
                    }
                  />
                  <Label htmlFor="spouse-is-parishioner" className="mb-0">
                    Is spouse a parishioner?
                  </Label>
                </div>
              </div>

              <div className="pt-6 border-gray-100 border-t">
                <h4 className="flex items-center gap-2 mb-4 font-bold text-gray-900 text-sm">
                  <User className="w-4 h-4" /> Spouse Details
                </h4>
                <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="spouseFirstName">First Name</Label>
                    <Input
                      id="spouseFirstName"
                      {...register("spouseFirstName")}
                      className="border-gray-200 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="spouseLastName">Last Name</Label>
                    <Input
                      id="spouseLastName"
                      {...register("spouseLastName")}
                      className="border-gray-200 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="spouseOtherNames">Other Names</Label>
                    <Input
                      id="spouseOtherNames"
                      {...register("spouseOtherNames")}
                      className="border-gray-200 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="spousePhoneNumber">Phone Number</Label>
                    <div className="relative">
                      <Phone className="top-1/2 left-3 absolute w-4 h-4 text-gray-400 -translate-y-1/2" />
                      <Input
                        id="spousePhoneNumber"
                        {...register("spousePhoneNumber")}
                        className="pl-10 border-gray-200 rounded-xl"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-6">
                <Button
                  type="submit"
                  disabled={updateMutation.isPending}
                  className="bg-primary-900 hover:bg-primary-800 shadow-primary-900/20 shadow-xl px-8 py-6 rounded-xl h-auto font-bold text-lg"
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
            <div className="space-y-10 animate-in duration-500 fade-in">
              <div className="gap-y-10 grid grid-cols-1 md:grid-cols-2">
                {renderField(
                  "Marital Status",
                  parishioner?.maritalStatus,
                  Heart,
                )}
                {renderField(
                  "Spouse is Parishioner",
                  parishioner?.spouseIsParishioner === "1" ||
                    (parishioner?.spouseIsParishioner as any) === true
                    ? "YES"
                    : "NO",
                  CheckCircle2,
                )}
              </div>

              <div className="pt-10 border-gray-50 border-t">
                <h4 className="mb-6 font-bold text-gray-400 text-sm uppercase tracking-widest">
                  Spouse Information
                </h4>
                <div className="gap-y-10 grid grid-cols-1 md:grid-cols-2">
                  {renderField(
                    "First Name",
                    parishioner?.spouseFirstName,
                    User,
                  )}
                  {renderField("Last Name", parishioner?.spouseLastName, User)}
                  {renderField(
                    "Other Names",
                    parishioner?.spouseOtherNames,
                    User,
                  )}
                  {renderField(
                    "Phone Number",
                    parishioner?.spousePhoneNumber,
                    Phone,
                  )}
                </div>
              </div>
            </div>
          )}
        </form>
      </ParishionerDetailCard>
    </div>
  );
}
