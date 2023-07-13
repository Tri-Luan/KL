import { BackwardIcon } from "@heroicons/react/24/outline";
import { Spinner } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import CkEditor from "../../../../components/CkEditor/ckeditor";
import AlertComponent from "../../../../components/ui/AlertComponent";
import ModalComponent from "../../../../components/ui/ModalComponent";
import useCkEditor from "../../../../hooks/useCkEditor";
import useModal from "../../../../hooks/useModal";
import {
  useDeleteTestCaseLessonMutation,
  useGetCodeLanguagesQuery,
  useGetLessonDetailsUpdateQuery,
  useUpdateLessonMutation,
} from "../../../../redux/courseApiSlice";

const UpdateLesson = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const courseId = location.state?.courseId;
  const chapterId = location.state.chapterId;
  const { id } = useParams();
  const { arg, isShowing, toggle, setArg } = useModal();
  const { CkEditorData, setCkEditorData } = useCkEditor();
  const [formValid, setFormValid] = useState(false);
  const [errMessage, setErrMessage] = useState(null);
  const [lessonName, setLessonName] = useState("");
  const [score, setScore] = useState(100);
  const [numberTestCases, setNumberTestCases] = useState(0);
  const [numberHiddenTestCases, setNumberHiddenTestCases] = useState(0);
  const [codeSample, setCodeSample] = useState("");
  const [codeSampleLanguage, setCodeSampleLanguage] = useState(1);

  const [alertIsShowing, setAlertIsShowing] = useState(false);
  const [updateLesson, { isLoading: isLoadingUpdateLesson }] =
    useUpdateLessonMutation();
  const [deleteTestCaseLesson, { isLoading: isLoadingDeleteTestCaseLesson }] =
    useDeleteTestCaseLessonMutation();
  const {
    data: lesson,
    isLoading: isLoadingGetLesson,
    isSuccess,
    refetch,
  } = useGetLessonDetailsUpdateQuery(id, {
    refetchOnMountOrArgChange: true,
  });
  const {
    data,
    isLoading: isLoadingGetCodeLanguages,
    isSuccess: isSuccessGetCodeLanguages,
    isError: isErrorGetCodeLanguages,
    error: errorGetCodeLanguages,
  } = useGetCodeLanguagesQuery();
  useEffect(() => {
    if (isSuccess) {
      setCkEditorData(lesson.content);
      setLessonName(lesson.lessonName);
      setScore(lesson.score);
      setNumberTestCases(lesson.totalTestCases);
      setNumberHiddenTestCases(lesson.totalHiddenTestCases);
      setCodeSample(lesson.codeSamples[0].codeSample);
      setCodeSampleLanguage(lesson.codeSamples[0].codeLanguageId);
    }
  }, [isSuccess, lesson, setCkEditorData]);

  useEffect(() => {
    if (lessonName !== "" && codeSample !== "" && CkEditorData !== "") {
      setFormValid(true);
    }
  }, [lessonName, codeSample, CkEditorData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formValid) {
      return;
    }
    try {
      let testCases = getDataTestCases().concat(getDataHiddenTestCases());
      let CodeSample = {
        codeSampleId: lesson.codeSamples[0].codeSampleId,
        codeSample: codeSample,
        codeLanguageId: codeSampleLanguage,
      };
      const response = await updateLesson({
        lessonName: lessonName,
        content: CkEditorData,
        score: score,
        lessonId: id,
        testCases: testCases,
        codeSamples: [CodeSample],
      }).unwrap();
      if (response.isSuccessful) {
        setCkEditorData("");
        setNumberTestCases(0);
        setNumberHiddenTestCases(0);
        setScore(100);
        setLessonName("");
        setErrMessage(null);
        setFormValid(false);
        navigate(`/lessonmanagement/${chapterId}`, {
          state: {
            status: "Update lesson successfull",
            courseId: courseId,
          },
        });
      } else {
        setErrMessage(response.errorMessages);
        window.scrollTo(0, 0);
      }
    } catch (err) {
      if (!err?.originalStatus) {
        setErrMessage("Server not response");
        window.scrollTo(0, 0);
      } else if (err.originalStatus === 401) {
        setErrMessage("Unauthorized");
        window.scrollTo(0, 0);
      }
    }
  };
  //render
  const renderTestCases = () => {
    var content = [];
    for (var i = 0; i < numberTestCases; i++) {
      if (i < lesson.totalTestCases) {
        let testCaseId = lesson.testCases[i].testCaseId;
        content.push(
          <div key={testCaseId}>
            <label>Test case {Number(i) + 1}</label>
            <button
              class="mt-2 inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              type="button"
              onClick={() => {
                setArg(testCaseId);
                toggle();
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
            </button>
            <input
              //try to create a unique key
              key={`testCaseInput` + testCaseId + lesson.testCases[i].input}
              type="text"
              name="name"
              id={`txtTestCaseInput${i}`}
              class="bg-gray-50 mb-2 w-2/3 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Input"
              required
              autoComplete="off"
              defaultValue={lesson.testCases[i].input}
            />
            <input
              //try to create a unique key
              key={
                `testCaseOutput` +
                testCaseId +
                lesson.testCases[i].expectedOutput
              }
              type="text"
              name="name"
              id={`txtTestCaseOutput${i}`}
              class="bg-gray-50 w-2/3 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Output"
              required
              autoComplete="off"
              defaultValue={lesson.testCases[i].expectedOutput}
            />
          </div>
        );
      } else {
        content.push(
          <div>
            <label>Test case {Number(i) + 1}</label>
            <input
              type="text"
              name="name"
              id={`txtTestCaseInput${i}`}
              class="bg-gray-50 mb-2 w-2/3 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Input"
              required
              autoComplete="off"
            />
            <input
              type="text"
              name="name"
              id={`txtTestCaseOutput${i}`}
              class="bg-gray-50 border w-2/3 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Output"
              required
              autoComplete="off"
            />
          </div>
        );
      }
    }
    return content;
  };
  const renderHiddenTestCase = () => {
    var content = [];
    for (var i = 0; i < numberHiddenTestCases; i++) {
      if (i < lesson.totalHiddenTestCases) {
        let testCaseId = lesson.hiddenTestCases[i].testCaseId;
        content.push(
          <div key={testCaseId}>
            <label>Hidden test case {Number(i) + 1} </label>
            <button
              class="mt-2 inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              type="button"
              onClick={() => {
                setArg(testCaseId);
                toggle();
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
            </button>
            <input
              //try to create a unique key
              key={
                `hiddenTestCaseInput` +
                testCaseId +
                lesson.hiddenTestCases[i].input
              }
              type="text"
              id={`txtHiddenTestCaseInput${i}`}
              class="bg-gray-50 mb-2 w-2/3 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Input"
              required
              autoComplete="off"
              defaultValue={lesson.hiddenTestCases[i].input}
            />
            <input
              //try to create a unique key
              key={
                `hiddenTestCaseOutput` +
                testCaseId +
                lesson.hiddenTestCases[i].expectedOutput
              }
              type="text"
              id={`txtHiddenTestCaseOutput${i}`}
              class="bg-gray-50 mb-2 w-2/3 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Output"
              required
              autoComplete="off"
              defaultValue={lesson.hiddenTestCases[i].expectedOutput}
            />
          </div>
        );
      } else {
        content.push(
          <div>
            <label>Hidden test case {Number(i) + 1} </label>
            <input
              type="text"
              id={`txtHiddenTestCaseInput${i}`}
              class="bg-gray-50 mb-2 w-2/3 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Input"
              required
              autoComplete="off"
            />
            <input
              type="text"
              id={`txtHiddenTestCaseOutput${i}`}
              class="bg-gray-50 mb-2 w-2/3 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Output"
              required
              autoComplete="off"
            />
          </div>
        );
      }
    }
    return content;
  };
  const getDataTestCases = () => {
    var totalTestCase = numberTestCases;
    var testCases = [];
    for (var i = 0; i < totalTestCase; i++) {
      var inputId = String("txtTestCaseInput" + i);
      var outputId = String("txtTestCaseOutput" + i);
      var input = String(document.getElementById(inputId).value.trim());
      var output = String(document.getElementById(outputId).value.trim());
      var testcase = {
        testCaseId:
          i < lesson.totalTestCases ? lesson.testCases[i].testCaseId : 0,
        input: input,
        expectedOutput: output,
        isHidden: false,
      };
      testCases.push(testcase);
    }
    return testCases;
  };
  const getDataHiddenTestCases = () => {
    var totalHiddenTestCase = numberHiddenTestCases;
    var testCases = [];
    for (var i = 0; i < totalHiddenTestCase; i++) {
      var inputId = String("txtHiddenTestCaseInput" + i);
      var outputId = String("txtHiddenTestCaseOutput" + i);
      var input = String(document.getElementById(inputId).value.trim());
      var output = String(document.getElementById(outputId).value.trim());
      var testcase = {
        testCaseId:
          i < lesson.totalHiddenTestCases
            ? lesson.hiddenTestCases[i].testCaseId
            : 0,
        input: input,
        expectedOutput: output,
        isHidden: true,
      };
      testCases.push(testcase);
    }
    return testCases;
  };
  const onDeleteTestCaseClicked = async (testCaseId) => {
    try {
      const response = await deleteTestCaseLesson(testCaseId).unwrap();
      if (response.isSuccessful) {
        await refetch();
        window.scrollTo(0, 0);
        setAlertIsShowing(true);
      }
    } catch (err) {
      console.error("Failed to delete the testcase", err);
    }
  };

  return (
    <div>
      {isLoadingGetLesson || isLoadingGetCodeLanguages ? (
        <div className="text-center">
          <Spinner aria-label="Center-aligned spinner" />
          <span className="ml-2">Loading...</span>
        </div>
      ) : (
        <section class="bg-white ">
          <ModalComponent
            isShowing={isShowing}
            arg={arg}
            hide={toggle}
            func={onDeleteTestCaseClicked}
            title="Confirmation"
            content="test case"
            type="delete"
          />
          <div class="py-8 px-4 mx-auto w-3/4 lg:py-16">
            <Link
              to={`/lessonmanagement/${chapterId}`}
              state={{ courseId: courseId }}
              className="flex w-fit font-medium text-indigo-600 hover:text-indigo-500"
            >
              <BackwardIcon className="h-6 w-6 mr-2 " aria-hidden="true" />
              Back to lesson management
            </Link>
            <h2 className="mt-12 mb-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Update lesson
            </h2>
            {alertIsShowing ? (
              <AlertComponent
                content={"Delete test case success"}
                visible={setAlertIsShowing}
              />
            ) : null}
            {errMessage !== null ? (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                role="alert"
              >
                <p>{errMessage}</p>
              </div>
            ) : null}
            <form onSubmit={handleSubmit}>
              <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
                <div class="sm:col-span-2">
                  <label
                    for="name"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Lesson name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type lesson name"
                    required
                    autoComplete="off"
                    value={lessonName}
                    onChange={(e) => setLessonName(e.target.value)}
                  />
                </div>
                <div class="sm:col-span-2 w-1/3">
                  <label
                    for="score"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Score
                  </label>
                  <select
                    id="score"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    required
                    // onChange={(e) => {
                    //   if (e.target.value === "Basic") setLevel(1);
                    //   else if (e.target.value === "General") setLevel(2);
                    //   else setLevel(3);
                    // }}
                    onChange={(e) => setScore(e.target.value)}
                  >
                    <option value={100} selected={score === 100}>
                      100
                    </option>
                    <option value={200} selected={score === 200}>
                      200
                    </option>
                  </select>
                </div>
                <div class="sm:col-span-2 w-1/3">
                  <label
                    for="testcase"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Number of test case
                  </label>
                  <select
                    id="testcase"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    required
                    onChange={(e) => setNumberTestCases(e.target.value)}
                  >
                    <option value={0} selected={lesson.totalTestCases === 0}>
                      0
                    </option>
                    <option value={1} selected={lesson.totalTestCases === 1}>
                      1
                    </option>
                    <option value={2} selected={lesson.totalTestCases === 2}>
                      2
                    </option>
                    <option value={3} selected={lesson.totalTestCases === 3}>
                      3
                    </option>
                    <option value={4} selected={lesson.totalTestCases === 4}>
                      4
                    </option>
                    <option value={5} selected={lesson.totalTestCases === 5}>
                      5
                    </option>
                  </select>
                </div>
                <div>{renderTestCases()}</div>
                <div class="sm:col-span-2 w-1/3">
                  <label
                    for="hiddentestcase"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Number of hidden test case
                  </label>
                  <select
                    id="hiddentestcase"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    required
                    onChange={(e) => setNumberHiddenTestCases(e.target.value)}
                  >
                    <option
                      value={0}
                      selected={lesson.totalHiddenTestCases === 0}
                    >
                      0
                    </option>
                    <option
                      value={1}
                      selected={lesson.totalHiddenTestCases === 1}
                    >
                      1
                    </option>
                    <option
                      value={2}
                      selected={lesson.totalHiddenTestCases === 2}
                    >
                      2
                    </option>
                    <option
                      value={3}
                      selected={lesson.totalHiddenTestCases === 3}
                    >
                      3
                    </option>
                    <option
                      value={4}
                      selected={lesson.totalHiddenTestCases === 4}
                    >
                      4
                    </option>
                    <option
                      value={5}
                      selected={lesson.totalHiddenTestCases === 5}
                    >
                      5
                    </option>
                  </select>
                </div>
                <div>{renderHiddenTestCase()}</div>
                <div class="sm:col-span-2 w-1/3">
                  <label
                    for="hiddentestcase"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Choose code sample language
                  </label>
                  <select
                    id="hiddentestcase"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    required
                    onChange={(e) => setCodeSampleLanguage(e.target.value)}
                  >
                    {data.codeLanguages.map((codeLanguage, i) => {
                      return (
                        <option
                          value={codeLanguage.codeLanguageId}
                          selected={
                            lesson.codeSamples[0].codeLanguageId ===
                            codeLanguage.codeLanguageId
                          }
                        >
                          {codeLanguage.codeLanguageName}&nbsp;(
                          {codeLanguage.codeLanguageVersion})
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div class="sm:col-span-2">
                  <label
                    for="codesample"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Code sample
                  </label>
                  <textarea
                    id="codesample"
                    rows="8"
                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type code sample here"
                    required
                    value={codeSample}
                    onChange={(e) => setCodeSample(e.target.value)}
                  ></textarea>
                </div>
                <div class="sm:col-span-2">
                  <label
                    for="content"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Content
                  </label>
                  <CkEditor
                    CkEditorData={CkEditorData}
                    setCkEditorData={setCkEditorData}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="group mt-7 relative disabled:bg-indigo-500 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                disabled={!formValid}
              >
                {!formValid ? (
                  <span
                    className="absolute inset-y-0 left-0 flex items-center pl-3"
                    disabled={!formValid}
                  >
                    <svg
                      className="h-5 w-5 text-indigo-300 "
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                ) : null}
                Update
              </button>
            </form>
          </div>
        </section>
      )}
    </div>
  );
};

export default UpdateLesson;
