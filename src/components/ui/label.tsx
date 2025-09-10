"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface Props {
  htmlFor: string;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

function Label({ children, className, ...props }: Props) {
  return (
    <label
      data-slot="label"
      className={cn(
        "flex items-center gap-2 group-data-[disabled=true]:opacity-50 peer-disabled:opacity-50 mb-1.5 font-medium text-[16px] text-secondary-900 leading-none peer-disabled:cursor-not-allowed group-data-[disabled=true]:pointer-events-none select-none",
        className
      )}
      {...props}
    >
      {children}
    </label>
  );
}

export { Label };
