import {
  BackwardIcon,
} from "@heroicons/react/24/outline";

import { FileInput, Label } from "flowbite-react";
import React, { useEffect, useState } from "react";
import {  useSelector } from "react-redux";
import { Link} from "react-router-dom";
import CkEditor from "../../components/CkEditor/ckeditor";
import AlertComponent from "../../components/ui/AlertComponent";
import useCkEditor from "../../hooks/useCkEditor";
import { selectCurrentUser } from "../../redux/authSlice";
import { useAddDiscussionMutation } from "../../redux/discussionApiSlice";

const CreateDiscussion = () => {
  const user = useSelector(selectCurrentUser);
  const authorId = user.id;
  const { CkEditorData, setCkEditorData } = useCkEditor();
  const [formValid, setFormValid] = useState(false);
  const [errMessage, setErrMessage] = useState(null);
  const [discussionName, setDiscussionName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [alertIsShowing, setAlertIsShowing] = useState(false);
  const [addDiscussion, { isLoading }] = useAddDiscussionMutation();

  useEffect(() => {
    if (discussionName !== "" && CkEditorData !== "") {
      setFormValid(true);
    }
  }, [discussionName, CkEditorData]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formValid) {
      return;
    }
    try {
      const response = await addDiscussion({
        userId: authorId,
        description: description,
        discussionName: discussionName,
        content: CkEditorData,
        image: image,
      }).unwrap();
      if (response.isSuccessful) {
        setCkEditorData("");
        setDiscussionName("");
        setDescription("");
        setImage("");
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
      } else if (err.originalStatus === 401) {
        setErrMessage("Unauthorized");
      }
    }
  };
  const convertToBase64 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      let base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
      setImage(base64String);
    };
  };
  return (
    <div>
      <section class="bg-white ">
        <div class="py-8 px-4 mx-auto w-3/4 lg:py-16">
          <Link
            to="/discussion"
            className="flex w-fit font-medium text-indigo-600 hover:text-indigo-500"
          >
            <BackwardIcon className="h-6 w-6 mr-2 " aria-hidden="true" />
            Back to discussion
          </Link>
          <h2 className="mt-12 mb-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Create new discussion
          </h2>
          {alertIsShowing ? (
            <AlertComponent
              content={"Create new discussion success"}
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
                  Discussion name
                </label>

                <input
                  type="text"
                  name="name"
                  id="name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type discussion name"
                  required
                  autoComplete="off"
                  value={discussionName}
                  onChange={(e) => setDiscussionName(e.target.value)}
                />
              </div>
              <div id="fileUpload">
                <div className="mb-2 block">
                  <Label htmlFor="file" value="Discussion image" />
                </div>
                <FileInput
                  id="file"
                  helperText="Discussion image is used to represent the discussion (.png)"
                  required
                  onChange={(e) => {
                    convertToBase64(e.target.files[0]);
                  }}
                />
              </div>
              <div className={`mt-5`}>
                <img
                  class="rounded-t-lg h-40 min-w-full"
                  src={"data:image/jpeg;base64," + image}
                  alt=""
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
    </div>
  );
};

export default CreateDiscussion;
