/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Home, MapPin, Navigation, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useParishionerStore } from "@/stores/useParishioner";
import { parishionerService } from "@/services/parishioner.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ParishionerDetailCard } from "@/components/dashboard/ParishionerDetailCard";
import { Label } from "@/components/ui/label";

const homeSchema = z.object({
  residentialAddress: z.string().min(1, "Residential address is required"),
  digitalAddress: z.string().optional(),
});

type HomeFormValues = z.infer<typeof homeSchema>;

export default function MyHomePage() {
  const { parishioner, user, setAll } = useParishionerStore();
  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<HomeFormValues>({
    resolver: zodResolver(homeSchema),
  });

  useEffect(() => {
    if (parishioner) {
      reset({
        residentialAddress: parishioner.residentialAddress || "",
        digitalAddress: parishioner.digitalAddress || "",
      });
    }
  }, [parishioner, reset]);

  const updateMutation = useMutation({
    mutationFn: async (data: HomeFormValues) => {
      if (!user?.id) throw new Error("User ID not found");
      return parishionerService.update(user.id, data);
    },
    onSuccess: (updatedData) => {
      setAll(updatedData);
      queryClient.invalidateQueries({ queryKey: ["parishioner", user?.id] });
      toast.success("Home details updated successfully!");
      setIsEditing(false);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to update details");
    },
  });

  const onSubmit = (data: HomeFormValues) => {
    updateMutation.mutate(data);
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

  return (
    <div className="mx-auto py-8 max-w-4xl">
      <ParishionerDetailCard
        title="Home & Address"
        description="Your current residential and digital address information."
        icon={Home}
        iconColor="bg-amber-50 text-amber-600"
        isEditing={isEditing}
        onEditToggle={() => setIsEditing(!isEditing)}
        isPending={updateMutation.isPending}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {isEditing ? (
            <div className="space-y-8 slide-in-from-top-4 animate-in duration-500 fade-in">
              <div className="gap-6 grid grid-cols-1">
                <div className="space-y-2">
                  <Label htmlFor="residentialAddress">
                    Residential Address
                  </Label>
                  <div className="relative">
                    <MapPin className="top-1/2 left-3 absolute w-4 h-4 text-gray-400 -translate-y-1/2" />
                    <Input
                      id="residentialAddress"
                      {...register("residentialAddress")}
                      className="pl-10 border-gray-200 rounded-xl"
                      placeholder="e.g. House No. 12, West Hills"
                    />
                  </div>
                  {errors.residentialAddress && (
                    <p className="text-red-500 text-xs">
                      {errors.residentialAddress.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="digitalAddress">Digital Address (GPS)</Label>
                  <div className="relative">
                    <Navigation className="top-1/2 left-3 absolute w-4 h-4 text-gray-400 -translate-y-1/2" />
                    <Input
                      id="digitalAddress"
                      {...register("digitalAddress")}
                      className="pl-10 border-gray-200 rounded-xl"
                      placeholder="e.g. GA-123-4567"
                    />
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
                  "Residential Address",
                  parishioner?.residentialAddress,
                  MapPin,
                )}
                {renderField(
                  "Digital Address (GPS)",
                  parishioner?.digitalAddress,
                  Navigation,
                )}
              </div>
            </div>
          )}
        </form>
      </ParishionerDetailCard>
    </div>
  );
}
