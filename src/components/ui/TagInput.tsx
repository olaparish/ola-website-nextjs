"use client";
import React from "react";
import { IoMdClose } from "react-icons/io";

type Props = { value: string; onClose?: (value: string) => void };
const TagInput = ({ value, onClose }: Props) => {
  const handleClose = () => {
    if (onClose) {
      onClose(value);
    }
  };
  return (
    <div className="flex items-center gap-2 bg-primary-900 px-2 py-1 rounded-lg w-fit max-w-xs">
      <p className="text-white truncate">{value}</p>
      <IoMdClose
        color="#fff"
        className="size-4 cursor-pointer shrink-0"
        onClick={handleClose}
      />
    </div>
  );
};

export default TagInput;
