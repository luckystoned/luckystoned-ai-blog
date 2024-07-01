"use client";

import Link from "next/link";
import { logout } from "../logout/actions";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

type User = {};

export default function Header() {
  //State variables for user and admin
  const [user, setUser] = useState<User | null>(null);
  const [admin, setAdmin] = useState<User | null>(null);

  // useEffect hook to fetch user data on mount
  useEffect(() => {
    // Define an async function to get the user
    async function getUser() {
      // Create a Supabase client instance
      const supabase = createClient();

      // Get the user data from Supabase auth
      const { data, error } = await supabase.auth.getUser();

      // If there's an error or no user data, log a message
      if (error || !data?.user) {
        console.log("No User");
      } 
      // If user data is available, set the user state
      else {
        setUser(data.user);
      }

      // Define the email of the signed-up user
      const userEmail = "email of signed-up user";

      // Check if the user is an admin (email matches)
      if (!data?.user || data.user?.email !== userEmail) {
        console.log("No Admin");
      } 
      // If the user is an admin, set the admin state
      else {
        setAdmin(data.user);
      }
    }
    // Call the getUser function
    getUser();
  }, []); // Dependency array is empty, so the effect runs only once on mount 
  return (
    <>
      <header className="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-gray-800 border-b border-gray-200 text-sm py-3 sm:py-0 ">
        <nav
          className="relative max-w-7xl w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8"
          aria-label="Global">
          <div className="flex items-center justify-between">
            <Link
              className="flex-none text-xl text-white font-semibold "
              href="/"
              aria-label="Brand">
              AIBlog
            </Link>
          </div>
          <div id="navbar-collapse-with-animation" className="">
            {/* Navbar content container */}
            <div className="flex flex-col gap-y-4 gap-x-0 mt-5 sm:flex-row sm:items-center sm:justify-end sm:gap-y-0 sm:gap-x-7 sm:mt-0 sm:ps-7">
              {/* Conditional rendering for admin link */}
              {admin ? (
                // If admin is true, show the "Create Post" link
                <Link
                  className="flex items-center font-medium text-gray-500 border-2 border-indigo-600 text-center p-2 rounded-md hover:text-blue-600 sm:border-s sm:my-6 "
                  href="/createpost">
                  Create Post
                </Link>
              ) : (
                // If admin is false, render an empty div
                <div></div>
              )}

              {/* Conditional rendering for user link/logout button */}
              {user ? (
                // If user is true, show the logout button
                <form action={logout}>
                  <button
                    className="flex items-center font-medium text-gray-500 border-2 border-indigo-600 text-center p-2 rounded-md hover:text-blue-600 sm:border-s sm:my-6 "
                    type="submit">
                    Logout
                  </button>
                </form>
              ) : (
                // If user is false, show the "Login" link
                <Link
                  className="flex items-center font-medium text-gray-500 border-2 border-indigo-600 text-center p-2 rounded-md hover:text-blue-600 sm:border-s sm:my-6 "
                  href="/login">
                  Login
                </Link>
              )}
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}