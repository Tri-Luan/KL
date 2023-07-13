import { Button, Spinner } from "flowbite-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AlertComponent from "../../components/ui/AlertComponent";
import ModalComponent from "../../components/ui/ModalComponent";
import useModal from "../../hooks/useModal";
import { selectCurrentUser } from "../../redux/authSlice";
import {
  useDeleteCourseMutation,
  useGetCoursesByUserIdQuery,
  useSetHideCourseMutation,
} from "../../redux/courseApiSlice";
const CourseManagement = () => {
  const user = useSelector(selectCurrentUser);
  const {
    data,
    isLoading: isLoadingGetCourses,
    isSuccess,
    isError,
    error,
    refetch,
  } = useGetCoursesByUserIdQuery(
    { userId: user.id },
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const [deleteCourse, { isLoading: isLoadingDeleteCourse }] =
    useDeleteCourseMutation();
  const [setHideCourse, { isLoading: isLoadingHideCourse }] =
    useSetHideCourseMutation();
  const { arg, isShowing, toggle, setArg } = useModal();
  const [alertDeleteIsShowing, setAlertDeleteIsShowing] = useState(false);
  const [errMessage, setErrMessage] = useState(null);
  const handleDeleteCourse = async (courseId) => {
    try {
      const response = await deleteCourse(courseId).unwrap();
      if (response.isSuccessful) {
        setAlertDeleteIsShowing(true);
        refetch();
      } else {
        setErrMessage(response.errorMessages);
      }
    } catch (err) {
      if (!err?.originalStatus) {
        setErrMessage("Server not response");
      } else if (err.originalStatus === 401) {
        setErrMessage("Unauthorized");
      }
    }
  };
  const handleSetHideCourse = async (courseId) => {
    try {
      const response = await setHideCourse(courseId).unwrap();
      if (response.isSuccessful) {
        refetch();
      } else {
        setErrMessage(response.errorMessages);
      }
    } catch (err) {
      if (!err?.originalStatus) {
        setErrMessage("Server not response");
      } else if (err.originalStatus === 401) {
        setErrMessage("Unauthorized");
      }
    }
  };
  return (
    <div className="my-10 mx-auto">
      {isLoadingGetCourses || isLoadingDeleteCourse ? (
        <div className="text-center">
          <Spinner aria-label="Center-aligned spinner" />
          <span className="ml-2">Loading...</span>
        </div>
      ) : isSuccess ? (
        <div>
          <h2 className="text-3xl font-bold mb-6 pb-4 text-center">
            Course Manage
          </h2>
          <section class="bg-gray-50 dark:bg-gray-900 py-7 sm:py-5">
            <div class="px-2 mx-auto max-w-screen-2xl lg:px-12">
              {alertDeleteIsShowing ? (
                <AlertComponent
                  content={"Delete practice success"}
                  visible={setAlertDeleteIsShowing}
                />
              ) : null}
              <div class="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 rounded-lg">
                <div class="flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4">
                  <div class="flex items-center flex-1 space-x-4"></div>
                  <div class="flex flex-col flex-shrink-0 space-y-3 md:flex-row md:items-center lg:justify-end md:space-y-0 md:space-x-3">
                    <Link to="/coursemanagement/create">
                      <Button gradientDuoTone="cyanToBlue">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4.5v15m7.5-7.5h-15"
                          />
                        </svg>
                        Create course
                      </Button>
                    </Link>
                  </div>
                </div>
                <div class="overflow-x-auto pb-8">
                  <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" class="px-4 py-3">
                          Course name
                        </th>

                        <th scope="col" class="px-4 py-3">
                          Author
                        </th>
                        <th scope="col" class="px-4 py-3">
                          Description
                        </th>
                        <th scope="col" class="px-4 py-3">
                          Chapter
                        </th>
                        <th scope="col" class="px-4 py-3">
                          Rating
                        </th>
                        <th scope="col" class="px-4 py-3">
                          Show
                        </th>
                        <th scope="col" class="p-4">
                          <span class="sr-only">Op</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.coursesLists.map((courseLists, i) => {
                        return (
                          <>
                            {courseLists.courses.map((course, i) => {
                              return (
                                <tr class="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                                  <th
                                    scope="row"
                                    className="flex items-center px-4 py-2 font-medium text-gray-900 dark:text-white"
                                  >
                                    <img
                                      className="w-auto h-12 mr-3"
                                      src={
                                        "data:image/jpeg;base64," + course.image
                                      }
                                      alt="course img"
                                    />
                                    {course.courseName}
                                  </th>
                                  <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {course.authorName}
                                  </td>
                                  <td class="px-4 py-2">
                                    <p class="line-clamp-2 w-[40ch] bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
                                      {course.description}
                                    </p>
                                  </td>
                                  <td class="px-4 py-2">
                                    <Link
                                      to={`/chaptermanagement/${course.id}`}
                                      className="font-medium text-blue-600 dark:text-blue-500 hover:text-blue-700"
                                    >
                                      Manage
                                    </Link>
                                  </td>
                                  <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <div class="flex items-center">
                                      <svg
                                        aria-hidden="true"
                                        class="w-5 h-5 text-yellow-400"
                                        fill="currentColor"
                                        viewbox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                      </svg>
                                      <svg
                                        aria-hidden="true"
                                        class="w-5 h-5 text-yellow-400"
                                        fill="currentColor"
                                        viewbox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                      </svg>
                                      <svg
                                        aria-hidden="true"
                                        class="w-5 h-5 text-yellow-400"
                                        fill="currentColor"
                                        viewbox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                      </svg>
                                      <svg
                                        aria-hidden="true"
                                        class="w-5 h-5 text-yellow-400"
                                        fill="currentColor"
                                        viewbox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                      </svg>
                                      <svg
                                        aria-hidden="true"
                                        class="w-5 h-5 text-yellow-400"
                                        fill="currentColor"
                                        viewbox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                      </svg>
                                      <span class="ml-1 text-gray-500 dark:text-gray-400">
                                        5.0
                                      </span>
                                    </div>
                                  </td>
                                  <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <div class="flex items-center">
                                      <div
                                        className={`inline-block w-4 h-4 mr-2 ${
                                          course.isHidden
                                            ? `bg-red-500`
                                            : `bg-green-500`
                                        }  rounded-full`}
                                      ></div>
                                      <Button
                                        size="xs"
                                        gradientDuoTone="cyanToBlue"
                                        outline
                                        pill
                                        onClick={() => {
                                          handleSetHideCourse(course.id);
                                        }}
                                      >
                                        switch
                                      </Button>
                                    </div>
                                  </td>
                                  <td>
                                    <div class="flex items-center px-5">
                                      <Link
                                        to={`/coursemanagement/update/${course.id}`}
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          strokeWidth={1.5}
                                          stroke="currentColor"
                                          className="w-8 h-8 text-yellow-400"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                          />
                                        </svg>
                                      </Link>
                                      <button
                                        className="ml-1"
                                        data-modal-target="popup-modal"
                                        data-modal-toggle="popup-modal"
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          strokeWidth={1.5}
                                          stroke="currentColor"
                                          className="w-8 h-8 text-red-700"
                                          onClick={() => {
                                            setArg(course.id);
                                            toggle();
                                          }}
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                          />
                                        </svg>
                                      </button>
                                      <ModalComponent
                                        isShowing={isShowing}
                                        arg={arg}
                                        hide={toggle}
                                        func={handleDeleteCourse}
                                        type="delete"
                                        title="Confirmation"
                                        content="course"
                                      />
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                          </>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        </div>
      ) : null}
    </div>
  );
};

export default CourseManagement;
