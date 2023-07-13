import { BackwardIcon } from "@heroicons/react/24/outline";
import { Spinner } from "flowbite-react";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import CkEditor from "../../../../components/CkEditor/ckeditor";
import AlertComponent from "../../../../components/ui/AlertComponent";
import useCkEditor from "../../../../hooks/useCkEditor";
import { selectCurrentUser } from "../../../../redux/authSlice";
import {
  useAddLessonMutation,
  useGetCodeLanguagesQuery,
} from "../../../../redux/courseApiSlice";

const CreateLesson = () => {
  const location = useLocation();
  const courseId = location.state?.courseId;
  const user = useSelector(selectCurrentUser);
  const authorId = user.id;
  const { id } = useParams();
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
  const [addLesson, { isLoading }] = useAddLessonMutation();
  const { data, isLoading: isLoadingGetCodeLanguages } =
    useGetCodeLanguagesQuery();
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
        codeSample: codeSample,
        codeLanguageId: codeSampleLanguage,
      };
      const response = await addLesson({
        lessonName: lessonName,
        content: CkEditorData,
        score: score,
        authorId: authorId,
        chapterId: id,
        testCases: testCases,
        codeSamples: [CodeSample],
      }).unwrap();
      if (response.isSuccessful) {
        setCkEditorData("");
        setCodeSampleLanguage(1);
        setCodeSample("");
        setNumberTestCases(0);
        setNumberHiddenTestCases(0);
        setScore(100);
        setLessonName("");
        setErrMessage(null);
        setFormValid(false);
        setAlertIsShowing(true);
        window.scrollTo(0, 0);
      } else {
        setErrMessage(response.errorMessages);
        window.scrollTo(0, 0);
      }
    } catch (err) {
      console.error(err);
      if (!err?.originalStatus) {
        setErrMessage("Server not response");
        window.scrollTo(0, 0);
      } else if (err.originalStatus === 401) {
        setErrMessage("Unauthorized");
        window.scrollTo(0, 0);
      }
    }
  };

  //Render TestCase
  const renderTestCases = () => {
    var content = [];
    for (var i = 0; i < numberTestCases; i++) {
      content.push(
        <>
          <label
            for="name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Test case {Number(i) + 1}
          </label>
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
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Output"
            required
            autoComplete="off"
          />
        </>
      );
    }
    return content;
  };
  const renderHiddenTestCase = () => {
    var content = [];
    for (var i = 0; i < numberHiddenTestCases; i++) {
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
        input: input,
        expectedOutput: output,
        isHidden: true,
      };
      testCases.push(testcase);
    }
    return testCases;
  };

  return (
    <div>
      {isLoadingGetCodeLanguages ? (
        <div className="text-center">
          <Spinner aria-label="Center-aligned spinner" />
          <span className="ml-2">Loading...</span>
        </div>
      ) : (
        <section class="bg-white ">
          <div class="py-8 px-4 mx-auto w-3/4 lg:py-16">
            <Link
              to={`/lessonmanagement/${id}`}
              state={{ courseId: courseId }}
              className="flex w-fit font-medium text-indigo-600 hover:text-indigo-500"
            >
              <BackwardIcon className="h-6 w-6 mr-2 " aria-hidden="true" />
              Back to lesson management
            </Link>
            <h2 className="mt-12 mb-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Create new lesson
            </h2>
            {alertIsShowing ? (
              <AlertComponent
                content={"Create new lesson success"}
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
                    onChange={(e) => setScore(e.target.value)}
                  >
                    <option value={100} selected={score === 100}>
                      100
                    </option>
                    <option value={200}>200</option>
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
                    <option value={0} selected={numberTestCases === 0}>
                      0
                    </option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
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
                    <option value={0} selected={numberHiddenTestCases === 0}>
                      0
                    </option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
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
                            codeSampleLanguage === codeLanguage.codeLanguageId
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
                Create
              </button>
            </form>
          </div>
        </section>
      )}
    </div>
  );
};

export default CreateLesson;
