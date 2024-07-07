import Link from "next/link";
import React from "react";
import ThemeToggleButton from "./ThemeToggleButton";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-2xl md:text-3xl uppercase">Secret</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-4 gap-4 text-base items-center">
          <li>
            <Link href={`/my-secrects`}>My Secrets</Link>
          </li>
          <li>
            <Link href={`/login`}>Login</Link>
          </li>
          <li>
            <ThemeToggleButton />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
