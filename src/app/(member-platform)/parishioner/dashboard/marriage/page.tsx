"use client";
import DashboardSectionCard from "@/app/(website)/components/parishioner/dashboard-section-card";
import { Button } from "@/components/ui/button";
import EditableTextInput from "@/components/ui/editable-text-input";
import { MaritalStatusSchema } from "@/lib/validations.z";
import { parishionerService } from "@/services/parishioner.service";
import { useParishionerStore } from "@/stores/useParishioner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { FormFieldType } from "../../../../../../types";
import { MARITAL_STATUS_OBJ } from "@/app/(member-platform)/new-parishioner/form-fields";
import DataFetchSpinner from "@/components/ui/data-fetch-spinner";

type UpdateFieldNames =
  | "maritalStatus"
  | "spouseIsParishioner"
  | "spouseFirstName"
  | "spouseLastName"
  | "spouseOtherNames"
  | "spousePhoneNumber";

const UpdateProfileSchema = z.object({
  maritalStatus: MaritalStatusSchema.optional(),
  spouseIsParishioner: z
    .boolean("Spouse is Parishioner is required")
    .optional(),
  spouseId: z.string("Spouse ID is required").optional(),
  spouseFirstName: z.string("Spouse first name is required").optional(),
  spouseLastName: z.string("Spouse last name required").optional(),
  spouseOtherNames: z.string("Spouse other names is required").optional(),
  spousePhoneNumber: z.string("Spouse phone number is required").optional(),
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

  const spouseStatus: FormFieldType[] = [
    {
      type: "select",
      name: "maritalStatus",
      label: "Marital Status",
      placeholder: parishioner?.maritalStatus,
      options: MARITAL_STATUS_OBJ,
    },
    {
      type: "select",
      name: "spouseIsParishioner",
      label: "Is Spouse a Parishioner",
      placeholder: parishioner?.spouseIsParishioner ? "YES" : "NO",
      options: [
        {
          name: "YES",
          value: "1",
        },
        {
          name: "NO",
          value: "0",
        },
      ],
    },
    {
      type: "select",
      name: "spouseParishionerId",
      label: "Spouse Parishioner ID",
      placeholder: parishioner?.maritalStatus,
    },
  ];

  const spouseDetails: FormFieldType[] = [
    {
      type: "text",
      name: "spouseFirstName",
      label: "Spouse FirstName",
      placeholder: parishioner?.spouseFirstName || "null",
    },
    {
      type: "text",
      name: "spouseLastName",
      label: "Spouse LastName",
      placeholder: parishioner?.spouseLastName || "null",
    },
    {
      type: "text",
      name: "spouseOtherNames",
      label: "Spouse Other Names",
      placeholder: parishioner?.spouseOtherNames || "null",
    },
    {
      type: "text",
      name: "spousePhoneNumber",
      label: "Spouse Phone Number",
      placeholder: parishioner?.spousePhoneNumber || "null",
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
      // updateUserMutation(submitData);
      // setIsEditing(false);
    }
  };
  return (
    <div>
      {isPending && (
        <div className="top-1/2 left-1/2 absolute bg-secondary-900/10 w-full h-full -translate-1/2">
          <DataFetchSpinner message="Updating data" />
        </div>
      )}
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
