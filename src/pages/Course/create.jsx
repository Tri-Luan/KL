import { BackwardIcon } from "@heroicons/react/24/outline";

import { FileInput, Label, Spinner } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CkEditor from "../../components/CkEditor/ckeditor";
import AlertComponent from "../../components/ui/AlertComponent";
import useCkEditor from "../../hooks/useCkEditor";
import { selectCurrentUser } from "../../redux/authSlice";
import {
  useAddCourseMutation,
  useGetThemesQuery,
} from "../../redux/courseApiSlice";

const CreateCourse = () => {
  const user = useSelector(selectCurrentUser);
  const authorId = user.id;
  const { CkEditorData, setCkEditorData } = useCkEditor();
  const [formValid, setFormValid] = useState(false);
  const [errMessage, setErrMessage] = useState(null);
  const [courseName, setCourseName] = useState("");
  const [level, setLevel] = useState(1);
  const [description, setDescription] = useState("");
  const [courseAvatar, setCourseAvatar] = useState("");
  const [reward, setReward] = useState("");
  const [theme, setTheme] = useState("");
  const [time, setTime] = useState(0);
  const [alertIsShowing, setAlertIsShowing] = useState(false);
  const { data, isLoading: isLoadingGetThemes } = useGetThemesQuery();
  const [addCourse, { isLoading }] = useAddCourseMutation();

  useEffect(() => {
    if (!isLoadingGetThemes) {
      setTheme(data.themes[0].themeImage);
    }
  }, [isLoadingGetThemes]);
  useEffect(() => {
    if (
      courseName !== "" &&
      description !== "" &&
      CkEditorData !== "" &&
      courseAvatar !== null &&
      reward !== "" &&
      time !== 0
    ) {
      setFormValid(true);
    }
  }, [courseName, description, CkEditorData, courseAvatar, reward, time]);

  const convertToBase64 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      let base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
      setCourseAvatar(base64String);
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formValid) {
      return;
    }
    try {
      const response = await addCourse({
        courseName: courseName,
        description: description,
        objective: CkEditorData,
        courseImage: courseAvatar,
        courseTheme: theme,
        courseLevelId: level,
        authorId: authorId,
        reward: reward,
        time: time,
      }).unwrap();
      if (response.isSuccessful) {
        setCkEditorData("");
        setTime(0);
        setDescription("");
        setLevel(1);
        setCourseAvatar("");
        setReward("");
        setCourseName("");
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
  return (
    <div>
      {isLoadingGetThemes ? (
        <div className="text-center">
          <Spinner aria-label="Center-aligned spinner" />
          <span className="ml-2">Loading...</span>
        </div>
      ) : (
        <section class="bg-white ">
          <div class="py-8 px-4 mx-auto w-3/4 lg:py-16">
            <Link
              to="/coursemanagement"
              className="flex w-fit font-medium text-indigo-600 hover:text-indigo-500"
            >
              <BackwardIcon className="h-6 w-6 mr-2 " aria-hidden="true" />
              Back to course management
            </Link>
            <h2 className="mt-12 mb-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Create new course
            </h2>
            {alertIsShowing ? (
              <AlertComponent
                content={"Create new course success"}
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
                    Course name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type course name"
                    required
                    autoComplete="off"
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                  />
                </div>
                <div className="sm:col-span-2 w-1/2">
                  <label
                    for="level"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Level
                  </label>
                  <select
                    id="level"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    required
                    onChange={(e) => {
                      if (e.target.value === "Basic") setLevel(1);
                      else if (e.target.value === "General") setLevel(2);
                      else setLevel(3);
                    }}
                  >
                    <option value="Basic" selected="">
                      Basic
                    </option>
                    <option value="General">General</option>
                    <option value="Specialized">Specialized</option>
                  </select>
                </div>
                <div id="fileUpload">
                  <div className="mb-2 block">
                    <Label htmlFor="file" value="Course avatar" />
                  </div>
                  <FileInput
                    id="file"
                    helperText="Course avatars are used to represent the course (.png)"
                    required
                    onChange={(e) => {
                      convertToBase64(e.target.files[0]);
                    }}
                  />
                </div>
                <div className={`mt-5`}>
                  <img
                    class="rounded-t-lg h-40 min-w-full"
                    src={"data:image/jpeg;base64," + courseAvatar}
                    alt=""
                  />
                </div>
                <div>
                  <label
                    for="theme"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Theme
                  </label>
                  <select
                    id="theme"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    required
                    onChange={(e) => setTheme(e.target.value)}
                  >
                    {data.themes.map((theme, i) => {
                      return (
                        <option value={theme.themeImage}>
                          {theme.themeName}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className={`mt-5 `}>
                  <img
                    class="rounded-t-lg h-40 min-w-full"
                    src={"data:image/jpeg;base64," + theme}
                    alt=""
                  />
                </div>
                <div>
                  <label
                    for="reward"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Reward
                  </label>
                  <select
                    id="reward"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    required
                    onChange={(e) => {
                      if (e.target.value === "None") setReward("None");
                      else setReward("Certificate");
                    }}
                  >
                    <option value="None" selected="">
                      None
                    </option>
                    <option value="Certificate">Certificate</option>
                  </select>
                </div>
                <div>
                  <label
                    for="time"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Estimated learning time
                  </label>
                  <input
                    type="number"
                    min="0"
                    name="time"
                    id="time"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type course name"
                    required
                    autoComplete="off"
                    value={time}
                    onChange={(e) => setTime(Number(e.target.value))}
                  />
                </div>
                <div class="sm:col-span-2">
                  <label
                    for="description"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    rows="8"
                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type description here"
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
                <div class="sm:col-span-2">
                  <label
                    for="objective"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Objective
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

export default CreateCourse;
