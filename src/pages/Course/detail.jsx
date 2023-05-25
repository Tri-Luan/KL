import { Avatar, Tabs } from "flowbite-react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { selectCurrentUser } from "../../redux/authSlice";
import { useGetCourseDetailQuery } from "../../redux/courseApiSlice";

const CourseDetail = () => {
  const { id } = useParams();
  const user = useSelector(selectCurrentUser);

  const {
    data: course,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCourseDetailQuery({ userId: user.id, courseId: id });
  console.log(course);
  useEffect(() => {
    if (isSuccess) {
      document.getElementById("objective").innerHTML = course.objective;
    }
  }, [isSuccess]);
  return (
    <>
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
        <div>
          <section className="udeCarousel">
            <div className="carousel__content">
              <h1>{course.courseName}</h1>
              <p className="line-clamp-3">{course.description}</p>
              <div className="mt-2.5 mb-5 flex items-center">
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
                  5.0
                </span>
                <span className="mr-2 rounded  px-2.5 py-0.5 text-md font-normal text-white dark:text-yellow-300">
                  2345 ratings
                </span>
              </div>
              <div className="flex justify-start">
                <Avatar
                  img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                  rounded={true}
                  className="mt-2.5 mb-5 ml-2 "
                >
                  <div className="space-y-1 font-medium dark:text-white">
                    <div className="text-sm text-white dark:text-white">
                      {course.authorName}
                    </div>
                  </div>
                </Avatar>
              </div>

              <button
                class="btnRed mt-3 "
                // onClick={() => {
                //   handleButton();
                // }}
              >
                Enroll for Free!
              </button>
              <div className="mt-7 font-medium dark:text-white">
                <div className="text-md text-white dark:text-white">
                  <span className="font-bold text-xl"> 1234 </span>already
                  enrolled
                </div>
              </div>
            </div>
          </section>
          <div class="container mx-auto my-5">
            <Tabs.Group aria-label="Tabs with underline" style="underline">
              <Tabs.Item active={true} title="Objective">
                <div id="objective"></div>
                {/* <div>{course.Objective}</div> */}
              </Tabs.Item>
              <Tabs.Item title="Tasks">
                <div class="grid grid-cols-2 md:grid-cols-2 gap-4">
                  <div className="lesson mt-14">
                    <center>
                      <div className="title w-fit px-6 py-3 text-center rounded-full bg-indigo-500 text-white">
                        <h3>Class and Object</h3>
                      </div>
                      <div className="flex justify-center my-6">
                        <Link
                          to="/course/:id/:lessonid"
                          className="mx-1.5 my-3"
                        >
                          <div className="rounded-full hover:bg-indigo-500 hover:text-white border-2 border-indigo-500 text-indigo-500 font-medium pt-1.5 w-10 h-10">
                            1
                          </div>
                        </Link>
                        <Link
                          to="/course/:id/:lessonid"
                          className="mx-1.5 my-3"
                        >
                          <div className="rounded-full hover:bg-indigo-500 hover:text-white border-2 border-indigo-500 text-indigo-500 font-medium pt-1.5 w-10 h-10">
                            2
                          </div>
                        </Link>
                        <Link
                          to="/course/:id/:lessonid"
                          className="mx-1.5 my-3"
                        >
                          <div className="rounded-full hover:bg-indigo-500 hover:text-white border-2 border-indigo-500 text-indigo-500 font-medium pt-1.5 w-10 h-10">
                            3
                          </div>
                        </Link>
                        <Link
                          to="/course/:id/:lessonid"
                          className="mx-1.5 my-3"
                        >
                          <div className="rounded-full hover:bg-indigo-500 hover:text-white border-2 border-indigo-500 text-indigo-500 font-medium pt-1.5 w-10 h-10">
                            4
                          </div>
                        </Link>
                        <Link
                          to="/course/:id/:lessonid"
                          className="mx-1.5 my-3"
                        >
                          <div className="rounded-full hover:bg-indigo-500 hover:text-white border-2 border-indigo-500 text-indigo-500 font-medium pt-1.5 w-10 h-10">
                            5
                          </div>
                        </Link>
                        <Link
                          to="/course/:id/:lessonid"
                          className="mx-1.5 my-3"
                        >
                          <div className="rounded-full hover:bg-indigo-500 hover:text-white border-2 border-indigo-500 text-indigo-500 font-medium pt-1.5 w-10 h-10">
                            6
                          </div>
                        </Link>
                      </div>
                    </center>
                  </div>
                  <div className="lesson mt-14">
                    <center>
                      <div className="title w-fit px-6 py-3 text-center rounded-full bg-indigo-500 text-white">
                        <h3>Static variables and methods</h3>
                      </div>
                      <div className="flex justify-center my-6">
                        <Link
                          to="/course/:id/:lessonid"
                          className="mx-1.5 my-3"
                        >
                          <div className="rounded-full hover:bg-indigo-500 hover:text-white border-2 border-indigo-500 text-indigo-500 font-medium pt-1.5 w-10 h-10">
                            1
                          </div>
                        </Link>
                        <Link
                          to="/course/:id/:lessonid"
                          className="mx-1.5 my-3"
                        >
                          <div className="rounded-full hover:bg-indigo-500 hover:text-white border-2 border-indigo-500 text-indigo-500 font-medium pt-1.5 w-10 h-10">
                            2
                          </div>
                        </Link>
                        <Link
                          to="/course/:id/:lessonid"
                          className="mx-1.5 my-3"
                        >
                          <div className="rounded-full hover:bg-indigo-500 hover:text-white border-2 border-indigo-500 text-indigo-500 font-medium pt-1.5 w-10 h-10">
                            3
                          </div>
                        </Link>
                        <Link
                          to="/course/:id/:lessonid"
                          className="mx-1.5 my-3"
                        >
                          <div className="rounded-full hover:bg-indigo-500 hover:text-white border-2 border-indigo-500 text-indigo-500 font-medium pt-1.5 w-10 h-10">
                            4
                          </div>
                        </Link>
                        <Link
                          to="/course/:id/:lessonid"
                          className="mx-1.5 my-3"
                        >
                          <div className="rounded-full hover:bg-indigo-500 hover:text-white border-2 border-indigo-500 text-indigo-500 font-medium pt-1.5 w-10 h-10">
                            5
                          </div>
                        </Link>
                        <Link
                          to="/course/:id/:lessonid"
                          className="mx-1.5 my-3"
                        >
                          <div className="rounded-full hover:bg-indigo-500 hover:text-white border-2 border-indigo-500 text-indigo-500 font-medium pt-1.5 w-10 h-10">
                            6
                          </div>
                        </Link>
                        <Link
                          to="/course/:id/:lessonid"
                          className="mx-1.5 my-3"
                        >
                          <div className="rounded-full hover:bg-indigo-500 hover:text-white border-2 border-indigo-500 text-indigo-500 font-medium pt-1.5 w-10 h-10">
                            7
                          </div>
                        </Link>
                        <Link
                          to="/course/:id/:lessonid"
                          className="mx-1.5 my-3"
                        >
                          <div className="rounded-full hover:bg-indigo-500 hover:text-white border-2 border-indigo-500 text-indigo-500 font-medium pt-1.5 w-10 h-10">
                            8
                          </div>
                        </Link>
                      </div>
                    </center>
                  </div>
                  <div className="lesson mt-14">
                    <center>
                      <div className="title w-fit px-6 py-3 text-center rounded-full bg-indigo-500 text-white">
                        <h3>Encapsulation</h3>
                      </div>
                      <div className="flex justify-center my-6">
                        <Link
                          to="/course/:id/:lessonid"
                          className="mx-1.5 my-3"
                        >
                          <div className="rounded-full hover:bg-indigo-500 hover:text-white border-2 border-indigo-500 text-indigo-500 font-medium pt-1.5 w-10 h-10">
                            1
                          </div>
                        </Link>
                        <Link
                          to="/course/:id/:lessonid"
                          className="mx-1.5 my-3"
                        >
                          <div className="rounded-full hover:bg-indigo-500 hover:text-white border-2 border-indigo-500 text-indigo-500 font-medium pt-1.5 w-10 h-10">
                            2
                          </div>
                        </Link>
                        <Link
                          to="/course/:id/:lessonid"
                          className="mx-1.5 my-3"
                        >
                          <div className="rounded-full hover:bg-indigo-500 hover:text-white border-2 border-indigo-500 text-indigo-500 font-medium pt-1.5 w-10 h-10">
                            3
                          </div>
                        </Link>
                        <Link
                          to="/course/:id/:lessonid"
                          className="mx-1.5 my-3"
                        >
                          <div className="rounded-full hover:bg-indigo-500 hover:text-white border-2 border-indigo-500 text-indigo-500 font-medium pt-1.5 w-10 h-10">
                            4
                          </div>
                        </Link>
                      </div>
                    </center>
                  </div>
                  <div className="lesson mt-14">
                    <center>
                      <div className="title w-fit px-6 py-3 text-center rounded-full bg-indigo-500 text-white">
                        <h3>Inheritance</h3>
                      </div>
                      <div className="flex justify-center my-6">
                        <Link
                          to="/course/:id/:lessonid"
                          className="mx-1.5 my-3"
                        >
                          <div className="rounded-full hover:bg-indigo-500 hover:text-white border-2 border-indigo-500 text-indigo-500 font-medium pt-1.5 w-10 h-10">
                            1
                          </div>
                        </Link>
                        <Link
                          to="/course/:id/:lessonid"
                          className="mx-1.5 my-3"
                        >
                          <div className="rounded-full hover:bg-indigo-500 hover:text-white border-2 border-indigo-500 text-indigo-500 font-medium pt-1.5 w-10 h-10">
                            2
                          </div>
                        </Link>
                        <Link
                          to="/course/:id/:lessonid"
                          className="mx-1.5 my-3"
                        >
                          <div className="rounded-full hover:bg-indigo-500 hover:text-white border-2 border-indigo-500 text-indigo-500 font-medium pt-1.5 w-10 h-10">
                            3
                          </div>
                        </Link>
                        <Link
                          to="/course/:id/:lessonid"
                          className="mx-1.5 my-3"
                        >
                          <div className="rounded-full hover:bg-indigo-500 hover:text-white border-2 border-indigo-500 text-indigo-500 font-medium pt-1.5 w-10 h-10">
                            4
                          </div>
                        </Link>
                        <Link
                          to="/course/:id/:lessonid"
                          className="mx-1.5 my-3"
                        >
                          <div className="rounded-full hover:bg-indigo-500 hover:text-white border-2 border-indigo-500 text-indigo-500 font-medium pt-1.5 w-10 h-10">
                            5
                          </div>
                        </Link>
                      </div>
                    </center>
                  </div>
                </div>
              </Tabs.Item>
              <Tabs.Item title="Reviews">Reviews</Tabs.Item>
              <Tabs.Item title="Certificate">Certificate</Tabs.Item>
            </Tabs.Group>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default CourseDetail;
