import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { Button, Modal } from "flowbite-react";
import { useRef, useState } from "react";
import React from "react";
import ReactDOM from "react-dom";

const ModalComponent = ({ isShowing, hide, func, arg }) =>
  isShowing
    ? ReactDOM.createPortal(
        <Modal show={isShowing} size="md" popup={true} onClose={hide}>
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to delete this course {arg}?
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
          </Modal.Body>
        </Modal>,
        document.body
      )
    : null;

export default ModalComponent;
