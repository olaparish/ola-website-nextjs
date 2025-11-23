/* eslint-disable @next/next/no-img-element */
import React from "react";
import CustomLink from "../ui/custom-link";

const Societies = () => {
  return (
    <div className="flex lg:flex-row flex-col-reverse lg:justify-center gap-10 lg:gap-22 p-5 lg:p-25 lg:text-left text-center">
      <div>
        <h5 className="text-primary-900">FELLOWSHIP</h5>
        <h2 className="mt-5 text-primary-900">Societies</h2>
        <p className="mt-7.5 lg:w-120 xl:w-153">
          Our parish is home to a vibrant community with numerous societies and
          groups that foster spiritual growth, fellowship, and service. From
          prayer groups to charitable organizations, there is a place for
          everyone to get involved and share their talents for the glory of God
          and the benefit of our community.{" "}
        </p>
        <div className="mt-10 mb-7.5">
          <CustomLink to="about/societies">Learn More</CustomLink>
        </div>
      </div>
      <img
        className="lg:w-120 xl:w-148 lg:h-92.25 xl:h-92.25 size-auto"
        src="/images/welcome/sacraments.webp"
        alt="catholic sacraments"
      />
    </div>
  );
};

export default Societies;
