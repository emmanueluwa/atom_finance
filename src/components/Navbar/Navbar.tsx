import React from "react";
import logo from "@/../public/logo.jpg";
import "./Navbar.css";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="relative container mx-auto p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-20">
          <Link href={"/"}>
            <Image src={logo} alt="company logo" height={100} width={200} />
          </Link>
          <div className="hidden font-bold lg:flex">
            <Link href="/search" className="text-black hover:text-orange-400">
              Search
            </Link>
          </div>
        </div>
        <div className="hidden lg:flex items-center space-x-6 text-back">
          <div className="hover:text-darkBlue">Login</div>
          <a
            href=""
            className="px-8 py-3 font-bold rounded text-white bg-black hover:opacity-70"
          >
            Signup
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
