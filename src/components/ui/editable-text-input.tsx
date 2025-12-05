import React, { Fragment } from "react";
import { Label } from "./label";
import { Input } from "./input";
import { FormFieldType, SelectOption } from "../../../types";
import { cn } from "@/lib/utils";
import { ErrorSpan } from "./errors";
import Select from "./Select";
import MultiSelect from "./MultiSelect";

export interface EditableTextProps extends FormFieldType {
  isEditing: boolean;
  className?: string;
  errorMessage?: string;
  isEditable?: boolean;
  setValue?: (values: SelectOption[]) => void;
}
const EditableTextInput = ({
  max,
  type,
  isEditing,
  className,
  errorMessage,
  isEditable = true,
  multiSelectValues,
  setValue,
  ...fields
}: EditableTextProps) => {
  const showInputs = isEditing && isEditable;
  const setMultiSelectValue = (values: SelectOption[]) => {
    if (setValue) {
      setValue(values);
    }
  };
  return (
    <div className={cn("flex flex-col w-full", className)}>
      <Label className="text-secondary-900" htmlFor={fields.name}>
        {fields.label}
      </Label>
      {showInputs && (
        <Fragment>
          {type === "select" && fields.options?.length ? (
            <Select id={fields.name} options={fields.options} {...fields} />
          ) : type === "multi-select" ? (
            <MultiSelect
              id={fields.name}
              {...fields}
              options={fields.options || []}
              initialValues={multiSelectValues}
              setValue={setMultiSelectValue}
            />
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
      {/* {} */}
      {!showInputs && type === "multi-select" && multiSelectValues && (
        <ul>
          {multiSelectValues.map((v, index) => (
            <li key={index}>
              {<p className="font-light text-sm">{v.name}</p>}
            </li>
          ))}
        </ul>
      )}
      {!showInputs && type !== "multi-select" && (
        <p className="font-light text-sm truncate text-ellipsis">
          {fields.placeholder || "null"}
        </p>
      )}
    </div>
  );
};

export default EditableTextInput;
