/* eslint-disable @next/next/no-img-element */
import SigninForm from "@/components/forms/signin-form";

const Page = () => {
  return (
    <div className="flex justify-center items-center lg:gap-15 xl:gap-28.5 h-full">
      <div className="w-100">
        <img
          className="mx-auto w-39 h-16.75"
          src="/logo.webp"
          alt="ola parish logo"
        />
        <h2 className="mt-15 text-primary-900 text-center">
          Sign In to Your Account
        </h2>
        <p className="block mt-2.5 text-center">
          You are signing into
          <br /> this account as a <br />
          <span className="font-bold text-secondary-900">Parish Leader</span>.
        </p>
        <SigninForm type="leader" />
        <div className="mt-15 text-sm text-center">
          <p>Do you have issues</p>
          <p>
            Call us: <span className="font-semibold">+233 55 822 8479</span>
          </p>
        </div>
      </div>
      <img
        className="hidden lg:block h-auto max-h-[calc(100vh-126px)] object-contain"
        src={"/images/auth/signin-hero.png"}
        alt="ola parish pastoral council heads"
      />
    </div>
  );
};

export default Page;
