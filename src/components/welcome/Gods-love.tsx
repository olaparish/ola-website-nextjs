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
          God&apos;s love is universal and unconditional. At Our Lady Queen of
          Africa Parish, we strive to embody this love in everything we do. We
          believe that everyone is created in the image and likeness of God, and
          we welcome all who seek to know Him more deeply.
        </p>
        <p className="mt-7.5">
          Our community is built on faith, hope, and charity. We come together
          to celebrate the Eucharist, support one another in times of need, and
          reach out to the wider community with acts of service. Join us as we
          journey together in faith, growing closer to God and to one another.{" "}
        </p>
      </div>
    </div>
  );
};

export default GodsLove;
