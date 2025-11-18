export const ErrorSpan = ({
  message,
  className = "",
}: {
  message: string;
  className?: string;
}) => {
  return <span className={`text-red-500 ${className}`}>{message}</span>;
};
