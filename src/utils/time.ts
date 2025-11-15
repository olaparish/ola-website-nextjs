function getOrdinalSuffix(day: number): string {
  if (day > 3 && day < 21) return "th"; // 4th–20th
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

type ReturnType = { formattedDate: string; duration: string };

export function formatDateWithDuration(dateString: string | Date): ReturnType {
  const date =
    typeof dateString === "string" ? new Date(dateString) : dateString;
  const now = new Date();

  // 🗓️ Format date as "24th May, 2025"
  const day = date.getDate();
  const suffix = getOrdinalSuffix(day);
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  const formattedDate = `${day}${suffix} ${month}, ${year}`;

  // ⏳ Calculate duration
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMinutes = Math.floor(diffMs / (1000 * 60));

  let duration: string;
  if (diffDays > 0) duration = `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  else if (diffHours > 0)
    duration = `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  else if (diffMinutes > 0)
    duration = `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""} ago`;
  else duration = "just now";

  return { formattedDate, duration };
}
