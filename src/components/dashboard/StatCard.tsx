"use client";

import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  iconClassName?: string;
}

const StatCard = ({
  title,
  value,
  icon: Icon,
  description,
  trend,
  className,
  iconClassName,
}: StatCardProps) => {
  return (
    <div className={cn("bg-white p-6 rounded-xl border shadow-sm hover:shadow-md transition-shadow", className)}>
      <div className="flex items-center justify-between mb-4">
        <div className={cn("p-2 rounded-lg bg-gray-50", iconClassName)}>
          <Icon className="h-6 w-6 text-secondary-900" />
        </div>
        {trend && (
          <span className={cn(
            "text-xs font-medium px-2 py-1 rounded-full",
            trend.isPositive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          )}>
            {trend.isPositive ? "+" : "-"}{trend.value}%
          </span>
        )}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900 mt-1">{value}</h3>
        {description && <p className="text-xs text-gray-400 mt-1">{description}</p>}
      </div>
    </div>
  );
};

export default StatCard;
