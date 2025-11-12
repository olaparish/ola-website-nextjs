import Image from "next/image";
import Link from "next/link";

const ParishGroupsHeader = () => {
 return (
   <header className="flex justify-between items-center">
     <div className="flex items-center gap-15">
       <Link href={"/home"}>
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
     <div className="bg-secondary-900 px-5 py-3 text-white">Parish Group</div>
   </header>
 );
}

export default ParishGroupsHeader