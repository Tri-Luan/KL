import { Badge } from "flowbite-react";
import { Link } from "react-router-dom";
import { useGetCoursesQuery } from "../../redux/courseApiSlice";

const Course = () => {
  const { data, isLoading, isSuccess, isError, error } = useGetCoursesQuery();
  console.log(data);

  return (
    <div>
      {isLoading ? (
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
        <section>
          <section className="courseCarousel">
            <div className="carousel__content container mx-auto w-full max-w-7xl">
              <h3>
                Learning programming online. Let's start with your first course!
              </h3>
              <form className="mt-6 ">
                <div class="flex">
                  <div class="relative w-2/4">
                    <input
                      type="search"
                      id="search-dropdown"
                      class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                      placeholder="Search course by course name"
                      required
                    />
                    <button
                      type="submit"
                      class="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
                                <p className="course-description mt-4 line-clamp-2 font-normal text-gray-700 dark:text-gray-400">
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
