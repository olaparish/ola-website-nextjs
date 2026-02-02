/* eslint-disable @next/next/no-img-element */
import SetPasswordForm from "@/components/forms/set-password-form";
import { Suspense } from "react";

const Page = () => {
  return (
    <div className="flex justify-center items-center h-dvh">
      <div className="w-100">
        <img
          className="mx-auto w-39 h-16.75"
          src="/logo.webp"
          alt="ola parish logo"
        />
        <h2 className="mt-15 text-primary-900 text-center">
          Set Your Account Password
        </h2>
        {/* <p className="block mt-2.5 text-center">
          You are signing into
          <br /> this account as a <br />
          <span className="font-bold text-secondary-900">Parish Leader</span>.
        </p> */}
        <Suspense fallback={<div>Loading...</div>}>
          <SetPasswordForm />
        </Suspense>
        <div className="mt-15 text-sm text-center">
          <p>Do you have issues</p>
          <p>
            Call us: <span className="font-semibold">+233 55 822 8479</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
