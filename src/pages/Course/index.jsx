import { Badge, Spinner } from "flowbite-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetCoursesQuery } from "../../redux/courseApiSlice";

const Course = () => {
  const [keyword, setKeyword] = useState("");
  const { data, isLoading, isSuccess, isError, error } = useGetCoursesQuery(
    {
      keyword: keyword,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );
  return (
    <div>
      {isLoading ? (
        <div className="text-center">
          <Spinner aria-label="Center-aligned spinner" />
          <span className="ml-2">Loading...</span>
        </div>
      ) : isSuccess ? (
        <section>
          <section className="courseCarousel">
            <div className="pl-3 pt-6 mx-auto w-full max-w-7xl carousel__content">
              <h3>
                Learning programming online. Let's start with your first course!
              </h3>
              <form className="mt-6">
                <div class="flex">
                  <div class="relative w-2/4 ">
                    <input
                      type="search"
                      id="searchkeyword"
                      class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                      placeholder="Search course by course name"
                      defaultValue={keyword}
                    />
                    <button
                      class="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      onClick={(e) => {
                        e.preventDefault();
                        setKeyword(
                          String(
                            document
                              .getElementById("searchkeyword")
                              .value.trim()
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
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </section>
          {data.coursesLists.map((courseLists, i) => {
            return (
              <>
                {courseLists.courses.length !== 0 ? (
                  <div className="mx-auto w-full max-w-7xl my-5" key={i}>
                    <h2 className="text-4xl my-5 font-semibold tracking-tight text-gray-700 ">
                      {courseLists.courseLevelName}
                    </h2>
                    <div class="grid lg:grid-cols-4 lg:gap-5 gap-5 xl:gap-x-7">
                      {courseLists.courses.map((course, i) => {
                        return (
                          <div key={i}>
                            <div class="max-w-md h-[450px] bg-white border border-gray-200 rounded-lg shadow-md ">
                              <Link to={`/course/${course.id}`}>
                                <img
                                  class="rounded-t-lg h-52 min-w-full"
                                  src={"data:image/jpeg;base64," + course.image}
                                  alt=""
                                />
                              </Link>
                              <div class="view-content h-[180px] px-4 py-4">
                                <div class="view-content-header ">
                                  <div className="my-0.5 flex items-center">
                                    <svg
                                      className="h-5 w-5 text-yellow-300"
                                      fill="currentColor"
                                      viewBox="0 0 20 20"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <svg
                                      className="h-5 w-5 text-yellow-300"
                                      fill="currentColor"
                                      viewBox="0 0 20 20"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <svg
                                      className="h-5 w-5 text-yellow-300"
                                      fill="currentColor"
                                      viewBox="0 0 20 20"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <svg
                                      className="h-5 w-5 text-yellow-300"
                                      fill="currentColor"
                                      viewBox="0 0 20 20"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <svg
                                      className="h-5 w-5 text-yellow-300"
                                      fill="currentColor"
                                      viewBox="0 0 20 20"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <span className="mr-2 rounded  px-2.5 py-0.5 text-md font-semibold text-yellow-300 dark:text-yellow-300">
                                      {course.voteScore}
                                    </span>
                                    <div>
                                      <Badge
                                        className="ml-16"
                                        color="yellow"
                                        size="sm"
                                      >
                                        Online
                                      </Badge>
                                    </div>
                                  </div>
                                  <Link to={`/course/${course.id}`}>
                                    <h5 className="hover:text-[#2e72e7] mb-1 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                                      {course.courseName}
                                    </h5>
                                  </Link>
                                  <span class="course-author font-semibold my-6 text-blue-600">
                                    {course.authorName}
                                  </span>
                                </div>
                                <p className="course-description mt-1 line-clamp-2 font-normal text-gray-700 dark:text-gray-400">
                                  {course.description}
                                </p>
                              </div>

                              <div className="course-footer mt-4">
                                <hr className="mb-2 w-[90%] mx-auto" />
                                <span className="ml-5 font-medium text-blue-600">
                                  {" "}
                                  Free
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : null}
              </>
            );
          })}
        </section>
      ) : null}
    </div>

    // <div class="popover-course arrow-left" style="left: calc(100% + 20px); right: unset;">
    // <a href="/learning/object-oriented-programming-in-cpp" title="Object Oriented-Programming in C++"> <h3 class="popover-course__title">Object Oriented-Programming in C++</h3></a>
    // <div class="popover-course__sum">
    // <div class="author">
    // <img src="/CodeCamp/CodeCamp/Upload/Avatar/a76638850ecc4722b76d255e9cdd462f.jpg" alt="TuanLQ7">
    // <a href="/profile/3488" class="user-name" title="TuanLQ7">TuanLQ7</a>
    // </div>
    // <span class="rate-wrap">
    // <span class="star-rating"><span style="width:88.0%"></span></span>
    // <span class="avg-rate">4.4</span>
    // <span class="total-rate">(219)</span>
    // </span>
    // </div>
    // <ul class="popover-course__detail-infor">
    // <li><p><i class="cl-icon-dribbble"></i> Online </p></li>
    // <li><p><i class="cl-icon-users-alt"></i> 51854 students</p></li>
    // <li><p><i class="cl-icon-star" avg-rate="4.4"></i> Great reviews from students</p></li>
    // <li><p><i class="cl-icon-clock"></i> Time to complete: <strong>40 hours</strong></p></li>
    // <li><p><i class="cl-icon-award"></i> Certificate of Course Completion</p></li>
    // </ul>
    // </div>
    // </div>
    // </article>
  );
};

export default Course;
