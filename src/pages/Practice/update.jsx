import { BackwardIcon } from "@heroicons/react/24/outline";
import { Spinner } from "flowbite-react";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import CkEditor from "../../components/CkEditor/ckeditor";
import AlertComponent from "../../components/ui/AlertComponent";
import ModalComponent from "../../components/ui/ModalComponent";
import useCkEditor from "../../hooks/useCkEditor";
import useModal from "../../hooks/useModal";
import { selectCurrentUser } from "../../redux/authSlice";
import {
  useGetPracticeManagementDetailsQuery,
  useGetPracticeLevelsQuery,
  useUpdatePracticeMutation,
  useDeleteTestCasePracticeMutation,
} from "../../redux/practiceApiSlice";

const UpdatePractice = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const user = useSelector(selectCurrentUser);
  const authorId = user.id;
  const { arg, isShowing, toggle, setArg } = useModal();
  const { CkEditorData, setCkEditorData } = useCkEditor();
  const [formValid, setFormValid] = useState(false);
  const [errMessage, setErrMessage] = useState(null);
  const [practiceName, setPracticeName] = useState("");
  const [score, setScore] = useState(100);
  const [numberTestCases, setNumberTestCases] = useState(0);
  const [numberHiddenTestCases, setNumberHiddenTestCases] = useState(0);
  const [practiceLevelId, setPracticeLevelId] = useState(1);
  const [alertIsShowing, setAlertIsShowing] = useState(false);
  const [updatePractice, { isLoading: isLoadingUpdatePractice }] =
    useUpdatePracticeMutation();
  const [deleteTestCasePractice, { isLoading: isLoadingDeletePractice }] =
    useDeleteTestCasePracticeMutation();
  const {
    data: practice,
    isLoading: isLoadingGetPractice,
    isSuccess,
    refetch,
  } = useGetPracticeManagementDetailsQuery(id, {
    refetchOnMountOrArgChange: true,
  });
  const {
    data,
    isLoading: isLoadingGetPracticeLevels,
    isSuccess: isSuccessGetPracticeLevels,
    isError: isErrorGetPracticeLevels,
    error: errorGetPracticeLevels,
  } = useGetPracticeLevelsQuery();
  useEffect(() => {
    if (!isLoadingGetPractice) {
      setCkEditorData(practice.content);
      setPracticeName(practice.practiceName);
      setScore(practice.score);
      setNumberTestCases(practice.totalTestCases);
      setNumberHiddenTestCases(practice.totalHiddenTestCases);
      setPracticeLevelId(practice.practiceLevelId);
    }
  }, [isLoadingGetPractice, practice, setCkEditorData]);

  useEffect(() => {
    if (practiceName !== "" && CkEditorData !== "" && numberTestCases !== 0) {
      setFormValid(true);
    }
  }, [practiceName, CkEditorData, numberTestCases]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formValid) {
      return;
    }
    try {
      let testCases = getDataTestCases().concat(getDataHiddenTestCases());
      const response = await updatePractice({
        practiceId: practice.practiceId,
        practiceName: practiceName,
        score: score,
        practiceLevelId: practiceLevelId,
        content: CkEditorData,
        testCases: testCases,
      }).unwrap();
      if (response.isSuccessful) {
        setCkEditorData("");
        setPracticeLevelId(1);
        setNumberTestCases(0);
        setNumberHiddenTestCases(0);
        setScore(100);
        setPracticeName("");
        setErrMessage(null);
        setFormValid(false);
        navigate(`/practicemanagement`, {
          state: {
            status: "Update practice successfull",
          },
        });
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
  //render
  const renderTestCases = () => {
    var content = [];
    for (var i = 0; i < numberTestCases; i++) {
      if (i < practice.totalTestCases) {
        let testCaseId = practice.testCases[i].testCaseId;
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
              key={testCaseId + practice.testCases[i].input}
              type="text"
              name="name"
              id={`txtTestCaseInput${i}`}
              class="bg-gray-50 mb-2 w-2/3 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Input"
              required
              autoComplete="off"
              defaultValue={practice.testCases[i].input}
            />
            <input
              //try to create a unique key
              key={testCaseId + practice.testCases[i].expectedOutput}
              type="text"
              name="name"
              id={`txtTestCaseOutput${i}`}
              class="bg-gray-50 border w-2/3 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Output"
              required
              autoComplete="off"
              defaultValue={practice.testCases[i].expectedOutput}
            />
          </div>
        );
      } else {
        content.push(
          <>
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
          </>
        );
      }
    }
    return content;
  };
  const renderHiddenTestCase = () => {
    var content = [];
    for (var i = 0; i < numberHiddenTestCases; i++) {
      if (i < practice.totalHiddenTestCases) {
        let testCaseId = practice.hiddenTestCases[i].testCaseId;
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
              key={testCaseId + practice.hiddenTestCases[i].input}
              type="text"
              id={`txtHiddenTestCaseInput${i}`}
              class="bg-gray-50 mb-2 w-2/3 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Input"
              required
              autoComplete="off"
              defaultValue={practice.hiddenTestCases[i].input}
            />
            <input
              //try to create a unique key
              key={testCaseId + practice.hiddenTestCases[i].expectedOutput}
              type="text"
              id={`txtHiddenTestCaseOutput${i}`}
              class="bg-gray-50 mb-2 w-2/3 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Output"
              required
              autoComplete="off"
              defaultValue={practice.hiddenTestCases[i].expectedOutput}
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
          i < practice.totalTestCases ? practice.testCases[i].testCaseId : 0,
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
          i < practice.totalHiddenTestCases
            ? practice.hiddenTestCases[i].testCaseId
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
      const response = await deleteTestCasePractice(testCaseId).unwrap();
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
      {isLoadingGetPractice || isLoadingGetPracticeLevels ? (
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
              to={`/practicemanagement`}
              className="flex w-fit font-medium text-indigo-600 hover:text-indigo-500"
            >
              <BackwardIcon className="h-6 w-6 mr-2 " aria-hidden="true" />
              Back to practice management
            </Link>

            <h2 className="mt-12 mb-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Update Practice
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
                    Practice name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type lesson name"
                    required
                    autoComplete="off"
                    value={practiceName}
                    onChange={(e) => setPracticeName(e.target.value)}
                  />
                </div>
                <div>
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
                    <option value={200} selected={score === 200}>
                      200
                    </option>
                  </select>
                </div>
                <div>
                  <label
                    for="level"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Choose level
                  </label>
                  <select
                    id="level"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    required
                    onChange={(e) => setPracticeLevelId(e.target.value)}
                  >
                    {data.levels.map((level, i) => {
                      return (
                        <option
                          value={level.id}
                          selected={practice.practiceLevelId === level.id}
                        >
                          {level.name}
                        </option>
                      );
                    })}
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
                    <option value={0} selected={practice.totalTestCases === 0}>
                      0
                    </option>
                    <option value={1} selected={practice.totalTestCases === 1}>
                      1
                    </option>
                    <option value={2} selected={practice.totalTestCases === 2}>
                      2
                    </option>
                    <option value={3} selected={practice.totalTestCases === 3}>
                      3
                    </option>
                    <option value={4} selected={practice.totalTestCases === 4}>
                      4
                    </option>
                    <option value={5} selected={practice.totalTestCases === 5}>
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
                      selected={practice.totalHiddenTestCases === 0}
                    >
                      0
                    </option>
                    <option
                      value={1}
                      selected={practice.totalHiddenTestCases === 1}
                    >
                      1
                    </option>
                    <option
                      value={2}
                      selected={practice.totalHiddenTestCases === 2}
                    >
                      2
                    </option>
                    <option
                      value={3}
                      selected={practice.totalHiddenTestCases === 3}
                    >
                      3
                    </option>
                    <option
                      value={4}
                      selected={practice.totalHiddenTestCases === 4}
                    >
                      4
                    </option>
                    <option
                      value={5}
                      selected={practice.totalHiddenTestCases === 5}
                    >
                      5
                    </option>
                  </select>
                </div>
                <div>{renderHiddenTestCase()}</div>
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

export default UpdatePractice;
