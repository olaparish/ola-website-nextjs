/**
 * Converts an array of objects to a CSV string.
 * @param data Array of objects to convert
 * @param columns Optional array of column definitions (key and label)
 */
export const convertToCSV = (data: any[], columns: { key: string; label: string }[]) => {
  if (!data || !data.length) return "";

  const header = columns.map(col => `"${col.label}"`).join(",");
  const rows = data.map(item => {
    return columns.map(col => {
      let value = getNestedValue(item, col.key);
      
      // Handle special cases
      if (value === null || value === undefined) value = "";
      if (typeof value === "string") {
        // Escape quotes
        value = value.replace(/"/g, '""');
        // Wrap in quotes
        value = `"${value}"`;
      }
      
      return value;
    }).join(",");
  });

  return [header, ...rows].join("\n");
};

/**
 * Gets a value from a nested object using a string path (e.g. "user.profile.name")
 */
const getNestedValue = (obj: any, path: string) => {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
};

/**
 * Triggers a browser download of a CSV file.
 * @param csvContent The CSV string content
 * @param fileName Desired filename (without extension)
 */
export const downloadCSV = (csvContent: string, fileName: string) => {
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  
  link.setAttribute("href", url);
  link.setAttribute("download", `${fileName}_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = "hidden";
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
