"use client";

import React from "react";
import { Typewriter } from "react-simple-typewriter";

const Logo = () => {
  return (
    <Typewriter
      words={["Next Secret", "Keep your", "secrets alive"]}
      loop={true}
      cursor
      typeSpeed={70}
      deleteSpeed={50}
      delaySpeed={1000}
    />
  );
};

export default Logo;
