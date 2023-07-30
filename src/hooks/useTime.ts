import React, { useEffect } from "react";

interface Time {
  time: number;
  setTime: React.Dispatch<React.SetStateAction<number>>;
}

export const useTime = ({ time, setTime }: Time) => {
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);

    if (time === 0) {
      setTime(0);
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [time]);
};
