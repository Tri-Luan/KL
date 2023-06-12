import React, { Fragment, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { selectCurrentUser, setUser } from "../../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useGetUserMutation } from "../../redux/usersApiSlice";
import Cookies from "universal-cookie";
import { Button } from "flowbite-react";
import { useSendLogoutMutation } from "../../redux/authApiSlice";

// import { FingerPrintIcon } from "@heroicons/react/solid";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const Header = () => {
  // Active navbar
  // let activeStyle = {
  //   textDecoration: "underline",
  // };
  let normalStyle =
    "nav-link hover:text-[#2e72e7] text-gray-800 px-3 py-2 rounded-md text-base font-medium ";
  let activeClassName =
    "nav-link hover:normal-case border-b-2 border-[#2e72e7] text-[#2e72e7] px-3 py-2 text-base font-medium";

  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector(selectCurrentUser);
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const [sendLogout] = useSendLogoutMutation();

  // useEffect(() => {
  //   if (user !== null) {
  //     // setPersist((prev) => !prev);
  //     try {
  //       const response = await getUser(user.id);
  //     } catch (error) {

  //     }D
  //     dispatch(setUser(response));
  //   }
  // }, []);
  const navigate = useNavigate();
  const handleLogout = async () => {
    const body = {
      refreshToken: cookies.get("jwt_refresh"),
      accessToken: cookies.get("jwt_access"),
    };
    const response = await sendLogout(body);
    if (response.data.isSuccessful) {
      cookies.remove("user_id", { path: "/" });
      cookies.remove("jwt_accessToken", { path: "/" });
      cookies.remove("jwt_refreshToken", { path: "/" });
      navigate("/");
      window.location.reload();
    }
  };
  return (
    <div>
      <nav>
        <div className="max-w-7xl  mx-auto px-4 sm:px-6 lg:px-8">
          <div className=" flex items-center justify-between h-16">
            {/* Left elements start */}
            <div className="flex items-center">
              <Link to="/">
                <div className="flex">
                  {/* <FingerPrintIcon className="mt-1 h-9 w-9 text-[#5089eb]"></FingerPrintIcon> */}
                  <h1 className=" hover:text-[#2e72e7]  text-gray-800 px-3 py-2 rounded-md text-xl font-medium">
                    Learn <i className="font-normal text-[#2e72e7]">Everyday</i>
                  </h1>
                </div>
              </Link>
              <div className="hidden  md:block">
                <div className="ml-10 flex items-baseline space-x-4">
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
                  <NavLink
                    to="/contest"
                    className={({ isActive }) =>
                      isActive ? activeClassName : normalStyle
                    }
                  >
                    Contest
                  </NavLink>
                  <NavLink
                    to="/discuss"
                    className={({ isActive }) =>
                      isActive ? activeClassName : normalStyle
                    }
                  >
                    Discuss
                  </NavLink>
                  {user?.role === "Author" ? (
                    <NavLink
                      to="/post"
                      className={({ isActive }) =>
                        isActive ? activeClassName : normalStyle
                      }
                    >
                      Đăng bài
                    </NavLink>
                  ) : null}
                </div>
              </div>
            </div>
            {/* Left elements end */}
            {/* Reponsive navbar start*/}
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
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
                ) : (
                  <svg
                    className="block h-6 w-6"
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
                )}
              </button>
            </div>
            {/* Reponsive navbar end*/}
            {/* Right elements start */}

            {user ? (
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
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
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/coursemanagement"
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
                          <Button
                            onClick={() => {
                              handleLogout();
                            }}
                            pill
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
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
                    className="inline-block px-6 py-2.5 bg-blue-100 text-blue-600 font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-600 hover:text-white hover:shadow-lg   transition duration-150 ease-in-out"
                  >
                    login
                  </button>
                </Link>
                <Link to="/register">
                  <button
                    type="button"
                    className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg  transition duration-150 ease-in-out"
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
        {/* Mobile navbar start*/}
        <Transition
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {(ref) => (
            <div className="md:hidden" id="mobile-menu">
              <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <Link
                  to="/"
                  className="hover:bg-gray-700 text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Trang chủ
                </Link>
                <Link
                  to="/practice"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Luyện tập
                </Link>
                <Link
                  to="/post"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Đăng bài
                </Link>
              </div>
            </div>
          )}
        </Transition>
        {/* Mobile navbar end*/}
      </nav>
    </div>
  );
};

export default Header;
