"use client";
import React, { useState, useEffect } from "react";
import Select from "./Select";
import { SelectOption } from "../../../types";
import TagInput from "./TagInput";

interface Props {
  options: SelectOption[];
  setValue: (values: SelectOption[]) => void;
}

const MultiSelect = ({ options: inputOptions, setValue }: Props) => {
  const [selected, setSelected] = useState<SelectOption[]>([]);
  const [options, setOptions] = useState(inputOptions);
  const [selectValue, setSelectValue] = useState("");

  useEffect(() => {
    setValue(selected);
  }, [selected, setValue]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    const value = options.find((op) => op.value === selectedValue);

    if (!value) return;
    setSelected((prev) => [...prev, value]);
    setOptions((prev) => prev.filter((pr) => pr.name !== value.name));
    setSelectValue("");
  };

  const removeItem = (value: SelectOption) => {
    setSelected((prev) => prev.filter((va) => va.name !== value.name));
    setOptions((prev) => [...prev, value]);
  };
  return (
    <div className="w-full">
      <Select options={options} onChange={handleSelectChange} value={selectValue} />
      <div className="flex flex-wrap gap-2 mt-2">
        {selected.map((value, index) => {
          return (
            <div key={index}>
              <TagInput value={value.name} onClose={() => removeItem(value)} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MultiSelect;
