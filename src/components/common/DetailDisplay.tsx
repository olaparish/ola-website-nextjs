"use client";

import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface DetailItemProps {
  label: string;
  value: React.ReactNode;
  icon?: LucideIcon;
  className?: string;
}

export const DetailItem = ({ label, value, icon: Icon, className }: DetailItemProps) => (
  <div className={cn("flex flex-col gap-1", className)}>
    <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">{label}</span>
    <div className="flex items-center gap-2">
      {Icon && <Icon className="w-4 h-4 text-primary-600" />}
      <span className="text-sm font-semibold text-gray-900">{value || "—"}</span>
    </div>
  </div>
);

interface DetailCardProps {
  title: string;
  children: React.ReactNode;
  icon?: LucideIcon;
  className?: string;
}

export const DetailCard = ({ title, children, icon: Icon, className }: DetailCardProps) => (
  <div className={cn("bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden", className)}>
    <div className="px-6 py-4 border-b border-gray-50 flex items-center gap-3 bg-gray-50/50">
      {Icon && <Icon className="w-5 h-5 text-primary-900" />}
      <h3 className="font-bold text-gray-900">{title}</h3>
    </div>
    <div className="p-6">
      {children}
    </div>
  </div>
);
