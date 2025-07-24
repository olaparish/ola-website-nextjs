"use client";
import { useEffect, useState } from "react";

type ValuesRanges = {
  mobile: number;
  tablet: number;
  laptop: number;
};

const defaultValuesRanges: ValuesRanges = {
  mobile: 1,
  tablet: 2,
  laptop: 3,
};

type Props = { values: unknown[]; valuesRanges: ValuesRanges };

function UseCountPerScreen<T>(
  values: T[] = [],
  valuesRanges: ValuesRanges = defaultValuesRanges
) {
  const [currentValues, setCurrentValues] = useState<{
    start: number;
    count: number;
  }>({ start: 0, count: 1 });

  useEffect(() => {
    const mq768 = window.matchMedia("(min-width: 768px)");
    const mq1024 = window.matchMedia("(min-width: 1024px)");
    const mq1536 = window.matchMedia("(min-width: 1536px)");

    const update = () => {
      setCurrentValues((prev) => {
        if (mq1024.matches) return { ...prev, count: valuesRanges.laptop };
        if (mq768.matches) return { ...prev, count: valuesRanges.tablet };
        return { ...prev, count: valuesRanges.mobile };
      });
    };

    // Initial check
    update();

    // Event listeners
    mq768.addEventListener("change", update);
    mq1024.addEventListener("change", update);
    mq1536.addEventListener("change", update);

    return () => {
      mq768.removeEventListener("change", update);
      mq1024.removeEventListener("change", update);
      mq1536.removeEventListener("change", update);
    };
  }, []);

  const valuesToRender = [];
  let count = currentValues.count;

  for (let i = currentValues.start; count !== 0; i++) {
    valuesToRender.push(values[i]);
    count = count - 1;
    if (i == values.length - 1) i = 0;
  }

  const changeValue = (direction: "forward" | "back") => {
    setCurrentValues((prev) => {
      let current = prev.start;
      if (direction === "forward") {
        current = current + 1;
      } else {
        current = current - 1;
      }

      if (current > values.length - 1) {
        current = 0;
      }
      if (current < 0) {
        current = values.length - 1;
      }
      console.log("Changing: ", current);
      return { ...prev, start: current };
    });
  };

  return { valuesToRender, changeValue };
}

export default UseCountPerScreen;
