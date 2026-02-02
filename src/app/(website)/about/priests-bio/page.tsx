"use client";
import { User } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { PriestUser } from "../../../../../types";
import { priestService } from "@/services/priest.service";
import { toast } from "sonner";
import { ErrorSpan } from "@/components/ui/errors";
import { Spinner } from "@/components/ui/spinner";
import Image from "next/image";

const Page = () => {
  const { data, isLoading, isError } = useQuery<PriestUser[]>({
    queryKey: ["priests", "current"],
    queryFn: async () => {
      const priests = await priestService.getCurrentPriests();
      if (!priests) {
        toast.error("Priests not found");
      }
      toast.success("Priests Fetched");
      console.log("Priest: ", priests);
      return priests;
    },
    refetchOnWindowFocus: false,
  });

  const getPriestName = (priest: PriestUser) => {
    return `${priest.title} ${priest.user.firstName} ${priest.user.lastName} ${priest.user.otherNames}`;
  };

  if (isError)
    return (
      <div className="flex justify-center items-center w-full">
        <ErrorSpan message="Error fetching Priests" className="" />
      </div>
    );

  if (isLoading)
    return (
      <div className="flex justify-center items-center w-full">
        <Spinner className="size-10" />
      </div>
    );

  return (
    <div className="space-y-20">
      {data?.map((priest, indx) => {
        return (
          <div key={indx}>
            <h2 className="font-medium">
              {getPriestName(priest)}
              <br />
              {priest.designation}
            </h2>

            <div className="flex flex-col-reverse gap-9 xl:grid xl:grid-cols-2 mt-9">
              <div className="w-full">
                <p>{priest.bio}</p>

                <p></p>
              </div>
              <div className="flex justify-center items-center rounded-lg w-full xl:size-100">
                {priest.user.avatar ? (
                  <Image
                    width={400}
                    height={400}
                    src={priest.user.avatar as string}
                    alt={getPriestName(priest)}
                    className="w-full xl:w-100 xl:h-100 object-cover"
                  />
                ) : (
                  <User className="w-24 h-24 text-gray-400" />
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Page;

// const renderPriest = ({
//   name,
//   designation,
//   bio = "Biography coming soon...",
//   indx,
// }: Priest) => {
//   return (
//     <div>
//       <h2 className="font-medium">
//         {name}
//         <br />
//         {designation}
//       </h2>

//       <div
//         key={indx}
//         className="flex flex-col-reverse gap-9 xl:grid xl:grid-cols-2 mt-9"
//       >
//         <div className="w-full">
//           <p>{bio}</p>

//           <p></p>
//         </div>
//         <div className="flex justify-center items-center bg-gray-200 rounded-lg w-full h-[300px]">
//           <User className="w-24 h-24 text-gray-400" />
//         </div>
//       </div>
//     </div>
//   );
// };

// const priests = [
//   {
//     name: "Very Rev. Fr. Lawrence Azure",
//     designation: "Parish Priest",
//     bio: "Very Reverend Father Lawrence Azure serves as the Parish Priest of Our Lady Queen of Africa (OLA) Parish in Bolgatanga and the Vicar General of the Catholic Diocese of Navrongo-Bolgatanga. Born in Zebilla, he was ordained in 1998 and recently celebrated his Silver Jubilee in the priesthood. With a rich history of service including roles as Dean of the Bolgatanga Deanery and Chaplain for various educational institutions, Fr. Azure brings a wealth of experience and spiritual fatherhood to the OLA community. He is dedicated to shepherding the flock with wisdom and compassion, guiding the parish in its mission of evangelization and community building.",
//   },
//   {
//     name: "Rev. Fr. Roch Akolgo",
//     designation: "First Curate",
//     bio: "Reverend Father Roch Akolgo serves as the First Curate of OLA Parish. In his ministry, he collaborates closely with the Parish Priest to administer the sacraments and provide pastoral care to the faithful. Known for his dedication to the church's mission, Fr. Roch plays a vital role in the spiritual life of the parish, engaging with various church groups and visiting the sick and homebound. His commitment to the Gospel and his approachable nature make him a beloved figure among the parishioners.",
//   },
//   {
//     name: "Rev. Fr. Vincent Duk",
//     designation: "Second Curate",
//     bio: "Reverend Father Vincent Duk acts as the Second Curate, supporting the pastoral team in serving the vibrant community of OLA Parish. He is instrumental in the daily administration of the parish, celebration of the Mass, and religious education programs. Fr. Vincent is passionate about youth ministry and encouraging the faithful to deepen their relationship with Christ. His devotion and service are a source of inspiration, helping to foster a welcoming and active parish environment.",
//   },
// ];
