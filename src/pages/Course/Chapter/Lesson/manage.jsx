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
  const courseId = location.state?.courseId;
  const {
    data,
    isLoading: isLoadingGetLessons,
    isSuccess,
    refetch,
  } = useGetLessonsByChapterIdQuery(
    { chapterId: id },
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const [deleteLesson, { isLoading: isLoadingDeleteLesson }] =
    useDeleteLessonMutation();
  const [setHideLesson, { isLoading: isLoadingHideLesson }] =
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
                to={`/chaptermanagement/${courseId}`}
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
                  <div class="flex items-center flex-1 space-x-4"></div>
                  <div class="flex flex-col flex-shrink-0 space-y-3 md:flex-row md:items-center lg:justify-end md:space-y-0 md:space-x-3">
                    <Link
                      to={`/lessonmanagement/create/${id}`}
                      state={{ courseId: courseId }}
                    >
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
                <div class="overflow-x-auto pb-8">
                  <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
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
                                <th
                                  scope="row"
                                  className="flex items-center px-4 py-2 font-medium text-gray-900 dark:text-white"
                                >
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
                                      state={{
                                        chapterId: id,
                                        courseId: courseId,
                                      }}
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
              </div>
            </div>
          </section>
        </div>
      ) : null}
    </div>
  );
};

export default LessonManagement;
