import React from "react";
import CustomLink from "../ui/custom-link";

const GodsLove = () => {
  return (
    <div className="flex lg:flex-row flex-col justify-center lg:gap-35 px-5 lg:px-25 py-20">
      <div className="lg:w-105.5 lg:text-left text-center">
        <h5>DISCOVER GOD’S LOVE</h5>
        <h2 className="mt-7.5 text-primary-900">
          Join The Catholic Faith, Celebrate A Welcoming Community
        </h2>
        <div className="mt-10 mb-7.5">
          <CustomLink to="the-catholic-church">Learn More</CustomLink>
        </div>
      </div>
      <div className="mt-5 lg:w-153 lg:text-left text-center">
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry&apos;s standard dummy text
          ever since the 1500s, when an unknown printer took a galley of type
          and scrambled it to make a type specimen book. Lorem Ipsum has been
          the industry&apos;s standard dummy text ever since the 1500s.
        </p>
        <p className="mt-7.5">
          It has survived not only five centuries, but also the leap into
          electronic typesetting, remaining essentially unchanged. It was
          popularised in the 1960s with the release of Letraset sheets
          containing Lorem Ipsum passages, and more recently with desktop
          publishing software like Aldus PageMaker including versions of Lorem
          Ipsum. Lorem Ipsum has been the industry&apos;s standard dummy text
          ever since the 1500s, when an unknown printer took a galley of type
          and scrambled it to make a type specimen book.{" "}
        </p>
      </div>
    </div>
  );
};

export default GodsLove;
