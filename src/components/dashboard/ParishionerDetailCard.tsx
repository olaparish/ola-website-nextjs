"use client";

import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { LucideIcon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ParishionerDetailCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  children: ReactNode;
  isEditing: boolean;
  onEditToggle: () => void;
  isPending?: boolean;
  onSave?: () => void;
  className?: string;
  iconColor?: string;
}

export const ParishionerDetailCard = ({
  title,
  description,
  icon: Icon,
  children,
  isEditing,
  onEditToggle,
  isPending = false,
  className,
  iconColor = "bg-primary-50 text-primary-900"
}: ParishionerDetailCardProps) => {
  return (
    <div className={cn(
      "bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-500",
      className
    )}>
      <div className="p-6 md:p-8 border-b border-gray-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gray-50/30">
        <div className="flex items-center gap-4">
          <div className={cn("p-3 rounded-xl", iconColor)}>
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-500 mt-1">{description}</p>
          </div>
        </div>
        
        <Button
          type="button"
          variant={isEditing ? "outline" : "default"}
          onClick={onEditToggle}
          className={cn(
            "rounded-xl font-bold transition-all",
            !isEditing && "bg-primary-900 hover:bg-primary-800 shadow-lg shadow-primary-900/10"
          )}
          disabled={isPending}
        >
          {isEditing ? "Cancel Editing" : "Update Details"}
        </Button>
      </div>

      <div className="p-6 md:p-8">
        {children}
      </div>
    </div>
  );
};
