import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};
const DashboardSectionCard = (props: Props) => {
  return (
    <div
      className={cn(
        "px-2 sm:px-7.5 py-4 border-[1px] border-secondary-900",
        props.className
      )}
    >
      {props.children}
    </div>
  );
};

export default DashboardSectionCard;
