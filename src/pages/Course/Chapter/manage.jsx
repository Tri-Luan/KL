import { Button, Spinner } from "flowbite-react";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import AlertComponent from "../../../components/ui/AlertComponent";
import ModalComponent from "../../../components/ui/ModalComponent";
import useModal from "../../../hooks/useModal";
import { BackwardIcon } from "@heroicons/react/24/outline";
import {
  useAddChapterMutation,
  useDeleteChapterMutation,
  useGetChaptersByCourseIdQuery,
  useSetHideChapterMutation,
  useUpdateChapterMutation,
} from "../../../redux/courseApiSlice";

const ChapterManagement = () => {
  const { id } = useParams();
  const {
    data,
    isLoading: isLoadingGetChapters,
    isSuccess,
    refetch,
  } = useGetChaptersByCourseIdQuery({ courseId: id });
  const [deleteChapter, { isLoading: isLoading1 }] = useDeleteChapterMutation();
  const [addChapter, { isLoading: isLoading2 }] = useAddChapterMutation();
  const [setHideChapter, { isLoading: isLoading3 }] =
    useSetHideChapterMutation();
  const [updateChapter, { isLoading: isLoading4 }] = useUpdateChapterMutation();

  const {
    arg: arg1,
    isShowing: isShowing1,
    content: content1,
    toggle: toggle1,
    setArg: setArg1,
    setContent: setContent1,
  } = useModal();
  const {
    arg: arg2,
    isShowing: isShowing2,
    content: content2,
    toggle: toggle2,
    setArg: setArg2,
    setContent: setContent2,
  } = useModal();
  const {
    arg: arg3,
    isShowing: isShowing3,
    toggle: toggle3,
    content: content3,
    setArg: setArg3,
    setContent: setContent3,
  } = useModal();
  const [alertUpdateIsShowing, setAlertUpdateIsShowing] = useState(false);
  const [alertDeleteIsShowing, setAlertDeleteIsShowing] = useState(false);
  const [errMessage, setErrMessage] = useState(null);
  const [alertIsShowing, setAlertIsShowing] = useState(false);
  const handleAddChapter = async (chapterName) => {
    const response = await addChapter({ courseId: id, chapterName })
      .unwrap()
      .then(() => {
        refetch();
      });
    if (response.data.isSuccessful) {
      setAlertIsShowing(true);
    } else {
      setErrMessage(response.data.errorMessages);
    }
  };
  const handleUpdateChapter = async (chapterId, chapterName) => {
    try {
      const response = await updateChapter({
        chapterId: chapterId,
        chapterName: chapterName,
      }).unwrap();
      if (response.isSuccessful) {
        setAlertUpdateIsShowing(true);
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
  const handleDeleteChapter = async (chapterId) => {
    try {
      const response = await deleteChapter(chapterId).unwrap();
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
  const handleSetHideChapter = async (chapterId) => {
    try {
      const response = await setHideChapter(chapterId).unwrap();
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
      {isLoadingGetChapters || isLoading1 ? (
        <div className="text-center">
          <Spinner aria-label="Center-aligned spinner" />
          <span className="ml-2">Loading...</span>
        </div>
      ) : isSuccess ? (
        <div>
          <h2 className="text-3xl font-bold mb-6 pb-4 text-center">
            Chapter Manage
          </h2>
          <section class="bg-gray-50 dark:bg-gray-900 py-3 sm:py-5">
            <div class="px-4 mx-auto max-w-screen-2xl lg:px-12">
              <Link
                to={`/coursemanagement`}
                className="ml-4 mb-4 flex w-fit font-medium text-indigo-600 hover:text-indigo-500"
              >
                <BackwardIcon className="h-6 w-6 mr-2 " aria-hidden="true" />
                Back to course management
              </Link>
              {alertIsShowing ? (
                <AlertComponent
                  content={"Create new chapter success"}
                  visible={setAlertIsShowing}
                />
              ) : null}
              {alertUpdateIsShowing ? (
                <AlertComponent
                  content={"Update chapter success"}
                  visible={setAlertUpdateIsShowing}
                />
              ) : null}
              {alertDeleteIsShowing ? (
                <AlertComponent
                  content={"Delete chapter success"}
                  visible={setAlertDeleteIsShowing}
                />
              ) : null}
              <div class="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
                <div class="flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4">
                  <div class="flex items-center flex-1 space-x-4"></div>
                  <div class="flex flex-col flex-shrink-0 space-y-3 md:flex-row md:items-center lg:justify-end md:space-y-0 md:space-x-3">
                    <Button
                      gradientDuoTone="cyanToBlue"
                      onClick={() => {
                        toggle1();
                      }}
                    >
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
                      Add chapter
                    </Button>
                    <ModalComponent
                      isShowing={isShowing1}
                      arg={arg1}
                      content={content1}
                      type="addchapterform"
                      title="Add new chapter"
                      buttonContent="Add chapter"
                      func={handleAddChapter}
                      hide={toggle1}
                      setContent={setContent1}
                    />
                    <ModalComponent
                      isShowing={isShowing2}
                      arg={arg2}
                      hide={toggle2}
                      type="editchapterform"
                      func={handleUpdateChapter}
                      title="Update chapter"
                      buttonContent="Update chapter"
                      content={content2}
                      setContent={setContent2}
                    />
                    <ModalComponent
                      isShowing={isShowing3}
                      arg={arg3}
                      title="Confirmation"
                      content="chapter"
                      hide={toggle3}
                      func={handleDeleteChapter}
                      type="delete"
                    />
                  </div>
                </div>
                <div class="overflow-x-auto pb-8">
                  <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" class="px-4 py-3">
                          Chapter name
                        </th>

                        <th scope="col" class="px-4 py-3">
                          Lesson
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
                      {data.chapters !== null
                        ? data.chapters.map((chapter, i) => {
                            return (
                              <tr class="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                                <th
                                  scope="row"
                                  className="flex items-center px-4 py-2 font-medium text-gray-900 dark:text-white"
                                >
                                  {chapter.chapterName}
                                </th>
                                <td class="px-4 py-2">
                                  <Link
                                    to={`/lessonmanagement/${chapter.chapterId}`}
                                    state={{ courseId: id }}
                                    className="font-medium text-blue-600 dark:text-blue-500 hover:text-blue-700"
                                  >
                                    Manage
                                  </Link>
                                </td>
                                <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                  <div class="flex items-center">
                                    <div
                                      className={`inline-block w-4 h-4 mr-2 ${
                                        chapter.isHidden
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
                                        handleSetHideChapter(chapter.chapterId);
                                      }}
                                    >
                                      switch
                                    </Button>
                                  </div>
                                </td>
                                <td>
                                  <div class="flex items-center px-5">
                                    <button
                                      onClick={() => {
                                        setArg2(chapter.chapterId);
                                        toggle2();
                                        setContent2(chapter.chapterName);
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
                                    </button>
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
                                          setArg3(chapter.chapterId);
                                          toggle3();
                                        }}
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                        />
                                      </svg>
                                    </button>
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

export default ChapterManagement;
