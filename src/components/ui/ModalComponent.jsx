import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import congraratulation from "../../assets/images/congratulation.gif";

import React from "react";

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
  results,
}) => {
  return (
    <Modal
      show={isShowing}
      size="md"
      position="top-center"
      popup={true}
      onClose={hide}
    >
      <Modal.Header>{title}</Modal.Header>
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
                Chapter name
              </label>
              <input
                type="text"
                name="chapterName"
                id="chapterName"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Type chapter name"
                required={true}
                autoComplete="off"
              />
            </div>
            <Button
              className="w-full mr-auto"
              onClick={() => {
                content = document.getElementById("chapterName").value;

                func(content);
                hide();
              }}
            >
              {buttonContent}
            </Button>
          </div>
        ) : type === "editchapterform" ? (
          <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
            <div className="relative z-0 w-full mb-8 ">
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Chapter name
              </label>
              <input
                type="text"
                key={`chapterNameEditId` + arg}
                name="chapterNameEdit"
                id="txtchapterNameEdit"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Type chapter name"
                required
                autoComplete="off"
                defaultValue={content}
              />
            </div>
            <Button
              className="w-full mr-auto"
              onClick={() => {
                let chapterName =
                  document.getElementById("txtchapterNameEdit").value;
                func(arg, chapterName);
                hide();
              }}
            >
              {buttonContent}
            </Button>
          </div>
        ) : type === "delete" ? (
          <div className="text-center">
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this {content}?
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
        ) : type === "confirm" ? (
          <div className="text-center">
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {content}
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                onClick={() => {
                  func(arg);
                  hide();
                }}
              >
                Yes
              </Button>
              <Button color="gray" onClick={hide}>
                No, cancel
              </Button>
            </div>
          </div>
        ) : type === "submit" ? (
          <div className="text-center">
            <img
              src={congraratulation}
              className="mx-auto my-5 rounded shadow-lg"
              alt="congratulation"
            />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {content}
            </h3>
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Pass:{" "}
              <span className="text-green-500">{results?.pass} test cases</span>
            </h3>
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Score:{" "}
              <span className="text-blue-600">{results?.score} points</span>{" "}
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="blue"
                onClick={() => {
                  func(arg);
                  hide();
                }}
              >
                {buttonContent}
              </Button>
              <Button color="gray" onClick={hide}>
                Stay on this page
              </Button>
            </div>
          </div>
        ) : type === "replycomment" ? (
          <div className="text-center">
            <div className="flex justify-center gap-4">
              <div class="mb-6">
                <div class="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                  <label for="replycomment" class="sr-only">
                    Your comment
                  </label>
                  <textarea
                    id="replycomment"
                    rows="6"
                    class="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                    placeholder="Write a reply comment..."
                    required
                  ></textarea>
                </div>
                <button
                  class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-500 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-blue-600"
                  onClick={() => {
                    content = document.getElementById("replycomment").value;
                    func(arg, content);
                    hide();
                  }}
                >
                  Post comment
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </Modal.Body>
    </Modal>
  );
};

export default ModalComponent;
