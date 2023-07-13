import { FireIcon } from "@heroicons/react/24/solid";
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="">
      <div className=" py-2 h-11 text-gray-800 text-center">
        <footer class="bg-white rounded-lg shadow dark:bg-gray-900 m-4">
          <hr className="h-px mb-3 mt-28 bg-blue-200 border-0 " />
          <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
            <div class="sm:flex sm:items-center sm:justify-between">
              <Link to="/">
                <div className="flex">
                  <FireIcon className="mt-1 h-9 w-9 text-[#5089eb]"></FireIcon>
                  <h1 className=" hover:text-[#2e72e7]  text-gray-800 px-3 py-2 rounded-md text-2xl font-semibold">
                    Code <i className="font-bold text-[#2e72e7]">Camp</i>
                  </h1>
                </div>
                <p className="mt-2 w-2/4">
                  CodeCamp is an online platform that helps users to learn,
                  practice coding skills and join the online coding contests.
                </p>
              </Link>
              <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                <li>
                  <a href="/course" class="mr-4 hover:underline md:mr-6 ">
                    Course
                  </a>
                </li>
                <li>
                  <a href="/practice" class="mr-4 hover:underline md:mr-6">
                    Practice
                  </a>
                </li>
                <li>
                  <a href="/discussion" class="mr-4 hover:underline md:mr-6 ">
                    Discussion
                  </a>
                </li>
              </ul>
            </div>
            <hr class="my-6 border-gray-200  dark:border-gray-700 lg:my-8" />
            <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
              © 2023 <span>Graduation Thesis</span>.
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
};
export default Footer;
