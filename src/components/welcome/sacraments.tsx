"use client";
/* eslint-disable @next/next/no-img-element */
import React from "react";
import { ArrowLeft } from "../icons/arrow-left";
import { ArrowRight } from "../icons/arrow-right";
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
            The sacraments are visible signs of invisible grace, instituted by
            Christ and entrusted to the Church. Through them, divine life is
            dispensed to us. There are seven sacraments in the Church: Baptism,
            Confirmation, Eucharist, Penance, Anointing of the Sick, Holy
            Orders, and Matrimony.{" "}
          </p>
        </div>
      </div>
      <ul className="flex justify-center items-center gap-5 md:gap-11.25 mt-10 lg:px-25">
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
              className="flex flex-col justify-center items-center bg-white shadow-[0px_2px_2px_0px_rgba(0,0,0,0.1)] hover:shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] px-2 md:px-11 w-68.75 min-h-103.25 text-center"
              key={indx}
            >
              <h5>{val.name}</h5>
              <p className="mt-4.5 md:text-[16px] text-sm">{val.description}</p>
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
      "Baptism is the basis of the whole Christian life, the gateway to life in the Spirit, and the door which gives access to the other sacraments.",
  },
  {
    name: "Confirmation",
    description:
      "Confirmation perfects Baptismal grace; it is the sacrament which gives the Holy Spirit in order to root us more deeply in the divine filiation.",
  },
  {
    name: "Holy Eucharist",
    description:
      "The Holy Eucharist completes Christian initiation. Those who have been raised to the dignity of the royal priesthood by Baptism and configured more deeply to Christ by Confirmation participate with the whole community in the Lord's own sacrifice by means of the Eucharist.",
  },
  {
    name: "Reconcilisation",
    description:
      "Those who approach the sacrament of Penance obtain pardon from God's mercy for the offense committed against Him, and are, at the same time, reconciled with the Church which they have wounded by their sins.",
  },

  {
    name: "Anointing of the Sick",
    description:
      "By the sacred anointing of the sick and the prayer of the priests the whole Church commends those who are ill to the suffering and glorified Lord, that he may raise them up and save them.",
  },
  {
    name: "Holy Orders",
    description:
      "Holy Orders is the sacrament through which the mission entrusted by Christ to his apostles continues to be exercised in the Church until the end of time.",
  },
  {
    name: "Holy Matrimony",
    description:
      "The matrimonial covenant, by which a man and a woman establish between themselves a partnership of the whole of life, is by its nature ordered toward the good of the spouses and the procreation and education of offspring.",
  },
];

export default Sacraments;
