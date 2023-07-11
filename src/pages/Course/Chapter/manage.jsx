import { Button, Modal, Spinner } from "flowbite-react";
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
    isError,
    error,
    refetch,
  } = useGetChaptersByCourseIdQuery({ courseId: id });
  console.log(data);
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
  const [toggleEdit, setToggleEdit] = useState(false);
  const [chapterIdEdit, setChapterIdEdit] = useState("");
  const [chapterNameEdit, setChapterNameEdit] = useState("");
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
                            fill-rule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                            clip-rule="evenodd"
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
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M19 9l-7 7-7-7"
                          ></path>
                        </svg>
                      </button>
                    </div>
                    <label for="table-search" class="sr-only">
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
                            fill-rule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clip-rule="evenodd"
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
                    {/* <Modal
                      key={`ModalEditChapter${chapter.chapterId}`}
                      show={toggleEdit}
                      size="md"
                      position="top-center"
                      popup={true}
                      onClose={() => setToggleEdit(!toggleEdit)}
                    >
                      <Modal.Header>Update chapter</Modal.Header>
                      <Modal.Body>
                        <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
                          <div className="relative z-0 w-full mb-8 ">
                            <label
                              for="chapterNameEdit"
                              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Chapter name
                            </label>
                            <input
                              type="text"
                              name="chapterName"
                              id="txtchapterNameEdit"
                              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              placeholder="Type chapter name"
                              required={true}
                              autoComplete="off"
                              value={chapterNameEdit}
                              onChange={(e) => {
                                setChapterNameEdit(e.target.value);
                              }}
                              defaultValue={chapterNameEdit}
                            />
             
                          </div>
                          <Button
                            className="w-full mr-auto"
                            onClick={() => {
                              let chapterName =
                                document.getElementById("txtchapterNameEdit");
                              console.log(chapterName.value);
                              func(arg, chapterName);
                              hide();
                            }}
                          >
                            Update chapter
                          </Button>
                        </div>
                      </Modal.Body>
                    </Modal> */}
                    <ModalComponent
                      // key="modalUpdateChapter"
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
                            <label for="checkbox-all" class="sr-only">
                              checkbox
                            </label>
                          </div>
                        </th>
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
                                <td class="w-4 px-4 py-3">
                                  <div class="flex items-center">
                                    <input
                                      id="checkbox-table-search-1"
                                      type="checkbox"
                                      onclick="event.stopPropagation()"
                                      class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                    <label
                                      for="checkbox-table-search-1"
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
                                  {chapter.chapterName}
                                </th>
                                <td class="px-4 py-2">
                                  <Link
                                    to={`/lessonmanagement/${chapter.chapterId}`}
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
                            fill-rule="evenodd"
                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                            clip-rule="evenodd"
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
                            fill-rule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clip-rule="evenodd"
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

export default ChapterManagement;
