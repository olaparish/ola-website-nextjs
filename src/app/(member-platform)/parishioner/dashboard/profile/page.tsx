"use client";
import DashboardSectionCard from "@/app/(website)/components/parishioner/dashboard-section-card";
import { AccountCircleFull } from "@/components/icons/icon-account-circle-full";
import { Button } from "@/components/ui/button";
import { configService } from "@/services/config.service";
import { parishionerService } from "@/services/parishioner.service";
import { useParishionerStore } from "@/stores/useParishioner";
import { processFile } from "@/utils/fileUtils";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import React, { ChangeEvent, useRef, useState } from "react";
import { toast } from "sonner";
import { FormFieldType } from "../../../../../../types";
import EditableTextInput from "@/components/ui/editable-text-input";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getDateMaxValue } from "@/utils/time";
import DataFetchSpinner from "@/components/ui/data-fetch-spinner";

type UpdateFieldNames =
  | "firstName"
  | "lastName"
  | "otherNames"
  | "dateOfBirth"
  | "phoneNumber"
  | "email";

const UpdateProfileSchema = z.object({
  firstName: z.string("First name is required").optional(),
  lastName: z.string("Last name is required").optional(),
  otherNames: z.string().optional(),
  dateOfBirth: z.string("Date of birth is required").optional(),
  phoneNumber: z.string("Phone number is required").optional(),
  email: z
    .union([z.literal(""), z.string().email("Invalid email address")])
    .optional(),
});

type UserUpdateType = z.infer<typeof UpdateProfileSchema>;

const Page = () => {
  const { parishioner, user, setAll } = useParishionerStore();
  const fileRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserUpdateType>({
    resolver: zodResolver(UpdateProfileSchema),
  });
  const [isEditing, setIsEditing] = useState(false);

  const { mutate: fileMutation } = useMutation({
    mutationKey: ["change profile picture", user?.id],
    mutationFn: async (file: File) => {
      if (!user || !parishioner) {
        toast.error("User or Parishioner data not found");
        return;
      }

      toast.info("Uploading profile picture");

      const processedFile = await processFile(file);
      const fileRes = await configService.uploadFile(processedFile.file);
      console.log("Uploaded File: ", fileRes);
      if (fileRes.error || !fileRes.data?.url) {
        toast.error(
          fileRes.error || "Failed to upload image. Please try again."
        );

        return;
      }
      toast.success("Done uploading profile picture");

      const updatedUser = await parishionerService.update(user.id, {
        avatar: fileRes.data?.url,
      });
      setAll(updatedUser);
    },
    onError: () => toast.error("Error uploading file"),
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

  const fields: FormFieldType[] = [
    {
      type: "text",
      name: "firstName",
      label: "First name",
      placeholder: user?.firstName,
    },
    {
      type: "text",
      name: "lastName",
      label: "Last name",
      placeholder: user?.lastName,
    },
    {
      type: "text",
      name: "otherNames",
      label: "Other name (s)",
      placeholder: user?.firstName,
    },
    {
      type: "date",
      name: "dateOfBirth",
      label: "Date of Birth",
      placeholder: parishioner?.dateOfBirth,
      max: getDateMaxValue(),
    },
    {
      type: "text",
      name: "phoneNumber",
      label: "Phone Number",
      placeholder: user?.phoneNumber,
    },
    {
      type: "email",
      name: "email",
      label: "Email Address",
      placeholder: user?.email,
    },
  ];

  const onChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || !files[0]) {
      toast.error("Please select a file to change picture");
      return;
    }
    fileMutation(files[0]);
  };

  const formSubmitHandler = (formData: UserUpdateType) => {
    console.log("formData: ", formData);
    const submitData = { ...formData };

    Object.keys(formData).forEach((d) => {
      if (!formData[d as keyof typeof formData]) {
        delete submitData[d as keyof typeof formData];
      }
    });
    console.log("Submit Data: ", submitData);
    if (Object.keys(submitData).length > 0) {
      console.log("Here...");
      updateUserMutation(submitData);
      setIsEditing(false);
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

      <DashboardSectionCard className="mt-4">
        {user?.avatar ? (
          <Image
            src={user?.avatar}
            height={140}
            width={140}
            alt={[user.firstName, user.lastName, user.otherNames].join(" ")}
          />
        ) : (
          <AccountCircleFull />
        )}
        <input
          type="file"
          accept="image/*"
          ref={fileRef}
          className="hidden"
          onChange={onChangeFile}
        />
        <div className="flex space-x-4 mt-4">
          <Button onClick={() => fileRef.current?.click()} className="">
            Change Profile Picture
          </Button>
          {/* <Button variant="outline">Remove Profile Picture</Button> */}
        </div>
      </DashboardSectionCard>
      <DashboardSectionCard className="mt-5">
        <form className="" onSubmit={handleSubmit(formSubmitHandler)}>
          <div className="gap-x-10 gap-y-9.5 grid grid-cols-3">
            {fields.map((field, index) => (
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
      </DashboardSectionCard>
    </div>
  );
};

export default Page;
