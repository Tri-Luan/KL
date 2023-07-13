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
  ClockIcon,
  UserIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import ReactCodeMirror from "@uiw/react-codemirror";
import { oneDark } from "@codemirror/theme-one-dark";
import { javascript } from "@codemirror/lang-javascript";
import { useGetCodeLanguagesQuery } from "../../redux/courseApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/authSlice";
import { Spinner, Table, Tabs, Pagination, Badge } from "flowbite-react";
import useModal from "../../hooks/useModal";
import ModalComponent from "../../components/ui/ModalComponent";
import {
  useGetPracticeDetailsQuery,
  useGetPracticeHistoryQuery,
  useGetPracticeLeaderboardQuery,
  useRunCodePracticeMutation,
  useSubmitCodePracticeMutation,
} from "../../redux/practiceApiSlice";
import Breadcrumbs from "../../components/ui/Breadcrumbs";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const CodeEditor2 = () => {
  const navigate = useNavigate();
  const tabsRef = useRef(null);
  const props = { tabsRef };
  const location = useLocation();
  const user = useSelector(selectCurrentUser);
  const id = location.state.id;
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: languages,
    isLoading: isLoadingGetCodeLanguages,
    isSuccess: isSuccessGetCodeLanguages,
    isError: isErrorGetCodeLanguages,
    error: errorGetCodeLanguages,
  } = useGetCodeLanguagesQuery();
  const {
    data: practice,
    isLoading: isLoadingGetPracticeDetails,
    isSuccess: isSuccessGetPracticeDetails,
    isError: isErrorGetPracticeDetails,
    error: errorGetPracticeDetails,
  } = useGetPracticeDetailsQuery({ practiceId: id, userId: user.id });
  const {
    data: histories,
    isLoading: isLoadingGetPracticeHistory,
    isSuccess: isSuccessGetPracticeHistory,
    isError: isErrorGetPracticeHistory,
    error: errorGetPracticeHistory,
    refetch: refetchGetPracticeHistory,
  } = useGetPracticeHistoryQuery({ practiceId: id, userId: user.id });
  const {
    data: leaderBoards,
    isLoading: isLoadingGetLeaderBoard,
    isSuccess: isSuccessGetLeaderBoard,
    isError: isErrorGetLeaderBoard,
    error: errorGetLeaderBoard,
    refetch: refetchGetPracticeLeaderboard,
  } = useGetPracticeLeaderboardQuery({
    practiceId: id,
    pageSize: 5,
    pageNumber: currentPage,
  });
  const [runCodePractice, { isLoading: isLoadingRunCode }] =
    useRunCodePracticeMutation();
  const [submitCodePractice, { isLoading: isLoadingSubmitCode }] =
    useSubmitCodePracticeMutation();
  const [code, setCode] = useState("");
  const [results, setResults] = useState(null);
  const [isError, setIsError] = useState(false);
  const [disableSubmitButton, setDisableSubmitButton] = useState(true);

  const [error, setError] = useState({
    errorType: String,
    errorMessage: String,
  });
  const [selectedLanguage, setSelectedLanguage] = useState({});

  const {
    arg: arg2,
    isShowing: isShowing2,
    toggle: toggle2,
    results: results2,
    setResults: setResults2,
  } = useModal();

  const { arg: arg4, isShowing: isShowing4, toggle: toggle4 } = useModal();

  useEffect(() => {
    if (!isLoadingGetCodeLanguages) {
      setSelectedLanguage(languages.codeLanguages[0]);
    }
  }, [isLoadingGetCodeLanguages]);

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
                {languages.codeLanguages.map((codeLanguage, i) => (
                  <Listbox.Option
                    key={i}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                      }`
                    }
                    value={codeLanguage}
                    // selected={i === 1}
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
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
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
        {practice.testCases !== null ? (
          <>
            {" "}
            <h3 className="text-2xl text-white font-bold mb-1 text-center">
              Test Cases
            </h3>
            <div className="w-full overflow-y-auto h-60 ml-6 mt-4  inline-flex sm:px-0">
              <Tab.Group vertical>
                <Tab.List className="flex w-50 max-w-md flex-col space-x-0 space-y-4 rounded-xl bg-slate-800 p-1">
                  {practice.testCases.map((testCase, Idx) => (
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
                  {practice.testCases.map((testCase, Idx) =>
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
                          <span className="text-blue-400">
                            Expected output:
                          </span>{" "}
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
                          <span className="text-blue-400">
                            Hidden test case
                          </span>
                        </p>
                      </Tab.Panel>
                    )
                  )}
                </Tab.Panels>
              </Tab.Group>
            </div>
          </>
        ) : null}
      </>
    );
  };

  const runCode = async () => {
    const response = await runCodePractice({
      practiceId: practice.practiceId,
      practiceCode: code,
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
    const response = await submitCodePractice({
      practiceId: practice.practiceId,
      practiceCode: code,
      codeLanguageId: selectedLanguage.codeLanguageId,
      userId: user.id,
    }).unwrap();
    refetchGetPracticeHistory();
    refetchGetPracticeLeaderboard();
    setResults2(response);
    toggle2();
  };
  const handleNavigate = () => {
    navigate(`/practice`);
  };

  return (
    <>
      {isLoadingGetPracticeDetails ||
      isLoadingGetCodeLanguages ||
      isLoadingGetPracticeHistory ||
      isLoadingGetLeaderBoard ? (
        <div className="text-center">
          <Spinner aria-label="Center-aligned spinner" />
          <span className="ml-2">Loading...</span>
        </div>
      ) : practice !== null ? (
        <section>
          <ModalComponent
            isShowing={isShowing4}
            arg={arg4}
            hide={toggle4}
            func={() => setCode("")}
            title="Confirmation"
            content="Are you sure you want to refresh code?"
            type="confirm"
          />
          <div className="h-[5vh] py-2 px-4 bg-gray-50  border-y-2 border-gray-200">
            <Breadcrumbs />
          </div>
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
            >
              <Tabs.Item active icon={BookOpenIcon} title="Lesson">
                {
                  <div>
                    <div className="flex mb-3">
                      <UserIcon className="text-gray-800  mr-1 h-5 w-5" />
                      <span class="course-author font-semibold  text-blue-600">
                        {practice.author}
                      </span>
                      <Badge
                        className="ml-4 mr-4"
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
                      <HeartIcon className="text-blue-600  mr-1 h-5 w-5" />
                      <span class="course-author font-base  ">
                        {practice.score} Points
                      </span>
                    </div>
                    <div
                      className="block p-0 max-h-[70vh] w-full overflow-auto "
                      id="content"
                      dangerouslySetInnerHTML={{
                        __html: practice.content,
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
                        ? histories.practiceHistories.map((history, i) => {
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
                  <div className="text-white">
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
                    buttonContent="Back to practice"
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

export default CodeEditor2;
