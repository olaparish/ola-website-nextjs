import React, { Fragment } from "react";
import { Label } from "./label";
import { Input } from "./input";
import { FormFieldType } from "../../../types";
import { cn } from "@/lib/utils";
import { ErrorSpan } from "./errors";
import Select from "./Select";

interface Props extends FormFieldType {
  isEditing: boolean;
  className?: string;
  errorMessage?: string;
}
const EditableTextInput = ({
  max,
  type,
  isEditing,
  className,
  errorMessage,
  ...fields
}: Props) => {
  return (
    <div className={cn("flex flex-col w-full", className)}>
      <Label className="text-secondary-900" htmlFor={fields.name}>
        {fields.label}
      </Label>
      {isEditing && (
        <Fragment>
          {type === "select" && fields.options?.length ? (
            <Select id={fields.name} options={fields.options} {...fields} />
          ) : (
            <Input
              id={fields.name}
              type={type}
              {...(type === "date" && { max })}
              {...fields}
            />
          )}
          <ErrorSpan message={errorMessage || ""} />
        </Fragment>
      )}
      {!isEditing && <p className="font-light text-sm">{fields.placeholder}</p>}
    </div>
  );
};

export default EditableTextInput;
