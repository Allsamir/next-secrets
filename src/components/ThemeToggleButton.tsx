"use client";
import React from "react";
import { FaMoon } from "react-icons/fa";
import { IoSunny } from "react-icons/io5";
import { useEffect, useState } from "react";

const ThemeToggleButton = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light",
  );
  const handleTheme = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  useEffect(() => {
    localStorage.setItem("theme", theme as string);
    const localTheme = localStorage.getItem("theme");
    document
      .querySelector("html")
      ?.setAttribute("data-theme", localTheme as string);
  }, [theme]);
  return (
    <button className="btn btn-square btn-ghost">
      <label className="swap swap-rotate w-12 h-12">
        <input
          type="checkbox"
          onChange={handleTheme}
          checked={theme === "light" ? false : true}
        />
        {/* light theme sun image */}
        <IoSunny className="swap-on text-base" />
        {/* dark theme moon image */}
        <FaMoon className="swap-off text-base" />
      </label>
    </button>
  );
};

export default ThemeToggleButton;
