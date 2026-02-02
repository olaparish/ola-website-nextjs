import { cn } from "@/lib/utils";
import React, { useMemo, useId } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { SelectOption } from "../../../types";

interface SelectProps {
  options: SelectOption[];
}

type Props = React.ComponentProps<"select"> & SelectProps;

const Select = ({ id, name, className, options, ...props }: Props) => {
  const generatedId = useId();
  const selectId = useMemo(
    () => id ?? name ?? generatedId,
    [id, name, generatedId]
  );

  const placeholderText = "-- Select --";

  return (
    <div className="relative">
      <select
        id={selectId}
        name={name}
        ref={props.ref} // 👈 very important for RHF
        onChange={props.onChange} // 👈 RHF's change handler
        onBlur={props.onBlur}
        required={props.required}
        className={cn(
          "flex rounded-10 w-full min-w-0",
          "border",
          "appearance-none",
          "border-secondary-900",
          "bg-transparent",
          "px-2.5 py-3",
          "placeholder:text-sm placeholder:text-secondary-900/50",
          "text-base shadow-regular-x-small",
          "transition-[color,box-shadow] outline-none",
          "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
          "focus-visible:border-primary-900 focus:border",
          "aria-invalid:ring-red-100 dark:aria-invalid:ring-red-200 aria-invalid:border-red-500 aria-invalid:ring-2",
          className,
        )}
        defaultValue="" // 👈 This keeps RHF happy for uncontrolled input
      >
        <option value="" disabled>
          {placeholderText}
        </option>
        {options.map((op, index) => (
          <option key={index} value={op.value}>
            {op.name}
          </option>
        ))}
      </select>
      <label
        htmlFor={selectId}
        className="top-1/2 right-2.5 absolute -translate-y-1/2 pointer-events-none transform"
      >
        <RiArrowDropDownLine className="size-7" />
      </label>
    </div>
  );
};


export default Select;
