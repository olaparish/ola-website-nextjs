"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { User, Mail, Phone, Camera, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { parishionerService } from "@/services/parishioner.service";
import { userService } from "@/services/user.service";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useEffect } from "react";
import { uploadFile } from "@/utils/file-upload";
import { useSession } from "next-auth/react";

const profileSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  otherNames: z.string().optional(),
  email: z.string().email("Invalid email address"),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 characters"),
  avatar: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export const ProfileSettings = () => {
  const { data: session } = useSession();

  const queryClient = useQueryClient();

  const { data: userDetails, isLoading: isUserLoading } = useQuery({
    queryKey: ["current-user-full", session?.user?.id as string],
    queryFn: () => parishionerService.getParishioner(),
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isDirty },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
  });

  const currentAvatar = watch("avatar");

  useEffect(() => {
    if (userDetails?.user) {
      reset({
        firstName: userDetails.user.firstName,
        lastName: userDetails.user.lastName,
        otherNames: userDetails.user.otherNames || "",
        email: userDetails.user.email || "",
        phoneNumber: userDetails.user.phoneNumber || "",
        avatar: userDetails.user.avatar || "",
      });
    }
  }, [userDetails, reset]);

  const updateProfileMutation = useMutation({
    mutationFn: (data: ProfileFormValues) =>
      userService.update(session?.user?.id as string, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["current-user-full", session?.user?.id as string],
      });
      toast.success("Profile updated successfully!");
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to update profile");
    },
  });

  const handleAvatarUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      toast.info("Uploading avatar...");
      const url = await uploadFile(file);
      setValue("avatar", url, { shouldDirty: true });
      toast.success("Avatar uploaded! Remember to save changes.");
    } catch (error) {
      // Error handled in uploadFile or generic catch
    }
  };

  const onSubmit = (data: ProfileFormValues) => {
    updateProfileMutation.mutate(data);
  };

  if (isUserLoading) {
    return (
      <div className="flex justify-center items-center h-48">
        <Loader2 className="w-8 h-8 text-primary-900 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Avatar Section */}
      <div className="flex items-center gap-6 bg-white shadow-sm p-6 border border-gray-100 rounded-xl">
        <div className="group relative">
          <div className="flex justify-center items-center bg-primary-50 shadow-inner border-4 border-white rounded-full w-24 h-24 overflow-hidden font-bold text-primary-900 text-3xl">
            {currentAvatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={currentAvatar}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <>
                {userDetails?.user.firstName?.charAt(0)}
                {userDetails?.user.lastName?.charAt(0)}
              </>
            )}
          </div>
          <label className="right-0 bottom-0 absolute bg-white hover:bg-gray-50 shadow-sm p-1.5 border rounded-full text-primary-900 transition-colors cursor-pointer">
            <Camera className="w-4 h-4" />
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleAvatarUpload}
            />
          </label>
        </div>
        <div>
          <h3 className="font-bold text-gray-900 text-lg">
            {userDetails?.user.firstName} {userDetails?.user.lastName}
          </h3>
          <p className="text-gray-500 text-sm">{userDetails?.user.email}</p>
        </div>
      </div>

      <div className="slide-in-from-bottom-2 bg-white shadow-sm border border-gray-100 rounded-xl overflow-hidden animate-in duration-300 fade-in">
        <div className="bg-gray-50/50 p-6 border-gray-100 border-b">
          <h3 className="font-bold text-gray-900">Personal Information</h3>
          <p className="mt-1 text-gray-500 text-xs">
            Update your name and contact details used across the parish.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6">
          <div className="gap-6 grid grid-cols-1 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="font-medium text-gray-700 text-sm">
                First Name
              </label>
              <div className="relative">
                <User className="top-1/2 left-3 absolute w-4 h-4 text-gray-400 -translate-y-1/2" />
                <Input
                  {...register("firstName")}
                  className={cn(
                    "pl-10",
                    errors.firstName && "border-red-500 ring-red-100",
                  )}
                />
              </div>
              {errors.firstName && (
                <p className="text-red-500 text-xs">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="font-medium text-gray-700 text-sm">
                Last Name
              </label>
              <div className="relative">
                <User className="top-1/2 left-3 absolute w-4 h-4 text-gray-400 -translate-y-1/2" />
                <Input
                  {...register("lastName")}
                  className={cn(
                    "pl-10",
                    errors.lastName && "border-red-500 ring-red-100",
                  )}
                />
              </div>
              {errors.lastName && (
                <p className="text-red-500 text-xs">
                  {errors.lastName.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="font-medium text-gray-700 text-sm">
                Other Names{" "}
                <span className="font-normal text-gray-400">(Optional)</span>
              </label>
              <div className="relative">
                <User className="top-1/2 left-3 absolute w-4 h-4 text-gray-400 -translate-y-1/2" />
                <Input {...register("otherNames")} className="pl-10" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-medium text-gray-700 text-sm">Email</label>
              <div className="relative">
                <Mail className="top-1/2 left-3 absolute w-4 h-4 text-gray-400 -translate-y-1/2" />
                <Input
                  {...register("email")}
                  className={cn(
                    "pl-10",
                    errors.email && "border-red-500 ring-red-100",
                  )}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="font-medium text-gray-700 text-sm">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="top-1/2 left-3 absolute w-4 h-4 text-gray-400 -translate-y-1/2" />
                <Input
                  {...register("phoneNumber")}
                  className={cn(
                    "pl-10",
                    errors.phoneNumber && "border-red-500 ring-red-100",
                  )}
                />
              </div>
              {errors.phoneNumber && (
                <p className="text-red-500 text-xs">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-gray-100 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => reset()}
              disabled={!isDirty || updateProfileMutation.isPending}
            >
              Discard Changes
            </Button>
            <Button
              type="submit"
              disabled={!isDirty || updateProfileMutation.isPending}
              className="bg-primary-900 hover:bg-primary-800"
            >
              {updateProfileMutation.isPending && (
                <Loader2 className="mr-2 w-4 h-4 animate-spin" />
              )}
              Save Profile
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
