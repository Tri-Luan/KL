import { BackwardIcon } from "@heroicons/react/24/outline";
import { Button, Spinner } from "flowbite-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import AlertComponent from "../../../../components/ui/AlertComponent";
import ModalComponent from "../../../../components/ui/ModalComponent";
import useModal from "../../../../hooks/useModal";
import { selectCurrentUser } from "../../../../redux/authSlice";
import {
  useDeleteLessonMutation,
  useGetLessonsByChapterIdQuery,
  useSetHideLessonMutation,
} from "../../../../redux/courseApiSlice";

const LessonManagement = () => {
  const { id } = useParams();
  const user = useSelector(selectCurrentUser);
  const location = useLocation();
  const {
    data,
    isLoading: isLoadingGetLessons,
    isSuccess,
    isError,
    error,
    refetch,
  } = useGetLessonsByChapterIdQuery({ chapterId: id });
  console.log(data);
  const [deleteLesson, { isLoading: isLoadingDeleteLesson }] =
    useDeleteLessonMutation();
  const [setHideLesson, { isLoading: isLoadingHideLesso }] =
    useSetHideLessonMutation();
  const { arg, isShowing, toggle, setArg } = useModal();
  const [errMessage, setErrMessage] = useState(null);
  const [alertUpdateIsShowing, setAlertUpdateIsShowing] = useState(
    location.state?.status === "Update lesson successfull"
  );
  const [alertDeleteIsShowing, setAlertDeleteIsShowing] = useState(false);
  const handleDeleteLesson = async (chapterId) => {
    try {
      const response = await deleteLesson(chapterId).unwrap();
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
  const handleSetHideLesson = async (chapterId) => {
    try {
      const response = await setHideLesson(chapterId).unwrap();
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
      {isLoadingGetLessons ? (
        <div className="text-center">
          <Spinner aria-label="Center-aligned spinner" />
          <span className="ml-2">Loading...</span>
        </div>
      ) : isSuccess ? (
        <div>
          <h2 className="text-3xl font-bold mb-6 pb-4 text-center">
            Lesson Manage
          </h2>
          <section class="bg-gray-50 dark:bg-gray-900 py-7 sm:py-5">
            <div class="px-2 mx-auto max-w-screen-2xl lg:px-12">
              <Link
                to={`/chaptermanagement/${id}`}
                className="ml-4 mb-4 flex w-fit font-medium text-indigo-600 hover:text-indigo-500"
              >
                <BackwardIcon className="h-6 w-6 mr-2 " aria-hidden="true" />
                Back to chapter management
              </Link>
              {alertUpdateIsShowing ? (
                <AlertComponent
                  content={"Update lesson success"}
                  visible={setAlertUpdateIsShowing}
                />
              ) : null}
              {alertDeleteIsShowing ? (
                <AlertComponent
                  content={"Delete lesson success"}
                  visible={setAlertDeleteIsShowing}
                />
              ) : null}
              <div class="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 rounded-lg">
                <div class="flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4">
                  <div class="flex items-center flex-1 space-x-4">
                    <div>
                      <button
                        id="dropdownRadioButton"
                        data-dropdown-toggle="dropdownRadio"
                        class="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        type="button"
                      >
                        <svg
                          class="w-4 h-4 mr-2 text-gray-400"
                          aria-hidden="true"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        Last 30 days
                        <svg
                          class="w-3 h-3 ml-2"
                          aria-hidden="true"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          ></path>
                        </svg>
                      </button>
                    </div>
                    <label htmlFor="table-search" class="sr-only">
                      Search
                    </label>
                    <div class="relative">
                      <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg
                          class="w-5 h-5 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </div>
                      <input
                        type="text"
                        id="table-search"
                        class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search for items"
                      />
                    </div>
                  </div>
                  <div class="flex flex-col flex-shrink-0 space-y-3 md:flex-row md:items-center lg:justify-end md:space-y-0 md:space-x-3">
                    <Link to={`/lessonmanagement/create/${id}`}>
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
                        Create lesson
                      </Button>
                    </Link>
                  </div>
                </div>
                <div class="overflow-x-auto">
                  <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" class="p-4">
                          <div class="flex items-center">
                            <input
                              id="checkbox-all"
                              type="checkbox"
                              class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <label htmlFor="checkbox-all" class="sr-only">
                              checkbox
                            </label>
                          </div>
                        </th>
                        <th scope="col" class="px-4 py-3">
                          Lesson name
                        </th>
                        <th scope="col" class="px-4 py-3">
                          Score
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
                      {data.lessons !== null
                        ? data.lessons.map((lesson, i) => {
                            return (
                              <tr class="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                                <td class="w-4 px-4 py-3">
                                  <div class="flex items-center">
                                    <input
                                      id="checkbox-table-search-1"
                                      type="checkbox"
                                      onclick="event.stopPropagation()"
                                      class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                    <label
                                      htmlFor="checkbox-table-search-1"
                                      class="sr-only"
                                    >
                                      checkbox
                                    </label>
                                  </div>
                                </td>
                                <th
                                  scope="row"
                                  className="flex items-center px-4 py-2 font-medium text-gray-900 dark:text-white"
                                >
                                  {/* <img
                                className="w-auto h-12 mr-3"
                                src={"data:image/jpeg;base64," + course.image}
                                alt="course img"
                              /> */}
                                  {lesson.lessonName}
                                </th>
                                <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                  {lesson.score}
                                </td>
                                <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                  <div class="flex items-center">
                                    <div
                                      className={`inline-block w-4 h-4 mr-2 ${
                                        lesson.isHidden
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
                                        handleSetHideLesson(lesson.lessonId);
                                      }}
                                    >
                                      switch
                                    </Button>
                                  </div>
                                </td>
                                <td>
                                  <div class="flex items-center px-5">
                                    <Link
                                      to={`/lessonmanagement/update/${lesson.lessonId}`}
                                      state={{ chapterId: id }}
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
                                    <button className="ml-1">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-8 h-8 text-red-700"
                                        onClick={() => {
                                          setArg(lesson.lessonId);
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
                                      func={handleDeleteLesson}
                                      title="Confirmation"
                                      content="lesson"
                                      type="delete"
                                    />
                                  </div>
                                </td>
                              </tr>
                            );
                          })
                        : null}
                    </tbody>
                  </table>
                </div>
                <nav
                  class="flex flex-col items-start justify-between p-4 space-y-3 md:flex-row md:items-center md:space-y-0"
                  aria-label="Table navigation"
                >
                  <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
                    Showing
                    <span class="font-semibold text-gray-900 dark:text-white">
                      1-10
                    </span>
                    of
                    <span class="font-semibold text-gray-900 dark:text-white">
                      1000
                    </span>
                  </span>
                  <ul class="inline-flex items-stretch -space-x-px">
                    <li>
                      <a
                        href="#"
                        class="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                      >
                        <span class="sr-only">Previous</span>
                        <svg
                          class="w-5 h-5"
                          aria-hidden="true"
                          fill="currentColor"
                          viewbox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        class="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                      >
                        1
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        class="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                      >
                        2
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        aria-current="page"
                        class="z-10 flex items-center justify-center px-3 py-2 text-sm leading-tight border text-primary-600 bg-primary-50 border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                      >
                        3
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        class="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                      >
                        ...
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        class="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                      >
                        100
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        class="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                      >
                        <span class="sr-only">Next</span>
                        <svg
                          class="w-5 h-5"
                          aria-hidden="true"
                          fill="currentColor"
                          viewbox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </section>
        </div>
      ) : null}
    </div>
  );
};

export default LessonManagement;
