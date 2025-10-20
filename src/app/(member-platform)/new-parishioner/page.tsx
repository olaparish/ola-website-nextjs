"use client";
import React, { Fragment, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  MemberFieldNames,
  MemberProfileSchema,
  ProfileFields,
  HomeDetails,
  WorkDetails,
  ParishDetails,
  OtherDetails,
} from "./form-fields";
import { Input } from "@/components/ui/input";
import { FormFieldType, SelectOption } from "../../../../types";
import { Label } from "@/components/ui/label";
import Select from "@/components/ui/Select";
import { Button } from "@/components/ui/button";
import MultiSelect from "@/components/ui/MultiSelect";
import { ImageInput } from "@/components/ui/ImageInput";
import { FileInputType } from "../../../../types/inputs";

type FormData = z.infer<typeof MemberProfileSchema>;

const Page = () => {
  const [societies, setSocieties] = useState<string[]>([]);
  const [societiesError, setSocietiesError] = useState<string>("");
  const [files, setFiles] = useState<FileInputType[]>([]);

  const handleFormSubmit = (formData: FormData) => {
    console.log("Form is running");
    if (!societies.length) {
      setSocietiesError("You must select a value");
      console.log("Returning");
      return;
    }
    const data = { ...formData, societies };
    console.log(data);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(MemberProfileSchema),
  });

  const handleSocietiesChange = (values: SelectOption[]) => {
    if (values.length) {
      setSocietiesError("");
    } else setSocietiesError("You must select a value");
    setSocieties(values.map((value) => value.value));
  };

  const handleFileChange = (files: FileInputType[]) => {
    setFiles(files);
  };

  const parseInput = ({ max, type, ...fields }: FormFieldType) => {
    if (type === "file") {
      return (
        <Fragment>
          <Label className="text-primary-900" htmlFor={fields.name}>
            {fields.label}
          </Label>
          <ImageInput
            {...fields}
            className="w-fit"
            changeHandler={handleFileChange}
            {...register(fields.name as MemberFieldNames)}
          />
          <ErrorSpan
            message={`${
              (errors[fields.name as MemberFieldNames]?.message as string) ?? ""
            } ${!files.length ? "You must select a file" : ""}`}
          />
        </Fragment>
      );
    } else if (type === "select" && fields.options?.length)
      return (
        <div className="flex flex-col w-full">
          <Label className="text-primary-900" htmlFor={fields.name}>
            {fields.label}
          </Label>
          <Select
            id={fields.name}
            options={fields.options}
            {...fields}
            {...register(fields.name as MemberFieldNames)}
          />
          <ErrorSpan
            message={errors[fields.name as MemberFieldNames]?.message as string}
          />
        </div>
      );
    else if (type === "multi-select" && fields.options?.length)
      return (
        <div className="flex flex-col w-full">
          <Label className="text-primary-900" htmlFor={fields.name}>
            {fields.label}
          </Label>
          <MultiSelect
            id={fields.name}
            setValue={handleSocietiesChange}
            options={fields.options}
            {...fields}
          />
          <ErrorSpan message={societiesError} />
        </div>
      );
    else
      return (
        <div className="flex flex-col w-full">
          <Label className="text-primary-900" htmlFor={fields.name}>
            {fields.label}
          </Label>
          <Input
            id={fields.name}
            type={type}
            {...(type === "date" && { max })}
            {...fields}
            {...register(fields.name as MemberFieldNames)}
          />
          <ErrorSpan
            message={errors[fields.name as MemberFieldNames]?.message as string}
          />
        </div>
      );
  };

  return (
    <div>
      <form
        className="mx-auto max-w-287.5"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <h2 className="mb-10 font-normal">Parishioner Form Progress</h2>
        <h5 className="mb-7.5 font-medium">Profile</h5>
        <div className="space-y-12.5">
          {ProfileFields.map((field, index) => {
            if (Array.isArray(field)) {
              return (
                <div key={index} className="flex gap-12.5">
                  {parseInput(field[0])} {parseInput(field[1])}
                </div>
              );
            } else return <div key={index}>{parseInput(field)}</div>;
          })}
          <h5 className="mt-17.5 mb-7.5 font-medium">Home Address</h5>
          {HomeDetails.map((field, index) => {
            if (Array.isArray(field)) {
              return (
                <div key={index} className="flex gap-12.5">
                  {parseInput(field[0])} {parseInput(field[1])}
                </div>
              );
            } else return <div key={index}>{parseInput(field)}</div>;
          })}
          <h5 className="mt-17.5 mb-7.5 font-medium">Work Details</h5>

          {WorkDetails.map((field, index) => {
            if (Array.isArray(field)) {
              return (
                <div key={index} className="flex gap-12.5">
                  {parseInput(field[0])} {parseInput(field[1])}
                </div>
              );
            } else return <div key={index}>{parseInput(field)}</div>;
          })}
          <h5 className="mt-17.5 mb-7.5 font-medium">Parish Details</h5>

          {ParishDetails.map((field, index) => {
            if (Array.isArray(field)) {
              return (
                <div key={index} className="flex gap-12.5">
                  {parseInput(field[0])} {parseInput(field[1])}
                </div>
              );
            } else return <div key={index}>{parseInput(field)}</div>;
          })}
          <h5 className="mt-17.5 mb-7.5 font-medium">Other Details</h5>
          {OtherDetails.map((field, index) => {
            if (Array.isArray(field)) {
              return (
                <div key={index} className="flex gap-12.5">
                  {parseInput(field[0])} {parseInput(field[1])}
                </div>
              );
            } else return <div key={index}>{parseInput(field)}</div>;
          })}
        </div>
        <div className="mt-13.5">
          <p className="font-medium">
            Thank you for taking the time to fill in your details!!!
          </p>
        </div>
        <div className="mt-12.5 text-right">
          <Button
            className="bg-secondary-900 mb-10 px-16.25 py-3.75 font-medium text-white cursor-pointer"
            type="submit"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

const ErrorSpan = ({ message }: { message: string }) => {
  return <span className="text-red-500">{message}</span>;
};

export default Page;
