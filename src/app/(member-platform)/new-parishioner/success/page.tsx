"use client";
import { IconCheckboxMultiMarked } from "@/components/icons/checkbox-multiple-marked-outline";
import CustomLink from "@/components/ui/custom-link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5); // start from 5 seconds

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    const timer = setTimeout(() => {
      router.push("/auth/signin");
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [router]);

  return (
    <div className="h-screen">
      <div className="flex flex-col justify-center items-center bg-secondary-900 h-full">
        <IconCheckboxMultiMarked className="size-16 text-white" />

        <p className="mx-auto mt-3 w-89 font-medium text-white text-2xl text-center">
          Thank you for submitting the Parishioner Form!!
        </p>

        {/* Styled countdown text */}
        <p className="mx-auto mt-3 w-89 font-medium text-secondary-100 text-white text-xl text-center italic">
          You will be redirected to the login page in{" "}
          <span className="font-bold text-primary-500">{countdown}</span> second
          {countdown !== 1 && "s"}.
        </p>

        <CustomLink
          className="bg-secondary-900 hover:bg-secondary-900/50 mt-6 border-2 border-white font-medium text-secondary-900"
          to="/auth/signin"
        >
          Sign in
        </CustomLink>
      </div>
    </div>
  );
};

export default Page;
