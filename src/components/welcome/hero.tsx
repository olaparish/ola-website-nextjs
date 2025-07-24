"use client";
/* eslint-disable @next/next/no-img-element */
import React from "react";

import CountdownTimer, { getNextSundayFormatted } from "./timer";
import { ArrowLeft } from "../ui/icons/arrow-left";
import CustomLink from "../ui/custom-link";
import { ArrowRight } from "../ui/icons/arrow-right";
import { IconCalendarMonth } from "../ui/icons/icon-calendar-month";
import { IconClock } from "../ui/icon-clock";

const Hero = () => {
  return (
    <div className="grid grid-rows-[1fr_auto] hero-h">
      <div className="relative bg-green-200">
        <img
          src="/images/welcome/hero.webp"
          alt="ola parish"
          className="absolute w-full h-full object-cover"
        />
        <div className="top-1/2 left-1/2 absolute justify-between items-center grid grid-cols-[40px_auto_40px] px-5 lg:px-25 w-full text-white text-center -translate-1/2 transform">
          <div className="flex justify-center items-center bg-gold-200/50 md:bg-gold-200/30 rounded-full size-10 md:size-13.5 cursor-pointer">
            <ArrowLeft className="size-6" />
          </div>
          <div className="md:w-150 text-center">
            <p className="text-lg">OLA CATHOLIC CHURCH</p>
            <h1 className="mt-8">
              Discover God&apos;s Love And Develop Your Faith
            </h1>
            <CustomLink to="/about" className="inline-block mt-10">
              Read More
            </CustomLink>
          </div>
          <div className="flex justify-center items-center bg-gold-200/50 md:bg-gold-200/30 rounded-full size-10 md:size-13.5 cursor-pointer">
            <ArrowRight className="size-6" />
          </div>
        </div>
      </div>
      <div className="flex md:flex-row flex-col justify-center md:items-center lg:gap-41 bg-gold-200 px-5 lg:px-36.75 py-8">
        <div className="flex flex-col gap-1 mx-auto md:mx-0">
          <h3>Spreading the faith to all</h3>
          <div className="flex items-center gap-2.5 mt-4">
            <IconCalendarMonth className="size-6" />
            <p className="font-medium">{getNextSundayFormatted()}</p>
          </div>
          <div className="flex items-center gap-2.5">
            <IconClock className="size-6" />
            <p className="font-medium">Sunday, 07:00 AM - 09:00 AM</p>
          </div>
        </div>
        <div>
          <h3 className="mt-4 md:mt-0 text-center">
            Our Next Mass Celebration starts in
          </h3>
          <CountdownTimer />
        </div>
      </div>
    </div>
  );
};

export default Hero;
