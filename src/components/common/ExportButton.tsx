"use client";

import { Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { convertToCSV, downloadCSV } from "@/utils/csv.utils";
import { useState } from "react";
import { toast } from "sonner";

interface ExportButtonProps {
  data: any[];
  columns: { key: string; label: string }[];
  fileName: string;
  className?: string;
  variant?: "default" | "outline" | "ghost" | "link";
  label?: string;
}

export const ExportButton = ({
  data,
  columns,
  fileName,
  className,
  variant = "outline",
  label = "Export CSV",
}: ExportButtonProps) => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    if (!data || data.length === 0) {
      toast.error("No data available to export");
      return;
    }

    try {
      setIsExporting(true);
      // Small artificial delay to show state if it's too fast
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const csvContent = convertToCSV(data, columns);
      downloadCSV(csvContent, fileName);
      
      toast.success(`${fileName} exported successfully`);
    } catch (error) {
      console.error("Export failed:", error);
      toast.error("Failed to export data");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button
      variant={variant}
      size="sm"
      className={className}
      onClick={handleExport}
      disabled={isExporting || !data || data.length === 0}
    >
      {isExporting ? (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      ) : (
        <Download className="w-4 h-4 mr-2" />
      )}
      {label}
    </Button>
  );
};
