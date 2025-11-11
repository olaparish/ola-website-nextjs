"use client";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  MemberFieldNames,
  ProfileFields,
  HomeDetails,
  WorkDetails,
  OtherDetails,
} from "./form-fields";
import { Input } from "@/components/ui/input";
import {
  FormFieldsType,
  FormFieldType,
  NewParishionerFormData,
  ParishGroupResponse,
  SelectOption,
} from "../../../../types";
import { Label } from "@/components/ui/label";
import Select from "@/components/ui/Select";
import { Button } from "@/components/ui/button";
import MultiSelect from "@/components/ui/MultiSelect";
import { ImageInput } from "@/components/ui/ImageInput";
import { FileInputType } from "../../../../types/inputs";
import { useMutation, useQuery } from "@tanstack/react-query";
import { parishionerService } from "@/services/parishioner.service";
import { configService } from "@/services/config.service";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { CreateParishionerResponseType } from "../../../../types/parishioner";
import { processFile } from "@/utils/fileUtils";
import { useParishGroupStore } from "@/hooks/useParishGroups";
import { parishGroupsService } from "@/services/parish-groups.service";
import { useRouter } from "next/navigation";
import { ErrorSpan } from "@/components/ui/errors";

const Page = () => {
  const { setGroups, ...parishGroups } = useParishGroupStore();

  const [societies, setSocieties] = useState<string[]>([]);
  const [societiesError, setSocietiesError] = useState<string>("");
  const [files, setFiles] = useState<FileInputType[]>([]);
  const [uploadingMessage, setUploadingMessage] = useState("submit");

  const router = useRouter();

  const {
    data: fetchedParishGroups,
    isLoading,
    isSuccess,
    isError,
  } = useQuery<ParishGroupResponse>({
    queryKey: ["parishGrous"],
    queryFn: parishGroupsService.getGroups,
    retry: 2,
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
      console.log("Parish groups fetched: ", fetchedParishGroups);
      setGroups(fetchedParishGroups);
    } else if (isError) {
      toast.error(
        "Error fetching parish groups. Please refresh the page to try again"
      );
    }
  }, [isSuccess, isError, fetchedParishGroups, setGroups]);

  const parishionerMutation = useMutation<
    CreateParishionerResponseType | void,
    Error,
    NewParishionerFormData
  >({
    mutationFn: async (formData) => {
      try {
        if (!societies.length) {
          setSocietiesError("You must select a value");
          toast.error("You must select atleast one society");
          return;
        }
        setUploadingMessage("Uploading file");
        let fileUrl = "";
        if (files[0]) {
          toast.info("Uploading profile picture");

          const processedFile = await processFile(files[0].file);
          const fileRes = await configService.uploadFile(processedFile.file);
          console.log("Uploaded File: ", fileRes);
          if (fileRes.error || !fileRes.data?.url) {
            toast.error(
              fileRes.error || "Failed to upload image. Please try again."
            );

            return;
          }
          toast.success("Done uploading profile picture");

          fileUrl = fileRes.data?.url;
        }

        setUploadingMessage("Submitting");
        const data = {
          ...formData,
          societies,
          picture: fileUrl,
          password: formData.dateOfBirth,
        };
        if (!data.email?.length) {
          delete data.email;
        }

        console.log("Data: ", data);
        const res = await parishionerService.createParishioner(data);

        console.log("Res: ", res);
        setUploadingMessage("Submit");
        router.push(`/new-parishioner/success/${res.id.split("-")[0]}`);
        return res;
      } catch (e) {
        setUploadingMessage("submit");
        toast.error("Error creating parishioner");
      }
    },
  });

  const handleFormSubmit = (formData: NewParishionerFormData) => {
    parishionerMutation.mutate(formData);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewParishionerFormData>({
    // resolver: zodResolver(MemberProfileSchema),
  });

  const handleSocietiesChange = useCallback((values: SelectOption[]) => {
    if (values.length) {
      setSocietiesError("");
    } else setSocietiesError("You must select a value");
    setSocieties(values.map((value) => value.value));
  }, []);

  const handleFileChange = (files: FileInputType[]) => {
    setFiles(files);
  };

  const ParishDetails: FormFieldsType = [
    [
      {
        type: "select",
        name: "stationId",
        label: "Station",
        required: true,
        options: [
          ...parishGroups.outstations.map((station) => {
            return { name: station.name, value: station.id };
          }),
          // { name: "N/A", value: "N/A" },
        ],
      },
      {
        type: "select",
        name: "communityId",
        label: "Community",
        required: true,
        options: [
          ...parishGroups.communities.map((community) => {
            return { name: community.name, value: community.id };
          }),
          // { name: "N/A", value: "N/A" },
        ],
      },
    ],
    {
      type: "multi-select",
      name: "society",
      label: "Societies",
      required: true,
      options: [
        ...parishGroups.societies.map((society) => {
          return { name: society.name, value: society.id };
        }),
        { name: "N/A", value: "N/A" },
      ],
    },
  ];

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
            }`}
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
        className="mx-4 md:mx-10 xl:mx-auto max-w-287.5"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <h2 className="mb-10 font-normal">Parishioner Form Progress</h2>
        <h5 className="mb-7.5 font-medium">Profile</h5>
        <div className="space-y-12.5">
          {ProfileFields.map((field, index) => {
            if (Array.isArray(field)) {
              return (
                <div key={index} className="flex sm:flex-row flex-col gap-12.5">
                  {parseInput(field[0])} {parseInput(field[1])}
                </div>
              );
            } else return <div key={index}>{parseInput(field)}</div>;
          })}
          <h5 className="mt-17.5 mb-7.5 font-medium">Home Address</h5>
          {HomeDetails.map((field, index) => {
            if (Array.isArray(field)) {
              return (
                <div key={index} className="flex sm:flex-row flex-col gap-12.5">
                  {parseInput(field[0])} {parseInput(field[1])}
                </div>
              );
            } else return <div key={index}>{parseInput(field)}</div>;
          })}
          <h5 className="mt-17.5 mb-7.5 font-medium">Work Details</h5>
          {WorkDetails.map((field, index) => {
            if (Array.isArray(field)) {
              return (
                <div key={index} className="flex sm:flex-row flex-col gap-12.5">
                  {parseInput(field[0])} {parseInput(field[1])}
                </div>
              );
            } else return <div key={index}>{parseInput(field)}</div>;
          })}
          <h5 className="mt-17.5 mb-7.5 font-medium">Parish Details</h5>
          {ParishDetails.map((field, index) => {
            if (Array.isArray(field)) {
              return (
                <div key={index} className="flex sm:flex-row flex-col gap-12.5">
                  {parseInput(field[0])} {parseInput(field[1])}
                </div>
              );
            } else return <div key={index}>{parseInput(field)}</div>;
          })}
          <h5 className="mt-17.5 mb-7.5 font-medium">Other Details</h5>
          {OtherDetails.map((field, index) => {
            if (Array.isArray(field)) {
              return (
                <div key={index} className="flex sm:flex-row flex-col gap-12.5">
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
        <div className="mt-12.5 text-center sm:text-right">
          <Button
            className="bg-secondary-900 mb-10 sm:px-16.25 sm:py-3.75 font-medium text-white cursor-pointer"
            type="submit"
            disabled={parishionerMutation.isPending}
          >
            <div className="flex items-center gap-2">
              <span>{uploadingMessage}</span>
              {parishionerMutation.isPending && <Spinner className="size-4" />}
            </div>
          </Button>
        </div>
      </form>
    </div>
  );
};


export default Page;
