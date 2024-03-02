"use client";

import { useEffect, useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Search from "./Search";
import { logout } from "@/actions/logout";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import ThemeSwitch from "./ThemeSwitch";
import { cn } from "@/lib/utils";

export default function Header(props) {
  const session = useSession();
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [isAuthenticated, setisAuthenticated] = useState(false);

  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // setisAuthenticated(session.data?.user);
    session.data?.user ? setisAuthenticated(true) : setisAuthenticated(false);

    setLoading(false);
  }, []);

  const handleSignOut = () => {
    logout();
    setisAuthenticated(false);
    setLoading(false);
    setLoading(false);
  };

  return (
    <div className="header fixed sm:fixed xl:static left-0 top-0 right-0 h-[70px] w-full flex justify-between items-center px-4 pr-4 z-10 bg-white dark:bg-black dark:border-b dark:border-b-dark-400">
      <Link href="/">
        <img src="https://copyui.com/favicon.ico" width="40px" />
      </Link>

      <div className="flex items-center justify-end">
        {/* dark mode toggle */}
        <button
          className="py-2 text-sm ml-2 text-black dark:text-white dark:hover:bg-dark-500  hover:bg-light-100 transition px-3 rounded-full"
          onClick={() => {
            setShowSearch(!showSearch);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        <ThemeSwitch />

        {/* Render component according to auth status */}
        {loading ? (
          ""
        ) : (
          <div>
            <div className="flex h-fit w-fit font-[400] ">
              {!isAuthenticated ? (
                <>
                  <button
                    className="py-1.5 text-sm ml-2 border border-1 border-light-200 text-black dark:border-dark-400 dark:text-dark-200 px-3 rounded-full"
                    onClick={() => {
                      setShowSignInModal(!showSignInModal);
                    }}
                  >
                    Sign in
                  </button>

                  <button
                    className="py-1.5 text-sm ml-2 bg-black text-white dark:bg-white dark:text-black px-3 rounded-full"
                    onClick={() => {
                      setShowSignUpModal(!showSignUpModal);
                    }}
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="py-1.5 text-sm ml-2 bg-black text-white dark:bg-white dark:text-black px-3 rounded-full"
                    onClick={handleSignOut}
                  >
                    Sign out
                  </button>
                  <Link
                    className="py-1.5 text-sm ml-2 border border-1 border-light-200 text-black dark:border-dark-400 dark:text-dark-200 px-3 rounded-full"
                    href="/dashboard"
                  >
                    Dashboard
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
        <Link
          href=" /submit"
          className="py-1.5 text-sm ml-2 border border-1 border-light-200 text-black dark:border-dark-400 dark:text-dark-200 px-3 rounded-full"
        >
          Submit
        </Link>
        <button
          className="py-2 text-sm ml-2 text-black dark:text-white px-3 rounded-full block md:block lg:block xl:hidden"
          onClick={() => {
            props.setShowSidebar(!props.showSidebar);
          }}
        >
          {props.showSidebar ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M3 9a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 9zm0 6.75a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>
      </div>

      {/* sign in component (modal) */}
      <SignIn
        showModal={showSignInModal}
        setShowModal={setShowSignInModal}
        isAuthenticated={setisAuthenticated}
      />
      {/* sign up component (modal) */}
      <SignUp
        showModal={showSignUpModal}
        setShowModal={setShowSignUpModal}
        isAuthenticated={setisAuthenticated}
      />

      {/* search component */}
      <Search showSearch={showSearch} setShowSearch={setShowSearch} />
    </div>
  );
}
