import React from "react";

const DataFetchError = ({
  message = "Error Fetching Data",
}: {
  message?: string;
}) => {
  return (
    <div className="top-1/2 left-1/2 absolute flex items-center gap-2 -translate-1/2">
      <span className="font-bold text-red-600">{message}</span>
    </div>
  );
};

export default DataFetchError;
