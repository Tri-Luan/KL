import { Badge, Card, Dropdown, Pagination } from "flowbite-react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { selectCurrentUser } from "../../redux/authSlice";

import {
  useGetPracticesQuery,
  useGetPracticeLevelsQuery,
} from "../../redux/practiceApiSlice";
import img4 from "../../assets/images/img4.jpg";
import img5 from "../../assets/images/img5.jpg";
import img6 from "../../assets/images/img6.jpg";
import img2 from "../../assets/images/img2.jpg";
import { HeartIcon, UsersIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Breadcrumbs from "../../components/ui/Breadcrumbs";
const Practice = () => {
  const user = useSelector(selectCurrentUser);
  const [practiceLevelId, setPracticeLevelId] = useState(1);
  const { data: levels, isLoading: isLoadingGetLevels } =
    useGetPracticeLevelsQuery();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isSuccess, isError, error } = useGetPracticesQuery({
    userId: user.id,
    pageSize: 12,
    pageNumber: currentPage,
  });

  console.log(data);
  // const customTheme: CustomFlowbiteTheme["pagination"] = {
  //   base: "",
  //   layout: {
  //     table: {
  //       base: "text-sm text-gray-700 dark:text-gray-400",
  //       span: "font-semibold text-gray-900 dark:text-white",
  //     },
  //   },
  //   pages: {
  //     base: "xs:mt-0 mt-2 inline-flex items-center -space-x-px",
  //     showIcon: "inline-flex",
  //     previous: {
  //       base: "ml-0 rounded-l-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white",
  //       icon: "h-5 w-5",
  //     },
  //     next: {
  //       base: "rounded-r-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white",
  //       icon: "h-5 w-5",
  //     },
  //     selector: {
  //       base: "w-12 border border-gray-300 bg-white py-2 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white",
  //       active:
  //         "bg-cyan-50 text-cyan-600 hover:bg-cyan-100 hover:text-cyan-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white",
  //       disabled: "opacity-50 cursor-normal",
  //     },
  //   },
  // };
  return (
    <div>
      {isLoading || isLoadingGetLevels ? (
        <div>
          <li className="flex items-center">
            <div role="status">
              <svg
                aria-hidden="true"
                className="w-10 h-10 mr-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
            Processing...
          </li>
        </div>
      ) : isSuccess ? (
        <section className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <div className="ml-8 my-5">
            <Breadcrumbs />
          </div>
          <img src={img2} className="w-full max-w-6xl h-56 mb-3" alt="" />

          <form className="mt-6 ml-5 flex">
            <div class="flex">
              <div class="relative w-96 mr-20">
                <input
                  type="search"
                  id="search-dropdown"
                  class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-2 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                  placeholder="Search practice by practice name"
                  required
                />
                <button
                  type="submit"
                  class="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-600 rounded-r-lg border border-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <svg
                    aria-hidden="true"
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                  <span class="sr-only">Search</span>
                </button>
              </div>
            </div>

            <select
              id="level"
              class="bg-gray-50 mr-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500  w-40 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              required
              onChange={(e) => setPracticeLevelId(e.target.value)}
            >
              <option value={0}>Level</option>
              {levels.levels.map((level, i) => {
                return <option value={level.id}>{level.name}</option>;
              })}
            </select>

            <div class="flex">
              <select
                id="level"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500  w-40 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                required
                onChange={(e) => setPracticeLevelId(e.target.value)}
              >
                <option value={0}>Status</option>
                {levels.levels.map((level, i) => {
                  return <option value={level.id}>{level.name}</option>;
                })}
              </select>
            </div>
          </form>
          <div class="grid lg:grid-cols-4 lg:gap-5 gap-5 xl:gap-x-7">
            {data.practices !== null
              ? data.practices.map((practice, i) => {
                  return practice.length !== 0 ? (
                    <div
                      className="container sm:mx-5 md:mx-10 lg:mx-20 xl:mx-32 2xl:mx-48 my-8"
                      key={i}
                    >
                      <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <div class="flex justify-center px-4 pt-4">
                          <Link
                            to={`/practice/${practice.practiceName}`}
                            state={{
                              useFor: "practice",
                              id: practice.practiceId,
                            }}
                          >
                            <h5 class="hover:text-[#2e72e7] mb-1 text-xl font-medium text-gray-900 dark:text-white">
                              {practice.practiceName}
                            </h5>
                          </Link>
                          <Badge
                            className="ml-2"
                            color={
                              practice.level === "Easy"
                                ? "success"
                                : practice.level === "Medium"
                                ? "warning"
                                : "failure"
                            }
                            pill
                            size="sm"
                          >
                            {practice.level}
                          </Badge>
                        </div>
                        <div class="flex flex-col items-center py-2">
                          {i % 4 === 0 ? (
                            <img
                              class="w-24 h-24 mb-3 rounded-full shadow-lg"
                              src="https://bizflyportal.mediacdn.vn/thumb_wm/1000,100/bizflyportal/images/cod16174155365053.jpeg"
                              alt=""
                            />
                          ) : i % 4 === 1 ? (
                            <img
                              class="w-24 h-24 mb-3 rounded-full shadow-lg"
                              src={img4}
                              alt=""
                            />
                          ) : i % 4 === 2 ? (
                            <img
                              class="w-24 h-24 mb-3 rounded-full shadow-lg"
                              src={img5}
                              alt=""
                            />
                          ) : (
                            <img
                              class="w-24 h-24 mb-3 rounded-full shadow-lg"
                              src={img6}
                              alt=""
                            />
                          )}
                          <span class="course-author font-semibold my-2 text-blue-600">
                            {practice.author}
                          </span>
                          <div class="flex mt-2 mb-2 space-x-3 md:mt-4">
                            <button
                              href="#"
                              class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                              onClick={() => {
                                navigate(`/practice/${practice.practiceName}`, {
                                  state: {
                                    useFor: "practice",
                                    id: practice.practiceId,
                                  },
                                });
                              }}
                            >
                              Practice now
                            </button>
                          </div>
                        </div>
                        <hr className="w-[90%] mx-auto" />

                        <div className="flex justify-center bg-blue-200 px-4 pt-2">
                          <UsersIcon
                            className="h-6 w-6 text-gray-700"
                            aria-hidden="true"
                          />
                          <span className="ml-1 mr-6 font-normal ">
                            {practice.numberOfParticipants}
                          </span>
                          <HeartIcon
                            className="h-6 w-6 text-red-500"
                            aria-hidden="true"
                          />
                          <span className="ml-1 font-normal ">
                            {practice.score}
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : null;
                })
              : null}
          </div>
          {data.totalPages > 1 ? (
            <center>
              <Pagination
                // aria-current={currentPage}
                // theme={customTheme}
                currentPage={currentPage}
                onPageChange={(page) => {
                  setCurrentPage(page);
                }}
                showIcons
                totalPages={data.totalPages}
              />
            </center>
          ) : null}
        </section>
      ) : null}
    </div>
  );
};

export default Practice;
