"use client";

import { useState, useEffect } from "react";
import { throttle } from "./helper";

const useResize = (time: number) => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth ?? 0,
    height: window.innerHeight ?? 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [time]);

  return windowSize;
};

export default useResize;
