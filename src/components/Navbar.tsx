import Link from "next/link";
import React from "react";
import ThemeToggleButton from "./ThemeToggleButton";
import Logo from "./Logo";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
const Navbar = async () => {
  const { userId } = auth();
  const isAuth = !!userId;
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[40] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link href={`/my-secrets`}>My Secrets</Link>
            </li>
            {isAuth ? (
              <>
                <li>
                  <Link href={`/profile`}>Profile</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href={`/login`}>Login</Link>
                </li>
              </>
            )}
          </ul>
        </div>
        <Link className="btn btn-ghost text-xl md:text-3xl uppercase" href="/">
          <Logo />
        </Link>
      </div>
      <div className="flex-none hidden lg:flex">
        <ul className="menu menu-horizontal md:px-4 md:gap-4 text-base items-center">
          <li>
            <Link href={`/my-secrets`}>My Secrets</Link>
          </li>
          {isAuth ? (
            <>
              <li>
                <Link href={`/profile`}>Profile</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href={`/login`}>Login</Link>
              </li>
            </>
          )}
        </ul>
      </div>
      {isAuth && <UserButton afterSignOutUrl="/" />}
      <ThemeToggleButton />
    </div>
  );
};

export default Navbar;
