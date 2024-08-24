"use client";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useState } from "react";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed top-0 w-full bg-white/10 backdrop-blur-lg shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 text-white font-bold text-xl">
            <Link href="/">MyLogo</Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                href="/"
                className="text-white hover:text-orange-400 px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-white hover:text-orange-400 px-3 py-2 rounded-md text-sm font-medium"
              >
                About
              </Link>
              <Link
                href="/upload"
                className="text-white hover:text-orange-400 px-3 py-2 rounded-md text-sm font-medium"
              >
                Upload
              </Link>
              <Link
                href="/projects"
                className="text-white hover:text-orange-400 px-3 py-2 rounded-md text-sm font-medium"
              >
                Projects
              </Link>
              <SignedOut>
                <div className="text-white hover:text-orange-400 px-3 py-2 rounded-md text-sm font-medium">
                  <SignInButton />
                </div>
              </SignedOut>
              <SignedIn>
                <div className="text-white hover:text-orange-400 px-3 py-4 rounded-md text-sm font-medium">
                  <UserButton />
                </div>
              </SignedIn>
            </div>
          </div>
          <div className="md:hidden">
            <button
              title="idk"
              type="button"
              onClick={toggleMenu}
              className="text-white hover:text-orange-400 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              className="block text-white hover:text-orange-400 px-3 py-2 rounded-md text-base font-medium"
            >
              Home
            </Link>
            <Link
              href="#"
              className="block text-white hover:text-orange-400 px-3 py-2 rounded-md text-base font-medium"
            >
              About
            </Link>
            <Link
              href="/about"
              className="block text-white hover:text-orange-400 px-3 py-2 rounded-md text-base font-medium"
            >
              Services
            </Link>
            <Link
              href="#"
              className="block text-white hover:text-orange-400 px-3 py-2 rounded-md text-base font-medium"
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
