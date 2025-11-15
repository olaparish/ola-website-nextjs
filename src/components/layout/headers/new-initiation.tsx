import Link from "next/link";

const NewInitiationHeader = () => {
  return (
    <header className="flex justify-between items-center">
      <div className="flex items-center gap-15">
        <h3 className="font-normal text-20">New Members’ details</h3>
      </div>
      <Link
        href="/parish-group/dashboard"
        className="block bg-secondary-900 px-5 py-3 text-white cursor-pointer"
      >
        Exit
      </Link>
    </header>
  );
};

export default NewInitiationHeader;
