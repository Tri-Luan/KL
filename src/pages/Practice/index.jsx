import { Badge, Pagination, Spinner } from "flowbite-react";
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
  const navigate = useNavigate();
  const { data: levels, isLoading: isLoadingGetLevels } =
    useGetPracticeLevelsQuery();
  const [practiceLevelId, setPracticeLevelId] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const { data, isLoading, isSuccess, isError, error } = useGetPracticesQuery(
    {
      userId: user.id,
      pageSize: 8,
      pageNumber: currentPage,
      keyword: keyword,
      levelId: practiceLevelId,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );
  return (
    <div>
      {isLoading || isLoadingGetLevels ? (
        <div className="text-center">
          <Spinner aria-label="Center-aligned spinner" />
          <span className="ml-2">Loading...</span>
        </div>
      ) : isSuccess ? (
        <section className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <div className="ml-8 my-5">
            <Breadcrumbs />
          </div>
          <img src={img2} className="w-full max-w-7xl h-56 mb-3" alt="" />
          <form className="mt-6 ml-5 flex">
            <div class="flex">
              <div class="relative w-96 mr-20">
                <input
                  type="search"
                  id="searchkeyword"
                  class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-2 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                  placeholder="Search practice by practice name"
                  required
                  defaultValue={keyword}
                />
                <button
                  type="submit"
                  class="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-600 rounded-r-lg border border-blue-600 hover:bg-blue-700 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700"
                  onClick={(e) => {
                    e.preventDefault();
                    setKeyword(
                      String(
                        document.getElementById("searchkeyword").value.trim()
                      )
                    );
                  }}
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
              <option value={0} selected={practiceLevelId === 0}>
                Level
              </option>
              {levels.levels.map((level, i) => {
                return (
                  <option
                    value={level.id}
                    selected={practiceLevelId === level.id}
                  >
                    {level.name}
                  </option>
                );
              })}
            </select>
          </form>
          <div class="grid lg:grid-cols-4 lg:gap-5 gap-5 xl:gap-x-7">
            {data.practices !== null
              ? data.practices.map((practice, i) => {
                  return practice.length !== 0 ? (
                    <div className="my-8" key={i}>
                      <div class="w-full max-w-md bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <div class="flex justify-center px-4 pt-4">
                          <Link
                            to={`/practice/${practice.practiceName}`}
                            state={{
                              useFor: "practice",
                              id: practice.practiceId,
                            }}
                          >
                            <h5 class="hover:text-[#2e72e7] mb-1 text-lg font-medium text-gray-900 dark:text-white">
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
