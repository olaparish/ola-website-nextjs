"use client";

import { Button } from "@/components/ui/button";
import { ErrorSpan } from "@/components/ui/errors";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { FormEvent } from "react";
import { toast } from "sonner";
import { CreateCatechistDto } from "../../../../../../types";
import FormSuccessPage from "../../../../../components/forms/success-page";
import { catechistService } from "@/services/catechist.service";
import { useParishGroupStore } from "@/hooks/useParishGroups";
import Select from "@/components/ui/Select";

const Page = () => {
  const { outstations } = useParishGroupStore();
  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: (data: CreateCatechistDto) =>
      catechistService.createCatechist(data),
  });

  const formSubmithandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const dto: CreateCatechistDto = {
      station: formData.get("station") as string,
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      otherNames: formData.get("otherNames") as string,
      email: formData.get("email") as string,
      phoneNumber: formData.get("phoneNumber") as string,
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
    // {
    //   name: "title",
    //   type: "text",
    //   label: "Title",
    //   required: true,
    //   placeholder: "Most Rev., Rev. Dr., Fr., etc. (title before the name)",
    // },
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
          <div className="flex flex-col w-full">
            <Label className="text-primary-900" htmlFor="station">
              Station
            </Label>
            <Select
              id="station"
              required={true}
              name="station"
              options={outstations.map((out) => {
                return { name: out.name, value: out.id };
              })}
            />
          </div>
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
