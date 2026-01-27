"use client";

import { useSession } from "next-auth/react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { parishionerService } from "@/services/parishioner.service";
import { userService } from "@/services/user.service";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  User,
  Mail,
  Phone,
  Calendar,
  ShieldCheck,
  Camera,
  Loader2,
  Save,
  UserCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useEffect } from "react";

const profileSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  otherNames: z.string().optional(),
  email: z.string().email("Invalid email address"),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 characters"),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const SettingsPage = () => {
  const { data: session, update: updateSession } = useSession();
  const queryClient = useQueryClient();

  const { data: userData, isLoading: isUserLoading } = useQuery({
    queryKey: ["current-user-full"],
    queryFn: () => parishionerService.getParishioner(),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    // If we want to use placeholders instead of values, we don't need to reset with values here
    // But we might want to keep the form initialized for validation if needed.
    // However, the user specifically asked for placeholders.
  }, [userData]);

  const updateMutation = useMutation({
    mutationFn: (data: ProfileFormValues) => userService.update(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["current-user-full"] });
      await updateSession();
      toast.success("Profile updated successfully!");
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to update profile");
    },
  });

  console.log("Data: ", userData);

  const onSubmit = (data: ProfileFormValues) => {
    updateMutation.mutate(data);
  };

  if (isUserLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="w-8 h-8 text-primary-900 animate-spin" />
      </div>
    );
  }

  return (
    <div className="mx-auto pb-20 max-w-4xl">
      <div className="mb-8 pb-4 border-b">
        <h2 className="font-bold text-gray-900 text-2xl">Account Settings</h2>
        <p className="text-gray-500 text-sm">
          Manage your profile information and account preferences.
        </p>
      </div>

      <div className="gap-8 grid grid-cols-1 md:grid-cols-3">
        {/* Sidebar Navigation - Internal to settings */}
        <aside className="space-y-1">
          <nav>
            <button className="flex items-center gap-3 bg-primary-100 px-4 py-2 rounded-lg w-full font-medium text-primary-900 text-sm">
              <UserCircle className="w-5 h-5" />
              Public Profile
            </button>
            <button className="flex items-center gap-3 hover:bg-gray-100 px-4 py-2 rounded-lg w-full font-medium text-gray-600 text-sm transition-colors">
              <ShieldCheck className="w-5 h-5" />
              Security
            </button>
          </nav>

          <div className="bg-secondary-900 mt-8 p-4 rounded-xl text-white">
            <h4 className="mb-2 font-bold text-secondary-300 text-xs uppercase tracking-widest">
              Member Info
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-secondary-400">Role</span>
                <span className="font-semibold capitalize">
                  {userData?.user.role.toLowerCase().replace("_", " ")}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-secondary-400">Joined</span>
                <span className="font-semibold">
                  {new Date(
                    userData?.user.createdAt || "",
                  ).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </aside>

        {/* Profile Content */}
        <section className="space-y-8 md:col-span-2">
          {/* Avatar Section */}
          <div className="bg-white shadow-sm p-6 border rounded-xl">
            <div className="flex items-center gap-6">
              <div className="group relative">
                <div className="flex justify-center items-center bg-primary-100 shadow-md border-4 border-white rounded-full w-24 h-24 font-bold text-primary-900 text-3xl overflow-hidden">
                  {userData?.user.avatar ? (
                    <img src={userData.user.avatar} alt="Profile" className="h-full w-full object-cover" />
                  ) : (
                    <>
                      {userData?.user.firstName.charAt(0)}
                      {userData?.user.lastName.charAt(0)}
                    </>
                  )}
                </div>
                <button className="right-0 bottom-0 absolute bg-white hover:bg-gray-50 shadow-sm p-1.5 border rounded-full transition-colors">
                  <Camera className="w-4 h-4 text-gray-600" />
                </button>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">
                  Profile Photo
                </h3>
                <p className="mb-3 text-gray-500 text-sm">
                  Upload a new photo or avatar.
                </p>
                <div className="flex gap-2">
                  <button className="bg-primary-900 hover:bg-primary-900/90 shadow-sm px-4 py-2 rounded-md font-bold text-white text-xs transition-all">
                    Change Photo
                  </button>
                  <button className="bg-white hover:bg-gray-50 px-4 py-2 border rounded-md font-bold text-gray-600 text-xs transition-all">
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="bg-white shadow-sm border rounded-xl overflow-hidden">
            <div className="bg-gray-50/50 p-6 border-b">
              <h3 className="font-bold text-gray-900">Personal Information</h3>
              <p className="text-gray-500 text-xs">
                Update your name and contact details.
              </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6">
              <div className="gap-4 grid grid-cols-1 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="font-semibold text-gray-700 text-sm">
                    First Name
                  </label>
                  <div className="relative">
                    <User className="top-1/2 left-3 absolute w-4 h-4 text-gray-400 -translate-y-1/2" />
                    <input
                      {...register("firstName")}
                      className={cn(
                        "bg-white py-2.5 pr-4 pl-10 border focus:border-transparent rounded-lg outline-none focus:ring-2 focus:ring-primary-900 w-full text-sm transition-all",
                        errors.firstName
                          ? "border-red-500 ring-red-100"
                          : "border-gray-200",
                      )}
                      placeholder={userData?.user.firstName || "John"}
                    />
                  </div>
                  {errors.firstName && (
                    <p className="font-medium text-red-500 text-xs">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-gray-700 text-sm">
                    Last Name
                  </label>
                  <div className="relative">
                    <User className="top-1/2 left-3 absolute w-4 h-4 text-gray-400 -translate-y-1/2" />
                    <input
                      {...register("lastName")}
                      className={cn(
                        "bg-white py-2.5 pr-4 pl-10 border focus:border-transparent rounded-lg outline-none focus:ring-2 focus:ring-primary-900 w-full text-sm transition-all",
                        errors.lastName
                          ? "border-red-500 ring-red-100"
                          : "border-gray-200",
                      )}
                      placeholder={userData?.user.lastName || "Doe"}
                    />
                  </div>
                  {errors.lastName && (
                    <p className="font-medium text-red-500 text-xs">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="font-semibold text-gray-700 text-sm">
                    Other Names{" "}
                    <span className="font-normal text-gray-400 text-xs">
                      (Optional)
                    </span>
                  </label>
                  <div className="relative">
                    <User className="top-1/2 left-3 absolute w-4 h-4 text-gray-400 -translate-y-1/2" />
                    <input
                      {...register("otherNames")}
                      className="bg-white py-2.5 pr-4 pl-10 border border-gray-200 focus:border-transparent rounded-lg outline-none focus:ring-2 focus:ring-primary-900 w-full text-sm transition-all"
                      placeholder={userData?.user.otherNames || "Junior"}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-gray-700 text-sm">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="top-1/2 left-3 absolute w-4 h-4 text-gray-400 -translate-y-1/2" />
                    <input
                      {...register("email")}
                      className={cn(
                        "bg-white py-2.5 pr-4 pl-10 border focus:border-transparent rounded-lg outline-none focus:ring-2 focus:ring-primary-900 w-full text-sm transition-all",
                        errors.email
                          ? "border-red-500 ring-red-100"
                          : "border-gray-200",
                      )}
                      placeholder={
                        userData?.user.email || "john.doe@example.com"
                      }
                    />
                  </div>
                  {errors.email && (
                    <p className="font-medium text-red-500 text-xs">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-gray-700 text-sm">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="top-1/2 left-3 absolute w-4 h-4 text-gray-400 -translate-y-1/2" />
                    <input
                      {...register("phoneNumber")}
                      className={cn(
                        "bg-white py-2.5 pr-4 pl-10 border focus:border-transparent rounded-lg outline-none focus:ring-2 focus:ring-primary-900 w-full text-sm transition-all",
                        errors.phoneNumber
                          ? "border-red-500 ring-red-100"
                          : "border-gray-200",
                      )}
                      placeholder={
                        userData?.user.phoneNumber || "+233 50 000 0000"
                      }
                    />
                  </div>
                  {errors.phoneNumber && (
                    <p className="font-medium text-red-500 text-xs">
                      {errors.phoneNumber.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => reset()}
                  disabled={!isDirty || updateMutation.isPending}
                  className="bg-white hover:bg-gray-50 disabled:opacity-50 px-6 py-2.5 border rounded-lg font-bold text-gray-600 text-sm transition-all disabled:cursor-not-allowed"
                >
                  Discard Changes
                </button>
                <button
                  type="submit"
                  disabled={!isDirty || updateMutation.isPending}
                  className="flex items-center gap-2 bg-primary-900 hover:bg-primary-900/90 disabled:opacity-50 shadow-sm px-8 py-2.5 rounded-lg font-bold text-white text-sm transition-all disabled:cursor-not-allowed"
                >
                  {updateMutation.isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SettingsPage;
