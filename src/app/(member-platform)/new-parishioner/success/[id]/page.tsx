"use client"
import { IconCheckboxMultiMarked } from "@/components/icons/checkbox-multiple-marked-outline";
import CustomLink from "@/components/ui/custom-link";
import { useParams } from "next/navigation";

const Page = () => {

  const userId = useParams().id;
  

  return (
    <div className="h-screen">
      <div className="bg-secondary-900 h-full">
        <div className="flex flex-col justify-center items-center mx-auto h-full">
          <IconCheckboxMultiMarked className="size-16 text-white" />
          <p className="mx-auto mt-3 w-89 font-medium text-white text-2xl text-center">
            Thank you for submitting the Parishioner Form!!
          </p>

          <div className="mt-4">
            <p className="w-89 text-white text-center">
              Kindly note your ID below. Your ID is your unique identification
              which will be used for all things in the parish.
            </p>

            <p className="block my-15 text-white text-4xl">
              <strong>Your ID:</strong> {userId}
            </p>
          </div>

          <CustomLink
            className="bg-secondary-900 hover:bg-secondary-900/50 border-2 border-white font-medium text-secondary-900"
            to="/auth/parishioner/login"
          >
            Sign in
          </CustomLink>
        </div>
      </div>
    </div>
  );
};

export default Page;
