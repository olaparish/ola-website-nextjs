"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Camera, MessageSquareQuote, Phone, MapPin, Globe, Facebook, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { parishGroupService } from "@/services/parish-groups.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { parishionerService } from "@/services/parishioner.service";
import { uploadFile } from "@/utils/file-upload";
import { useSession } from "next-auth/react";

const groupSchema = z.object({
  name: z.string().optional(),
  heroImage: z.string().optional(),
  writeup: z.string().optional(),
  otherImages: z.string().optional(), // Should be comma separated or array in backend? Implementation plan says string.
  phone: z.string().optional(),
  address: z.string().optional(),
  facebook: z.string().optional(),
  website: z.string().optional(),
  dateFounded: z.string().optional(),
});

type GroupFormValues = z.infer<typeof groupSchema>;

export const GroupSettings = () => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  // We need to fetch the Group data. 
  // userDetails.userData contains the group info for group roles.
  const { data: userDetails, isLoading } = useQuery({
    queryKey: ["current-user-full", session?.user?.id, "group"],
    queryFn: () => parishionerService.getParishioner(),
    enabled: !!session?.user?.id,
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isDirty },
  } = useForm<GroupFormValues>({
    resolver: zodResolver(groupSchema),
  });

  const currentHeroImage = watch("heroImage");

  useEffect(() => {
    if (userDetails?.userData) {
      const data: any = userDetails.userData;
      reset({
        name: data.name || "",
        heroImage: data.heroImage || "",
        writeup: data.writeup || "",
        otherImages: data.otherImages || "",
        phone: data.phone || "",
        address: data.address || "",
        facebook: data.facebook || "",
        website: data.website || "",
        dateFounded: data.dateFounded || "",
      });
    }
  }, [userDetails, reset]);

  const updateGroupMutation = useMutation({
    mutationFn: async (data: GroupFormValues) => {
      // updateGroup takes Partial<ParishGroup>
      // The service maps the object directly.
      return parishGroupService.updateGroup(data);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["current-user-full"] });
      toast.success("Group details updated successfully!");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to update group details");
    },
  });

  const handleHeroImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      toast.info("Uploading hero image...");
      const url = await uploadFile(file);
      setValue("heroImage", url, { shouldDirty: true });
      toast.success("Hero image uploaded! Remember to save changes.");
    } catch (error) {
       // Error handled in uploadFile
    }
  };

  const onSubmit = (data: GroupFormValues) => {
    updateGroupMutation.mutate(data);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48">
        <Loader2 className="w-8 h-8 text-primary-900 animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-white shadow-sm border border-gray-100 rounded-xl overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="bg-gray-50/50 p-6 border-b border-gray-100">
        <h3 className="font-bold text-gray-900">Group Information</h3>
        <p className="text-gray-500 text-xs mt-1">
          Update the profile, history and contact info for your group.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6">
        
         {/* Hero Image Upload */}
         <div className="flex items-center gap-6">
           <div className="group relative">
                <div className="flex justify-center items-center bg-gray-100 shadow-inner border-2 border-dashed border-gray-300 rounded-lg w-full h-40 overflow-hidden min-w-[300px]">
                  {currentHeroImage ? (
                    <img
                      src={currentHeroImage}
                      alt="Hero"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-400 text-xs text-center p-2">No Hero Image</span>
                  )}
                </div>
                <label className="right-2 bottom-2 absolute bg-white hover:bg-gray-50 shadow-sm p-1.5 border rounded-full text-primary-900 transition-colors cursor-pointer">
                  <Camera className="w-4 h-4" />
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleHeroImageUpload}
                  />
                </label>
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 text-sm">Cover / Hero Image</h4>
                 <p className="text-gray-500 text-xs mt-1">
                  This large image will be shown at the top of your group's page.
                </p>
              </div>
        </div>

        <div className="gap-6 grid grid-cols-1 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="font-medium text-gray-700 text-sm">Group Name</label>
              <Input {...register("name")} className="bg-white" />
            </div>

             <div className="space-y-1.5">
              <label className="font-medium text-gray-700 text-sm">Date Founded</label>
              <div className="relative">
                 <Calendar className="top-1/2 left-3 absolute w-4 h-4 text-gray-400 -translate-y-1/2" />
                <Input {...register("dateFounded")} className="pl-10 bg-white" type="date" />
              </div>
            </div>

             <div className="space-y-1.5">
              <label className="font-medium text-gray-700 text-sm">Phone</label>
               <div className="relative">
                 <Phone className="top-1/2 left-3 absolute w-4 h-4 text-gray-400 -translate-y-1/2" />
                <Input {...register("phone")} className="pl-10 bg-white" />
              </div>
            </div>
            
             <div className="space-y-1.5">
              <label className="font-medium text-gray-700 text-sm">Address</label>
               <div className="relative">
                 <MapPin className="top-1/2 left-3 absolute w-4 h-4 text-gray-400 -translate-y-1/2" />
                <Input {...register("address")} className="pl-10 bg-white" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-medium text-gray-700 text-sm">Facebook URL</label>
              <div className="relative">
                 <Facebook className="top-1/2 left-3 absolute w-4 h-4 text-gray-400 -translate-y-1/2" />
                <Input {...register("facebook")} className="pl-10 bg-white" placeholder="https://facebook.com/..." />
              </div>
            </div>

             <div className="space-y-1.5">
              <label className="font-medium text-gray-700 text-sm">Website URL</label>
              <div className="relative">
                 <Globe className="top-1/2 left-3 absolute w-4 h-4 text-gray-400 -translate-y-1/2" />
                <Input {...register("website")} className="pl-10 bg-white" placeholder="https://..." />
              </div>
            </div>
            
        </div>

        <div className="space-y-1.5">
          <label className="font-medium text-gray-700 text-sm">
            Group Writeup / History
          </label>
           <p className="text-gray-500 text-xs mb-2">
            Describe your group, its history, mission and activities.
          </p>
          <div className="relative">
             <MessageSquareQuote className="top-3 left-3 absolute w-4 h-4 text-gray-400" />
            <Textarea
              {...register("writeup")}
              placeholder="Our story begins..."
              className="pl-10 min-h-[200px] resize-y"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
          <Button
            type="button"
            variant="outline"
            onClick={() => reset()}
            disabled={!isDirty || updateGroupMutation.isPending}
          >
            Discard Changes
          </Button>
          <Button
            type="submit"
            disabled={!isDirty || updateGroupMutation.isPending}
            className="bg-primary-900 hover:bg-primary-800"
          >
             {updateGroupMutation.isPending && (
              <Loader2 className="mr-2 w-4 h-4 animate-spin" />
            )}
            Save Details
          </Button>
        </div>
      </form>
    </div>
  );
};
