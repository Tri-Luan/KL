import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/outline";

import { FileInput, Label } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CkEditor from "../../components/CkEditor/ckeditor";
import AlertComponent from "../../components/ui/AlertComponent";
import { selectCurrentUser } from "../../redux/authSlice";
import { useAddCourseMutation } from "../../redux/courseApiSlice";

const CreateCourse = () => {
  // const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const authorId = user.id;
  const [formValid, setFormValid] = useState(false);
  const [errMessage, setErrMessage] = useState(null);
  const [courseName, setCourseName] = useState("");
  const [level, setLevel] = useState(1);
  const [description, setDescription] = useState("");
  const [objective, setObjective] = useState("");
  const [courseAvatar, setCourseAvatar] = useState("");
  const [reward, setReward] = useState("");
  const [time, setTime] = useState(0);
  const [success, setSuccess] = useState(false);

  const [alertIsShowing, setAlertIsShowing] = useState(false);
  const [addCourse, { isLoading }] = useAddCourseMutation();
  // useEffect(() => {
  //   if (results && results.data) {
  //     // dispatch(setUser(results.data));
  //     // navigate(from, { replace: true });
  //     if (results.data.isSuccessful) {
  //       setErrMessage(["Register successful"]);
  //     } else {
  //       setErrMessage(results.data.errorMessages);
  //     }
  //   }
  // }, [results]);

  const callBackFunction = (childData) => {
    setObjective(childData);
  };

  useEffect(() => {
    if (
      courseName !== "" &&
      description !== "" &&
      objective !== "" &&
      courseAvatar !== null &&
      reward !== "" &&
      time !== 0
    ) {
      setFormValid(true);
    }
  }, [courseName, description, objective, courseAvatar, reward, time]);

  const convertToBase64 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      let base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
      setCourseAvatar(base64String);
      console.log("result1: ", base64String);
      console.log("result: ", reader.result);
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
        objective: objective,
        courseImage: courseAvatar,
        courseLevelId: level,
        authorId: authorId,
        reward: reward,
        time: time,
      }).unwrap();
      // if (response.data.isSuccessful) {
      //   setErrMessage("Create successed");
      // } else {
      //   setErrMessage(response.data.errorMessages);
      // }
    } catch (err) {
      if (!err?.originalStatus) {
        setAlertIsShowing(true);
      } else if (err.originalStatus === 200) {
        setErrMessage("Create successful");
      } else if (err.originalStatus === 401) {
        setErrMessage("Unauthorized");
      }
    }
  };
  return (
    <div>
      {isLoading ? (
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
              to="/coursemanagement"
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
              Create new course
            </h2>
            {alertIsShowing ? (
              <AlertComponent
                content={"Create new course successed"}
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
                <div>
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
                  <CkEditor callBack={callBackFunction} />
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
