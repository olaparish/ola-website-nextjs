"use client";
import DashboardSectionCard from "@/app/(website)/components/parishioner/dashboard-section-card";
import { Button } from "@/components/ui/button";
import EditableTextInput, {
  EditableTextProps,
} from "@/components/ui/editable-text-input";
import { parishionerService } from "@/services/parishioner.service";
import { useParishionerStore } from "@/stores/useParishioner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import {
  FormFieldType,
  ParishGroupResponse,
  SelectOption,
} from "../../../../../../types";
import { parishGroupService } from "@/services/parish-groups.service";
import DataFetchSpinner from "@/components/ui/data-fetch-spinner";

type UpdateFieldNames =
  | "stationId"
  | "communityId"
  | "outstationId"
  | "dateOfBirth"
  | "dateOfConfirmation";

const UpdateProfileSchema = z.object({
  stationId: z.string("Invalid input").optional(),
  communityId: z.string("Invalid input").optional(),
  outstationId: z.string("Invalid input").optional(),
  dateOfBirth: z.string("Invalid input").optional(),
  dateOfConfirmation: z.date("Invalid input").optional(),
});

type UserUpdateType = z.infer<typeof UpdateProfileSchema>;

const Page = () => {
  const { parishioner, user, setAll } = useParishionerStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserUpdateType>({
    resolver: zodResolver(UpdateProfileSchema),
  });
  const [isEditing, setIsEditing] = useState(false);

  const {
    data: groupData,
    isLoading,
    isSuccess,
    isError,
  } = useQuery<ParishGroupResponse>({
    queryKey: ["parishGrous"],
    queryFn: parishGroupService.getGroups,
    retry: 2,
  });

  const { mutate: updateUserMutation, isPending } = useMutation({
    mutationKey: ["update user", user?.id],
    mutationFn: async (data: UserUpdateType) => {
      if (!user || !parishioner) {
        toast.error("User or Parishioner data not found");
        return;
      }
      const updatedUser = await parishionerService.update(user.id, data);

      toast.success("Updated User details");
      setAll(updatedUser);
    },
  });

  useEffect(() => {
    if (isLoading) {
      toast.info("Fetching parish groups");
    }
  }, [isLoading]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(
        "Fetched all parish communities, societies, and outstations"
      );
    } else if (isError) {
      toast.error(
        "Error fetching parish groups. Please refresh the page to try again"
      );
    }
  }, [isSuccess, isError]);

  const spouseStatus: FormFieldType[] = [
    {
      type: "select",
      name: "stationId",
      label: "Station",
      placeholder:
        groupData?.outstations.find((d) => d.id === parishioner?.stationId)
          ?.name || "null",
      options: groupData?.outstations.map((d) => {
        return {
          name: d.name,
          value: d.id,
        };
      }),
      isEditable: false,
    },
    {
      type: "select",
      name: "communityId",
      label: "Community",
      placeholder:
        groupData?.communities.find((d) => d.id === parishioner?.communityId)
          ?.name || "null",
      options: groupData?.communities.map((d) => {
        return {
          name: d.name,
          value: d.id,
        };
      }),
      isEditable: false,
    },
    {
      type: "multi-select",
      name: "societies",
      label: "Societies",
      multiSelectValues: parishioner?.societies.map((soc) => {
        return {
          name: soc.name,
          value: soc.id,
        };
      }),
      options: groupData?.societies.map((d) => {
        return {
          name: d.name,
          value: d.id,
        };
      }),
      isEditable: false,
    },
  ];

  console.log("group data: ", parishioner?.communityId);
  console.log("group data: ", parishioner?.stationId);

  const spouseDetails: FormFieldType[] = [
    {
      type: "date",
      name: "dateOfBirth",
      label: "Date of Birth",
      placeholder: parishioner?.dateOfBirth || "null",
      // isEditable: false,
    },
    {
      type: "text",
      name: "baptismDate",
      label: "Date of Baptism",
      placeholder: parishioner?.dateOfBirth || "Parishioner is not Baptised",
      isEditable: false,
    },
    {
      type: "text",
      name: "confirmationDate",
      label: "Date of Confirmation",
      placeholder: parishioner?.dateOfBirth || "Parishioner is not Confirmed",
      isEditable: false,
    },
    {
      type: "text",
      name: "confirmationDate",
      label: "Date of Marriage",
      placeholder: parishioner?.dateOfBirth || "Parishioner is not married",
      isEditable: false,
    },
  ];

  const formSubmitHandler = (formData: UserUpdateType) => {
    const submitData = { ...formData };

    Object.keys(formData).forEach((d) => {
      if (!formData[d as keyof typeof formData]) {
        delete submitData[d as keyof typeof formData];
      }
    });
    if (Object.keys(submitData).length > 0) {
      updateUserMutation(submitData);
      setIsEditing(false);
    }
  };
  return (
    <div>
      {isLoading ||
        (isPending && (
          <div className="top-1/2 left-1/2 absolute bg-secondary-900/10 w-full h-full -translate-1/2">
            <DataFetchSpinner
              message={
                isLoading ? "fetching parish groups" : "Updating parishioner"
              }
            />
          </div>
        ))}
      <Button
        onClick={() => setIsEditing((prev) => !prev)}
        className="bg-primary-900 hover:bg-primary-900/90 cursor-pointer"
      >
        {isEditing ? "cancel" : "Edit profile"}
      </Button>

      <form className="" onSubmit={handleSubmit(formSubmitHandler)}>
        <DashboardSectionCard className="mt-5 pb-12">
          <div className="flex flex-col gap-10 gap-x-10 gap-y-10 md:grid md:grid-cols-2 lg:grid-cols-3">
            {spouseStatus.map((field, index) => (
              <div key={index}>
                <EditableTextInput
                  errorMessage={
                    (errors[field.name as UpdateFieldNames]
                      ?.message as string) ?? ""
                  }
                  isEditing={isEditing}
                  {...field}
                  {...register(field.name as UpdateFieldNames)}
                />
              </div>
            ))}
          </div>
        </DashboardSectionCard>
        <DashboardSectionCard className="mt-5 pb-12">
          <div className="flex flex-col gap-10 gap-x-10 gap-y-10 md:grid md:grid-cols-2 lg:grid-cols-3">
            {spouseDetails.map((field, index) => (
              <div key={index}>
                <EditableTextInput
                  errorMessage={
                    (errors[field.name as UpdateFieldNames]
                      ?.message as string) ?? ""
                  }
                  isEditing={isEditing}
                  {...field}
                  {...register(field.name as UpdateFieldNames)}
                />
              </div>
            ))}
          </div>
        </DashboardSectionCard>
        {isEditing && (
          <div className="mt-10 text-center">
            <Button
              type="submit"
              className="bg-primary-900 hover:bg-primary-900/90 cursor-pointer"
            >
              Save
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Page;
