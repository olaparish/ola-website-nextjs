"use client";

import { LucideIcon, Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  actionLabel?: string;
  onAction?: () => void;
  actionIcon?: LucideIcon;
  className?: string;
}

export const PageHeader = ({
  title,
  subtitle,
  icon: Icon,
  searchValue,
  onSearchChange,
  searchPlaceholder = "Search...",
  actionLabel,
  onAction,
  actionIcon: ActionIcon = Plus,
  className,
}: PageHeaderProps) => {
  return (
    <div className={cn("flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8", className)}>
      <div className="flex items-center gap-3">
        {Icon && (
          <div className="p-2 bg-primary-100 rounded-lg">
            <Icon className="w-6 h-6 text-primary-900" />
          </div>
        )}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-3">
        {onSearchChange !== undefined && (
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={searchPlaceholder}
              className="pl-10 h-10 bg-white border-gray-200 focus:border-primary-500 focus:ring-primary-500 rounded-lg"
            />
          </div>
        )}
        
        {actionLabel && onAction && (
          <Button
            onClick={onAction}
            className="w-full sm:w-auto h-10 bg-primary-900 hover:bg-primary-800 text-white flex items-center gap-2 px-4 rounded-lg transition-colors"
          >
            <ActionIcon className="w-4 h-4" />
            <span>{actionLabel}</span>
          </Button>
        )}
      </div>
    </div>
  );
};
