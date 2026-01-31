/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, ScrollText, MapPin, Building, Church } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { priestService } from "@/services/priest.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { parishionerService } from "@/services/parishioner.service";
import { useSession } from "next-auth/react";
import { Roles } from "../../../types/users";
import { parishPriestService } from "@/services/parish-priest.service";

const priestSchema = z.object({
  bio: z.string().optional(),
  title: z.string().optional(),
  designation: z.string().optional(),
  parish: z.string().optional(),
  diocese: z.string().optional(),
});

type PriestFormValues = z.infer<typeof priestSchema>;

export const PriestSettings = () => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const { data: userDetails, isLoading } = useQuery({
    queryKey: ["current-user-full", session?.user?.role, session?.user?.id],
    queryFn: async () => {
      if (session?.user?.role === Roles.PARISH_PRIEST) {
        return parishPriestService.getMe();
      }
      return parishionerService.getParishioner();
    },
    enabled: !!session?.user?.id,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<PriestFormValues>({
    resolver: zodResolver(priestSchema),
  });

  useEffect(() => {
    if (userDetails) {
      let data: any = {};
      
      if (session?.user?.role === Roles.PARISH_PRIEST) {
         // PARISH_PRIEST returns { priest: ..., parishPriest: ..., user: ... }
         data = (userDetails as any).priest || {};
      } else {
         // PRIEST returns { userData: ... }
         data = (userDetails as any).userData || {};
      }

      reset({
        bio: data.bio || "",
        title: data.title || "",
        designation: data.designation || "",
        parish: data.parish || "",
        diocese: data.diocese || "",
      });
    }
  }, [userDetails, reset, session?.user?.role]);

  const updatePriestMutation = useMutation({
    mutationFn: async (data: PriestFormValues) => {
      let priestId = "";
      
      if (session?.user?.role === Roles.PARISH_PRIEST) {
        priestId = (userDetails as any)?.priest?.id;
      } else {
        priestId = (userDetails as any)?.userData?.id;
      }

      if (!priestId) throw new Error("Priest ID not found");
      return priestService.updatePriest(priestId, data);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["current-user-full"] });
      toast.success("Priest details updated successfully!");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to update priest details",
      );
    },
  });

  const onSubmit = (data: PriestFormValues) => {
    updatePriestMutation.mutate(data);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48">
        <Loader2 className="w-8 h-8 text-primary-900 animate-spin" />
      </div>
    );
  }

  return (
    <div className="slide-in-from-bottom-2 bg-white shadow-sm border border-gray-100 rounded-xl overflow-hidden animate-in duration-300 fade-in">
      <div className="bg-gray-50/50 p-6 border-gray-100 border-b">
        <h3 className="font-bold text-gray-900">Priest Information</h3>
        <p className="mt-1 text-gray-500 text-xs">
          Update your ministry details and biography.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6">
        <div className="gap-6 grid grid-cols-1 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label className="font-medium text-gray-700 text-sm">Title</label>
            <div className="relative">
              <ScrollText className="top-1/2 left-3 absolute w-4 h-4 text-gray-400 -translate-y-1/2" />
              <Input
                {...register("title")}
                placeholder="e.g. Rev. Fr."
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="font-medium text-gray-700 text-sm">
              Designation
            </label>
            <div className="relative">
              <Building className="top-1/2 left-3 absolute w-4 h-4 text-gray-400 -translate-y-1/2" />
              <Input
                {...register("designation")}
                placeholder="e.g. Associate Pastor"
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="font-medium text-gray-700 text-sm">Parish</label>
            <div className="relative">
              <Church className="top-1/2 left-3 absolute w-4 h-4 text-gray-400 -translate-y-1/2" />
              <Input
                {...register("parish")}
                placeholder="e.g. OLA Parish"
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="font-medium text-gray-700 text-sm">Diocese</label>
            <div className="relative">
              <MapPin className="top-1/2 left-3 absolute w-4 h-4 text-gray-400 -translate-y-1/2" />
              <Input
                {...register("diocese")}
                placeholder="e.g. Navrongo-Bolgatanga"
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-1.5 sm:col-span-2">
            <label className="font-medium text-gray-700 text-sm">
              Biography
            </label>
            <p className="mb-2 text-gray-500 text-xs">
              Share a brief bio about your ministry and background.
            </p>
            <Textarea
              {...register("bio")}
              placeholder="I was ordained in..."
              className="min-h-[150px] resize-y"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-6 border-gray-100 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={() => reset()}
            disabled={!isDirty || updatePriestMutation.isPending}
          >
            Discard Changes
          </Button>
          <Button
            type="submit"
            disabled={!isDirty || updatePriestMutation.isPending}
            className="bg-primary-900 hover:bg-primary-800"
          >
            {updatePriestMutation.isPending && (
              <Loader2 className="mr-2 w-4 h-4 animate-spin" />
            )}
            Save Details
          </Button>
        </div>
      </form>
    </div>
  );
};
