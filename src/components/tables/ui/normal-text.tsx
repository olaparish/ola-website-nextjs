import { cn } from "@/lib/utils";
import React from "react";

type Props = { text: string; className?: string };
const TableText = ({ text, className }: Props) => {
  return (
    <span
      className={cn(
        className,
        "overflow-hidden truncate text-ellipsis whitespace-nowrap"
      )}
    >
      {text}
    </span>
  );
};

export default TableText;
