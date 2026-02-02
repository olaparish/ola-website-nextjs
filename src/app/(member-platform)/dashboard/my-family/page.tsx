/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Users,
  User,
  CheckCircle2,
  Loader2,
  Heart,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useParishionerStore } from "@/stores/useParishioner";
import { parishionerService } from "@/services/parishioner.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ParishionerDetailCard } from "@/components/dashboard/ParishionerDetailCard";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { DetailedParishioner, DetailedParishionerUser } from "@/../types/parishioner";

const familySchema = z.object({
  fatherIsAlive: z.boolean().optional(),
  fatherIsCatholic: z.boolean().optional(),
  fatherIsParishioner: z.boolean().optional(),
  fatherFirstName: z.string().optional(),
  fatherLastName: z.string().optional(),
  fatherOtherNames: z.string().optional(),
  fatherPhoneNumber: z.string().optional(),
  fatherResidentialAddress: z.string().optional(),
  fatherParishionerId: z.string().optional(),

  motherIsAlive: z.boolean().optional(),
  motherIsCatholic: z.boolean().optional(),
  motherIsParishioner: z.boolean().optional(),
  motherFirstName: z.string().optional(),
  motherLastName: z.string().optional(),
  motherOtherNames: z.string().optional(),
  motherPhoneNumber: z.string().optional(),
  motherResidentialAddress: z.string().optional(),
  motherParishionerId: z.string().optional(),
}).refine((data) => {
  if (data.fatherIsParishioner && !data.fatherParishionerId) return false;
  return true;
}, {
  message: "Father Parishioner ID is required",
  path: ["fatherParishionerId"],
}).refine((data) => {
  if (data.motherIsParishioner && !data.motherParishionerId) return false;
  return true;
}, {
  message: "Mother Parishioner ID is required",
  path: ["motherParishionerId"],
});

type FamilyFormValues = z.infer<typeof familySchema>;

export default function MyFamilyPage() {
  const { parishioner, user, setAll } = useParishionerStore();
  const [isEditing, setIsEditing] = useState(false);
  const [fatherSearchId, setFatherSearchId] = useState("");
  const [motherSearchId, setMotherSearchId] = useState("");
  const [linkedFather, setLinkedFather] = useState<DetailedParishionerUser | null>(null);
  const [linkedMother, setLinkedMother] = useState<DetailedParishionerUser | null>(null);
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
    defaultValues: {
      fatherIsAlive: true,
      fatherIsCatholic: true,
      fatherIsParishioner: false,
      motherIsAlive: true,
      motherIsCatholic: true,
      motherIsParishioner: false,
    },
  });

  const fatherIsAlive = watch("fatherIsAlive");
  const fatherIsCatholic = watch("fatherIsCatholic");
  const fatherIsParishioner = watch("fatherIsParishioner");
  const motherIsAlive = watch("motherIsAlive");
  const motherIsCatholic = watch("motherIsCatholic");
  const motherIsParishioner = watch("motherIsParishioner");

  useEffect(() => {
    if (parishioner) {
      const p = parishioner as DetailedParishioner;
      reset({
        fatherIsAlive: !!p.fatherIsAlive,
        fatherIsCatholic: !!p.fatherIsCatholic,
        fatherIsParishioner: !!p.fatherIsParishioner,
        fatherFirstName: p.fatherFirstName || "",
        fatherLastName: p.fatherLastName || "",
        fatherOtherNames: p.fatherOtherNames || "",
        fatherPhoneNumber: p.fatherPhoneNumber || "",
        fatherResidentialAddress: p.fatherResidentialAddress || "",
        fatherParishionerId: p.fatherParishionerId || "",

        motherIsAlive: !!p.motherIsAlive,
        motherIsCatholic: !!p.motherIsCatholic,
        motherIsParishioner: !!p.motherIsParishioner,
        motherFirstName: p.motherFirstName || "",
        motherLastName: p.motherLastName || "",
        motherOtherNames: p.motherOtherNames || "",
        motherPhoneNumber: p.motherPhoneNumber || "",
        motherResidentialAddress: p.motherResidentialAddress || "",
        motherParishionerId: p.motherParishionerId || "",
      });
      if (p.fatherParishionerId) {
        setFatherSearchId(p.fatherParishionerId.slice(0, 8));
        if (p.fatherParishioner) setLinkedFather(p.fatherParishioner);
      }
      if (p.motherParishionerId) {
        setMotherSearchId(p.motherParishionerId.slice(0, 8));
        if (p.motherParishioner) setLinkedMother(p.motherParishioner);
      }
    }
  }, [parishioner, reset]);

  // Search Father by ID
  useEffect(() => {
    if (fatherSearchId.length === 8 && isEditing) {
      const fetchFather = async () => {
        try {
          const result = await parishionerService.getParishionerDetails(fatherSearchId);
          if (result) {
            // Gender check
            if (result.user.gender && result.user.gender !== 'MALE') {
              toast.error("Linking failed: This parishioner is not MALE.");
              setLinkedFather(null);
              return;
            }

            setValue("fatherFirstName", result.user.firstName);
            setValue("fatherLastName", result.user.lastName);
            setValue("fatherOtherNames", result.user.otherNames || "");
            setValue("fatherPhoneNumber", result.user.phoneNumber || "");
            setValue("fatherResidentialAddress", result.userData.residentialAddress);
            setValue("fatherIsParishioner", true);
            setValue("fatherParishionerId", result.user.id);
            setLinkedFather(result);
            toast.success("Father found and linked!");
          }
        } catch (error) {
          toast.error("Parishioner not found with this ID");
          setLinkedFather(null);
        }
      };
      fetchFather();
    } else if (fatherSearchId.length === 0) {
      setLinkedFather(null);
    }
  }, [fatherSearchId, setValue, isEditing]);

  // Search Mother by ID
  useEffect(() => {
    if (motherSearchId.length === 8 && isEditing) {
      const fetchMother = async () => {
        try {
          const result = await parishionerService.getParishionerDetails(motherSearchId);
          if (result) {
            // Gender check
            if (result.user.gender && result.user.gender !== 'FEMALE') {
              toast.error("Linking failed: This parishioner is not FEMALE.");
              setLinkedMother(null);
              return;
            }

            setValue("motherFirstName", result.user.firstName);
            setValue("motherLastName", result.user.lastName);
            setValue("motherOtherNames", result.user.otherNames || "");
            setValue("motherPhoneNumber", result.user.phoneNumber || "");
            setValue("motherResidentialAddress", result.userData.residentialAddress);
            setValue("motherIsParishioner", true);
            setValue("motherParishionerId", result.user.id);
            setLinkedMother(result);
            toast.success("Mother found and linked!");
          }
        } catch (error) {
          toast.error("Parishioner not found with this ID");
          setLinkedMother(null);
        }
      };
      fetchMother();
    } else if (motherSearchId.length === 0) {
      setLinkedMother(null);
    }
  }, [motherSearchId, setValue, isEditing]);

  const renderLinkedParentProfile = (parent: DetailedParishionerUser | null) => {
    if (!parent) return null;
    return (
      <div className="flex items-center gap-4 bg-gray-50 hover:shadow-sm p-4 border border-gray-100 rounded-xl transition-all">
        <div className="flex justify-center items-center bg-gray-200 shadow-sm border-2 border-white rounded-full w-16 h-16 overflow-hidden">
          {parent.userData.picture ? (
            <img src={parent.userData.picture} alt={parent.user.firstName} className="w-full h-full object-cover" />
          ) : (
            <span className="font-bold text-gray-400 text-xl">
              {parent.user.firstName.charAt(0)}{parent.user.lastName.charAt(0)}
            </span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-gray-900 text-sm truncate">
            {parent.userData.title} {parent.user.firstName} {parent.user.lastName}
          </p>
          <p className="font-medium text-gray-400 text-xs">ID: {parent.user.id.slice(0, 8)}</p>
          <p className="font-medium text-gray-400 text-xs capitalize">{parent?.user?.gender?.toLowerCase()} • Parishioner</p>
        </div>
        <div className="bg-green-100 shadow-sm px-2.5 py-1 border border-green-200 rounded-lg font-bold text-[10px] text-green-700 uppercase tracking-wider">
          Linked
        </div>
      </div>
    );
  };

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

  const renderField = (
    label: string,
    value: string | boolean | undefined,
    Icon: any,
  ) => {
    let displayValue = "";
    if (typeof value === "boolean") {
      displayValue = value ? "YES" : "NO";
    } else {
      displayValue = value || "Not provided";
    }

    return (
      <div className="space-y-1.5">
        <p className="font-medium text-gray-400 text-xs uppercase tracking-wider">
          {label}
        </p>
        <div className="flex items-center gap-2 text-gray-900">
          {Icon && <Icon className="w-4 h-4 text-gray-400" />}
          <span className="font-semibold">{displayValue}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="mx-auto py-8 max-w-4xl">
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
            <div className="space-y-12 slide-in-from-top-4 animate-in duration-500 fade-in">
              {/* Father Details */}
              <div className="space-y-6">
                <h4 className="flex items-center gap-2 font-bold text-gray-900 text-lg">
                  <User className="w-5 h-5 text-blue-500" /> Father&apos;s
                  Details
                </h4>
                <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="fatherSearchId">Linked Father Parishioner ID (8-digit)</Label>
                    <Input
                      id="fatherSearchId"
                      value={fatherSearchId}
                      onChange={(e) => setFatherSearchId(e.target.value)}
                      placeholder="Enter 8-digit ID to link..."
                      className="border-gray-200 rounded-xl"
                      maxLength={8}
                    />
                    {renderLinkedParentProfile(linkedFather)}
                    {fatherIsParishioner && !linkedFather && (
                      <p className="font-medium text-green-600 text-sm">Currently linked. Preview loading...</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fatherFirstName">First Name</Label>
                    <Input
                      id="fatherFirstName"
                      {...register("fatherFirstName")}
                      disabled={fatherIsParishioner}
                      className="border-gray-200 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fatherLastName">Last Name</Label>
                    <Input
                      id="fatherLastName"
                      {...register("fatherLastName")}
                      disabled={fatherIsParishioner}
                      className="border-gray-200 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fatherOtherNames">Other Names</Label>
                    <Input
                      id="fatherOtherNames"
                      {...register("fatherOtherNames")}
                      disabled={fatherIsParishioner}
                      className="border-gray-200 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fatherPhoneNumber">Phone Number</Label>
                    <Input
                      id="fatherPhoneNumber"
                      {...register("fatherPhoneNumber")}
                      disabled={fatherIsParishioner}
                      className="border-gray-200 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="fatherResidentialAddress">Residential Address</Label>
                    <Input
                      id="fatherResidentialAddress"
                      {...register("fatherResidentialAddress")}
                      disabled={fatherIsParishioner}
                      className="border-gray-200 rounded-xl"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="father-is-alive"
                      checked={fatherIsAlive}
                      onCheckedChange={(v) => setValue("fatherIsAlive", v)}
                    />
                    <Label htmlFor="father-is-alive" className="mb-0">
                      Is Father Alive?
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="father-is-catholic"
                      checked={fatherIsCatholic}
                      onCheckedChange={(v) => setValue("fatherIsCatholic", v)}
                    />
                    <Label htmlFor="father-is-catholic" className="mb-0">
                      Is Father Catholic?
                    </Label>
                  </div>
                </div>
              </div>

              {/* Mother Details */}
              <div className="space-y-6 pt-12 border-gray-50 border-t">
                <h4 className="flex items-center gap-2 font-bold text-gray-900 text-lg">
                  <User className="w-5 h-5 text-pink-500" /> Mother&apos;s
                  Details
                </h4>
                <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="motherSearchId">Linked Mother Parishioner ID (8-digit)</Label>
                    <Input
                      id="motherSearchId"
                      value={motherSearchId}
                      onChange={(e) => setMotherSearchId(e.target.value)}
                      placeholder="Enter 8-digit ID to link..."
                      className="border-gray-200 rounded-xl"
                      maxLength={8}
                    />
                    {renderLinkedParentProfile(linkedMother)}
                    {motherIsParishioner && !linkedMother && (
                      <p className="font-medium text-green-600 text-sm">Currently linked. Preview loading...</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="motherFirstName">First Name</Label>
                    <Input
                      id="motherFirstName"
                      {...register("motherFirstName")}
                      disabled={motherIsParishioner}
                      className="border-gray-200 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="motherLastName">Last Name</Label>
                    <Input
                      id="motherLastName"
                      {...register("motherLastName")}
                      disabled={motherIsParishioner}
                      className="border-gray-200 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="motherOtherNames">Other Names</Label>
                    <Input
                      id="motherOtherNames"
                      {...register("motherOtherNames")}
                      disabled={motherIsParishioner}
                      className="border-gray-200 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="motherPhoneNumber">Phone Number</Label>
                    <Input
                      id="motherPhoneNumber"
                      {...register("motherPhoneNumber")}
                      disabled={motherIsParishioner}
                      className="border-gray-200 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="motherResidentialAddress">Residential Address</Label>
                    <Input
                      id="motherResidentialAddress"
                      {...register("motherResidentialAddress")}
                      disabled={motherIsParishioner}
                      className="border-gray-200 rounded-xl"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="mother-is-alive"
                      checked={motherIsAlive}
                      onCheckedChange={(v) => setValue("motherIsAlive", v)}
                    />
                    <Label htmlFor="mother-is-alive" className="mb-0">
                      Is Mother Alive?
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="mother-is-catholic"
                      checked={motherIsCatholic}
                      onCheckedChange={(v) => setValue("motherIsCatholic", v)}
                    />
                    <Label htmlFor="mother-is-catholic" className="mb-0">
                      Is Mother Catholic?
                    </Label>
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
            <div className="space-y-16 animate-in duration-500 fade-in">
              {/* View Father */}
              <div className="space-y-8">
                <h4 className="font-bold text-gray-400 text-sm uppercase tracking-widest">
                  Father&apos;s Information
                </h4>
                <div className="gap-y-10 grid grid-cols-1 md:grid-cols-2">
                  {(parishioner as DetailedParishioner)?.fatherIsParishioner && (
                    <div className="md:col-span-2">
                      <p className="mb-2 font-medium text-gray-400 text-xs uppercase tracking-wider">Linked Parishioner</p>
                      {renderLinkedParentProfile(linkedFather)}
                    </div>
                  )}
                  <div>
                    {renderField("First Name", parishioner?.fatherFirstName, User)}
                  </div>
                  <div>
                    {renderField("Last Name", parishioner?.fatherLastName, User)}
                  </div>
                  <div>
                    {renderField("Other Names", parishioner?.fatherOtherNames, User)}
                  </div>
                  <div>
                    {renderField("Phone Number", parishioner?.fatherPhoneNumber, User)}
                  </div>
                  <div className="md:col-span-2">
                    {renderField("Residential Address", parishioner?.fatherResidentialAddress, User)}
                  </div>
                  {renderField("Is Alive?", parishioner?.fatherIsAlive, Heart)}
                  {renderField(
                    "Is Catholic?",
                    parishioner?.fatherIsCatholic,
                    ShieldCheck,
                  )}
                </div>
              </div>

              {/* View Mother */}
              <div className="space-y-8 pt-10 border-gray-50 border-t">
                <h4 className="font-bold text-gray-400 text-sm uppercase tracking-widest">
                  Mother&apos;s Information
                </h4>
                <div className="gap-y-10 grid grid-cols-1 md:grid-cols-2">
                  {(parishioner as DetailedParishioner)?.motherIsParishioner && (
                    <div className="md:col-span-2">
                      <p className="mb-2 font-medium text-gray-400 text-xs uppercase tracking-wider">Linked Parishioner</p>
                      {renderLinkedParentProfile(linkedMother)}
                    </div>
                  )}
                  <div>
                    {renderField("First Name", parishioner?.motherFirstName, User)}
                  </div>
                  <div>
                    {renderField("Last Name", parishioner?.motherLastName, User)}
                  </div>
                  <div>
                    {renderField("Other Names", parishioner?.motherOtherNames, User)}
                  </div>
                  <div>
                    {renderField("Phone Number", parishioner?.motherPhoneNumber, User)}
                  </div>
                  <div className="md:col-span-2">
                    {renderField("Residential Address", parishioner?.motherResidentialAddress, User)}
                  </div>
                  {renderField("Is Alive?", parishioner?.motherIsAlive, Heart)}
                  {renderField(
                    "Is Catholic?",
                    parishioner?.motherIsCatholic,
                    ShieldCheck,
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
