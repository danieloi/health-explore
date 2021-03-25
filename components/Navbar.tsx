import Link from "next/link";
import useToggle from "hooks/useToggle";
import React from "react";
import Monogram from "./Monogram";
import NotificationBadge from "./NotificationBadge";

export default function Navbar() {
  const { state: isActive, toggleState: toggleIsActive } = useToggle();

  return (
    <header>
      <nav className="bg-white">
        <div className="px-4 sm:px-9 flex items-center justify-between h-16">
          <NavToggle isActive={isActive} toggleIsActive={toggleIsActive} />
          <div className="flex-auto flex items-center justify-between">
            <Link href="/">
              <a className="text-xl font-bold text-blue-500">HEALTH EXPLORE</a>
            </Link>
            <ul className="hidden lg:flex lg:ml-6  space-x-4">
              {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
              <li>
                <a
                  href="#"
                  className="text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  PROFILE
                </a>
              </li>
              <li>
                <Link href="/jobs">
                  <a className="text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    JOBS
                  </a>
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  PROFESSIONAL NETWORK
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  LOUNGE
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-800 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  SALARY
                </a>
              </li>
            </ul>
            <div className="sm:ml-6 flex space-x-6 items-center">
              <button className="hidden sm:block border-current border-2 rounded-lg text-blue-500 hover:bg-gray-700 hover:text-white px-3 py-2  text-sm font-medium">
                CREATE JOB{" "}
              </button>
              <button
                type="button"
                className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                id="user-menu"
                aria-expanded="false"
                aria-haspopup="true"
              >
                <span className="sr-only">Open user menu</span>
                <NotificationBadge>
                  <Monogram initials="JO" />
                </NotificationBadge>
              </button>
              <button className="hidden sm:block text-gray-800 hover:bg-gray-700 hover:text-white  py-2 pr-1 rounded-md text-sm font-medium">
                LOGOUT
              </button>
            </div>
          </div>
        </div>

        {/* <!-- Mobile menu, show/hide based on menu state. --> */}
        <ul
          className={`${
            isActive ? "" : "hidden"
          } lg:hidden px-2 pt-2 pb-3 space-y-1 flex flex-col`}
          id="mobile-menu"
        >
          {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
          <li>
            <a
              href="#"
              className="text-gray-800 hover:bg-gray-700 hover:text-white block px-4 py-2 rounded-md text-base font-medium"
            >
              PROFILE
            </a>
          </li>
          <li>
            <Link href="/jobs">
              <a className="text-gray-800 hover:bg-gray-700 hover:text-white block px-4 py-2 rounded-md text-base font-medium">
                JOBS
              </a>
            </Link>
          </li>
          <li>
            <a
              href="#"
              className="text-gray-800 hover:bg-gray-700 hover:text-white block px-4 py-2 rounded-md text-base font-medium"
            >
              PROFESSIONAL NETWORK
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-gray-800 hover:bg-gray-700 hover:text-white block px-4 py-2 rounded-md text-base font-medium"
            >
              LOUNGE
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-gray-800 hover:bg-gray-700 hover:text-white block px-4 py-2 rounded-md text-base font-medium"
            >
              SALARY
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block sm:hidden text-blue-500 hover:bg-blue-500 hover:text-white px-4 py-2 rounded-md text-base font-medium"
            >
              CREATE JOB{" "}
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block sm:hidden text-gray-800 hover:bg-gray-700 hover:text-white px-4 py-2 rounded-md text-base font-medium"
            >
              LOG OUT
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

type Props = {
  isActive: boolean;
  toggleIsActive: () => void;
};
function NavToggle({ isActive, toggleIsActive }: Props) {
  return (
    <button
      type="button"
      className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white mr-6"
      aria-controls="mobile-menu"
      aria-expanded="false"
      onClick={toggleIsActive}
    >
      <span className="sr-only">Open main menu</span>
      {/* <!--
        Icon when menu is closed.

        Heroicon name: outline/menu

        Menu open: "hidden", Menu closed: "block"
      --> */}
      <svg
        className={`${isActive ? "hidden" : "block"} h-6 w-6`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
      {/* <!--
        Icon when menu is open.

        Heroicon name: outline/x

        Menu open: "block", Menu closed: "hidden"
      --> */}
      <svg
        className={`${isActive ? "block" : "hidden"} h-6 w-6`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  );
}
