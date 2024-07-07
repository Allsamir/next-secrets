import Link from "next/link";
import React from "react";
import ThemeToggleButton from "./ThemeToggleButton";
import Logo from "./Logo";
const Navbar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link className="btn btn-ghost text-xl md:text-3xl uppercase" href="/">
          <Logo />
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal md:px-4 md:gap-4 text-base items-center">
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
