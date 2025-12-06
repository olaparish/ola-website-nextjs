import Image from "next/image";
import Link from "next/link";

const ParishionerHeader = () => {
  return (
    <header className="flex justify-between items-center">
      <div className="flex items-center gap-2 sm:gap-15">
        <Link href={"/home"} className="hidden sm:block">
          <Image
            width={225}
            height={97.5}
            className="w-22.5 h-9.75"
            src="/logo.webp"
            alt="ola parish logo"
          />
        </Link>
        <div className="flex justify-center">
          <div className="shadow-[0_2px_6px_0_rgba(0,0,0,0.1)] px-2 sm:px-11 py-1 sm:py-3.75 font-medium text-sm">
            Dashboard
          </div>
        </div>
      </div>
      <div className="hidden sm:block bg-secondary-900 px-5 py-3 text-white">
        Parishioner
      </div>
    </header>
  );
};

export default ParishionerHeader;
