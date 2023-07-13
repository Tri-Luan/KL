//Import CSS
import "../../style/IDE.css";

import React, { Fragment, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Split from "react-split";
import { Listbox, Transition, Tab } from "@headlessui/react";
import {
  CheckIcon,
  ChevronUpDownIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  LockClosedIcon,
} from "@heroicons/react/24/solid";
import {
  ArrowPathIcon,
  ArrowDownTrayIcon,
  ChevronDoubleRightIcon,
  BookOpenIcon,
  AcademicCapIcon,
  ChatBubbleBottomCenterTextIcon,
  ClockIcon,
  HeartIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import ReactCodeMirror from "@uiw/react-codemirror";
import { oneDark } from "@codemirror/theme-one-dark";
import { javascript } from "@codemirror/lang-javascript";
import {
  useAddLessonCommentMutation,
  useAddLessonReplyCommentMutation,
  useCommentLessonActionMutation,
  useDeleteLessonCommentMutation,
  useDeleteLessonReplyCommentMutation,
  useGetCodeLanguagesQuery,
  useGetLessonCommentsMutation,
  useGetLessonDetailsQuery,
  useGetLessonHistoryQuery,
  useGetLessonLeaderboardQuery,
  useReplycommentLessonActionMutation,
  useRunCodeLessonMutation,
  useSubmitCodeLessonMutation,
} from "../../redux/courseApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/authSlice";
import { Spinner, Table, Tabs, Pagination, Badge } from "flowbite-react";
import useModal from "../../hooks/useModal";
import ModalComponent from "../../components/ui/ModalComponent";
import userAvatar from "../../assets/images/userAvatar.png";
import Breadcrumbs from "../../components/ui/Breadcrumbs";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const CodeEditor1 = () => {
  const navigate = useNavigate();
  const tabsRef = useRef(null);
  const props = { tabsRef };
  const location = useLocation();
  const id = location.state.id;
  const courseId = location.state.courseId;
  const user = useSelector(selectCurrentUser);
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: languages,
    isLoading: isLoadingGetCodeLanguages,
    isSuccess: isSuccessGetCodeLanguages,
    isError: isErrorGetCodeLanguages,
    error: errorGetCodeLanguages,
  } = useGetCodeLanguagesQuery();
  const {
    data: lesson,
    isLoading: isLoadingGetLessonDetails,
    isSuccess: isSuccessGetLessonDetails,
    isError: isErrorGetLessonDetails,
    error: errorGetLessonDetails,
  } = useGetLessonDetailsQuery({ lessonId: id, userId: user.id });
  const {
    data: histories,
    isLoading: isLoadingGetLessonHistory,
    isSuccess: isSuccessGetLessonHistory,
    isError: isErrorGetLessonHistory,
    error: errorGetLessonHistory,
    refetch: refetchGetLessonHistory,
  } = useGetLessonHistoryQuery({ lessonId: id, userId: user.id });
  const {
    data: leaderBoards,
    isLoading: isLoadingGetLeaderBoard,
    isSuccess: isSuccessGetLeaderBoard,
    isError: isErrorGetLeaderBoard,
    error: errorGetLeaderBoard,
    refetch: refetchGetLessonLeaderboard,
  } = useGetLessonLeaderboardQuery({
    lessonId: id,
    pageSize: 5,
    pageNumber: currentPage,
  });

  const [getLessonComments] = useGetLessonCommentsMutation();

  const [runCodeLesson, { isLoading: isLoadingRunCode }] =
    useRunCodeLessonMutation();
  const [submitCodeLesson, { isLoading: isLoadingSubmitCode }] =
    useSubmitCodeLessonMutation();

  const [addLessonComment, { isLoading: isLoadingAddLessonComment }] =
    useAddLessonCommentMutation();

  const [addLessonReplyComment, { isLoading: isLoadingAddLessonReplyComment }] =
    useAddLessonReplyCommentMutation();
  const [commentAction] = useCommentLessonActionMutation();
  const [replyCommentAction] = useReplycommentLessonActionMutation();
  const [deleteComment, { isLoading: isLoadingDeleteLessonComment }] =
    useDeleteLessonCommentMutation();
  const [deleteReplyComment, { isLoading: isLoadingDeleteLessonReplyComment }] =
    useDeleteLessonReplyCommentMutation();

  const [comments, setComments] = useState(null);
  const [code, setCode] = useState("");
  const [results, setResults] = useState(null);
  const [isError, setIsError] = useState(false);

  const [disableSubmitButton, setDisableSubmitButton] = useState(true);
  const [error, setError] = useState({
    errorType: String,
    errorMessage: String,
  });
  const [comment, setComment] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState({});
  const {
    arg: arg1,
    isShowing: isShowing1,
    toggle: toggle1,
    setArg: setArg1,
  } = useModal();
  const {
    arg: arg2,
    isShowing: isShowing2,
    toggle: toggle2,
    setArg: setArg2,
    results: results2,
    setResults: setResults2,
  } = useModal();
  const {
    arg: arg3,
    isShowing: isShowing3,
    toggle: toggle3,
    setArg: setArg3,
  } = useModal();
  const { arg: arg4, isShowing: isShowing4, toggle: toggle4 } = useModal();
  const {
    arg: arg5,
    isShowing: isShowing5,
    toggle: toggle5,
    setArg: setArg5,
  } = useModal();
  useEffect(() => {
    if (!isLoadingGetLessonDetails && isSuccessGetLessonDetails) {
      setSelectedLanguage({
        codeLanguageId: lesson.codeSamples[0].codeLanguageId,
        codeLanguageName: lesson.codeSamples[0].codeLanguageName,
        codeLanguageVersion: lesson.codeSamples[0].codeLanguageVersion,
      });
      setCode(lesson.codeSamples[0].codeSample);
    }
  }, [isSuccessGetLessonDetails, isLoadingGetLessonDetails]);

  const renderConditionIcon = (cond) => {
    if (cond === true) {
      return <CheckCircleIcon className="text-green-600 inline h-5 w-5" />;
    } else if (cond === false) {
      return <ExclamationCircleIcon className="text-red-600 inline h-5 w-5" />;
    }
  };
  const SelectLanguage = () => {
    return (
      <div className="mx-5 mt-[7px] w-40">
        <Listbox
          value={selectedLanguage}
          onChange={(value) => setSelectedLanguage(value)}
        >
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
              <span className="block truncate">
                {selectedLanguage.codeLanguageName +
                  " (" +
                  selectedLanguage.codeLanguageVersion +
                  ")"}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {languages.codeLanguages.map((codeLanguage, i) => {
                  return lesson.codeSamples.findIndex(
                    (codeSample) =>
                      codeSample.codeLanguageId === codeLanguage.codeLanguageId
                  ) >= 0 ? (
                    <Listbox.Option
                      key={i}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active
                            ? "bg-amber-100 text-amber-900"
                            : "text-gray-900"
                        }`
                      }
                      value={codeLanguage}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {codeLanguage.codeLanguageName +
                              " (" +
                              codeLanguage.codeLanguageVersion +
                              ")"}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ) : null;
                })}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>
    );
  };
  const renderTestCase = () => {
    return (
      <>
        <h3 className="text-2xl text-white font-bold mb-1 text-center">
          Test Cases
        </h3>
        <div className="w-full overflow-y-auto h-60 ml-6 mt-4  inline-flex sm:px-0">
          <Tab.Group vertical>
            <Tab.List className="flex w-50 max-w-md flex-col space-x-0 space-y-4 rounded-xl bg-slate-800 p-1">
              {lesson.testCases.map((testCase, Idx) => (
                <Tab
                  key={testCase}
                  className={({ selected }) =>
                    classNames(
                      "w-full flex ml-0 rounded-lg px-2.5 py-2.5 text-sm font-medium leading-5 text-white",
                      selected
                        ? "bg-slate-700 "
                        : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                    )
                  }
                >
                  Test Case {Idx + 1}
                  {testCase.isHidden === true ? (
                    <LockClosedIcon
                      className="ml-2 h-5 w-5"
                      aria-hidden="true"
                    />
                  ) : results !== null ? (
                    results.testCases.map((result, i) =>
                      result.testCaseId === testCase.testCaseId
                        ? renderConditionIcon(result.isPassed)
                        : null
                    )
                  ) : null}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="">
              {lesson.testCases.map((testCase, Idx) =>
                !testCase.isHidden ? (
                  <Tab.Panel
                    key={Idx}
                    className={classNames(
                      "rounded-xl bg-slate-700 h-[200px] w-[600px] text-white  p-3"
                    )}
                  >
                    <p>
                      <span className="text-blue-400">Input:</span>
                      {testCase.input}
                    </p>
                    <p>
                      <span className="text-blue-400">
                        Actual output:&nbsp;
                      </span>
                      {results !== null
                        ? results.testCases.map((result, i) =>
                            result.testCaseId === testCase.testCaseId
                              ? result.actualOutput
                              : null
                          )
                        : null}
                    </p>
                    <p>
                      <span className="text-blue-400">Expected output:</span>{" "}
                      {testCase.expectedOutput}
                    </p>
                  </Tab.Panel>
                ) : (
                  <Tab.Panel
                    key={Idx}
                    className={classNames(
                      "rounded-xl bg-slate-700 h-[200px] w-[600px] text-white  p-3"
                    )}
                  >
                    <p>
                      <span className="text-blue-400">Hidden test case</span>
                    </p>
                  </Tab.Panel>
                )
              )}
            </Tab.Panels>
          </Tab.Group>
        </div>
      </>
    );
  };

  const runCode = async () => {
    const response = await runCodeLesson({
      lessonId: lesson.lessonId,
      lessonCode: code,
      codeLanguageId: selectedLanguage.codeLanguageId,
    }).unwrap();
    if (response.errorType === null && response.errorMessage === null) {
      setResults(response);
      setDisableSubmitButton(false);
    } else if (response.errorType !== null && response.errorMessage !== null) {
      setError({
        errorType: response.errorType,
        errorMessage: response.errorMessage,
      });
      setIsError(true);
    }
  };
  const submitCode = async () => {
    const response = await submitCodeLesson({
      lessonId: lesson.lessonId,
      lessonCode: code,
      codeLanguageId: selectedLanguage.codeLanguageId,
      userId: user.id,
    }).unwrap();
    refetchGetLessonHistory();
    refetchGetLessonLeaderboard();
    setResults2(response);
    toggle2();
  };
  const handleNavigate = () => {
    navigate(`/course/${courseId}`);
  };
  const handleComment = async () => {
    try {
      if (comment !== "") {
        const response = await addLessonComment({
          userId: user.id,
          lessonId: id,
          content: comment,
        })
          .unwrap()
          .then(async () => {
            const comments = await getLessonComments({
              userId: user.id,
              lessonId: id,
            });
            setComments(comments.data);
          });
      }

      setComment("");
    } catch (err) {
      console.error("Failed to delete the comment", err);
    }
  };
  const handleReplyComment = async (arg, content) => {
    try {
      if (content !== "") {
        const response = await addLessonReplyComment({
          userId: user.id,
          lessonCommentId: arg,
          content: content,
        })
          .unwrap()
          .then(async () => {
            const comments = await getLessonComments({
              userId: user.id,
              lessonId: id,
            });
            setComments(comments.data);
          });
      }
    } catch (err) {
      console.error("Failed to delete the comment", err);
    }
  };

  const onLikeCommentClicked = async (commentId) => {
    try {
      await commentAction({
        userId: user.id,
        commentId: commentId,
        actionId: 0,
      })
        .unwrap()
        .then(async () => {
          const comments = await getLessonComments({
            userId: user.id,
            lessonId: id,
          });
          setComments(comments.data);
        });
    } catch (err) {
      console.error("Failed to like the comment", err);
    }
  };
  const onDisLikeCommentClicked = async (commentId) => {
    try {
      await commentAction({
        userId: user.id,
        commentId: commentId,
        actionId: 1,
      })
        .unwrap()
        .then(async () => {
          const comments = await getLessonComments({
            userId: user.id,
            lessonId: id,
          });
          setComments(comments.data);
        });
    } catch (err) {
      console.error("Failed to dislike the comment", err);
    }
  };
  const onLikeReplyCommentClicked = async (commentId) => {
    try {
      await replyCommentAction({
        userId: user.id,
        commentId: commentId,
        actionId: 0,
      })
        .unwrap()
        .then(async () => {
          const comments = await getLessonComments({
            userId: user.id,
            lessonId: id,
          });
          setComments(comments.data);
        });
    } catch (err) {
      console.error("Failed to like the reply comment", err);
    }
  };
  const onDisLikeReplyCommentClicked = async (commentId) => {
    try {
      await replyCommentAction({
        userId: user.id,
        commentId: commentId,
        actionId: 1,
      })
        .unwrap()
        .then(async () => {
          const comments = await getLessonComments({
            userId: user.id,
            lessonId: id,
          });
          setComments(comments.data);
        });
    } catch (err) {
      console.error("Failed to dislike the reply comment", err);
    }
  };
  const onDeleteCommentClicked = async (commentId) => {
    try {
      await deleteComment({ userId: user.id, commentId: commentId })
        .unwrap()
        .then(async () => {
          const comments = await getLessonComments({
            userId: user.id,
            lessonId: id,
          });
          setComments(comments.data);
        });
    } catch (err) {
      console.error("Failed to delete the comment", err);
    }
  };
  const onDeleteReplyCommentClicked = async (commentId) => {
    try {
      await deleteReplyComment({ userId: user.id, replyCommentId: commentId })
        .unwrap()
        .then(async () => {
          const comments = await getLessonComments({
            userId: user.id,
            lessonId: id,
          });
          setComments(comments.data);
        });
    } catch (err) {
      console.error("Failed to delete the reply comment", err);
    }
  };
  return (
    <>
      {isLoadingGetLessonDetails ||
      isLoadingGetCodeLanguages ||
      isLoadingGetLessonHistory ||
      isLoadingGetLeaderBoard ? (
        <div className="text-center">
          <Spinner aria-label="Center-aligned spinner" />
          <span className="ml-2">Loading...</span>
        </div>
      ) : lesson !== null ? (
        <section>
          {/* Breadcrumb Start */}
          <ModalComponent
            isShowing={isShowing3}
            arg={arg3}
            hide={toggle3}
            func={onDeleteCommentClicked}
            title="Confirmation"
            content="comment"
            type="delete"
          />
          <ModalComponent
            isShowing={isShowing4}
            arg={arg4}
            hide={toggle4}
            func={() => setCode("")}
            title="Confirmation"
            content="Are you sure you want to refresh code?"
            type="confirm"
          />
          <ModalComponent
            isShowing={isShowing5}
            arg={arg5}
            hide={toggle5}
            func={onDeleteReplyCommentClicked}
            title="Confirmation"
            content="reply comment"
            type="delete"
          />
          <div className="h-[5vh] py-2 px-4 bg-gray-50  border-y-2 border-gray-200">
            <Breadcrumbs />
          </div>

          {/* Breadcrumb End  */}
          <Split
            className="split"
            sizes={[30, 70]}
            minSize={100}
            gutterSize={10}
            snapOffset={10}
            dragInterval={1}
            cursor="row-resize"
          >
            {/* Tabs Start */}
            <Tabs.Group
              className="flex-col"
              aria-label="Tabs with icons"
              ref={props.tabsRef}
              onActiveTabChange={async (tab) => {
                if (tab === 3) {
                  const comments = await getLessonComments({
                    userId: user.id,
                    lessonId: id,
                  });
                  setComments(comments.data);
                }
              }}
            >
              <Tabs.Item active icon={BookOpenIcon} title="Lesson">
                {
                  <div>
                    <div className="flex mb-3">
                      <UserIcon className="text-gray-800  mr-1 h-5 w-5" />
                      <span class="course-author font-semibold  text-blue-600">
                        {lesson.authorName}
                      </span>
                      <HeartIcon className="text-blue-600 ml-4  mr-1 h-5 w-5" />
                      <span class="course-author font-base  ">
                        {lesson.score} Points
                      </span>
                    </div>
                    <div
                      className="block p-0 max-h-[70vh] w-full overflow-auto "
                      id="content"
                      dangerouslySetInnerHTML={{
                        __html: lesson.content,
                      }}
                    />
                  </div>
                }
              </Tabs.Item>
              <Tabs.Item icon={AcademicCapIcon} title="Leaderboard">
                <Table hoverable>
                  <Table.Head>
                    <Table.HeadCell>No</Table.HeadCell>
                    <Table.HeadCell>Submit Time</Table.HeadCell>
                    <Table.HeadCell>Language</Table.HeadCell>
                    <Table.HeadCell>Score</Table.HeadCell>
                    <Table.HeadCell>Submitted By</Table.HeadCell>
                  </Table.Head>
                  <Table.Body className="divide-y">
                    {leaderBoards.leaderboards !== null
                      ? leaderBoards.leaderboards.map((leaderBoard, i) => {
                          return (
                            <Table.Row className="bg-white text-blue-500 text-base">
                              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {i + 1}
                              </Table.Cell>
                              <Table.Cell>
                                {new Date(
                                  leaderBoard.submittedDate
                                ).toLocaleString("vi-VN", {
                                  month: "numeric",
                                  day: "numeric",
                                  year: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  second: "2-digit",
                                  timeZoneName: "short",
                                })}
                              </Table.Cell>
                              <Table.Cell>
                                {leaderBoard.codeLanguageName}
                              </Table.Cell>
                              <Table.Cell>{leaderBoard.score}</Table.Cell>
                              <Table.Cell>{leaderBoard.authorName}</Table.Cell>
                            </Table.Row>
                          );
                        })
                      : null}
                  </Table.Body>
                </Table>
                {leaderBoards.leaderboards !== null &&
                leaderBoards.totalPages > 1 ? (
                  <center>
                    <Pagination
                      currentPage={currentPage}
                      onPageChange={(page) => {
                        setCurrentPage(page);
                      }}
                      showIcons
                      totalPages={leaderBoards.totalPages}
                    />
                  </center>
                ) : null}
              </Tabs.Item>
              <Tabs.Item icon={ClockIcon} title="Submit History">
                <div className="max-h-[70vh] w-full overflow-y-auto ">
                  <Table hoverable>
                    <Table.Head>
                      <Table.HeadCell>No</Table.HeadCell>
                      <Table.HeadCell>Submit Time</Table.HeadCell>
                      <Table.HeadCell>Language</Table.HeadCell>
                      <Table.HeadCell>Test Case</Table.HeadCell>
                      <Table.HeadCell>Score</Table.HeadCell>
                      <Table.HeadCell>Submitted By</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                      {histories !== null
                        ? histories.lessonHistories.map((history, i) => {
                            return (
                              <Table.Row className="bg-white text-blue-500 text-base">
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                  {i + 1}
                                </Table.Cell>
                                <Table.Cell>
                                  {new Date(
                                    history.submittedDate
                                  ).toLocaleString("vi-VN", {
                                    month: "numeric",
                                    day: "numeric",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    second: "2-digit",
                                    timeZoneName: "short",
                                  })}
                                </Table.Cell>
                                <Table.Cell>
                                  {history.codeLanguageName}
                                </Table.Cell>
                                <Table.Cell>{history.testCase}</Table.Cell>
                                <Table.Cell>{history.score}</Table.Cell>
                                <Table.Cell>{history.userSubmitted}</Table.Cell>
                              </Table.Row>
                            );
                          })
                        : null}
                    </Table.Body>
                  </Table>
                </div>
              </Tabs.Item>
              <Tabs.Item icon={ChatBubbleBottomCenterTextIcon} title="Comment">
                <section class="bg-white dark:bg-gray-900  lg:py-4 p-0 max-h-[70vh] w-full overflow-auto ">
                  <div class="max-w-2xl px-4">
                    <div class="flex justify-between items-center mb-6"></div>
                    {isLoadingDeleteLessonReplyComment ||
                    isLoadingDeleteLessonComment ||
                    isLoadingAddLessonReplyComment ||
                    isLoadingAddLessonComment ? (
                      <div className="text-center">
                        <Spinner aria-label="Center-aligned spinner example" />
                      </div>
                    ) : null}
                    <ModalComponent
                      isShowing={isShowing1}
                      arg={arg1}
                      type="replycomment"
                      title="Reply comment"
                      func={handleReplyComment}
                      hide={toggle1}
                    />
                    <div class="mb-6">
                      <div class="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                        <label for="comment" class="sr-only">
                          Your comment
                        </label>
                        <textarea
                          id="comment"
                          rows="6"
                          class="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                          placeholder="Write a comment..."
                          required
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                      </div>
                      <button
                        class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-500 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-blue-600"
                        onClick={handleComment}
                      >
                        Post comment
                      </button>
                    </div>
                    {comments !== null
                      ? comments.lessonComments.map((comment, i) => {
                          return (
                            <>
                              <article class="p-6 mb-6 text-base bg-white rounded-lg dark:bg-gray-900">
                                <footer class="flex justify-between items-center mb-2">
                                  <div class="flex items-center">
                                    <p class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                                      <img
                                        class="mr-2 w-6 h-6 rounded-full"
                                        src={userAvatar}
                                        alt="Michael Gough"
                                      />
                                      {comment.authorName}
                                    </p>
                                    <p class="text-sm text-gray-600 dark:text-gray-400">
                                      <time pubdate>
                                        {new Date(
                                          comment.commentDate
                                        ).toLocaleString("en-US", {
                                          month: "long",
                                          day: "numeric",
                                          year: "numeric",
                                        })}
                                      </time>
                                    </p>
                                  </div>

                                  {comment.authorId === user.id ? (
                                    <button
                                      id={`dropdownComment${i}Button`}
                                      data-dropdown-toggle={`dropdownComment${i}`}
                                      class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                      type="button"
                                      onClick={() => {
                                        setArg3(comment.commentId);
                                        toggle3();
                                      }}
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-5 h-5 text-red-700"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                        />
                                      </svg>
                                      <span class="sr-only">
                                        Comment settings
                                      </span>
                                    </button>
                                  ) : null}
                                </footer>
                                <p class="text-gray-900 ">{comment.content}</p>
                                <div class="flex items-center mt-4 space-x-4">
                                  <button
                                    type="button"
                                    class="relative inline-flex items-center pr-5 py-2.5 text-sm font-medium text-center "
                                    onClick={() => {
                                      onLikeCommentClicked(comment.commentId);
                                    }}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={1}
                                      stroke="currentColor"
                                      className="w-6 h-6"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                                      />
                                    </svg>

                                    <div class="absolute inline-flex items-center justify-center w-6 h-6 text-md font-bold text-green-500 border-2 border-white rounded-full -right-1 ">
                                      {comment.numberOfLike}
                                    </div>
                                  </button>
                                  <button
                                    type="button"
                                    class="relative inline-flex items-center pr-5 py-2.5 text-sm font-medium text-center "
                                    onClick={() => {
                                      onDisLikeCommentClicked(
                                        comment.commentId
                                      );
                                    }}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke-width="1"
                                      stroke="currentColor"
                                      class="w-6 h-6"
                                    >
                                      <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384"
                                      />
                                    </svg>

                                    <div class="absolute inline-flex items-center justify-center w-6 h-6 text-md font-bold text-red-500 border-2 border-white rounded-full -right-1 ">
                                      {comment.numberOfDislike}
                                    </div>
                                  </button>
                                  <button
                                    type="button"
                                    class="flex items-center text-md text-gray-500 hover:underline dark:text-gray-400"
                                    onClick={() => {
                                      setArg1(comment.commentId);
                                      toggle1();
                                    }}
                                  >
                                    <svg
                                      aria-hidden="true"
                                      class="mr-1 w-4 h-4"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                      ></path>
                                    </svg>
                                    Reply
                                  </button>
                                </div>
                              </article>
                              {comment.replyComments.length !== 0
                                ? comment.replyComments.map(
                                    (replycomment, i) => {
                                      return (
                                        <article class="p-6 mb-6 ml-6 lg:ml-12 text-base bg-white rounded-lg dark:bg-gray-900">
                                          <footer class="flex justify-between items-center mb-2">
                                            <div class="flex items-center">
                                              <p class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                                                <img
                                                  class="mr-2 w-6 h-6 rounded-full"
                                                  src={userAvatar}
                                                  alt="Jese Leos"
                                                />
                                                {replycomment.authorName}
                                              </p>
                                              <p class="text-sm text-gray-600 dark:text-gray-400">
                                                <time pubdate>
                                                  {new Date(
                                                    replycomment.commentDate
                                                  ).toLocaleString("en-US", {
                                                    month: "long",
                                                    day: "numeric",
                                                    year: "numeric",
                                                  })}
                                                </time>
                                              </p>
                                            </div>
                                            {replycomment.authorId ===
                                            user.id ? (
                                              <button
                                                id={`dropdownComment${i}Button`}
                                                data-dropdown-toggle={`dropdownComment${i}`}
                                                class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                                type="button"
                                                onClick={() => {
                                                  setArg5(
                                                    replycomment.commentId
                                                  );
                                                  toggle5();
                                                }}
                                              >
                                                <svg
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  fill="none"
                                                  viewBox="0 0 24 24"
                                                  strokeWidth={1.5}
                                                  stroke="currentColor"
                                                  className="w-5 h-5 text-red-700"
                                                >
                                                  <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                                  />
                                                </svg>
                                                <span class="sr-only">
                                                  Comment settings
                                                </span>
                                              </button>
                                            ) : null}
                                          </footer>
                                          <p class="text-gray-900">
                                            {replycomment.content}
                                          </p>
                                          <div class="flex items-center mt-4 space-x-4">
                                            <button
                                              type="button"
                                              class="relative inline-flex items-center pr-5 py-2.5 text-sm font-medium text-center "
                                              onClick={() => {
                                                onLikeReplyCommentClicked(
                                                  replycomment.commentId
                                                );
                                              }}
                                            >
                                              <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1}
                                                stroke="currentColor"
                                                className="w-6 h-6"
                                              >
                                                <path
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                  d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                                                />
                                              </svg>

                                              <div class="absolute inline-flex items-center justify-center w-6 h-6 text-md font-bold text-green-500 border-2 border-white rounded-full -right-1 ">
                                                {replycomment.numberOfLike}
                                              </div>
                                            </button>
                                            <button
                                              type="button"
                                              class="relative inline-flex items-center pr-5 py-2.5 text-sm font-medium text-center "
                                              onClick={() => {
                                                onDisLikeReplyCommentClicked(
                                                  replycomment.commentId
                                                );
                                              }}
                                            >
                                              <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke-width="1"
                                                stroke="currentColor"
                                                class="w-6 h-6"
                                              >
                                                <path
                                                  stroke-linecap="round"
                                                  stroke-linejoin="round"
                                                  d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384"
                                                />
                                              </svg>

                                              <div class="absolute inline-flex items-center justify-center w-6 h-6 text-md font-bold text-red-500 border-2 border-white rounded-full -right-1 ">
                                                {replycomment.numberOfDislike}
                                              </div>
                                            </button>
                                          </div>
                                        </article>
                                      );
                                    }
                                  )
                                : null}
                            </>
                          );
                        })
                      : null}
                  </div>
                </section>
              </Tabs.Item>
            </Tabs.Group>
            {/* Tabs End */}

            {/* Code Editor Start  */}
            <div className="relative z-1">
              <div className="bg-slate-800 flex h-14 selectLanguage">
                {SelectLanguage()}
                <h3 className="text-2xl text-white font-bold mx-36 mt-2 text-center">
                  Code Editor
                </h3>
                <div className="float-right ml-16 pt-[10px] space-x-2 justify-right justify-items-center">
                  <button
                    type="button"
                    data-mdb-ripple="false"
                    data-mdb-ripple-color="light"
                    className="px-4 pt-2.5 pb-2 bg-blue-600 text-white font-medium text-xs leading-tight  uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-600 focus:shadow-lg focus:outline-none focus:ring-0  transition duration-150 ease-in-out flex align-center"
                    onClick={() => toggle4()}
                  >
                    <ArrowPathIcon
                      className="h-4 w-4 mr-2 ml-0  text-white "
                      aria-hidden="true"
                    />
                    Reset
                  </button>
                </div>
              </div>
              <div className="editor">
                <ReactCodeMirror
                  value={code}
                  height="500px"
                  theme={oneDark}
                  extensions={[javascript({ jsx: true })]}
                  onChange={(value, viewUpdate) => {
                    setCode(value);
                  }}
                />
              </div>
              <div className=" bg-slate-800 h-96">
                {isError === true ? (
                  <div className="text-white w-full overflow-y-auto h-72">
                    <h3 className="text-2xl font-bold mb-3 pb-4 text-center">
                      Console
                    </h3>
                    <p>
                      <span className="font-bold mb-3 pb-4 text-red-500">
                        {error.errorType}:
                      </span>{" "}
                      {error.errorMessage}
                    </p>
                    <button
                      type="button"
                      className="ml-96 my-3 px-4 pt-2.5 pb-2 bg-indigo-500 text-white font-medium text-xs leading-tight  uppercase rounded shadow-md hover:bg-indigo-600 hover:shadow-lg focus:bg-indigo-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-500 active:shadow-lg transition duration-150 ease-in-out flex align-center"
                      onClick={() => {
                        setIsError(false);
                      }}
                    >
                      Clear Console
                    </button>
                  </div>
                ) : (
                  renderTestCase()
                )}
                <div className="flex float-right px-3 py-1">
                  <button
                    type="button"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                    className=" px-4 pt-2.5 pb-2 bg-blue-600 text-white font-medium text-xs leading-tight  uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-600 active:shadow-lg transition duration-150 ease-in-out flex align-center"
                    onClick={() => {
                      runCode();
                    }}
                  >
                    <ChevronDoubleRightIcon
                      className="h-4 w-4 mr-2 ml-0  text-white "
                      aria-hidden="true"
                    />
                    Run
                  </button>
                  <button
                    type="button"
                    disabled={disableSubmitButton}
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                    className="ml-2 px-4 pt-2.5 pb-2 disabled:bg-lime-700 bg-lime-600 text-white font-medium text-xs leading-tight  uppercase rounded shadow-md hover:bg-lime-700 hover:shadow-lg focus:bg-lime-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-lime-600 active:shadow-lg transition duration-150 ease-in-out flex align-center"
                    onClick={() => {
                      submitCode();
                    }}
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    <ArrowDownTrayIcon
                      className="h-4 w-4 mr-2 ml-0  text-white "
                      aria-hidden="true"
                    />
                    Submit
                  </button>
                  <ModalComponent
                    isShowing={isShowing2}
                    arg={arg2}
                    hide={toggle2}
                    type="submit"
                    title={`Congratulations ${user.userName}`}
                    content="You have just finished this task."
                    buttonContent="Back to course"
                    results={results2}
                    func={handleNavigate}
                  />
                </div>
              </div>
            </div>
            {/* Code Editor End  */}
          </Split>
        </section>
      ) : null}
    </>
  );
};

export default CodeEditor1;
