//Import CSS
import "../../style/IDE.css";

import React, { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Split from "react-split";
import { Listbox, Transition, Switch, Tab } from "@headlessui/react";
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
  SaveAsIcon,
  ChevronDoubleRightIcon,
  BookOpenIcon,
  AcademicCapIcon,
  ChatBubbleBottomCenterTextIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import ReactCodeMirror from "@uiw/react-codemirror";
import { oneDark } from "@codemirror/theme-one-dark";
import { javascript } from "@codemirror/lang-javascript";
import {
  useGetCodeLanguagesQuery,
  useGetLessonDetailsQuery,
  useRunCodeLessonMutation,
} from "../../redux/courseApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/authSlice";
import { Tabs } from "flowbite-react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const CodeEditor = () => {
  // const window = new JSDOM("").window;
  // const DOMPurify = createDOMPurify(window);

  const user = useSelector(selectCurrentUser);
  const { id } = useParams();
  const {
    data: lesson,
    isLoading: isLoadingGetLessonDetails,
    isSuccess: isSuccessGetLessonDetails,
    isError: isErrorGetLessonDetails,
    error: errorGetLessonDetails,
  } = useGetLessonDetailsQuery({ lessonId: id, userId: user.id });
  const {
    data: languages,
    isLoading: isLoadingGetCodeLanguages,
    isSuccess: isSuccessGetCodeLanguages,
    isError: isErrorGetCodeLanguages,
    error: errorGetCodeLanguages,
  } = useGetCodeLanguagesQuery();
  const [runCodeLesson, { isLoading }] = useRunCodeLessonMutation();
  const [code, setCode] = useState("");
  const [results, setResults] = useState(null);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState({
    errorType: String,
    errorMessage: String,
  });
  const [selectedLanguage, setSelectedLanguage] = useState({});
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
  // useEffect(() => {
  //   if (isSuccessGetCodeLanguages && isSuccessGetLessonDetails) {

  //   }
  // }, [isSuccessGetCodeLanguages, isSuccessGetLessonDetails]);

  const renderConditionIcon = (cond) => {
    if (cond === true) {
      return <CheckCircleIcon className="text-green-600 inline h-5 w-5" />;
    } else if (cond === false) {
      return <ExclamationCircleIcon className="text-red-600 inline h-5 w-5" />;
    }
  };
  const renderRefreshModal = () => {
    return (
      <div
        class="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog relative w-auto pointer-events-none">
          <div class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
            <div class="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
              <h5
                class="text-xl font-medium leading-normal text-gray-800"
                id="exampleModalLabel"
              >
                <ArrowPathIcon className="text-blue-500 inline h-8 w-8" />
                Reset
              </h5>
              <button
                type="button"
                class="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body relative p-4">
              Bạn có muốn làm mới code không?
            </div>
            <div class="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
              <button
                type="button"
                class="inline-block px-6 py-2 border-2 border-blue-400 text-blue-400 font-medium text-xs leading-tight uppercase rounded-full hover:text-blue-500 hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                data-bs-dismiss="modal"
              >
                Không Làm Mới Code
              </button>
              <button
                type="button"
                class="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                data-bs-dismiss="modal"
                onClick={() => {
                  setCode("");
                }}
              >
                Làm Mới Code
              </button>
            </div>
          </div>
        </div>
      </div>
    );
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
                  return (
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
                  );
                })}
                {/* {this.state.languages.map((language, languageIdx) => (
                  
                ))} */}
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
    } else if (response.errorType !== null && response.errorMessage !== null) {
      setError({
        errorType: response.errorType,
        errorMessage: response.errorMessage,
      });
      setIsError(true);
    }
  };
  return (
    <>
      {isLoadingGetLessonDetails || isLoadingGetCodeLanguages || isLoading ? (
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
      ) : lesson !== null ? (
        <section>
          {/* Breadcrumb Start */}
          <nav
            className="flex h-[5vh] py-2 px-4 text-gray-700 bg-gray-50  border-2 border-gray-300 dark:bg-gray-800 dark:border-gray-700"
            aria-label="Breadcrumb"
          >
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              {/* <li className="inline-flex items-center">
                <Link
                  to="/"
                  className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-sky-500 dark:text-gray-400 dark:hover:text-white"
                >
                  home 
                </Link>
              </li> */}
              <li>
                <div className="flex items-center">
                  {/* <svg
                    className="w-6 h-6 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"></path>
                  </svg> */}
                  <Link
                    to="/course"
                    className="ml-1 text-sm font-medium text-gray-700 hover:text-sky-500 md:ml-2 dark:text-gray-400 dark:hover:text-white"
                  >
                    Course
                  </Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <svg
                    className="w-6 h-6 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"></path>
                  </svg>
                  <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">
                    {lesson.lessonName}
                  </span>
                </div>
              </li>
            </ol>
          </nav>
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
              className=" flex-col "
              aria-label="Tabs with icons"
              // style="underline"
            >
              <Tabs.Item active icon={BookOpenIcon} title="Lesson">
                {
                  <div
                    className="block p-0 max-h-[75vh] w-full overflow-auto "
                    id="content"
                    dangerouslySetInnerHTML={{
                      __html: lesson.content,
                    }}
                  />
                }
              </Tabs.Item>
              <Tabs.Item icon={AcademicCapIcon} title="Leaderboard">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  <p>
                    This is some placeholder content the
                    <span className="font-medium text-gray-800 dark:text-white">
                      Dashboard tab's associated content
                    </span>
                    . Clicking another tab will toggle the visibility of this
                    one for the next. The tab JavaScript swaps classes to
                    control the content visibility and styling.
                  </p>
                </p>
              </Tabs.Item>
              <Tabs.Item icon={ClockIcon} title="Submit History">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  <p>
                    This is some placeholder content the
                    <span className="font-medium text-gray-800 dark:text-white">
                      Settings tab's associated content
                    </span>
                    . Clicking another tab will toggle the visibility of this
                    one for the next. The tab JavaScript swaps classes to
                    control the content visibility and styling.
                  </p>
                </p>
              </Tabs.Item>
              <Tabs.Item icon={ChatBubbleBottomCenterTextIcon} title="Comment">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  <p>
                    This is some placeholder content the
                    <span className="font-medium text-gray-800 dark:text-white">
                      Contacts tab's associated content
                    </span>
                    . Clicking another tab will toggle the visibility of this
                    one for the next. The tab JavaScript swaps classes to
                    control the content visibility and styling.
                  </p>
                </p>
              </Tabs.Item>
            </Tabs.Group>
            {/* Tabs End */}

            {/* Code Editor Start  */}
            <div className="">
              {renderRefreshModal()}
              <div className="bg-slate-800 flex h-14 selectLanguage">
                {SelectLanguage()}

                {/* SelectTheme unfinished */}
                {/* {this.SelectTheme()} */}
                <h3 className="text-2xl text-white font-bold mx-36 mt-2 text-center">
                  Code Editor
                </h3>
                <div className="float-right ml-16 pt-[10px] space-x-2 justify-right justify-items-center">
                  <button
                    type="button"
                    data-mdb-ripple="false"
                    data-mdb-ripple-color="light"
                    className="px-4 pt-2.5 pb-2 bg-blue-600 text-white font-medium text-xs leading-tight  uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-600 focus:shadow-lg focus:outline-none focus:ring-0  transition duration-150 ease-in-out flex align-center"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
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
                {/* {renderModal()} */}
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
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                    className="ml-2 px-4 pt-2.5 pb-2 bg-lime-600 text-white font-medium text-xs leading-tight  uppercase rounded shadow-md hover:bg-lime-700 hover:shadow-lg focus:bg-lime-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-lime-600 active:shadow-lg transition duration-150 ease-in-out flex align-center"
                    onClick={() => {
                      // btnSubmit_Click(this.state.code, this.state.selected[0]);
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

export default CodeEditor;
