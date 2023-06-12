import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/outline";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import CkEditor from "../../../../components/CkEditor/ckeditor";
import AlertComponent from "../../../../components/ui/AlertComponent";
import useCkEditor from "../../../../hooks/useCkEditor";
import { selectCurrentUser } from "../../../../redux/authSlice";
import {
  useAddLessonMutation,
  useGetCodeLanguagesQuery,
  useGetLessonDetailsUpdateQuery,
  useUpdateLessonMutation,
} from "../../../../redux/courseApiSlice";

const UpdateLesson = () => {
  // const navigate = useNavigate();
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
  const [success, setSuccess] = useState(false);
  const [codeSampleLanguage, setCodeSampleLanguage] = useState(1);

  const [alertIsShowing, setAlertIsShowing] = useState(false);
  const [updateLesson, { isLoading }] = useUpdateLessonMutation();
  const {
    data: lesson,
    isLoading: isLoadingGetCourse,
    isSuccess,
    isError,
    error,
    refetch,
  } = useGetLessonDetailsUpdateQuery(id);
  const {
    data,
    isLoading: isLoadingGetCodeLanguages,
    isSuccess: isSuccessGetCodeLanguages,
    isError: isErrorGetCodeLanguages,
    error: errorGetCodeLanguages,
  } = useGetCodeLanguagesQuery();
  useEffect(() => {
    if (isSuccess) {
      console.log(lesson);
      setCkEditorData(lesson.content);
      setLessonName(lesson.lessonName);
      setScore(lesson.score);
      // numberTestCases(lesson.numberTestCases);
      // numberHiddenTestCases(lesson.description);
      setCodeSample(lesson.codeSamples[0].codeSample);
      setCodeSampleLanguage(lesson.codeSamples[0].codeLanguageId);
    }
  }, [isSuccess]);

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
      const response = await updateLesson({
        lessonName: lessonName,
        content: CkEditorData,
        score: score,
        lessonId: id,
        testCases: testCases,
        codeSamples: [CodeSample],
      }).unwrap();
      if (response.data.isSuccessful) {
        setAlertIsShowing(true);
      } else {
        setErrMessage(response.data.errorMessages);
      }
    } catch (err) {
      // if (!err?.originalStatus) {
      //   setAlertIsShowing(true);
      // } else
      if (err.originalStatus === 200) {
        setErrMessage("Create successful");
      } else if (err.originalStatus === 401) {
        setErrMessage("Unauthorized");
      }
    }
  };
  //render
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
            // value={lessonName}
            // onChange={(e) => setLessonName(e.target.value)}
          />
          <input
            type="text"
            name="name"
            id={`txtTestCaseOutput${i}`}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Output"
            required
            autoComplete="off"
            // value={lessonName}
            // onChange={(e) => setLessonName(e.target.value)}
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
      var outputId = String("txtHiddenTestCaseInput" + i);
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
      {isLoading || isLoadingGetCodeLanguages ? (
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
      ) : (
        <section class="bg-white ">
          <div class="py-8 px-4 mx-auto w-3/4 lg:py-16">
            <Link
              to={`/coursemanagement/lesson/${lesson.chapterId}`}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Back to management
            </Link>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Update lesson
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
                    // onChange={(e) => {
                    //   if (e.target.value === "Basic") setLevel(1);
                    //   else if (e.target.value === "General") setLevel(2);
                    //   else setLevel(3);
                    // }}
                    onChange={(e) => setScore(e.target.value)}
                  >
                    <option value={100} selected="">
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
                    <option value={0} selected="">
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
                    <option value={0} selected="">
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
                        <option value={codeLanguage.codeLanguageId}>
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