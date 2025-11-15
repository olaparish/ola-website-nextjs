import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

const Page = () => {
  return (
    <div className="flex gap-52 mt-29 px-25 w-full">
      <form className="w-full max-w-[720px]">
        <p className="font-medium text-secondary-900">
          Please enter the following information
        </p>
        <div>
          <div className="flex gap-10">
            <div className="flex flex-col w-full">
              <Label className="text-primary-900" htmlFor="date">
                Date
              </Label>
              <Input className="w-full" id="date" name="date" type="date" />
            </div>
            <div className="flex flex-col w-full">
              <Label className="text-primary-900" htmlFor="parishionersNumber">
                Number of Parishioners
              </Label>
              <Input
                className="w-full"
                id="parishionersNumber"
                name="parishionersNumber"
                type="number"
              />
            </div>
          </div>
          <div className="flex flex-col w-full">
            <Label className="text-primary-900" htmlFor="parshionerId">
              Parishioner&apos;s ID
            </Label>
            <Input className="w-full" id="parshionerId" type="text" />
          </div>
        </div>
      </form>
      <div className="hidden lg:block"></div>
    </div>
  );
};

export default Page;
