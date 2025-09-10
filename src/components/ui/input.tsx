import * as React from "react";
import { cn } from "@/lib/utils";
import { CiCamera } from "react-icons/ci";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex rounded-10 w-full min-w-0",
        "border",
        "border-secondary-900",
        "bg-transparent",
        "px-4.5 py-3.5",
        "placeholder:text-sm placeholder:text-secondary-900/50",
        "text-base shadow-regular-x-small",
        "transition-[color,box-shadow] outline-none",
        "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:border-primary-900",
        "aria-invalid:ring-red-100 dark:aria-invalid:ring-red-200 aria-invalid:border-red-500 aria-invalid:ring-2",
        className
      )}
      {...props}
    />
  );
}

interface ImageInputProps {
  inputClassName?: string;
  name: string;
}

type InputProps = React.ComponentProps<"input"> & ImageInputProps;

function ImageInput({ name, className, inputClassName, ...props }: InputProps) {
  return (
    <label
      htmlFor={name}
      className={cn(
        "flex rounded-10 w-full min-w-0",
        "border",
        "border-secondary-900",
        "bg-transparent",
        "px-2.5 py-3",
        "placeholder:text-sm placeholder:text-secondary-900/50",
        "text-base shadow-regular-x-small",
        "transition-[color,box-shadow] outline-none",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:border-primary-900 focus:border",
        "aria-invalid:ring-red-100 dark:aria-invalid:ring-red-200 aria-invalid:border-red-500 aria-invalid:ring-2",
        className
      )}
    >
      <div
        className={cn(
          "w-full min-w-0",
          "px-5 py-4",
          "border border-dashed",
          "flex items-center gap-2.5 font-semibold",
          cn(inputClassName)
        )}
      >
        <CiCamera className="size-8" />
        <p className="text-[16px]">Drop your picture here</p>
      </div>
      <input
        type="file"
        data-slot="input"
        {...props}
        className={cn("hidden", cn(inputClassName))}
      />
    </label>
  );
}
export { Input, ImageInput };
