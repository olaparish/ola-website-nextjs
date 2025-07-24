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
          It has survived not only five centuries, but also the leap into
          electronic typesetting, remaining essentially unchanged. It was
          popularised in the 1960s with the release of Letraset sheets
          containing Lorem Ipsum passages, and more recently with desktop
          publishing software like Aldus PageMaker including versions of Lorem
          Ipsum. Lorem Ipsum has been the industry&lsquo;s standard dummy text
          ever since the 1500s, when an unknown printer took a galley of type
          and scrambled it to make a type specimen book.{" "}
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
