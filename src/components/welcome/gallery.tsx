/* eslint-disable @next/next/no-img-element */
import React from "react";
import CustomLink from "../ui/custom-link";

const Gallery = () => {
  return (
    <div className="p-5 lg:p-25 lg:text-left text-center">
      <h5 className="text-primary-900">GALLERY</h5>
      <h2 className="mt-5 text-primary-900">
        Experience Ola Parish at A Glance
      </h2>
      <p className="mt-7.5 max-w-240">
        It has survived not only five centuries, but also the leap into
        electronic typesetting, remaining essentially unchanged. It was
        popularised in the 1960s with the release of Letraset sheets containing
        Lorem Ipsum passages, and more recently with desktop{" "}
      </p>
      {/* <div className="lg:flex justify-center gap-2 lg:gap-4 grid grid-cols-2 mt-10 lg:mt-20">
        <img
          className=""
          src="/images/gallery/img_1.png"
          alt="ola parish youth"
        />
        <img
          className=""
          src="/images/gallery/img_2.png"
          alt="ola parish youth"
        />
        <img
          className=""
          src="/images/gallery/img_3.png"
          alt="ola parish youth"
        />
        <img
          className=""
          src="/images/gallery/img_1.png"
          alt="ola parish youth"
        />
        <img
          className=""
          src="/images/gallery/img_1.png"
          alt="ola parish youth"
        />
        <img
          className=""
          src="/images/gallery/img_2.png"
          alt="ola parish youth"
        />
        <img
          className=""
          src="/images/gallery/img_3.png"
          alt="ola parish youth"
        />
        <img
          className=""
          src="/images/gallery/img_1.png"
          alt="ola parish youth"
        />
      </div> */}
      <div className="lg:flex justify-center gap-2 lg:gap-4 grid grid-cols-2 mt-10 lg:mt-20">
        <img
          className=""
          src="/images/gallery/img_1.png"
          alt="ola parish youth"
        />
        <img
          className=""
          src="/images/gallery/img_2.png"
          alt="ola parish youth"
        />
        <img
          className=""
          src="/images/gallery/img_3.png"
          alt="ola parish youth"
        />
        <img
          className=""
          src="/images/gallery/img_1.png"
          alt="ola parish youth"
        />
      </div>
      <div className="hidden lg:flex justify-center gap-2 lg:gap-4 lg:mt-2">
        <img
          className=""
          src="/images/gallery/img_1.png"
          alt="ola parish youth"
        />
        <img
          className=""
          src="/images/gallery/img_2.png"
          alt="ola parish youth"
        />
        <img
          className=""
          src="/images/gallery/img_3.png"
          alt="ola parish youth"
        />
        <img
          className=""
          src="/images/gallery/img_1.png"
          alt="ola parish youth"
        />
      </div>
      <div className="mt-10 mb-7.5 text-center">
        <CustomLink to="gallery">Go to Gallery</CustomLink>
      </div>
    </div>
  );
};

export default Gallery;
