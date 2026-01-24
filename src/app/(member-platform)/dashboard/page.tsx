"use client";
import { rangeOptions } from "./data";
import Stats from "@/components/common/stats";
import { ChangeEvent, useState } from "react";
import { RangeOptionId } from "../../../../types";

const Page = () => {
  const [range, setRange] = useState<RangeOptionId>("current_week");

  const rangeChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as RangeOptionId;
    setRange(value);
  };

  return (
    <div>
      <div className="">
        <div className="flex justify-between">
          <header>
            <h2 className="font-normal">Activity Overview</h2>
            <p className="text-secondary-900">Platform details</p>
          </header>

          <div>
            <p className="font-light text-sm">Select a range</p>
            <select
              className="bg-gold-200 px-3 py-2.5 font-medium text-sm"
              onChange={rangeChangeHandler}
            >
              {rangeOptions.map((option, index) => (
                <option value={option.id} key={index}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <Stats range={range} />
      </div>
    </div>
  );
};

export default Page;
