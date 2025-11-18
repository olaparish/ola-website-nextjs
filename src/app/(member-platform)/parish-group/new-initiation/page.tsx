"use client";
import { IconFluentDelete } from "@/components/icons/icon-fluent-delete";
import { Button } from "@/components/ui/button";
import { ErrorSpan } from "@/components/ui/errors";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { parishGroupService } from "@/services/parish-groups.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import {
  CreateInitiationDto,
  GetUserDetails,
  Parishioner,
} from "../../../../../types";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { groupInitiationService } from "@/services/group-initiation.service";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const [idError, setIdError] = useState("");
  const [users, setUsers] = useState<string[]>([]);
  const [parsedUsers, setParsedUsers] = useState<string[]>([]);
  const [parishionersNum, setParishionersNum] = useState<number>(0);

  const bottomRef = useRef<HTMLDivElement>(null);
  const parishionersIDRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const { mutate, isPending, isError } = useMutation({
    mutationFn: async (dto: CreateInitiationDto) => {
      try {
        const res = await groupInitiationService.createInitiation(dto);
        if (!res.id) {
          throw new Error("Failed to create initiatio");
        } else {
          toast.success("Initiation saved");
          // router.back();
        }
      } catch (error) {
        toast.error("Failed to save initiation");
      }
    },
  });

  const onDelete = (id: string) => {
    setUsers((prev) => prev.filter((u) => u !== id));
  };
  const addElementHandler = () => {
    const pID = parishionersIDRef.current?.value;

    if (!pID) {
      setIdError("Please enter an ID");
      return;
    }
    setIdError("");
    setUsers((prev) => {
      if (prev.includes(pID)) return prev;

      return [...prev, pID];
    });
    parishionersIDRef.current!.value = "";
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const formSubmithandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dateString = dateRef.current?.value;
    if (!dateString) {
      toast.error("Please enter an initiation date");
      return;
    }
    const [year, month, day] = dateString.split("-");
    const initiationDate = new Date(
      Number(year),
      Number(month) - 1,
      Number(day)
    );

    const dto: CreateInitiationDto = {
      initiationDate: new Date(initiationDate),
      numberOfParishioners: parishionersNum,
      parishioners: parsedUsers,
    };

    mutate(dto);
  };

  const updateParsedUser = (userId: string, type: "delete" | "add") => {
    if (type === "add")
      setParsedUsers((prev) => {
        if (prev.includes(userId)) return prev;

        return [...prev, userId];
      });
    else {
      setParsedUsers((prev) => prev.filter((p) => p !== userId));
    }
  };

  return (
    <div className="flex justify-center gap-52 mt-10 lg:mt-29 md:px-5 w-full">
      <form className="w-full max-w-[720px]" onSubmit={formSubmithandler}>
        <p className="font-medium text-secondary-900">
          Please enter the following information
        </p>
        <div className="mt-15">
          <div className="flex gap-10">
            <div className="flex flex-col w-full">
              <Label className="text-primary-900" htmlFor="date">
                Date
              </Label>
              <Input
                ref={dateRef}
                className="w-full"
                id="date"
                name="date"
                type="date"
              />
            </div>
            <div className="flex flex-col w-full">
              <Label className="text-primary-900" htmlFor="parishionersNumber">
                Number of Parishioners
              </Label>
              <Input
                onChange={(e) => setParishionersNum(Number(e.target.value))}
                className="w-full"
                id="parishionersNumber"
                name="parishionersNumber"
                type="number"
              />
            </div>
          </div>

          <div className="flex flex-col mt-12.5 w-full">
            <Label className="text-primary-900" htmlFor="parshionerId">
              Parishioner&apos;s ID
            </Label>
            <div className="gap-4 grid grid-cols-[4fr_1fr] lg:grid-cols-[6fr_1fr] w-full">
              <Input
                ref={parishionersIDRef}
                className="w-full"
                id="parshionerId"
                type="text"
              />
              <Button
                className="bg-secondary-900 sm:px-16.25 sm:py-3.75 h-auto font-medium text-white cursor-pointer"
                type="button"
                onClick={addElementHandler}
                disabled={isPending}
              >
                Add
              </Button>
            </div>
            <ErrorSpan message={idError} />
          </div>

          <div className="relative mt-6 px-4.25 pt-3.25 pb-7 border-[1px] border-secondary-900 w-full h-75 overflow-auto no-scrollbar">
            {!users.length && (
              <div className="top-1/2 left-1/2 absolute text-center -translate-1/2">
                Add a parishioner ID to see their details here
              </div>
            )}
            {users.map((user, index) => (
              <div key={index}>
                <AddedParishioner
                  id={user}
                  onRemove={onDelete}
                  index={index + 1}
                  updateParsedUsers={updateParsedUser}
                />
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
        </div>
        <div className="flex justify-end mt-12">
          <Button
            className="bg-secondary-900 sm:px-16.25 sm:py-3.75 font-medium text-white cursor-pointer"
            type="submit"
            disabled={parishionersNum !== parsedUsers.length || isPending}
          >
            Save
          </Button>
        </div>
        {isError && (
          <ErrorSpan
            className="block mt-4"
            message="Failed to create new initiation. Please try again later"
          />
        )}
      </form>
      <div className="hidden lg:block">
        <Image
          width={220}
          height={95}
          className=""
          src="/logo.webp"
          alt="ola parish logo"
        />
        <p className="block mt-15 w-43.5 font-medium text-dark-900 text-xl">
          Join The Catholic Faith, Celebrate A Welcoming Community
        </p>

        <Image
          width={367}
          height={245}
          className="mt-18.75"
          src="/images/organisations/new-initiation.png"
          alt="ola parish a person holding a Rosary and a Bible"
        />
      </div>
    </div>
  );
};

interface AddedParishionerProps {
  id: string;
  index: number;
  onRemove: (id: string) => void;
  updateParsedUsers: (userId: string, type: "delete" | "add") => void;
}
const AddedParishioner = (props: AddedParishionerProps) => {
  const { isLoading, isError, data, isSuccess } = useQuery<
    GetUserDetails<Parishioner>
  >({
    queryKey: ["parish-group", "initiation", props.id],
    queryFn: async () => {
      try {
        const data = await parishGroupService.getUser(props.id);
        if (data?.userData.id)
          props.updateParsedUsers(data?.userData.id, "add");

        toast.info(`User with ID ${props.id} found`);

        return data;
      } catch (error) {
        toast.error(`User with ID ${props.id} not found`);
        throw new Error("User not found");
      }
    },
  });

  const removeUser = () => {
    if (data?.userData.id) props.updateParsedUsers(data?.userData.id, "delete");
    props.onRemove(props.id);
  };

  if (!isSuccess)
    return (
      <div className="grid grid-cols-[50px_150px_200px_50px_250px] pt-2 pb-4 border-b-[1px] min-w-max">
        <span className="inline-block mr-7.5">{props.index}</span>
        <span className="inline-block mr-15">{props.id}</span>
        {isError && <span className="text-red-500">User not found</span>}
        {isError && (
          <IconFluentDelete
            onClick={removeUser}
            className="stroke-red-500 size-5 cursor-pointer"
          />
        )}
        {isLoading && (
          <div>
            Loading user <Spinner />{" "}
          </div>
        )}
      </div>
    );

  return (
    <div className="grid grid-cols-[50px_150px_150px_150px_150px_50px] pt-2 pb-4 border-b-[1px] w-full min-w-max">
      <span className="inline-block mr-7.5">{props.index}</span>
      <span className="inline-block mr-15">{data.user.id.slice(0, 8)}</span>
      <span className="inline-block mr-12.5">{data.user.firstName}</span>
      <span className="inline-block mr-12.5">{data.user.lastName}</span>
      <span className="inline-block mr-12.5">{data.user.otherNames}</span>
      <IconFluentDelete
        onClick={removeUser}
        className="stroke-red-500 size-5 cursor-pointer"
      />
    </div>
  );
};

export default Page;
