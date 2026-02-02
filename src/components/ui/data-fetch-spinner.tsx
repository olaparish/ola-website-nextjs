import { Spinner } from "./spinner";

type Props = { message?: string };
const DataFetchSpinner = ({ message = "Fetching Data" }: Props) => {
  return (
    <div className="top-1/2 left-1/2 absolute flex items-center gap-2 -translate-1/2">
      <span>{message}</span>
      <Spinner color="blue" />
    </div>
  );
};

export default DataFetchSpinner;
