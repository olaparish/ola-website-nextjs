import { cn } from "@/lib/utils";
import { ChangeEvent, useState } from "react";
import { CiCamera } from "react-icons/ci";
import { processFile } from "@/utils/fileUtils";
import Image from "next/image";

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
  const [imageUrl, setImageUrl] = useState("");

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    console.log("I am running: ");
    const files = event.target.files;
    const selectedFile = files && files.length > 0 ? files[0] : null;
    if (!selectedFile) return; // user cancelled

    try {
      const parsedFile = await processFile(selectedFile, true);
      if (parsedFile.previewUrl) {
        setImageUrl(parsedFile.previewUrl);
      }
    } catch (error) {
      console.error("Error processing file:", error);
    }
  };

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
        {!imageUrl && (
          <>
            <CiCamera className="size-8" />
            <p className="text-[16px]">{props.placeholder}</p>
          </>
        )}
        {imageUrl && (
          <Image
            width={150}
            height={150}
            src={imageUrl}
            alt="user picture preview"
          />
        )}
      </div>
      <input
        id={name}
        type="file"
        data-slot="input"
        {...props}
        onChange={handleFileChange}
        className={cn("hidden", cn(inputClassName))}
      />
    </label>
  );
}
export { Input, ImageInput };
