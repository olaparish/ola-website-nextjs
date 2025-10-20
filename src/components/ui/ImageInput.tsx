import { cn } from "@/lib/utils";
import { ChangeEvent, useRef, useState } from "react";
import { CiCamera } from "react-icons/ci";
import { processFile } from "@/utils/fileUtils";
import Image from "next/image";
import { FileInputType } from "../../../types/inputs";

interface ImageInputProps {
  name: string;
  inputClassName?: string;
  className?: string;
  placeholder?: string;
  multiple?: boolean;
  changeHandler?: (files: FileInputType[]) => void;
}

type Props = React.ComponentProps<"input"> & ImageInputProps;

export function ImageInput({
  name,
  className,
  inputClassName,
  placeholder,
  multiple = false,
  changeHandler,
  ...props
}: Props) {
  const [files, setFiles] = useState<FileInputType[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    if (files.length === 0) return;

    try {
      const processedFiles: FileInputType[] = await Promise.all(
        files.map(async (file) => {
          const parsed = await processFile(file, true);
          return { file, url: parsed };
        })
      );

      setFiles(processedFiles);
      changeHandler?.(processedFiles);
    } catch (error) {
      console.error("Error processing files:", error);
    } finally {
      props.onChange?.(event);
    }
  };

  const handleRemoveFile = (file: FileInputType) => {
    setFiles((prev) => {
      const updatedFiles = prev.filter((fi) => fi !== file);
      changeHandler?.(updatedFiles);
      return updatedFiles;
    });
    if (fileRef.current) fileRef.current.value = ""; // clear file input
  };

  return (
    <label
      htmlFor={name}
      className={cn(
        "flex bg-transparent border border-secondary-900 rounded-10 w-full min-w-0",
        "px-2.5 py-3 text-base shadow-regular-x-small outline-none transition-[color,box-shadow]",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:border-primary-900 aria-invalid:border-red-500 aria-invalid:ring-2",
        className
      )}
    >
      <div
        className={cn(
          "flex flex-wrap items-center gap-3 px-5 py-4 border border-dashed w-full min-w-0 font-semibold",
          inputClassName
        )}
      >
        {files.length === 0 ? (
          <>
            <CiCamera className="size-8" />
            <p className="text-[16px]">{placeholder}</p>
          </>
        ) : (
          files.map((file, idx) => (
            <div key={idx}>
              <FilePreview file={file} handleRemoveFile={handleRemoveFile} />
            </div>
          ))
        )}
      </div>
      <input
        id={name}
        name={name}
        type="file"
        className="hidden"
        multiple={multiple}
        {...props}
        ref={(e) => {
          // Pass to react-hook-form's register ref (if it exists)
          if (typeof props.ref === "function") {
            props.ref(e);
          } else if (props.ref && "current" in props.ref) {
            (
              props.ref as React.MutableRefObject<HTMLInputElement | null>
            ).current = e;
          }

          // Store your own local ref
          fileRef.current = e;
        }}
        onChange={handleFileChange}
      />
    </label>
  );
}

interface FilePreviewProps {
  file: FileInputType;
  handleRemoveFile: (file: FileInputType) => void;
}

const FilePreview = ({ handleRemoveFile, file }: FilePreviewProps) => {
  return (
    <div className="flex flex-col items-center">
      <Image
        width={120}
        height={120}
        src={file.url.previewUrl as string}
        alt={file.file.name}
        className="rounded-md object-cover"
      />

      <div className="flex items-center gap-2 mt-2">
        <div className="bg-primary-900 px-4 py-2 w-fit font-medium text-white text-xs">
          change
        </div>
        <div
          className="bg-red-500 px-4 py-2 w-fit font-medium text-white text-xs"
          onClick={(e) => {
            e.preventDefault();
            handleRemoveFile(file);
          }}
        >
          remove
        </div>
      </div>
    </div>
  );
};
