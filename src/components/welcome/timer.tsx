"use client";
import React, { useCallback, useEffect, useState } from "react";

const CountdownTimer = () => {
  function getNextSunday(): Date {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 (Sun) to 6 (Sat)

    const daysUntilSunday = dayOfWeek === 0 ? 7 : 7 - dayOfWeek;

    const nextSunday = new Date(today);
    nextSunday.setDate(today.getDate() + daysUntilSunday);
    nextSunday.setHours(7, 0, 0, 0);

    return nextSunday;
  }

  const calculateTimeLeft = useCallback(() => {
    const targetDate = getNextSunday();
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }, []);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  if (!isClient) {
    return (
      <div className="flex justify-between md:gap-15 bg-primary-900 mt-4 px-5 py-4.5 w-full md:w-auto text-white">
        <p className="flex flex-col text-center">
          <span className="font-semibold text-xl">--</span>
        </p>
        <p className="flex flex-col text-center">
          <span className="font-semibold text-xl">--</span>
        </p>
        <p className="flex flex-col text-center">
          <span className="font-semibold text-xl">--</span>
        </p>
        <p className="flex flex-col text-center">
          <span className="font-semibold text-xl">--</span>
        </p>
      </div>
    );
  }

  return (
    <div className="flex justify-between md:gap-15 bg-primary-900 mt-4 px-5 py-4.5 w-full md:w-auto text-white">
      <p className="flex flex-col text-center">
        <span className="font-semibold text-xl">{timeLeft.days}</span>
        <span className="hidden sm:block font-medium">Days</span>
        <span className="sm:hidden font-medium">D</span>
      </p>
      <p className="flex flex-col text-center">
        <span className="font-semibold text-xl">{timeLeft.hours}</span>
        <span className="hidden sm:block font-medium">Hours</span>
        <span className="sm:hidden font-medium">H</span>
      </p>
      <p className="flex flex-col text-center">
        <span className="font-semibold text-xl">{timeLeft.minutes}</span>
        <span className="hidden sm:block font-medium">Minutes</span>
        <span className="sm:hidden font-medium">M</span>{" "}
      </p>
      <p className="flex flex-col text-center">
        <span className="font-semibold text-xl">{timeLeft.seconds}</span>
        <span className="hidden sm:block font-medium">Seconds</span>
        <span className="sm:hidden font-medium">S</span>{" "}
      </p>
    </div>
  );
};

export function getNextSundayFormatted(): string {
  const now = new Date();
  const day = now.getDay(); // 0 (Sun) to 6 (Sat)
  const daysUntilSunday = day === 0 ? 7 : 7 - day;

  const nextSunday = new Date();
  nextSunday.setDate(now.getDate() + daysUntilSunday);

  const dayNumber = nextSunday.getDate();
  const month = nextSunday.toLocaleString("default", { month: "long" });
  const year = nextSunday.getFullYear();

  const suffix = getOrdinalSuffix(dayNumber);

  return `${dayNumber}${suffix} ${month}, ${year}`;
}

function getOrdinalSuffix(day: number): string {
  if (day >= 11 && day <= 13) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

export default CountdownTimer;
