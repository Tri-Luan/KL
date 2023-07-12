import React, { Fragment, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { selectCurrentUser } from "../../redux/authSlice";
import { useSelector } from "react-redux";
import Cookies from "universal-cookie";
import { Button } from "flowbite-react";
import { useSendLogoutMutation } from "../../redux/authApiSlice";
import userAvatar from "../../assets/images/userAvatar.png";
import { FireIcon } from "@heroicons/react/24/solid";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const Header = () => {
  let normalStyle =
    "nav-link hover:text-[#4169E1] text-gray-800 px-3 py-2 rounded-md text-lg font-medium ";
  let activeClassName =
    "nav-link hover:normal-case border-b-[3px] border-[#4169E1] text-[#4169E1] px-3 py-2 text-lg font-medium";
  const user = useSelector(selectCurrentUser);
  const cookies = new Cookies();
  const [sendLogout] = useSendLogoutMutation();
  const navigate = useNavigate();
  const handleLogout = async () => {
    const body = {
      refreshToken: cookies.get("jwt_refresh"),
      accessToken: cookies.get("jwt_access"),
    };
    const response = await sendLogout(body);
    if (response.data.isSuccessful) {
      sessionStorage.setItem("persist", false);
      cookies.remove("user_id", { path: "/" });
      cookies.remove("jwt_access", { path: "/" });
      cookies.remove("jwt_refresh", { path: "/" });
      navigate("/");
      window.location.reload();
    }
  };
  return (
    <div>
      <nav>
        <div className="max-w-7xl  mx-auto px-4 sm:px-6 lg:px-8">
          <div className=" flex items-center justify-between h-16 ">
            {/* Left elements start */}
            <div className="flex items-center">
              <Link to="/">
                <div className="flex">
                  <FireIcon className="mt-1 h-9 w-9 text-[#4169E1]"></FireIcon>
                  <h1 className=" hover:text-[#4169E1]  text-gray-800 px-3 py-2 rounded-md text-2xl font-semibold">
                    Code <i className="font-bold text-[#4169E1]">Camp</i>
                  </h1>
                </div>
              </Link>
              <div className=" hidden md:block">
                <div className="ml-6 flex items-baseline space-x-4">
                  <NavLink
                    exact
                    to="/course"
                    className={({ isActive }) =>
                      isActive ? activeClassName : normalStyle
                    }
                  >
                    Course
                  </NavLink>
                  <NavLink
                    to="/practice"
                    className={({ isActive }) =>
                      isActive ? activeClassName : normalStyle
                    }
                  >
                    Practice
                  </NavLink>

                  {/* Unfinished */}
                  {/* <NavLink
                    to="/contest"
                    className={({ isActive }) =>
                      isActive ? activeClassName : normalStyle
                    }
                  >
                    Contest
                  </NavLink> */}

                  <NavLink
                    to="/discussion"
                    className={({ isActive }) =>
                      isActive ? activeClassName : normalStyle
                    }
                  >
                    Discussion
                  </NavLink>
                </div>
              </div>
            </div>
            {/* Left elements end */}
            {/* Right elements start */}
            {user ? (
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Unfinished */}
                {/* <button
                  type="button"
                  className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none "
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button> */}

                {/* Profile dropdown */}

                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none ">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-10 w-10 rounded-full border-none"
                        src={
                          user.avatar === null
                            ? userAvatar
                            : "data:image/jpeg;base64," + user.avatar
                        }
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/profile"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Your Profile
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/coursemanagement"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Course Management
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/practicemanagement"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Practice Management
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Button
                            onClick={() => {
                              handleLogout();
                            }}
                            pill
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block ml-4 text-sm text-gray-700"
                            )}
                          >
                            Log out
                          </Button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            ) : (
              <div>
                <Link className="mr-1" to="/login">
                  <button
                    type="button"
                    className="inline-block px-6 py-2.5 bg-blue-100 text-[#5089eb] font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-600 hover:text-white hover:shadow-lg   transition duration-150 ease-in-out"
                  >
                    login
                  </button>
                </Link>
                <Link to="/register">
                  <button
                    type="button"
                    className="inline-block px-6 py-2.5 bg-[#5089eb] text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg  transition duration-150 ease-in-out"
                    data-bs-dismiss="modal"
                  >
                    register
                  </button>
                </Link>
              </div>
            )}
            {/* Right elements end */}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
