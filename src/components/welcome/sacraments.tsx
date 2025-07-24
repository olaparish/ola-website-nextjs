"use client";
/* eslint-disable @next/next/no-img-element */
import React from "react";
import { ArrowLeft } from "../ui/icons/arrow-left";
import { ArrowRight } from "../ui/icons/arrow-right";
import UseCountPerScreen from "@/hooks/useCountPerScreen";

const Sacraments = () => {
  const { valuesToRender, changeValue } = UseCountPerScreen(sacraments);
  return (
    <div className="bg-gold-200 px-5 py-10">
      <div className="lg:flex lg:justify-center gap-22 lg:text-left text-center">
        <img
          className="lg:w-120 xl:w-148 lg:h-92.25 xl:h-92.25 size-auto"
          src="/images/welcome/sacraments.webp"
          alt="catholic sacraments"
        />
        <div className="mt-10">
          <h5 className="text-primary-900">SACRAMENTS</h5>
          <h2 className="mt-4 lg:w-92.75 text-primary-900">
            The Seven Sacraments of The Catholic Church{" "}
          </h2>
          <p className="mt-7.5 lg:w-120 xl:w-153">
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
      <ul className="flex justify-center items-center gap-5 md:gap-11.25 mt-10 px-5 lg:px-25">
        <div
          className={`flex justify-center shadow-[0px_2px_2px_0px_rgba(0,0,0,0.2)] items-center bg-white rounded-full size-10 md:size-13.5 cursor-pointer ${
            valuesToRender.length === sacraments.length ? "hidden" : ""
          }`}
          onClick={() => changeValue("back")}
        >
          <ArrowLeft className="size-6" />
        </div>
        {valuesToRender.map((val, indx) => {
          return (
            <li
              className="flex flex-col justify-center items-center bg-white shadow-[0px_2px_2px_0px_rgba(0,0,0,0.1)] hover:shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] px-11 w-68.75 h-103.25 text-center"
              key={indx}
            >
              <h5>{val.name}</h5>
              <p className="mt-4.5">{val.description}</p>
            </li>
          );
        })}

        <div
          className={`flex justify-center shadow-[0px_2px_2px_0px_rgba(0,0,0,0.2)] items-center bg-white rounded-full size-10 md:size-13.5 cursor-pointer ${
            valuesToRender.length === sacraments.length ? "hidden" : ""
          }`}
          onClick={() => changeValue("forward")}
        >
          <ArrowRight className="size-6" />
        </div>
      </ul>
    </div>
  );
};

const sacraments = [
  {
    name: "Baptism",
    description:
      "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset",
  },
  {
    name: "Confirmation",
    description:
      "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset",
  },
  {
    name: "Holy Eucharist",
    description:
      "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing",
  },
  {
    name: "Reconcilisation",
    description:
      "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing",
  },

  {
    name: "Anointing of the Sick",
    description:
      "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset",
  },
  {
    name: "Holy Orders",
    description:
      "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing",
  },
  {
    name: "Holy Matrimony",
    description:
      "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing",
  },
];

export default Sacraments;
