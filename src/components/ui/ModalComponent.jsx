import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { useRef, useState } from "react";
import React from "react";
// import ReactDOM from "react-dom";

const ModalComponent = ({
  isShowing,
  hide,
  func,
  type,
  arg,
  title,
  buttonContent,
  content,
  setContent,
}) => {
  // const chapterName = useRef(content);
  // const [chapterName, setChapterName] = useState();
  console.log(content);
  return (
    <Modal
      show={isShowing}
      size="md"
      position="top-center"
      popup={true}
      onClose={hide}
    >
      <Modal.Header />
      <Modal.Body>
        {type === "login" ? (
          <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Sign in to our platform
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Your email" />
              </div>
              <TextInput
                id="email"
                placeholder="name@company.com"
                required={true}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Your password" />
              </div>
              <TextInput id="password" type="password" required={true} />
            </div>
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">Remember me</Label>
              </div>
              <a
                href="/modal"
                className="text-sm text-blue-700 hover:underline dark:text-blue-500"
              >
                Lost Password?
              </a>
            </div>
            <div className="w-full">
              <Button
                onClick={() => {
                  func(arg);
                  hide();
                }}
              >
                Log in to your account
              </Button>
            </div>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
              Not registered?
              <a
                href="/modal"
                className="text-blue-700 hover:underline dark:text-blue-500"
              >
                Create account
              </a>
            </div>
          </div>
        ) : type === "addchapterform" ? (
          <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              {title}
            </h3>
            <div className="relative z-0 w-full mb-8 ">
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Course name
              </label>
              <input
                type="text"
                name="chapterName"
                id="chapterName"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Type chapter name"
                required={true}
                autoComplete="off"
                // ref={chapterName}
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                }}
              />
            </div>
            <Button
              className="w-full mr-auto"
              onClick={() => {
                func(content);
                hide();
              }}
            >
              {buttonContent}
            </Button>
          </div>
        ) : type === "editchapterform" ? (
          <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              {title}
            </h3>
            <div className="relative z-0 w-full mb-8 ">
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Course name
              </label>
              <input
                type="text"
                name="chapterName"
                id="chapterName"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Type chapter name"
                required={true}
                autoComplete="off"
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                }}
              />
            </div>
            <Button
              className="w-full mr-auto"
              onClick={() => {
                func(arg, content);
                hide();
              }}
            >
              {buttonContent}
            </Button>
          </div>
        ) : (
          <div className="text-center">
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this {title}?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={() => {
                  func(arg);
                  hide();
                }}
              >
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={hide}>
                No, cancel
              </Button>
            </div>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ModalComponent;
