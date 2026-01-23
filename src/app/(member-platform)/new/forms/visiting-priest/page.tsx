"use client";

import { Button } from "@/components/ui/button";
import { ErrorSpan } from "@/components/ui/errors";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { priestService } from "@/services/priest.service";
import { useMutation } from "@tanstack/react-query";
import { FormEvent } from "react";
import { toast } from "sonner";
import { CreateVisitingPristDto } from "../../../../../../types";
import FormSuccessPage from "../../../../../components/forms/success-page";

const Page = () => {
  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: (data: CreateVisitingPristDto) =>
      priestService.createVisitingPriest(data),
  });

  const formSubmithandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const dto: CreateVisitingPristDto = {
      title: formData.get("title") as string,
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      otherNames: formData.get("otherNames") as string,
      email: formData.get("email") as string,
      phoneNumber: formData.get("phoneNumber") as string,
      designation: formData.get("designation") as string,
      arrivalDate: formData.get("arrivalDate") as string,
      parish: formData.get("parish") as string,
      diocese: formData.get("diocese") as string,
    };

    console.log("DTO: ", dto);

    mutate(dto);
  };

  if (isSuccess) {
    toast.success(
      "Resident Priest created successfully.\nYou will be redirected in 5 seconds",
    );
  }

  const fields = [
    {
      name: "title",
      type: "text",
      label: "Title",
      required: true,
      placeholder: "Most Rev., Rev. Dr., Fr., etc. (title before the name)",
    },
    {
      name: "designation",
      type: "text",
      label: "Designation",
      required: true,
      placeholder: "Curate",
    },
    {
      name: "firstName",
      type: "text",
      label: "First Name",
      required: true,
      placeholder: "John",
    },
    {
      name: "lastName",
      type: "text",
      label: "Last Name",
      required: true,
      placeholder: "Abugre",
    },
    {
      name: "otherNames",
      type: "text",
      label: "Other Names",
      required: false,
      placeholder: "Akolgo",
    },
    {
      name: "email",
      type: "email",
      label: "Email",
      required: true,
      placeholder: "example@gmail.com",
    },
    {
      name: "phoneNumber",
      type: "tel",
      label: "Phone Number",
      required: true,
      placeholder: "Akolgo",
    },
    {
      name: "arrivalDate",
      type: "date",
      label: "Arrival Date",
      required: true,
      placeholder: "",
    },
    {
      name: "parish",
      type: "text",
      label: "Parish",
      required: true,
      placeholder: "Name of priest's parish",
    },
    {
      name: "diocese",
      type: "text",
      label: "Diocese",
      required: true,
      placeholder: "Name of priest's diocese",
    },
  ];

  return (
    <form className="w-full max-w-[720px]" onSubmit={formSubmithandler}>
      {isSuccess && (
        <FormSuccessPage message="Resident Priest Created Successfully" />
      )}
      <p className="font-medium text-secondary-900 sm:text-left text-center">
        Please enter the following information
      </p>
      <div className="space-y-12.5 mt-15">
        <div className="flex flex-col gap-10 md:grid md:grid-cols-2">
          {fields.map((field, index) => (
            <div key={index} className="flex flex-col w-full">
              <Label className="text-primary-900" htmlFor={field.name}>
                {field.label}
              </Label>
              <Input
                className="w-full"
                id={field.name}
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
                required={field.required}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-end mt-12">
        <Button
          className="bg-secondary-900 sm:px-16.25 sm:py-3.75 font-medium text-white cursor-pointer"
          type="submit"
          disabled={isPending}
        >
          Save
        </Button>
      </div>
      {isError && (
        <ErrorSpan
          className="block mt-4"
          message="Failed to create resident priest. Please try again later"
        />
      )}
    </form>
  );
};

export default Page;
