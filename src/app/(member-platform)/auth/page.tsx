import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-10 px-5 h-dvh">
      <Link
        href="/auth/parishioner/login"
        className="bg-secondary-900 px-2 py-5 w-full md:w-150 overflow-ellipsis font-bold text-white text-xl md:text-3xl text-center truncate"
      >
        I am a Parishioner
      </Link>
      <Link
        href="/auth/leader/login"
        className="bg-secondary-900 px-2 py-5 w-full md:w-150 overflow-ellipsis font-bold text-white text-xl md:text-3xl text-center truncate"
      >
        I am a Parish Leader/Society
      </Link>
    </div>
  );
};

export default Page;
