import React from "react";
import { Spinner } from "./spinner";

const DataFetchSpinner = () => {
  return (
    <div className="top-1/2 left-1/2 absolute flex items-center gap-2 -translate-1/2">
      <span>Fetching Data</span>
      <Spinner color="blue" />
    </div>
  );
};

export default DataFetchSpinner;
