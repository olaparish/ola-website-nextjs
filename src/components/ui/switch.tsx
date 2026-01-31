"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onCheckedChange?: (checked: boolean) => void;
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, onCheckedChange, checked, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onCheckedChange?.(e.target.checked);
      props.onChange?.(e);
    };

    return (
      <div className="relative inline-flex items-center group">
        <input
          type="checkbox"
          className="peer sr-only"
          checked={checked}
          onChange={handleChange}
          ref={ref}
          {...props}
        />
        <div
          className={cn(
            "w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-primary-900 transition-colors duration-200",
            "after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white",
            "group-hover:after:scale-105",
            className
          )}
        />
      </div>
    );
  }
);

Switch.displayName = "Switch";

export { Switch };
